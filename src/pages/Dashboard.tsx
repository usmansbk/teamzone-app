import { Box, Button, Typography } from "@mui/material";
import { useCallback } from "react";
import { tokenVar } from "src/graphql/vars";

export default function Dashboard() {
  const logout = useCallback(() => {
    tokenVar(null);
    localStorage.removeItem("token");
  }, []);

  return (
    <Box>
      <Typography>Dashboard</Typography>
      <Button onClick={logout}>Logout</Button>
    </Box>
  );
}
