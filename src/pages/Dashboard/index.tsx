import { Box, LinearProgress, Container } from "@mui/material";
import useMe from "src/hooks/api/useMe";
import NavBar from "./NavBar";

export default function Dashboard() {
  const { loading, data } = useMe();

  if (loading) {
    return <LinearProgress />;
  }

  if (!data) {
    throw new Error("No user found");
  }

  return (
    <>
      <NavBar user={data} />
      <Container>
        <Box />
      </Container>
    </>
  );
}
