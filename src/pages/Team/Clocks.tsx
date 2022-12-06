import { Grid } from "@mui/material";
import { useMemo } from "react";
import uniqBy from "lodash.uniqby";
import Clock from "src/components/Clock";
import { TeamMember } from "src/__generated__/graphql";

interface Props {
  teammates: TeamMember[];
}

export default function Clocks({ teammates }: Props) {
  const timezones = useMemo(
    () =>
      uniqBy(
        teammates.map((t) => t?.member.tzData),
        "name"
      ),
    [teammates]
  );

  return (
    <Grid container spacing={1}>
      {timezones.map((tz) => (
        <Grid item>
          <Clock tz={tz} />
        </Grid>
      ))}
    </Grid>
  );
}
