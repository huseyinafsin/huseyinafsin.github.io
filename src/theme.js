export const getDesignTokens = (mode) => {
  const isDark = mode === "dark";

  const mono =
    'ui-monospace, SFMono-Regular, Menlo, Consolas, "Liberation Mono", monospace';

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
        paper: isDark ? "#121214" : "#ffffff",
      },
      text: {
        primary: isDark ? "#f4f4f5" : "#18181b",
        secondary: isDark ? "#a1a1aa" : "#6b6b73",
      },
      divider: isDark ? "rgba(255, 255, 255, 0.1)" : "rgba(24, 24, 27, 0.09)",
      action: {
        hover: isDark ? "rgba(255,255,255,0.055)" : "rgba(24,24,27,0.04)",
      },
    },
    typography: {
      fontFamily:
        '"Inter", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
      body1: { lineHeight: 1.75 },
      h1: {
        fontFamily: '"Instrument Serif", Georgia, serif',
        fontWeight: 400,
        letterSpacing: "-0.025em",
      },
      h2: {
        fontFamily: '"Instrument Serif", Georgia, serif',
        fontWeight: 400,
        letterSpacing: "-0.02em",
      },
      h3: {
        fontFamily: '"Inter", sans-serif',
        fontWeight: 600,
        letterSpacing: "-0.02em",
      },
      button: {
        textTransform: "none",
        fontWeight: 500,
        letterSpacing: "-0.005em",
      },
      caption: { letterSpacing: "0.01em" },
      overline: { fontFamily: mono, letterSpacing: "0.12em" },
    },
    shape: { borderRadius: 12 },
    components: {
      MuiCssBaseline: {
        styleOverrides: {
          "::selection": {
            backgroundColor: isDark
              ? "rgba(250, 204, 21, 0.26)"
              : "rgba(180, 83, 9, 0.16)",
          },
          body: {
            backgroundImage: isDark
              ? "radial-gradient(1200px 600px at 78% -8%, rgba(120,120,140,0.14), transparent 65%)"
              : "radial-gradient(1200px 600px at 78% -8%, rgba(180,140,90,0.12), transparent 65%)",
            backgroundRepeat: "no-repeat",
          },
        },
      },
      MuiButton: {
        defaultProps: { disableElevation: true },
        styleOverrides: {
          root: { borderRadius: 999, fontWeight: 500 },
          contained: {
            boxShadow: "0 10px 24px -14px rgba(0,0,0,0.6)",
          },
        },
      },
      MuiChip: {
        styleOverrides: {
          root: { borderRadius: 999, fontWeight: 500 },
        },
      },
      MuiDialog: {
        styleOverrides: {
          paper: {
            borderRadius: 18,
            border: `1px solid ${isDark ? "rgba(255,255,255,0.1)" : "rgba(24,24,27,0.09)"}`,
            backgroundImage: "none",
          },
        },
      },
      MuiTooltip: {
        styleOverrides: {
          tooltip: {
            fontSize: 12,
            borderRadius: 8,
            padding: "6px 10px",
            backgroundColor: isDark ? "#27272a" : "#18181b",
          },
        },
      },
      MuiTab: {
        styleOverrides: { root: { textTransform: "none", fontWeight: 500 } },
      },
      MuiTextField: {
        defaultProps: { size: "small" },
      },
    },
  };
};
