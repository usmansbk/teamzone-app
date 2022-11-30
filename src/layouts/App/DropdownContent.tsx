import {
  Avatar,
  Box,
  Divider,
  Grid,
  ListItem,
  ListItemButton,
  ListItemText,
  Typography,
} from "@mui/material";
import { Link } from "react-router-dom";
import { useLogout } from "src/hooks/useAuth";
import { User } from "src/__generated__/graphql";

interface Props {
  user: Partial<User>;
}
export default function DropdownContent({ user }: Props) {
  const logout = useLogout();

  return (
    <Box maxWidth={300}>
      <Link to="/" style={{ textDecoration: "none", color: "inherit" }}>
        <Grid p={2} container spacing={1} flexWrap="nowrap">
          <Grid item xs="auto">
            <Avatar alt={user.fullName} src={user.picture} />
          </Grid>
          <Grid item zeroMinWidth>
            <Typography sx={{ fontWeight: 700 }} noWrap>
              {user.fullName}
            </Typography>
            <Typography variant="caption">{user.email}</Typography>
          </Grid>
        </Grid>
      </Link>
      <Divider />
      <ListItem disablePadding>
        <ListItemButton onClick={logout}>
          <ListItemText
            primary="Sign out"
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
    </Box>
  );
}
