import { Button, Dialog, DialogActions, DialogTitle } from "@mui/material";
import { Navigate, useParams } from "react-router-dom";
import useDeleteTeam from "src/hooks/api/useDeleteTeam";
import routeMap from "src/routeMap";

interface Props {
  open: boolean;
  onClose: () => void;
  title: string;
}

export default function DeleteTeamDialog({ open, onClose, title }: Props) {
  const { id } = useParams<{ id: string }>();
  const { handleDelete, data } = useDeleteTeam();

  if (data) {
    return <Navigate to={routeMap.home} />;
  }

  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="xs">
      <DialogTitle>Delete {title}?</DialogTitle>
      <DialogActions>
        <Button onClick={onClose}>No</Button>
        <Button
          onClick={() => {
            handleDelete({
              id: id!,
            });
          }}
        >
          Yes
        </Button>
      </DialogActions>
    </Dialog>
  );
}
