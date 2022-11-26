import { Box, Stack, Typography } from "@mui/material";

export default function Terms() {
  return (
    <Stack flexGrow={1} spacing={4}>
      <Box>
        <Typography variant="h4">Terms of use</Typography>
        <Typography>Teamzone is currently under development.</Typography>
      </Box>
      <Box>
        <Typography variant="h4">Privacy policy</Typography>
        <Typography>We currently don't track any information.</Typography>
      </Box>
    </Stack>
  );
}
