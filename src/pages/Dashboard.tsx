import { Box, Stack, Typography } from "@mui/material";
import uniqueBy from "lodash.uniqby";
import { useMemo } from "react";
import useMe from "src/hooks/api/useMe";
import useTime from "src/hooks/useTime";
import { getLocalDate } from "src/utils/dateTime";
import { TeamMember } from "src/__generated__/graphql";
import Countries from "./Team/Countries";

export default function Dashboard() {
  const { data } = useMe();
  const { tzData, teams } = data!;
  const { countryName, name } = tzData!;
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
        Time in <span style={{ fontWeight: 900 }}>{countryName}</span> now
      </Typography>
      <Typography variant="h1">
        {dateTime.tz(name).format("HH:mm:ss")}
      </Typography>
      <Stack spacing={1}>
        <Typography variant="h4" fontWeight={400}>
          {getLocalDate(name)}
        </Typography>
        <Countries teammates={teammates} />
      </Stack>
    </Box>
  );
}
