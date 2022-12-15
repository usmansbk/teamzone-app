import { LinearProgress } from "@mui/material";
import useMe from "src/hooks/api/useMe";
import usePageTracking from "src/hooks/usePageTracking";
import Layout from "./Layout";

export default function AppLayout() {
  const { loading, data, error } = useMe();
  usePageTracking();

  if (loading) {
    return <LinearProgress />;
  }

  if (error) {
    throw error;
  }

  return <Layout user={data as any} />;
}
