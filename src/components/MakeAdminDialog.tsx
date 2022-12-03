import { Button, Dialog, DialogActions, DialogTitle } from "@mui/material";

interface Props {
  id: string;
  name: string;
  open: boolean;
  onClose: () => void;
}

export default function MakeAdminDialog({ name, onClose, open, id }: Props) {
  console.log(id);
  return (
    <Dialog open={open} onClose={onClose} maxWidth="xs" fullWidth>
      <DialogTitle>Are you sure you want to make {name} admin?</DialogTitle>
      <DialogActions>
        <Button size="large" onClick={onClose}>
          No
        </Button>
        <Button size="large" variant="contained">
          Yes
        </Button>
      </DialogActions>
    </Dialog>
  );
}
