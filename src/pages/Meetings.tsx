import { Add, Sort } from "@mui/icons-material";
import {
  Typography,
  Box,
  Stack,
  Button,
  Grid,
  Paper,
  LinearProgress,
  Chip,
  Menu,
  MenuItem,
} from "@mui/material";
import { Dayjs } from "dayjs";
import groupBy from "lodash.groupby";
import { memo, useMemo, useState, MouseEvent } from "react";
import { Link } from "react-router-dom";
import useGetMeetings from "src/hooks/api/useGetMeetings";
import routeMap from "src/routeMap";
import { getLocalDateTime } from "src/utils/dateTime";
import { formatEventTime } from "src/utils/event";
import { Meeting } from "src/__generated__/graphql";

interface AgendaItemProps {
  item: Meeting;
}

const AgendaItem = memo(({ item }: AgendaItemProps) => {
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

function SectionHeader({ day }: { day: Dayjs }) {
  const date = getLocalDateTime(day);
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

const AgendaSection = memo(({ section }: { section: [string, Meeting[]] }) => {
  const data = section[1];
  return (
    <Grid container wrap="nowrap">
      <Grid item xs="auto" lg={1} p={0}>
        <Box minWidth={60}>
          <SectionHeader day={data[0].from} />
        </Box>
      </Grid>
      <Grid item zeroMinWidth width="100%">
        <Stack rowGap={1}>
          {data.map((item) => (
            <Link
              key={item.id}
              to={routeMap.meeting.replace(":id", item.id)}
              style={{ color: "inherit", textDecoration: "none" }}
            >
              <AgendaItem item={item} />
            </Link>
          ))}
        </Stack>
      </Grid>
    </Grid>
  );
});

interface AgendaProps {
  meetings: Meeting[];
}

const Agenda = memo(({ meetings }: AgendaProps) => {
  const agendas = useMemo(
    () =>
      Object.entries(
        groupBy(meetings, (meeting) => meeting?.from.format("YYYY-MM-DD"))
      ),
    [meetings]
  );

  return (
    <Stack spacing={3}>
      {agendas.map((section) => (
        <AgendaSection key={section[0]} section={section} />
      ))}
    </Stack>
  );
});

export default function Meetings() {
  const [sort, setSort] = useState<"upcoming" | "past">("upcoming");
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const { meetings, loading } = useGetMeetings();

  const open = Boolean(anchorEl);
  const handleClick = (event: MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = (selectedSort: typeof sort) => () => {
    setSort(selectedSort);
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
            {sort === "upcoming" ? "Upcoming" : "Past"}
          </Button>
          <Menu
            id="sort-options"
            anchorEl={anchorEl}
            open={open}
            onClose={handleClose(sort)}
            MenuListProps={{
              "aria-labelledby": "sort-button",
            }}
          >
            <MenuItem
              dense
              selected={sort === "upcoming"}
              onClick={handleClose("upcoming")}
            >
              Upcoming
            </MenuItem>
            <MenuItem
              selected={sort === "past"}
              dense
              onClick={handleClose("past")}
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
        <Typography variant="h3">No upcoming meetings yet</Typography>
      )}
      <Agenda meetings={meetings as Meeting[]} />
    </Box>
  );
}
