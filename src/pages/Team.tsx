import { Box, Typography } from "@mui/material";

export default function Team() {
  const { timeZone } = Intl.DateTimeFormat().resolvedOptions();
  return (
    <Box>
      <Typography variant="subtitle1">{timeZone}</Typography>
    </Box>
  );
}
