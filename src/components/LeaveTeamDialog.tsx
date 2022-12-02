import { Button, Dialog, DialogActions, DialogTitle } from "@mui/material";
import { useEffect } from "react";
import { To, useNavigate, useParams } from "react-router-dom";
import useLeaveTeam from "src/hooks/api/useLeaveTeam";

interface Props {
  open: boolean;
  onClose: () => void;
  title: string;
}

export default function LeaveTeamDialog({ open, onClose, title }: Props) {
  const { id } = useParams<{ id: string }>();
  const { handleLeave, data } = useLeaveTeam();
  const navigate = useNavigate();

  useEffect(() => {
    if (data) {
      navigate(-1 as To, { replace: true });
    }
  }, [data]);

  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="xs">
      <DialogTitle noWrap>Leave {title}?</DialogTitle>
      <DialogActions>
        <Button onClick={onClose}>No</Button>
        <Button
          onClick={() => {
            handleLeave({ teamId: id! });
          }}
        >
          Yes
        </Button>
      </DialogActions>
    </Dialog>
  );
}
