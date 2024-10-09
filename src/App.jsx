import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { About, Auth, Blog, ErrorPage, HomeLayout, Landing, Notes, Portfolio } from "./pages";
import {loader as blogLoader} from "./pages/util/load-data.js";

import "./App.css";

const router = createBrowserRouter([
  {
    path: "/",
    element: <HomeLayout />,
    errorElement: <ErrorPage />,
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
        loader: blogLoader,
      },
      {
        path: "notes",
        element: <Notes />,
      },
      {
        path: "auth",
        element: <Auth />,
      },
    ],
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
