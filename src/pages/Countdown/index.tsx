import { Add } from "@mui/icons-material";
import { Button, Stack, Typography } from "@mui/material";

export default function Countdown() {
  return (
    <Stack spacing={1} p={2} maxWidth="lg">
      <Stack direction="row" justifyContent="space-between" spacing={1}>
        <Button
          size="small"
          variant="contained"
          startIcon={<Add fontSize="small" />}
        >
          New
        </Button>
      </Stack>
      <Typography variant="h2">Page under construction</Typography>
    </Stack>
  );
}
