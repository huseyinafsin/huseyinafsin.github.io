/** Başlık metnini URL/çapa uyumlu hâle getirir. */
export function slugifyHeading(text) {
  return String(text || "")
    .toLowerCase()
    .replace(/[çğıöşü]/g, (char) => {
      const map = { ç: "c", ğ: "g", ı: "i", ö: "o", ş: "s", ü: "u" };
      return map[char];
    })
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

export function slugify(text) {
  return slugifyHeading(text);
}

export function formatDate(value, locale = "tr-TR") {
  const date = new Date(`${value}T00:00:00`);
  if (Number.isNaN(date.getTime())) return value;
  return date.toLocaleDateString(locale, {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}

export function readingTimeOf(text) {
  const words = String(text || "")
    .split(/\s+/)
    .filter(Boolean).length;
  return Math.max(1, Math.round(words / 200));
}

/** Yazı içeriğindeki h2/h3 başlıklarını içindekiler için çıkarır. */
export function extractHeadings(content) {
  const headings = [];
  let inCode = false;

  String(content || "")
    .replace(/\r\n/g, "\n")
    .split("\n")
    .forEach((line) => {
      if (/^```/.test(line.trim())) {
        inCode = !inCode;
        return;
      }
      if (inCode) return;
      const match = line.match(/^(#{2,3})\s+(.+?)\s*#*\s*$/);
      if (!match) return;
      headings.push({
        level: match[1].length,
        text: match[2].trim(),
        id: slugifyHeading(match[2]),
      });
    });

  return headings;
}
