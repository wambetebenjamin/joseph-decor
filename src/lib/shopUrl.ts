export type QueryMap = Record<string, string | string[] | undefined>;

export function normaliseQuery(query: QueryMap): Record<string, string> {
  const result: Record<string, string> = {};
  Object.entries(query).forEach(([key, value]) => {
    if (typeof value === "string" && value.length > 0) result[key] = value;
  });
  return result;
}

export function shopHref(
  current: Record<string, string>,
  overrides: Record<string, string | undefined>,
): string {
  const params = new URLSearchParams();
  const merged = { ...current, ...overrides };
  Object.entries(merged).forEach(([key, value]) => {
    if (value !== undefined && value !== "") params.set(key, value);
  });
  const query = params.toString();
  return query ? `/shop?${query}` : "/shop";
}
