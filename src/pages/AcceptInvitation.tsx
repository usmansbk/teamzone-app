import { Box, CircularProgress, Typography } from "@mui/material";
import { useEffect } from "react";
import toast from "react-hot-toast";
import { Navigate, useParams } from "react-router-dom";
import useJoinTeam from "src/hooks/api/useJoinTeam";
import routeMap from "src/routeMap";

export default function AcceptInvitation() {
  const { code } = useParams<{ code: string }>();
  const { onSubmit, loading, data, error } = useJoinTeam();

  useEffect(() => {
    if (code) {
      onSubmit(code);
    }
  }, [code]);

  if (data) {
    toast.success("Success");
    return <Navigate to={routeMap.team.replace(":id", data.id)} replace />;
  }

  return (
    <Box
      display="flex"
      flexGrow={1}
      justifyContent="center"
      alignItems="center"
      flexDirection="column"
    >
      {loading && <CircularProgress />}
      {!!error && (
        <>
          <Typography variant="h3" sx={{ textAlign: "center" }}>
            The invite code is invalid.
          </Typography>
          <Typography sx={{ textAlign: "center" }}>
            Please request another link from your team.
          </Typography>
        </>
      )}
    </Box>
  );
}
