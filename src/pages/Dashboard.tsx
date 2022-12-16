import { Box, Skeleton, Stack, Typography } from "@mui/material";
import uniqueBy from "lodash.uniqby";
import { memo, useMemo } from "react";
import { Link } from "react-router-dom";
import BigClock from "src/components/BigClock";
import useGetMeetings from "src/hooks/api/useGetMeetings";
import useMe from "src/hooks/api/useMe";
import useTime from "src/hooks/useTime";
import routeMap from "src/routeMap";
import { getCurrentDateTime, getLocalDateTime } from "src/utils/dateTime";
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
  const { loading, meetings } = useGetMeetings();
  const { tzData, teams, timezone } = data!;
  const { countryName, mainCities } = tzData! || {};

  const teammates = useMemo(
    () =>
      uniqueBy(
        teams.filter((t) => t?.isPinned).flatMap((t) => t!.teammates),
        "member.timezone"
      ).filter((t) => t?.member.timezone !== timezone),
    [teams, timezone]
  ) as TeamMember[];

  const upcomingMeeting = useMemo(
    () => meetings.find((m) => m?.from.isSame(getCurrentDateTime(), "day")),
    [meetings]
  );

  return (
    <Box p={2}>
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
            {mainCities?.[0] || timezone},
          </span>{" "}
        </Link>
        {countryName}
      </Typography>
      <Stack spacing={2}>
        <Box>
          <Clock timezone={timezone!} />
          {loading && (
            <Skeleton variant="text">
              <Typography>Loading upcoming meeting</Typography>
            </Skeleton>
          )}
          {!(loading || upcomingMeeting) && (
            <Typography>You have no meetings scheduled for today</Typography>
          )}
          {upcomingMeeting && (
            <Link
              to={routeMap.meeting.replace(":id", upcomingMeeting.id)}
              style={{ color: "inherit", textDecoration: "none" }}
            >
              <Typography variant="h5" color="primary">
                {upcomingMeeting.title}
                {" - "}
                {getLocalDateTime(upcomingMeeting.from).format("HH:mm")}
              </Typography>
            </Link>
          )}
        </Box>
        <TimezoneClocks teammates={teammates} />
      </Stack>
    </Box>
  );
};

export default memo(Dashboard);
