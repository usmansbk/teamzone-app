import { Container, LinearProgress, Typography } from "@mui/material";
import { useParams } from "react-router-dom";
import useGetTeamById from "src/hooks/api/useGetTeamById";

export default function Team() {
  const { id } = useParams<{ id: string }>();

  const { loading, data, error } = useGetTeamById(id!);

  if (error) {
    throw error;
  }

  if (loading && !data) {
    return <LinearProgress />;
  }

  const { name } = data!;

  return (
    <>
      {loading && <LinearProgress />}
      {!!data && (
        <Container>
          <Typography variant="h4">{name}</Typography>
        </Container>
      )}
    </>
  );
}
