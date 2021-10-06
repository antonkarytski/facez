export function replaceKey<
  S extends object,
  Search extends keyof S,
  R extends string
>(
  source: S,
  search: Search,
  replacement: string
): (Omit<S, Search> & { [key in R]: S[Search] }) | S {
  if (!(search in source)) return source;
  const copy = { ...source };
  //@ts-ignore
  copy[replacement] = copy[search] as any;
  delete copy[search];
  return copy;
}

export function replaceKeys<S extends object, Search extends keyof S>(
  source: S,
  map: { [key in Search]: string }
): S {
  //@ts-ignore
  return Object.entries(map).reduce((acc, [key, newKey]) => {
    return replaceKey(acc, key as Search, newKey as string);
  }, source);
}
