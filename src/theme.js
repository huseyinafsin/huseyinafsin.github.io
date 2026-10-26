export const getDesignTokens = (mode) => {
  const isDark = mode === "dark";

  return {
    palette: {
      mode,
      primary: {
        main: isDark ? "#f4f4f5" : "#18181b",
        contrastText: isDark ? "#18181b" : "#fafafa",
      },
      secondary: {
        main: isDark ? "#a1a1aa" : "#52525b",
      },
      background: {
        default: isDark ? "#0b0b0c" : "#fbfbfa",
        paper: isDark ? "#131316" : "#ffffff",
      },
      text: {
        primary: isDark ? "#f4f4f5" : "#18181b",
        secondary: isDark ? "#a1a1aa" : "#71717a",
      },
      divider: isDark ? "rgba(255, 255, 255, 0.1)" : "rgba(24, 24, 27, 0.1)",
      accent: {
        main: isDark ? "#fbbf24" : "#b45309",
      },
    },
    typography: {
      fontFamily:
        '"Inter", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
      h1: {
        fontFamily: '"Instrument Serif", Georgia, serif',
        fontWeight: 400,
        letterSpacing: "-0.02em",
      },
      h2: {
        fontFamily: '"Instrument Serif", Georgia, serif',
        fontWeight: 400,
        letterSpacing: "-0.015em",
      },
      h3: {
        fontFamily: '"Inter", sans-serif',
        fontWeight: 600,
        letterSpacing: "-0.02em",
      },
      button: {
        textTransform: "none",
        fontWeight: 500,
      },
    },
    shape: {
      borderRadius: 12,
    },
    components: {
      MuiCssBaseline: {
        styleOverrides: {
          "::selection": {
            backgroundColor: isDark
              ? "rgba(251, 191, 36, 0.28)"
              : "rgba(180, 83, 9, 0.18)",
          },
        },
      },
      MuiButton: {
        defaultProps: { disableElevation: true },
        styleOverrides: {
          root: { borderRadius: 999 },
        },
      },
      MuiChip: {
        styleOverrides: {
          root: { borderRadius: 999, fontWeight: 500 },
        },
      },
    },
  };
};
