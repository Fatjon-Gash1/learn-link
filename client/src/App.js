import { useState } from "react";
import axios from "axios";

function App() {
  const [posts, setPosts] = useState(null);

  const fetchPosts = async () => {
    // Fetch posts from the server
    const response = await axios.get("http://localhost:3000/posts");
    // Set the posts state
  }

  return <div className="App">Test</div>;
}

export default App;
