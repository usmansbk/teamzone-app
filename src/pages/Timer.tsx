import { Delete, Edit } from "@mui/icons-material";
import { Typography, Box, Button, LinearProgress, Stack } from "@mui/material";
import { useCallback, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import DeleteTimerDialog from "src/components/DeleteTimerDialog";
import useGetTimerById from "src/hooks/api/useGetTimerById";
import routeMap from "src/routeMap";

export default function Countdown() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [openDeleteDialog, setOpenDeleteDialog] = useState(false);

  const onCloseDeleteDialog = useCallback(() => {
    setOpenDeleteDialog(false);
  }, []);

  const { loading, data } = useGetTimerById(id as string);

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
            <Button
              variant="contained"
              size="small"
              startIcon={<Edit />}
              component={Link}
              to={routeMap.editTimer.replace(":id", id!)}
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
        </Box>
      </Stack>
      <DeleteTimerDialog
        id={id!}
        open={openDeleteDialog}
        onClose={onCloseDeleteDialog}
      />
    </Box>
  );
}
