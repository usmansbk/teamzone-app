import { Typography, TypographyProps } from "@mui/material";
import { useEffect, useState } from "react";
import { getRawLocalTime } from "src/utils/dateTime";

interface Props extends TypographyProps {
  timezone: string;
}

export default function Time({ timezone, ...rest }: Props) {
  const [time, setTime] = useState(getRawLocalTime(timezone));

  useEffect(() => {
    const interval = setInterval(() => {
      setTime(time.add(1, "second"));
    }, 1000 - new Date().getMilliseconds());

    return () => clearInterval(interval);
  }, [time]);

  return <Typography {...rest}>{time.format("HH:mm:ss")}</Typography>;
}
