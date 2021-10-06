export function getMeasure(size: number | string) {
  const measure = size.toString().match(/[a-zA-Z]+$/g);
  if (!measure) return "";
  return measure[0];
}

export function getValue(size: number | string) {
  const value = size.toString().replaceAll(/[^0-9.]/g, "");
  return +value;
}
