import writings from "../content/writings.generated.json";

/**
 * Yazılar `src/content/writings/` klasöründeki markdown dosyalarından
 * `scripts/build-writings.js` ile üretilir. Burada sadece okuma yapılır.
 */

const allWritings = Array.isArray(writings) ? writings : [];

export function getAllWritings() {
  return allWritings;
}

export function getWritingBySlug(slug) {
  return allWritings.find((writing) => writing.slug === slug);
}

export function getWritingNeighbours(slug) {
  const index = allWritings.findIndex((writing) => writing.slug === slug);
  if (index === -1) return { previous: null, next: null };
  return {
    previous: allWritings[index - 1] || null,
    next: allWritings[index + 1] || null,
  };
}

export function formatDate(value) {
  const date = new Date(`${value}T00:00:00`);
  if (Number.isNaN(date.getTime())) return value;
  return date.toLocaleDateString("tr-TR", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}
