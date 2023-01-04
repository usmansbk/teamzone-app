import { Stack, TextField } from "@mui/material";
import { useState } from "react";

interface Props {
  value: string;
  onChange: (newValue: string) => void;
}

export default function DurationField({ value, onChange }: Props) {
  const [duration] = useState(value);
  console.log(duration, onChange);

  return (
    <Stack direction="row" spacing={1}>
      <TextField label="Days" placeholder="dd" />
      <TextField label="Hours" placeholder="hh" />
      <TextField label="Minutes" placeholder="mm" />
      <TextField label="Seconds" placeholder="ss" />
    </Stack>
  );
}
