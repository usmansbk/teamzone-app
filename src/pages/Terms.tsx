import { Box, Stack, Typography } from "@mui/material";

export default function Terms() {
  return (
    <Stack flexGrow={1}>
      <Box>
        <Typography variant="h4">Terms of use</Typography>
      </Box>
      <Box>
        <Typography variant="h4">Privacy policy</Typography>
      </Box>
    </Stack>
  );
}
