import { ContentCopy } from "@mui/icons-material";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
  Typography,
} from "@mui/material";
import { CopyToClipboard } from "react-copy-to-clipboard";
import toast from "react-hot-toast";

interface Props {
  open: boolean;
  onClose: () => void;
  code: string;
}

export default function InviteMemberDialog({ open, onClose, code }: Props) {
  const link = `${window.location.protocol}//${window.location.host}/invite/${code}`;
  return (
    <Dialog open={open} onClose={onClose} maxWidth="xs" fullWidth>
      <DialogTitle>Invite Teammates</DialogTitle>
      <DialogContent>
        <Typography mb={0.5} variant="subtitle1">
          Copy invite link
        </Typography>
        <CopyToClipboard text={link} onCopy={() => toast("Copied")}>
          <TextField
            fullWidth
            InputProps={{
              startAdornment: <ContentCopy />,
              readOnly: true,
              sx: {
                borderRadius: 0,
              },
            }}
            sx={{
              "& .MuiInputBase-input": {
                overflow: "hidden",
                textOverflow: "ellipsis",
                cursor: "pointer",
              },
            }}
            value={link}
          />
        </CopyToClipboard>
      </DialogContent>
      <DialogActions>
        <Button variant="contained" onClick={onClose}>
          Done
        </Button>
      </DialogActions>
    </Dialog>
  );
}
