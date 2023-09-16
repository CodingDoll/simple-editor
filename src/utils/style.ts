import { isNumber } from "./check";

export const toCSSUnit = (v?: string | number) => {
  if (v === undefined) return "0";
  if (!isNumber(v)) return v;
  return `${v}px`;
};
