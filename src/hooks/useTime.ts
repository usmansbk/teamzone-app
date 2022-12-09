import { useEffect, useState } from "react";
import { getCurrentDateTime } from "src/utils/dateTime";

export default function useTime() {
  const [dateTime, setDateTime] = useState(getCurrentDateTime());

  useEffect(() => {
    const ticker = setTimeout(() => {
      setDateTime(dateTime.add(1, "second"));
    }, 1000 - new Date().getMilliseconds());

    return () => clearTimeout(ticker);
  }, [dateTime]);

  return {
    dateTime,
  };
}
