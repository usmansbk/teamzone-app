import { Delete, Edit } from "@mui/icons-material";
import { Box, Button, LinearProgress, Stack, Typography } from "@mui/material";
import { useCallback, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import DeleteMeetingDialog from "src/components/DeleteMeetingDialog";
import useGetMeetingById from "src/hooks/api/useGetMeetingById";
import routeMap from "src/routeMap";
import { getLocalDateTime } from "src/utils/dateTime";

export default function Meeting() {
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();
  const [openDeleteDialog, setOpenDeleteDialog] = useState(false);
  const { loading, data } = useGetMeetingById(id!);

  const closeDeleteDialog = useCallback(() => setOpenDeleteDialog(false), []);

  if (loading) {
    return <LinearProgress />;
  }

  const { title, isOwner, from, timezone } = data!;

  const localFrom = getLocalDateTime(from);

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
        <Typography>{timezone}</Typography>
        <Typography>{localFrom.format("LLL")}</Typography>
      </Stack>
      <DeleteMeetingDialog
        open={openDeleteDialog}
        onClose={closeDeleteDialog}
        id={id!}
      />
    </Box>
  );
}
