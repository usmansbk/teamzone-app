import {
  Box,
  LinearProgress,
  Stack,
  Typography,
  Grid,
  Avatar,
} from "@mui/material";
import uniqBy from "lodash.uniqby";
import { memo, useMemo } from "react";
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
import { TimezoneData, User } from "src/__generated__/graphql";
import PageNotFound from "./404";

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

const MembersList = memo(({ teammates }: { teammates: User[] }) => {
  if (!teammates?.length) {
    return <Typography variant="h6">No teammates in this time zone</Typography>;
  }

  return (
    <Grid container mt={2} gap={1}>
      {teammates.map((member) => (
        <Grid item key={member.id} xs={12} md={4} lg={3} zeroMinWidth>
          <Stack
            direction={{ xs: "row", md: "column" }}
            alignItems={{ xs: "center", md: "flex-start" }}
            spacing={2}
          >
            <Avatar
              alt={member.fullName}
              src={member.picture}
              sx={{ width: 72, height: 72 }}
            />
            <Typography variant="h5">{member.fullName}</Typography>
          </Stack>
        </Grid>
      ))}
    </Grid>
  );
});

const TimezoneDetails = memo(({ data, timezone }: TimezoneDetailsProps) => {
  const { data: me } = useMe();
  const { countryName, alternativeName, abbreviation, mainCities } = data;

  const city = mainCities?.[0]!;
  const myCity = me?.tzData?.mainCities?.[0]!;
  const timeDiff = getTimeDifferenceInMs(me?.timezone!, timezone);
  const teammates = useMemo(
    () =>
      uniqBy(
        me?.teams.flatMap((t) => t?.teammates.flatMap((tm) => tm?.member)),
        "id"
      ).filter((tm) => tm?.timezone === timezone),
    [me?.teams]
  );

  return (
    <Stack p={2} spacing={4}>
      <Clock name={city} countryName={countryName} timezone={timezone} />
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
          Main cities in this time zone
        </Typography>
        {mainCities?.map((mainCity) => (
          <Typography key={mainCity} variant="h6">
            {mainCity}
          </Typography>
        ))}
      </Box>
      <Box>
        <Typography variant="h4" color="primary">
          People in this time zone
        </Typography>
        <MembersList teammates={teammates as any} />
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
