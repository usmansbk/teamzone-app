import { Add, Sort } from "@mui/icons-material";
import {
  Typography,
  Box,
  Stack,
  Button,
  LinearProgress,
  Menu,
  MenuItem,
} from "@mui/material";
import { useState, MouseEvent } from "react";
import { Link, useSearchParams } from "react-router-dom";
import Agenda from "src/components/Agenda";
import useGetMeetings from "src/hooks/api/useGetMeetings";
import routeMap from "src/routeMap";
import { Meeting, MeetingSort } from "src/__generated__/graphql";

export default function Meetings() {
  const [q] = useSearchParams();
  const sort =
    q.get("sort") === MeetingSort.Past
      ? MeetingSort.Past
      : MeetingSort.Upcoming;
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const { meetings, loading } = useGetMeetings({
    sort,
  });

  const open = Boolean(anchorEl);
  const handleClick = (event: MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  if (loading) {
    return <LinearProgress />;
  }

  return (
    <Box pr={2} py={2} maxWidth="md">
      <Stack mb={1} direction="row" justifyContent="flex-end" spacing={1}>
        <Box>
          <Button
            onClick={handleClick}
            size="small"
            startIcon={<Sort fontSize="small" />}
          >
            {sort === MeetingSort.Upcoming ? "Upcoming" : "Past"}
          </Button>
          <Menu
            id="sort-options"
            anchorEl={anchorEl}
            open={open}
            onClose={handleClose}
            MenuListProps={{
              "aria-labelledby": "sort-button",
            }}
          >
            <MenuItem
              component={Link}
              to={`?sort=${MeetingSort.Upcoming}`}
              dense
              selected={sort === MeetingSort.Upcoming}
              onClick={handleClose}
            >
              Upcoming
            </MenuItem>
            <MenuItem
              component={Link}
              to={`?sort=${MeetingSort.Past}`}
              selected={sort === MeetingSort.Past}
              dense
              onClick={handleClose}
            >
              Past
            </MenuItem>
          </Menu>
        </Box>
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
        <Typography px={2} variant="h3">
          No meetings
        </Typography>
      )}
      <Agenda
        meetings={meetings as Meeting[]}
        isPast={sort === MeetingSort.Past}
      />
    </Box>
  );
}
