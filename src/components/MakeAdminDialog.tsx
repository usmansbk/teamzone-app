import { LoadingButton } from "@mui/lab";
import { Button, Dialog, DialogActions, DialogTitle } from "@mui/material";
import { memo, useEffect } from "react";
import useMakeAdmin from "src/hooks/api/useMakeAdmin";

interface Props {
  id: string;
  name: string;
  open: boolean;
  onClose: () => void;
}

function MakeAdminDialog({ name, onClose, open, id }: Props) {
  const { loading, data, onSubmit } = useMakeAdmin();

  useEffect(() => {
    if (data) {
      onClose();
    }
  }, [data]);

  return (
    <Dialog open={open} onClose={onClose} maxWidth="xs" fullWidth>
      <DialogTitle>Are you sure you want to make {name} admin?</DialogTitle>
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

export default memo(MakeAdminDialog);
