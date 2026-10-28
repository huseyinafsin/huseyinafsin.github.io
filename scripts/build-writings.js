/*
 * Yazılar klasöründeki markdown dosyalarını okuyup uygulamanın kullandığı
 * JSON dosyasını üretir. `npm start` ve `npm run build` öncesinde otomatik
 * çalışır (package.json -> prestart / prebuild).
 */
const fs = require("fs");
const path = require("path");

const projectRoot = path.resolve(__dirname, "..");
const writingsDir = path.join(projectRoot, "src", "content", "writings");
const outputFile = path.join(
  projectRoot,
  "src",
  "content",
  "writings.generated.json"
);

const TURKISH_CHARS = {
  ç: "c",
  ğ: "g",
  ı: "i",
  ö: "o",
  ş: "s",
  ü: "u",
  Ç: "c",
  Ğ: "g",
  İ: "i",
  I: "i",
  Ö: "o",
  Ş: "s",
  Ü: "u",
};

function slugify(value) {
  return value
    .split("")
    .map((char) => TURKISH_CHARS[char] || char)
    .join("")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

function unquote(value) {
  const trimmed = String(value || "").trim();
  if (trimmed.length < 2) return trimmed;
  const first = trimmed[0];
  const last = trimmed[trimmed.length - 1];
  if ((first === '"' || first === "'") && first === last) {
    return trimmed.slice(1, -1);
  }
  return trimmed;
}

function parseList(value) {
  const trimmed = String(value || "").trim();
  if (!trimmed) return [];
  const inner =
    trimmed.startsWith("[") && trimmed.endsWith("]")
      ? trimmed.slice(1, -1)
      : trimmed;
  return inner
    .split(",")
    .map((item) => unquote(item).trim())
    .filter(Boolean);
}

function parseFrontMatter(raw) {
  const content = raw.replace(/^\uFEFF/, "");
  const match = content.match(/^---\r?\n([\s\S]*?)\r?\n---\r?\n?/);
  if (!match) return { data: {}, body: content };

  const data = {};
  match[1].split(/\r?\n/).forEach((line) => {
    if (!line.trim() || line.trim().startsWith("#")) return;
    const separator = line.indexOf(":");
    if (separator === -1) return;
    const key = line.slice(0, separator).trim();
    const value = line.slice(separator + 1).trim();
    if (key === "tags") data.tags = parseList(value);
    else data[key] = unquote(value);
  });

  return { data, body: content.slice(match[0].length) };
}

function stripMarkdown(value) {
  return String(value || "")
    .replace(/```[\s\S]*?```/g, " ")
    .replace(/!\[[^\]]*\]\([^)]*\)/g, " ")
    .replace(/\[([^\]]+)\]\([^)]*\)/g, "$1")
    .replace(/[#>*_`~-]/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

function firstHeading(body) {
  const match = body.match(/^\s*#\s+(.+)$/m);
  return match ? stripMarkdown(match[1]) : "";
}

function excerpt(body) {
  const withoutHeadings = body
    .replace(/```[\s\S]*?```/g, " ")
    .replace(/^\s*#{1,6}\s+.*$/gm, " ");
  const plain = stripMarkdown(withoutHeadings);
  if (plain.length <= 180) return plain;
  return plain.slice(0, 177).trim() + "...";
}

function readingTime(body) {
  const words = stripMarkdown(body).split(/\s+/).filter(Boolean).length;
  return Math.max(1, Math.round(words / 200));
}

function dateFromFileName(fileName) {
  const match = fileName.match(/(\d{4})-(\d{2})-(\d{2})/);
  return match ? `${match[1]}-${match[2]}-${match[3]}` : "";
}

function slugFromFileName(fileName) {
  return slugify(
    fileName
      .replace(/\.md$/i, "")
      .replace(/^\d{4}-\d{2}-\d{2}-/, "")
      .replace(/^\d{4}\s*-\s*/, "")
  );
}

/** Front matter ve H1 yoksa ilk düz metin satırını başlık olarak kullanır. */
function firstLineTitle(body) {
  const line = (body.split(/\r?\n/).find((item) => item.trim()) || "").trim();
  if (!line) return "";
  if (/^([-*+>|]|\d+[.)])\s/.test(line) || /^```|^!\[|^!video\[/.test(line)) {
    return "";
  }
  const plain = stripMarkdown(line).trim();
  return plain && plain.length <= 80 ? plain : "";
}

function collectWritings() {
  if (!fs.existsSync(writingsDir)) {
    fs.mkdirSync(writingsDir, { recursive: true });
    return [];
  }

  return fs
    .readdirSync(writingsDir)
    .filter((fileName) => /\.md$/i.test(fileName))
    .filter((fileName) => !fileName.startsWith("_") && !fileName.startsWith("."))
    .map((fileName) => {
      const fullPath = path.join(writingsDir, fileName);
      const raw = fs.readFileSync(fullPath, "utf8");
      const { data, body } = parseFrontMatter(raw);

      if (String(data.draft).toLowerCase() === "true") return null;

      const fallbackDate = dateFromFileName(fileName);
      const date = data.date || fallbackDate || new Date().toISOString().slice(0, 10);
      const heading = firstHeading(body);
      const lineTitle = heading ? "" : firstLineTitle(body);
      const title = data.title || heading || lineTitle || slugFromFileName(fileName);

      // Başlık sayfada ayrıca gösterildiği için içerikteki ilk H1 tekrarını at.
      let content = body.replace(/\r\n/g, "\n").trim();
      const leadingHeading = content.match(/^#\s+(.+)\n?/);
      if (
        leadingHeading &&
        leadingHeading[1].trim().toLocaleLowerCase("tr") ===
          title.trim().toLocaleLowerCase("tr")
      ) {
        content = content.slice(leadingHeading[0].length).trim();
      } else if (lineTitle) {
        // Başlık olarak kullanılan ilk satırı gövdeden çıkar.
        content = content.replace(/^[^\n]*\n?/, "").trim();
      }

      // Tek satırlık dosyalarda gövde boş kalmasın.
      if (!content) content = body.replace(/\r\n/g, "\n").trim();

      return {
        slug: data.slug ? slugify(data.slug) : slugFromFileName(fileName),
        title,
        date,
        summary: data.summary || excerpt(content),
        tags: Array.isArray(data.tags) ? data.tags : [],
        cover: data.cover || "",
        readingTime: readingTime(content),
        content,
      };
    })
    .filter(Boolean)
    .sort((a, b) => {
      if (a.date === b.date) return a.title.localeCompare(b.title, "tr");
      return a.date < b.date ? 1 : -1;
    });
}

const writings = collectWritings();
const seen = new Set();
writings.forEach((writing) => {
  let slug = writing.slug;
  let suffix = 2;
  while (seen.has(slug)) {
    slug = `${writing.slug}-${suffix}`;
    suffix += 1;
  }
  writing.slug = slug;
  seen.add(slug);
});

fs.writeFileSync(outputFile, JSON.stringify(writings, null, 2) + "\n", "utf8");
console.log(
  `[writings] ${writings.length} yazı işlendi -> ${path.relative(
    projectRoot,
    outputFile
  )}`
);

/* ------------------------------------------------------------------ */
/* SEO ve besleme dosyaları                                            */
/* ------------------------------------------------------------------ */

const SITE_URL = "https://huseyinafsin.github.io";
const SITE_TITLE = "Hüseyin Afşin · Yazılım Notları";
const SITE_DESCRIPTION =
  "Yazılım, mimari ve teknoloji üzerine kısa, uygulanabilir yazılar.";
const AUTHOR = "Hüseyin Afşin";

function escapeXml(value) {
  return String(value || "")
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&apos;");
}

function postUrl(slug) {
  return `${SITE_URL}/writings/${slug}`;
}

function rfc822(date) {
  const parsed = new Date(`${date}T09:00:00Z`);
  return (Number.isNaN(parsed.getTime()) ? new Date() : parsed).toUTCString();
}

const sitemap = [
  '<?xml version="1.0" encoding="UTF-8"?>',
  '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">',
  "  <url>",
  `    <loc>${SITE_URL}/</loc>`,
  "  </url>",
  ...writings.map((writing) =>
    [
      "  <url>",
      `    <loc>${postUrl(writing.slug)}</loc>`,
      `    <lastmod>${writing.date}</lastmod>`,
      "  </url>",
    ].join("\n")
  ),
  "</urlset>",
  "",
].join("\n");

const feed = [
  '<?xml version="1.0" encoding="UTF-8"?>',
  '<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">',
  "  <channel>",
  `    <title>${escapeXml(SITE_TITLE)}</title>`,
  `    <link>${SITE_URL}/</link>`,
  `    <description>${escapeXml(SITE_DESCRIPTION)}</description>`,
  "    <language>tr</language>",
  `    <atom:link href="${SITE_URL}/feed.xml" rel="self" type="application/rss+xml" />`,
  ...writings.flatMap((writing) => [
    "    <item>",
    `      <title>${escapeXml(writing.title)}</title>`,
    `      <link>${postUrl(writing.slug)}</link>`,
    `      <guid isPermaLink="true">${postUrl(writing.slug)}</guid>`,
    `      <pubDate>${rfc822(writing.date)}</pubDate>`,
    `      <description>${escapeXml(writing.summary)}</description>`,
    ...writing.tags.map(
      (tag) => `      <category>${escapeXml(tag)}</category>`
    ),
    "    </item>",
  ]),
  "  </channel>",
  "</rss>",
  "",
].join("\n");

fs.writeFileSync(path.join(projectRoot, "public", "sitemap.xml"), sitemap, "utf8");
fs.writeFileSync(path.join(projectRoot, "public", "feed.xml"), feed, "utf8");
console.log("[writings] public/sitemap.xml ve public/feed.xml güncellendi");

