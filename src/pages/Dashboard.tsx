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
      <Typography variant="h4" sx={{ display: "inline", fontWeight: 400 }}>
        Time in{" "}
        <Typography variant="h4" sx={{ display: "inline", fontWeight: 900 }}>
          {tzData?.countryName}
        </Typography>{" "}
        now
      </Typography>
      <NewTeamDialog open={openTeamForm} onClose={closeTeamForm} />
    </Box>
  );
}
