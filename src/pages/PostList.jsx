import React, { useEffect, useMemo, useState } from "react";
import {
  Box,
  ButtonBase,
  Chip,
  InputAdornment,
  InputBase,
  Stack,
  Typography,
} from "@mui/material";
import SearchRoundedIcon from "@mui/icons-material/SearchRounded";
import ArrowOutwardRoundedIcon from "@mui/icons-material/ArrowOutwardRounded";
import { Link as RouterLink } from "react-router-dom";
import { formatDate, getAllTags, getAllWritings } from "../utils/writings";

function PostRow({ post }) {
  return (
    <ButtonBase
      component={RouterLink}
      to={`/writings/${post.slug}`}
      focusRipple
      sx={{
        display: "block",
        width: "100%",
        textAlign: "left",
        py: { xs: 3, sm: 3.5 },
        px: { xs: 0, sm: 2 },
        mx: { xs: 0, sm: -2 },
        borderRadius: 2,
        color: "inherit",
        transition: "background-color 160ms ease",
        "&:hover": { backgroundColor: "action.hover" },
        "&:hover .post-arrow": { opacity: 1, transform: "translate(0, 0)" },
      }}
    >
      <Stack
        direction={{ xs: "column", sm: "row" }}
        spacing={{ xs: 0.75, sm: 3 }}
        alignItems="baseline"
      >
        <Typography
          variant="caption"
          sx={{
            color: "text.secondary",
            fontSize: 13,
            whiteSpace: "nowrap",
            minWidth: 128,
            fontVariantNumeric: "tabular-nums",
          }}
        >
          {formatDate(post.date)}
        </Typography>

        <Box sx={{ flex: 1 }}>
          <Stack direction="row" spacing={1} alignItems="center">
            <Typography
              component="h2"
              sx={{
                fontFamily: '"Inter", sans-serif',
                fontWeight: 600,
                fontSize: { xs: "1.1rem", sm: "1.2rem" },
                letterSpacing: "-0.02em",
                lineHeight: 1.35,
                color: "text.primary",
              }}
            >
              {post.title}
            </Typography>
            <ArrowOutwardRoundedIcon
              className="post-arrow"
              sx={{
                fontSize: 18,
                color: "text.secondary",
                opacity: 0,
                transform: "translate(-4px, 4px)",
                transition: "all 160ms ease",
                flexShrink: 0,
              }}
            />
          </Stack>

          {post.summary && (
            <Typography
              sx={{
                mt: 0.75,
                color: "text.secondary",
                fontSize: 15,
                lineHeight: 1.65,
                maxWidth: "62ch",
              }}
            >
              {post.summary}
            </Typography>
          )}

          <Stack
            direction="row"
            spacing={1.5}
            alignItems="center"
            sx={{ mt: 1.25, flexWrap: "wrap", rowGap: 0.75 }}
          >
            <Typography
              variant="caption"
              sx={{ color: "text.secondary", fontSize: 12.5 }}
            >
              {post.readingTime} dk okuma
            </Typography>
            {post.tags.map((tag) => (
              <Typography
                key={tag}
                variant="caption"
                sx={{ color: "text.secondary", fontSize: 12.5 }}
              >
                #{tag}
              </Typography>
            ))}
          </Stack>
        </Box>
      </Stack>
    </ButtonBase>
  );
}

function PostList() {
  const writings = getAllWritings();
  const tags = useMemo(() => getAllTags(), []);
  const [activeTag, setActiveTag] = useState("Tümü");
  const [query, setQuery] = useState("");

  useEffect(() => {
    document.title = "Hüseyin Afşin · Yazılar";
  }, []);

  const filtered = useMemo(() => {
    const normalized = query.trim().toLocaleLowerCase("tr");
    return writings.filter((post) => {
      const matchesTag = activeTag === "Tümü" || post.tags.includes(activeTag);
      if (!matchesTag) return false;
      if (!normalized) return true;
      const haystack = [post.title, post.summary, post.tags.join(" ")]
        .join(" ")
        .toLocaleLowerCase("tr");
      return haystack.includes(normalized);
    });
  }, [writings, activeTag, query]);

  return (
    <Box>
      <Box sx={{ mb: { xs: 5, sm: 7 } }}>
        <Typography
          sx={{
            fontSize: 12,
            fontWeight: 600,
            letterSpacing: "0.14em",
            textTransform: "uppercase",
            color: "text.secondary",
            mb: 2,
          }}
        >
          Yazılar
        </Typography>
        <Typography
          component="h1"
          variant="h1"
          sx={{
            fontSize: { xs: "2.6rem", sm: "3.4rem" },
            lineHeight: 1.05,
            mb: 2,
            maxWidth: "18ch",
          }}
        >
          Yazılım üzerine notlar.
        </Typography>
        <Typography
          sx={{
            color: "text.secondary",
            fontSize: { xs: 16, sm: 17 },
            lineHeight: 1.7,
            maxWidth: "58ch",
          }}
        >
          Geliştirme sürecinde öğrendiklerim, mimari kararlar ve kullandığım
          araçlara dair kısa, uygulanabilir yazılar.
        </Typography>
      </Box>

      <Stack
        direction={{ xs: "column", sm: "row" }}
        spacing={2}
        alignItems={{ xs: "stretch", sm: "center" }}
        justifyContent="space-between"
        sx={{ mb: 3 }}
      >
        <Box
          sx={{
            display: "flex",
            gap: 1,
            flexWrap: "wrap",
            rowGap: 1,
          }}
        >
          {[{ name: "Tümü", count: writings.length }, ...tags].map((tag) => {
            const selected = activeTag === tag.name;
            return (
              <Chip
                key={tag.name}
                label={
                  tag.name === "Tümü" ? tag.name : `${tag.name} · ${tag.count}`
                }
                onClick={() => setActiveTag(tag.name)}
                size="small"
                variant={selected ? "filled" : "outlined"}
                sx={{
                  height: 30,
                  fontSize: 13,
                  backgroundColor: selected ? "text.primary" : "transparent",
                  color: selected ? "background.default" : "text.secondary",
                  borderColor: "divider",
                  "&:hover": {
                    backgroundColor: selected ? "text.primary" : "action.hover",
                  },
                }}
              />
            );
          })}
        </Box>

        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            gap: 1,
            px: 1.5,
            height: 38,
            borderRadius: 999,
            border: "1px solid",
            borderColor: "divider",
            minWidth: { sm: 220 },
            color: "text.secondary",
          }}
        >
          <SearchRoundedIcon sx={{ fontSize: 18 }} />
          <InputBase
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="Yazılarda ara"
            inputProps={{ "aria-label": "Yazılarda ara" }}
            sx={{
              fontSize: 14,
              flex: 1,
              color: "text.primary",
              "& input::placeholder": {
                color: "text.secondary",
                opacity: 1,
              },
              "& input": { p: 0 },
            }}
            endAdornment={
              query ? (
                <InputAdornment position="end">
                  <Box
                    component="button"
                    onClick={() => setQuery("")}
                    sx={{
                      border: 0,
                      background: "none",
                      cursor: "pointer",
                      color: "text.secondary",
                      fontSize: 12,
                      p: 0,
                    }}
                  >
                    temizle
                  </Box>
                </InputAdornment>
              ) : null
            }
          />
        </Box>
      </Stack>

      <Box sx={{ borderTop: "1px solid", borderColor: "divider" }}>
        {filtered.length > 0 ? (
          filtered.map((post) => <PostRow key={post.slug} post={post} />)
        ) : (
          <Box sx={{ py: 8, textAlign: "center" }}>
            <Typography sx={{ fontWeight: 600, mb: 0.75 }}>
              Sonuç bulunamadı
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Farklı bir kelime veya etiket deneyin.
            </Typography>
          </Box>
        )}
      </Box>
    </Box>
  );
}

export default PostList;
