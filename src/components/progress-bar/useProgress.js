import { useEffect, useState } from "react";

const useProgress = () => {
  const [value, setValue] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setValue((prev) => (prev < 100 ? prev + 1 : prev));
    }, 100);

    if (value >= 100) clearInterval(interval);

    return () => clearInterval(interval);
  }, [value]);

  return value;
};

export default useProgress;
