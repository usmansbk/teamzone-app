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
} from "@mui/material";
import { Link } from "react-router-dom";
import routeMap from "src/routeMap";
import { tokenVar } from "src/graphql/vars";
import { User } from "src/__generated__/graphql";

interface ElevationScrollProps {
  children: React.ReactElement;
}

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
  user: Partial<User>;
}

function NavBar({ user }: Props) {
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

  return (
    <>
      <ElevationScroll>
        <AppBar enableColorOnDark>
          <Container maxWidth="xl">
            <Toolbar disableGutters>
              <Typography
                color="primary"
                variant="h6"
                noWrap
                component={Link}
                to={routeMap.home}
                sx={{
                  fontWeight: 900,
                  textDecoration: "none",
                }}
              >
                Teamzone
              </Typography>
              <Box display="flex" flexGrow={1} />
              <Box>
                <Tooltip title="Open settings">
                  <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                    <Avatar alt={user.fullName} src={user.picture} />
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
    </>
  );
}
export default NavBar;
