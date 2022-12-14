import {
  Box,
  List,
  ListItem,
  ListItemText,
  Typography,
  ListItemAvatar,
  Avatar,
  LinearProgress,
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
    return <LinearProgress />;
  }

  return (
    <Box>
      {!createdTeams.length && (
        <Typography variant="h4" sx={{ textAlign: "center" }}>
          You haven't created any teams yet!
        </Typography>
      )}
      {!!createdTeams?.length && (
        <List>
          {createdTeams?.map((team) => (
            <Link
              key={team!.id}
              to={routeMap.team.replace(":id", team!.id)}
              style={{ color: "inherit", textDecoration: "none" }}
            >
              <ListItem divider>
                <ListItemAvatar>
                  <Avatar variant="rounded">{team?.name[0]}</Avatar>
                </ListItemAvatar>
                <ListItemText
                  primary={team?.name}
                  primaryTypographyProps={{ noWrap: true, fontWeight: 800 }}
                />
              </ListItem>
            </Link>
          ))}
        </List>
      )}
    </Box>
  );
}
