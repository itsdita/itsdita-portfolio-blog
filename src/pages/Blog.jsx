import { collection, addDoc } from "firebase/firestore";
//import { getAuth } from "firebase/auth";
import { useLoaderData } from "react-router-dom";
import { useState } from "react";
import { db } from "./util/firebase.js";

const Blog = () => {
  const initialPosts = useLoaderData();

  const [posts, setPosts] = useState(initialPosts);

  const [textVisible, setTextVisible] = useState(false);
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [summary, setSummary] = useState("");
  const [text, setText] = useState("");
  const [error, setError] = useState(null);

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevent default form behavior

    // const auth = getAuth();
    // const user = auth.currentUser;

    // if (user) {
    //   const uid = user.uid;
    //   console.log("User ID: ", uid);
    // }

    try {
      // Create a new post object from the form data
      const newPost = {
        title,
        author,
        summary,
        text,
        date: new Date(), // Current date as the post's date
        likes: 0, // Initialize likes to 0
      };
      // Create a new blog post in Firestore
      const docRef = await addDoc(collection(db, "blogPosts"), newPost);

      // Clear the form inputs after submission
      setTitle("");
      setAuthor("");
      setSummary("");
      setText("");
      setError(null); // Clear any previous error

      // Update allPosts state
      setPosts((prevPosts) => [
        { id: docRef.id, ...newPost }, // Add the new post at the beginning of the list
        ...prevPosts,
      ]);

      alert("Blog post added successfully!"); // Notify the user of success
    } catch (err) {
      console.error("Error adding document: ", err);
      setError("Failed to add the blog post. Please try again.");
    }
  };

  return (
    <>
      <div id="new-blog-post" className="container">
        <h2>New blog post</h2>
        {error && <p style={{ color: "red" }}>{error}</p>}
        <form onSubmit={handleSubmit}>
          <label htmlFor="title">Title</label>
          <input
            type="text"
            id="title"
            name="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
          <label htmlFor="author">Author</label>
          <input
            type="text"
            id="author"
            name="author"
            value={author}
            onChange={(e) => setAuthor(e.target.value)}
          />
          <label htmlFor="summary">Summary</label>
          <input
            type="text"
            id="summary"
            name="summary"
            value={summary}
            onChange={(e) => setSummary(e.target.value)}
          />
          <label htmlFor="text">Text</label>
          <textarea
            id="text"
            name="text"
            value={text}
            onChange={(e) => setText(e.target.value)}
          ></textarea>
          <button className="btn" type="submit">
            Submit
          </button>
        </form>
      </div>
      <div id="blog-posts-container">
        <ul>
          {posts.length > 0 ? (
            posts.map((post) => (
              <li key={post.id} className="container">
                <h2>{post.title}</h2>
                <h3>
                  {post.date.toLocaleString()} | {post.author}
                </h3>
                <h4>{post.summary}</h4>
                {textVisible && <p>{post.text}</p>}
                <button
                  className="btn"
                  onClick={() => setTextVisible(!textVisible)}
                >
                  {textVisible ? "Hide" : "Read more"}
                </button>
                <p>likes: {post.likes}</p>
              </li>
            ))
          ) : (
            <p>No blog posts found.</p>
          )}
        </ul>
      </div>
    </>
  );
};

export default Blog;
