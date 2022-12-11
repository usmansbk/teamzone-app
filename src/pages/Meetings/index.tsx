import { Add } from "@mui/icons-material";
import { Typography, Box, Stack, Button } from "@mui/material";
import { Link } from "react-router-dom";
import routeMap from "src/routeMap";

export default function Meetings() {
  return (
    <Box flexGrow={1} p={3} pt={0}>
      <Stack>
        <Box>
          <Button
            variant="outlined"
            startIcon={<Add />}
            component={Link}
            to={routeMap.newMeeting}
          >
            New Meeting
          </Button>
        </Box>
      </Stack>
      <Box>
        <Typography mt={4} variant="h3">
          No Upcoming meetings yet
        </Typography>
      </Box>
    </Box>
  );
}
