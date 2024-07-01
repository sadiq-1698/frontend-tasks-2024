import { useEffect, useState } from "react";

const useProgress = () => {
  const [value, setValue] = useState(0);

  useEffect(() => {
    const timeout = setTimeout(() => {
      setValue((prev) => (prev < 100 ? prev + 1 : prev));
    }, 100);

    return () => clearTimeout(timeout);
  }, [value]);

  return value;
};

export default useProgress;
