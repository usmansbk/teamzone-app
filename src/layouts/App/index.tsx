import { LinearProgress } from "@mui/material";
import { useEffect } from "react";
import useMe from "src/hooks/api/useMe";
import usePageTracking from "src/hooks/usePageTracking";
import { setDefaultTimezone } from "src/utils/dateTime";
import Layout from "./Layout";

export default function AppLayout() {
  const { loading, data, error } = useMe();
  usePageTracking();

  useEffect(() => {
    if (data?.timezone) {
      setDefaultTimezone(data.timezone);
    }
  }, [data?.timezone]);

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
