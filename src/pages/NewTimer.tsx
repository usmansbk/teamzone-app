import { Box } from "@mui/material";
import CountdownForm from "src/components/TimerForm";

export default function NewTimer() {
  return (
    <Box p={2}>
      <CountdownForm title="New Timer" />
    </Box>
  );
}
