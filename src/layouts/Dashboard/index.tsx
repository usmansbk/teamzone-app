import { LinearProgress } from "@mui/material";
import useMe from "src/hooks/api/useMe";
import Layout from "./Layout";

export default function Dashboard() {
  const { loading, data } = useMe();

  if (loading) {
    return <LinearProgress />;
  }

  if (!data) {
    throw new Error("No user found");
  }

  return <Layout user={data as any} />;
}
