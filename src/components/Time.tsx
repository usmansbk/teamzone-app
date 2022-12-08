import { Typography, TypographyProps } from "@mui/material";
import useTime from "src/hooks/useTime";

interface Props extends TypographyProps {
  timezone: string;
}

export default function Time({ timezone, ...rest }: Props) {
  const { dateTime } = useTime();

  return (
    <Typography {...rest}>
      {dateTime.tz(timezone).format("HH:mm:ss")}
    </Typography>
  );
}
