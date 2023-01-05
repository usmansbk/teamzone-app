import {
  Button,
  Stack,
  TextField,
  Typography,
  Box,
  MenuItem,
  Select,
  FormControl,
  InputLabel,
  MenuProps,
  Chip,
} from "@mui/material";
import { LoadingButton } from "@mui/lab";
import { MobileDateTimePicker } from "@mui/x-date-pickers";
import { useEffect, useMemo } from "react";
import { useForm, Controller } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import useMe from "src/hooks/api/useMe";
import {
  addDuration,
  formatUTCOffset,
  getCurrentTimezoneDateTime,
  getDuration,
  getRoundUpCurrentDateTime,
} from "src/utils/dateTime";
import useGetTimezones from "src/hooks/api/useGetTimezones";
import { UpdateMeetingInput } from "src/__generated__/graphql";
import RecurrenceField, { schema as repeatSchema } from "./RecurrenceField";

const DATE_TIME_VALUE_FORMAT = "MMM DD, YYYY, HH:mm";
const MAX_CHARACTERS_MESSAGE = "Maximum number of characters reached";

const schema = yup
  .object({
    id: yup.string().optional(),
    title: yup
      .string()
      .trim()
      .max(225, () => MAX_CHARACTERS_MESSAGE)
      .required(() => "Add title"),
    timezone: yup.string().required(),
    from: yup.date().required(),
    to: yup
      .date()
      .min(yup.ref("from"), "End time must be after start")
      .required(),
    teamIds: yup.array(yup.string().required()),
    description: yup
      .string()
      .trim()
      .max(2048, () => MAX_CHARACTERS_MESSAGE)
      .transform((val, original) => original || null)
      .nullable(),
    repeat: repeatSchema.nullable().optional().default(null),
  })
  .transform((value, original) => {
    const { from, to, timezone } = original;
    return {
      ...original,
      from: from.tz(timezone, true).utc(),
      to: to.tz(timezone, true).utc(),
    };
  })
  .noUnknown()
  .required();

interface Props {
  id?: string;
  title: string;
  onClose: () => void;
  loading?: boolean;
  onSubmit: (values: UpdateMeetingInput) => void;
  disabled?: boolean;
  defaultValues?: Partial<UpdateMeetingInput>;
  autoFocus?: boolean;
}

const menuProps: Partial<MenuProps> = {
  PaperProps: {
    style: {
      overflowX: "scroll",
    },
  },
};

export default function MeetingForm({
  title,
  onClose,
  loading,
  onSubmit,
  disabled,
  defaultValues,
  autoFocus = true,
}: Props) {
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

  const {
    register,
    control,
    handleSubmit,
    getValues,
    setValue,
    formState: { touchedFields, errors, isDirty },
    reset,
  } = useForm<UpdateMeetingInput>({
    defaultValues: {
      title: "",
      description: null,
      teamIds: [],
      timezone: timezone!,
      from: getRoundUpCurrentDateTime(timezone!),
      to: getRoundUpCurrentDateTime(timezone!).add(30, "minutes"),
    },
    resolver: yupResolver(schema),
  });

  useEffect(() => {
    if (defaultValues) {
      reset(defaultValues);
    }
  }, [defaultValues]);

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
            disabled={!isDirty || disabled || loading}
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
          placeholder="e.g Sprint planning"
          error={touchedFields.title && !!errors.title?.message}
          helperText={touchedFields.title && errors.title?.message}
          {...register("title")}
        />
        <Controller
          control={control}
          name="timezone"
          render={({ field: { value, onChange } }) => (
            <FormControl fullWidth>
              <InputLabel sx={{ fontWeight: 800 }}>Timezone</InputLabel>
              <Select
                label="Timezone"
                fullWidth
                placeholder="Select timezone"
                inputProps={{
                  sx: {
                    fontWeight: 800,
                  },
                }}
                value={sortedTimezones.length ? value : ""}
                onChange={onChange}
                MenuProps={menuProps}
                renderValue={(tz) => (
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
        <Stack direction={{ xs: "column", md: "row" }} spacing={2}>
          <Box flexGrow={1}>
            <Controller
              name="from"
              control={control}
              render={({ field: { onChange, value } }) => (
                <MobileDateTimePicker
                  label="From"
                  value={value}
                  onChange={(from) => {
                    if (from) {
                      const duration = getDuration(getValues().to, value);
                      const to = addDuration(from, duration);
                      setValue("to", to);
                    }

                    onChange(from);
                  }}
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
                  minDateTime={getCurrentTimezoneDateTime(timezone!)}
                  disableIgnoringDatePartForTimeValidation
                  minutesStep={5}
                  ampm={false}
                />
              )}
            />
          </Box>
          <Box flexGrow={1}>
            <Controller
              name="to"
              control={control}
              render={({ field: { onChange, value } }) => (
                <MobileDateTimePicker
                  label="To"
                  inputFormat={DATE_TIME_VALUE_FORMAT}
                  value={value}
                  onChange={onChange}
                  InputProps={{ sx: { fontWeight: 800 } }}
                  renderInput={(params: any) => (
                    <TextField
                      {...params}
                      fullWidth
                      error={!!errors.to?.message}
                      helperText={errors.to?.message}
                    />
                  )}
                  disablePast
                  minDateTime={getValues().from}
                  disableIgnoringDatePartForTimeValidation
                  minutesStep={5}
                  ampm={false}
                />
              )}
            />
          </Box>
        </Stack>
        <Controller
          control={control}
          name="repeat"
          render={({ field: { onChange, value } }) => (
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
                disabled={!authorizedTeams.length}
                label="Teams"
                multiple
                fullWidth
                placeholder="Add teams"
                inputProps={{
                  sx: {
                    fontWeight: 800,
                  },
                }}
                value={value}
                onChange={onChange}
                MenuProps={menuProps}
                renderValue={(selected) => (
                  <Box sx={{ display: "flex", flexWrap: "wrap", gap: 0.5 }}>
                    {selected?.map((val) => (
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
          error={touchedFields.description && !!errors.description?.message}
          helperText={touchedFields.description && errors.description?.message}
          {...register("description")}
        />
      </Stack>
    </Stack>
  );
}
