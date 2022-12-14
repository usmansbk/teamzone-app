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
import uniqBy from "lodash.uniqby";
import { useMemo } from "react";
import { useForm, Controller } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import type { Dayjs } from "dayjs";
import useMe from "src/hooks/api/useMe";
import { Team } from "src/__generated__/graphql";
import {
  addDuration,
  formatUTCOffset,
  getCurrentTimezoneDateTime,
  getDuration,
  getRoundUpCurrentDateTime,
} from "src/utils/dateTime";

const DATE_TIME_VALUE_FORMAT = "MMM DD, YYYY, HH:mm";
const MAX_CHARACTERS_MESSAGE = "Maximum number of characters reached";

export interface MeetingInput {
  title: string;
  timezone: string;
  from: Dayjs;
  to: Dayjs;
  teamIds: string[];
  description?: string | null;
}

const schema = yup
  .object({
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
      .nullable(),
  })
  .transform((value, original) => {
    const { from, to, timezone } = original as MeetingInput;
    return {
      ...original,
      from: from.tz(timezone, true).utc(),
      to: to.tz(timezone, true).utc(),
    };
  })
  .required();

interface Props {
  title: string;
  onClose: () => void;
  loading?: boolean;
  onSubmit: (values: MeetingInput) => void;
}

const extractTimezones = (teams: Team[]) =>
  uniqBy(
    teams.flatMap((t) => t!.teammates),
    "member.timezone"
  ).map((t) => ({
    timezone: t?.member.timezone,
    name: t?.member.tzData?.alternativeName,
  }));

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
}: Props) {
  const { data } = useMe();
  const { teams, timezone } = data!;

  const timezones = useMemo(() => extractTimezones(teams as Team[]), [teams]);
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
    formState: { touchedFields, errors },
  } = useForm<MeetingInput>({
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

  return (
    <Stack
      spacing={1}
      maxWidth="sm"
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
          label="Title"
          type="text"
          autoComplete="off"
          placeholder="Add title"
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
                value={value}
                onChange={onChange}
                MenuProps={menuProps}
              >
                {timezones.map((tz) => (
                  <MenuItem key={tz.timezone} value={tz.timezone!}>
                    {tz.name} (UTC{formatUTCOffset(tz.timezone!)})
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
          name="teamIds"
          render={({ field: { value, onChange } }) => (
            <FormControl fullWidth>
              <InputLabel sx={{ fontWeight: 800 }}>Teams</InputLabel>
              <Select
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
                    {selected.map((val) => (
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
                    {team?.name}
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
