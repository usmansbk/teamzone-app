import { Box } from "@mui/material";
import { useCallback, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import MeetingForm from "src/components/MeetingForm";
import useCreateMeeting from "src/hooks/api/useCreateMeeting";
import routeMap from "src/routeMap";

export default function NewMeeting() {
  const { loading, onSubmit, data } = useCreateMeeting();
  const navigate = useNavigate();

  useEffect(() => {
    if (data) {
      navigate(routeMap.meeting.replace(":id", data.id), { replace: true });
    }
  }, [data]);

  const onClose = useCallback(() => {
    navigate(-1);
  }, []);

  return (
    <Box p={2}>
      <MeetingForm
        title="New Meeting"
        onClose={onClose}
        onSubmit={onSubmit}
        loading={loading}
      />
    </Box>
  );
}
