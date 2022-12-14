import { Delete, Edit } from "@mui/icons-material";
import { Box, Button, LinearProgress, Stack, Typography } from "@mui/material";
import { useCallback, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import DeleteMeetingDialog from "src/components/DeleteMeetingDialog";
import useGetMeetingById from "src/hooks/api/useGetMeetingById";

export default function Meeting() {
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();
  const [openDeleteDialog, setOpenDeleteDialog] = useState(false);
  const { loading, data } = useGetMeetingById(id!);

  const closeDeleteDialog = useCallback(() => setOpenDeleteDialog(false), []);

  if (loading) {
    return <LinearProgress />;
  }

  const { title, isOwner } = data!;

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
            <Button variant="contained" size="small" startIcon={<Edit />}>
              Edit
            </Button>
          </>
        )}
        <Button variant="outlined" size="small" onClick={() => navigate(-1)}>
          Close
        </Button>
      </Stack>
      <Typography variant="h5">{title}</Typography>
      <DeleteMeetingDialog
        open={openDeleteDialog}
        onClose={closeDeleteDialog}
      />
    </Box>
  );
}
