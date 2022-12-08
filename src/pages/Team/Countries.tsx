import { Grid } from "@mui/material";
import { useMemo } from "react";
import uniqBy from "lodash.uniqby";
import Clock from "src/components/CountryClock";
import { TeamMember } from "src/__generated__/graphql";
import useTime from "src/hooks/useTime";
import { Link } from "react-router-dom";
import routeMap from "src/routeMap";

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
        const { name, countryName, countryCode, countryFlag } = tz!;
        const date = dateTime.tz(name).format("ddd, MMM D");
        const time = dateTime.tz(name).format("HH:mm");

        return (
          <Grid item key={name}>
            <Link
              to={routeMap.country.replace(":code", countryCode)}
              style={{ textDecoration: "none", color: "inherit" }}
            >
              <Clock
                date={date}
                time={time}
                flag={countryFlag}
                countryName={countryName}
              />
            </Link>
          </Grid>
        );
      })}
    </Grid>
  );
}
