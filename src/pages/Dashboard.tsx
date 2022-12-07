import { Box, Button, Typography } from "@mui/material";
import { useCallback, useState } from "react";
import NewTeamDialog from "src/components/NewTeamDialog";

export default function Dashboard() {
  const [openTeamForm, setOpenTeamForm] = useState(false);

  const closeTeamForm = useCallback(() => setOpenTeamForm(false), []);

  return (
    <Box px={3}>
      <Box mb={2}>
        <Button
          variant="contained"
          size="large"
          onClick={() => setOpenTeamForm(true)}
        >
          Create new Team
        </Button>
      </Box>
      <Box>
        <Typography>Time in Nigeria now</Typography>
      </Box>
      <NewTeamDialog open={openTeamForm} onClose={closeTeamForm} />
    </Box>
  );
}
