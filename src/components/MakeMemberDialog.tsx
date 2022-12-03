import { LoadingButton } from "@mui/lab";
import { Button, Dialog, DialogActions, DialogTitle } from "@mui/material";
import { useEffect } from "react";
import useMakeMember from "src/hooks/api/useMakeMember";

interface Props {
  id: string;
  name: string;
  open: boolean;
  onClose: () => void;
}

export default function MakeMemberDialog({ name, onClose, open, id }: Props) {
  const { loading, data, onSubmit } = useMakeMember();

  useEffect(() => {
    if (data) {
      onClose();
    }
  }, [data]);

  return (
    <Dialog open={open} onClose={onClose} maxWidth="xs" fullWidth>
      <DialogTitle>Are you sure you want to make {name} a member?</DialogTitle>
      <DialogActions>
        <Button size="large" onClick={onClose}>
          No
        </Button>
        <LoadingButton
          loading={loading}
          size="large"
          variant="contained"
          onClick={() => onSubmit(id)}
        >
          Yes
        </LoadingButton>
      </DialogActions>
    </Dialog>
  );
}
