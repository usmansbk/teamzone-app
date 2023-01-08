import {
  Dialog,
  DialogActions,
  DialogTitle,
  Button,
  DialogContent,
  TextField,
} from "@mui/material";
import { LoadingButton } from "@mui/lab";
import { memo, useCallback, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import useDeleteTimer from "src/hooks/api/useDeleteTimer";

interface Props {
  id: string;
  open: boolean;
  onClose: () => void;
}

function DeleteTimerDialog({ open, onClose, id }: Props) {
  const navigate = useNavigate();
  const { onSubmit, loading, data } = useDeleteTimer();
  const [reason, setReason] = useState("");

  const handleSubmit = useCallback(() => {
    onSubmit({
      deleteTimerId: id,
      reason: reason.trim() || undefined,
    });
  }, [onSubmit, id, reason]);

  useEffect(() => {
    if (data) {
      navigate(-1);
    }
  }, [data]);

  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="xs">
      <DialogTitle>Delete timer?</DialogTitle>
      <DialogContent>
        <TextField
          autoFocus
          variant="outlined"
          label="Reason"
          fullWidth
          margin="dense"
          multiline
          value={reason}
          onChange={(e) => setReason(e.target.value)}
          placeholder="Let your teammates know why"
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>No</Button>
        <LoadingButton
          variant="contained"
          color="warning"
          loading={loading}
          onClick={handleSubmit}
        >
          Delete
        </LoadingButton>
      </DialogActions>
    </Dialog>
  );
}

export default memo(DeleteTimerDialog);
