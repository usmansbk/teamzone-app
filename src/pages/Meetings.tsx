import { Add } from "@mui/icons-material";
import {
  Typography,
  Box,
  Stack,
  Button,
  CircularProgress,
  Grid,
  Chip,
} from "@mui/material";
import { Link } from "react-router-dom";
import StyledPaper from "src/components/StyledPaper";
import useGetMeetings from "src/hooks/api/useGetMeetings";
import routeMap from "src/routeMap";
import { Meeting } from "src/__generated__/graphql";

interface EventListProps {
  meetings: Meeting[];
}

interface EventItemProps {
  item: Meeting;
}

const EventItem = ({ item }: EventItemProps) => {
  const { title, teams } = item;
  return (
    <Box>
      <Grid container spacing={2} wrap="nowrap">
        <Grid item xs="auto">
          <StyledPaper
            sx={{
              p: 2,
              py: 1,
              textAlign: "center",
            }}
            elevation={0}
          >
            <Typography variant="h6" fontWeight={600}>
              FEB
            </Typography>
            <Typography lineHeight={1} variant="h3">
              25
            </Typography>
            <Typography variant="h5" fontWeight={700}>
              Mon
            </Typography>
          </StyledPaper>
        </Grid>
        <Grid item zeroMinWidth>
          <Typography
            sx={{ wordBreak: "break-all" }}
            variant="h6"
            fontWeight={600}
          >
            {title}
          </Typography>
          <Stack direction="row" spacing={1}>
            {teams.map((team) => (
              <Chip
                size="small"
                sx={{ fontWeight: 600 }}
                key={team!.id}
                label={team?.name}
              />
            ))}
          </Stack>
        </Grid>
      </Grid>
    </Box>
  );
};

const EventList = ({ meetings }: EventListProps) => (
  <Stack spacing={3}>
    {meetings.map((meeting) => (
      <Link
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
