import postsStore from "../stores/postsStore";
import Post from "./Post";

export default function Posts() {
  const store = postsStore((store) => {
    return {
      posts: store.posts,
    }; 
  });

  return (
    <div>
      <h2>Posts: </h2>
      {store.posts &&
        store.posts.map((post) => {
          return <Post post={post} key={post._id} />;
        })}
    </div>
  );
}
