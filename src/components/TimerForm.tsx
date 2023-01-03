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
  FormGroup,
  FormControlLabel,
  Switch,
} from "@mui/material";
import { LoadingButton } from "@mui/lab";
import { memo, useMemo, useState } from "react";
import capitalize from "lodash.capitalize";
import { MobileDateTimePicker } from "@mui/x-date-pickers";
import { Controller, useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import useMe from "src/hooks/api/useMe";
import useGetTimezones from "src/hooks/api/useGetTimezones";
import {
  formatUTCOffset,
  getCurrentDateTime,
  getRoundUpCurrentDateTime,
} from "src/utils/dateTime";
import {
  TimerDirection,
  TimerType,
  UpdateTimerInput,
} from "src/__generated__/graphql";
import RecurrenceField, { schema as repeatSchema } from "./RecurrenceField";

const DATE_TIME_VALUE_FORMAT = "MMM DD, YYYY, HH:mm";
const MAX_CHARACTERS_MESSAGE = "Maximum number of characters reached";

const timerTypes = [TimerType.Duration, TimerType.Date];
const timerDirections = [TimerDirection.Countup, TimerDirection.Countdown];

const schema = yup
  .object({
    id: yup.string().optional(),
    title: yup
      .string()
      .trim()
      .max(225, () => MAX_CHARACTERS_MESSAGE)
      .required(() => "Add title"),
    type: yup.string().oneOf(timerTypes).required(),
    direction: yup.string().oneOf(timerDirections).required(),
    timezone: yup.string().required(),
    teamIds: yup.array(yup.string().required()),
    description: yup
      .string()
      .trim()
      .max(2048, () => MAX_CHARACTERS_MESSAGE)
      .transform((val, original) => original || null)
      .nullable(),
    repeat: repeatSchema.nullable().optional().default(null),
    startAt: yup.date(),
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
  const [schedule, setSchedule] = useState(false);
  const { data } = useMe();
  const { teams, timezone } = data!;

  const { timezones } = useGetTimezones();
  const sortedTimezones = useMemo(
    () => timezones.sort((a, b) => -b.name.localeCompare(a.name)),
    [timezones]
  );
  const authorizedTeams = useMemo(
    () => teams.filter((team) => team?.isAdmin || team?.isOwner),
    [teams]
  );

  const handleChange = () => {
    setSchedule(!schedule);
  };

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
      startAt: getRoundUpCurrentDateTime(timezone!),
      dateTime: getRoundUpCurrentDateTime(timezone!),
      repeat: null,
      teamIds: [],
      direction: TimerDirection.Countdown,
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
          placeholder="e.g PTO"
          error={touchedFields.title && errors.title?.message}
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
                value={value}
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
          name="direction"
          control={control}
          render={({ field: { onChange, value } }) => (
            <FormControl fullWidth>
              <InputLabel sx={{ fontWeight: 800 }}>Direction</InputLabel>
              <Select
                value={value}
                label="Direction"
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
                {timerDirections.map((timerDirection) => (
                  <MenuItem key={timerDirection} value={timerDirection}>
                    <Typography variant="body2" fontWeight={500}>
                      {capitalize(timerDirection)}
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
            <>
              <FormControl fullWidth>
                <InputLabel sx={{ fontWeight: 800 }}>Type</InputLabel>
                <Select
                  value={value}
                  label="Type"
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
                      label="To"
                      value={value}
                      onChange={onChange}
                      inputFormat={DATE_TIME_VALUE_FORMAT}
                      InputProps={{
                        sx: {
                          fontWeight: 800,
                        },
                      }}
                      renderInput={(params: any) => (
                        <TextField {...params} fullWidth />
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
            </>
          )}
        />
        <Box>
          <FormGroup>
            <FormControlLabel
              control={<Switch checked={schedule} />}
              label={<InputLabel sx={{ fontWeight: 700 }}>Schedule</InputLabel>}
              onChange={handleChange}
            />
          </FormGroup>
          {schedule && (
            <Controller
              name="startAt"
              control={control}
              render={({ field: { value, onChange } }) => (
                <MobileDateTimePicker
                  label={null}
                  value={value}
                  onChange={onChange}
                  inputFormat={DATE_TIME_VALUE_FORMAT}
                  InputProps={{
                    sx: {
                      fontWeight: 800,
                    },
                  }}
                  renderInput={(params: any) => (
                    <TextField {...params} fullWidth />
                  )}
                  minutesStep={5}
                  ampm={false}
                />
              )}
            />
          )}
        </Box>
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
          error={touchedFields.description && errors.description?.message}
          helperText={touchedFields.description && errors.description?.message}
        />
      </Stack>
    </Stack>
  );
}

export default memo(TimerForm);
