import { Box, Typography } from "@mui/material";
import { useParams } from "react-router-dom";

export default function Country() {
  const { code } = useParams<{ code: string }>();

  return (
    <Box>
      <Typography variant="h1">{code}</Typography>
    </Box>
  );
}
