import { Box, Typography } from "@mui/material";
import { useParams } from "react-router-dom";
import formatTimezoneName from "src/utils/formatTimezoneName";

export default function Country() {
  const { id } = useParams<{ id: string }>();
  const timezone = decodeURIComponent(id!);

  return (
    <Box px={3}>
      <Typography variant="h1">{formatTimezoneName(timezone)}</Typography>
    </Box>
  );
}
