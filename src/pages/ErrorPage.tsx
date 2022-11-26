import { Box, Typography, Stack } from "@mui/material";
import { useRouteError } from "react-router-dom";
import Header from "src/components/Header";

export default function ErrorPage() {
  const error = useRouteError() as Error;
  return (
    <Box height="100vh" display="flex" flexGrow={1} flexDirection="column">
      <Header />
      <Stack
        flexGrow={1}
        justifyContent="center"
        alignItems="center"
        spacing={4}
      >
        <Typography variant="h3">
          Sorry, an unexpected error has occurred.
        </Typography>
        <Typography>{error.message || (error as any).statusText}</Typography>
      </Stack>
    </Box>
  );
}
