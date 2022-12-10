import { GroupAdd } from "@mui/icons-material";
import {
  Avatar,
  Button,
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
import { useCallback, useState } from "react";
import { Link } from "react-router-dom";
import NewTeamDialog from "src/components/NewTeamDialog";
import ThemedNavLink from "src/components/ThemedNavLink";
import routeMap from "src/routeMap";
import { Team } from "src/__generated__/graphql";

interface Props {
  teams: Partial<Team>[];
}
export default function DrawerContent({ teams }: Props) {
  const [openTeamForm, setOpenTeamForm] = useState(false);

  const closeTeamForm = useCallback(() => setOpenTeamForm(false), []);

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
            >
              <ListItemAvatar>
                <Avatar variant="rounded">
                  {team?.name![0].toUpperCase()}
                </Avatar>
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
      <Button
        startIcon={<GroupAdd />}
        fullWidth
        onClick={() => setOpenTeamForm(true)}
      >
        Create new Team
      </Button>
      <NewTeamDialog open={openTeamForm} onClose={closeTeamForm} />
    </div>
  );
}
