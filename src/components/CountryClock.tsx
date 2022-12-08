import { Box, Stack, Typography, useTheme } from "@mui/material";

interface Props {
  time: string;
  date?: string;
  countryName: string;
  countryCode: string;
}

export default function CountryClock({
  time,
  date,
  countryName,
  countryCode,
}: Props) {
  const { palette } = useTheme();
  const country = countryCode.toLowerCase();

  return (
    <Box
      sx={{
        background:
          palette.mode === "dark" ? palette.grey["800"] : palette.grey["100"],
        px: 2,
        py: 1,
        width: "fit-content",
        textAlign: "end",
      }}
    >
      <Stack
        direction="row"
        sx={{ alignItems: "center", justifyContent: "flex-end" }}
        spacing={1}
      >
        <img
          src={`https://flagcdn.com/24x16/${country}.png`}
          srcSet={`https://flagcdn.com/32x24/${country}.png 2x, https://flagcdn.com/48x36/${country}.png 3x`}
          width="24"
          height="16"
          alt={countryName}
        />
        <Typography variant="h6">{countryName}</Typography>
      </Stack>
      <Typography variant="subtitle1">{time}</Typography>
      {!!date && <Typography>{date}</Typography>}
    </Box>
  );
}
