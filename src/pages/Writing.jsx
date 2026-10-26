import React, { useEffect } from "react";
import {
  Box,
  Button,
  Chip,
  Divider,
  Grid,
  Typography,
} from "@mui/material";
import ArrowBackRoundedIcon from "@mui/icons-material/ArrowBackRounded";
import ArrowForwardRoundedIcon from "@mui/icons-material/ArrowForwardRounded";
import { Link as RouterLink, useParams } from "react-router-dom";
import Markdown from "../components/Markdown";
import {
  formatDate,
  getWritingBySlug,
  getWritingNeighbours,
} from "../utils/writings";

function Writing() {
  const { slug } = useParams();
  const writing = getWritingBySlug(slug);
  const { previous, next } = getWritingNeighbours(slug);

  useEffect(() => {
    document.title = writing
      ? `${writing.title} | Hüseyin Afşin`
      : "Yazı bulunamadı | Hüseyin Afşin";
  }, [writing]);

  if (!writing) {
    return (
      <Box sx={{ py: 8, textAlign: "center" }}>
        <Typography variant="caption" component="p">
          404
        </Typography>
        <Typography variant="h5" sx={{ mb: 1 }}>
          Yazı bulunamadı
        </Typography>
        <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
          Aradığınız yazı kaldırılmış veya adresi değişmiş olabilir.
        </Typography>
        <Button
          component={RouterLink}
          to="/writings"
          variant="outlined"
          startIcon={<ArrowBackRoundedIcon />}
          sx={{ textTransform: "none" }}
        >
          Tüm yazılar
        </Button>
      </Box>
    );
  }

  return (
    <Box>
      <Button
        component={RouterLink}
        to="/writings"
        size="small"
        startIcon={<ArrowBackRoundedIcon />}
        sx={{ textTransform: "none", mb: 3 }}
      >
        Yazılar
      </Button>

      <Typography
        component="h1"
        sx={{
          fontFamily: "Inter, sans-serif",
          fontWeight: 600,
          fontSize: { xs: "1.9rem", md: "2.4rem" },
          lineHeight: 1.25,
          mt: 1,
          mb: 2,
        }}
      >
        {writing.title}
      </Typography>

      <Box
        sx={{
          display: "flex",
          flexWrap: "wrap",
          alignItems: "center",
          gap: 1.5,
          color: "text.secondary",
          fontSize: "14px",
          mb: writing.tags.length ? 2 : 3,
        }}
      >
        <span>{formatDate(writing.date)}</span>
        <span>·</span>
        <span>{writing.readingTime} dk okuma</span>
      </Box>

      {writing.tags.length > 0 && (
        <Box sx={{ display: "flex", flexWrap: "wrap", gap: 1, mb: 3 }}>
          {writing.tags.map((tag) => (
            <Chip key={tag} label={tag} size="small" variant="outlined" />
          ))}
        </Box>
      )}

      {writing.cover && (
        <Box
          component="img"
          src={writing.cover}
          alt=""
          sx={{ width: "100%", borderRadius: 2, mb: 3 }}
        />
      )}

      <Divider sx={{ mb: 3 }} />

      <Markdown content={writing.content} />

      {(previous || next) && (
        <Box sx={{ mt: 6 }}>
          <Divider sx={{ mb: 3 }} />
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              {previous && (
                <Button
                  component={RouterLink}
                  to={`/writings/${previous.slug}`}
                  startIcon={<ArrowBackRoundedIcon />}
                  sx={{
                    textTransform: "none",
                    textAlign: "left",
                    display: "flex",
                    justifyContent: "flex-start",
                  }}
                >
                  <Box>
                    <Typography variant="caption" color="text.secondary">
                      Önceki yazı
                    </Typography>
                    <Typography variant="body2">{previous.title}</Typography>
                  </Box>
                </Button>
              )}
            </Grid>
            <Grid item xs={12} sm={6}>
              {next && (
                <Button
                  component={RouterLink}
                  to={`/writings/${next.slug}`}
                  endIcon={<ArrowForwardRoundedIcon />}
                  sx={{
                    textTransform: "none",
                    textAlign: "right",
                    display: "flex",
                    justifyContent: "flex-end",
                    width: "100%",
                  }}
                >
                  <Box>
                    <Typography variant="caption" color="text.secondary">
                      Sonraki yazı
                    </Typography>
                    <Typography variant="body2">{next.title}</Typography>
                  </Box>
                </Button>
              )}
            </Grid>
          </Grid>
        </Box>
      )}
    </Box>
  );
}

export default Writing;
