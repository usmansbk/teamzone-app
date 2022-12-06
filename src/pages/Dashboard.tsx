import { Box, Button, Container, Stack, Typography } from "@mui/material";
import { useCallback, useState } from "react";
import { Link } from "react-router-dom";
import NewTeamDialog from "src/components/NewTeamDialog";
import useMe from "src/hooks/api/useMe";
import routeMap from "src/routeMap";
import Clocks from "./Team/Clocks";

export default function Dashboard() {
  const [openTeamForm, setOpenTeamForm] = useState(false);
  const { data } = useMe();

  const closeTeamForm = useCallback(() => setOpenTeamForm(false), []);
  const { teams } = data!;

  return (
    <Container maxWidth="md">
      <Box mb={2}>
        <Button
          variant="contained"
          size="large"
          onClick={() => setOpenTeamForm(true)}
        >
          Create new Team
        </Button>
      </Box>
      <Stack spacing={2} pb={4}>
        {teams.map((team) => (
          <Box key={team!.id}>
            <Link
              to={routeMap.team.replace(":id", team!.id)}
              style={{ textDecoration: "none", color: "inherit" }}
            >
              <Typography mb={1} variant="h5">
                {team?.name}
              </Typography>
            </Link>
            <Clocks teammates={team?.teammates as any} />
          </Box>
        ))}
      </Stack>
      <NewTeamDialog open={openTeamForm} onClose={closeTeamForm} />
    </Container>
  );
}
