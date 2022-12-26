import { Stack, TextField, Typography } from "@mui/material";
import { LoadingButton } from "@mui/lab";

interface Props {
  title: string;
  loading: boolean;
}

export default function CountdownForm({ title, loading }: Props) {
  return (
    <Stack spacing={1} component="form">
      <Typography variant="subtitle1">{title}</Typography>
      <TextField label="Name" />
      <LoadingButton variant="contained" size="large" loading={loading}>
        Create Countdown
      </LoadingButton>
    </Stack>
  );
}
