import { db } from "./firebase.js";
import { collection, getDocs } from "firebase/firestore";

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
