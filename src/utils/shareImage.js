/**
 * Paylaşım görsellerini canvas üzerinde çizer. Harici görsel servisi veya
 * ek bağımlılık kullanmadan Instagram / WhatsApp için hazır PNG üretir.
 */

import { paletteFor } from "./visuals";

const SITE = "huseyinafsin.github.io";
const AUTHOR = "Hüseyin Afşin";

export const SHARE_SIZES = [
  { id: "square", label: "Instagram kare", width: 1080, height: 1080 },
  { id: "story", label: "Instagram hikâye", width: 1080, height: 1920 },
  { id: "og", label: "Bağlantı kartı", width: 1200, height: 630 },
];

function roundedRect(ctx, x, y, width, height, radius) {
  const r = Math.min(radius, width / 2, height / 2);
  ctx.beginPath();
  ctx.moveTo(x + r, y);
  ctx.arcTo(x + width, y, x + width, y + height, r);
  ctx.arcTo(x + width, y + height, x, y + height, r);
  ctx.arcTo(x, y + height, x, y, r);
  ctx.arcTo(x, y, x + width, y, r);
  ctx.closePath();
}

function wrapText(ctx, text, maxWidth, maxLines) {
  const words = String(text || "").split(/\s+/).filter(Boolean);
  const lines = [];
  let current = "";

  words.forEach((word) => {
    const candidate = current ? `${current} ${word}` : word;
    if (ctx.measureText(candidate).width <= maxWidth) {
      current = candidate;
      return;
    }
    if (current) lines.push(current);
    current = word;
  });
  if (current) lines.push(current);

  if (lines.length > maxLines) {
    const trimmed = lines.slice(0, maxLines);
    let last = trimmed[maxLines - 1];
    while (last.length > 1 && ctx.measureText(`${last}…`).width > maxWidth) {
      last = last.slice(0, -1);
    }
    trimmed[maxLines - 1] = `${last}…`;
    return trimmed;
  }

  return lines;
}

function fitTitle(ctx, text, maxWidth, maxLines, sizes, weight = 600) {
  for (let index = 0; index < sizes.length; index += 1) {
    const size = sizes[index];
    ctx.font = `${weight} ${size}px "Instrument Serif", Georgia, serif`;
    const lines = wrapText(ctx, text, maxWidth, maxLines);
    const fits = lines.join(" ").length >= String(text).length - 1;
    if (fits || index === sizes.length - 1) return { lines, size };
  }
  return { lines: [text], size: sizes[sizes.length - 1] };
}

export async function drawShareImage(canvas, options) {
  const {
    width,
    height,
    title,
    date,
    tags = [],
    kind = "square",
    seed,
  } = options;

  if (typeof document !== "undefined" && document.fonts && document.fonts.ready) {
    try {
      await document.fonts.ready;
    } catch (error) {
      // Yazı tipleri yüklenemezse sistem yazı tipiyle devam edilir.
    }
  }

  const ratio = width / height;
  const scale = width / 1080;
  const padding = Math.round((kind === "og" ? 72 : 92) * (kind === "og" ? width / 1200 : 1));
  const palette = paletteFor(seed || title);

  canvas.width = width;
  canvas.height = height;
  const ctx = canvas.getContext("2d");
  if (!ctx) return;

  // Arka plan
  const gradient = ctx.createLinearGradient(0, 0, width * 0.9, height);
  gradient.addColorStop(0, palette.from);
  gradient.addColorStop(1, palette.to);
  ctx.fillStyle = gradient;
  ctx.fillRect(0, 0, width, height);

  // Yumuşak ışık lekeleri
  const glow = ctx.createRadialGradient(
    width * 0.82,
    height * 0.12,
    0,
    width * 0.82,
    height * 0.12,
    Math.max(width, height) * 0.7
  );
  glow.addColorStop(0, "rgba(255,255,255,0.24)");
  glow.addColorStop(1, "rgba(255,255,255,0)");
  ctx.fillStyle = glow;
  ctx.fillRect(0, 0, width, height);

  // Nokta dokusu (deterministik)
  ctx.save();
  ctx.globalAlpha = 0.16;
  ctx.fillStyle = "#ffffff";
  let seedValue = 1;
  const dots = Math.round((width * height) / 9000);
  for (let index = 0; index < dots; index += 1) {
    seedValue = (seedValue * 16807) % 2147483647;
    const x = (seedValue / 2147483647) * width;
    seedValue = (seedValue * 16807) % 2147483647;
    const y = (seedValue / 2147483647) * height;
    ctx.beginPath();
    ctx.arc(x, y, 1.1 * scale, 0, Math.PI * 2);
    ctx.fill();
  }
  ctx.restore();

  // Çerçeve
  ctx.strokeStyle = "rgba(255,255,255,0.28)";
  ctx.lineWidth = 2 * scale;
  roundedRect(ctx, padding * 0.45, padding * 0.45, width - padding * 0.9, height - padding * 0.9, 34 * scale);
  ctx.stroke();

  ctx.textBaseline = "alphabetic";
  ctx.fillStyle = "rgba(255,255,255,0.92)";

  // Üst: rozet + site
  const badgeSize = 46 * scale;
  roundedRect(ctx, padding, padding * 1.05, badgeSize, badgeSize, 12 * scale);
  ctx.fillStyle = "rgba(255,255,255,0.18)";
  ctx.fill();
  ctx.fillStyle = "#ffffff";
  ctx.font = `700 ${22 * scale}px "Inter", system-ui, sans-serif`;
  ctx.textAlign = "center";
  ctx.fillText("HA", padding + badgeSize / 2, padding * 1.05 + badgeSize * 0.66);
  ctx.textAlign = "left";

  ctx.font = `600 ${22 * scale}px "Inter", system-ui, sans-serif`;
  ctx.fillStyle = "rgba(255,255,255,0.95)";
  ctx.fillText(AUTHOR, padding + badgeSize + 16 * scale, padding * 1.05 + badgeSize * 0.64);

  // Orta: başlık
  const isStory = kind === "story";
  const isOg = kind === "og";
  const titleSizes = isStory
    ? [86, 76, 66, 58, 50]
    : isOg
    ? [66, 58, 50, 44]
    : [76, 66, 58, 50, 44];

  const titleTop = isStory ? height * 0.34 : isOg ? height * 0.36 : height * 0.33;
  const titleWidth = width - padding * 2;
  const { lines, size } = fitTitle(
    ctx,
    title,
    titleWidth,
    isStory ? 6 : isOg ? 3 : 4,
    titleSizes
  );

  ctx.font = `600 ${size}px "Instrument Serif", Georgia, serif`;
  ctx.fillStyle = "#ffffff";
  const lineHeight = size * 1.12;
  lines.forEach((line, index) => {
    ctx.fillText(line, padding, titleTop + index * lineHeight);
  });

  // Alt bilgi
  const bottomY = height - padding * 1.15;
  const metaSize = isStory ? 28 : 24;

  ctx.fillStyle = "rgba(255,255,255,0.86)";
  ctx.font = `500 ${metaSize * scale}px "Inter", system-ui, sans-serif`;
  const meta = [date, tags.slice(0, 2).map((tag) => `#${tag}`).join("  ")]
    .filter(Boolean)
    .join("  ·  ");
  ctx.fillText(meta, padding, bottomY - (isStory ? 92 * scale : 62 * scale));

  // Ayırıcı çizgi
  ctx.strokeStyle = "rgba(255,255,255,0.35)";
  ctx.lineWidth = 1.5 * scale;
  ctx.beginPath();
  ctx.moveTo(padding, bottomY - 40 * scale);
  ctx.lineTo(width - padding, bottomY - 40 * scale);
  ctx.stroke();

  ctx.font = `600 ${(isStory ? 30 : 25) * scale}px "Inter", system-ui, sans-serif`;
  ctx.fillStyle = "#ffffff";
  ctx.fillText(SITE, padding, bottomY);

  // Sağ alt: ok
  ctx.textAlign = "right";
  ctx.font = `500 ${(isStory ? 30 : 25) * scale}px "Inter", system-ui, sans-serif`;
  ctx.fillStyle = "rgba(255,255,255,0.9)";
  ctx.fillText("yazıyı oku  →", width - padding, bottomY);
  ctx.textAlign = "left";

  if (isStory && ratio < 1) {
    // Hikâye formatında üst ve alt boşluklara ince çizgiler
    ctx.strokeStyle = "rgba(255,255,255,0.18)";
    ctx.beginPath();
    ctx.moveTo(padding, height * 0.22);
    ctx.lineTo(width - padding, height * 0.22);
    ctx.moveTo(padding, height * 0.78);
    ctx.lineTo(width - padding, height * 0.78);
    ctx.stroke();
  }
}

export function downloadCanvas(canvas, fileName) {
  return new Promise((resolve) => {
    canvas.toBlob((blob) => {
      if (!blob) {
        resolve(false);
        return;
      }
      const url = URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      link.download = fileName;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      setTimeout(() => URL.revokeObjectURL(url), 2000);
      resolve(true);
    }, "image/png");
  });
}
