import { GraphQLResolveInfo, GraphQLScalarType, GraphQLScalarTypeConfig } from 'graphql';
import { Context } from '../api/server';
export type Maybe<T> = T | null;
export type RequireFields<T, K extends keyof T> = { [X in Exclude<keyof T, K>]?: T[X] } & { [P in K]-?: NonNullable<T[P]> };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string,
  String: string,
  Boolean: boolean,
  Int: number,
  Float: number,
  Date: any,
};

export type AdjacentPosts = {
   __typename?: 'AdjacentPosts',
  previous?: Maybe<Post>,
  next?: Maybe<Post>,
};

export type Author = {
   __typename?: 'Author',
  id?: Maybe<Scalars['Int']>,
  username?: Maybe<Scalars['String']>,
  email?: Maybe<Scalars['String']>,
  fname?: Maybe<Scalars['String']>,
  lname?: Maybe<Scalars['String']>,
  social?: Maybe<TypeSocial>,
  role?: Maybe<Role>,
  bio?: Maybe<Scalars['String']>,
  avatar?: Maybe<Scalars['String']>,
};

export type AuthorResponse = {
   __typename?: 'AuthorResponse',
  ok: Scalars['Boolean'],
  errors?: Maybe<Array<Error>>,
  data?: Maybe<Author>,
};

export type CreateAuthorResponse = {
   __typename?: 'CreateAuthorResponse',
  ok: Scalars['Boolean'],
  errors?: Maybe<Array<Error>>,
};


export type DeleteResponse = {
   __typename?: 'DeleteResponse',
  ok: Scalars['Boolean'],
};

export type EditTaxResponse = {
   __typename?: 'EditTaxResponse',
  ok: Scalars['Boolean'],
  id?: Maybe<Scalars['Int']>,
  errors?: Maybe<Array<Error>>,
};

export enum EnumPermissions {
  ReadOnlyPosts = 'READ_ONLY_POSTS',
  ManageAllPosts = 'MANAGE_ALL_POSTS',
  ManageUsers = 'MANAGE_USERS',
  ManageSettings = 'MANAGE_SETTINGS'
}

export enum EnumRoles {
  Admin = 'ADMIN',
  Reviewer = 'REVIEWER',
  Author = 'AUTHOR',
  Reader = 'READER'
}

export type Error = {
   __typename?: 'Error',
  path: Scalars['String'],
  message?: Maybe<Scalars['String']>,
};

export enum FilterKeys {
  Tag = 'tag',
  Category = 'category',
  AuthorName = 'authorName'
}

export type ForgotPasswordResponse = {
   __typename?: 'ForgotPasswordResponse',
  ok: Scalars['Boolean'],
  msg?: Maybe<Scalars['String']>,
};

export type InputAuthor = {
  id: Scalars['Int'],
  email?: Maybe<Scalars['String']>,
  fname?: Maybe<Scalars['String']>,
  lname?: Maybe<Scalars['String']>,
  bio?: Maybe<Scalars['String']>,
  social?: Maybe<Social>,
  password?: Maybe<Scalars['String']>,
  roleId?: Maybe<Scalars['Int']>,
  avatar?: Maybe<Scalars['String']>,
};

export type InputCreatePost = {
  title?: Maybe<Scalars['String']>,
  body?: Maybe<Scalars['String']>,
  authorId?: Maybe<Scalars['Int']>,
  excerpt?: Maybe<Scalars['String']>,
  cover_image?: Maybe<Scalars['String']>,
  type?: Maybe<Scalars['String']>,
  status?: Maybe<PostStatusOptions>,
  slug?: Maybe<Scalars['String']>,
  taxonomies?: Maybe<Array<Maybe<TaxonomyInputType>>>,
};

export type InputThemeSettings = {
  name: Scalars['String'],
  type: ThemeSettingsUiInputTypes,
  tag: ThemeSettingsUiTags,
  options?: Maybe<Array<Maybe<Scalars['String']>>>,
  placeholder?: Maybe<Scalars['String']>,
  defaultValue?: Maybe<Scalars['String']>,
  changedValue?: Maybe<Scalars['String']>,
  selectedValue?: Maybe<Scalars['String']>,
  label: Scalars['String'],
  helpText?: Maybe<Scalars['String']>,
};

export type InputUpdatePost = {
  id: Scalars['Int'],
  title?: Maybe<Scalars['String']>,
  body?: Maybe<Scalars['String']>,
  authorId?: Maybe<Scalars['Int']>,
  excerpt?: Maybe<Scalars['String']>,
  cover_image?: Maybe<Scalars['String']>,
  type?: Maybe<Scalars['String']>,
  status?: Maybe<PostStatusOptions>,
  slug?: Maybe<Scalars['String']>,
  taxonomies?: Maybe<Array<Maybe<TaxonomyInputType>>>,
};

export type LoginResponse = {
   __typename?: 'LoginResponse',
  ok: Scalars['Boolean'],
  token?: Maybe<Scalars['String']>,
  data?: Maybe<Author>,
  errors?: Maybe<Array<Error>>,
};

export type Media = {
   __typename?: 'Media',
  id: Scalars['Int'],
  authorId: Scalars['Int'],
  url: Scalars['String'],
  createdAt: Scalars['Date'],
  name?: Maybe<Scalars['String']>,
  description?: Maybe<Scalars['String']>,
};

export type MediaFiltersWithPagination = {
  id?: Maybe<Scalars['Int']>,
  cursor?: Maybe<Scalars['Int']>,
  limit?: Maybe<Scalars['Int']>,
  page?: Maybe<Scalars['Int']>,
};

export type MediaNode = {
   __typename?: 'MediaNode',
  count: Scalars['Int'],
  rows: Array<Maybe<Media>>,
};

export type MenuFiltersWithPagination = {
  slug?: Maybe<Scalars['String']>,
  type: MenuTypes,
  page?: Maybe<Scalars['Int']>,
  limit?: Maybe<Scalars['Int']>,
};

export enum MenuTypes {
  Category = 'category',
  Page = 'page'
}

export type Mutation = {
   __typename?: 'Mutation',
  register: AuthorResponse,
  login: LoginResponse,
  forgotPassword: ForgotPasswordResponse,
  resetPassword: ForgotPasswordResponse,
  updateAuthor?: Maybe<AuthorResponse>,
  createAuthor: CreateAuthorResponse,
  sendMail?: Maybe<Scalars['Boolean']>,
  insertMedia?: Maybe<Media>,
  deleteMedia?: Maybe<DeleteResponse>,
  updateMedia?: Maybe<UpdateResponse>,
  createPost: Response,
  updatePost: Response,
  deletePosts: Response,
  uploadFile: Response,
  updateOptions: Array<Setting>,
  updateTaxonomy: EditTaxResponse,
  deleteTaxonomy: EditTaxResponse,
  updateThemes: Scalars['Boolean'],
  insertThemes: Scalars['Boolean'],
};


export type MutationRegisterArgs = {
  username: Scalars['String'],
  password: Scalars['String'],
  email: Scalars['String']
};


export type MutationLoginArgs = {
  username?: Maybe<Scalars['String']>,
  email?: Maybe<Scalars['String']>,
  password: Scalars['String'],
  remember?: Maybe<Scalars['Boolean']>
};


export type MutationForgotPasswordArgs = {
  email: Scalars['String']
};


export type MutationResetPasswordArgs = {
  password: Scalars['String'],
  token: Scalars['String']
};


export type MutationUpdateAuthorArgs = {
  author: InputAuthor
};


export type MutationCreateAuthorArgs = {
  email: Scalars['String'],
  fname?: Maybe<Scalars['String']>,
  lname?: Maybe<Scalars['String']>,
  roleName?: Maybe<EnumRoles>
};


export type MutationSendMailArgs = {
  to: Scalars['String'],
  subject?: Maybe<Scalars['String']>,
  body?: Maybe<Scalars['String']>
};


export type MutationInsertMediaArgs = {
  url?: Maybe<Scalars['String']>
};


export type MutationDeleteMediaArgs = {
  ids: Array<Scalars['Int']>
};


export type MutationUpdateMediaArgs = {
  id: Scalars['Int'],
  name?: Maybe<Scalars['String']>,
  description?: Maybe<Scalars['String']>
};


export type MutationCreatePostArgs = {
  data?: Maybe<InputCreatePost>
};


export type MutationUpdatePostArgs = {
  data?: Maybe<InputUpdatePost>
};


export type MutationDeletePostsArgs = {
  ids?: Maybe<Array<Scalars['Int']>>,
  deleteFromSystem?: Maybe<Scalars['Boolean']>
};


export type MutationUploadFileArgs = {
  id?: Maybe<Scalars['Int']>,
  cover_image?: Maybe<Scalars['String']>
};


export type MutationUpdateOptionsArgs = {
  options?: Maybe<Array<Maybe<OptionInputType>>>
};


export type MutationUpdateTaxonomyArgs = {
  id: Scalars['Int'],
  name?: Maybe<Scalars['String']>,
  desc?: Maybe<Scalars['String']>,
  type: TaxonomyTypes,
  slug?: Maybe<Scalars['String']>
};


export type MutationDeleteTaxonomyArgs = {
  id: Scalars['Int']
};


export type MutationUpdateThemesArgs = {
  name: Scalars['String'],
  settings: Array<InputThemeSettings>
};


export type MutationInsertThemesArgs = {
  name: Scalars['String'],
  settings: Array<InputThemeSettings>
};

export type OptionInputType = {
  id?: Maybe<Scalars['Int']>,
  option?: Maybe<SettingOptions>,
  value?: Maybe<Scalars['String']>,
};

export type Permission = {
   __typename?: 'Permission',
  id: Scalars['Int'],
  name: Scalars['String'],
};

export type Post = {
   __typename?: 'Post',
  id?: Maybe<Scalars['Int']>,
  title?: Maybe<Scalars['String']>,
  body?: Maybe<Scalars['String']>,
  author?: Maybe<Author>,
  excerpt?: Maybe<Scalars['String']>,
  cover_image?: Maybe<Scalars['String']>,
  type?: Maybe<Scalars['String']>,
  status?: Maybe<Scalars['String']>,
  slug?: Maybe<Scalars['String']>,
  mode?: Maybe<Scalars['String']>,
  createdAt?: Maybe<Scalars['Date']>,
  publishedAt?: Maybe<Scalars['Date']>,
  updatedAt?: Maybe<Scalars['Date']>,
  taxonomies?: Maybe<Array<Maybe<Taxonomy>>>,
};

export type PostFilters = {
  tag?: Maybe<Scalars['String']>,
  category?: Maybe<Scalars['String']>,
  authorName?: Maybe<Scalars['String']>,
  sortBy?: Maybe<PostSortBy>,
  status?: Maybe<PostStatusOptions>,
  author?: Maybe<Scalars['String']>,
  query?: Maybe<Scalars['String']>,
  type?: Maybe<PostTypes>,
};

export type PostFiltersWithPagination = {
  tag?: Maybe<Scalars['String']>,
  category?: Maybe<Scalars['String']>,
  authorName?: Maybe<Scalars['String']>,
  sortBy?: Maybe<PostSortBy>,
  status?: Maybe<PostStatusOptions>,
  author?: Maybe<Scalars['String']>,
  query?: Maybe<Scalars['String']>,
  type?: Maybe<PostTypes>,
  cursor?: Maybe<Scalars['Int']>,
  limit?: Maybe<Scalars['Int']>,
  page?: Maybe<Scalars['Int']>,
};

export type PostNode = {
   __typename?: 'PostNode',
  count: Scalars['Int'],
  rows: Array<Post>,
};

export enum PostSortBy {
  Newest = 'newest',
  Oldest = 'oldest'
}

export type PostStatus = {
   __typename?: 'PostStatus',
  published?: Maybe<Scalars['Int']>,
  drafts?: Maybe<Scalars['Int']>,
};

export enum PostStatusOptions {
  Publish = 'publish',
  Draft = 'draft',
  Trash = 'trash'
}

export type PostTaxonomyNode = {
   __typename?: 'PostTaxonomyNode',
  count?: Maybe<Scalars['Int']>,
  rows?: Maybe<Array<Maybe<Post>>>,
};

export enum PostTypes {
  Page = 'page',
  Post = 'post'
}

export type Query = {
   __typename?: 'Query',
  author: Author,
  authors: Array<Maybe<Author>>,
  me?: Maybe<Author>,
  validateToken?: Maybe<CreateAuthorResponse>,
  media: MediaNode,
  post?: Maybe<Post>,
  posts: PostNode,
  menuContent?: Maybe<PostTaxonomyNode>,
  postsByTaxinomySlug?: Maybe<PostTaxonomyNode>,
  adjacentPosts?: Maybe<AdjacentPosts>,
  search?: Maybe<SearchOutput>,
  stats?: Maybe<Stats>,
  roles: Array<Role>,
  settings: Array<Setting>,
  taxonomies: Array<Taxonomy>,
  activeTaxonomies: Array<Maybe<Taxonomy>>,
  themes: Array<Theme>,
};


export type QueryAuthorArgs = {
  id: Scalars['Int'],
  username?: Maybe<Scalars['String']>
};


export type QueryMediaArgs = {
  filters?: Maybe<MediaFiltersWithPagination>
};


export type QueryPostArgs = {
  filters?: Maybe<SinglePostFilters>
};


export type QueryPostsArgs = {
  filters?: Maybe<PostFiltersWithPagination>
};


export type QueryMenuContentArgs = {
  filters?: Maybe<MenuFiltersWithPagination>
};


export type QueryPostsByTaxinomySlugArgs = {
  type: Scalars['String'],
  slug: Scalars['String'],
  postType?: Maybe<Scalars['String']>,
  offset?: Maybe<Scalars['Int']>,
  limit?: Maybe<Scalars['Int']>,
  cursor?: Maybe<Scalars['Int']>
};


export type QueryAdjacentPostsArgs = {
  slug?: Maybe<Scalars['String']>
};


export type QuerySearchArgs = {
  query: Scalars['String']
};


export type QuerySettingsArgs = {
  option?: Maybe<Scalars['String']>
};


export type QueryTaxonomiesArgs = {
  type?: Maybe<TaxonomyTypes>,
  name?: Maybe<Scalars['String']>
};


export type QueryActiveTaxonomiesArgs = {
  type?: Maybe<TaxonomyTypes>,
  postType?: Maybe<Scalars['String']>
};


export type QueryThemesArgs = {
  name?: Maybe<Scalars['String']>
};

export type Response = {
   __typename?: 'Response',
  ok: Scalars['Boolean'],
  post?: Maybe<Post>,
  errors?: Maybe<Array<Error>>,
};

export type Role = {
   __typename?: 'Role',
  id?: Maybe<Scalars['Int']>,
  name?: Maybe<EnumRoles>,
  permissions?: Maybe<Array<Maybe<Permission>>>,
};

export type SearchOutput = {
   __typename?: 'SearchOutput',
  ok?: Maybe<Scalars['Boolean']>,
  count?: Maybe<Scalars['Int']>,
  rows?: Maybe<Array<Maybe<SearchResult>>>,
};

export type SearchResult = {
   __typename?: 'SearchResult',
  id?: Maybe<Scalars['Int']>,
  title?: Maybe<Scalars['String']>,
  excerpt?: Maybe<Scalars['String']>,
  publishedAt?: Maybe<Scalars['Date']>,
  slug?: Maybe<Scalars['String']>,
};

export type Setting = {
   __typename?: 'Setting',
  id: Scalars['Int'],
  option: SettingOptions,
  value: Scalars['String'],
};

export enum SettingOptions {
  SiteTitle = 'site_title',
  SiteTagline = 'site_tagline',
  SiteEmail = 'site_email',
  SiteUrl = 'site_url',
  SiteFooter = 'site_footer',
  SiteDescription = 'site_description',
  SocialTwitter = 'social_twitter',
  SocialFacebook = 'social_facebook',
  SocialInstagram = 'social_instagram',
  SocialGithub = 'social_github',
  TextNotfound = 'text_notfound',
  TextPostsEmpty = 'text_posts_empty',
  DisplayAuthorInfo = 'displayAuthorInfo',
  SiteLogo = 'site_logo',
  Menu = 'menu',
  Css = 'css',
  GoogleAnalytics = 'google_analytics',
  Locale = 'locale',
  Theme = 'theme',
  DisqusId = 'disqus_id',
  Banner = 'banner'
}

export type SinglePostFilters = {
  id?: Maybe<Scalars['Int']>,
  slug?: Maybe<Scalars['String']>,
};

export type Social = {
  github?: Maybe<Scalars['String']>,
  facebook?: Maybe<Scalars['String']>,
  twitter?: Maybe<Scalars['String']>,
  instagram?: Maybe<Scalars['String']>,
};

export type Stats = {
   __typename?: 'Stats',
  posts?: Maybe<PostStatus>,
  pages?: Maybe<PostStatus>,
  tags?: Maybe<Scalars['Int']>,
  categories?: Maybe<Scalars['Int']>,
};

export type Taxonomy = {
   __typename?: 'Taxonomy',
  id: Scalars['Int'],
  name: Scalars['String'],
  type: TaxonomyTypes,
  desc?: Maybe<Scalars['String']>,
  slug: Scalars['String'],
};

export type TaxonomyInputType = {
  id?: Maybe<Scalars['Int']>,
  name?: Maybe<Scalars['String']>,
  type?: Maybe<Scalars['String']>,
  slug?: Maybe<Scalars['String']>,
};

export enum TaxonomyTypes {
  PostTag = 'post_tag',
  PostCategory = 'post_category'
}

export type Theme = {
   __typename?: 'Theme',
  name: Scalars['String'],
  settings: Array<ThemeSettings>,
};

export type ThemeSettings = {
   __typename?: 'ThemeSettings',
  name: Scalars['String'],
  type: ThemeSettingsUiInputTypes,
  tag: ThemeSettingsUiTags,
  options?: Maybe<Array<Maybe<Scalars['String']>>>,
  placeholder?: Maybe<Scalars['String']>,
  defaultValue?: Maybe<Scalars['String']>,
  changedValue?: Maybe<Scalars['String']>,
  selectedValue?: Maybe<Scalars['String']>,
  label: Scalars['String'],
  helpText?: Maybe<Scalars['String']>,
};

export enum ThemeSettingsUiInputTypes {
  Radio = 'radio',
  Text = 'text',
  Checkbox = 'checkbox'
}

export enum ThemeSettingsUiTags {
  Input = 'input',
  Select = 'select'
}

export type TypeSocial = {
   __typename?: 'TypeSocial',
  github?: Maybe<Scalars['String']>,
  facebook?: Maybe<Scalars['String']>,
  twitter?: Maybe<Scalars['String']>,
  instagram?: Maybe<Scalars['String']>,
};

export type UpdateResponse = {
   __typename?: 'UpdateResponse',
  ok: Scalars['Boolean'],
  errors?: Maybe<Array<Maybe<Error>>>,
};



export type ResolverTypeWrapper<T> = Promise<T> | T;

export type ResolverFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => Promise<TResult> | TResult;


export type StitchingResolver<TResult, TParent, TContext, TArgs> = {
  fragment: string;
  resolve: ResolverFn<TResult, TParent, TContext, TArgs>;
};

export type Resolver<TResult, TParent = {}, TContext = {}, TArgs = {}> =
  | ResolverFn<TResult, TParent, TContext, TArgs>
  | StitchingResolver<TResult, TParent, TContext, TArgs>;

export type SubscriptionSubscribeFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => AsyncIterator<TResult> | Promise<AsyncIterator<TResult>>;

export type SubscriptionResolveFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => TResult | Promise<TResult>;

export interface SubscriptionSubscriberObject<TResult, TKey extends string, TParent, TContext, TArgs> {
  subscribe: SubscriptionSubscribeFn<{ [key in TKey]: TResult }, TParent, TContext, TArgs>;
  resolve?: SubscriptionResolveFn<TResult, { [key in TKey]: TResult }, TContext, TArgs>;
}

export interface SubscriptionResolverObject<TResult, TParent, TContext, TArgs> {
  subscribe: SubscriptionSubscribeFn<any, TParent, TContext, TArgs>;
  resolve: SubscriptionResolveFn<TResult, any, TContext, TArgs>;
}

export type SubscriptionObject<TResult, TKey extends string, TParent, TContext, TArgs> =
  | SubscriptionSubscriberObject<TResult, TKey, TParent, TContext, TArgs>
  | SubscriptionResolverObject<TResult, TParent, TContext, TArgs>;

export type SubscriptionResolver<TResult, TKey extends string, TParent = {}, TContext = {}, TArgs = {}> =
  | ((...args: any[]) => SubscriptionObject<TResult, TKey, TParent, TContext, TArgs>)
  | SubscriptionObject<TResult, TKey, TParent, TContext, TArgs>;

export type TypeResolveFn<TTypes, TParent = {}, TContext = {}> = (
  parent: TParent,
  context: TContext,
  info: GraphQLResolveInfo
) => Maybe<TTypes>;

export type NextResolverFn<T> = () => Promise<T>;

export type DirectiveResolverFn<TResult = {}, TParent = {}, TContext = {}, TArgs = {}> = (
  next: NextResolverFn<TResult>,
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => TResult | Promise<TResult>;

/** Mapping between all available schema types and the resolvers types */
export type ResolversTypes = {
  Query: ResolverTypeWrapper<Context>,
  Int: ResolverTypeWrapper<Scalars['Int']>,
  String: ResolverTypeWrapper<Scalars['String']>,
  Author: ResolverTypeWrapper<Author>,
  TypeSocial: ResolverTypeWrapper<TypeSocial>,
  Role: ResolverTypeWrapper<Role>,
  EnumRoles: EnumRoles,
  Permission: ResolverTypeWrapper<Permission>,
  CreateAuthorResponse: ResolverTypeWrapper<CreateAuthorResponse>,
  Boolean: ResolverTypeWrapper<Scalars['Boolean']>,
  Error: ResolverTypeWrapper<Error>,
  MediaFiltersWithPagination: MediaFiltersWithPagination,
  MediaNode: ResolverTypeWrapper<MediaNode>,
  Media: ResolverTypeWrapper<Media>,
  Date: ResolverTypeWrapper<Scalars['Date']>,
  SinglePostFilters: SinglePostFilters,
  Post: ResolverTypeWrapper<Post>,
  Taxonomy: ResolverTypeWrapper<Taxonomy>,
  TaxonomyTypes: TaxonomyTypes,
  PostFiltersWithPagination: PostFiltersWithPagination,
  PostSortBy: PostSortBy,
  PostStatusOptions: PostStatusOptions,
  PostTypes: PostTypes,
  PostNode: ResolverTypeWrapper<PostNode>,
  MenuFiltersWithPagination: MenuFiltersWithPagination,
  MenuTypes: MenuTypes,
  PostTaxonomyNode: ResolverTypeWrapper<PostTaxonomyNode>,
  AdjacentPosts: ResolverTypeWrapper<AdjacentPosts>,
  SearchOutput: ResolverTypeWrapper<SearchOutput>,
  SearchResult: ResolverTypeWrapper<SearchResult>,
  Stats: ResolverTypeWrapper<Stats>,
  PostStatus: ResolverTypeWrapper<PostStatus>,
  Setting: ResolverTypeWrapper<Setting>,
  SettingOptions: SettingOptions,
  Theme: ResolverTypeWrapper<Theme>,
  ThemeSettings: ResolverTypeWrapper<ThemeSettings>,
  ThemeSettingsUIInputTypes: ThemeSettingsUiInputTypes,
  ThemeSettingsUITags: ThemeSettingsUiTags,
  Mutation: ResolverTypeWrapper<Context>,
  AuthorResponse: ResolverTypeWrapper<AuthorResponse>,
  LoginResponse: ResolverTypeWrapper<LoginResponse>,
  ForgotPasswordResponse: ResolverTypeWrapper<ForgotPasswordResponse>,
  InputAuthor: InputAuthor,
  Social: Social,
  DeleteResponse: ResolverTypeWrapper<DeleteResponse>,
  UpdateResponse: ResolverTypeWrapper<UpdateResponse>,
  InputCreatePost: InputCreatePost,
  TaxonomyInputType: TaxonomyInputType,
  Response: ResolverTypeWrapper<Response>,
  InputUpdatePost: InputUpdatePost,
  OptionInputType: OptionInputType,
  EditTaxResponse: ResolverTypeWrapper<EditTaxResponse>,
  InputThemeSettings: InputThemeSettings,
  PostFilters: PostFilters,
  FilterKeys: FilterKeys,
  EnumPermissions: EnumPermissions,
};

/** Mapping between all available schema types and the resolvers parents */
export type ResolversParentTypes = {
  Query: Context,
  Int: Scalars['Int'],
  String: Scalars['String'],
  Author: Author,
  TypeSocial: TypeSocial,
  Role: Role,
  EnumRoles: EnumRoles,
  Permission: Permission,
  CreateAuthorResponse: CreateAuthorResponse,
  Boolean: Scalars['Boolean'],
  Error: Error,
  MediaFiltersWithPagination: MediaFiltersWithPagination,
  MediaNode: MediaNode,
  Media: Media,
  Date: Scalars['Date'],
  SinglePostFilters: SinglePostFilters,
  Post: Post,
  Taxonomy: Taxonomy,
  TaxonomyTypes: TaxonomyTypes,
  PostFiltersWithPagination: PostFiltersWithPagination,
  PostSortBy: PostSortBy,
  PostStatusOptions: PostStatusOptions,
  PostTypes: PostTypes,
  PostNode: PostNode,
  MenuFiltersWithPagination: MenuFiltersWithPagination,
  MenuTypes: MenuTypes,
  PostTaxonomyNode: PostTaxonomyNode,
  AdjacentPosts: AdjacentPosts,
  SearchOutput: SearchOutput,
  SearchResult: SearchResult,
  Stats: Stats,
  PostStatus: PostStatus,
  Setting: Setting,
  SettingOptions: SettingOptions,
  Theme: Theme,
  ThemeSettings: ThemeSettings,
  ThemeSettingsUIInputTypes: ThemeSettingsUiInputTypes,
  ThemeSettingsUITags: ThemeSettingsUiTags,
  Mutation: Context,
  AuthorResponse: AuthorResponse,
  LoginResponse: LoginResponse,
  ForgotPasswordResponse: ForgotPasswordResponse,
  InputAuthor: InputAuthor,
  Social: Social,
  DeleteResponse: DeleteResponse,
  UpdateResponse: UpdateResponse,
  InputCreatePost: InputCreatePost,
  TaxonomyInputType: TaxonomyInputType,
  Response: Response,
  InputUpdatePost: InputUpdatePost,
  OptionInputType: OptionInputType,
  EditTaxResponse: EditTaxResponse,
  InputThemeSettings: InputThemeSettings,
  PostFilters: PostFilters,
  FilterKeys: FilterKeys,
  EnumPermissions: EnumPermissions,
};

export type AdjacentPostsResolvers<ContextType = Context, ParentType extends ResolversParentTypes['AdjacentPosts'] = ResolversParentTypes['AdjacentPosts']> = {
  previous?: Resolver<Maybe<ResolversTypes['Post']>, ParentType, ContextType>,
  next?: Resolver<Maybe<ResolversTypes['Post']>, ParentType, ContextType>,
};

export type AuthorResolvers<ContextType = Context, ParentType extends ResolversParentTypes['Author'] = ResolversParentTypes['Author']> = {
  id?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>,
  username?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>,
  email?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>,
  fname?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>,
  lname?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>,
  social?: Resolver<Maybe<ResolversTypes['TypeSocial']>, ParentType, ContextType>,
  role?: Resolver<Maybe<ResolversTypes['Role']>, ParentType, ContextType>,
  bio?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>,
  avatar?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>,
};

export type AuthorResponseResolvers<ContextType = Context, ParentType extends ResolversParentTypes['AuthorResponse'] = ResolversParentTypes['AuthorResponse']> = {
  ok?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>,
  errors?: Resolver<Maybe<Array<ResolversTypes['Error']>>, ParentType, ContextType>,
  data?: Resolver<Maybe<ResolversTypes['Author']>, ParentType, ContextType>,
};

export type CreateAuthorResponseResolvers<ContextType = Context, ParentType extends ResolversParentTypes['CreateAuthorResponse'] = ResolversParentTypes['CreateAuthorResponse']> = {
  ok?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>,
  errors?: Resolver<Maybe<Array<ResolversTypes['Error']>>, ParentType, ContextType>,
};

export interface DateScalarConfig extends GraphQLScalarTypeConfig<ResolversTypes['Date'], any> {
  name: 'Date'
}

export type DeleteResponseResolvers<ContextType = Context, ParentType extends ResolversParentTypes['DeleteResponse'] = ResolversParentTypes['DeleteResponse']> = {
  ok?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>,
};

export type EditTaxResponseResolvers<ContextType = Context, ParentType extends ResolversParentTypes['EditTaxResponse'] = ResolversParentTypes['EditTaxResponse']> = {
  ok?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>,
  id?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>,
  errors?: Resolver<Maybe<Array<ResolversTypes['Error']>>, ParentType, ContextType>,
};

export type ErrorResolvers<ContextType = Context, ParentType extends ResolversParentTypes['Error'] = ResolversParentTypes['Error']> = {
  path?: Resolver<ResolversTypes['String'], ParentType, ContextType>,
  message?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>,
};

export type ForgotPasswordResponseResolvers<ContextType = Context, ParentType extends ResolversParentTypes['ForgotPasswordResponse'] = ResolversParentTypes['ForgotPasswordResponse']> = {
  ok?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>,
  msg?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>,
};

export type LoginResponseResolvers<ContextType = Context, ParentType extends ResolversParentTypes['LoginResponse'] = ResolversParentTypes['LoginResponse']> = {
  ok?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>,
  token?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>,
  data?: Resolver<Maybe<ResolversTypes['Author']>, ParentType, ContextType>,
  errors?: Resolver<Maybe<Array<ResolversTypes['Error']>>, ParentType, ContextType>,
};

export type MediaResolvers<ContextType = Context, ParentType extends ResolversParentTypes['Media'] = ResolversParentTypes['Media']> = {
  id?: Resolver<ResolversTypes['Int'], ParentType, ContextType>,
  authorId?: Resolver<ResolversTypes['Int'], ParentType, ContextType>,
  url?: Resolver<ResolversTypes['String'], ParentType, ContextType>,
  createdAt?: Resolver<ResolversTypes['Date'], ParentType, ContextType>,
  name?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>,
  description?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>,
};

export type MediaNodeResolvers<ContextType = Context, ParentType extends ResolversParentTypes['MediaNode'] = ResolversParentTypes['MediaNode']> = {
  count?: Resolver<ResolversTypes['Int'], ParentType, ContextType>,
  rows?: Resolver<Array<Maybe<ResolversTypes['Media']>>, ParentType, ContextType>,
};

export type MutationResolvers<ContextType = Context, ParentType extends ResolversParentTypes['Mutation'] = ResolversParentTypes['Mutation']> = {
  register?: Resolver<ResolversTypes['AuthorResponse'], ParentType, ContextType, RequireFields<MutationRegisterArgs, 'username' | 'password' | 'email'>>,
  login?: Resolver<ResolversTypes['LoginResponse'], ParentType, ContextType, RequireFields<MutationLoginArgs, 'password'>>,
  forgotPassword?: Resolver<ResolversTypes['ForgotPasswordResponse'], ParentType, ContextType, RequireFields<MutationForgotPasswordArgs, 'email'>>,
  resetPassword?: Resolver<ResolversTypes['ForgotPasswordResponse'], ParentType, ContextType, RequireFields<MutationResetPasswordArgs, 'password' | 'token'>>,
  updateAuthor?: Resolver<Maybe<ResolversTypes['AuthorResponse']>, ParentType, ContextType, RequireFields<MutationUpdateAuthorArgs, 'author'>>,
  createAuthor?: Resolver<ResolversTypes['CreateAuthorResponse'], ParentType, ContextType, RequireFields<MutationCreateAuthorArgs, 'email'>>,
  sendMail?: Resolver<Maybe<ResolversTypes['Boolean']>, ParentType, ContextType, RequireFields<MutationSendMailArgs, 'to'>>,
  insertMedia?: Resolver<Maybe<ResolversTypes['Media']>, ParentType, ContextType, MutationInsertMediaArgs>,
  deleteMedia?: Resolver<Maybe<ResolversTypes['DeleteResponse']>, ParentType, ContextType, RequireFields<MutationDeleteMediaArgs, 'ids'>>,
  updateMedia?: Resolver<Maybe<ResolversTypes['UpdateResponse']>, ParentType, ContextType, RequireFields<MutationUpdateMediaArgs, 'id'>>,
  createPost?: Resolver<ResolversTypes['Response'], ParentType, ContextType, MutationCreatePostArgs>,
  updatePost?: Resolver<ResolversTypes['Response'], ParentType, ContextType, MutationUpdatePostArgs>,
  deletePosts?: Resolver<ResolversTypes['Response'], ParentType, ContextType, MutationDeletePostsArgs>,
  uploadFile?: Resolver<ResolversTypes['Response'], ParentType, ContextType, MutationUploadFileArgs>,
  updateOptions?: Resolver<Array<ResolversTypes['Setting']>, ParentType, ContextType, MutationUpdateOptionsArgs>,
  updateTaxonomy?: Resolver<ResolversTypes['EditTaxResponse'], ParentType, ContextType, RequireFields<MutationUpdateTaxonomyArgs, 'id' | 'type'>>,
  deleteTaxonomy?: Resolver<ResolversTypes['EditTaxResponse'], ParentType, ContextType, RequireFields<MutationDeleteTaxonomyArgs, 'id'>>,
  updateThemes?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType, RequireFields<MutationUpdateThemesArgs, 'name' | 'settings'>>,
  insertThemes?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType, RequireFields<MutationInsertThemesArgs, 'name' | 'settings'>>,
};

export type PermissionResolvers<ContextType = Context, ParentType extends ResolversParentTypes['Permission'] = ResolversParentTypes['Permission']> = {
  id?: Resolver<ResolversTypes['Int'], ParentType, ContextType>,
  name?: Resolver<ResolversTypes['String'], ParentType, ContextType>,
};

export type PostResolvers<ContextType = Context, ParentType extends ResolversParentTypes['Post'] = ResolversParentTypes['Post']> = {
  id?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>,
  title?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>,
  body?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>,
  author?: Resolver<Maybe<ResolversTypes['Author']>, ParentType, ContextType>,
  excerpt?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>,
  cover_image?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>,
  type?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>,
  status?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>,
  slug?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>,
  mode?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>,
  createdAt?: Resolver<Maybe<ResolversTypes['Date']>, ParentType, ContextType>,
  publishedAt?: Resolver<Maybe<ResolversTypes['Date']>, ParentType, ContextType>,
  updatedAt?: Resolver<Maybe<ResolversTypes['Date']>, ParentType, ContextType>,
  taxonomies?: Resolver<Maybe<Array<Maybe<ResolversTypes['Taxonomy']>>>, ParentType, ContextType>,
};

export type PostNodeResolvers<ContextType = Context, ParentType extends ResolversParentTypes['PostNode'] = ResolversParentTypes['PostNode']> = {
  count?: Resolver<ResolversTypes['Int'], ParentType, ContextType>,
  rows?: Resolver<Array<ResolversTypes['Post']>, ParentType, ContextType>,
};

export type PostStatusResolvers<ContextType = Context, ParentType extends ResolversParentTypes['PostStatus'] = ResolversParentTypes['PostStatus']> = {
  published?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>,
  drafts?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>,
};

export type PostTaxonomyNodeResolvers<ContextType = Context, ParentType extends ResolversParentTypes['PostTaxonomyNode'] = ResolversParentTypes['PostTaxonomyNode']> = {
  count?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>,
  rows?: Resolver<Maybe<Array<Maybe<ResolversTypes['Post']>>>, ParentType, ContextType>,
};

export type QueryResolvers<ContextType = Context, ParentType extends ResolversParentTypes['Query'] = ResolversParentTypes['Query']> = {
  author?: Resolver<ResolversTypes['Author'], ParentType, ContextType, RequireFields<QueryAuthorArgs, 'id'>>,
  authors?: Resolver<Array<Maybe<ResolversTypes['Author']>>, ParentType, ContextType>,
  me?: Resolver<Maybe<ResolversTypes['Author']>, ParentType, ContextType>,
  validateToken?: Resolver<Maybe<ResolversTypes['CreateAuthorResponse']>, ParentType, ContextType>,
  media?: Resolver<ResolversTypes['MediaNode'], ParentType, ContextType, QueryMediaArgs>,
  post?: Resolver<Maybe<ResolversTypes['Post']>, ParentType, ContextType, QueryPostArgs>,
  posts?: Resolver<ResolversTypes['PostNode'], ParentType, ContextType, QueryPostsArgs>,
  menuContent?: Resolver<Maybe<ResolversTypes['PostTaxonomyNode']>, ParentType, ContextType, QueryMenuContentArgs>,
  postsByTaxinomySlug?: Resolver<Maybe<ResolversTypes['PostTaxonomyNode']>, ParentType, ContextType, RequireFields<QueryPostsByTaxinomySlugArgs, 'type' | 'slug'>>,
  adjacentPosts?: Resolver<Maybe<ResolversTypes['AdjacentPosts']>, ParentType, ContextType, QueryAdjacentPostsArgs>,
  search?: Resolver<Maybe<ResolversTypes['SearchOutput']>, ParentType, ContextType, RequireFields<QuerySearchArgs, 'query'>>,
  stats?: Resolver<Maybe<ResolversTypes['Stats']>, ParentType, ContextType>,
  roles?: Resolver<Array<ResolversTypes['Role']>, ParentType, ContextType>,
  settings?: Resolver<Array<ResolversTypes['Setting']>, ParentType, ContextType, QuerySettingsArgs>,
  taxonomies?: Resolver<Array<ResolversTypes['Taxonomy']>, ParentType, ContextType, QueryTaxonomiesArgs>,
  activeTaxonomies?: Resolver<Array<Maybe<ResolversTypes['Taxonomy']>>, ParentType, ContextType, QueryActiveTaxonomiesArgs>,
  themes?: Resolver<Array<ResolversTypes['Theme']>, ParentType, ContextType, QueryThemesArgs>,
};

export type ResponseResolvers<ContextType = Context, ParentType extends ResolversParentTypes['Response'] = ResolversParentTypes['Response']> = {
  ok?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>,
  post?: Resolver<Maybe<ResolversTypes['Post']>, ParentType, ContextType>,
  errors?: Resolver<Maybe<Array<ResolversTypes['Error']>>, ParentType, ContextType>,
};

export type RoleResolvers<ContextType = Context, ParentType extends ResolversParentTypes['Role'] = ResolversParentTypes['Role']> = {
  id?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>,
  name?: Resolver<Maybe<ResolversTypes['EnumRoles']>, ParentType, ContextType>,
  permissions?: Resolver<Maybe<Array<Maybe<ResolversTypes['Permission']>>>, ParentType, ContextType>,
};

export type SearchOutputResolvers<ContextType = Context, ParentType extends ResolversParentTypes['SearchOutput'] = ResolversParentTypes['SearchOutput']> = {
  ok?: Resolver<Maybe<ResolversTypes['Boolean']>, ParentType, ContextType>,
  count?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>,
  rows?: Resolver<Maybe<Array<Maybe<ResolversTypes['SearchResult']>>>, ParentType, ContextType>,
};

export type SearchResultResolvers<ContextType = Context, ParentType extends ResolversParentTypes['SearchResult'] = ResolversParentTypes['SearchResult']> = {
  id?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>,
  title?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>,
  excerpt?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>,
  publishedAt?: Resolver<Maybe<ResolversTypes['Date']>, ParentType, ContextType>,
  slug?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>,
};

export type SettingResolvers<ContextType = Context, ParentType extends ResolversParentTypes['Setting'] = ResolversParentTypes['Setting']> = {
  id?: Resolver<ResolversTypes['Int'], ParentType, ContextType>,
  option?: Resolver<ResolversTypes['SettingOptions'], ParentType, ContextType>,
  value?: Resolver<ResolversTypes['String'], ParentType, ContextType>,
};

export type StatsResolvers<ContextType = Context, ParentType extends ResolversParentTypes['Stats'] = ResolversParentTypes['Stats']> = {
  posts?: Resolver<Maybe<ResolversTypes['PostStatus']>, ParentType, ContextType>,
  pages?: Resolver<Maybe<ResolversTypes['PostStatus']>, ParentType, ContextType>,
  tags?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>,
  categories?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>,
};

export type TaxonomyResolvers<ContextType = Context, ParentType extends ResolversParentTypes['Taxonomy'] = ResolversParentTypes['Taxonomy']> = {
  id?: Resolver<ResolversTypes['Int'], ParentType, ContextType>,
  name?: Resolver<ResolversTypes['String'], ParentType, ContextType>,
  type?: Resolver<ResolversTypes['TaxonomyTypes'], ParentType, ContextType>,
  desc?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>,
  slug?: Resolver<ResolversTypes['String'], ParentType, ContextType>,
};

export type ThemeResolvers<ContextType = Context, ParentType extends ResolversParentTypes['Theme'] = ResolversParentTypes['Theme']> = {
  name?: Resolver<ResolversTypes['String'], ParentType, ContextType>,
  settings?: Resolver<Array<ResolversTypes['ThemeSettings']>, ParentType, ContextType>,
};

export type ThemeSettingsResolvers<ContextType = Context, ParentType extends ResolversParentTypes['ThemeSettings'] = ResolversParentTypes['ThemeSettings']> = {
  name?: Resolver<ResolversTypes['String'], ParentType, ContextType>,
  type?: Resolver<ResolversTypes['ThemeSettingsUIInputTypes'], ParentType, ContextType>,
  tag?: Resolver<ResolversTypes['ThemeSettingsUITags'], ParentType, ContextType>,
  options?: Resolver<Maybe<Array<Maybe<ResolversTypes['String']>>>, ParentType, ContextType>,
  placeholder?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>,
  defaultValue?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>,
  changedValue?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>,
  selectedValue?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>,
  label?: Resolver<ResolversTypes['String'], ParentType, ContextType>,
  helpText?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>,
};

export type TypeSocialResolvers<ContextType = Context, ParentType extends ResolversParentTypes['TypeSocial'] = ResolversParentTypes['TypeSocial']> = {
  github?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>,
  facebook?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>,
  twitter?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>,
  instagram?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>,
};

export type UpdateResponseResolvers<ContextType = Context, ParentType extends ResolversParentTypes['UpdateResponse'] = ResolversParentTypes['UpdateResponse']> = {
  ok?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>,
  errors?: Resolver<Maybe<Array<Maybe<ResolversTypes['Error']>>>, ParentType, ContextType>,
};

export type Resolvers<ContextType = Context> = {
  AdjacentPosts?: AdjacentPostsResolvers<ContextType>,
  Author?: AuthorResolvers<ContextType>,
  AuthorResponse?: AuthorResponseResolvers<ContextType>,
  CreateAuthorResponse?: CreateAuthorResponseResolvers<ContextType>,
  Date?: GraphQLScalarType,
  DeleteResponse?: DeleteResponseResolvers<ContextType>,
  EditTaxResponse?: EditTaxResponseResolvers<ContextType>,
  Error?: ErrorResolvers<ContextType>,
  ForgotPasswordResponse?: ForgotPasswordResponseResolvers<ContextType>,
  LoginResponse?: LoginResponseResolvers<ContextType>,
  Media?: MediaResolvers<ContextType>,
  MediaNode?: MediaNodeResolvers<ContextType>,
  Mutation?: MutationResolvers<ContextType>,
  Permission?: PermissionResolvers<ContextType>,
  Post?: PostResolvers<ContextType>,
  PostNode?: PostNodeResolvers<ContextType>,
  PostStatus?: PostStatusResolvers<ContextType>,
  PostTaxonomyNode?: PostTaxonomyNodeResolvers<ContextType>,
  Query?: QueryResolvers<ContextType>,
  Response?: ResponseResolvers<ContextType>,
  Role?: RoleResolvers<ContextType>,
  SearchOutput?: SearchOutputResolvers<ContextType>,
  SearchResult?: SearchResultResolvers<ContextType>,
  Setting?: SettingResolvers<ContextType>,
  Stats?: StatsResolvers<ContextType>,
  Taxonomy?: TaxonomyResolvers<ContextType>,
  Theme?: ThemeResolvers<ContextType>,
  ThemeSettings?: ThemeSettingsResolvers<ContextType>,
  TypeSocial?: TypeSocialResolvers<ContextType>,
  UpdateResponse?: UpdateResponseResolvers<ContextType>,
};


/**
 * @deprecated
 * Use "Resolvers" root object instead. If you wish to get "IResolvers", add "typesPrefix: I" to your config.
*/
export type IResolvers<ContextType = Context> = Resolvers<ContextType>;