import { Box, Button, Typography } from "@mui/material";
import { useCallback, useState } from "react";
import NewTeamDialog from "src/components/NewTeamDialog";
import useMe from "src/hooks/api/useMe";

export default function Dashboard() {
  const [openTeamForm, setOpenTeamForm] = useState(false);
  const { data } = useMe();

  const { tzData } = data!;

  const closeTeamForm = useCallback(() => setOpenTeamForm(false), []);

  return (
    <Box px={3} display="flex" flexDirection="column" flexGrow={1}>
      <Box>
        <Button size="large" onClick={() => setOpenTeamForm(true)}>
          Create new Team
        </Button>
      </Box>
      <Typography variant="h4" sx={{ fontWeight: 400 }}>
        Time in <span style={{ fontWeight: 900 }}>{tzData?.countryName}</span>{" "}
        now
      </Typography>
      <NewTeamDialog open={openTeamForm} onClose={closeTeamForm} />
    </Box>
  );
}
