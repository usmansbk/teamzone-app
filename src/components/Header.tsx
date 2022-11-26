import { Typography } from "@mui/material";
import { Link } from "react-router-dom";

export default function Header() {
  return (
    <Typography
      variant="h1"
      color="primary"
      component={Link}
      to="/"
      style={{ textDecoration: "none" }}
    >
      Teamzone
    </Typography>
  );
}
