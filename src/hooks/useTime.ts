import { useCallback, useEffect, useState } from "react";
import { getCurrentDateTime } from "src/utils/dateTime";

export default function useTime() {
  const [dateTime, setDateTime] = useState(getCurrentDateTime());

  const timer = useCallback(() => {
    let time = dateTime;
    let clearId: NodeJS.Timeout;

    const tick = () => {
      if (clearId) {
        clearTimeout(clearId);
      }
      time = time.add(1, "second");
      setDateTime(time);
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
