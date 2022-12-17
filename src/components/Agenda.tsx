import { memo, useMemo } from "react";
import {
  Paper,
  Stack,
  Box,
  Typography,
  Chip,
  Avatar,
  Grid,
} from "@mui/material";
import { Link } from "react-router-dom";
import { Dayjs } from "dayjs";
import groupBy from "lodash.groupby";
import { getLocalDateTime } from "src/utils/dateTime";
import { formatEventTime } from "src/utils/event";
import { Meeting } from "src/__generated__/graphql";
import routeMap from "src/routeMap";

interface AgendaItemProps {
  item: Meeting;
}

const AgendaItem = memo(({ item }: AgendaItemProps) => {
  const { title, from, to, teams, owner } = item;
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
        {!!teams.length && (
          <Stack
            direction="row"
            rowGap={1}
            columnGap={1}
            flexWrap="wrap"
            alignItems="center"
          >
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
        )}
        <Avatar alt={owner!.fullName} src={owner?.picture}>
          {owner?.fullName[0]}
        </Avatar>
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

export default memo(Agenda);
