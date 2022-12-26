import {
  createBrowserRouter,
  Navigate,
  Outlet,
  useLocation,
} from "react-router-dom";
import useAuth from "src/hooks/useAuth";
import Root from "src/layouts/Root";
import routeMap from "src/routeMap";
import PageNotFound from "./404";
import App from "../layouts/App";
import ErrorPage from "./ErrorPage";
import Home from "./Home";
import Login from "./Login";
import Terms from "./Terms";
import Dashboard from "./Dashboard";
import Team from "./Team";
import Settings from "./Settings";
import TeamInvitation from "./TeamInvitation";
import Timezone from "./Timezone";
import Calendar from "./Calendar";
import NewMeeting from "./NewMeeting";
import Meeting from "./Meeting";
import EditMeeting from "./EditMeeting";
import Timers from "./Timers";
import NewTimer from "./NewTimer";
import EditTimer from "./EditTimer";
import Timer from "./Timer";

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
        element: <Root />,
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
    element: <Root />,
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
          {
            path: routeMap.timezone,
            element: <Timezone />,
          },
          {
            path: routeMap.meetings,
            children: [
              {
                index: true,
                element: <Calendar />,
              },
              {
                path: routeMap.newMeeting,
                element: <NewMeeting />,
              },
              {
                path: routeMap.meeting,
                element: <Meeting />,
              },
              {
                path: routeMap.editMeeting,
                element: <EditMeeting />,
              },
            ],
          },
          {
            path: routeMap.timers,
            children: [
              {
                index: true,
                element: <Timers />,
              },
              {
                path: routeMap.newTimer,
                element: <NewTimer />,
              },
              {
                path: routeMap.editTimer,
                element: <EditTimer />,
              },
              {
                path: routeMap.timer,
                element: <Timer />,
              },
            ],
          },
        ],
      },
      {
        path: routeMap.settings,
        element: <Root />,
        children: [
          {
            index: true,
            element: <Settings />,
          },
        ],
      },
    ],
  },
  {
    path: routeMap.invite,
    element: <ProtectedRoute />,
    errorElement: <ErrorPage />,
    children: [
      {
        element: <Root />,
        children: [
          {
            index: true,
            element: <TeamInvitation />,
          },
        ],
      },
    ],
  },
]);

export default router;
