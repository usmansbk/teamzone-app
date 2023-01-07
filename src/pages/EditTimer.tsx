import { Box } from "@mui/material";
import { useCallback, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import TimerForm from "src/components/TimerForm";
import useUpdateTimer from "src/hooks/api/useUpdateTimer";

export default function EditTimer() {
  const navigate = useNavigate();
  const { onSubmit, data } = useUpdateTimer();

  const onClose = useCallback(() => navigate(-1), []);

  useEffect(() => {
    if (data) {
      navigate(-1);
    }
  }, [data]);

  return (
    <Box p={2}>
      <TimerForm title="Edit Countdown" onClose={onClose} onSubmit={onSubmit} />
    </Box>
  );
}
