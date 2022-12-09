import {
  useState,
  useCallback,
  cloneElement,
  ReactElement,
  useMemo,
} from "react";
import {
  useScrollTrigger,
  Avatar,
  Container,
  IconButton,
  Toolbar,
  Box,
  AppBar,
  Drawer,
  Popover,
  Button,
} from "@mui/material";
import { Outlet } from "react-router-dom";
import { Menu as MenuIcon } from "@mui/icons-material";
import NewTeamDialog from "src/components/NewTeamDialog";
import { User } from "src/__generated__/graphql";
import ThemeButton from "src/components/ThemeButton";
import DropdownContent from "./DropdownContent";
import DrawerContent from "./DrawerContent";

interface ElevationScrollProps {
  children: ReactElement;
}

const drawerWidth = 240;

function ElevationScroll(props: ElevationScrollProps) {
  const { children } = props;
  const trigger = useScrollTrigger({
    disableHysteresis: true,
    threshold: 0,
  });

  return cloneElement(children, {
    elevation: trigger ? 1 : 0,
  });
}

interface Props {
  user: User;
}

function Layout({ user }: Props) {
  const [openTeamForm, setOpenTeamForm] = useState(false);

  const closeTeamForm = useCallback(() => setOpenTeamForm(false), []);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [anchorElUser, setAnchorElUser] = useState<null | HTMLElement>(null);

  const handleOpenUserMenu = useCallback(
    (event: React.MouseEvent<HTMLElement>) => {
      setAnchorElUser(event.currentTarget);
    },
    []
  );

  const handleCloseUserMenu = useCallback(() => {
    setAnchorElUser(null);
  }, []);

  const handleDrawerToggle = useCallback(() => {
    setMobileOpen((prev) => !prev);
  }, []);

  const drawer = useMemo(
    () => <DrawerContent teams={user.teams as any} />,
    [user.teams, handleDrawerToggle]
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
                edge="start"
                color="inherit"
                aria-label="open drawer"
                onClick={handleDrawerToggle}
                sx={{ mr: 1, display: { sm: "none" } }}
              >
                <MenuIcon />
              </IconButton>
              <Box display="flex" flexGrow={1}>
                <Button
                  variant="contained"
                  size="small"
                  onClick={() => setOpenTeamForm(true)}
                >
                  Create new Team
                </Button>
              </Box>
              <ThemeButton />
              <Box>
                <IconButton edge="end" onClick={handleOpenUserMenu}>
                  <Avatar
                    alt={user.fullName}
                    src={user.picture}
                    sx={{ width: 30, height: 30 }}
                  />
                </IconButton>
                <Popover
                  id="menu-appbar"
                  anchorEl={anchorElUser}
                  anchorOrigin={{
                    vertical: "bottom",
                    horizontal: "right",
                  }}
                  open={Boolean(anchorElUser)}
                  onClose={handleCloseUserMenu}
                  transformOrigin={{
                    vertical: "top",
                    horizontal: "right",
                  }}
                  keepMounted
                >
                  <DropdownContent user={user} />
                </Popover>
              </Box>
            </Toolbar>
          </Container>
        </AppBar>
      </ElevationScroll>
      <Box
        component="nav"
        sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}
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
          width: { sm: `calc(100% - ${drawerWidth}px)` },
        }}
      >
        <Toolbar disableGutters />
        <Outlet />
        <NewTeamDialog open={openTeamForm} onClose={closeTeamForm} />
      </Box>
    </Box>
  );
}
export default Layout;
