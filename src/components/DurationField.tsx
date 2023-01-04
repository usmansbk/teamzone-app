import { Stack, TextField } from "@mui/material";
import { useEffect, useState } from "react";
import dateTime from "src/utils/dateTime";

interface Props {
  value: string;
  onChange: (newValue: string) => void;
}

export default function DurationField({ value, onChange }: Props) {
  const [duration, setDuration] = useState(dateTime.duration(value));

  useEffect(() => {
    onChange(duration.toISOString());
  }, [duration]);

  const handleChange = (newValue: string, unit: string) => {
    setDuration(
      dateTime.duration({
        days: duration.days(),
        hours: duration.hours(),
        minutes: duration.minutes(),
        seconds: duration.seconds(),
        [unit]: Number.parseInt(newValue, 10),
      })
    );
  };

  return (
    <Stack direction="row" spacing={1}>
      <TextField
        fullWidth
        label="Days"
        placeholder="dd"
        value={duration.days()}
        type="number"
        onChange={(e) => handleChange(e.target.value, "days")}
        inputProps={{
          min: 0,
        }}
      />
      <TextField
        fullWidth
        label="Hours"
        placeholder="hh"
        value={duration.hours()}
        type="number"
        onChange={(e) => handleChange(e.target.value, "hours")}
        inputProps={{
          min: 0,
          max: 23,
        }}
      />
      <TextField
        fullWidth
        label="Minutes"
        placeholder="mm"
        value={duration.minutes()}
        type="number"
        onChange={(e) => handleChange(e.target.value, "minutes")}
        inputProps={{
          min: 0,
          max: 59,
        }}
      />
      <TextField
        fullWidth
        label="Seconds"
        placeholder="ss"
        value={duration.seconds()}
        type="number"
        onChange={(e) => handleChange(e.target.value, "seconds")}
        inputProps={{
          min: 0,
          max: 59,
        }}
      />
    </Stack>
  );
}
