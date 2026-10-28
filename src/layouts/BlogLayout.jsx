import React, { useContext, useEffect } from "react";
import { Link as RouterLink, Outlet, useLocation } from "react-router-dom";
import {
  Box,
  Button,
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
import RssFeedRoundedIcon from "@mui/icons-material/RssFeedRounded";
import EditNoteRoundedIcon from "@mui/icons-material/EditNoteRounded";
import { ColorModeContext } from "../contexts/ColorModeContext";

const GITHUB_URL = "https://github.com/huseyinafsin";
const LINKEDIN_URL = "https://www.linkedin.com/in/huseyinafsin/";

const NAV_ITEMS = [
  { label: "Yazılar", to: "/" },
  { label: "Hakkında", to: "/hakkinda" },
];

function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "instant" });
  }, [pathname]);

  return null;
}

function BlogLayout() {
  const { mode, toggle } = useContext(ColorModeContext);
  const isDark = mode === "dark";
  const { pathname } = useLocation();

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
          backdropFilter: "saturate(180%) blur(16px)",
          backgroundColor: isDark
            ? "rgba(11, 11, 12, 0.7)"
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
              aria-label="Ana sayfa"
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
                  width: 30,
                  height: 30,
                  borderRadius: "9px",
                  display: "grid",
                  placeItems: "center",
                  backgroundColor: "text.primary",
                  color: "background.default",
                  fontSize: 11.5,
                  fontWeight: 700,
                  letterSpacing: "-0.04em",
                }}
              >
                HA
              </Box>
              <Box>
                <Typography
                  sx={{ fontWeight: 600, fontSize: 14.5, lineHeight: 1.15 }}
                >
                  Hüseyin Afşin
                </Typography>
                <Typography
                  sx={{ fontSize: 11.5, color: "text.secondary", lineHeight: 1.2 }}
                >
                  Yazılım notları
                </Typography>
              </Box>
            </Box>

            <Stack direction="row" alignItems="center" spacing={0.25}>
              {NAV_ITEMS.map((item) => {
                const active = item.to === pathname;
                return (
                  <Link
                    key={item.to}
                    component={RouterLink}
                    to={item.to}
                    underline="none"
                    sx={{
                      color: active ? "text.primary" : "text.secondary",
                      fontSize: 13.5,
                      px: 1.2,
                      py: 0.6,
                      borderRadius: 999,
                      display: { xs: "none", sm: "inline-flex" },
                      "&:hover": { color: "text.primary", bgcolor: "action.hover" },
                    }}
                  >
                    {item.label}
                  </Link>
                );
              })}

              <Button
                component={RouterLink}
                to="/panel"
                size="small"
                startIcon={<EditNoteRoundedIcon sx={{ fontSize: 17 }} />}
                sx={{
                  ml: 0.5,
                  mr: 0.5,
                  height: 32,
                  px: 1.5,
                  fontSize: 13,
                  color: "text.primary",
                  border: "1px solid",
                  borderColor: "divider",
                  "&:hover": { bgcolor: "action.hover" },
                }}
              >
                <Box component="span" sx={{ display: { xs: "none", sm: "inline" } }}>
                  Stüdyo
                </Box>
              </Button>

              <Tooltip title="RSS">
                <IconButton
                  component="a"
                  href="/feed.xml"
                  size="small"
                  aria-label="RSS beslemesi"
                  sx={{ color: "text.secondary", display: { xs: "none", sm: "inline-flex" } }}
                >
                  <RssFeedRoundedIcon sx={{ fontSize: 18 }} />
                </IconButton>
              </Tooltip>

              <Tooltip title="GitHub">
                <IconButton
                  component="a"
                  href={GITHUB_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  size="small"
                  aria-label="GitHub"
                  sx={{ color: "text.secondary", display: { xs: "none", sm: "inline-flex" } }}
                >
                  <GitHubIcon sx={{ fontSize: 18 }} />
                </IconButton>
              </Tooltip>

              <Tooltip title={isDark ? "Aydınlık tema" : "Karanlık tema"}>
                <IconButton
                  onClick={toggle}
                  size="small"
                  aria-label="Temayı değiştir"
                  sx={{ color: "text.secondary" }}
                >
                  {isDark ? (
                    <LightModeRoundedIcon sx={{ fontSize: 19 }} />
                  ) : (
                    <DarkModeRoundedIcon sx={{ fontSize: 19 }} />
                  )}
                </IconButton>
              </Tooltip>
            </Stack>
          </Stack>
        </Container>
      </Box>

      <Box component="main" sx={{ flex: 1, py: { xs: 5, sm: 7 } }}>
        <Container maxWidth="md" sx={{ px: { xs: 2.5, sm: 3 } }}>
          <Outlet />
        </Container>
      </Box>

      <Box component="footer" sx={{ mt: 8 }}>
        <Divider />
        <Container maxWidth="md" sx={{ px: { xs: 2.5, sm: 3 } }}>
          <Stack
            direction={{ xs: "column", sm: "row" }}
            spacing={2}
            alignItems={{ xs: "flex-start", sm: "center" }}
            justifyContent="space-between"
            sx={{ py: 4 }}
          >
            <Box>
              <Typography variant="body2" color="text.secondary">
                © {new Date().getFullYear()} Hüseyin Afşin
              </Typography>
              <Typography sx={{ fontSize: 12, color: "text.secondary", mt: 0.25 }}>
                Markdown ile yazılmış, React ile yayınlanmış.
              </Typography>
            </Box>

            <Stack direction="row" spacing={2} flexWrap="wrap" rowGap={1}>
              <Link
                component={RouterLink}
                to="/panel"
                underline="hover"
                color="text.secondary"
                variant="body2"
              >
                Yazı stüdyosu
              </Link>
              <Link
                href="/feed.xml"
                underline="hover"
                color="text.secondary"
                variant="body2"
                sx={{ display: "inline-flex", alignItems: "center", gap: 0.6 }}
              >
                <RssFeedRoundedIcon sx={{ fontSize: 15 }} /> RSS
              </Link>
              <Link
                href={GITHUB_URL}
                target="_blank"
                rel="noopener noreferrer"
                underline="hover"
                color="text.secondary"
                variant="body2"
                sx={{ display: "inline-flex", alignItems: "center", gap: 0.6 }}
              >
                <GitHubIcon sx={{ fontSize: 15 }} /> GitHub
              </Link>
              <Link
                href={LINKEDIN_URL}
                target="_blank"
                rel="noopener noreferrer"
                underline="hover"
                color="text.secondary"
                variant="body2"
                sx={{ display: "inline-flex", alignItems: "center", gap: 0.6 }}
              >
                <LinkedInIcon sx={{ fontSize: 15 }} /> LinkedIn
              </Link>
            </Stack>
          </Stack>
        </Container>
      </Box>
    </Box>
  );
}

export default BlogLayout;
