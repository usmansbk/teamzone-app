import { Typography, Stack, Grid } from "@mui/material";

export default function PageNotFound() {
  return (
    <Grid
      container
      sx={{ flexGrow: 1 }}
      justifyContent="center"
      alignItems="center"
    >
      <Grid item flexGrow={1} xs={12} md={8}>
        <Stack spacing={4}>
          <Typography variant="h2">Oops!</Typography>
          <Typography variant="h3">
            We can't seem to find the page you're looking for.
          </Typography>
        </Stack>
      </Grid>
    </Grid>
  );
}
