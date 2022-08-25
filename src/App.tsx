import axios from "axios";
import React, { ChangeEvent, useEffect, useState } from "react";

interface IPost {
  id: number;
  title?: string;
  body?: string;
}

const App: React.FC = () => {
  const [posts, setPosts] = useState<IPost[]>([]);
  const [title, setTitle] = useState<string>("");
  const [body, setBody] = useState<string>("");

  async function getPosts() {
    try {
      const response = await axios.get(`https://jsonplaceholder.typicode.com/posts`);
      setPosts(response.data);
    } catch (error) {
      console.log("THE ERROR", error);
    }
  }

  async function sendPost() {
    try {
      const response = await axios.post(`https://jsonplaceholder.typicode.com/posts`, {
        title: title,
        body: body,
      });
      console.log(response.data);

      setPosts([response.data, ...posts]);
      setTitle("");
      setBody("");
    } catch (error) {
      console.log("The SEND POST ERROR", error);
    }
  }

  async function deletePost(post: IPost) {
    try {
      await axios.delete(`https://jsonplaceholder.typicode.com/posts/${post.id}`);

      const deletePost = posts.filter((item) => item.id !== post.id);
      console.table(deletePost);

      setPosts(deletePost);
    } catch (error) {
      console.log("The DELETE POST ERROR", error);
    }
  }

  useEffect(() => {
    getPosts();
  }, []);

  return (
    <div>
      <h1 className="text-xl">REST API Web Application</h1>

      <input
        type="text"
        onChange={(e: ChangeEvent<HTMLInputElement>) => setTitle(e.target.value)}
        placeholder="title..."
        className="border border-black"
      />

      <input
        onChange={(e: ChangeEvent<HTMLInputElement>) => setBody(e.target.value)}
        type="text"
        placeholder="body..."
        className="border border-black"
      />

      <button onClick={sendPost} className="text-white bg-orange-400 px-2.5 py-1.5 rounded-md block">
        Send Post
      </button>

      <ul className="mx-auto max-w-sm">
        {posts.map((post) => (
          <li key={post.id}>
            <h1>
              <span className="text-green-400 text-lg font-bold">The Title:</span> {post.title}
            </h1>
            <h2>
              <span className="text-blue-400 text-lg font-bold">The Body:</span> {post.body}
            </h2>

            <button onClick={() => deletePost(post)} className="bg-red-400 px-2.5 py-1.5 text-white rounded-md">
              Delete
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default App;
