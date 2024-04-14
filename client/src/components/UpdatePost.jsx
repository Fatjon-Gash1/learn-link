import postsStore from "../stores/postsStore";

export default function UpdatePost() {
  const store = postsStore((store) => {
    return {
      updatePost: store.updatePost,
      updateFormChange: store.updateFormChange,
      updateForm: store.updateForm,
    };
  });

  if (store.updateForm._id)
    return (
        <form className="m-4 flex" onSubmit={store.updatePost}>
          <textarea
            className="w-full p-2 resize-none outline-none placeholder-gray-500 bg-transparent"
            onChange={store.updateFormChange}
            value={store.updateForm.content}
            name="content"
          />
          <button
            className="self-end m-1 py-2 px-3 text-white text-sm font-bold bg-blue-500 hover:bg-blue-700 rounded-xl"
            type="submit"
          >
            update
          </button>
        </form>
    );
}
