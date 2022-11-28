import { createBrowserRouter, Navigate } from "react-router-dom";
import useAuth from "src/hooks/useAuth";
import LandingLayout from "src/layouts/Landing";
import routeMap from "src/routeMap";
import PageNotFound from "./404";
import Dashboard from "../layouts/Dashboard";
import ErrorPage from "./ErrorPage";
import Home from "./Home";
import Login from "./Login";
import Terms from "./Terms";
import AppHome from "./AppHome";

function ProtectedRoute({ children }: { children: JSX.Element }) {
  const { isLoggedIn } = useAuth();

  if (!isLoggedIn) {
    return <Navigate replace to={routeMap.home} />;
  }

  return children;
}

function RedirectAuth({ children }: { children: JSX.Element }) {
  const { isLoggedIn } = useAuth();

  if (isLoggedIn) {
    return <Navigate replace to={routeMap.app} />;
  }

  return children;
}

const router = createBrowserRouter([
  {
    path: routeMap.home,
    errorElement: <ErrorPage />,
    element: (
      <RedirectAuth>
        <LandingLayout />
      </RedirectAuth>
    ),
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
  {
    path: routeMap.terms,
    element: <LandingLayout />,
    children: [
      {
        index: true,
        element: <Terms />,
      },
    ],
  },
  {
    path: routeMap.app,
    element: (
      <ProtectedRoute>
        <Dashboard />
      </ProtectedRoute>
    ),
    errorElement: <ErrorPage />,
    children: [
      {
        index: true,
        element: <AppHome />,
      },
      {
        path: routeMap.team,
        element: <AppHome />,
      },
    ],
  },
]);

export default router;
