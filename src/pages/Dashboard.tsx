import { Box, Typography } from "@mui/material";
import useMe from "src/hooks/api/useMe";
import { getLocalTime } from "src/utils/dateTime";

export default function Dashboard() {
  const { data } = useMe();
  const { tzData } = data!;
  const { countryName, name } = tzData!;
  return (
    <Box p={3}>
      <Typography variant="h4" sx={{ fontWeight: 400 }}>
        Time in <span style={{ fontWeight: 900 }}>{countryName}</span> now
      </Typography>
      <Typography variant="h1">{getLocalTime(name)}</Typography>
    </Box>
  );
}
