import { memo, useCallback, useEffect, useMemo, useState } from "react";
import {
  Paper,
  Stack,
  Box,
  Typography,
  Chip,
  Avatar,
  Grid,
  CircularProgress,
} from "@mui/material";
import InfiniteScroll from "react-infinite-scroll-component";
import { Link } from "react-router-dom";
import { Dayjs } from "dayjs";
import { getCurrentDateTime, getLocalDateTime } from "src/utils/dateTime";
import { formatEventTime } from "src/utils/event";
import { Meeting } from "src/__generated__/graphql";
import routeMap from "src/routeMap";
import calendarGenerator, { AgendaSectionT } from "src/utils/calendar";

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

const AgendaSection = memo(({ section }: { section: AgendaSectionT }) => {
  const { data, title } = section;
  return (
    <Grid container wrap="nowrap">
      <Grid item xs="auto" lg={1} p={0}>
        <Box minWidth={60}>
          <SectionHeader day={title} />
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
  isPast: boolean;
}

function Agenda({ meetings, isPast }: AgendaProps) {
  const [dataLength, setDataLength] = useState(0);
  const [hasMore, setHasMore] = useState(false);
  const [items, setItems] = useState<AgendaSectionT[]>([]);

  const calendar = useMemo(
    () =>
      calendarGenerator(meetings, {
        selectedDate: getCurrentDateTime(),
        isPast,
      }),
    [meetings, isPast]
  );

  useEffect(() => {
    const loadInitialData = () => {
      const sections: AgendaSectionT[] = [];
      let hasMore = true;
      for (let i = 0; i < 50; i += 1) {
        const { done, value } = calendar.next();
        if (value) {
          sections.push(value);
        }
        if (done) {
          hasMore = false;
          break;
        }
      }
      setItems(sections);
      setHasMore(hasMore);
    };

    loadInitialData();
  }, [calendar]);

  const loadMoreItems = useCallback(() => {
    const { value, done } = calendar.next();
    if (value) {
      setDataLength(dataLength + value.data.length);
      setItems((items) => items.concat(value));
    }
    setHasMore(!done);
  }, [calendar]);

  return (
    <InfiniteScroll
      dataLength={dataLength}
      hasMore={hasMore}
      next={loadMoreItems}
      loader={
        <Box textAlign="center" pt={1}>
          <CircularProgress size={16} />
        </Box>
      }
    >
      <Stack rowGap={2}>
        {items.map((section) => (
          <AgendaSection
            key={section.title.format("YYYY-MM-DD")}
            section={section}
          />
        ))}
      </Stack>
    </InfiniteScroll>
  );
}

export default memo(Agenda);
