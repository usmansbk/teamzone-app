import { Box, Typography } from "@mui/material";
import uniqueBy from "lodash.uniqby";
import { useMemo } from "react";
import Time from "src/components/Time";
import useMe from "src/hooks/api/useMe";
import { getLocalDate } from "src/utils/dateTime";

export default function Dashboard() {
  const { data } = useMe();
  const { tzData, teams } = data!;
  const { countryName, name } = tzData!;

  const timezones = useMemo(
    () =>
      uniqueBy(
        teams.flatMap((t) => t!.teammates.map((tm) => tm!.member.tzData)),
        "name"
      ).filter((t) => t?.name !== name),
    [teams, name]
  );

  console.log(timezones);
  return (
    <Box p={3}>
      <Typography variant="h4" sx={{ fontWeight: 400 }}>
        Time in <span style={{ fontWeight: 900 }}>{countryName}</span> now
      </Typography>
      <Time variant="h1" timezone={name} />
      <Typography variant="h4" sx={{ fontWeight: 400 }}>
        {getLocalDate(name)}
      </Typography>
    </Box>
  );
}
