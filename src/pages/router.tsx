import {
  createBrowserRouter,
  Navigate,
  Outlet,
  useLocation,
} from "react-router-dom";
import useAuth from "src/hooks/useAuth";
import Landing from "src/layouts/Landing";
import Settings from "src/layouts/Settings";
import routeMap from "src/routeMap";
import PageNotFound from "./404";
import App from "../layouts/App";
import ErrorPage from "./ErrorPage";
import Home from "./Home";
import Login from "./Login";
import Terms from "./Terms";
import Dashboard from "./Dashboard";
import Team from "./Team";
import EditProfile from "./EditProfile";

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
        element: <App />,
        children: [
          {
            index: true,
            element: <Dashboard />,
          },
          {
            path: routeMap.team,
            element: <Team />,
          },
        ],
      },
    ],
  },
  {
    path: routeMap.settings,
    element: <ProtectedRoute />,
    errorElement: <ErrorPage />,
    children: [
      {
        element: <Settings />,
        children: [
          {
            index: true,
            element: <EditProfile />,
          },
        ],
      },
    ],
  },
]);

export default router;
