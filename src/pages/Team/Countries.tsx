import { Grid } from "@mui/material";
import { useMemo } from "react";
import uniqBy from "lodash.uniqby";
import Clock from "src/components/Clock";
import { TeamMember } from "src/__generated__/graphql";
import useTime from "src/hooks/useTime";

interface Props {
  teammates: TeamMember[];
}

export default function Countries({ teammates }: Props) {
  const { dateTime } = useTime();
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
      {timezones.map((tz) => {
        const { name, countryName, countryCode } = tz!;
        const date = dateTime.tz(name).format("ddd, MMM D");
        const time = dateTime.tz(name).format("HH:mm");

        return (
          <Grid item key={name}>
            <Clock
              date={date}
              time={time}
              countryCode={countryCode}
              countryName={countryName}
            />
          </Grid>
        );
      })}
    </Grid>
  );
}
