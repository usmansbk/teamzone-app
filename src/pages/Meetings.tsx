import { Add } from "@mui/icons-material";
import {
  Typography,
  Box,
  Stack,
  Button,
  Grid,
  Paper,
  LinearProgress,
} from "@mui/material";
import { memo } from "react";
import { Link } from "react-router-dom";
import useGetMeetings from "src/hooks/api/useGetMeetings";
import useMe from "src/hooks/api/useMe";
import routeMap from "src/routeMap";
import { getTimezoneDateTime } from "src/utils/dateTime";
import { Meeting } from "src/__generated__/graphql";

interface EventListProps {
  meetings: Meeting[];
}

interface EventItemProps {
  item: Meeting;
  currentTimezone: string;
}

const EventItem = memo(({ item, currentTimezone }: EventItemProps) => {
  const { title, from, to } = item;
  const start = getTimezoneDateTime(from, currentTimezone);
  const end = getTimezoneDateTime(to, currentTimezone);
  return (
    <Box>
      <Grid container gap={2} wrap="nowrap">
        <Grid item xs="auto" alignItems="center" textAlign="center">
          <Typography lineHeight={1} variant="h6" fontWeight={600}>
            {start.format("MMM")}
          </Typography>
          <Typography lineHeight={1} variant="h3" color="primary">
            {start.format("DD")}
          </Typography>
          <Typography lineHeight={1} variant="h6" fontWeight={700}>
            {start.format("ddd")}
          </Typography>
        </Grid>
        <Grid item zeroMinWidth width="100%">
          <Paper
            variant="outlined"
            sx={{
              p: 2,
            }}
          >
            <Typography variant="subtitle1">
              {start.format("HH:mm")} - {end.format("HH:mm")}
            </Typography>
            <Typography noWrap fontWeight={600}>
              {title}
            </Typography>
          </Paper>
        </Grid>
      </Grid>
    </Box>
  );
});

const EventList = memo(({ meetings }: EventListProps) => {
  const { data } = useMe();
  return (
    <Stack spacing={3}>
      {meetings.map((meeting) => (
        <Link
          key={meeting.id}
          to={routeMap.meeting.replace(":id", meeting.id)}
          style={{ color: "inherit", textDecoration: "none" }}
        >
          <EventItem
            key={meeting.id}
            item={meeting}
            currentTimezone={data?.timezone!}
          />
        </Link>
      ))}
    </Stack>
  );
});

export default function Meetings() {
  const { meetings, loading } = useGetMeetings();

  if (loading) {
    return <LinearProgress />;
  }

  return (
    <Box p={2}>
      <Box maxWidth="md">
        <Stack mb={1} direction="row" justifyContent="flex-end">
          <Box>
            <Button
              size="small"
              variant="contained"
              startIcon={<Add />}
              component={Link}
              to={routeMap.newMeeting}
            >
              New Meeting
            </Button>
          </Box>
        </Stack>
        {meetings?.length === 0 && (
          <Typography variant="h3">No upcoming meetings yet</Typography>
        )}
        <EventList meetings={meetings as Meeting[]} />
      </Box>
    </Box>
  );
}
