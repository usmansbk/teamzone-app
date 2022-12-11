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
} from "@mui/material";
import { LoadingButton } from "@mui/lab";
import { MobileDateTimePicker } from "@mui/x-date-pickers";
import uniqBy from "lodash.uniqby";
import { useMemo } from "react";
import useMe from "src/hooks/api/useMe";
import { Team } from "src/__generated__/graphql";
import { formatUTCOffset } from "src/utils/dateTime";

interface Props {
  title: string;
  onClose: () => void;
  loading?: boolean;
}

const DATE_TIME_FORMAT = "MMM DD, YYYY, HH:mm";

const extractTimezones = (teams: Team[]) =>
  uniqBy(
    teams.flatMap((t) => t!.teammates),
    "member.timezone"
  ).map((t) => ({
    timezone: t?.member.timezone,
    name: t?.member.tzData?.alternativeName,
  }));

export default function MeetingForm({ title, onClose, loading }: Props) {
  const { data } = useMe();
  const { teams, timezone } = data!;

  const timezones = useMemo(() => extractTimezones(teams as Team[]), []);

  return (
    <Stack spacing={1} maxWidth="sm">
      <Stack direction="row" justifyContent="space-between" spacing={1}>
        <Typography variant="subtitle1">{title}</Typography>
        <Stack direction="row" spacing={1}>
          <LoadingButton size="small" variant="contained" loading={loading}>
            Save
          </LoadingButton>
          <Button size="small" variant="outlined" onClick={onClose}>
            Close
          </Button>
        </Stack>
      </Stack>
      <Stack spacing={2} width="100%">
        <TextField label="Title" placeholder="Add title" />
        <FormControl fullWidth>
          <InputLabel sx={{ fontWeight: 800 }}>Timezone</InputLabel>
          <Select
            label="Timezone"
            value={timezone}
            fullWidth
            placeholder="Select timezone"
            inputProps={{
              sx: {
                fontWeight: 800,
              },
            }}
          >
            {timezones.map((tz) => (
              <MenuItem key={tz.timezone} value={tz.timezone!}>
                {tz.name} (UTC{formatUTCOffset(tz.timezone!)})
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        <Stack direction={{ xs: "column", md: "row" }} spacing={2}>
          <Box flexGrow={1}>
            <MobileDateTimePicker
              label="From"
              value={new Date()}
              onChange={() => {}}
              inputFormat={DATE_TIME_FORMAT}
              InputProps={{
                sx: {
                  fontWeight: 800,
                },
              }}
              renderInput={(params: any) => <TextField {...params} fullWidth />}
            />
          </Box>
          <Box flexGrow={1}>
            <MobileDateTimePicker
              label="To"
              inputFormat={DATE_TIME_FORMAT}
              value={new Date()}
              onChange={() => {}}
              InputProps={{ sx: { fontWeight: 800 } }}
              renderInput={({ value, ...params }: any) => (
                <TextField {...params} fullWidth />
              )}
            />
          </Box>
        </Stack>
        <FormControl fullWidth>
          <InputLabel sx={{ fontWeight: 800 }}>Teams</InputLabel>
          <Select
            label="Teams"
            multiple
            fullWidth
            value={[]}
            placeholder="Add teams"
            inputProps={{
              sx: {
                fontWeight: 800,
              },
            }}
          >
            {teams.map((team) => (
              <MenuItem key={team!.id} value={team!.id}>
                {team?.name}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        <TextField
          placeholder="Add description"
          multiline
          InputProps={{
            sx: {
              fontWeight: 500,
            },
          }}
        />
      </Stack>
    </Stack>
  );
}
