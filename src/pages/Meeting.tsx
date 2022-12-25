import { Delete, Edit } from "@mui/icons-material";
import {
  Avatar,
  Box,
  Button,
  LinearProgress,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Stack,
  Typography,
  Chip,
  List,
} from "@mui/material";
import { Dayjs } from "dayjs";
import uniqBy from "lodash.uniqby";
import { memo, useCallback, useMemo, useState } from "react";
import { Link, useLocation, useNavigate, useParams } from "react-router-dom";
import DeleteMeetingDialog from "src/components/DeleteMeetingDialog";
import useGetMeetingById from "src/hooks/api/useGetMeetingById";
import routeMap from "src/routeMap";
import { createRule } from "src/utils/calendar";
import {
  mergeDates,
  formatDuration,
  getLocalDateTime,
  getTimezoneLocalDateTime,
  getDateTimeFromUTC,
} from "src/utils/dateTime";
import { formatEventDateTime, formatRepeat } from "src/utils/event";
import { User } from "src/__generated__/graphql";

const MemberItem = ({
  member,
  from,
  to,
}: {
  member: User;
  from: Dayjs;
  to: Dayjs;
}) => {
  const { fullName, timezone, tzData, picture } = member;
  const startAt = getTimezoneLocalDateTime(from, timezone!);
  const endAt = getTimezoneLocalDateTime(to, timezone!);

  return (
    <ListItem disablePadding>
      <ListItemAvatar>
        <Avatar alt={fullName} src={picture}>
          {fullName[0]}
        </Avatar>
      </ListItemAvatar>
      <ListItemText
        primary={fullName}
        primaryTypographyProps={{
          fontWeight: 700,
        }}
        secondary={
          <Typography variant="body2" fontWeight={500}>
            {formatEventDateTime(startAt, endAt)} {tzData?.abbreviation}
          </Typography>
        }
      />
    </ListItem>
  );
};

const MembersList = memo(
  ({ members, from, to }: { members: User[]; from: Dayjs; to: Dayjs }) => (
    <>
      <Typography variant="subtitle1" color="primary">
        Members
      </Typography>
      {!members.length && <Typography variant="h6">No members</Typography>}
      <List disablePadding>
        {members.map((member) => (
          <MemberItem key={member.id} member={member} from={from} to={to} />
        ))}
      </List>
    </>
  )
);

export default function Meeting() {
  const { state } = useLocation();
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();
  const [openDeleteDialog, setOpenDeleteDialog] = useState(false);
  const { loading, data } = useGetMeetingById(id!);

  const closeDeleteDialog = useCallback(() => setOpenDeleteDialog(false), []);
  const members = useMemo(() => {
    if (!data?.teams) {
      return [];
    }

    return uniqBy(
      data.teams
        .flatMap((t) => t?.teammates.map((tm) => tm?.member))
        .filter((m) => m!.id !== data.owner.id),
      "id"
    ).sort((a, b) => -b!.fullName.localeCompare(a!.fullName));
  }, [data?.teams]);

  if (loading) {
    return <LinearProgress />;
  }

  const { title, isOwner, from, to, owner, teams, description, repeat } = data!;

  const rule = createRule(data as any);
  const afterDate = state.selectedDate && getLocalDateTime(state.selectedDate);
  const nextDate = afterDate && rule.after(afterDate.utc().toDate(), true);
  const startAt = nextDate ? getDateTimeFromUTC(nextDate) : from;

  const duration = to.diff(from);
  const localFrom = startAt
    ? mergeDates(startAt, from)
    : getLocalDateTime(from);
  const localTo = localFrom.add(duration, "milliseconds");

  const time = formatEventDateTime(localFrom, localTo);
  const formattedDuration = formatDuration(duration);

  return (
    <Box p={2} maxWidth="md">
      <Stack
        mb={1}
        direction="row"
        justifyContent="flex-end"
        spacing={1}
        flexWrap="wrap"
      >
        {isOwner && (
          <>
            <Button
              variant="contained"
              size="small"
              color="warning"
              onClick={() => setOpenDeleteDialog(true)}
              startIcon={<Delete />}
            >
              Delete
            </Button>
            <Button
              variant="contained"
              size="small"
              startIcon={<Edit />}
              component={Link}
              to={routeMap.editMeeting.replace(":id", id!)}
            >
              Edit
            </Button>
          </>
        )}
        <Button variant="outlined" size="small" onClick={() => navigate(-1)}>
          Close
        </Button>
      </Stack>
      <Stack spacing={1}>
        <Box>
          <Typography variant="h3">{title}</Typography>
          <Typography variant="h4" fontWeight={500}>
            {time}
          </Typography>
          {repeat && (
            <Typography variant="h5" fontWeight={500}>
              {formattedDuration} {formatRepeat(repeat)}
            </Typography>
          )}
        </Box>
        <Stack direction="row" rowGap={1} columnGap={1} flexWrap="wrap">
          {teams.map((t) => (
            <Box key={t!.id}>
              <Link
                to={routeMap.team.replace(":id", t!.id)}
                style={{ textDecoration: "none", color: "inherit" }}
              >
                <Chip
                  label={
                    <Typography variant="caption" fontWeight={700}>
                      {t?.name}
                    </Typography>
                  }
                  size="small"
                />
              </Link>
            </Box>
          ))}
        </Stack>
        <ListItem disablePadding>
          <ListItemAvatar>
            <Avatar alt={owner.fullName} src={owner.picture}>
              {owner.fullName[0].toLocaleUpperCase()}
            </Avatar>
          </ListItemAvatar>
          <ListItemText
            primary={owner.fullName}
            primaryTypographyProps={{
              fontWeight: 500,
            }}
            secondary="Organizer"
          />
        </ListItem>
      </Stack>
      <Typography>{description}</Typography>
      <Box mt={2}>
        <MembersList
          members={members as User[]}
          from={localFrom}
          to={localTo}
        />
      </Box>
      <DeleteMeetingDialog
        open={openDeleteDialog}
        onClose={closeDeleteDialog}
        id={id!}
      />
    </Box>
  );
}
