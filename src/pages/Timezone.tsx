import { Box, LinearProgress, Stack, Typography } from "@mui/material";
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
import PageNotFound from "./404";

interface TimezoneDetailsProps {
  data: TimezoneData;
  timezone: string;
}

function Clock({
  name,
  countryName,
  timezone,
}: {
  name: string;
  countryName: string;
  timezone: string;
}) {
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
          {name}, {countryName}
        </span>{" "}
        now
      </Typography>
      <BigClock
        time={dateTime.tz(timezone).format("HH:mm:ss")}
        date={dateTime.tz(timezone).format("dddd, MMMM D, YYYY")}
      />
    </Box>
  );
}

function TimezoneDetails({ data, timezone }: TimezoneDetailsProps) {
  const { countryName, alternativeName, abbreviation, mainCities } = data;
  const { data: me } = useMe();

  const name = formatTimezoneName(timezone);
  const [city] = name.split(",");
  const [myCity] = formatTimezoneName(me?.timezone!).split(",");

  const timeDiff = getTimeDifferenceInMs(me?.timezone!, timezone);

  return (
    <Box p={3}>
      <Clock name={name} countryName={countryName} timezone={timezone} />
      <Stack mt={4} spacing={4}>
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
              {myCity} is {formatDuration(timeDiff)}{" "}
              {timeDiff < 0 ? "behind" : "ahead of"} {city}.
            </Typography>
          </Box>
        )}
        <Box>
          <Typography variant="h4" color="primary">
            Main cities
          </Typography>
          {mainCities?.map((mainCity) => (
            <Typography variant="h6" key={mainCity}>
              {mainCity}
            </Typography>
          ))}
        </Box>
      </Stack>
    </Box>
  );
}

export default function Country() {
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
