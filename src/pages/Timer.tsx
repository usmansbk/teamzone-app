import { Typography, Box, Button } from "@mui/material";
import { useCallback, useState } from "react";
import { Link, useParams } from "react-router-dom";
import DeleteTimerDialog from "src/components/DeleteTimerDialog";
import routeMap from "src/routeMap";

export default function Countdown() {
  const { id } = useParams<{ id: string }>();
  const [openDeleteDialog, setOpenDeleteDialog] = useState(false);

  const onCloseDeleteDialog = useCallback(() => {
    setOpenDeleteDialog(false);
  }, []);

  return (
    <Box p={2}>
      <Typography>Countdown</Typography>
      <Button onClick={() => setOpenDeleteDialog(true)}>Delete</Button>
      <Link to={routeMap.editTimer.replace(":id", id!)}>Edit</Link>
      <DeleteTimerDialog
        id={id!}
        open={openDeleteDialog}
        onClose={onCloseDeleteDialog}
      />
    </Box>
  );
}
