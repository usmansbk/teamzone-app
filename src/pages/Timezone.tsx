import { Box, LinearProgress, Typography } from "@mui/material";
import { useParams } from "react-router-dom";
import BigClock from "src/components/BigClock";
import useGetTimezoneById from "src/hooks/api/useGetTimezoneById";
import useTime from "src/hooks/useTime";
import formatTimezoneName from "src/utils/formatTimezoneName";
import { TimezoneData } from "src/__generated__/graphql";

interface TimezoneDetailsProps {
  data: TimezoneData;
  timezone: string;
}

function TimezoneDetails({ data, timezone }: TimezoneDetailsProps) {
  const { countryName } = data;
  const { dateTime } = useTime();

  return (
    <Box px={3}>
      <Typography variant="h3" fontWeight={800}>
        {formatTimezoneName(timezone)}, {countryName}
      </Typography>
      <BigClock
        time={dateTime.tz(timezone).format("HH:mm:ss")}
        date={dateTime.tz(timezone).format("dddd, MMMM D, YYYY")}
      />
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

  return <TimezoneDetails data={data as TimezoneData} timezone={timezone} />;
}
