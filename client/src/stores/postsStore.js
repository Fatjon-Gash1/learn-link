import { create } from "zustand";
import axios from "axios";


const host = 'localhost';

const postsStore = create((set) => ({
  posts: null,

  createForm: {
    content: "",
  },

  updateForm: {
    _id: null,
    content: "",
  },

  fetchPosts: async () => {
    // Fetch posts from the server
    const resp = await axios.get(`http://${host}:3000/posts`);

    // Set the posts state
    set({ posts: resp.data.posts });
  },

  updateCFormField: (e) => {
    const { name, value } = e.target;

    set((state) => {
      return {
        createForm: {
          ...state.createForm,
          [name]: value,
        },
      };
    });
  },

  createPost: async (e) => {
    e.preventDefault();

    // Create a post
    const { createForm, posts } = postsStore.getState();
    const resp = await axios.post(`http://${host}:3000/posts`, createForm);

    // Update and clear form state
    set({
      posts: [...posts, resp.data.post],
      createForm: { content: "" },
    });
  },

  deletePost: async (_id) => {
    const { posts } = postsStore.getState();

    // Delete the post
    const resp = await axios.delete(`http://${host}:3000/posts/${_id}`);

    // Update state
    const newPosts = posts.filter((post) => {
      return post._id !== _id;
    });

    set({ posts: newPosts });
  },

  updateFormChange: (e) => {
    const { name, value } = e.target;

    set((state) => {
      return {
        updateForm: {
          ...state.updateForm,
          [name]: value,
        },
      };
    });
  },

  fillUpdateForm: ({ _id, content }) => {
    // Set state on update form
    set({
      updateForm: {
        _id,
        content,
      },
    });
  },

  updatePost: async (e) => {
    e.preventDefault();

    const {
      updateForm: { _id, content },
      posts,
    } = postsStore.getState();

    // Send the update request
    const resp = await axios.put(`http://${host}:3000/posts/${_id}`, {
      content,
    });

    // Update state
    const newPosts = [...posts];
    const postIndex = posts.findIndex((post) => {
      return post._id === _id;
    });
    newPosts[postIndex] = resp.data.post;

    // Clear form state
    set({ posts: newPosts, updateForm: { _id: null, content: "" } });
  },
}));

export default postsStore;