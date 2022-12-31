import { Box } from "@mui/material";
import { useCallback } from "react";
import { useNavigate } from "react-router-dom";
import TimerForm from "src/components/TimerForm";

export default function NewTimer() {
  const navigate = useNavigate();

  const onClose = useCallback(() => navigate(-1), []);

  return (
    <Box p={2}>
      <TimerForm title="New Timer" onClose={onClose} onSubmit={console.log} />
    </Box>
  );
}
