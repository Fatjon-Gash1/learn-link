import PostsStore from "../stores/postsStore";

export default function Post({ post }) {
  const store = PostsStore((store) => ({
    deletePost: store.deletePost,
    fillUpdateForm: store.fillUpdateForm,
  }));

  return (
    <div className="my-6 mx-2" key={post._id}>
      <h3 className="p-4 rounded-md bg-gray-200 break-words overflow-auto">
        {post.content}
      </h3>
      <div>
        <button
          className="m-2 py-1 px-3 text-white text-sm font-bold bg-red-500 hover:bg-red-700 rounded-xl"
          onClick={() => store.deletePost(post._id)}
        >
          Delete post
        </button>
        <button
          className="m-2 py-1 px-3 text-white text-sm font-bold bg-blue-500 hover:bg-blue-700 rounded-xl"
          onClick={() => store.fillUpdateForm(post)}
        >
          Update post
        </button>
      </div>
    </div>
  );
}
