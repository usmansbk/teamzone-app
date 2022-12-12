import { LoadingButton } from "@mui/lab";
import { Box, CircularProgress, Stack, Typography } from "@mui/material";
import { useCallback } from "react";
import { Navigate, useParams } from "react-router-dom";
import useGetTeamPreviewByCode from "src/hooks/api/useGetTeamPreviewByCode";
import useJoinTeam from "src/hooks/api/useJoinTeam";
import routeMap from "src/routeMap";

export default function TeamInvitation() {
  const { code } = useParams<{ code: string }>();
  const {
    loading: fetching,
    data: team,
    error: loadingError,
  } = useGetTeamPreviewByCode(code!);
  const {
    onSubmit,
    loading: joining,
    data: joinData,
    error: joinError,
  } = useJoinTeam();

  const handleSubmit = useCallback(() => {
    onSubmit(code!);
  }, [code]);

  if (fetching) {
    return (
      <Box textAlign="center">
        <CircularProgress />
      </Box>
    );
  }

  if (joinError || loadingError) {
    return (
      <Box>
        <Typography variant="h3" sx={{ textAlign: "center" }}>
          The invite code is invalid.
        </Typography>
        <Typography sx={{ textAlign: "center" }}>
          Please request another link from your team.
        </Typography>
      </Box>
    );
  }

  if (joinData) {
    return <Navigate to={routeMap.team.replace(":id", joinData.id!)} replace />;
  }

  return (
    <Box
      display="flex"
      flexGrow={1}
      justifyContent="center"
      alignItems="center"
      flexDirection="column"
    >
      <Stack spacing={1} justifyContent="center" alignItems="center">
        <Stack textAlign="center">
          <Typography variant="h3">{team?.name}</Typography>
          <Typography>
            Created by{" "}
            <span style={{ fontWeight: 900 }}>{team?.owner?.firstName}</span>
          </Typography>
        </Stack>
        <Box>
          <LoadingButton
            variant="contained"
            onClick={handleSubmit}
            loading={joining}
          >
            Join Team
          </LoadingButton>
        </Box>
      </Stack>
    </Box>
  );
}
