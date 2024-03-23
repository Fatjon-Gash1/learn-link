import postsStore from "../stores/postsStore";

export default function Post({ post }) {
  const store = postsStore((store) => {
    return {
      deletePost: store.deletePost,
      fillUpdateForm: store.fillUpdateForm,
    };
  });

  return (
    <div key={post._id}>
      <h3>{post.content}</h3>
      <button onClick={() => store.deletePost(post._id)}>Delete post</button>
      <button onClick={() => store.fillUpdateForm(post)}>Update post</button>
    </div>
  );
}
