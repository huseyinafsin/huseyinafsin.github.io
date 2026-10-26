import React, { useMemo } from "react";
import { CssBaseline, ThemeProvider, createTheme } from "@mui/material";
import { Navigate, Route, Routes } from "react-router-dom";

import BlogLayout from "./layouts/BlogLayout";
import PostList from "./pages/PostList";
import Post from "./pages/Post";
import NotFound from "./pages/NotFound";
import { ColorModeContext } from "./contexts/ColorModeContext";
import { getDesignTokens } from "./theme";

function App() {
  const { mode } = React.useContext(ColorModeContext);
  const theme = useMemo(() => createTheme(getDesignTokens(mode)), [mode]);

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Routes>
        <Route element={<BlogLayout />}>
          <Route path="/" element={<PostList />} />
          <Route path="/writings" element={<Navigate to="/" replace />} />
          <Route path="/writings/:slug" element={<Post />} />
          <Route path="/:slug" element={<Post />} />
          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
    </ThemeProvider>
  );
}

export default App;
