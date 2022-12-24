import { Add, ArrowBack, ArrowForward } from "@mui/icons-material";
import {
  Typography,
  Box,
  Stack,
  Button,
  LinearProgress,
  IconButton,
  Grid,
  TextField,
} from "@mui/material";
import { MobileDatePicker, StaticDatePicker } from "@mui/x-date-pickers";
import type { Dayjs } from "dayjs";
import { useEffect, useState } from "react";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import Agenda from "src/components/Agenda";
import useGetMeetings from "src/hooks/api/useGetMeetings";
import routeMap from "src/routeMap";
import { getCurrentDateTime, getLocalDateTime } from "src/utils/dateTime";
import { Meeting } from "src/__generated__/graphql";

const DATE_FORMAT = "YYYY-MM-DD";

function CalendarHeader({ date }: { date: Dayjs }) {
  return (
    <Stack spacing={1}>
      <Stack spacing={1} direction="row" alignItems="center">
        <Button
          variant="outlined"
          size="small"
          component={Link}
          to={`?day=${getCurrentDateTime().format(DATE_FORMAT)}`}
        >
          Today
        </Button>
        <Stack direction="row">
          <Box>
            <IconButton
              size="small"
              component={Link}
              to={`?day=${date.subtract(1, "day").format(DATE_FORMAT)}`}
            >
              <ArrowBack fontSize="small" />
            </IconButton>
          </Box>
          <Box>
            <IconButton
              size="small"
              component={Link}
              to={`?day=${date.add(1, "day").format(DATE_FORMAT)}`}
            >
              <ArrowForward fontSize="small" />
            </IconButton>
          </Box>
        </Stack>
      </Stack>
    </Stack>
  );
}

export default function Calendar() {
  const { meetings, loading } = useGetMeetings();
  const [q] = useSearchParams();
  const day = q.get("day");
  const [date, setDate] = useState(
    day ? getLocalDateTime(day) : getCurrentDateTime()
  );
  const navigate = useNavigate();

  useEffect(() => {
    if (day) {
      setDate(getLocalDateTime(day));
    }
  }, [day]);

  if (loading) {
    return <LinearProgress />;
  }

  return (
    <Box p={2}>
      <Stack mb={1} direction="row" justifyContent="space-between" spacing={1}>
        <CalendarHeader date={date} />
        <Box
          sx={{
            display: {
              xs: "none",
              md: "block",
            },
          }}
        >
          <Button
            size="small"
            variant="contained"
            startIcon={<Add fontSize="small" />}
            component={Link}
            to={routeMap.newMeeting}
          >
            New Meeting
          </Button>
        </Box>
        <Box
          sx={{
            display: {
              xs: "block",
              md: "none",
            },
          }}
        >
          <IconButton size="small" component={Link} to={routeMap.newMeeting}>
            <Add fontSize="small" />
          </IconButton>
        </Box>
      </Stack>
      {meetings?.length === 0 && (
        <Box p={2}>
          <Typography variant="h3">No meetings</Typography>
        </Box>
      )}
      {!!meetings.length && (
        <Grid container rowGap={1}>
          <Grid item xs={12} lg="auto">
            <Box
              sx={{
                display: {
                  xs: "none",
                  lg: "block",
                },
              }}
            >
              <StaticDatePicker
                reduceAnimations
                showDaysOutsideCurrentMonth
                displayStaticWrapperAs="desktop"
                value={date}
                onChange={(value) => {
                  if (value) {
                    navigate(`?day=${value.tz().format(DATE_FORMAT)}`);
                  }
                }}
                renderInput={() => <div />}
              />
            </Box>
            <Box
              sx={{
                display: {
                  xs: "block",
                  lg: "none",
                },
              }}
            >
              <MobileDatePicker
                reduceAnimations
                showDaysOutsideCurrentMonth
                value={date}
                onChange={(value) => {
                  if (value) {
                    navigate(`?day=${value.tz().format(DATE_FORMAT)}`);
                  }
                }}
                renderInput={(params) => <TextField fullWidth {...params} />}
                inputFormat="ddd MMMM DD, YYYY"
              />
            </Box>
          </Grid>
          <Grid item flex="auto">
            <Agenda meetings={meetings as Meeting[]} selectedDate={date} />
          </Grid>
        </Grid>
      )}
    </Box>
  );
}
