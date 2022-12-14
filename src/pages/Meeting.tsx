import { LoadingButton } from "@mui/lab";
import { Box, Typography } from "@mui/material";
import { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import useDeleteMeeting from "src/hooks/api/useDeleteMeeting";

export default function Meeting() {
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();
  const { onSubmit, loading, data } = useDeleteMeeting();

  useEffect(() => {
    if (data) {
      navigate(-1);
    }
  }, [data]);

  return (
    <Box p={2}>
      <Typography>Meeting</Typography>
      <LoadingButton
        loading={loading}
        onClick={() =>
          onSubmit({
            id: id!,
          })
        }
      >
        Delete
      </LoadingButton>
    </Box>
  );
}
