import { Box, Stack, Link, Typography } from "@mui/material";

export default function Footer() {
  return (
    <Box py={4} display="flex" justifyContent="center">
      <Stack justifyContent="center" alignItems="center">
        <Typography variant="caption">
          &copy; {new Date().getFullYear()} Teamzone
        </Typography>
        <Stack
          direction="row"
          spacing={2}
          alignItems="center"
          justifyContent="center"
        >
          <Link href="https://github.com/usmansbk" target="_blank">
            <Typography variant="caption">GitHub</Typography>
          </Link>
          <Link href="#privacy">
            <Typography variant="caption">Privacy Policy</Typography>
          </Link>
          <Link href="#privacy">
            <Typography variant="caption">Terms of use</Typography>
          </Link>
        </Stack>
      </Stack>
    </Box>
  );
}
