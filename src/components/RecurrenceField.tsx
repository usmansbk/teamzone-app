import { Close } from "@mui/icons-material";
import {
  Dialog,
  DialogContent,
  TextField,
  DialogTitle,
  DialogActions,
  Button,
  Stack,
  InputAdornment,
  IconButton,
  Box,
  MenuItem,
} from "@mui/material";
import { useCallback, useEffect, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { RecurrenceRule } from "src/types";
import { formatRepeat } from "src/utils/event";
import capitalize from "lodash.capitalize";

const options = [
  {
    value: "DAILY",
    label: "day",
  },
  {
    value: "WEEKLY",
    label: "week",
  },
  {
    value: "MONTHLY",
    label: "month",
  },
  {
    value: "YEARLY",
    label: "year",
  },
];

export const schema = yup
  .object({
    freq: yup
      .string()
      .oneOf(options.map((opt) => opt.value))
      .default("DAILY")
      .required(),
    interval: yup.number().positive().integer().min(1).max(100).default(1),
  })
  .noUnknown();

interface Props {
  value?: RecurrenceRule | null;
  onChange: (value: RecurrenceRule | null) => void;
}

export default function RecurrenceField({ onChange, value }: Props) {
  const [open, setOpen] = useState(false);

  const onClose = useCallback(() => setOpen(false), []);

  const {
    control,
    register,
    formState: { errors },
    handleSubmit,
    reset,
  } = useForm<RecurrenceRule>({
    resolver: yupResolver(schema),
    defaultValues: {
      freq: "DAILY",
      interval: 1,
    },
  });

  const onSubmit = handleSubmit((values) => {
    onChange(values);
    onClose();
  });

  useEffect(() => {
    if (value) {
      reset(value);
    }
  }, [value]);

  return (
    <>
      <TextField
        label="Repeat"
        value={value ? capitalize(formatRepeat(value)) : "Does not repeat"}
        multiline
        InputProps={{
          readOnly: true,
          sx: {
            fontWeight: 800,
          },
          endAdornment: value && (
            <InputAdornment position="end">
              <IconButton
                edge="end"
                size="small"
                onClick={(e) => {
                  onChange(null);
                  e.stopPropagation();
                }}
              >
                <Close fontSize="small" />
              </IconButton>
            </InputAdornment>
          ),
        }}
        onClick={() => setOpen(true)}
      />
      <Dialog fullWidth maxWidth="xs" open={open} onClose={onClose}>
        <DialogTitle>Recurrence</DialogTitle>
        <DialogContent>
          <Stack direction="row">
            <Box maxWidth={100}>
              <TextField
                fullWidth
                label="Every"
                margin="dense"
                type="number"
                size="small"
                error={!!errors.interval?.message}
                InputProps={{
                  inputProps: {
                    min: 1,
                    max: 100,
                    step: 1,
                  },
                  sx: {
                    fontWeight: 800,
                  },
                }}
                {...register("interval")}
              />
            </Box>
            <Controller
              control={control}
              name="freq"
              render={({ field: { onChange, value } }) => (
                <TextField
                  select
                  size="small"
                  margin="dense"
                  value={value}
                  onChange={onChange}
                >
                  {options.map((freq) => (
                    <MenuItem key={freq.value} value={freq.value}>
                      {freq.label}
                    </MenuItem>
                  ))}
                </TextField>
              )}
            />
          </Stack>
        </DialogContent>
        <DialogActions>
          <Button onClick={onClose}>Cancel</Button>
          <Button variant="contained" onClick={onSubmit}>
            Done
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}
