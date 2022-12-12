import { Box, Typography, useTheme } from "@mui/material";

interface Props {
  time: string;
  date?: string;
  city: string;
  countryName: string;
}

export default function TimezoneClock({
  city,
  time,
  date,
  countryName,
}: Props) {
  const { palette } = useTheme();

  return (
    <Box
      sx={{
        background:
          palette.mode === "dark" ? palette.grey["800"] : palette.grey["100"],
        px: 2,
        py: 1,
        textAlign: "end",
      }}
    >
      <Typography variant="h6">{city}</Typography>
      <Typography variant="h4" lineHeight={1} fontWeight={900}>
        {time}
      </Typography>
      {!!date && <Typography variant="body2">{date}</Typography>}
      <Typography>{countryName}</Typography>
    </Box>
  );
}
