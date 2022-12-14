import { Dialog, DialogActions, DialogTitle, Button } from "@mui/material";
import { LoadingButton } from "@mui/lab";

interface Props {
  open: boolean;
  onClose: () => void;
}

export default function DeleteMeetingDialog({ open, onClose }: Props) {
  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="xs">
      <DialogTitle>Delete meeting?</DialogTitle>
      <DialogActions>
        <Button onClick={onClose}>No</Button>
        <LoadingButton variant="contained" color="warning">
          Delete
        </LoadingButton>
      </DialogActions>
    </Dialog>
  );
}
