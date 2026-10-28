/**
 * Yazıya göre deterministik renk paleti üretir. Kapak görseli olmayan
 * yazılarda tutarlı ve hoş görünen gradyanlar elde etmek için kullanılır.
 */

const HUES = [24, 199, 262, 339, 160, 45, 12, 215];

export function hashString(value) {
  const text = String(value || "");
  let hash = 0;
  for (let index = 0; index < text.length; index += 1) {
    hash = (hash << 5) - hash + text.charCodeAt(index);
    hash |= 0;
  }
  return Math.abs(hash);
}

export function paletteFor(seed) {
  const hue = HUES[hashString(seed) % HUES.length];
  return {
    hue,
    from: `hsl(${hue} 62% 56%)`,
    to: `hsl(${(hue + 46) % 360} 58% 34%)`,
    ink: `hsl(${hue} 70% 22%)`,
    soft: `hsl(${hue} 64% 94%)`,
    css: `linear-gradient(135deg, hsl(${hue} 62% 56%) 0%, hsl(${(hue + 46) % 360} 58% 34%) 100%)`,
  };
}

export function initialsFor(title) {
  return String(title || "")
    .trim()
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((word) => word[0])
    .join("")
    .toLocaleUpperCase("tr");
}
