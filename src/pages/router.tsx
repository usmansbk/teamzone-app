import { createBrowserRouter } from "react-router-dom";
import AppLayout from "src/layouts/App";
import LandingLayout from "src/layouts/Landing";
import routeMap from "src/routeMap";
import PageNotFound from "./404";
import Dashboard from "./Dashboard";
import ErrorPage from "./ErrorPage";
import Home from "./Home";
import Login from "./Login";
import Terms from "./Terms";

const router = createBrowserRouter([
  {
    path: routeMap.home,
    element: <LandingLayout />,
    errorElement: <ErrorPage />,
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: routeMap.terms,
        element: <Terms />,
      },
      {
        path: routeMap.login,
        element: <Login />,
      },
      {
        path: "*",
        element: <PageNotFound />,
      },
    ],
  },
  {
    path: routeMap.app,
    element: <AppLayout />,
    errorElement: <ErrorPage />,
    children: [
      {
        index: true,
        element: <Dashboard />,
      },
    ],
  },
]);

export default router;
