import { useCallback, useEffect, useRef, useState } from "react";
import { getCurrentDateTime } from "src/utils/dateTime";

export default function useTime() {
  const [dateTime, setDateTime] = useState(getCurrentDateTime());
  const timerRef = useRef<NodeJS.Timeout>();

  const timer = useCallback(() => {
    const tick = () => {
      if (timerRef.current) {
        clearTimeout(timerRef.current);
      }
      setDateTime(getCurrentDateTime());
      timerRef.current = setTimeout(tick, 1000 - new Date().getMilliseconds());
    };

    timerRef.current = setTimeout(tick, 1000 - new Date().getMilliseconds());
  }, []);

  useEffect(() => {
    timer();

    return () => {
      if (timerRef.current) {
        clearTimeout(timerRef.current);
      }
    };
  }, []);

  return {
    dateTime,
  };
}
