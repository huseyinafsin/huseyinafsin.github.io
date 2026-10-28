import React, { useState } from "react";
import { Box, Link as MuiLink, useTheme } from "@mui/material";
import { Link as RouterLink } from "react-router-dom";
import ContentCopyRoundedIcon from "@mui/icons-material/ContentCopyRounded";
import CheckRoundedIcon from "@mui/icons-material/CheckRounded";
import { slugifyHeading } from "../utils/text";

/**
 * Bağımlılık gerektirmeyen markdown görüntüleyici.
 * Başlık, paragraf, liste, alıntı, tablo, görsel, video (YouTube/Vimeo/mp4),
 * kod bloğu ve temel satır içi biçimlendirmeyi destekler.
 */

const INLINE_PATTERN =
  /(!\[[^\]]*\]\([^)]*\)|\[[^\]]+\]\([^)]*\)|\*\*[^*]+\*\*|__[^_]+__|~~[^~]+~~|`[^`]+`|\*[^*\n]+\*)/g;

const CODE_FONT =
  'ui-monospace, SFMono-Regular, Menlo, Consolas, "Liberation Mono", monospace';

const isInternal = (href) => href.startsWith("/") || href.startsWith("#");

export function videoSource(url) {
  const value = String(url || "").trim();
  const youtube = value.match(
    /(?:youtube\.com\/(?:watch\?v=|embed\/|shorts\/|live\/)|youtu\.be\/)([\w-]{6,})/i
  );
  if (youtube) {
    return {
      type: "youtube",
      id: youtube[1],
      src: `https://www.youtube-nocookie.com/embed/${youtube[1]}`,
      original: value,
    };
  }
  const vimeo = value.match(/vimeo\.com\/(\d+)/i);
  if (vimeo) {
    return {
      type: "vimeo",
      id: vimeo[1],
      src: `https://player.vimeo.com/video/${vimeo[1]}`,
      original: value,
    };
  }
  if (/\.(mp4|webm|ogg|mov|m4v)(\?.*)?$/i.test(value)) {
    return { type: "file", src: value, original: value };
  }
  return null;
}

function renderInline(text, keyPrefix = "inline") {
  if (!text) return null;

  return text
    .split(INLINE_PATTERN)
    .filter((part) => part !== undefined && part !== "")
    .map((part, index) => {
      const key = `${keyPrefix}-${index}`;

      const image = part.match(/^!\[([^\]]*)\]\(([^)]*)\)$/);
      if (image) {
        return (
          <Box
            key={key}
            component="img"
            src={image[2].trim()}
            alt={image[1]}
            loading="lazy"
            sx={{
              display: "block",
              width: "100%",
              borderRadius: 2,
              my: 3,
              border: "1px solid",
              borderColor: "divider",
            }}
          />
        );
      }

      const link = part.match(/^\[([^\]]+)\]\(([^)\s]+)(?:\s+"[^"]*")?\)$/);
      if (link) {
        const [, label, href] = link;
        if (isInternal(href)) {
          return (
            <MuiLink key={key} component={RouterLink} to={href} underline="always">
              {label}
            </MuiLink>
          );
        }
        return (
          <MuiLink
            key={key}
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            underline="always"
          >
            {label}
          </MuiLink>
        );
      }

      const code = part.match(/^`([^`]+)`$/);
      if (code) {
        return (
          <Box
            key={key}
            component="code"
            sx={{
              fontFamily: CODE_FONT,
              fontSize: "0.86em",
              px: 0.6,
              py: 0.2,
              borderRadius: 0.75,
              border: "1px solid",
              borderColor: "divider",
              backgroundColor: "action.hover",
              whiteSpace: "nowrap",
            }}
          >
            {code[1]}
          </Box>
        );
      }

      const bold = part.match(/^(?:\*\*([^*]+)\*\*|__([^_]+)__)$/);
      if (bold) {
        return (
          <Box key={key} component="strong" sx={{ fontWeight: 600 }}>
            {renderInline(bold[1] || bold[2], key)}
          </Box>
        );
      }

      const strike = part.match(/^~~([^~]+)~~$/);
      if (strike) {
        return (
          <Box key={key} component="del" sx={{ opacity: 0.7 }}>
            {renderInline(strike[1], key)}
          </Box>
        );
      }

      const italic = part.match(/^\*([^*\n]+)\*$/);
      if (italic) {
        return (
          <Box key={key} component="em">
            {renderInline(italic[1], key)}
          </Box>
        );
      }

      return <React.Fragment key={key}>{part}</React.Fragment>;
    });
}

function isBlockStart(line) {
  return (
    /^```/.test(line) ||
    /^#{1,6}\s+/.test(line) ||
    /^\s*(-{3,}|\*{3,}|_{3,})\s*$/.test(line) ||
    /^\s*>\s?/.test(line) ||
    /^\s*[-*+]\s+/.test(line) ||
    /^\s*\d+[.)]\s+/.test(line) ||
    /^\s*!\[[^\]]*\]\([^)]*\)\s*$/.test(line) ||
    /^!video\[/.test(line.trim()) ||
    /^https?:\/\//.test(line.trim()) ||
    /^\s*\|.*\|\s*$/.test(line) ||
    /^---\s*$/.test(line)
  );
}

function splitTableRow(line) {
  return line
    .trim()
    .replace(/^\|/, "")
    .replace(/\|$/, "")
    .split("|")
    .map((cell) => cell.trim());
}

function parseBlocks(content) {
  const lines = String(content || "")
    .replace(/\r\n/g, "\n")
    .split("\n");
  const blocks = [];
  let index = 0;

  while (index < lines.length) {
    const line = lines[index];

    if (!line.trim()) {
      index += 1;
      continue;
    }

    const fence = line.match(/^```([\w-]*)\s*$/);
    if (fence) {
      const code = [];
      index += 1;
      while (index < lines.length && !/^```\s*$/.test(lines[index])) {
        code.push(lines[index]);
        index += 1;
      }
      index += 1;
      blocks.push({ type: "code", lang: fence[1], text: code.join("\n") });
      continue;
    }

    const heading = line.match(/^(#{1,6})\s+(.*)$/);
    if (heading) {
      blocks.push({
        type: "heading",
        level: heading[1].length,
        text: heading[2].replace(/\s*#+\s*$/, ""),
      });
      index += 1;
      continue;
    }

    if (/^\s*(-{3,}|\*{3,}|_{3,})\s*$/.test(line)) {
      blocks.push({ type: "hr" });
      index += 1;
      continue;
    }

    if (
      /^\s*\|.*\|\s*$/.test(line) &&
      /^\s*\|?[\s:|-]+\|?\s*$/.test(lines[index + 1] || "")
    ) {
      const header = splitTableRow(line);
      index += 2;
      const rows = [];
      while (index < lines.length && /^\s*\|.*\|\s*$/.test(lines[index])) {
        rows.push(splitTableRow(lines[index]));
        index += 1;
      }
      blocks.push({ type: "table", header, rows });
      continue;
    }

    if (/^\s*>\s?/.test(line)) {
      const quote = [];
      while (index < lines.length && /^\s*>\s?/.test(lines[index])) {
        quote.push(lines[index].replace(/^\s*>\s?/, ""));
        index += 1;
      }
      blocks.push({ type: "quote", text: quote.join(" ") });
      continue;
    }

    if (/^\s*[-*+]\s+/.test(line)) {
      const items = [];
      while (index < lines.length && /^\s*[-*+]\s+/.test(lines[index])) {
        items.push(lines[index].replace(/^\s*[-*+]\s+/, ""));
        index += 1;
      }
      blocks.push({ type: "list", ordered: false, items });
      continue;
    }

    if (/^\s*\d+[.)]\s+/.test(line)) {
      const items = [];
      while (index < lines.length && /^\s*\d+[.)]\s+/.test(lines[index])) {
        items.push(lines[index].replace(/^\s*\d+[.)]\s+/, ""));
        index += 1;
      }
      blocks.push({ type: "list", ordered: true, items });
      continue;
    }

    const videoDirective = line
      .trim()
      .match(/^!video\[([^\]]*)\]\(([^)]+)\)$/);
    if (videoDirective) {
      blocks.push({
        type: "video",
        caption: videoDirective[1],
        url: videoDirective[2].trim(),
      });
      index += 1;
      continue;
    }

    const bareVideo = videoSource(line.trim());
    if (bareVideo && /^https?:\/\//.test(line.trim())) {
      blocks.push({ type: "video", caption: "", url: line.trim() });
      index += 1;
      continue;
    }

    const image = line.trim().match(/^!\[([^\]]*)\]\(([^)]*)\)$/);
    if (image) {
      blocks.push({ type: "image", alt: image[1], src: image[2].trim() });
      index += 1;
      continue;
    }

    const paragraph = [];
    const start = index;
    while (
      index < lines.length &&
      lines[index].trim() &&
      (index === start || !isBlockStart(lines[index]))
    ) {
      paragraph.push(lines[index].trim());
      index += 1;
    }
    blocks.push({ type: "paragraph", text: paragraph.join(" ") });
  }

  return blocks;
}

const HEADING_STYLES = {
  1: { fontSize: "1.85rem", mt: 0, mb: 2 },
  2: { fontSize: "1.45rem", mt: 5, mb: 1.5 },
  3: { fontSize: "1.18rem", mt: 4, mb: 1.25 },
  4: { fontSize: "1.05rem", mt: 3, mb: 1 },
  5: { fontSize: "1rem", mt: 3, mb: 1 },
  6: { fontSize: "0.95rem", mt: 3, mb: 1 },
};

function CodeBlock({ block }) {
  const theme = useTheme();
  const [copied, setCopied] = useState(false);

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(block.text);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 1800);
    } catch (error) {
      // Pano erişimi yoksa yoksay.
    }
  };

  return (
    <Box
      sx={{
        position: "relative",
        my: 3.5,
        borderRadius: 2,
        border: "1px solid",
        borderColor: "divider",
        backgroundColor: theme.palette.mode === "dark" ? "#0e0e10" : "#f7f7f5",
        overflow: "hidden",
      }}
    >
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          gap: 2,
          px: 2,
          py: 0.9,
          borderBottom: "1px solid",
          borderColor: "divider",
          backgroundColor: theme.palette.mode === "dark"
            ? "rgba(255,255,255,0.03)"
            : "rgba(0,0,0,0.02)",
        }}
      >
        <Box
          component="span"
          sx={{
            fontFamily: CODE_FONT,
            fontSize: 11.5,
            letterSpacing: "0.06em",
            textTransform: "uppercase",
            color: "text.secondary",
          }}
        >
          {block.lang || "kod"}
        </Box>
        <Box
          component="button"
          onClick={copy}
          type="button"
          aria-label="Kodu kopyala"
          sx={{
            display: "inline-flex",
            alignItems: "center",
            gap: 0.5,
            border: 0,
            background: "none",
            cursor: "pointer",
            color: "text.secondary",
            fontSize: 12,
            fontFamily: "inherit",
            p: 0,
            "&:hover": { color: "text.primary" },
          }}
        >
          {copied ? (
            <>
              <CheckRoundedIcon sx={{ fontSize: 14 }} /> kopyalandı
            </>
          ) : (
            <>
              <ContentCopyRoundedIcon sx={{ fontSize: 14 }} /> kopyala
            </>
          )}
        </Box>
      </Box>
      <Box
        component="pre"
        sx={{
          m: 0,
          p: { xs: 2, sm: 2.5 },
          overflowX: "auto",
          fontSize: 13.5,
          lineHeight: 1.7,
        }}
      >
        <Box component="code" sx={{ fontFamily: CODE_FONT }}>
          {block.text}
        </Box>
      </Box>
    </Box>
  );
}

function VideoBlock({ block }) {
  const source = videoSource(block.url);

  if (!source) {
    return (
      <Box sx={{ my: 3 }}>
        <MuiLink href={block.url} target="_blank" rel="noopener noreferrer">
          {block.url}
        </MuiLink>
      </Box>
    );
  }

  return (
    <Box component="figure" sx={{ my: 4, mx: 0 }}>
      <Box
        sx={{
          position: "relative",
          width: "100%",
          aspectRatio: "16 / 9",
          borderRadius: 2,
          overflow: "hidden",
          border: "1px solid",
          borderColor: "divider",
          backgroundColor: "#000",
        }}
      >
        {source.type === "file" ? (
          <Box
            component="video"
            src={source.src}
            controls
            playsInline
            preload="metadata"
            sx={{ width: "100%", height: "100%", display: "block" }}
          />
        ) : (
          <Box
            component="iframe"
            src={source.src}
            title={block.caption || "Video"}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            loading="lazy"
            sx={{ width: "100%", height: "100%", border: 0, display: "block" }}
          />
        )}
      </Box>
      {block.caption && (
        <Box
          component="figcaption"
          sx={{
            mt: 1,
            fontSize: 13,
            color: "text.secondary",
            textAlign: "center",
          }}
        >
          {block.caption}
        </Box>
      )}
    </Box>
  );
}

function Markdown({ content }) {
  const blocks = parseBlocks(content);

  return (
    <Box
      sx={{
        fontSize: { xs: 16, sm: 17 },
        lineHeight: 1.8,
        color: "text.primary",
        "& p": { my: 2.5 },
        "& a": {
          color: "text.primary",
          textDecorationColor: "text.secondary",
          textUnderlineOffset: "3px",
          "&:hover": { textDecorationColor: "text.primary" },
        },
      }}
    >
      {blocks.map((block, index) => {
        const key = `block-${index}`;

        switch (block.type) {
          case "heading": {
            const style = HEADING_STYLES[block.level] || HEADING_STYLES[3];
            return (
              <Box
                key={key}
                component={`h${block.level}`}
                id={slugifyHeading(block.text)}
                sx={{
                  fontFamily: '"Inter", sans-serif',
                  fontWeight: 600,
                  letterSpacing: "-0.02em",
                  lineHeight: 1.3,
                  scrollMarginTop: "88px",
                  ...style,
                }}
              >
                {renderInline(block.text, key)}
              </Box>
            );
          }
          case "code":
            return <CodeBlock key={key} block={block} />;
          case "quote":
            return (
              <Box
                key={key}
                component="blockquote"
                sx={{
                  my: 3.5,
                  mx: 0,
                  pl: 2.5,
                  borderLeft: "2px solid",
                  borderColor: "text.primary",
                  color: "text.secondary",
                  fontSize: "1.02em",
                  fontStyle: "italic",
                }}
              >
                {renderInline(block.text, key)}
              </Box>
            );
          case "list":
            return (
              <Box
                key={key}
                component={block.ordered ? "ol" : "ul"}
                sx={{ my: 2.5, pl: 3, "& li": { my: 0.75, pl: 0.5 } }}
              >
                {block.items.map((item, itemIndex) => (
                  <Box
                    key={`${key}-${itemIndex}`}
                    component="li"
                    sx={{ "&::marker": { color: "text.secondary" } }}
                  >
                    {renderInline(item, `${key}-${itemIndex}`)}
                  </Box>
                ))}
              </Box>
            );
          case "table":
            return (
              <Box key={key} sx={{ my: 3.5, overflowX: "auto" }}>
                <Box
                  component="table"
                  sx={{
                    width: "100%",
                    borderCollapse: "collapse",
                    fontSize: 14.5,
                    "& th, & td": {
                      borderBottom: "1px solid",
                      borderColor: "divider",
                      px: 1.5,
                      py: 1.25,
                      textAlign: "left",
                      verticalAlign: "top",
                    },
                    "& th": { fontWeight: 600, color: "text.primary" },
                    "& td": { color: "text.secondary" },
                  }}
                >
                  <thead>
                    <tr>
                      {block.header.map((cell, cellIndex) => (
                        <th key={`${key}-h-${cellIndex}`}>
                          {renderInline(cell, `${key}-h-${cellIndex}`)}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {block.rows.map((row, rowIndex) => (
                      <tr key={`${key}-r-${rowIndex}`}>
                        {row.map((cell, cellIndex) => (
                          <td key={`${key}-r-${rowIndex}-${cellIndex}`}>
                            {renderInline(cell, `${key}-r-${rowIndex}-${cellIndex}`)}
                          </td>
                        ))}
                      </tr>
                    ))}
                  </tbody>
                </Box>
              </Box>
            );
          case "video":
            return <VideoBlock key={key} block={block} />;
          case "hr":
            return (
              <Box key={key} component="hr" sx={{ my: 5, borderColor: "divider" }} />
            );
          case "image":
            return (
              <Box component="figure" key={key} sx={{ my: 4, mx: 0 }}>
                <Box
                  component="img"
                  src={block.src}
                  alt={block.alt}
                  loading="lazy"
                  sx={{
                    display: "block",
                    width: "100%",
                    borderRadius: 2,
                    border: "1px solid",
                    borderColor: "divider",
                  }}
                />
                {block.alt && (
                  <Box
                    component="figcaption"
                    sx={{
                      mt: 1,
                      fontSize: 13,
                      color: "text.secondary",
                      textAlign: "center",
                    }}
                  >
                    {block.alt}
                  </Box>
                )}
              </Box>
            );
          default:
            return (
              <Box key={key} component="p">
                {renderInline(block.text, key)}
              </Box>
            );
        }
      })}
    </Box>
  );
}

export default Markdown;
