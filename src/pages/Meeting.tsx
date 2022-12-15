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
} from "@mui/material";
import { useCallback, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import DeleteMeetingDialog from "src/components/DeleteMeetingDialog";
import useGetMeetingById from "src/hooks/api/useGetMeetingById";
import routeMap from "src/routeMap";
import { getLocalDateTime } from "src/utils/dateTime";
import { formatEventDateTime } from "src/utils/event";

export default function Meeting() {
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();
  const [openDeleteDialog, setOpenDeleteDialog] = useState(false);
  const { loading, data } = useGetMeetingById(id!);

  const closeDeleteDialog = useCallback(() => setOpenDeleteDialog(false), []);

  if (loading) {
    return <LinearProgress />;
  }

  const { title, isOwner, from, to, owner, teams } = data!;

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
          <ListItemText primary={owner.fullName} secondary="Organizer" />
        </ListItem>
      </Stack>
      <DeleteMeetingDialog
        open={openDeleteDialog}
        onClose={closeDeleteDialog}
        id={id!}
      />
    </Box>
  );
}
