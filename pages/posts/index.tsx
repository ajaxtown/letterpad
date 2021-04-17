import { useSession } from "next-auth/client";
import {
  PostsDocument,
  PostsQuery,
  PostsQueryVariables,
  PostTypes,
} from "../../__generated__/lib/queries/queries.graphql";
import Link from "next/link";
import { initializeApollo } from "../../lib/apollo";
import { Layout, Table } from "antd";

import { Breakpoint } from "antd/lib/_util/responsiveObserve";
import {
  Author,
  Image,
  Tags,
} from "../../__generated__/lib/type-defs.graphqls";
const { Header, Content, Footer } = Layout;
import CustomLayout from "../../layouts/Layout";

const columns = [
  {
    title: "Image",
    dataIndex: "cover_image",
    key: "cover_image",
    responsive: ["md"] as Breakpoint[],
    render: (cover_image: Image) => <img src={cover_image.src} width={80} />,
  },
  {
    title: "Title",
    dataIndex: "title",
    key: "title",
    render: (title: string, record) => (
      <Link href={"/post/" + record.id}>
        <a>{title}</a>
      </Link>
    ),
  },
  {
    title: "Description",
    dataIndex: "excerpt",
    key: "excerpt",
    responsive: ["md"] as Breakpoint[],
  },
  {
    title: "Author",
    dataIndex: "author",
    key: "author",
    responsive: ["lg"] as Breakpoint[],
    render: (author: Author) => author.name,
  },
  {
    title: "Status",
    dataIndex: "status",
    key: "status",
  },
  {
    title: "Tags",
    dataIndex: "tags",
    key: "tags",
    render: (tags: Tags[]) => tags.map(tag => tag.name).join(", "),
  },
  {
    title: "Published",
    dataIndex: "publishedAt",
    key: "publishedAt",
  },
];

export default function Page(pageProps) {
  const [session, loading] = useSession();

  if (typeof window !== "undefined" && loading) return null;

  // If no session exists, display access denied message
  if (!session) {
    return <div>Access denied</div>;
  }

  const data = pageProps.data.posts.map(post => {
    return {
      ...post,
      key: post.id,
    };
  });

  // If session exists, display content
  return (
    <CustomLayout>
      <Content style={{ margin: "24px 16px 0" }}>
        <div
          className="site-layout-background"
          style={{ padding: 24, minHeight: "77vh" }}
        >
          <Table columns={columns} dataSource={data} />
        </div>
      </Content>
    </CustomLayout>
  );
}

export async function getServerSideProps(context) {
  const apolloClient = await initializeApollo({}, context);

  const post = await apolloClient.query<PostsQuery, PostsQueryVariables>({
    query: PostsDocument,
    variables: {
      filters: {
        type: PostTypes.Post,
      },
    },
  });
  return {
    props: {
      data: post.data,
    },
  };
}
