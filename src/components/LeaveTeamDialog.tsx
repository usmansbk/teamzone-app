import { Button, Dialog, DialogActions, DialogTitle } from "@mui/material";
import { memo, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import useLeaveTeam from "src/hooks/api/useLeaveTeam";
import routeMap from "src/routeMap";

interface Props {
  open: boolean;
  onClose: () => void;
  title: string;
}

function LeaveTeamDialog({ open, onClose, title }: Props) {
  const { id } = useParams<{ id: string }>();
  const { handleLeave, data } = useLeaveTeam();
  const navigate = useNavigate();

  useEffect(() => {
    if (data) {
      navigate(routeMap.app);
    }
  }, [data]);

  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="xs">
      <DialogTitle noWrap>Leave {title}?</DialogTitle>
      <DialogActions>
        <Button onClick={onClose}>No</Button>
        <Button
          variant="contained"
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

export default memo(LeaveTeamDialog);
