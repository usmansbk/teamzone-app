import { Grid } from "@mui/material";
import { memo, useMemo } from "react";
import uniqBy from "lodash.uniqby";
import { TeamMember } from "src/__generated__/graphql";
import useTime from "src/hooks/useTime";
import { Link } from "react-router-dom";
import routeMap from "src/routeMap";
import TimezoneClock from "./TimezoneClock";

interface Props {
  teammates: TeamMember[];
}

const TimezoneClocks = ({ teammates }: Props) => {
  const { dateTime } = useTime();
  const members = useMemo(
    () =>
      uniqBy(
        teammates.map((t) => t?.member),
        "timezone"
      ),
    [teammates]
  );

  return (
    <Grid container gap={1}>
      {members
        .filter((member) => member.tzData)
        .map((member) => {
          const { id } = member!;
          const city = member.tzData?.mainCities?.[0]!;
          const { countryName, name } = member.tzData!;
          const date = dateTime.tz(member.timezone!).format("ddd, MMM D");
          const time = dateTime.tz(member.timezone!).format("HH:mm");

          return (
            <Grid item key={id}>
              <Link
                to={routeMap.timezone.replace(":id", encodeURIComponent(name))}
                style={{ textDecoration: "none", color: "inherit" }}
              >
                <TimezoneClock
                  date={date}
                  time={time}
                  city={city}
                  countryName={countryName}
                />
              </Link>
            </Grid>
          );
        })}
    </Grid>
  );
};

export default memo(TimezoneClocks);
