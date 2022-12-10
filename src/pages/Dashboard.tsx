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

const Dashboard = () => {
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
    <Box p={3} pt={0}>
      <Typography variant="h4" fontWeight={400}>
        Time in{" "}
        <Link
          to={routeMap.timezone.replace(":id", encodeURIComponent(timezone!))}
          style={{ textDecoration: "none", color: "inherit" }}
        >
          <span
            style={{
              fontWeight: 900,
            }}
          >
            {formatTimezoneName(timezone!)},
          </span>{" "}
        </Link>
        {countryName}
      </Typography>
      <Stack spacing={2}>
        <Clock timezone={timezone!} />
        <TimezoneClocks teammates={teammates} />
      </Stack>
    </Box>
  );
};

export default memo(Dashboard);
