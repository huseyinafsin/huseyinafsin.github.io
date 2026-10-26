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
  );
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
      const title = data.title || firstHeading(body) || slugFromFileName(fileName);

      return {
        slug: data.slug ? slugify(data.slug) : slugFromFileName(fileName),
        title,
        date,
        summary: data.summary || excerpt(body),
        tags: Array.isArray(data.tags) ? data.tags : [],
        cover: data.cover || "",
        readingTime: readingTime(body),
        content: body.trim(),
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
