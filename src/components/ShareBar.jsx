import React, { useState } from "react";
import {
  Box,
  Button,
  IconButton,
  Stack,
  Tooltip,
  Typography,
} from "@mui/material";
import WhatsAppIcon from "@mui/icons-material/WhatsApp";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import TwitterIcon from "@mui/icons-material/Twitter";
import LinkRoundedIcon from "@mui/icons-material/LinkRounded";
import CheckRoundedIcon from "@mui/icons-material/CheckRounded";
import ImageRoundedIcon from "@mui/icons-material/ImageRounded";
import ShareImageGenerator from "./ShareImageGenerator";

function ShareBar({ post, url, compact = false }) {
  const [copied, setCopied] = useState(false);
  const [generatorOpen, setGeneratorOpen] = useState(false);

  const text = `${post.title} · ${post.summary || ""}`.trim();

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(url);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 1800);
    } catch (error) {
      // Pano erişimi yoksa yoksay.
    }
  };

  const items = [
    {
      label: "WhatsApp",
      icon: <WhatsAppIcon sx={{ fontSize: 19 }} />,
      href: `https://wa.me/?text=${encodeURIComponent(`${text}\n${url}`)}`,
    },
    {
      label: "LinkedIn",
      icon: <LinkedInIcon sx={{ fontSize: 19 }} />,
      href: `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`,
    },
    {
      label: "X",
      icon: <TwitterIcon sx={{ fontSize: 17 }} />,
      href: `https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}&url=${encodeURIComponent(url)}`,
    },
  ];

  return (
    <Box
      sx={{
        border: "1px solid",
        borderColor: "divider",
        borderRadius: 2.5,
        p: { xs: 2, sm: compact ? 2 : 2.5 },
        backgroundColor: "background.paper",
      }}
    >
      <Stack
        direction={{ xs: "column", sm: "row" }}
        spacing={2}
        alignItems={{ xs: "flex-start", sm: "center" }}
        justifyContent="space-between"
      >
        <Box>
          <Typography sx={{ fontWeight: 600, fontSize: 14.5, mb: 0.25 }}>
            Bu yazıyı paylaş
          </Typography>
          <Typography variant="caption" color="text.secondary">
            Bağlantıyı gönder veya Instagram için hazır görsel oluştur.
          </Typography>
        </Box>

        <Stack direction="row" spacing={1} alignItems="center" flexWrap="wrap" rowGap={1}>
          {items.map((item) => (
            <Tooltip key={item.label} title={item.label}>
              <IconButton
                component="a"
                href={item.href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={item.label}
                size="small"
                sx={{
                  width: 38,
                  height: 38,
                  border: "1px solid",
                  borderColor: "divider",
                  color: "text.primary",
                  "&:hover": { backgroundColor: "action.hover" },
                }}
              >
                {item.icon}
              </IconButton>
            </Tooltip>
          ))}

          <Tooltip title={copied ? "Kopyalandı" : "Bağlantıyı kopyala"}>
            <IconButton
              onClick={copy}
              size="small"
              aria-label="Bağlantıyı kopyala"
              sx={{
                width: 38,
                height: 38,
                border: "1px solid",
                borderColor: "divider",
                color: "text.primary",
              }}
            >
              {copied ? (
                <CheckRoundedIcon sx={{ fontSize: 18 }} />
              ) : (
                <LinkRoundedIcon sx={{ fontSize: 18 }} />
              )}
            </IconButton>
          </Tooltip>

          <Button
            size="small"
            variant="outlined"
            startIcon={<ImageRoundedIcon />}
            onClick={() => setGeneratorOpen(true)}
            sx={{
              borderColor: "divider",
              color: "text.primary",
              height: 38,
              px: 1.75,
            }}
          >
            Görsel oluştur
          </Button>
        </Stack>
      </Stack>

      <ShareImageGenerator
        open={generatorOpen}
        onClose={() => setGeneratorOpen(false)}
        title={post.title}
        date={post.date}
        tags={post.tags}
        seed={post.slug}
        url={url}
      />
    </Box>
  );
}

export default ShareBar;
