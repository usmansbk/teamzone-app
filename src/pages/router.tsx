import { createBrowserRouter } from "react-router-dom";
import Root from "src/layouts/Root";
import ErrorPage from "./ErrorPage";
import Home from "./Home";
import Login from "./Login";
import Terms from "./Terms";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "terms",
        element: <Terms />,
      },
      {
        path: "login",
        element: <Login />,
      },
    ],
  },
]);

export default router;
