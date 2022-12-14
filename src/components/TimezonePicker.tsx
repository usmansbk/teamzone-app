import { Autocomplete, TextField, TextFieldProps } from "@mui/material";
import useGetTimezones from "src/hooks/api/useGetTimezones";
import { useMemo } from "react";

export default function TimezonePicker({
  value,
  onChange,
  error,
  helperText,
}: TextFieldProps) {
  const { loading, data } = useGetTimezones();
  const options = useMemo(() => data.map((t) => t.name), [data]);

  return (
    <Autocomplete
      loading={loading}
      value={value || ""}
      options={options}
      autoHighlight
      onChange={(e, val) => onChange?.(val as any)}
      disablePortal
      renderInput={(params) => (
        <TextField
          {...params}
          label="Timezone"
          helperText={helperText}
          error={error}
          InputLabelProps={{
            sx: {
              fontWeight: 800,
            },
          }}
          InputProps={{
            ...params.InputProps,
            autoComplete: "new-password",
            sx: {
              fontWeight: 800,
            },
          }}
        />
      )}
    />
  );
}
