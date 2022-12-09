import { Typography, Stack, Box, Button } from "@mui/material";
import { useRouteError, Link } from "react-router-dom";
import routeMap from "src/routeMap";

export default function ErrorPage() {
  const error = useRouteError() as Error;
  return (
    <Box
      height="100vh"
      display="flex"
      flexGrow={1}
      justifyContent="center"
      alignItems="center"
      p={2}
      textAlign="center"
    >
      <Stack spacing={4} justifyContent="center" alignItems="center">
        <Typography variant="h3">
          Sorry, an unexpected error has occurred.
        </Typography>
        <Typography>{error.message || (error as any).statusText}</Typography>
        <Button component={Link} to={routeMap.home}>
          Go back home
        </Button>
      </Stack>
    </Box>
  );
}
