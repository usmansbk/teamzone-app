import { Box, Typography, useTheme } from "@mui/material";

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
      <Typography variant="h3" lineHeight={1}>
        {time}
      </Typography>
      <Typography>{name.replaceAll("_", " ")}</Typography>
      {!!date && <Typography variant="body2">{date}</Typography>}
    </Box>
  );
}
