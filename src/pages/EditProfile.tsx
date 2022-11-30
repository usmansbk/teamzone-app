import { Box, TextField, Stack, Grid, Typography, Button } from "@mui/material";

export default function EditProfile() {
  return (
    <Box>
      <Grid container justifyContent="center">
        <Grid item xs={12} md={6}>
          <Stack spacing={2}>
            <Typography variant="h6">User</Typography>
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
