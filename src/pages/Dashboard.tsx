import { Box, Grid, Paper, Typography, Button } from "@mui/material";
import { useCallback, useState } from "react";
import { Link } from "react-router-dom";
import NewTeamDialog from "src/components/NewTeamDialog";
import StyledPaper from "src/components/StyledPaper";
import useMe from "src/hooks/api/useMe";
import routeMap from "src/routeMap";

export default function Dashboard() {
  const [openTeamForm, setOpenTeamForm] = useState(false);
  const { data } = useMe();

  const { firstName, teams } = data!;

  const closeTeamForm = useCallback(() => setOpenTeamForm(false), []);

  return (
    <Box px={3}>
      <Typography variant="h4">Hello, {firstName}!</Typography>
      <Typography variant="h6" pt={2}>
        Your Teams
      </Typography>
      <Grid container pt={1} spacing={2}>
        <Grid item xs={12} sm={6} md={4} lg={3} zeroMinWidth>
          <Paper
            component={Button}
            variant="outlined"
            fullWidth
            elevation={0}
            sx={{ p: 2 }}
            onClick={() => setOpenTeamForm(true)}
          >
            <Typography color="primary" style={{ fontWeight: 900 }} noWrap>
              Create new Team
            </Typography>
          </Paper>
        </Grid>
        {teams.map((team) => (
          <Grid key={team!.id} item xs={12} sm={6} md={4} lg={3} zeroMinWidth>
            <Link
              to={routeMap.team.replace(":id", team!.id)}
              style={{ textDecoration: "none" }}
            >
              <StyledPaper variant="outlined" elevation={0} sx={{ p: 2 }}>
                <Typography style={{ fontWeight: 900 }} noWrap>
                  {team?.name}
                </Typography>
              </StyledPaper>
            </Link>
          </Grid>
        ))}
      </Grid>
      <NewTeamDialog open={openTeamForm} onClose={closeTeamForm} />
    </Box>
  );
}
