import { Box, Grid, Paper, Tooltip, Typography } from "@mui/material";
import { Link } from "react-router-dom";
import useMe from "src/hooks/api/useMe";
import routeMap from "src/routeMap";

export default function AppHome() {
  const { data } = useMe();

  const { firstName, teams } = data!;

  return (
    <Box p={3}>
      <Typography variant="h4">Hello, {firstName}!</Typography>
      <Typography variant="h6" pt={2}>
        Your Teams
      </Typography>
      <Grid container pt={1} spacing={2}>
        {teams.map((team) => (
          <Grid key={team!.id} item xs={12} sm={6} md={4} lg={3} zeroMinWidth>
            <Tooltip title={team!.name}>
              <Link
                to={routeMap.team.replace(":id", team!.id)}
                style={{ textDecoration: "none" }}
              >
                <Paper elevation={1} sx={{ p: 2 }}>
                  <Typography style={{ fontWeight: 700 }} noWrap>
                    {team?.name}
                  </Typography>
                </Paper>
              </Link>
            </Tooltip>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
}
