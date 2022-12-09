import { LinearProgress } from "@mui/material";
import useMe from "src/hooks/api/useMe";
import Layout from "./Layout";

export default function AppLayout() {
  const { loading, data, error } = useMe();

  if (loading) {
    return <LinearProgress />;
  }

  if (error) {
    throw error;
  }

  if (!data) {
    throw new Error("No user found");
  }

  return <Layout user={data as any} />;
}
