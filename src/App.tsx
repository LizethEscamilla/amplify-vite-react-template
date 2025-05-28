import { useState, useEffect } from "react";
import AddPost from "./components/AddPost";
import Post from "./components/Post";
import { useAuthenticator } from "@aws-amplify/ui-react";

interface PostType {
  userId: string;
  id: number;
  title: string;
  body: string;
}

function App() {
  const [posts, setPosts] = useState<PostType[]>([]);
  const { user, signOut } = useAuthenticator();

  useEffect(() => {
    fetch("https://jsonplaceholder.typicode.com/posts?_limit=4")
      .then((response) => response.json())
      .then((data) => setPosts(data));
  }, []);

  const addPost = (title: string, body: string) => {
    fetch("https://jsonplaceholder.typicode.com/posts", {
      method: "POST",
      body: JSON.stringify({
        title,
        body,
        userId: Math.random().toString(36).slice(2),
      }),
      headers: {
        "Content-type": "application/json; charset=UTF-8",
      },
    })
      .then((response) => response.json())
      .then((data) => setPosts((prevPosts) => [data, ...prevPosts]));
  };

  const deletePost = (id: number) => {
    fetch(`https://jsonplaceholder.typicode.com/posts/${id}`, {
      method: "DELETE",
    }).then((response) => {
      if (response.status === 200) {
        setPosts((prevPosts) => prevPosts.filter((post) => post.id !== id));
      }
    });
  };

  return (
    <main>
      <h1>{user?.signInDetails?.loginId}'s posts</h1>
      <AddPost addPost={addPost} />
      <section className="posts-container">
        <h2>Posts</h2>
        {posts.map((post) => (
          <Post
            key={post.id}
            id={post.id}
            title={post.title}
            body={post.body}
            deletePost={deletePost}
          />
        ))}
      </section>
      <button onClick={signOut}>Sign out</button>
    </main>
  );
}

export default App;

