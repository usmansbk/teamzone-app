import { Box } from "@mui/material";
import { useCallback } from "react";
import { useNavigate } from "react-router-dom";
import CountdownForm from "src/components/TimerForm";

export default function NewTimer() {
  const navigate = useNavigate();

  const onClose = useCallback(() => navigate(-1), []);

  return (
    <Box p={2}>
      <CountdownForm title="New Timer" onClose={onClose} />
    </Box>
  );
}
