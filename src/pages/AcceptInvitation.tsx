import { Box, Typography } from "@mui/material";
import { useParams } from "react-router-dom";

export default function AcceptInvitation() {
  const { code } = useParams<{ code: string }>();
  return (
    <Box
      display="flex"
      flexGrow={1}
      justifyContent="center"
      alignItems="center"
    >
      <Typography variant="h3">{code}</Typography>
    </Box>
  );
}
