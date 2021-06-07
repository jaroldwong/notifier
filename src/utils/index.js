export function string_to_slug(string) {
  return string.toLowerCase().replace(/\s+/g, '-');
}
