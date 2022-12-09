import { useCallback, useEffect, useState } from "react";
import { getCurrentDateTime } from "src/utils/dateTime";

export default function useTime() {
  const [dateTime, setDateTime] = useState(getCurrentDateTime());

  const timer = useCallback(() => {
    let clearId: NodeJS.Timeout;

    const tick = () => {
      if (clearId) {
        clearTimeout(clearId);
      }
      setDateTime(getCurrentDateTime());
      clearId = setTimeout(tick, 1000 - new Date().getMilliseconds());
    };

    clearId = setTimeout(tick, 1000 - new Date().getMilliseconds());
  }, []);

  useEffect(() => {
    const handle = requestAnimationFrame(timer);

    return () => cancelAnimationFrame(handle);
  }, []);

  return {
    dateTime,
  };
}
