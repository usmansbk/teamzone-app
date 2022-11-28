import { Navigate, Outlet } from "react-router-dom";
import useAuth from "src/hooks/useAuth";
import routeMap from "src/routeMap";

export default function AppLayout() {
  const { isLoggedIn } = useAuth();

  if (!isLoggedIn) {
    return <Navigate replace to={routeMap.home} />;
  }

  return <Outlet />;
}
