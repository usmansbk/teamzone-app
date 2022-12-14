import {
  CalendarMonth,
  Dashboard,
  GroupAdd,
  HourglassBottom,
} from "@mui/icons-material";
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
import { useCallback, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import NewTeamDialog from "src/components/NewTeamDialog";
import PinTeamButton from "src/components/PinTeamButton";
import ThemedNavLink from "src/components/ThemedNavLink";
import routeMap from "src/routeMap";
import { Team } from "src/__generated__/graphql";

interface Props {
  teams: Partial<Team>[];
}
export default function DrawerContent({ teams }: Props) {
  const [openTeamForm, setOpenTeamForm] = useState(false);

  const closeTeamForm = useCallback(() => setOpenTeamForm(false), []);

  const navs = useMemo(
    () => [
      {
        path: routeMap.app,
        icon: <Dashboard />,
        name: "Dashboard",
      },
      {
        path: routeMap.meetings,
        icon: <CalendarMonth />,
        name: "Calendar",
      },
      {
        path: routeMap.timers,
        icon: <HourglassBottom />,
        name: "Timers",
      },
    ],
    []
  );

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
        {navs.map(({ path, icon, name }) => (
          <ListItem key={path} disablePadding>
            <ListItemButton component={ThemedNavLink} to={path}>
              <ListItemAvatar>
                <Avatar>{icon}</Avatar>
              </ListItemAvatar>
              <ListItemText
                primary={name}
                primaryTypographyProps={{
                  noWrap: true,
                  style: {
                    fontWeight: 800,
                  },
                }}
              />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
      <Divider />
      <List>
        <ListSubheader>
          <Typography fontWeight={700}>Teams</Typography>
        </ListSubheader>
        {teams.map((team) => (
          <ListItem
            key={team!.id}
            disablePadding
            secondaryAction={<PinTeamButton team={team! as Team} />}
          >
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
