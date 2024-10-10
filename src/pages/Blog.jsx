import { collection, addDoc } from "firebase/firestore";
import { useLoaderData } from "react-router-dom";
import { useState } from "react";
import { db } from "./util/firebase.js";
import { useAuth } from "./util/auth-context.jsx";
import TextEditor from "./components/TextEditor.jsx";
import DOMPurify from "dompurify"; // Import DOMPurify for sanitizing HTML
import "./Blog.css";
import "quill/dist/quill.snow.css";
import like from "../assets/like-icon.svg";
import comment from "../assets/comment-icon.svg";

const Blog = () => {
  const initialPosts = useLoaderData();

  const [posts, setPosts] = useState(initialPosts);
  const [textVisible, setTextVisible] = useState({});
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [summary, setSummary] = useState("");
  const [text, setText] = useState("");
  const [error, setError] = useState(null);

  const { isAdmin } = useAuth(); // Get admin status from AuthContext

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevent default form behavior

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

  // Toggle text visibility for a specific post
  const toggleTextVisibility = (postId) => {
    setTextVisible((prevState) => ({
      ...prevState,
      [postId]: !prevState[postId], // Toggle the visibility for the specific post
    }));
  };

  return (
    <>
      {isAdmin ? (
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
            <TextEditor setText={setText} />
            <button className="btn" type="submit">
              Submit
            </button>
          </form>
        </div>
      ) : null}
      <div id="blog-posts-container" className="ql-snow">
        <ul>
          {posts.length > 0 ? (
            posts.map((post) => (
              <li key={post.id} className="container">
                <blockquote>test</blockquote>
                <h2>{post.title}</h2>
                <h4>
                  {post.date.toLocaleString()} | {post.author}
                </h4>
                <h3>{post.summary}</h3>

                {/* Only show the text if it's visible for this specific post */}
                {textVisible[post.id] && (
                  <div
                    className="blog-text-content ql-editor"
                    dangerouslySetInnerHTML={{
                      __html: post.text}}
                  />
                )}
                <div className="likes-comments">
                  <span className="likes">
                    <object data={like} width="24px" height="24px"></object>
                    <p>{post.likes}</p>
                  </span>
                  <span className="comments">
                    <object data={comment} width="24px" height="24px"></object>
                    <p>{post.comments}</p>
                  </span>
                </div>
                <button
                  className="btn"
                  onClick={() => toggleTextVisibility(post.id)}
                >
                  {textVisible[post.id] ? "Hide" : "Read more"}
                </button>
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
