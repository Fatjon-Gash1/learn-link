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
      <div>
        <h2>Update Post: </h2>
        <form onSubmit={store.updatePost}>
          <textarea
            onChange={store.updateFormChange}
            value={store.updateForm.content}
            name="content"
          />
          <button type="submit">update</button>
        </form>
      </div>
    );
}
