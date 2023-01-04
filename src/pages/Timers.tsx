import { Add } from "@mui/icons-material";
import { Button, Stack, Typography } from "@mui/material";
import { Link } from "react-router-dom";
import routeMap from "src/routeMap";

export default function Timers() {
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
      <Typography variant="h4">No countdowns yet</Typography>
    </Stack>
  );
}
