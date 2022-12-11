import { Button, Stack, TextField, Typography, Box } from "@mui/material";
import { LoadingButton } from "@mui/lab";
import { MobileDateTimePicker } from "@mui/x-date-pickers";

interface Props {
  title: string;
  onClose: () => void;
  loading?: boolean;
}

export default function MeetingForm({ title, onClose, loading }: Props) {
  return (
    <Stack spacing={1} maxWidth="sm">
      <Stack direction="row" justifyContent="space-between" spacing={1}>
        <Typography variant="subtitle1">{title}</Typography>
        <Stack direction="row" spacing={1}>
          <LoadingButton size="small" variant="contained" loading={loading}>
            Save
          </LoadingButton>
          <Button size="small" variant="outlined" onClick={onClose}>
            Close
          </Button>
        </Stack>
      </Stack>
      <Stack spacing={2}>
        <TextField label="Title" placeholder="Add title" />
        <Stack direction={{ xs: "column", md: "row" }} spacing={2}>
          <Box flexGrow={1}>
            <MobileDateTimePicker
              label="From"
              value={new Date()}
              onChange={() => {}}
              renderInput={(params: any) => <TextField {...params} fullWidth />}
            />
          </Box>
          <Box flexGrow={1}>
            <MobileDateTimePicker
              label="To"
              value={new Date()}
              onChange={() => {}}
              renderInput={(params: any) => <TextField {...params} fullWidth />}
            />
          </Box>
        </Stack>
        <TextField
          placeholder="Add description"
          multiline
          InputProps={{
            sx: {
              fontWeight: 500,
            },
          }}
        />
      </Stack>
    </Stack>
  );
}
