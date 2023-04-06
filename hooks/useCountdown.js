import { useState, useEffect } from "react";

export default function useCountdown(initialTime) {
  const [time, setTime] = useState(initialTime);

  useEffect(() => {
    const timer =
      time > 0 &&
      setInterval(() => {
        setTime(time - 1);
      }, 1000);

    return () => clearInterval(timer);
  }, [time]);

  const resetTimer = () => {
    setTime(initialTime);
  };

  return [time, resetTimer];
}
