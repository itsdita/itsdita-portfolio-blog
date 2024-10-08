import { initializeApp } from "firebase/app";
import { getFirestore, collection, getDocs } from "firebase/firestore";
import { useLoaderData } from "react-router-dom";

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

  return (
    <div>
      <h1>Blog</h1>
      <ul>
        {posts.length > 0 ? (
          posts.map((post) => (
            <li key={post.id}>
              <h2>{post.title}</h2>
              <h3>{post.date.toLocaleString()} | {post.author}</h3>
              <h4>{post.summary}</h4>
              <p>{post.text}</p>
              <p>likes: {post.likes}</p>
            </li>
          ))
        ) : (
          <p>No blog posts found.</p>
        )}
      </ul>
    </div>
  );
};

export default Blog;
