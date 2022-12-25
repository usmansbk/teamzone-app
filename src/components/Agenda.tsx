import { memo, useMemo } from "react";
import { Paper, Stack, Box, Typography, Chip } from "@mui/material";
import { Link } from "react-router-dom";
import { getLocalDateTime } from "src/utils/dateTime";
import { formatEventTime } from "src/utils/event";
import { Meeting } from "src/__generated__/graphql";
import routeMap from "src/routeMap";
import { getEventsByDate } from "src/utils/calendar";
import type { Dayjs } from "dayjs";

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
      </Stack>
    </Paper>
  );
});

interface AgendaProps {
  meetings: Meeting[];
  selectedDate: Dayjs;
}

function Agenda({ meetings, selectedDate }: AgendaProps) {
  const items = useMemo(
    () => getEventsByDate(meetings, selectedDate.startOf("day").utc().toDate()),
    [selectedDate, meetings]
  );

  if (!items.length) {
    return (
      <Typography variant="h4">No meetings scheduled for this day</Typography>
    );
  }

  return (
    <Stack rowGap={2}>
      {items.map((item) => (
        <Link
          key={item.id}
          to={routeMap.meeting.replace(":id", item.id)}
          state={{
            selectedDate: selectedDate.format(),
          }}
          style={{ color: "inherit", textDecoration: "none" }}
        >
          <AgendaItem item={item} />
        </Link>
      ))}
    </Stack>
  );
}

export default memo(Agenda);
