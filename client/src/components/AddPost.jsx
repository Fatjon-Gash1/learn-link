import postsStore from "../stores/postsStore";

export default function AddPost() {
  const store = postsStore((store) => {
    return {
      updateForm: store.updateForm,
      createPost: store.createPost,
      updateCFormField: store.updateCFormField,
      createForm: store.createForm,
    };
  });

  if (!store.updateForm._id)
    return (
      <form className="m-4 flex" onSubmit={store.createPost}>
        <textarea
          className="w-full p-2 resize-none outline-none placeholder-gray-500 bg-transparent"
          placeholder="Add a post"
          onChange={store.updateCFormField}
          value={store.createForm.content}
          name="content"
        />
        <button
          className="self-end m-1 py-2 px-3 text-white text-sm font-bold bg-blue-500 hover:bg-blue-700 rounded-3xl"
          type="submit"
        >
          post
        </button>
      </form>
    );
}
