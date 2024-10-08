import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { About, Blog, HomeLayout, Landing, Notes, Portfolio } from "./pages";
import "./App.css";

const router = createBrowserRouter([
  {
    path: "/",
    element: <HomeLayout />,
    children: [
      {
        index: true,
        element: <Landing />,
      },
      {
        path: "about",
        element: <About />,
      },
      {
        path: "portfolio",
        element: <Portfolio />,
      },
      {
        path: "blog",
        element: <Blog />,
      },
      {
        path: "notes",
        element: <Notes />,
      },
    ],
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
