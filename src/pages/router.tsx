import { createBrowserRouter } from "react-router-dom";
import Root from "src/layouts/Root";
import routeMap from "src/routeMap";
import PageNotFound from "./404";
import Home from "./Home";
import Login from "./Login";
import Terms from "./Terms";

const router = createBrowserRouter([
  {
    path: routeMap.home,
    element: <Root />,
    errorElement: <PageNotFound />,
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
    ],
  },
]);

export default router;
