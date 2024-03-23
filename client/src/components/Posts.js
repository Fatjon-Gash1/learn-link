export default function Posts() {
  return (
    <div>
      <h2>Posts: </h2>
      {posts &&
        posts.map((post) => {
          return (
            <div key={post._id}>
              <h3>{post.content}</h3>
              <button onClick={() => deletePost(post._id)}>Delete post</button>
              <button onClick={() => fillUpdateForm(post)}>Update post</button>
            </div>
          );
        })}
    </div>
  );
}
