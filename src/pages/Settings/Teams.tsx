import {
  Grid,
  CircularProgress,
  List,
  ListSubheader,
  ListItem,
  ListItemText,
  Typography,
} from "@mui/material";
import useMe from "src/hooks/api/useMe";
import { Link } from "react-router-dom";
import routeMap from "src/routeMap";
import useGetTimezones from "src/hooks/api/useGetTimezones";

export default function CreatedTeams() {
  const { loading: loadingTimezones } = useGetTimezones();
  const { data } = useMe();

  const { createdTeams } = data!;

  if (loadingTimezones) {
    return <CircularProgress />;
  }
  return (
    <Grid container justifyContent="center">
      <Grid item xs={12} md={6} alignItems="center">
        {!createdTeams.length && (
          <Typography variant="h4">
            You haven't created any teams yet!
          </Typography>
        )}
        {!!createdTeams?.length && (
          <List>
            <ListSubheader style={{ fontWeight: 900 }}>
              Created Teams
            </ListSubheader>
            {createdTeams?.map((team) => (
              <Link
                key={team!.id}
                to={routeMap.team.replace(":id", team!.id)}
                style={{ color: "inherit", textDecoration: "none" }}
              >
                <ListItem divider>
                  <ListItemText
                    primary={team?.name}
                    primaryTypographyProps={{ noWrap: true, fontWeight: 800 }}
                  />
                </ListItem>
              </Link>
            ))}
          </List>
        )}
      </Grid>
    </Grid>
  );
}
