import { Box, Typography, useTheme } from "@mui/material";
import formatTimezoneName from "src/utils/formatTimezoneName";

interface Props {
  time: string;
  date?: string;
  countryName: string;
  name: string;
}

export default function CountryClock({ name, time, date, countryName }: Props) {
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
      <Typography variant="h4">{countryName}</Typography>
      <Typography
        variant="h3"
        lineHeight={1}
        fontFamily="Azeret Mono"
        fontWeight={900}
      >
        {time}
      </Typography>
      <Typography>{formatTimezoneName(name)}</Typography>
      {!!date && <Typography variant="body2">{date}</Typography>}
    </Box>
  );
}
