import { Grid } from "@mui/material";
import Clock from "src/components/Clock";
import { User } from "src/__generated__/graphql";

interface Props {
  timezones: User["tzData"][];
}
export default function Clocks({ timezones }: Props) {
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
