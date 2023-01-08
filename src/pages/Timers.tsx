import { Add } from "@mui/icons-material";
import { Button, LinearProgress, Stack, Typography } from "@mui/material";
import { Link } from "react-router-dom";
import useGetTimers from "src/hooks/api/useGetTimers";
import routeMap from "src/routeMap";

export default function Timers() {
  const { loading, error, data } = useGetTimers();

  if (loading) {
    return <LinearProgress />;
  }

  if (error) {
    throw error;
  }

  return (
    <Stack spacing={1} p={2} maxWidth="lg">
      <Stack direction="row" justifyContent="space-between" spacing={1}>
        <Button
          size="small"
          variant="contained"
          startIcon={<Add fontSize="small" />}
          component={Link}
          to={routeMap.newTimer}
        >
          New
        </Button>
      </Stack>
      {!data?.length && <Typography variant="h4">No countdowns yet</Typography>}
      {data?.map((item) => (
        <Typography key={item!.id}>{item?.title}</Typography>
      ))}
    </Stack>
  );
}
