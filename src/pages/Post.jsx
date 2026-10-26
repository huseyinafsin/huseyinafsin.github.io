import React, { useEffect, useState } from "react";
import {
  Box,
  Button,
  Divider,
  IconButton,
  Link,
  Stack,
  Tooltip,
  Typography,
} from "@mui/material";
import ArrowBackRoundedIcon from "@mui/icons-material/ArrowBackRounded";
import ArrowForwardRoundedIcon from "@mui/icons-material/ArrowForwardRounded";
import ContentCopyRoundedIcon from "@mui/icons-material/ContentCopyRounded";
import CheckRoundedIcon from "@mui/icons-material/CheckRounded";
import { Link as RouterLink, useParams } from "react-router-dom";
import Markdown from "../components/Markdown";
import NotFound from "./NotFound";
import {
  formatDate,
  getWritingBySlug,
  getWritingNeighbours,
} from "../utils/writings";

function Post() {
  const { slug } = useParams();
  const post = getWritingBySlug(slug);
  const { previous, next } = getWritingNeighbours(slug);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    document.title = post ? `${post.title} · Hüseyin Afşin` : "Yazı bulunamadı";
    setCopied(false);
  }, [post]);

  if (!post) {
    return <NotFound />;
  }

  const copyLink = async () => {
    try {
      await navigator.clipboard.writeText(window.location.href);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 2000);
    } catch (error) {
      // Pano erişimi yoksa sessizce yoksay.
    }
  };

  return (
    <Box component="article">
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
          mb: 4,
          "&:hover": { color: "text.primary" },
        }}
      >
        <ArrowBackRoundedIcon sx={{ fontSize: 18 }} />
        Tüm yazılar
      </Link>

      <Typography
        component="h1"
        variant="h1"
        sx={{
          fontSize: { xs: "2.3rem", sm: "3rem" },
          lineHeight: 1.1,
          mb: 2.5,
          maxWidth: "24ch",
        }}
      >
        {post.title}
      </Typography>

      <Stack
        direction="row"
        spacing={1.5}
        alignItems="center"
        sx={{ color: "text.secondary", fontSize: 13.5, mb: 1.5, flexWrap: "wrap", rowGap: 0.75 }}
      >
        <span>{formatDate(post.date)}</span>
        <Box component="span" sx={{ opacity: 0.5 }}>
          ·
        </Box>
        <span>{post.readingTime} dk okuma</span>
        {post.tags.length > 0 && (
          <>
            <Box component="span" sx={{ opacity: 0.5 }}>
              ·
            </Box>
            <span>{post.tags.map((tag) => `#${tag}`).join("  ")}</span>
          </>
        )}
        <Box sx={{ flex: 1 }} />
        <Tooltip title={copied ? "Kopyalandı" : "Bağlantıyı kopyala"}>
          <IconButton
            onClick={copyLink}
            size="small"
            aria-label="Bağlantıyı kopyala"
            sx={{ color: "text.secondary" }}
          >
            {copied ? (
              <CheckRoundedIcon sx={{ fontSize: 18 }} />
            ) : (
              <ContentCopyRoundedIcon sx={{ fontSize: 17 }} />
            )}
          </IconButton>
        </Tooltip>
      </Stack>

      <Divider sx={{ mb: { xs: 4, sm: 5 } }} />

      {post.summary && (
        <Typography
          sx={{
            fontSize: { xs: 17, sm: 19 },
            lineHeight: 1.7,
            color: "text.secondary",
            mb: 4,
            maxWidth: "60ch",
          }}
        >
          {post.summary}
        </Typography>
      )}

      {post.cover && (
        <Box
          component="img"
          src={post.cover}
          alt=""
          sx={{
            width: "100%",
            borderRadius: 2,
            mb: 4,
            display: "block",
          }}
        />
      )}

      <Markdown content={post.content} />

      {(previous || next) && (
        <Box sx={{ mt: 8 }}>
          <Divider sx={{ mb: 3 }} />
          <Stack
            direction={{ xs: "column", sm: "row" }}
            spacing={2}
            justifyContent="space-between"
          >
            {previous ? (
              <Button
                component={RouterLink}
                to={`/writings/${previous.slug}`}
                startIcon={<ArrowBackRoundedIcon />}
                sx={{
                  justifyContent: "flex-start",
                  textAlign: "left",
                  color: "text.primary",
                  px: 0,
                  py: 1,
                  minWidth: 0,
                  "& .MuiButton-startIcon": { alignSelf: "flex-start", mt: 0.25 },
                }}
              >
                <Box>
                  <Typography
                    sx={{ display: "block", fontSize: 12, color: "text.secondary" }}
                  >
                    Önceki yazı
                  </Typography>
                  <Typography sx={{ fontSize: 14.5, fontWeight: 500 }}>
                    {previous.title}
                  </Typography>
                </Box>
              </Button>
            ) : (
              <Box />
            )}

            {next && (
              <Button
                component={RouterLink}
                to={`/writings/${next.slug}`}
                endIcon={<ArrowForwardRoundedIcon />}
                sx={{
                  justifyContent: "flex-end",
                  textAlign: "right",
                  color: "text.primary",
                  px: 0,
                  py: 1,
                  minWidth: 0,
                  "& .MuiButton-endIcon": { alignSelf: "flex-start", mt: 0.25 },
                }}
              >
                <Box>
                  <Typography
                    sx={{ display: "block", fontSize: 12, color: "text.secondary" }}
                  >
                    Sonraki yazı
                  </Typography>
                  <Typography sx={{ fontSize: 14.5, fontWeight: 500 }}>
                    {next.title}
                  </Typography>
                </Box>
              </Button>
            )}
          </Stack>
        </Box>
      )}
    </Box>
  );
}

export default Post;
