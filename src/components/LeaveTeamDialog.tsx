import { Button, Dialog, DialogActions, DialogTitle } from "@mui/material";

interface Props {
  open: boolean;
  onClose: () => void;
  title: string;
}

export default function LeaveTeamDialog({ open, onClose, title }: Props) {
  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Leave {title}?</DialogTitle>
      <DialogActions>
        <Button onClick={onClose}>No</Button>
        <Button>Yes</Button>
      </DialogActions>
    </Dialog>
  );
}
