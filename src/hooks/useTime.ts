import { useEffect, useState } from "react";
import { getCurrentDateTime } from "src/utils/dateTime";

export default function useTime() {
  const [dateTime, setDateTime] = useState(getCurrentDateTime());

  useEffect(() => {
    const ticker = setInterval(() => {
      setDateTime(dateTime.add(1, "second"));
    }, 1000 - new Date().getMilliseconds());

    return () => clearInterval(ticker);
  }, [dateTime]);

  return {
    dateTime,
  };
}
