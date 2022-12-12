import { Add } from "@mui/icons-material";
import {
  Typography,
  Box,
  Stack,
  Button,
  CircularProgress,
} from "@mui/material";
import { Link } from "react-router-dom";
import useGetMeetings from "src/hooks/api/useGetMeetings";
import routeMap from "src/routeMap";

export default function Meetings() {
  const { data, loading } = useGetMeetings();

  if (loading) {
    return (
      <Box
        maxWidth="sm"
        display="flex"
        justifyContent="center"
        alignItems="center"
        flexGrow={1}
      >
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Box>
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
      <Box maxWidth="sm">
        {data?.length === 0 && (
          <Typography mt={4} variant="h3">
            No upcoming meetings yet
          </Typography>
        )}
      </Box>
    </Box>
  );
}
