import { Button, Dialog, DialogActions, DialogTitle } from "@mui/material";
import { memo, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { LoadingButton } from "@mui/lab";
import useDeleteTeam from "src/hooks/api/useDeleteTeam";
import routeMap from "src/routeMap";

interface Props {
  open: boolean;
  onClose: () => void;
  title: string;
}

function DeleteTeamDialog({ open, onClose, title }: Props) {
  const { id } = useParams<{ id: string }>();
  const { handleDelete, data, loading } = useDeleteTeam();
  const navigate = useNavigate();

  useEffect(() => {
    if (data) {
      navigate(routeMap.app, { replace: true });
    }
  }, [data]);

  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="xs">
      <DialogTitle noWrap>Delete {title}?</DialogTitle>
      <DialogActions>
        <Button onClick={onClose}>No</Button>
        <LoadingButton
          loading={loading}
          variant="contained"
          color="warning"
          onClick={() => {
            handleDelete({
              id: id!,
            });
          }}
        >
          Yes
        </LoadingButton>
      </DialogActions>
    </Dialog>
  );
}

export default memo(DeleteTeamDialog);
