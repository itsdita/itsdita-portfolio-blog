import { Link, useRouteError } from "react-router-dom";
import errorImage from "../assets/404-error-page.svg";

export default function ErrorPage() {
  const error = useRouteError();
  console.log(error);
  if (error.status === 404) {
    return (
      <div style={{"margin-top": "30px"}}>
        <img
          src={errorImage}
          alt="404 Error"
          style={{ width: "250px", height: "250px" }}
        />
        <h2>Ohhh...</h2>
        <p>Page not found.</p>
        <Link to="/">Go back to the home page</Link>
      </div>
    );
  }

  return (
    <div>
      <h1>Error</h1>
    </div>
  );
}
