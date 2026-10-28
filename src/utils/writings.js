import writings from "../content/writings.generated.json";
import { formatDate, readingTimeOf } from "./text";

/**
 * Yazılar `src/content/writings/` klasöründeki markdown dosyalarından
 * `scripts/build-writings.js` ile üretilir. Burada sadece okuma yapılır.
 */

const allWritings = (Array.isArray(writings) ? writings : []).map((post) => ({
  ...post,
  readingTime: post.readingTime || readingTimeOf(post.content),
}));

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

export function getAllTags() {
  const tags = new Map();
  allWritings.forEach((writing) => {
    writing.tags.forEach((tag) => {
      tags.set(tag, (tags.get(tag) || 0) + 1);
    });
  });
  return Array.from(tags.entries())
    .sort((a, b) => b[1] - a[1] || a[0].localeCompare(b[0], "tr"))
    .map(([name, count]) => ({ name, count }));
}

export function postUrl(post) {
  return `https://huseyinafsin.github.io/writings/${post.slug}`;
}

export { formatDate };
