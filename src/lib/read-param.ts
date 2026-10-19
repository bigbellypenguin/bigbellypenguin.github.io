export function readParam(
  value: string | string[] | undefined,
): string | undefined {
  if (typeof value === "string" && value.length > 0) return value;
  if (Array.isArray(value)) {
    const first = value[0];
    if (typeof first === "string" && first.length > 0) return first;
  }
  return undefined;
}
