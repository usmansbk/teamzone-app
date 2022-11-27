import { Button, Grid, Stack, TextField, Box } from "@mui/material";

export default function ContactUsForm() {
  return (
    <form method="POST" action="https://formspree.io/f/xpzneyaw">
      <Grid container>
        <Grid item xs={12} md={6}>
          <Stack spacing={1}>
            <TextField
              autoComplete="off"
              name="subject"
              label="Subject"
              fullWidth
            />
            <TextField
              label="Message (required)"
              required
              fullWidth
              multiline
              name="message"
            />
            <TextField
              required
              label="Your email address (will not be shared)"
              fullWidth
              name="email"
              type="email"
            />
            <Box>
              <Button type="submit" variant="contained">
                Send message
              </Button>
            </Box>
          </Stack>
        </Grid>
      </Grid>
    </form>
  );
}
