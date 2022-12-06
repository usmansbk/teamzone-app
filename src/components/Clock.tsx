import { Box, Typography, useTheme } from "@mui/material";
import { getLocalDate, getLocalTime } from "src/utils/dateTime";
import { User } from "src/__generated__/graphql";

interface Props {
  tz: User["tzData"];
}

export default function Clock({ tz }: Props) {
  const { palette } = useTheme();
  const { countryName, name } = tz!;

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
      <Typography variant="h6">{countryName}</Typography>
      <Typography>{getLocalTime(name)}</Typography>
      <Typography>{getLocalDate(name, "LL")}</Typography>
    </Box>
  );
}
