import { Link, useRouteError } from "react-router-dom";
import errorImage from "../assets/404-error-page.svg";
import styled from "styled-components";

export default function ErrorPage() {
  const ErrorContainer = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    max-width: 600px;
    margin: 60px auto;
    img {
      width: 250px;
      height: auto;
      margin-bottom: 20px;
    }
    a {
    margin-top: 20px;
    text-decoration: none;
    text-transform: uppercase;
    color: blue;
    }
  `;
  const error = useRouteError();
  console.log(error);
  if (error.status === 404) {
    return (
      <ErrorContainer>
        <img src={errorImage} alt="404 Error" />
        <h2>Ohhh...</h2>
        <p>Page not found.</p>
        <Link to="/">Go back to the home page</Link>
      </ErrorContainer>
    );
  }

  return (
    <div>
      <h1>Error</h1>
    </div>
  );
}
