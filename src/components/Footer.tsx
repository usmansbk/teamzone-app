import { Box, Stack, Typography, Button } from "@mui/material";
import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <Box py={4} display="flex" justifyContent="center">
      <Stack justifyContent="center" alignItems="center" spacing={1}>
        <Typography variant="caption">
          &copy; {new Date().getFullYear()} Teamzone
        </Typography>
        <Stack
          direction="row"
          spacing={2}
          alignItems="center"
          justifyContent="center"
          flexWrap="wrap"
        >
          <Button
            href="https://github.com/usmansbk"
            target="_blank"
            rel="noreferrer"
            size="small"
          >
            GitHub
          </Button>
          <Button href="#privacy" size="small" component={Link} to="terms">
            Terms & Privacy
          </Button>
        </Stack>
      </Stack>
    </Box>
  );
}
