import { staticRequest } from "tinacms";
import { Layout } from "../../components/Layout";
import Link from "next/link";
import { useTina } from "tinacms/dist/edit-state";

const query = `{
  getPostList{
    edges {
      node {
        id
        sys {
          filename
        }
        values {
          title
        }
      }
    }
  }
}`;

export default function Home(props) {
  // data passes though in production mode and data is updated to the sidebar data in edit-mode
  const { data } = useTina({
    query,
    variables: {},
    data: props.data,
  });
  const postsList = data.getPostList.edges;

  postsList.map((post) => (
    console.log(post)
  ))
  return (
    <Layout>
      <h1>Posts</h1>
      <div>
        {postsList.map((post) => (
          <div key={post.node.id}>
            <Link href={`/posts/${post.node.sys.filename}`}>
              <a>{post.node.sys.filename}</a>
            </Link>
          </div>
        ))}
      </div>
    </Layout>
  );
}

export const getStaticProps = async () => {
  let data = {};
  const variables = {};
  try {
    data = await staticRequest({
      query,
      variables,
    });
  } catch {
    // swallow errors related to document creation
  }

  return {
    props: {
      data,
      //myOtherProp: 'some-other-data',
    },
  };
};
