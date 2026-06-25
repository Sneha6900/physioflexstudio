import { animate } from "motion/react";
import { useEffect, useState } from "react";

export function useCountUp(
  target: number,
  active: boolean,
  { duration = 1.4, decimals = 0 }: { duration?: number; decimals?: number } = {},
) {
  const [value, setValue] = useState(0);

  useEffect(() => {
    if (!active) return;
    const controls = animate(0, target, {
      duration,
      ease: [0.22, 1, 0.36, 1],
      onUpdate: (v) => {
        const factor = 10 ** decimals;
        setValue(Math.round(v * factor) / factor);
      },
    });
    return () => controls.stop();
  }, [active, target, duration, decimals]);

  return value;
}
