import * as React from "react";
import {
  useScrollTrigger,
  Typography,
  Tooltip,
  Avatar,
  MenuItem,
  Container,
  Menu,
  IconButton,
  Toolbar,
  Box,
  AppBar,
  Divider,
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  ListSubheader,
  Stack,
} from "@mui/material";
import { Link, Outlet } from "react-router-dom";
import { Add, Menu as MenuIcon } from "@mui/icons-material";
import routeMap from "src/routeMap";
import { tokenVar } from "src/graphql/vars";
import { User } from "src/__generated__/graphql";
import ThemedNavLink from "src/components/ThemedNavLink";

interface ElevationScrollProps {
  children: React.ReactElement;
}

const drawerWidth = 240;

function ElevationScroll(props: ElevationScrollProps) {
  const { children } = props;
  const trigger = useScrollTrigger({
    disableHysteresis: true,
    threshold: 0,
  });

  return React.cloneElement(children, {
    elevation: trigger ? 1 : 0,
  });
}

const settings = ["Profile"];

interface Props {
  user: User;
}

function NavBar({ user }: Props) {
  const [mobileOpen, setMobileOpen] = React.useState(false);
  const [anchorElUser, setAnchorElUser] = React.useState<null | HTMLElement>(
    null
  );

  const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  const logout = React.useCallback(() => {
    tokenVar(null);
    localStorage.removeItem("token");
    handleCloseUserMenu();
  }, []);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const drawer = (
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
          <Stack
            direction="row"
            justifyContent="space-between"
            alignItems="center"
          >
            <Typography style={{ fontWeight: 700 }}>Teams</Typography>
            <IconButton size="small">
              <Add />
            </IconButton>
          </Stack>
        </ListSubheader>
        {user.teams.map((team) => (
          <ListItem key={team!.id} disablePadding>
            <ListItemButton
              component={ThemedNavLink}
              to={routeMap.team.replace(":id", team!.id)}
            >
              <ListItemText
                primary={team!.name}
                primaryTypographyProps={{
                  noWrap: true,
                  style: {
                    fontWeight: 600,
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

  return (
    <Box sx={{ display: "flex" }}>
      <ElevationScroll>
        <AppBar
          enableColorOnDark
          sx={{
            width: { sm: `calc(100% - ${drawerWidth}px)` },
            ml: { sm: `${drawerWidth}px` },
          }}
        >
          <Container maxWidth="xl">
            <Toolbar disableGutters>
              <IconButton
                color="inherit"
                aria-label="open drawer"
                edge="start"
                onClick={handleDrawerToggle}
                sx={{ mr: 1, display: { sm: "none" } }}
              >
                <MenuIcon />
              </IconButton>
              <Box display="flex" flexGrow={1} />
              <Box>
                <Tooltip title="Open settings">
                  <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                    <Avatar
                      alt={user.fullName}
                      src={user.picture}
                      sx={{ width: 32, height: 32 }}
                    />
                  </IconButton>
                </Tooltip>
                <Menu
                  sx={{ mt: "45px" }}
                  id="menu-appbar"
                  anchorEl={anchorElUser}
                  anchorOrigin={{
                    vertical: "top",
                    horizontal: "right",
                  }}
                  keepMounted
                  transformOrigin={{
                    vertical: "top",
                    horizontal: "right",
                  }}
                  open={Boolean(anchorElUser)}
                  onClose={handleCloseUserMenu}
                >
                  {settings.map((setting) => (
                    <MenuItem key={setting} onClick={handleCloseUserMenu}>
                      <Typography textAlign="center">{setting}</Typography>
                    </MenuItem>
                  ))}
                  <MenuItem onClick={logout}>
                    <Typography textAlign="center">Logout</Typography>
                  </MenuItem>
                </Menu>
              </Box>
            </Toolbar>
          </Container>
        </AppBar>
      </ElevationScroll>
      <Toolbar />
      <Box
        component="nav"
        sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}
        aria-label="mailbox folders"
      >
        {/* The implementation can be swapped with js to avoid SEO duplication of links. */}
        <Drawer
          variant="temporary"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{
            keepMounted: true, // Better open performance on mobile.
          }}
          sx={{
            display: { xs: "block", sm: "none" },
            "& .MuiDrawer-paper": {
              boxSizing: "border-box",
              width: drawerWidth,
            },
          }}
        >
          {drawer}
        </Drawer>
        <Drawer
          variant="permanent"
          sx={{
            display: { xs: "none", sm: "block" },
            "& .MuiDrawer-paper": {
              boxSizing: "border-box",
              width: drawerWidth,
            },
          }}
          open
        >
          {drawer}
        </Drawer>
      </Box>
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          p: 3,
          width: { sm: `calc(100% - ${drawerWidth}px)` },
        }}
      >
        <Toolbar />
        <Outlet />
      </Box>
    </Box>
  );
}
export default NavBar;
