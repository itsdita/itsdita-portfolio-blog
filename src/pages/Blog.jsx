import { initializeApp } from "firebase/app";
import {
  getFirestore,
  collection,
  getDocs,
  addDoc,
  onSnapshot,
} from "firebase/firestore";
import { useLoaderData } from "react-router-dom";
import { useState, useEffect } from "react";

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID,
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export const loader = async () => {
  const blogPostsCollection = collection(db, "blogPosts");
  const blogPostsSnapshot = await getDocs(blogPostsCollection);
  const blogPosts = blogPostsSnapshot.docs.map((doc) => {
    const data = doc.data();

    // Convert Firestore Timestamp to Date object before returning
    if (data.date) {
      data.date = new Date(data.date.seconds * 1000);
    }

    return { id: doc.id, ...data };
  });

  return blogPosts;
};

const Blog = () => {
  const posts = useLoaderData();

  const [textVisible, setTextVisible] = useState(false);
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [summary, setSummary] = useState("");
  const [text, setText] = useState("");
  const [error, setError] = useState(null);

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevent default form behavior

    try {
      // Create a new blog post in Firestore
      await addDoc(collection(db, "blogPosts"), {
        title,
        author,
        summary,
        text,
        date: new Date(), // Current date as the post's date
        likes: 0, // Initialize likes to 0 or any default value you prefer
      });

      // Clear the form inputs after submission
      setTitle("");
      setAuthor("");
      setSummary("");
      setText("");
      setError(null); // Clear any previous error

      alert("Blog post added successfully!"); // Notify the user of success
    } catch (err) {
      console.error("Error adding document: ", err);
      setError("Failed to add the blog post. Please try again.");
    }
    window.location.reload(false);
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
