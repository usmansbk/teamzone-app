import { Box, LinearProgress } from "@mui/material";
import { useCallback, useEffect, useMemo } from "react";
import { useNavigate, useParams } from "react-router-dom";
import TimerForm from "src/components/TimerForm";
import useGetTimerById from "src/hooks/api/useGetTimerById";
import useUpdateTimer from "src/hooks/api/useUpdateTimer";

export default function EditTimer() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { loading, data: timer } = useGetTimerById(id!);
  const { onSubmit, data, loading: submitting } = useUpdateTimer();

  const onClose = useCallback(() => navigate(-1), []);

  useEffect(() => {
    if (data) {
      onClose();
    }
  }, [data]);

  const defaultValues = useMemo(
    () => timer?.teams && { ...timer, teamIds: timer!.teams.map((t) => t!.id) },
    [timer]
  );

  return (
    <>
      {loading && <LinearProgress />}
      <Box p={2}>
        <TimerForm
          title="Edit Countdown"
          onClose={onClose}
          onSubmit={onSubmit}
          loading={submitting}
          disabled={submitting}
          defaultValues={defaultValues}
        />
      </Box>
    </>
  );
}
