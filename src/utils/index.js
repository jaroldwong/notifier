export function string_to_slug(string) {
  return string.toLowerCase().replace(/\s+/g, '-');
}

export function capitalize(string) {
  return string
    .split(' ')
    .map(
      (word) => word.charAt(0).toUpperCase() + word.substring(1).toLowerCase()
    )
    .join(' ');
}

export async function post(url, body) {
  return await fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(body),
  });
}
