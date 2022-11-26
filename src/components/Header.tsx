import { Typography } from "@mui/material";
import { Link } from "react-router-dom";
import routeMap from "src/routeMap";

export default function Header() {
  return (
    <Typography
      variant="h1"
      color="primary"
      component={Link}
      to={routeMap.home}
      style={{ textDecoration: "none" }}
    >
      Teamzone
    </Typography>
  );
}
