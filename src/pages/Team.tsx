import { Container, LinearProgress, Typography } from "@mui/material";
import { useParams } from "react-router-dom";
import useGetTeamById from "src/hooks/api/useGetTeamById";

export default function Team() {
  const { id } = useParams<{ id: string }>();

  const { loading, data, error } = useGetTeamById(id!);

  if (loading && !data) {
    return <LinearProgress />;
  }

  if (error) {
    throw error;
  }

  const { name } = data!;

  return (
    <Container>
      <Typography variant="h4">{name}</Typography>
    </Container>
  );
}
