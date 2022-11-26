import { Typography, Stack } from "@mui/material";
import { useRouteError } from "react-router-dom";

export default function ErrorPage() {
  const error = useRouteError() as Error;
  return (
    <Stack flexGrow={1} justifyContent="center" alignItems="center" spacing={4}>
      <Typography variant="h3">
        Sorry, an unexpected error has occurred.
      </Typography>
      <Typography>{error.message || (error as any).statusText}</Typography>
    </Stack>
  );
}
