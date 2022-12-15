import { Add } from "@mui/icons-material";
import {
  Typography,
  Box,
  Stack,
  Button,
  Grid,
  Paper,
  LinearProgress,
  Chip,
} from "@mui/material";
import { memo } from "react";
import { Link } from "react-router-dom";
import useGetMeetings from "src/hooks/api/useGetMeetings";
import routeMap from "src/routeMap";
import { getLocalDateTime } from "src/utils/dateTime";
import { formatEventTime } from "src/utils/event";
import { Meeting } from "src/__generated__/graphql";

interface EventListProps {
  meetings: Meeting[];
}

interface EventItemProps {
  item: Meeting;
}

const EventItem = memo(({ item }: EventItemProps) => {
  const { title, from, to, teams } = item;
  const start = getLocalDateTime(from);
  const end = getLocalDateTime(to);
  return (
    <Box>
      <Grid container gap={1} wrap="nowrap">
        <Grid item xs={1} textAlign="center">
          <Typography lineHeight={1} variant="overline" fontWeight={600}>
            {start.format("MMM")}
          </Typography>
          <Typography lineHeight={1} variant="h4" color="primary">
            {start.format("DD")}
          </Typography>
          <Typography lineHeight={1} variant="overline" fontWeight={700}>
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
            <Stack rowGap={1}>
              <Box>
                <Typography variant="subtitle1">
                  {formatEventTime(start, end)}
                </Typography>
                <Typography noWrap fontWeight={600}>
                  {title}
                </Typography>
              </Box>
              <Stack direction="row" rowGap={1} columnGap={1} flexWrap="wrap">
                {teams.map((t) => (
                  <Box key={t!.id}>
                    <Chip
                      label={
                        <Typography variant="caption" fontWeight={700}>
                          {t?.name}
                        </Typography>
                      }
                      size="small"
                    />
                  </Box>
                ))}
              </Stack>
            </Stack>
          </Paper>
        </Grid>
      </Grid>
    </Box>
  );
});

const EventList = memo(({ meetings }: EventListProps) => (
  <Stack spacing={3}>
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
));

export default function Meetings() {
  const { meetings, loading } = useGetMeetings();

  if (loading) {
    return <LinearProgress />;
  }

  return (
    <Box p={2} maxWidth="md">
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
  );
}
