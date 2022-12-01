import { Button, Dialog, DialogActions, DialogTitle } from "@mui/material";
import { useEffect } from "react";
import { To, useNavigate, useParams } from "react-router-dom";
import useDeleteTeam from "src/hooks/api/useDeleteTeam";

interface Props {
  open: boolean;
  onClose: () => void;
  title: string;
}

export default function DeleteTeamDialog({ open, onClose, title }: Props) {
  const { id } = useParams<{ id: string }>();
  const { handleDelete, data } = useDeleteTeam();
  const navigate = useNavigate();

  useEffect(() => {
    if (data) {
      navigate(-1 as To, { replace: true });
    }
  }, [data]);

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
