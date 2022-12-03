import { Box, Button } from "@mui/material";
import { useCallback, useState } from "react";
import NewTeamDialog from "src/components/NewTeamDialog";

export default function Dashboard() {
  const [openTeamForm, setOpenTeamForm] = useState(false);

  const closeTeamForm = useCallback(() => setOpenTeamForm(false), []);

  return (
    <Box px={3} display="flex" flexDirection="column" flexGrow={1}>
      <Box pb={1}>
        <Button
          variant="contained"
          size="large"
          onClick={() => setOpenTeamForm(true)}
        >
          Create new Team
        </Button>
      </Box>
      <NewTeamDialog open={openTeamForm} onClose={closeTeamForm} />
    </Box>
  );
}
