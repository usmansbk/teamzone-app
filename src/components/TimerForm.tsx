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
} from "@mui/material";
import { LoadingButton } from "@mui/lab";
import { memo, useMemo } from "react";
import capitalize from "lodash.capitalize";
import useMe from "src/hooks/api/useMe";
import useGetTimezones from "src/hooks/api/useGetTimezones";
import { formatUTCOffset } from "src/utils/dateTime";
import { TimerDirection, TimerType } from "src/__generated__/graphql";
import RecurrenceField from "./RecurrenceField";

interface Props {
  title: string;
  loading?: boolean;
  disabled?: boolean;
  autoFocus?: boolean;
  onClose: () => void;
}

const menuProps: Partial<MenuProps> = {
  PaperProps: {
    style: {
      overflowX: "scroll",
    },
  },
};

const timerTypes = [TimerType.Duration, TimerType.Date];
const timerDirections = [TimerDirection.Countup, TimerDirection.Countdown];

function TimerForm({
  title,
  loading,
  disabled,
  autoFocus = true,
  onClose,
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

  return (
    <Stack spacing={1} maxWidth="md" component="form">
      <Stack direction="row" justifyContent="space-between" spacing={1}>
        <Typography variant="subtitle1">{title}</Typography>
        <Stack direction="row" spacing={1}>
          <LoadingButton
            type="submit"
            size="small"
            variant="contained"
            loading={loading}
            disabled={!disabled || loading}
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
          placeholder="Add title"
        />
        <FormControl fullWidth>
          <InputLabel sx={{ fontWeight: 800 }}>Direction</InputLabel>
          <Select
            value={TimerDirection.Countdown}
            label="Direction"
            fullWidth
            inputProps={{
              sx: {
                fontWeight: 800,
              },
            }}
            MenuProps={menuProps}
            renderValue={(timerType: string) => (
              <Typography fontWeight={800}>{capitalize(timerType)}</Typography>
            )}
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
        <FormControl fullWidth>
          <InputLabel sx={{ fontWeight: 800 }}>Type</InputLabel>
          <Select
            value={TimerType.Duration}
            label="Type"
            fullWidth
            inputProps={{
              sx: {
                fontWeight: 800,
              },
            }}
            MenuProps={menuProps}
            renderValue={(timerType: string) => (
              <Typography fontWeight={800}>{capitalize(timerType)}</Typography>
            )}
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
        <FormControl fullWidth>
          <InputLabel sx={{ fontWeight: 800 }}>Timezone</InputLabel>
          <Select
            value={timezone as string}
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
        <RecurrenceField onChange={() => null} />
        <FormControl fullWidth>
          <InputLabel sx={{ fontWeight: 800 }}>Teams</InputLabel>
          <Select
            label="Teams"
            value={[]}
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

export default memo(TimerForm);
