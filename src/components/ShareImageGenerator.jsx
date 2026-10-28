import React, { useEffect, useRef, useState } from "react";
import {
  Box,
  Button,
  Dialog,
  DialogContent,
  DialogTitle,
  IconButton,
  Stack,
  Tab,
  Tabs,
  Typography,
} from "@mui/material";
import CloseRoundedIcon from "@mui/icons-material/CloseRounded";
import DownloadRoundedIcon from "@mui/icons-material/DownloadRounded";
import WhatsAppIcon from "@mui/icons-material/WhatsApp";
import { SHARE_SIZES, downloadCanvas, drawShareImage } from "../utils/shareImage";

function ShareCanvas({ canvasRef, title, date, tags, seed, sizeId }) {
  const active = SHARE_SIZES.find((size) => size.id === sizeId) || SHARE_SIZES[0];

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    drawShareImage(canvas, {
      width: active.width,
      height: active.height,
      title: title || "Başlıksız yazı",
      date: date || "",
      tags: tags || [],
      kind: active.id,
      seed: seed || title,
    });
  }, [canvasRef, active.id, active.width, active.height, title, date, tags, seed]);

  return (
    <Box
      component="canvas"
      ref={canvasRef}
      role="img"
      aria-label="Paylaşım görseli önizlemesi"
      sx={{
        width: "100%",
        maxWidth: active.id === "story" ? 250 : "100%",
        height: "auto",
        borderRadius: 1.5,
        boxShadow: "0 18px 46px -22px rgba(0,0,0,0.6)",
        display: "block",
        mx: "auto",
      }}
    />
  );
}

function ShareImageGenerator({ open, onClose, title, date, tags, seed, url, inline }) {
  const [sizeId, setSizeId] = useState(SHARE_SIZES[0].id);
  const canvasRef = useRef(null);

  const handleDownload = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const active = SHARE_SIZES.find((size) => size.id === sizeId) || SHARE_SIZES[0];
    const slug = String(seed || title || "yazi")
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/^-+|-+$/g, "")
      .slice(0, 40);
    downloadCanvas(canvas, `paylasim-${active.id}-${slug}.png`);
  };

  const shareText = [title, url].filter(Boolean).join("\n");

  const body = (
    <Box>
      <Box
        sx={{
          display: "grid",
          placeItems: "center",
          p: inline ? 0 : { xs: 1.5, sm: 2.5 },
          borderRadius: 2,
          border: inline ? 0 : "1px dashed",
          borderColor: "divider",
          backgroundColor: inline ? "transparent" : "action.hover",
          mb: inline ? 1.5 : 2,
        }}
      >
        <ShareCanvas
          canvasRef={canvasRef}
          title={title}
          date={date}
          tags={tags}
          seed={seed}
          sizeId={sizeId}
        />
      </Box>

      <Tabs
        value={sizeId}
        onChange={(event, value) => setSizeId(value)}
        variant="scrollable"
        allowScrollButtonsMobile
        sx={{
          mb: 1.5,
          minHeight: 36,
          borderBottom: "1px solid",
          borderColor: "divider",
          "& .MuiTab-root": { minHeight: 36, minWidth: 0, px: 1.25, fontSize: 12.5 },
        }}
      >
        {SHARE_SIZES.map((size) => (
          <Tab key={size.id} value={size.id} label={size.label} />
        ))}
      </Tabs>

      <Stack
        direction={inline ? "column" : { xs: "column", sm: "row" }}
        spacing={1}
        sx={{ mt: 1.5 }}
      >
        <Button
          variant="contained"
          size="small"
          startIcon={<DownloadRoundedIcon sx={{ fontSize: 17 }} />}
          onClick={handleDownload}
          sx={{ height: 36 }}
        >
          PNG indir
        </Button>

        <Button
          component="a"
          href={`https://wa.me/?text=${encodeURIComponent(shareText)}`}
          target="_blank"
          rel="noopener noreferrer"
          variant="outlined"
          size="small"
          startIcon={<WhatsAppIcon sx={{ fontSize: 17 }} />}
          sx={{ borderColor: "divider", color: "text.primary", height: 36 }}
        >
          WhatsApp
        </Button>
      </Stack>

      {!inline && (
        <Typography
          variant="caption"
          color="text.secondary"
          sx={{ display: "block", mt: 1.75, lineHeight: 1.6 }}
        >
          Instagram için görseli indirip uygulamadan yükleyebilirsiniz. Kare boyut
          gönderiler, hikâye boyutu 9:16 hikâyeler için uygundur.
        </Typography>
      )}
    </Box>
  );

  if (inline) return body;

  return (
    <Dialog open={open} onClose={onClose} maxWidth="md" fullWidth>
      <DialogTitle sx={{ pr: 7, fontWeight: 600, fontSize: 18 }}>
        Paylaşım görseli
        <IconButton
          onClick={onClose}
          aria-label="Kapat"
          sx={{ position: "absolute", right: 12, top: 12 }}
        >
          <CloseRoundedIcon />
        </IconButton>
      </DialogTitle>
      <DialogContent sx={{ pb: 3 }}>{body}</DialogContent>
    </Dialog>
  );
}
export default ShareImageGenerator;
