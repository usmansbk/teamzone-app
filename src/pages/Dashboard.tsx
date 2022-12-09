import { Box, Stack, Typography } from "@mui/material";
import uniqueBy from "lodash.uniqby";
import { memo, useMemo } from "react";
import { Link } from "react-router-dom";
import BigClock from "src/components/BigClock";
import useMe from "src/hooks/api/useMe";
import useTime from "src/hooks/useTime";
import routeMap from "src/routeMap";
import formatTimezoneName from "src/utils/formatTimezoneName";
import { TeamMember } from "src/__generated__/graphql";
import TimezoneClocks from "../components/TimezoneClocks";

const Clock = memo(({ timezone }: { timezone: string }) => {
  const { dateTime } = useTime();
  return (
    <BigClock
      time={dateTime.tz(timezone!).format("HH:mm:ss")}
      date={dateTime.tz(timezone!).format("dddd, MMMM D, YYYY")}
    />
  );
});

export default function Dashboard() {
  const { data } = useMe();
  const { tzData, teams, timezone } = data!;
  const { countryName } = tzData! || {};

  const teammates = useMemo(
    () =>
      uniqueBy(
        teams.flatMap((t) => t!.teammates),
        "member.timezone"
      ).filter((t) => t?.member.timezone !== timezone),
    [teams, timezone]
  ) as TeamMember[];

  return (
    <Box p={3}>
      <Typography variant="h4" fontWeight={400}>
        Time in{" "}
        <Link
          to={routeMap.timezone.replace(":id", encodeURIComponent(timezone!))}
          style={{ textDecoration: "none", color: "inherit" }}
        >
          <Typography
            variant="h4"
            fontWeight={900}
            display="inline-block"
            color="primary"
          >
            {formatTimezoneName(timezone!)}, {countryName}
          </Typography>
        </Link>{" "}
        now
      </Typography>
      <Clock timezone={timezone!} />
      <Stack spacing={2} alignItems="flex-end">
        <Box>
          <TimezoneClocks teammates={teammates} />
        </Box>
      </Stack>
    </Box>
  );
}
