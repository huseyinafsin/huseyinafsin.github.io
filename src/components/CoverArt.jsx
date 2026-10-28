import React from "react";
import { Box } from "@mui/material";
import { initialsFor, paletteFor } from "../utils/visuals";

/**
 * Kapak görseli olan yazılarda görseli, olmayanlarda yazıya özel üretilen
 * gradyanı gösteren kapak bileşeni.
 */
function CoverArt({
  post,
  ratio = "16 / 9",
  radius = 2,
  children,
  scrim = true,
  showInitials = true,
}) {
  const palette = paletteFor(post.slug || post.title);

  return (
    <Box
      sx={{
        position: "relative",
        width: "100%",
        aspectRatio: ratio,
        borderRadius: radius,
        overflow: "hidden",
        backgroundColor: palette.ink,
        backgroundImage: post.cover ? "none" : palette.css,
        isolation: "isolate",
      }}
    >
      {post.cover && (
        <Box
          component="img"
          src={post.cover}
          alt=""
          loading="lazy"
          sx={{
            position: "absolute",
            inset: 0,
            width: "100%",
            height: "100%",
            objectFit: "cover",
          }}
        />
      )}

      {showInitials && !post.cover && (
        <Box
          aria-hidden="true"
          sx={{
            position: "absolute",
            right: "-2%",
            bottom: "-14%",
            fontFamily: '"Instrument Serif", Georgia, serif',
            fontSize: { xs: 96, sm: 150 },
            lineHeight: 1,
            color: "rgba(255,255,255,0.14)",
            letterSpacing: "-0.04em",
            userSelect: "none",
          }}
        >
          {initialsFor(post.title)}
        </Box>
      )}

      {scrim && (
        <Box
          aria-hidden="true"
          sx={{
            position: "absolute",
            inset: 0,
            background:
              "linear-gradient(180deg, rgba(0,0,0,0) 20%, rgba(0,0,0,0.18) 55%, rgba(0,0,0,0.62) 100%)",
          }}
        />
      )}

      {children}
    </Box>
  );
}

export default CoverArt;
