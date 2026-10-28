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
import ArrowForwardRoundedIcon from "@mui/icons-material/ArrowForwardRounded";
import { Link as RouterLink } from "react-router-dom";
import CoverArt from "../components/CoverArt";
import { formatDate, getAllTags, getAllWritings } from "../utils/writings";

function FeaturedPost({ post }) {
  return (
    <ButtonBase
      component={RouterLink}
      to={`/writings/${post.slug}`}
      focusRipple
      sx={{
        display: "block",
        width: "100%",
        textAlign: "left",
        borderRadius: 3,
        overflow: "hidden",
        mb: { xs: 5, sm: 6 },
        "&:hover .featured-arrow": { transform: "translate(2px, -2px)" },
        "&:hover .featured-title": { textDecorationColor: "currentColor" },
      }}
    >
      <CoverArt post={post} ratio={{ xs: "4 / 3", sm: "16 / 9" }} radius={3}>
        <Stack
          justifyContent="flex-end"
          sx={{ position: "absolute", inset: 0, p: { xs: 2.5, sm: 4 } }}
        >
          <Stack direction="row" spacing={1} alignItems="center" sx={{ mb: 1.5 }}>
            <Chip
              label="Son yazı"
              size="small"
              sx={{
                height: 24,
                fontSize: 11,
                fontWeight: 600,
                letterSpacing: "0.06em",
                textTransform: "uppercase",
                bgcolor: "rgba(255,255,255,0.9)",
                color: "#18181b",
              }}
            />
            <Typography sx={{ fontSize: 12.5, color: "rgba(255,255,255,0.85)" }}>
              {formatDate(post.date)} · {post.readingTime} dk
            </Typography>
          </Stack>

          <Typography
            className="featured-title"
            sx={{
              fontFamily: '"Instrument Serif", Georgia, serif',
              fontSize: { xs: "1.75rem", sm: "2.5rem" },
              lineHeight: 1.12,
              letterSpacing: "-0.02em",
              color: "#fff",
              textDecoration: "underline",
              textDecorationColor: "transparent",
              textDecorationThickness: "1px",
              textUnderlineOffset: "4px",
              mb: 1.25,
              maxWidth: "24ch",
            }}
          >
            {post.title}
          </Typography>

          {post.summary && (
            <Typography
              sx={{
                fontSize: { xs: 13.5, sm: 15 },
                lineHeight: 1.6,
                color: "rgba(255,255,255,0.82)",
                maxWidth: "56ch",
                display: { xs: "none", sm: "block" },
              }}
            >
              {post.summary}
            </Typography>
          )}

          <Stack direction="row" spacing={1} alignItems="center" sx={{ mt: 2 }}>
            <Typography
              sx={{
                fontSize: 13,
                fontWeight: 500,
                color: "#fff",
                display: "inline-flex",
                alignItems: "center",
                gap: 0.5,
              }}
            >
              Yazıyı oku
              <ArrowForwardRoundedIcon
                className="featured-arrow"
                sx={{ fontSize: 16, transition: "transform 160ms ease" }}
              />
            </Typography>
          </Stack>
        </Stack>
      </CoverArt>
    </ButtonBase>
  );
}

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
        py: { xs: 2.75, sm: 3 },
        px: { xs: 0, sm: 2 },
        mx: { xs: 0, sm: -2 },
        borderRadius: 2,
        color: "inherit",
        transition: "background-color 160ms ease",
        "&:hover": { backgroundColor: "action.hover" },
        "&:hover .post-arrow": { opacity: 1, transform: "translate(0, 0)" },
        "&:hover .post-cover": { transform: "scale(1.04)" },
      }}
    >
      <Stack direction="row" spacing={{ xs: 2, sm: 3 }} alignItems="flex-start">
        <Box sx={{ flex: 1, minWidth: 0 }}>
          <Typography
            sx={{
              color: "text.secondary",
              fontSize: 12.5,
              mb: 0.75,
              fontVariantNumeric: "tabular-nums",
            }}
          >
            {formatDate(post.date)} · {post.readingTime} dk okuma
          </Typography>

          <Stack direction="row" spacing={1} alignItems="center">
            <Typography
              component="h2"
              sx={{
                fontWeight: 600,
                fontSize: { xs: "1.05rem", sm: "1.18rem" },
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
                fontSize: 17,
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
                fontSize: 14.5,
                lineHeight: 1.65,
                maxWidth: "60ch",
                display: "-webkit-box",
                WebkitLineClamp: 2,
                WebkitBoxOrient: "vertical",
                overflow: "hidden",
              }}
            >
              {post.summary}
            </Typography>
          )}

          <Stack
            direction="row"
            spacing={1.5}
            alignItems="center"
            sx={{ mt: 1.25, flexWrap: "wrap", rowGap: 0.5 }}
          >
            {post.tags.map((tag) => (
              <Typography
                key={tag}
                sx={{ color: "text.secondary", fontSize: 12.5 }}
              >
                #{tag}
              </Typography>
            ))}
          </Stack>
        </Box>

        <Box
          className="post-cover"
          sx={{
            width: { xs: 76, sm: 108 },
            flexShrink: 0,
            borderRadius: 1.5,
            overflow: "hidden",
            transition: "transform 220ms ease",
            display: { xs: "none", sm: "block" },
          }}
        >
          <CoverArt post={post} ratio="4 / 3" radius={1.5} showInitials={false} />
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
    document.title = "Hüseyin Afşin · Yazılım Notları";
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

  const featured = activeTag === "Tümü" && !query ? writings[0] : null;
  const visibleRest = filtered.filter((post) => !featured || post.slug !== featured.slug);

  return (
    <Box>
      <Box sx={{ mb: { xs: 5, sm: 6 } }}>
        <Stack direction="row" spacing={1.25} alignItems="center" sx={{ mb: 2 }}>
          <Box
            sx={{
              width: 24,
              height: 1,
              bgcolor: "text.secondary",
              opacity: 0.4,
            }}
          />
          <Typography
            sx={{
              fontSize: 11.5,
              fontWeight: 600,
              letterSpacing: "0.16em",
              textTransform: "uppercase",
              color: "text.secondary",
            }}
          >
            Yazılar · {writings.length}
          </Typography>
        </Stack>

        <Typography
          component="h1"
          variant="h1"
          sx={{
            fontSize: { xs: "2.6rem", sm: "3.6rem" },
            lineHeight: 1.02,
            mb: 2,
            maxWidth: "16ch",
          }}
        >
          Yazılım üzerine notlar.
        </Typography>

        <Typography
          sx={{
            color: "text.secondary",
            fontSize: { xs: 15.5, sm: 17 },
            lineHeight: 1.7,
            maxWidth: "56ch",
          }}
        >
          Geliştirme sürecinde öğrendiklerim, mimari kararlar ve kullandığım
          araçlara dair kısa, uygulanabilir yazılar.
        </Typography>
      </Box>

      {featured && <FeaturedPost post={featured} />}

      <Stack
        direction={{ xs: "column", sm: "row" }}
        spacing={2}
        alignItems={{ xs: "stretch", sm: "center" }}
        justifyContent="space-between"
        sx={{ mb: 2.5 }}
      >
        <Box sx={{ display: "flex", gap: 1, flexWrap: "wrap", rowGap: 1 }}>
          {[{ name: "Tümü", count: writings.length }, ...tags].map((tag) => {
            const selected = activeTag === tag.name;
            return (
              <Chip
                key={tag.name}
                label={tag.name === "Tümü" ? "Tümü" : `${tag.name} · ${tag.count}`}
                onClick={() => setActiveTag(tag.name)}
                size="small"
                variant={selected ? "filled" : "outlined"}
                sx={{
                  height: 30,
                  fontSize: 12.5,
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
            minWidth: { sm: 210 },
            color: "text.secondary",
          }}
        >
          <SearchRoundedIcon sx={{ fontSize: 17 }} />
          <InputBase
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="Yazılarda ara"
            inputProps={{ "aria-label": "Yazılarda ara" }}
            sx={{
              fontSize: 13.5,
              flex: 1,
              color: "text.primary",
              "& input::placeholder": { color: "text.secondary", opacity: 1 },
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
                      fontFamily: "inherit",
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

      <Box
        sx={{
          borderTop: "1px solid",
          borderColor: "divider",
        }}
      >
        {visibleRest.length > 0 ? (
          visibleRest.map((post) => <PostRow key={post.slug} post={post} />)
        ) : (
          <Box sx={{ py: 8, textAlign: "center" }}>
            <Typography sx={{ fontWeight: 600, mb: 0.75 }}>
              {writings.length === 0 ? "Henüz yazı yok" : "Sonuç bulunamadı"}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              {writings.length === 0
                ? "İlk yazıyı eklemek için stüdyoyu kullanabilirsiniz."
                : "Farklı bir kelime veya etiket deneyin."}
            </Typography>
          </Box>
        )}
      </Box>
    </Box>
  );
}

export default PostList;
