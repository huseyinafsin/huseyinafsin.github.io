import React from "react";
import { Box, Link, Stack, Typography } from "@mui/material";
import { extractHeadings } from "../utils/text";

function TableOfContents({ content }) {
  const headings = extractHeadings(content);

  if (headings.length < 2) return null;

  return (
    <Box
      component="nav"
      aria-label="İçindekiler"
      sx={{
        mb: 4,
        p: { xs: 2, sm: 2.5 },
        borderRadius: 2,
        border: "1px solid",
        borderColor: "divider",
        backgroundColor: "action.hover",
      }}
    >
      <Typography
        sx={{
          fontSize: 11,
          fontWeight: 600,
          letterSpacing: "0.12em",
          textTransform: "uppercase",
          color: "text.secondary",
          mb: 1.25,
        }}
      >
        İçindekiler
      </Typography>
      <Stack spacing={0.75}>
        {headings.map((heading) => (
          <Link
            key={heading.id}
            href={`#${heading.id}`}
            underline="none"
            sx={{
              fontSize: 14,
              color: heading.level === 3 ? "text.secondary" : "text.primary",
              pl: heading.level === 3 ? 2 : 0,
              py: 0.15,
              "&:hover": { color: "text.primary", textDecoration: "underline" },
            }}
          >
            {heading.text}
          </Link>
        ))}
      </Stack>
    </Box>
  );
}

export default TableOfContents;
