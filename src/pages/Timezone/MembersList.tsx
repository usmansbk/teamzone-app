import { Grid, Skeleton, Avatar, Typography, Stack } from "@mui/material";
import { memo } from "react";
import useGetTeammatesByTimezone from "src/hooks/api/useGetTeammatesByTimezone";

const MembersList = ({ timezone }: { timezone: string }) => {
  const { loading, data } = useGetTeammatesByTimezone(timezone);

  if (loading) {
    return (
      <Grid container mt={2}>
        <Grid item>
          <Skeleton variant="circular" width={80} height={80} />
          <Skeleton variant="text" sx={{ fontSize: "2rem" }} />
          <Skeleton variant="text" />
        </Grid>
      </Grid>
    );
  }

  if (!data?.length) {
    return <Typography variant="h6">No teammates in this time zone</Typography>;
  }

  return (
    <Grid container mt={2} gap={1}>
      {data.map((teammate) => {
        const { id, member, team } = teammate!;
        return (
          <Grid item key={id} xs={12} md={4} lg={3} zeroMinWidth>
            <Stack
              direction={{ xs: "row", md: "column" }}
              alignItems={{ xs: "center", md: "flex-start" }}
              spacing={1}
            >
              <Avatar
                alt={member.fullName}
                src={member.picture}
                sx={{ width: 80, height: 80 }}
              />
              <Stack>
                <Typography variant="h6">{member.fullName}</Typography>
                <Typography variant="subtitle1">{team.name}</Typography>
              </Stack>
            </Stack>
          </Grid>
        );
      })}
    </Grid>
  );
};

export default memo(MembersList);
