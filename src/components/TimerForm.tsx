import { Stack, Button, Typography, TextField } from "@mui/material";
import { LoadingButton } from "@mui/lab";

interface Props {
  title: string;
  loading?: boolean;
  disabled?: boolean;
  autoFocus?: boolean;
}

export default function TimerForm({
  title,
  loading,
  disabled,
  autoFocus = true,
}: Props) {
  return (
    <Stack spacing={1} maxWidth="md" component="form">
      <Stack direction="row" justifyContent="space-between" spacing={1}>
        <Typography variant="subtitle1">{title}</Typography>
        <Stack direction="row" spacing={1}>
          <LoadingButton
            type="submit"
            size="small"
            variant="contained"
            loading={loading}
            disabled={!disabled || loading}
          >
            Save
          </LoadingButton>
          <Button size="small" variant="outlined">
            Close
          </Button>
        </Stack>
      </Stack>
      <Stack spacing={2} width="100%">
        <TextField
          autoFocus={autoFocus}
          label="Title"
          type="text"
          placeholder="Add title"
        />
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
