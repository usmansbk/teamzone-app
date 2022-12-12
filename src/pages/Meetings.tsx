import { Add } from "@mui/icons-material";
import {
  Typography,
  Box,
  Stack,
  Button,
  CircularProgress,
  Grid,
  Paper,
} from "@mui/material";
import { Link } from "react-router-dom";
import useGetMeetings from "src/hooks/api/useGetMeetings";
import routeMap from "src/routeMap";
import { getDay } from "src/utils/dateTime";
import { Meeting } from "src/__generated__/graphql";

interface EventListProps {
  meetings: Meeting[];
}

interface EventItemProps {
  item: Meeting;
}

const EventItem = ({ item }: EventItemProps) => {
  const { title, from, timezone } = item;
  const date = getDay(from, timezone);
  return (
    <Box>
      <Grid container gap={2} wrap="nowrap">
        <Grid item xs={2}>
          <Paper
            variant="outlined"
            sx={{
              p: 2,
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              flexDirection: "column",
            }}
          >
            <Typography lineHeight={1} variant="h6" fontWeight={600}>
              {date.format("MMM")}
            </Typography>
            <Typography lineHeight={1} variant="h3" color="primary">
              {date.format("DD")}
            </Typography>
            <Typography lineHeight={1} variant="h6" fontWeight={700}>
              {date.format("ddd")}
            </Typography>
          </Paper>
        </Grid>
        <Grid
          item
          zeroMinWidth
          sx={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
          }}
        >
          <Typography variant="subtitle1">
            {date.format("HH:mm")} - 12:00
          </Typography>
          <Typography noWrap variant="h5">
            {title}
          </Typography>
        </Grid>
      </Grid>
    </Box>
  );
};

const EventList = ({ meetings }: EventListProps) => (
  <Stack spacing={2}>
    {meetings.map((meeting) => (
      <Link
        key={meeting.id}
        to={routeMap.meeting.replace(":id", meeting.id)}
        style={{ color: "inherit", textDecoration: "none" }}
      >
        <EventItem key={meeting.id} item={meeting} />
      </Link>
    ))}
  </Stack>
);

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
      <Button
        variant="outlined"
        startIcon={<Add />}
        component={Link}
        to={routeMap.newMeeting}
      >
        New Meeting
      </Button>
      <Box maxWidth="sm" mt={2}>
        {data?.length === 0 && (
          <Typography variant="h3">No upcoming meetings yet</Typography>
        )}
        <EventList meetings={data! as Meeting[]} />
      </Box>
    </Box>
  );
}
