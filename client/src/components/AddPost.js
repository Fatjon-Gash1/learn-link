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
      <div>
        <h2>Add Post: </h2>
        <form onSubmit={store.createPost}>
          <textarea
            onChange={store.updateCFormField}
            value={store.createForm.content}
            name="content"
          />
          <button type="submit">post</button>
        </form>
      </div>
    );
}
