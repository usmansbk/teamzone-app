import { Box } from "@mui/material";
import { Outlet } from "react-router-dom";

export default function MeetingsLayout() {
  return (
    <Box p={3} pt={0}>
      <Outlet />
    </Box>
  );
}
