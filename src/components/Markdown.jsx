import React from "react";
import { Box, Link as MuiLink } from "@mui/material";
import { Link as RouterLink } from "react-router-dom";

/**
 * Bağımlılık eklemeden kullanılan küçük bir markdown görüntüleyici.
 * Başlık, paragraf, liste, alıntı, kod bloğu, görsel, bağlantı ve
 * temel satır içi biçimlendirmeyi destekler.
 */

const INLINE_PATTERN =
  /(!\[[^\]]*\]\([^)]*\)|\[[^\]]+\]\([^)]*\)|\*\*[^*]+\*\*|__[^_]+__|~~[^~]+~~|`[^`]+`|\*[^*\n]+\*)/g;

function isInternal(href) {
  return href.startsWith("/") || href.startsWith("#");
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
            sx={{
              display: "block",
              maxWidth: "100%",
              borderRadius: 2,
              my: 2,
            }}
          />
        );
      }

      const link = part.match(/^\[([^\]]+)\]\(([^)\s]+)(?:\s+"[^"]*")?\)$/);
      if (link) {
        const [, label, href] = link;
        if (isInternal(href)) {
          return (
            <MuiLink
              key={key}
              component={RouterLink}
              to={href}
              underline="always"
            >
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
              fontFamily:
                'ui-monospace, SFMono-Regular, Menlo, Consolas, "Liberation Mono", monospace',
              fontSize: "0.9em",
              px: 0.6,
              py: 0.2,
              borderRadius: 1,
              backgroundColor: "rgba(127, 127, 127, 0.18)",
            }}
          >
            {code[1]}
          </Box>
        );
      }

      const bold = part.match(/^(?:\*\*([^*]+)\*\*|__([^_]+)__)$/);
      if (bold) {
        return (
          <Box key={key} component="strong" sx={{ fontWeight: 700 }}>
            {renderInline(bold[1] || bold[2], key)}
          </Box>
        );
      }

      const strike = part.match(/^~~([^~]+)~~$/);
      if (strike) {
        return (
          <Box key={key} component="del">
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
    /^\s*!\[[^\]]*\]\([^)]*\)\s*$/.test(line)
  );
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

    const fence = line.match(/^```(\S*)\s*$/);
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
        text: heading[2],
      });
      index += 1;
      continue;
    }

    if (/^\s*(-{3,}|\*{3,}|_{3,})\s*$/.test(line)) {
      blocks.push({ type: "hr" });
      index += 1;
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

const headings = {
  1: { fontSize: "1.9rem", mt: 0, mb: 2 },
  2: { fontSize: "1.45rem", mt: 4, mb: 1.5 },
  3: { fontSize: "1.2rem", mt: 3, mb: 1 },
  4: { fontSize: "1.05rem", mt: 3, mb: 1 },
  5: { fontSize: "1rem", mt: 2, mb: 1 },
  6: { fontSize: "0.95rem", mt: 2, mb: 1 },
};

function headingId(text) {
  return String(text)
    .toLowerCase()
    .replace(/[çğıöşü]/g, (char) => {
      const map = { ç: "c", ğ: "g", ı: "i", ö: "o", ş: "s", ü: "u" };
      return map[char];
    })
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

function Markdown({ content }) {
  const blocks = parseBlocks(content);

  return (
    <Box
      sx={{
        fontSize: "17px",
        lineHeight: 1.85,
        "& p": { my: 2 },
        "& strong": { fontWeight: 700 },
        "& a": { color: "inherit" },
      }}
    >
      {blocks.map((block, index) => {
        const key = `block-${index}`;

        switch (block.type) {
          case "heading": {
            const style = headings[block.level] || headings[3];
            return (
              <Box
                key={key}
                component={`h${block.level}`}
                id={headingId(block.text)}
                sx={{
                  fontFamily: "Inter, sans-serif",
                  fontWeight: 600,
                  lineHeight: 1.3,
                  scrollMarginTop: "80px",
                  ...style,
                }}
              >
                {renderInline(block.text, key)}
              </Box>
            );
          }
          case "code":
            return (
              <Box
                key={key}
                component="pre"
                sx={{
                  my: 3,
                  p: 2,
                  borderRadius: 2,
                  overflowX: "auto",
                  backgroundColor: "rgba(127, 127, 127, 0.14)",
                  fontSize: "14px",
                  lineHeight: 1.6,
                }}
              >
                <Box
                  component="code"
                  sx={{
                    fontFamily:
                      'ui-monospace, SFMono-Regular, Menlo, Consolas, "Liberation Mono", monospace',
                  }}
                >
                  {block.text}
                </Box>
              </Box>
            );
          case "quote":
            return (
              <Box
                key={key}
                component="blockquote"
                sx={{
                  my: 3,
                  mx: 0,
                  pl: 2.5,
                  borderLeft: "3px solid",
                  borderColor: "divider",
                  color: "text.secondary",
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
                sx={{ my: 2, pl: 3 }}
              >
                {block.items.map((item, itemIndex) => (
                  <Box
                    key={`${key}-${itemIndex}`}
                    component="li"
                    sx={{ my: 0.5 }}
                  >
                    {renderInline(item, `${key}-${itemIndex}`)}
                  </Box>
                ))}
              </Box>
            );
          case "hr":
            return (
              <Box key={key} component="hr" sx={{ my: 4, borderColor: "divider" }} />
            );
          case "image":
            return (
              <Box
                key={key}
                component="img"
                src={block.src}
                alt={block.alt}
                sx={{
                  display: "block",
                  maxWidth: "100%",
                  borderRadius: 2,
                  my: 3,
                }}
              />
            );
          default:
            return (
              <Box key={key} component="p" sx={{ my: 2 }}>
                {renderInline(block.text, key)}
              </Box>
            );
        }
      })}
    </Box>
  );
}

export default Markdown;
