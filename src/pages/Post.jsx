import React, { useEffect } from "react";
import { Box, Chip, Divider, Link, Stack, Typography } from "@mui/material";
import ArrowBackRoundedIcon from "@mui/icons-material/ArrowBackRounded";
import ArrowForwardRoundedIcon from "@mui/icons-material/ArrowForwardRounded";
import { Link as RouterLink, useParams } from "react-router-dom";
import CoverArt from "../components/CoverArt";
import Markdown from "../components/Markdown";
import ReadingProgress from "../components/ReadingProgress";
import ShareBar from "../components/ShareBar";
import TableOfContents from "../components/TableOfContents";
import NotFound from "./NotFound";
import {
  formatDate,
  getWritingBySlug,
  getWritingNeighbours,
  postUrl,
} from "../utils/writings";

function NeighbourCard({ post, direction }) {
  const isNext = direction === "next";

  return (
    <Link
      component={RouterLink}
      to={`/writings/${post.slug}`}
      underline="none"
      sx={{
        display: "block",
        flex: 1,
        minWidth: 0,
        p: 2.25,
        borderRadius: 2.5,
        border: "1px solid",
        borderColor: "divider",
        color: "inherit",
        transition: "border-color 160ms ease, background-color 160ms ease",
        "&:hover": { borderColor: "text.secondary", backgroundColor: "action.hover" },
      }}
    >
      <Stack
        direction="row"
        spacing={1}
        alignItems="center"
        justifyContent={isNext ? "flex-end" : "flex-start"}
        sx={{ mb: 0.75, color: "text.secondary" }}
      >
        {!isNext && <ArrowBackRoundedIcon sx={{ fontSize: 15 }} />}
        <Typography sx={{ fontSize: 11.5, letterSpacing: "0.08em", textTransform: "uppercase" }}>
          {isNext ? "Sonraki yazı" : "Önceki yazı"}
        </Typography>
        {isNext && <ArrowForwardRoundedIcon sx={{ fontSize: 15 }} />}
      </Stack>
      <Typography
        sx={{
          fontWeight: 600,
          fontSize: 15,
          lineHeight: 1.4,
          letterSpacing: "-0.01em",
          textAlign: isNext ? "right" : "left",
        }}
      >
        {post.title}
      </Typography>
    </Link>
  );
}

function Post() {
  const { slug } = useParams();
  const post = getWritingBySlug(slug);
  const { previous, next } = getWritingNeighbours(slug);

  useEffect(() => {
    document.title = post ? `${post.title} · Hüseyin Afşin` : "Yazı bulunamadı";

    if (post) {
      const description = document.querySelector('meta[name="description"]');
      if (description) description.setAttribute("content", post.summary || post.title);
      const ogTitle = document.querySelector('meta[property="og:title"]');
      if (ogTitle) ogTitle.setAttribute("content", post.title);
      const ogDescription = document.querySelector('meta[property="og:description"]');
      if (ogDescription) ogDescription.setAttribute("content", post.summary || "");
    }
  }, [post]);

  if (!post) {
    return <NotFound />;
  }

  return (
    <Box component="article">
      <ReadingProgress />

      <Link
        component={RouterLink}
        to="/"
        underline="none"
        sx={{
          display: "inline-flex",
          alignItems: "center",
          gap: 0.75,
          color: "text.secondary",
          fontSize: 13.5,
          mb: 3,
          "&:hover": { color: "text.primary" },
        }}
      >
        <ArrowBackRoundedIcon sx={{ fontSize: 17 }} />
        Tüm yazılar
      </Link>

      <Typography
        component="h1"
        variant="h1"
        sx={{
          fontSize: { xs: "2.15rem", sm: "2.9rem" },
          lineHeight: 1.08,
          mb: 2,
        }}
      >
        {post.title}
      </Typography>

      <Stack
        direction="row"
        spacing={1.25}
        alignItems="center"
        sx={{
          color: "text.secondary",
          fontSize: 13,
          mb: 3,
          flexWrap: "wrap",
          rowGap: 0.75,
        }}
      >
        <span>{formatDate(post.date)}</span>
        <Box component="span" sx={{ opacity: 0.45 }}>
          ·
        </Box>
        <span>{post.readingTime} dk okuma</span>
        {post.tags.length > 0 && (
          <>
            <Box component="span" sx={{ opacity: 0.45 }}>
              ·
            </Box>
            <Stack direction="row" spacing={0.75}>
              {post.tags.map((tag) => (
                <Chip
                  key={tag}
                  label={`#${tag}`}
                  size="small"
                  variant="outlined"
                  sx={{ height: 22, fontSize: 11.5, borderColor: "divider" }}
                />
              ))}
            </Stack>
          </>
        )}
      </Stack>

      {post.cover && <CoverArt post={post} ratio="16 / 9" radius={2.5} />}

      {post.summary && (
        <Typography
          sx={{
            fontSize: { xs: 17, sm: 19 },
            lineHeight: 1.7,
            color: "text.secondary",
            mt: 4,
            mb: 4,
            maxWidth: "60ch",
          }}
        >
          {post.summary}
        </Typography>
      )}

      <TableOfContents content={post.content} />

      <Markdown content={post.content} />

      <Box sx={{ mt: 6 }}>
        <ShareBar post={post} url={postUrl(post)} />
      </Box>

      {(previous || next) && (
        <Box sx={{ mt: 4 }}>
          <Divider sx={{ mb: 3 }} />
          <Stack direction={{ xs: "column", sm: "row" }} spacing={2}>
            {previous && <NeighbourCard post={previous} direction="previous" />}
            {next && <NeighbourCard post={next} direction="next" />}
          </Stack>
        </Box>
      )}
    </Box>
  );
}

export default Post;
