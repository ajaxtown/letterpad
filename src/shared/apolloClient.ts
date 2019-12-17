import { ApolloClient } from "apollo-client";
import { createHttpLink } from "apollo-link-http";
import { ApolloLink, from } from "apollo-link";
import { InMemoryCache } from "apollo-cache-inmemory";
import { onError } from "apollo-link-error";
import fetch from "isomorphic-fetch";
import config from "../config";

const httpLink = createHttpLink({
  uri: config.apiUrl,
  fetch: fetch,
});

/**
 * Every request from admin dashboard requires a token which is set in localStorage.
 * For every request to admin, a new token is received and is resaved in localstorage.
 * This is also useful to invalidate the sesson if the user is inactive for more than x time
 * @param {*} token
 */
const middlewareLinkAdmin = (token: string | null = null) => {
  const isServer = typeof window === "undefined";
  return new ApolloLink((operation, forward) => {
    operation.setContext({
      headers: {
        authorization: isServer ? token : localStorage.token,
      },
    });
    if (isServer) {
      return forward(operation);
    }
    return forward(operation).map(response => {
      const {
        response: { headers },
      } = operation.getContext();
      if (headers) {
        const refreshToken = headers.get("x-refresh-token");
        if (refreshToken) {
          localStorage.token = refreshToken;
        }
      }
      return response;
    });
  });
};
/**
 * Handle unauthorised errors
 */
const errorLink = onError(({ networkError }) => {
  if (
    networkError &&
    "statusCode" in networkError &&
    networkError.statusCode === 401
  ) {
    window.location.href = config.baseName + "/admin/login";
  }
});

/**
 * Any request from client (theme) will not require a token as whatever data they request
 * is public.
 */
const middlewareLinkClient = new ApolloLink((operation, forward) =>
  forward(operation),
);

let initialState = {};
let token;
if (typeof window !== "undefined") {
  token = localStorage.token;
  initialState = (window as any).__APOLLO_STATE__;
}

// prepare the client for graphql queries.
const apolloClient = (
  isAdmin = true,
  opts = {},
  authToken: string | null = token,
) => {
  const middleware = isAdmin
    ? middlewareLinkAdmin(authToken)
    : middlewareLinkClient;
  const link = from([errorLink, middleware, httpLink]);
  return new ApolloClient({
    link: link,
    cache: new InMemoryCache().restore(initialState),
    ssrForceFetchDelay: 100,
    ...opts,
  });
};

export default apolloClient;