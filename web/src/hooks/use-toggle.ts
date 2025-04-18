import { useCallback, useState } from "react";

export const useToggle = (initialValue: boolean = false) => {
  const [isToggled, setIsToggled] = useState(initialValue);

  const onToggle = useCallback(() => {
    setIsToggled((prev) => !prev);
  }, []);

  return [isToggled, onToggle] as const;
};
