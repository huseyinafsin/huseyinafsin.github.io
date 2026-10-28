import React, { useEffect } from "react";
import { Box, Divider, Link, Stack, Typography } from "@mui/material";
import ArrowForwardRoundedIcon from "@mui/icons-material/ArrowForwardRounded";
import GitHubIcon from "@mui/icons-material/GitHub";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import { Link as RouterLink } from "react-router-dom";

const STACK = [
  ".NET / C#",
  "ASP.NET Core",
  "React",
  "JavaScript / TypeScript",
  "SQL Server",
  "PostgreSQL",
  "Redis",
  "Docker",
  "Git",
  "Microservices",
];

function About() {
  useEffect(() => {
    document.title = "Hakkında · Hüseyin Afşin";
  }, []);

  return (
    <Box>
      <Typography
        sx={{
          fontSize: 11.5,
          fontWeight: 600,
          letterSpacing: "0.16em",
          textTransform: "uppercase",
          color: "text.secondary",
          mb: 1.5,
        }}
      >
        Hakkında
      </Typography>

      <Typography
        component="h1"
        variant="h1"
        sx={{ fontSize: { xs: "2.4rem", sm: "3.2rem" }, lineHeight: 1.05, mb: 3 }}
      >
        Merhaba, ben Hüseyin.
      </Typography>

      <Stack spacing={2.5} sx={{ maxWidth: "62ch", fontSize: 16.5, lineHeight: 1.8 }}>
        <Typography>
          Bilgisayar mühendisiyim ve ağırlıklı olarak <strong>.NET</strong> tarafında
          yazılım geliştiriyorum. Ölçeklenebilir backend servisleri, temiz mimari ve
          sürdürülebilir kod benim için en önemli başlıklar.
        </Typography>
        <Typography>
          Günlük işimde çok katmanlı uygulamalar, mikroservis yapıları ve ilişkisel
          veritabanlarıyla çalışıyorum. Arayüz tarafında React ile ürün geliştirmeyi,
          bir fikri uçtan uca hayata geçirmeyi seviyorum.
        </Typography>
        <Typography>
          Bu site, öğrendiklerimi yazıya döktüğüm kişisel alanım. Kısa ve uygulanabilir
          notlar yazmaya çalışıyorum; uzun teori yerine gerçekten işe yarayan örnekler.
        </Typography>
      </Stack>

      <Divider sx={{ my: 4.5 }} />

      <Typography
        sx={{
          fontSize: 11.5,
          fontWeight: 600,
          letterSpacing: "0.14em",
          textTransform: "uppercase",
          color: "text.secondary",
          mb: 2,
        }}
      >
        Kullandığım araçlar
      </Typography>

      <Stack direction="row" spacing={1} flexWrap="wrap" rowGap={1} sx={{ mb: 5 }}>
        {STACK.map((item) => (
          <Box
            key={item}
            sx={{
              px: 1.5,
              py: 0.65,
              borderRadius: 999,
              border: "1px solid",
              borderColor: "divider",
              fontSize: 13,
              color: "text.secondary",
            }}
          >
            {item}
          </Box>
        ))}
      </Stack>

      <Divider sx={{ mb: 4 }} />

      <Stack direction={{ xs: "column", sm: "row" }} spacing={{ xs: 1.5, sm: 3 }}>
        <Link
          href="https://github.com/huseyinafsin"
          target="_blank"
          rel="noopener noreferrer"
          underline="none"
          sx={{
            display: "inline-flex",
            alignItems: "center",
            gap: 1,
            color: "text.primary",
            fontSize: 14.5,
            "&:hover": { textDecoration: "underline" },
          }}
        >
          <GitHubIcon sx={{ fontSize: 19 }} /> github.com/huseyinafsin
        </Link>
        <Link
          href="https://www.linkedin.com/in/huseyinafsin/"
          target="_blank"
          rel="noopener noreferrer"
          underline="none"
          sx={{
            display: "inline-flex",
            alignItems: "center",
            gap: 1,
            color: "text.primary",
            fontSize: 14.5,
            "&:hover": { textDecoration: "underline" },
          }}
        >
          <LinkedInIcon sx={{ fontSize: 19 }} /> linkedin.com/in/huseyinafsin
        </Link>
        <Link
          component={RouterLink}
          to="/"
          underline="none"
          sx={{
            display: "inline-flex",
            alignItems: "center",
            gap: 0.5,
            color: "text.secondary",
            fontSize: 14.5,
            "&:hover": { color: "text.primary" },
          }}
        >
          Yazıları oku <ArrowForwardRoundedIcon sx={{ fontSize: 16 }} />
        </Link>
      </Stack>
    </Box>
  );
}

export default About;
