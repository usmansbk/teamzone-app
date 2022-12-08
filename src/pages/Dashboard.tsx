import { Box, Stack, Typography } from "@mui/material";
import uniqueBy from "lodash.uniqby";
import { useMemo } from "react";
import { Link } from "react-router-dom";
import BigClock from "src/components/BigClock";
import useMe from "src/hooks/api/useMe";
import useTime from "src/hooks/useTime";
import routeMap from "src/routeMap";
import formatTimezoneName from "src/utils/formatTimezoneName";
import { TeamMember } from "src/__generated__/graphql";
import Countries from "../components/CountriesClocks";

export default function Dashboard() {
  const { data } = useMe();
  const { tzData, teams, timezone } = data!;
  const { countryName, countryCode } = tzData! || {};
  const { dateTime } = useTime();

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
          to={routeMap.country.replace(":code", countryCode)}
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
      <Stack spacing={2} alignItems="flex-end">
        <BigClock
          time={dateTime.tz(timezone!).format("HH:mm:ss")}
          date={dateTime.tz(timezone!).format("dddd, MMMM D, YYYY")}
        />
        <Box>
          <Countries teammates={teammates} />
        </Box>
      </Stack>
    </Box>
  );
}
