import { Box, Typography, useTheme } from "@mui/material";

interface Props {
  time: string;
  date: string;
}

export default function BigClock({ time, date }: Props) {
  const theme = useTheme();
  return (
    <Box>
      <Typography
        variant="h1"
        sx={{
          lineHeight: 1,
          [theme.breakpoints.up("lg")]: {
            fontSize: 280,
          },
        }}
      >
        {time}
      </Typography>
      <Typography variant="h4" fontWeight={500}>
        {date}
      </Typography>
    </Box>
  );
}
