import { Box, LinearProgress } from "@mui/material";
import { useCallback, useEffect, useMemo } from "react";
import { useNavigate, useParams } from "react-router-dom";
import MeetingForm from "src/components/MeetingForm";
import useGetMeetingById from "src/hooks/api/useGetMeetingById";
import useUpdateMeeting from "src/hooks/api/useUpdateMeeting";

export default function EditMeeting() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { loading: fetching, data } = useGetMeetingById(id!);
  const { onSubmit, loading, data: updated } = useUpdateMeeting();

  const onClose = useCallback(() => navigate(-1), []);

  useEffect(() => {
    if (updated) {
      navigate(-1);
    }
  }, [updated]);

  const defaultValues = useMemo(
    () => data?.teams && { ...data, teamIds: data!.teams.map((t) => t!.id) },
    [data]
  );

  return (
    <>
      {fetching && <LinearProgress />}
      <Box p={2} maxWidth="md">
        <MeetingForm
          autoFocus={false}
          title="Edit meeting"
          onClose={onClose}
          onSubmit={onSubmit}
          loading={loading}
          disabled={fetching}
          defaultValues={defaultValues}
        />
      </Box>
    </>
  );
}
