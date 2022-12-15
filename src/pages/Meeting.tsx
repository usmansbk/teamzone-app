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
  Tooltip,
} from "@mui/material";
import { Dayjs } from "dayjs";
import { memo, useCallback, useMemo, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import DeleteMeetingDialog from "src/components/DeleteMeetingDialog";
import useGetMeetingById from "src/hooks/api/useGetMeetingById";
import routeMap from "src/routeMap";
import {
  formatUTCOffset,
  getLocalDateTime,
  getTimezoneLocalDateTime,
} from "src/utils/dateTime";
import { formatEventDateTime } from "src/utils/event";
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
          <Tooltip
            title={`${tzData?.alternativeName} UTC${formatUTCOffset(
              timezone!
            )}`}
            placement="top"
          >
            <Typography variant="body2" fontWeight={500}>
              {formatEventDateTime(startAt, endAt)} {tzData?.abbreviation}
            </Typography>
          </Tooltip>
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
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();
  const [openDeleteDialog, setOpenDeleteDialog] = useState(false);
  const { loading, data } = useGetMeetingById(id!);

  const closeDeleteDialog = useCallback(() => setOpenDeleteDialog(false), []);
  const members = useMemo(() => {
    if (!data?.teams) {
      return [];
    }

    return data.teams
      .flatMap((t) => t?.teammates.map((tm) => tm?.member))
      .filter((m) => m!.id !== data.owner.id);
  }, [data?.teams]);

  if (loading) {
    return <LinearProgress />;
  }

  const { title, isOwner, from, to, owner, teams, description } = data!;

  const localFrom = getLocalDateTime(from);
  const localTo = getLocalDateTime(to);
  const time = formatEventDateTime(localFrom, localTo);

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
      <Stack>
        <Typography variant="h3">{title}</Typography>
        <Typography variant="h4" fontWeight={500}>
          {time}
        </Typography>
        <Stack direction="row" rowGap={1} columnGap={1} flexWrap="wrap">
          {teams.map((t) => (
            <Box key={t!.id}>
              <Chip
                label={
                  <Typography variant="caption" fontWeight={700}>
                    {t?.name}
                  </Typography>
                }
                size="small"
              />
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
        <MembersList members={members as User[]} from={from} to={to} />
      </Box>
      <DeleteMeetingDialog
        open={openDeleteDialog}
        onClose={closeDeleteDialog}
        id={id!}
      />
    </Box>
  );
}
