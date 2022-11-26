import { createBrowserRouter } from "react-router-dom";
import ErrorPage from "./ErrorPage";
import Home from "./Home";
import Login from "./Login";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
    errorElement: <ErrorPage />,
  },
  {
    path: "login",
    element: <Login />,
  },
]);

export default router;
