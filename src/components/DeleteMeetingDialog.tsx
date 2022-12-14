import { Dialog, DialogActions, DialogTitle, Button } from "@mui/material";
import { LoadingButton } from "@mui/lab";
import useDeleteMeeting from "src/hooks/api/useDeleteMeeting";
import { memo, useCallback, useEffect } from "react";
import { useNavigate } from "react-router-dom";

interface Props {
  id: string;
  open: boolean;
  onClose: () => void;
}

function DeleteMeetingDialog({ open, onClose, id }: Props) {
  const navigate = useNavigate();
  const { onSubmit, loading, data } = useDeleteMeeting();

  const handleSubmit = useCallback(() => {
    onSubmit({
      id,
    });
  }, [onSubmit, id]);

  useEffect(() => {
    if (data) {
      navigate(-1);
    }
  }, [data]);

  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="xs">
      <DialogTitle>Delete meeting?</DialogTitle>
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

export default memo(DeleteMeetingDialog);
