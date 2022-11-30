import { Box, TextField, Stack, Grid, Button, Avatar } from "@mui/material";
import useMe from "src/hooks/api/useMe";

export default function EditProfile() {
  const { data } = useMe();

  const { picture, fullName } = data!;
  return (
    <Box>
      <Grid container justifyContent="center">
        <Grid item xs={12} md={6}>
          <Stack spacing={2}>
            <Avatar src={picture} alt={fullName} />
            <TextField label="First name" />
            <TextField label="Last name" />
            <Button variant="contained" size="large">
              Save Profile Information
            </Button>
          </Stack>
        </Grid>
      </Grid>
    </Box>
  );
}
