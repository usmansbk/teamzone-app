import { Box, Typography, Stack, Grid, Container } from "@mui/material";
import Footer from "src/components/Footer";
import Header from "src/components/Header";

export default function PageNotFound() {
  return (
    <Container fixed>
      <Box height="100vh" display="flex" flexGrow={1} flexDirection="column">
        <Header />
        <Grid
          container
          sx={{ flexGrow: 1 }}
          justifyContent="center"
          alignItems="center"
        >
          <Grid flexGrow={1} xs={12} md={8}>
            <Stack spacing={4}>
              <Typography variant="h2">Oops!</Typography>
              <Typography variant="h3">
                We can't seem to find the page you're looking for.
              </Typography>
            </Stack>
          </Grid>
        </Grid>
        <Footer />
      </Box>
    </Container>
  );
}
