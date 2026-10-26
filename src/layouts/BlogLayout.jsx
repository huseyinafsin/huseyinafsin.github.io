import React from "react";
import { Link as RouterLink, Outlet, useLocation } from "react-router-dom";
import {
  Box,
  Container,
  Divider,
  IconButton,
  Link,
  Stack,
  Tooltip,
  Typography,
} from "@mui/material";
import DarkModeRoundedIcon from "@mui/icons-material/DarkModeRounded";
import LightModeRoundedIcon from "@mui/icons-material/LightModeRounded";
import GitHubIcon from "@mui/icons-material/GitHub";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import { ColorModeContext } from "../contexts/ColorModeContext";

const GITHUB_URL = "https://github.com/huseyinafsin";
const LINKEDIN_URL = "https://www.linkedin.com/in/huseyinafsin/";

function ScrollToTop() {
  const { pathname } = useLocation();

  React.useEffect(() => {
    window.scrollTo({ top: 0, behavior: "instant" });
  }, [pathname]);

  return null;
}

function BlogLayout() {
  const { mode, toggle } = React.useContext(ColorModeContext);
  const isDark = mode === "dark";

  return (
    <Box
      sx={{
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        bgcolor: "background.default",
      }}
    >
      <ScrollToTop />

      <Box
        component="header"
        sx={{
          position: "sticky",
          top: 0,
          zIndex: 20,
          backdropFilter: "blur(14px)",
          backgroundColor: isDark
            ? "rgba(11, 11, 12, 0.72)"
            : "rgba(251, 251, 250, 0.78)",
          borderBottom: "1px solid",
          borderColor: "divider",
        }}
      >
        <Container maxWidth="md" sx={{ px: { xs: 2.5, sm: 3 } }}>
          <Stack
            direction="row"
            alignItems="center"
            justifyContent="space-between"
            sx={{ height: 64 }}
          >
            <Box
              component={RouterLink}
              to="/"
              sx={{
                display: "flex",
                alignItems: "center",
                gap: 1.25,
                color: "text.primary",
                textDecoration: "none",
              }}
            >
              <Box
                aria-hidden="true"
                sx={{
                  width: 28,
                  height: 28,
                  borderRadius: "8px",
                  display: "grid",
                  placeItems: "center",
                  backgroundColor: "text.primary",
                  color: "background.default",
                  fontSize: 12,
                  fontWeight: 700,
                  letterSpacing: "-0.04em",
                }}
              >
                HA
              </Box>
              <Typography
                sx={{
                  fontWeight: 600,
                  fontSize: 15,
                  letterSpacing: "-0.01em",
                }}
              >
                Hüseyin Afşin
              </Typography>
            </Box>

            <Stack direction="row" alignItems="center" spacing={0.5}>
              <Link
                component={RouterLink}
                to="/"
                underline="none"
                sx={{
                  color: "text.secondary",
                  fontSize: 14,
                  px: 1.5,
                  py: 0.75,
                  borderRadius: 999,
                  display: { xs: "none", sm: "inline-flex" },
                  "&:hover": { color: "text.primary" },
                }}
              >
                Yazılar
              </Link>
              <Tooltip title="GitHub">
                <IconButton
                  component="a"
                  href={GITHUB_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  size="small"
                  sx={{ color: "text.secondary" }}
                  aria-label="GitHub"
                >
                  <GitHubIcon fontSize="small" />
                </IconButton>
              </Tooltip>
              <Tooltip title={isDark ? "Aydınlık tema" : "Karanlık tema"}>
                <IconButton
                  onClick={toggle}
                  size="small"
                  sx={{ color: "text.secondary" }}
                  aria-label="Temayı değiştir"
                >
                  {isDark ? (
                    <LightModeRoundedIcon fontSize="small" />
                  ) : (
                    <DarkModeRoundedIcon fontSize="small" />
                  )}
                </IconButton>
              </Tooltip>
            </Stack>
          </Stack>
        </Container>
      </Box>

      <Box component="main" sx={{ flex: 1, py: { xs: 5, sm: 8 } }}>
        <Container maxWidth="md" sx={{ px: { xs: 2.5, sm: 3 } }}>
          <Outlet />
        </Container>
      </Box>

      <Box component="footer" sx={{ mt: 6 }}>
        <Divider />
        <Container maxWidth="md" sx={{ px: { xs: 2.5, sm: 3 } }}>
          <Stack
            direction={{ xs: "column", sm: "row" }}
            spacing={1.5}
            alignItems={{ xs: "flex-start", sm: "center" }}
            justifyContent="space-between"
            sx={{ py: 4 }}
          >
            <Typography variant="body2" color="text.secondary">
              © {new Date().getFullYear()} Hüseyin Afşin · Tüm hakları saklıdır.
            </Typography>
            <Stack direction="row" spacing={2}>
              <Link
                href={GITHUB_URL}
                target="_blank"
                rel="noopener noreferrer"
                underline="hover"
                color="text.secondary"
                variant="body2"
                sx={{ display: "inline-flex", alignItems: "center", gap: 0.75 }}
              >
                <GitHubIcon sx={{ fontSize: 16 }} /> GitHub
              </Link>
              <Link
                href={LINKEDIN_URL}
                target="_blank"
                rel="noopener noreferrer"
                underline="hover"
                color="text.secondary"
                variant="body2"
                sx={{ display: "inline-flex", alignItems: "center", gap: 0.75 }}
              >
                <LinkedInIcon sx={{ fontSize: 16 }} /> LinkedIn
              </Link>
            </Stack>
          </Stack>
        </Container>
      </Box>
    </Box>
  );
}

export default BlogLayout;
