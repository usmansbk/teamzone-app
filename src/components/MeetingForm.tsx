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
} from "@mui/material";
import { LoadingButton } from "@mui/lab";
import { MobileDateTimePicker } from "@mui/x-date-pickers";
import uniqBy from "lodash.uniqby";
import { useMemo } from "react";
import { useForm, Controller } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import useMe from "src/hooks/api/useMe";
import { Team } from "src/__generated__/graphql";
import { formatUTCOffset } from "src/utils/dateTime";

const schema = yup
  .object({
    title: yup.string().required(),
    timezone: yup.string().required(),
    from: yup.date().required(),
    to: yup.date().required(),
    teamIds: yup.array(yup.string().required()),
    description: yup.string().nullable(),
  })
  .required();

export type MeetingInput = yup.InferType<typeof schema>;

interface Props {
  title: string;
  onClose: () => void;
  loading?: boolean;
  onSubmit: (values: MeetingInput) => void;
}

const DATE_TIME_FORMAT = "lll";

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

  const timezones = useMemo(() => extractTimezones(teams as Team[]), []);

  const { register, control, handleSubmit } = useForm<MeetingInput>({
    defaultValues: {
      title: "",
      description: null,
      teamIds: [],
      timezone: timezone!,
    },
    resolver: yupResolver(schema),
  });

  return (
    <Stack
      spacing={1}
      maxWidth="sm"
      component="form"
      onSubmit={handleSubmit((values) =>
        onSubmit(schema.cast(values, { stripUnknown: true }) as MeetingInput)
      )}
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
          inputProps={{
            autocomplete: "new-password",
            form: {
              autocomplete: "off",
            },
          }}
          placeholder="Add title"
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
                  onChange={onChange}
                  inputFormat={DATE_TIME_FORMAT}
                  InputProps={{
                    sx: {
                      fontWeight: 800,
                    },
                  }}
                  renderInput={(params: any) => (
                    <TextField {...params} fullWidth />
                  )}
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
                  inputFormat={DATE_TIME_FORMAT}
                  value={value}
                  onChange={onChange}
                  InputProps={{ sx: { fontWeight: 800 } }}
                  renderInput={(params: any) => (
                    <TextField {...params} fullWidth />
                  )}
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
              >
                {teams.map((team) => (
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
          {...register("description")}
        />
      </Stack>
    </Stack>
  );
}
