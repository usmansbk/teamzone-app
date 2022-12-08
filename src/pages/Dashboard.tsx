import { Box, Stack, Typography } from "@mui/material";
import uniqueBy from "lodash.uniqby";
import { useMemo } from "react";
import { Link } from "react-router-dom";
import BigClock from "src/components/BigClock";
import useMe from "src/hooks/api/useMe";
import useTime from "src/hooks/useTime";
import routeMap from "src/routeMap";
import { TeamMember } from "src/__generated__/graphql";
import Countries from "./Team/Countries";

export default function Dashboard() {
  const { data } = useMe();
  const { tzData, teams } = data!;
  const { countryName, name, countryCode } = tzData!;
  const { dateTime } = useTime();

  const teammates = useMemo(
    () =>
      uniqueBy(
        teams.flatMap((t) => t!.teammates),
        "name"
      ).filter((t) => t?.member.tzData?.name !== name),
    [teams, name]
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
            {countryName}
          </Typography>
        </Link>{" "}
        now
      </Typography>
      <Stack spacing={1}>
        <BigClock
          time={dateTime.tz(name).format("HH:mm:ss")}
          date={dateTime.tz(name).format("dddd, MMMM D, YYYY")}
        />
        <Countries teammates={teammates} />
      </Stack>
    </Box>
  );
}
