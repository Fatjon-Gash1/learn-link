import { useState, useEffect } from "react";
import axios from "axios";
import Posts from "./Posts";

function App() {
  // Define States
  const [posts, setPosts] = useState(null);
  const [createForm, setCreateForm] = useState({
    content: "",
  });
  const [updateForm, setUpdateForm] = useState({
    _id: null,
    content: "",
  });

  // React hook to fetch posts
  useEffect(() => {
    fetchPosts();
  }, []);

  // Functions
  const fetchPosts = async () => {
    // Fetch posts from the server
    const response = await axios.get("http://localhost:3000/posts");
    // Set the posts state
    setPosts(response.data.posts);
  };

  const updateCFormField = (e) => {
    const { name, value } = e.target;

    setCreateForm({
      ...createForm,
      [name]: value,
    });
  };

  const createPost = async (e) => {
    e.preventDefault();

    // Create a post
    const resp = await axios.post("http://localhost:3000/posts", createForm);

    // Update state
    setPosts([...posts, resp.data.post]);

    // Clear form state
    setCreateForm({ content: "" });
  };

  const deletePost = async (_id) => {
    // Delete the post
    const resp = await axios.delete(`http://localhost:3000/posts/${_id}`);

    // Update state
    const newPosts = [...posts].filter((post) => {
      return post._id !== _id;
    });

    setPosts(newPosts);
  };

  const UpdateFormChange = (e) => {
    const { name, value } = e.target;

    setUpdateForm({
      ...updateForm,
      [name]: value,
    });
  };

  const fillUpdateForm = (post) => {
    // Set state on update form
    setUpdateForm({ content: post.content, _id: post._id });
  };

  const updatePost = async (e) => {
    e.preventDefault();

    const { content } = updateForm;

    // Send the update request
    const resp = await axios.put(
      `http://localhost:3000/posts/${updateForm._id}`,
      { content }
    );

    // Update state
    const newPosts = [...posts];
    const postIndex = posts.findIndex((post) => {
      return post._id === updateForm._id;
    });
    newPosts[postIndex] = resp.data.post;

    setPosts(newPosts);

    // Clear form state
    setUpdateForm({_id: null, content: ""});
  };

  return (
    <div className="App">
      <Posts />

      {updateForm._id && (
        <div>
          <h2>Update Post: </h2>
          <form onSubmit={updatePost}>
            <textarea
              onChange={UpdateFormChange}
              value={updateForm.content}
              name="content"
            />
            <button type="submit">Update post</button>
          </form>
        </div>
      )}

      {!updateForm._id && (
        <div>
          <h2>Add Post: </h2>
          <form onSubmit={createPost}>
            <textarea
              onChange={updateCFormField}
              value={createForm.content}
              name="content"
            />
            <button type="submit">Create post</button>
          </form>
        </div>
      )}
    </div>
  );
}

export default App;
