import { Box, Stack, Typography, useTheme } from "@mui/material";
import { getLocalDate, getLocalTime } from "src/utils/dateTime";
import { User } from "src/__generated__/graphql";

interface Props {
  tz: User["tzData"];
}

export default function Clock({ tz }: Props) {
  const { palette } = useTheme();
  const { countryName, name, countryCode } = tz!;
  const country = countryCode.toLowerCase();

  return (
    <Box
      sx={{
        background:
          palette.mode === "dark" ? palette.grey["800"] : palette.grey["100"],
        p: 2,
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
      <Typography>{getLocalTime(name)}</Typography>
      <Typography>{getLocalDate(name, "LL")}</Typography>
    </Box>
  );
}
