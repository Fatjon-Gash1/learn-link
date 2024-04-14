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
      <hr className="border-solid border-1 border-slate-500"></hr>
      <h2 className="m-2 text-center font-bold">Posts</h2>
      <hr className="border-solid border-2 border-slate-500"></hr>
      {store.posts &&
        store.posts.map((post) => {
          return <Post post={post} key={post._id} />;
        })}
    </div>
  );
}
