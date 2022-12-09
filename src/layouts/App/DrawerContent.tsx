import {
  Avatar,
  Divider,
  List,
  ListItem,
  ListItemAvatar,
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
  onClose: () => void;
}
export default function DrawerContent({ teams, onClose }: Props) {
  return (
    <div>
      <Toolbar>
        <Typography
          color="primary"
          variant="h4"
          component={Link}
          to={routeMap.home}
          noWrap
          fontWeight={900}
          sx={{
            textDecoration: "none",
          }}
        >
          Teamzone
        </Typography>
      </Toolbar>
      <Divider />
      <List>
        <ListSubheader>
          <Typography fontWeight={700}>Teams</Typography>
        </ListSubheader>
        {!teams.length && (
          <ListItem>
            <ListItemText
              primary="You are not a member of any teams yet"
              primaryTypographyProps={{
                variant: "h6",
              }}
            />
          </ListItem>
        )}
        {teams.map((team) => (
          <ListItem key={team!.id} disablePadding>
            <ListItemButton
              component={ThemedNavLink}
              to={routeMap.team.replace(":id", team!.id!)}
              onClick={onClose}
            >
              <ListItemAvatar>
                <Avatar variant="rounded">{team?.name![0]}</Avatar>
              </ListItemAvatar>
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
