import { useLoaderData } from "react-router-dom";

export const loader = async () => {
  return "something";
};

const Blog = () => {
  const data = useLoaderData();
  console.log(data); 
  
  return (
    <div>
      <h1>Blog</h1>
    </div>
  );
};

export default Blog;
