import {
  Divider,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  ListSubheader,
  Toolbar,
  Typography,
} from "@mui/material";
import { Link } from "react-router-dom";
import ThemedNavLink from "src/components/ThemedNavLink";
import routeMap from "src/routeMap";
import { Team } from "src/__generated__/graphql";

interface Props {
  teams: Partial<Team>[];
}
export default function DrawerContent({ teams }: Props) {
  return (
    <div>
      <Toolbar>
        <Typography
          color="primary"
          variant="h4"
          component={Link}
          to={routeMap.home}
          noWrap
          sx={{
            fontWeight: 900,
            textDecoration: "none",
          }}
        >
          Teamzone
        </Typography>
      </Toolbar>
      <Divider />
      <List>
        <ListSubheader>
          <Typography style={{ fontWeight: 700 }}>Teams</Typography>
        </ListSubheader>
        {!teams.length && (
          <ListItem>
            <ListItemText
              primary="You don't have a team, yet!"
              primaryTypographyProps={{
                variant: "caption",
                fontWeight: 800,
              }}
            />
          </ListItem>
        )}
        {teams.map((team) => (
          <ListItem key={team!.id} disablePadding>
            <ListItemButton
              component={ThemedNavLink}
              to={routeMap.team.replace(":id", team!.id!)}
            >
              <ListItemText
                primary={team!.name}
                primaryTypographyProps={{
                  noWrap: true,
                  style: {
                    fontWeight: 800,
                    fontSize: 16,
                  },
                }}
              />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </div>
  );
}
