import { Box, Typography, useTheme } from "@mui/material";

interface Props {
  time: string;
  date: string;
}

export default function BigClock({ time, date }: Props) {
  const theme = useTheme();
  return (
    <Box textAlign="end">
      <Typography
        variant="h1"
        fontFamily="Azeret Mono"
        sx={{
          [theme.breakpoints.up("lg")]: {
            fontSize: 230,
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
