import { useState, useEffect } from "react";
import axios from "axios";
import postsStore from "../stores/postsStore";
import Posts from "./Posts";
import UpdatePost from "./UpdatePost";
import AddPost from "./AddPost";

function App() {
  const store = postsStore();

  // Hook to fetch posts
  useEffect(() => {
    store.fetchPosts();
  }, []);

  return (
    <div className="App">
      <Posts />
      <UpdatePost />
      <AddPost />
    </div>
  );
}

export default App;
