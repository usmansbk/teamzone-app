import { Box, LinearProgress } from "@mui/material";
import { useCallback } from "react";
import { useNavigate, useParams } from "react-router-dom";
import MeetingForm from "src/components/MeetingForm";
import useGetMeetingById from "src/hooks/api/useGetMeetingById";
import useUpdateMeeting from "src/hooks/api/useUpdateMeeting";

export default function EditMeeting() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { loading: fetching } = useGetMeetingById(id!);
  const { onSubmit, loading } = useUpdateMeeting();

  const onClose = useCallback(() => navigate(-1), []);

  return (
    <>
      {fetching && <LinearProgress />}
      <Box p={2} maxWidth="md">
        <MeetingForm
          title="Edit meeting"
          onClose={onClose}
          onSubmit={onSubmit}
          loading={loading}
          disabled={fetching}
        />
      </Box>
    </>
  );
}
