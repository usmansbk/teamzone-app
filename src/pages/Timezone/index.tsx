import { Box, LinearProgress, Stack, Typography } from "@mui/material";
import { memo } from "react";
import { useParams } from "react-router-dom";
import BigClock from "src/components/BigClock";
import useGetTimezoneById from "src/hooks/api/useGetTimezoneById";
import useMe from "src/hooks/api/useMe";
import useTime from "src/hooks/useTime";
import {
  formatDuration,
  formatUTCOffset,
  getTimeDifferenceInMs,
} from "src/utils/dateTime";
import formatTimezoneName from "src/utils/formatTimezoneName";
import { TimezoneData } from "src/__generated__/graphql";
import PageNotFound from "../404";
import MembersList from "./MembersList";

interface TimezoneDetailsProps {
  data: TimezoneData;
  timezone: string;
}

const Clock = memo(
  ({
    name,
    countryName,
    timezone,
  }: {
    name: string;
    countryName: string;
    timezone: string;
  }) => {
    const { dateTime } = useTime();
    return (
      <Box>
        <Typography variant="h4" fontWeight={400}>
          Time in{" "}
          <span
            style={{
              fontWeight: 900,
            }}
          >
            {name},
          </span>{" "}
          {countryName}
        </Typography>
        <BigClock
          time={dateTime.tz(timezone).format("HH:mm:ss")}
          date={dateTime.tz(timezone).format("dddd, MMMM D, YYYY")}
        />
      </Box>
    );
  }
);

const TimezoneDetails = memo(({ data, timezone }: TimezoneDetailsProps) => {
  const { data: me } = useMe();
  const { countryName, alternativeName, abbreviation } = data;

  const name = formatTimezoneName(timezone);
  const [city] = name.split(",");
  const [myCity] = formatTimezoneName(me?.timezone!).split(",");
  const timeDiff = getTimeDifferenceInMs(me?.timezone!, timezone);

  return (
    <Stack p={3} pt={0} spacing={4}>
      <Clock name={name} countryName={countryName} timezone={timezone} />
      <Box>
        <Typography variant="h4" color="primary">
          Time Zone
        </Typography>
        <Typography variant="h6">
          {alternativeName} ({abbreviation})
        </Typography>
        <Typography variant="h6">UTC {formatUTCOffset(timezone)}</Typography>
        <Typography variant="h6">{timezone}</Typography>
      </Box>
      {me?.timezone !== timezone && (
        <Box>
          <Typography variant="h4" color="primary">
            Time difference
          </Typography>
          <Typography variant="h6">
            {city} is {formatDuration(timeDiff)}{" "}
            {timeDiff < 0 ? "behind" : "ahead of"} {myCity}.
          </Typography>
        </Box>
      )}
      <Box>
        <Typography variant="h4" color="primary">
          People in this time zone
        </Typography>
        <MembersList timezone={timezone} />
      </Box>
    </Stack>
  );
});

export default function Timezone() {
  const { id } = useParams<{ id: string }>();
  const timezone = decodeURIComponent(id!);
  const { loading, error, data } = useGetTimezoneById(timezone);

  if (loading) {
    return <LinearProgress />;
  }

  if (error) {
    throw error;
  }

  if (!data) {
    return <PageNotFound />;
  }

  return <TimezoneDetails data={data as TimezoneData} timezone={timezone} />;
}
