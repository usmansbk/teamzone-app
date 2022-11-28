import { Button, Toolbar, Typography } from "@mui/material";
import { useCallback } from "react";
import { tokenVar } from "src/graphql/vars";
import NavBar from "./NavBar";

export default function Dashboard() {
  const logout = useCallback(() => {
    tokenVar(null);
    localStorage.removeItem("token");
  }, []);

  return (
    <>
      <NavBar />
      <Typography>Dashboard</Typography>
      <Toolbar />
      <Button onClick={logout}>Logout</Button>
    </>
  );
}
