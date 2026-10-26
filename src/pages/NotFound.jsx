import React, { useEffect } from "react";
import { Box, Button, Typography } from "@mui/material";
import ArrowBackRoundedIcon from "@mui/icons-material/ArrowBackRounded";
import { Link as RouterLink } from "react-router-dom";

function NotFound() {
  useEffect(() => {
    document.title = "Sayfa bulunamadı · Hüseyin Afşin";
  }, []);

  return (
    <Box sx={{ py: { xs: 6, sm: 10 }, maxWidth: "48ch" }}>
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
        404
      </Typography>
      <Typography
        component="h1"
        variant="h1"
        sx={{ fontSize: { xs: "2.2rem", sm: "2.8rem" }, lineHeight: 1.1, mb: 2 }}
      >
        Burada bir şey yok.
      </Typography>
      <Typography sx={{ color: "text.secondary", lineHeight: 1.7, mb: 4 }}>
        Aradığınız sayfa taşınmış veya hiç var olmamış olabilir. Yazılara dönüp
        tekrar bakabilirsiniz.
      </Typography>
      <Button
        component={RouterLink}
        to="/"
        variant="outlined"
        startIcon={<ArrowBackRoundedIcon />}
        sx={{ borderColor: "divider", color: "text.primary" }}
      >
        Yazılara dön
      </Button>
    </Box>
  );
}

export default NotFound;
