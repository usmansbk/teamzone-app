import { Box, Typography } from "@mui/material";
import { Outlet } from "react-router-dom";

export default function Settings() {
  return (
    <Box>
      <Typography>Settings</Typography>
      <Outlet />
    </Box>
  );
}
