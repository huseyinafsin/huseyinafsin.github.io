import React, { useEffect, useState } from "react";
import { Box } from "@mui/material";

/**
 * Yazı sayfasında üstte ince bir okuma ilerleme çubuğu gösterir.
 */
function ReadingProgress() {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const update = () => {
      const scrollable =
        document.documentElement.scrollHeight - window.innerHeight;
      if (scrollable <= 0) {
        setProgress(0);
        return;
      }
      setProgress(Math.min(100, Math.max(0, (window.scrollY / scrollable) * 100)));
    };

    update();
    window.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update);
    return () => {
      window.removeEventListener("scroll", update);
      window.removeEventListener("resize", update);
    };
  }, []);

  return (
    <Box
      aria-hidden="true"
      sx={{
        position: "fixed",
        top: 0,
        left: 0,
        height: 2,
        width: `${progress}%`,
        zIndex: 40,
        background: "linear-gradient(90deg, #f59e0b, #ef4444)",
        transition: "width 90ms linear",
        pointerEvents: "none",
      }}
    />
  );
}

export default ReadingProgress;
