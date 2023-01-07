import { Box } from "@mui/material";
import { useCallback, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import TimerForm from "src/components/TimerForm";
import useCreateTimer from "src/hooks/api/useCreateTimer";

export default function NewTimer() {
  const navigate = useNavigate();
  const { onSubmit, data } = useCreateTimer();

  const onClose = useCallback(() => navigate(-1), []);

  useEffect(() => {
    if (data) {
      navigate(-1);
    }
  }, [data]);

  return (
    <Box p={2}>
      <TimerForm title="New Countdown" onClose={onClose} onSubmit={onSubmit} />
    </Box>
  );
}
