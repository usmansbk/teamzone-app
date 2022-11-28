import { Box, Stack, Typography } from "@mui/material";

export default function Terms() {
  return (
    <Stack flexGrow={1} spacing={4}>
      <Box>
        <Typography variant="h4">Terms of use</Typography>
        <Typography>
          We do our best to ensure information accuracy but errors may still
          occur. Therefore the content of this site is provided on "as is"
          basis. Teamzone and it's owners cannot be held liable for any errors
          or inaccuracies
        </Typography>
      </Box>
      <Box>
        <Typography variant="h4">Privacy policy</Typography>
        <Typography>
          If you choose to sign up for an account with us the only data-point we
          collect and store is your name and email address so that you can join
          or create your teams. Your information is never sold or disclosed to
          any 3rd party. For any mass email communication (i.e. newsletter)
          there will be an opt-out option. To request deletion of your account
          (and all of the data associated with it), please use the contact us
          form.
        </Typography>
      </Box>
    </Stack>
  );
}
