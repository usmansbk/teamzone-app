import {
  createBrowserRouter,
  Navigate,
  Outlet,
  useLocation,
} from "react-router-dom";
import useAuth from "src/hooks/useAuth";
import Landing from "src/layouts/Landing";
import routeMap from "src/routeMap";
import PageNotFound from "./404";
import Dashboard from "../layouts/Dashboard";
import ErrorPage from "./ErrorPage";
import Home from "./Home";
import Login from "./Login";
import Terms from "./Terms";
import AppHome from "./AppHome";
import Team from "./Team";

function ProtectedRoute() {
  const { isLoggedIn } = useAuth();
  const location = useLocation();

  if (!isLoggedIn) {
    return <Navigate replace to={routeMap.login} state={{ from: location }} />;
  }

  return <Outlet />;
}

function RedirectAuth() {
  const { isLoggedIn } = useAuth();
  const location = useLocation();

  if (isLoggedIn) {
    return (
      <Navigate replace to={location.state?.from?.pathname || routeMap.app} />
    );
  }

  return <Outlet />;
}

const router = createBrowserRouter([
  {
    path: routeMap.home,
    element: <RedirectAuth />,
    errorElement: <ErrorPage />,
    children: [
      {
        element: <Landing />,
        children: [
          {
            index: true,
            element: <Home />,
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
    ],
  },
  {
    path: routeMap.terms,
    element: <Landing />,
    children: [
      {
        index: true,
        element: <Terms />,
      },
    ],
  },
  {
    path: routeMap.app,
    element: <ProtectedRoute />,
    errorElement: <ErrorPage />,
    children: [
      {
        element: <Dashboard />,
        children: [
          {
            index: true,
            element: <AppHome />,
          },
          {
            path: routeMap.team,
            element: <Team />,
          },
        ],
      },
    ],
  },
]);

export default router;
