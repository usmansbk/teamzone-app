import {
  Stack,
  Button,
  Typography,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Box,
  Chip,
  MenuProps,
  IconButton,
  InputAdornment,
} from "@mui/material";
import { LoadingButton } from "@mui/lab";
import { Close } from "@mui/icons-material";
import { memo, useMemo } from "react";
import capitalize from "lodash.capitalize";
import { MobileDateTimePicker } from "@mui/x-date-pickers";
import { Controller, useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import useMe from "src/hooks/api/useMe";
import useGetTimezones from "src/hooks/api/useGetTimezones";
import { formatUTCOffset, getCurrentDateTime } from "src/utils/dateTime";
import { TimerType, UpdateTimerInput } from "src/__generated__/graphql";
import RecurrenceField, { schema as repeatSchema } from "./RecurrenceField";
import DurationField from "./DurationField";

const DATE_TIME_VALUE_FORMAT = "MMM DD, YYYY, HH:mm";
const MAX_CHARACTERS_MESSAGE = "Maximum number of characters reached";

const timerTypes = [TimerType.Duration, TimerType.Date];

const schema = yup
  .object({
    id: yup.string().optional(),
    title: yup
      .string()
      .trim()
      .max(225, () => MAX_CHARACTERS_MESSAGE)
      .required(() => "Add title"),
    type: yup.string().oneOf(timerTypes).required(),
    timezone: yup.string().required(),
    teamIds: yup.array(yup.string().required()),
    description: yup
      .string()
      .trim()
      .max(2048, () => MAX_CHARACTERS_MESSAGE)
      .transform((val, original) => original || null)
      .nullable(),
    repeat: repeatSchema.nullable().optional().default(null),
    startAt: yup.date().nullable().optional().default(null),
    dateTime: yup.date().nullable().optional().default(null),
  })
  .noUnknown()
  .required();

interface Props {
  title: string;
  loading?: boolean;
  disabled?: boolean;
  autoFocus?: boolean;
  onClose: () => void;
  onSubmit: (values: UpdateTimerInput) => void;
}

const menuProps: Partial<MenuProps> = {
  PaperProps: {
    style: {
      overflowX: "scroll",
    },
  },
};

function TimerForm({
  title,
  loading,
  disabled,
  autoFocus = true,
  onClose,
  onSubmit,
}: Props) {
  const { data } = useMe();
  const { teams, timezone, firstName } = data!;

  const { timezones } = useGetTimezones();
  const sortedTimezones = useMemo(
    () => timezones.sort((a, b) => -b.name.localeCompare(a.name)),
    [timezones]
  );
  const authorizedTeams = useMemo(
    () => teams.filter((team) => team?.isAdmin || team?.isOwner),
    [teams]
  );

  const {
    control,
    handleSubmit,
    register,
    formState: { errors, touchedFields },
  } = useForm<UpdateTimerInput>({
    resolver: yupResolver(schema),
    defaultValues: {
      title: "",
      timezone,
      description: null,
      startAt: null,
      dateTime: null,
      repeat: null,
      teamIds: [],
      type: TimerType.Duration,
    },
  });

  return (
    <Stack
      spacing={1}
      maxWidth="md"
      component="form"
      onSubmit={handleSubmit(onSubmit)}
    >
      <Stack direction="row" justifyContent="space-between" spacing={1}>
        <Typography variant="subtitle1">{title}</Typography>
        <Stack direction="row" spacing={1}>
          <LoadingButton
            type="submit"
            size="small"
            variant="contained"
            loading={loading}
            disabled={disabled || loading}
          >
            Save
          </LoadingButton>
          <Button size="small" variant="outlined" onClick={onClose}>
            Close
          </Button>
        </Stack>
      </Stack>
      <Stack spacing={2} width="100%">
        <TextField
          autoFocus={autoFocus}
          label="Title"
          type="text"
          placeholder={`e.g ${firstName}'s PTO`}
          error={Boolean(touchedFields.title && errors.title?.message)}
          helperText={touchedFields.title && errors.title?.message}
          {...register("title")}
        />
        <Controller
          name="timezone"
          control={control}
          render={({ field: { value, onChange } }) => (
            <FormControl fullWidth>
              <InputLabel sx={{ fontWeight: 800 }}>Timezone</InputLabel>
              <Select
                value={timezones.length ? value : ""}
                onChange={onChange}
                label="Timezone"
                fullWidth
                placeholder="Select timezone"
                inputProps={{
                  sx: {
                    fontWeight: 800,
                  },
                }}
                MenuProps={menuProps}
                renderValue={(tz: string) => (
                  <Typography fontWeight={800}>{tz}</Typography>
                )}
              >
                {sortedTimezones.map((tz) => (
                  <MenuItem key={tz.name} value={tz.name}>
                    <Typography variant="body2" fontWeight={500}>
                      {tz.name} ({formatUTCOffset(tz.name!)})
                    </Typography>
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          )}
        />
        <Controller
          name="type"
          control={control}
          render={({ field: { value, onChange } }) => (
            <Stack spacing={1}>
              <FormControl fullWidth>
                <InputLabel sx={{ fontWeight: 800 }}>To</InputLabel>
                <Select
                  value={value}
                  label="To"
                  fullWidth
                  inputProps={{
                    sx: {
                      fontWeight: 800,
                    },
                  }}
                  MenuProps={menuProps}
                  renderValue={(timerType: string) => (
                    <Typography fontWeight={800}>
                      {capitalize(timerType)}
                    </Typography>
                  )}
                  onChange={onChange}
                >
                  {timerTypes.map((timerType) => (
                    <MenuItem key={timerType} value={timerType}>
                      <Typography variant="body2" fontWeight={500}>
                        {capitalize(timerType)}
                      </Typography>
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
              {value === TimerType.Date && (
                <Controller
                  control={control}
                  name="dateTime"
                  render={({ field: { value, onChange } }) => (
                    <MobileDateTimePicker
                      value={value}
                      onChange={onChange}
                      inputFormat={DATE_TIME_VALUE_FORMAT}
                      InputProps={{
                        sx: {
                          fontWeight: 800,
                        },
                      }}
                      renderInput={(params: any) => (
                        <TextField
                          {...params}
                          fullWidth
                          placeholder="Pick a date"
                        />
                      )}
                      disablePast
                      minDateTime={getCurrentDateTime()}
                      disableIgnoringDatePartForTimeValidation
                      minutesStep={5}
                      ampm={false}
                    />
                  )}
                />
              )}
              {value === TimerType.Duration && (
                <Controller
                  control={control}
                  name="duration"
                  render={({ field: { value, onChange } }) => (
                    <DurationField value={value} onChange={onChange} />
                  )}
                />
              )}
            </Stack>
          )}
        />
        <Controller
          name="startAt"
          control={control}
          render={({ field: { value, onChange } }) => (
            <MobileDateTimePicker
              label="Start"
              value={value}
              onChange={onChange}
              inputFormat={DATE_TIME_VALUE_FORMAT}
              InputProps={{
                sx: {
                  fontWeight: 800,
                },
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      edge="end"
                      onClick={(e) => {
                        onChange(null);
                        e.stopPropagation();
                      }}
                    >
                      <Close />
                    </IconButton>
                  </InputAdornment>
                ),
              }}
              renderInput={(params: any) => (
                <TextField
                  {...params}
                  fullWidth
                  placeholder="Now"
                  InputLabelProps={{
                    sx: {
                      fontWeight: 800,
                    },
                    shrink: true,
                  }}
                />
              )}
              minutesStep={5}
              ampm={false}
            />
          )}
        />
        <Controller
          control={control}
          name="repeat"
          render={({ field: { value, onChange } }) => (
            <RecurrenceField onChange={onChange} value={value} />
          )}
        />
        <Controller
          control={control}
          name="teamIds"
          render={({ field: { value, onChange } }) => (
            <FormControl fullWidth>
              <InputLabel sx={{ fontWeight: 800 }}>Teams</InputLabel>
              <Select
                label="Teams"
                value={value}
                onChange={onChange}
                multiple
                fullWidth
                placeholder="Add teams"
                inputProps={{
                  sx: {
                    fontWeight: 800,
                  },
                }}
                MenuProps={menuProps}
                renderValue={(selected: any) => (
                  <Box sx={{ display: "flex", flexWrap: "wrap", gap: 0.5 }}>
                    {selected?.map((val: string) => (
                      <Chip
                        key={val}
                        label={authorizedTeams.find((t) => t?.id === val)?.name}
                      />
                    ))}
                  </Box>
                )}
              >
                {authorizedTeams.map((team) => (
                  <MenuItem key={team!.id} value={team!.id}>
                    <Typography variant="body2" fontWeight={500}>
                      {team?.name}
                    </Typography>
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          )}
        />
        <TextField
          placeholder="Add description"
          multiline
          InputProps={{
            sx: {
              fontWeight: 500,
            },
          }}
          {...register("description")}
          error={Boolean(
            touchedFields.description && errors.description?.message
          )}
          helperText={touchedFields.description && errors.description?.message}
        />
      </Stack>
    </Stack>
  );
}

export default memo(TimerForm);
