/** Returns the target value when active — no counting animation (performance). */
export function useCountUp(
  target: number,
  active: boolean,
  _options?: { duration?: number; decimals?: number },
) {
  return active ? target : 0;
}
