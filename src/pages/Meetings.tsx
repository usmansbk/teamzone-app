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
import groupBy from "lodash.groupby";
import { memo, useMemo } from "react";
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
    <Paper
      variant="outlined"
      sx={{
        p: 2,
      }}
    >
      <Stack rowGap={1}>
        <Box>
          <Typography variant="subtitle1" fontFamily="Inter">
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
  );
});

function SectionHeader({ title }: { title: string }) {
  const date = getLocalDateTime(title as any);
  return (
    <Box textAlign="center">
      <Typography
        lineHeight={1}
        variant="overline"
        fontWeight={600}
        fontFamily="Inter"
      >
        {date.format("MMM")}
      </Typography>
      <Typography
        lineHeight={1}
        variant="h4"
        color="primary"
        fontFamily="Inter"
      >
        {date.format("DD")}
      </Typography>
      <Typography
        lineHeight={1}
        variant="overline"
        fontWeight={700}
        fontFamily="Inter"
      >
        {date.format("ddd")}
      </Typography>
    </Box>
  );
}

const CalendarSection = memo(
  ({ section }: { section: [string, Meeting[]] }) => {
    const [title, data] = section;
    return (
      <Grid container wrap="nowrap">
        <Grid item xs={3} lg={1} p={0}>
          <SectionHeader title={title} />
        </Grid>
        <Grid item zeroMinWidth width="100%">
          <Stack rowGap={1}>
            {data.map((item) => (
              <Link
                key={item.id}
                to={routeMap.meeting.replace(":id", item.id)}
                style={{ color: "inherit", textDecoration: "none" }}
              >
                <EventItem item={item} />
              </Link>
            ))}
          </Stack>
        </Grid>
      </Grid>
    );
  }
);

const EventList = memo(({ meetings }: EventListProps) => {
  const groups = useMemo(
    () =>
      Object.entries(
        groupBy(meetings, (meeting) => meeting?.from.format("YYYY-MM-DD"))
      ),
    [meetings]
  );

  return (
    <Stack spacing={3}>
      {groups.map((section) => (
        <CalendarSection key={section[0]} section={section} />
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
