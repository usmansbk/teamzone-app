import { LoadingButton } from "@mui/lab";
import { Box, LinearProgress, Stack, Typography } from "@mui/material";
import { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import useDeleteMeeting from "src/hooks/api/useDeleteMeeting";
import useGetMeetingById from "src/hooks/api/useGetMeetingById";

export default function Meeting() {
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();
  const { onSubmit, loading: deleting, data: deletedData } = useDeleteMeeting();
  const { loading, data } = useGetMeetingById(id!);

  useEffect(() => {
    if (deletedData) {
      navigate(-1);
    }
  }, [deletedData]);

  if (loading) {
    return <LinearProgress />;
  }

  const { title } = data!;

  return (
    <Box p={2} maxWidth="md">
      <Stack mb={1} direction="row" justifyContent="flex-end">
        <LoadingButton
          variant="contained"
          size="small"
          color="warning"
          loading={deleting}
          onClick={() =>
            onSubmit({
              id: id!,
            })
          }
        >
          Delete
        </LoadingButton>
      </Stack>
      <Typography variant="h5">{title}</Typography>
    </Box>
  );
}
