import React, { useCallback, useEffect, useMemo, useRef, useState } from "react";
import {
  Alert,
  Box,
  Button,
  ButtonBase,
  Chip,
  Divider,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  IconButton,
  MenuItem,
  Snackbar,
  Stack,
  TextField,
  ToggleButton,
  ToggleButtonGroup,
  Tooltip,
  Typography,
} from "@mui/material";

import FormatBoldRoundedIcon from "@mui/icons-material/FormatBoldRounded";
import FormatItalicRoundedIcon from "@mui/icons-material/FormatItalicRounded";
import TitleRoundedIcon from "@mui/icons-material/TitleRounded";
import FormatListBulletedRoundedIcon from "@mui/icons-material/FormatListBulletedRounded";
import FormatListNumberedRoundedIcon from "@mui/icons-material/FormatListNumberedRounded";
import FormatQuoteRoundedIcon from "@mui/icons-material/FormatQuoteRounded";
import LinkRoundedIcon from "@mui/icons-material/LinkRounded";
import ImageRoundedIcon from "@mui/icons-material/ImageRounded";
import OndemandVideoRoundedIcon from "@mui/icons-material/OndemandVideoRounded";
import CodeRoundedIcon from "@mui/icons-material/CodeRounded";
import TableChartRoundedIcon from "@mui/icons-material/TableChartRounded";
import HorizontalRuleRoundedIcon from "@mui/icons-material/HorizontalRuleRounded";
import ContentCopyRoundedIcon from "@mui/icons-material/ContentCopyRounded";
import DownloadRoundedIcon from "@mui/icons-material/DownloadRounded";
import RestartAltRoundedIcon from "@mui/icons-material/RestartAltRounded";
import SaveRoundedIcon from "@mui/icons-material/SaveRounded";
import VisibilityRoundedIcon from "@mui/icons-material/VisibilityRounded";
import EditRoundedIcon from "@mui/icons-material/EditRounded";
import CheckRoundedIcon from "@mui/icons-material/CheckRounded";

import Markdown from "../components/Markdown";
import CoverArt from "../components/CoverArt";
import ShareImageGenerator from "../components/ShareImageGenerator";
import { slugify, readingTimeOf } from "../utils/text";
import { getAllWritings } from "../utils/writings";

const DRAFT_KEY = "huseyinafsin-studio-draft";

const CODE_LANGUAGES = [
  "csharp",
  "javascript",
  "typescript",
  "jsx",
  "tsx",
  "java",
  "python",
  "sql",
  "bash",
  "json",
  "yaml",
  "html",
  "css",
  "text",
];

const EMPTY_DRAFT = {
  title: "",
  date: new Date().toISOString().slice(0, 10),
  summary: "",
  tags: "",
  cover: "",
  slug: "",
  body: "",
};

function todayIso() {
  return new Date().toISOString().slice(0, 10);
}

function buildMarkdown(draft) {
  const title = draft.title.trim() || "Başlıksız yazı";
  const tags = draft.tags
    .split(",")
    .map((tag) => tag.trim())
    .filter(Boolean);

  const lines = [
    "---",
    `title: "${title.replace(/"/g, '\\"')}"`,
    `date: "${draft.date || todayIso()}"`,
  ];

  if (draft.summary.trim()) {
    lines.push(`summary: "${draft.summary.trim().replace(/"/g, '\\"')}"`);
  }
  if (tags.length) {
    lines.push(`tags: [${tags.map((tag) => `"${tag}"`).join(", ")}]`);
  }
  if (draft.cover.trim()) {
    lines.push(`cover: "${draft.cover.trim()}"`);
  }
  if (draft.slug.trim()) {
    lines.push(`slug: "${slugify(draft.slug)}"`);
  }
  lines.push("draft: false", "---", "", draft.body.trim(), "");

  return lines.join("\n");
}

function fileNameFor(draft) {
  const slug = slugify(draft.slug || draft.title || "yeni-yazi");
  const date = draft.date || todayIso();
  return `${date}-${slug}.md`;
}

/* ------------------------------------------------------------------ */
/* Ekleme pencereleri                                                  */
/* ------------------------------------------------------------------ */

function MediaDialog({ open, mode, onClose, onInsert }) {
  const [url, setUrl] = useState("");
  const [alt, setAlt] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    if (open) {
      setUrl("");
      setAlt("");
      setError("");
    }
  }, [open, mode]);

  const isVideo = mode === "video";

  const submit = () => {
    const value = url.trim();
    if (!value) {
      setError("Bir bağlantı girin.");
      return;
    }

    if (isVideo) {
      if (!/^https?:\/\//i.test(value)) {
        setError("Video bağlantısı http(s) ile başlamalı.");
        return;
      }
      onInsert(`!video[${alt.trim() || "Video"}](${value})`);
    } else {
      onInsert(`![${alt.trim() || "Görsel"}](${value})`);
    }
    onClose();
  };

  return (
    <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
      <DialogTitle sx={{ fontWeight: 600, fontSize: 18 }}>
        {isVideo ? "Video ekle" : "Görsel ekle"}
      </DialogTitle>
      <DialogContent>
        <Stack spacing={2} sx={{ mt: 0.5 }}>
          <TextField
            label={isVideo ? "Video bağlantısı" : "Görsel bağlantısı"}
            placeholder={
              isVideo
                ? "https://www.youtube.com/watch?v=..."
                : "https://... veya /writings/gorsel.png"
            }
            value={url}
            onChange={(event) => setUrl(event.target.value)}
            fullWidth
            autoFocus
            error={Boolean(error)}
            helperText={
              error ||
              (isVideo
                ? "YouTube, Vimeo veya doğrudan .mp4/.webm bağlantısı desteklenir."
                : "Görselleri public/writings/ klasörüne koyup /writings/ad.png yazabilirsiniz.")
            }
          />
          <TextField
            label={isVideo ? "Video açıklaması" : "Alternatif metin"}
            value={alt}
            onChange={(event) => setAlt(event.target.value)}
            fullWidth
          />
        </Stack>
      </DialogContent>
      <DialogActions sx={{ px: 3, pb: 2.5 }}>
        <Button onClick={onClose} sx={{ color: "text.secondary" }}>
          Vazgeç
        </Button>
        <Button variant="contained" onClick={submit}>
          Ekle
        </Button>
      </DialogActions>
    </Dialog>
  );
}

function CodeDialog({ open, onClose, onInsert }) {
  const [language, setLanguage] = useState("csharp");
  const [code, setCode] = useState("");

  useEffect(() => {
    if (open) {
      setLanguage("csharp");
      setCode("");
    }
  }, [open]);

  return (
    <Dialog open={open} onClose={onClose} maxWidth="md" fullWidth>
      <DialogTitle sx={{ fontWeight: 600, fontSize: 18 }}>Kod bloğu ekle</DialogTitle>
      <DialogContent>
        <Stack spacing={2} sx={{ mt: 0.5 }}>
          <TextField
            select
            label="Dil"
            value={language}
            onChange={(event) => setLanguage(event.target.value)}
            sx={{ maxWidth: 220 }}
          >
            {CODE_LANGUAGES.map((item) => (
              <MenuItem key={item} value={item}>
                {item}
              </MenuItem>
            ))}
          </TextField>
          <TextField
            label="Kod"
            value={code}
            onChange={(event) => setCode(event.target.value)}
            multiline
            minRows={10}
            fullWidth
            autoFocus
            slotProps={{
              input: {
                sx: {
                  fontFamily:
                    'ui-monospace, SFMono-Regular, Menlo, Consolas, monospace',
                  fontSize: 13.5,
                },
              },
            }}
          />
        </Stack>
      </DialogContent>
      <DialogActions sx={{ px: 3, pb: 2.5 }}>
        <Button onClick={onClose} sx={{ color: "text.secondary" }}>
          Vazgeç
        </Button>
        <Button
          variant="contained"
          disabled={!code.trim()}
          onClick={() => {
            onInsert("```" + language + "\n" + code.replace(/\s+$/, "") + "\n```");
            onClose();
          }}
        >
          Ekle
        </Button>
      </DialogActions>
    </Dialog>
  );
}

function LinkDialog({ open, onClose, onInsert }) {
  const [label, setLabel] = useState("");
  const [url, setUrl] = useState("");

  useEffect(() => {
    if (open) {
      setLabel("");
      setUrl("");
    }
  }, [open]);

  return (
    <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
      <DialogTitle sx={{ fontWeight: 600, fontSize: 18 }}>Bağlantı ekle</DialogTitle>
      <DialogContent>
        <Stack spacing={2} sx={{ mt: 0.5 }}>
          <TextField
            label="Görünen metin"
            value={label}
            onChange={(event) => setLabel(event.target.value)}
            fullWidth
            autoFocus
          />
          <TextField
            label="Bağlantı"
            placeholder="https://..."
            value={url}
            onChange={(event) => setUrl(event.target.value)}
            fullWidth
          />
        </Stack>
      </DialogContent>
      <DialogActions sx={{ px: 3, pb: 2.5 }}>
        <Button onClick={onClose} sx={{ color: "text.secondary" }}>
          Vazgeç
        </Button>
        <Button
          variant="contained"
          disabled={!url.trim()}
          onClick={() => {
            onInsert(`[${label.trim() || url.trim()}](${url.trim()})`);
            onClose();
          }}
        >
          Ekle
        </Button>
      </DialogActions>
    </Dialog>
  );
}

/* ------------------------------------------------------------------ */
/* Stüdyo                                                              */
/* ------------------------------------------------------------------ */

function Studio() {
  const [draft, setDraft] = useState(() => {
    try {
      const stored = window.localStorage.getItem(DRAFT_KEY);
      if (stored) return { ...EMPTY_DRAFT, ...JSON.parse(stored) };
    } catch (error) {
      // Bozuk kayıt varsa yeni taslakla başlanır.
    }
    return EMPTY_DRAFT;
  });

  const [view, setView] = useState("write");
  const [dialog, setDialog] = useState(null);
  const [snack, setSnack] = useState("");
  const [galleryOpen, setGalleryOpen] = useState(false);
  const [savedAt, setSavedAt] = useState(null);

  const bodyRef = useRef(null);
  const fileRef = useRef(null);
  const existing = getAllWritings();

  useEffect(() => {
    document.title = "Stüdyo · Hüseyin Afşin";
  }, []);

  const markdown = useMemo(() => buildMarkdown(draft), [draft]);
  const words = useMemo(
    () => draft.body.split(/\s+/).filter(Boolean).length,
    [draft.body]
  );
  const tagList = useMemo(
    () =>
      draft.tags
        .split(",")
        .map((tag) => tag.trim())
        .filter(Boolean),
    [draft.tags]
  );

  const save = useCallback(
    (next) => {
      try {
        window.localStorage.setItem(DRAFT_KEY, JSON.stringify(next));
        setSavedAt(new Date());
      } catch (error) {
        // Depolama dolu olabilir; sessizce geç.
      }
    },
    []
  );

  useEffect(() => {
    const timer = window.setTimeout(() => save(draft), 600);
    return () => window.clearTimeout(timer);
  }, [draft, save]);

  const update = (key, value) => setDraft((current) => ({ ...current, [key]: value }));

  /** İmleç konumuna (veya seçimin etrafına) metin ekler. */
  const insert = useCallback(
    (before, after = "", placeholder = "") => {
      const textarea = bodyRef.current;
      if (!textarea) return;

      const start = textarea.selectionStart ?? draft.body.length;
      const end = textarea.selectionEnd ?? draft.body.length;
      const selected = draft.body.slice(start, end) || placeholder;
      const nextBody =
        draft.body.slice(0, start) +
        before +
        selected +
        after +
        draft.body.slice(end);

      setDraft((current) => ({ ...current, body: nextBody }));
      setView("write");

      window.requestAnimationFrame(() => {
        const cursor = start + before.length + selected.length;
        textarea.focus();
        textarea.setSelectionRange(cursor, cursor);
      });
    },
    [draft.body]
  );

  const insertBlock = useCallback((block) => {
    setDraft((current) => {
      const trimmed = current.body.replace(/\s+$/, "");
      const body = trimmed ? `${trimmed}\n\n${block}\n` : `${block}\n`;
      return { ...current, body };
    });
    setView("write");
  }, []);

  const handleImageFile = async (file) => {
    if (!file) return;
    const limit = 500 * 1024;

    if (file.size > limit) {
      insertBlock(
        `![${file.name}](\`GÖRSEL YOLU\`)`.replace("(`GÖRSEL YOLU`)", "(/writings/DOSYA-ADI)")
      );
      setSnack(
        `${file.name} büyük (${Math.round(file.size / 1024)} KB). Dosyayı public/writings/ klasörüne kopyalayıp yolu güncelleyin.`
      );
      return;
    }

    const reader = new FileReader();
    reader.onload = () => {
      insertBlock(`![${file.name}](${reader.result})`);
      setSnack("Görsel yazıya gömüldü.");
    };
    reader.readAsDataURL(file);
  };

  const handleCopyMarkdown = async () => {
    try {
      await navigator.clipboard.writeText(markdown);
      setSnack("Markdown panoya kopyalandı.");
    } catch (error) {
      setSnack("Kopyalama başarısız oldu.");
    }
  };

  const handleDownloadMarkdown = () => {
    const blob = new Blob([markdown], { type: "text/markdown;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = fileNameFor(draft);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    setTimeout(() => URL.revokeObjectURL(url), 2000);
    setSnack(`${fileNameFor(draft)} indirildi.`);
  };

  const resetDraft = () => {
    setDraft({ ...EMPTY_DRAFT, date: todayIso() });
    setSnack("Taslak temizlendi.");
  };

  const loadPost = (post) => {
    setDraft({
      title: post.title,
      date: post.date,
      summary: post.summary || "",
      tags: post.tags.join(", "),
      cover: post.cover || "",
      slug: post.slug,
      body: post.content,
    });
    setGalleryOpen(false);
    setSnack(`"${post.title}" düzenlemeye açıldı.`);
  };

  const toolbar = [
    {
      label: "Başlık",
      icon: <TitleRoundedIcon sx={{ fontSize: 18 }} />,
      action: () => insert("## ", "", "Başlık"),
    },
    {
      label: "Kalın",
      icon: <FormatBoldRoundedIcon sx={{ fontSize: 18 }} />,
      action: () => insert("**", "**", "kalın metin"),
    },
    {
      label: "İtalik",
      icon: <FormatItalicRoundedIcon sx={{ fontSize: 18 }} />,
      action: () => insert("*", "*", "italik metin"),
    },
    {
      label: "Madde listesi",
      icon: <FormatListBulletedRoundedIcon sx={{ fontSize: 18 }} />,
      action: () => insert("- ", "", "liste maddesi"),
    },
    {
      label: "Numaralı liste",
      icon: <FormatListNumberedRoundedIcon sx={{ fontSize: 18 }} />,
      action: () => insert("1. ", "", "liste maddesi"),
    },
    {
      label: "Alıntı",
      icon: <FormatQuoteRoundedIcon sx={{ fontSize: 18 }} />,
      action: () => insert("> ", "", "alıntı"),
    },
    {
      label: "Bağlantı",
      icon: <LinkRoundedIcon sx={{ fontSize: 18 }} />,
      action: () => setDialog("link"),
    },
    {
      label: "Görsel",
      icon: <ImageRoundedIcon sx={{ fontSize: 18 }} />,
      action: () => setDialog("image"),
    },
    {
      label: "Video",
      icon: <OndemandVideoRoundedIcon sx={{ fontSize: 18 }} />,
      action: () => setDialog("video"),
    },
    {
      label: "Kod bloğu",
      icon: <CodeRoundedIcon sx={{ fontSize: 18 }} />,
      action: () => setDialog("code"),
    },
    {
      label: "Tablo",
      icon: <TableChartRoundedIcon sx={{ fontSize: 18 }} />,
      action: () =>
        insertBlock(
          "| Başlık | Değer |\n| --- | --- |\n| Satır | Değer |"
        ),
    },
    {
      label: "Ayırıcı",
      icon: <HorizontalRuleRoundedIcon sx={{ fontSize: 18 }} />,
      action: () => insertBlock("---"),
    },
  ];

  const previewPost = {
    title: draft.title || "Başlıksız yazı",
    slug: draft.slug || slugify(draft.title || "taslak"),
    date: draft.date,
    tags: tagList,
    cover: draft.cover,
    summary: draft.summary,
    readingTime: readingTimeOf(draft.body),
  };

  return (
    <Box>
      <Stack
        direction={{ xs: "column", sm: "row" }}
        spacing={2}
        alignItems={{ xs: "flex-start", sm: "flex-end" }}
        justifyContent="space-between"
        sx={{ mb: 3 }}
      >
        <Box sx={{ flex: 1, minWidth: 0 }}>
          <Typography
            sx={{
              fontSize: 11.5,
              fontWeight: 600,
              letterSpacing: "0.16em",
              textTransform: "uppercase",
              color: "text.secondary",
              mb: 1,
            }}
          >
            Yazı stüdyosu
          </Typography>
          <Typography variant="h1" sx={{ fontSize: { xs: "2rem", sm: "2.5rem" }, lineHeight: 1.1 }}>
            Yeni yazı
          </Typography>
          <Typography sx={{ color: "text.secondary", fontSize: 13.5, mt: 1 }}>
            Markdown otomatik oluşur. Görsel, video ve kod ekleyip paylaşım
            görselini hazırlayabilirsiniz.
          </Typography>
        </Box>

        <Stack
          direction="row"
          spacing={1}
          flexWrap={{ xs: "wrap", sm: "nowrap" }}
          justifyContent="flex-end"
          rowGap={1}
          sx={{ flexShrink: 0, alignSelf: { xs: "stretch", sm: "flex-start" } }}
        >
          <Button
            size="small"
            variant="outlined"
            startIcon={<RestartAltRoundedIcon />}
            onClick={resetDraft}
            sx={{ borderColor: "divider", color: "text.secondary", height: 36, whiteSpace: "nowrap" }}
          >
            Temizle
          </Button>
          <Button
            size="small"
            variant="outlined"
            onClick={() => setGalleryOpen(true)}
            sx={{ borderColor: "divider", color: "text.primary", height: 36, whiteSpace: "nowrap" }}
          >
            Yazı yükle
          </Button>
          <Button
            size="small"
            variant="contained"
            startIcon={<DownloadRoundedIcon />}
            onClick={handleDownloadMarkdown}
            sx={{ height: 36, whiteSpace: "nowrap" }}
          >
            .md indir
          </Button>
        </Stack>
      </Stack>

      <Box
        sx={{
          display: "grid",
          gridTemplateColumns: { xs: "1fr", lg: "minmax(0, 1fr) 360px" },
          gap: 3,
          alignItems: "start",
        }}
      >
        {/* Sol: editör */}
        <Box>
          <Stack spacing={2} sx={{ mb: 2.5 }}>
            <TextField
              label="Başlık"
              value={draft.title}
              onChange={(event) => update("title", event.target.value)}
              placeholder="Yazının başlığı"
              fullWidth
              slotProps={{ input: { sx: { fontSize: 17, fontWeight: 600 } } }}
            />

            <Stack direction={{ xs: "column", sm: "row" }} spacing={2}>
              <TextField
                label="Tarih"
                type="date"
                value={draft.date}
                onChange={(event) => update("date", event.target.value)}
                sx={{ width: { xs: "100%", sm: 210 }, flexShrink: 0 }}
                InputLabelProps={{ shrink: true }}
              />
              <TextField
                label="Etiketler"
                value={draft.tags}
                onChange={(event) => update("tags", event.target.value)}
                placeholder="C#, Performans, React"
                fullWidth
                helperText="Virgülle ayırın"
              />
            </Stack>

            <TextField
              label="Özet"
              value={draft.summary}
              onChange={(event) => update("summary", event.target.value)}
              placeholder="Listede ve paylaşım görselinde görünecek kısa özet"
              fullWidth
              multiline
              minRows={2}
            />

            <Stack direction={{ xs: "column", sm: "row" }} spacing={2}>
              <TextField
                label="Kapak görseli (isteğe bağlı)"
                value={draft.cover}
                onChange={(event) => update("cover", event.target.value)}
                placeholder="/writings/kapak.png"
                fullWidth
              />
              <TextField
                label="Özel adres"
                value={draft.slug}
                onChange={(event) => update("slug", event.target.value)}
                placeholder="otomatik"
                sx={{ width: { xs: "100%", sm: 240 } }}
              />
            </Stack>
          </Stack>

          <Divider sx={{ mb: 2 }} />

          <Stack
            direction="row"
            alignItems="center"
            justifyContent="space-between"
            sx={{ mb: 1.5, gap: 2, flexWrap: "wrap", rowGap: 1 }}
          >
            <ToggleButtonGroup
              exclusive
              size="small"
              value={view}
              onChange={(event, value) => value && setView(value)}
              sx={{ "& .MuiToggleButton-root": { px: 1.5, py: 0.5, border: "1px solid", borderColor: "divider" } }}
            >
              <ToggleButton value="write" aria-label="Yaz">
                <EditRoundedIcon sx={{ fontSize: 16, mr: 0.75 }} />
                <Typography sx={{ fontSize: 12.5 }}>Yaz</Typography>
              </ToggleButton>
              <ToggleButton value="preview" aria-label="Önizleme">
                <VisibilityRoundedIcon sx={{ fontSize: 16, mr: 0.75 }} />
                <Typography sx={{ fontSize: 12.5 }}>Önizleme</Typography>
              </ToggleButton>
            </ToggleButtonGroup>

            <Typography
              sx={{
                fontSize: 12,
                color: "text.secondary",
                whiteSpace: "nowrap",
                overflow: "hidden",
                textOverflow: "ellipsis",
                maxWidth: "100%",
              }}
            >
              {words} kelime · {readingTimeOf(draft.body)} dk
              {savedAt ? " · kaydedildi" : ""}
            </Typography>
          </Stack>

          {view === "write" ? (
            <>
              <Stack
                direction="row"
                spacing={0.25}
                sx={{
                  p: 0.75,
                  mb: 1,
                  border: "1px solid",
                  borderColor: "divider",
                  borderBottom: 0,
                  borderRadius: "10px 10px 0 0",
                  backgroundColor: "action.hover",
                  flexWrap: "wrap",
                  rowGap: 0.5,
                }}
              >
                {toolbar.map((item) => (
                  <Tooltip key={item.label} title={item.label}>
                    <IconButton
                      size="small"
                      onClick={item.action}
                      aria-label={item.label}
                      sx={{ color: "text.secondary", borderRadius: 1.5 }}
                    >
                      {item.icon}
                    </IconButton>
                  </Tooltip>
                ))}
                <Box sx={{ flex: 1 }} />
                <Tooltip title="Görsel dosyası yükle">
                  <Button
                    size="small"
                    onClick={() => fileRef.current?.click()}
                    startIcon={<ImageRoundedIcon sx={{ fontSize: 16 }} />}
                    sx={{ fontSize: 12, color: "text.secondary", borderRadius: 1.5 }}
                  >
                    Dosya
                  </Button>
                </Tooltip>
                <input
                  ref={fileRef}
                  type="file"
                  accept="image/*"
                  hidden
                  onChange={(event) => {
                    handleImageFile(event.target.files?.[0]);
                    event.target.value = "";
                  }}
                />
              </Stack>

              <TextField
                inputRef={bodyRef}
                value={draft.body}
                onChange={(event) => update("body", event.target.value)}
                placeholder={"## Başlık\n\nMetninizi buraya yazın…\n\n```csharp\n// kod\n```"}
                multiline
                fullWidth
                minRows={20}
                sx={{
                  "& .MuiOutlinedInput-root": {
                    borderRadius: "0 0 10px 10px",
                    alignItems: "flex-start",
                    fontFamily:
                      'ui-monospace, SFMono-Regular, Menlo, Consolas, monospace',
                    fontSize: 14,
                    lineHeight: 1.75,
                  },
                }}
              />
            </>
          ) : (
            <Box
              sx={{
                border: "1px solid",
                borderColor: "divider",
                borderRadius: 2,
                p: { xs: 2, sm: 3 },
                minHeight: 380,
              }}
            >
              {draft.body.trim() ? (
                <Markdown content={draft.body} />
              ) : (
                <Typography sx={{ color: "text.secondary", fontSize: 14 }}>
                  Önizleme için yazı metni ekleyin.
                </Typography>
              )}
            </Box>
          )}

          <Box sx={{ mt: 2.5 }}>
            <Stack
              direction="row"
              alignItems="center"
              justifyContent="space-between"
              sx={{ mb: 1, gap: 1, flexWrap: "wrap", rowGap: 0.5 }}
            >
              <Typography sx={{ fontSize: 12, fontWeight: 600, color: "text.secondary" }}>
                MARKDOWN
              </Typography>
              <Typography
                sx={{
                  fontSize: 11.5,
                  color: "text.secondary",
                  fontFamily: "monospace",
                  wordBreak: "break-all",
                  maxWidth: "100%",
                }}
              >
                src/content/writings/{fileNameFor(draft)}
              </Typography>
            </Stack>

            <Box
              component="pre"
              sx={{
                m: 0,
                p: 2,
                maxHeight: 240,
                overflow: "auto",
                borderRadius: 2,
                border: "1px solid",
                borderColor: "divider",
                backgroundColor: "action.hover",
                fontSize: 12.5,
                lineHeight: 1.65,
                fontFamily:
                  'ui-monospace, SFMono-Regular, Menlo, Consolas, monospace',
                whiteSpace: "pre-wrap",
                wordBreak: "break-word",
              }}
            >
              {markdown}
            </Box>

            <Stack direction="row" spacing={1} sx={{ mt: 1.5 }} flexWrap="wrap" rowGap={1}>
              <Button
                size="small"
                variant="outlined"
                startIcon={<ContentCopyRoundedIcon />}
                onClick={handleCopyMarkdown}
                sx={{ borderColor: "divider", color: "text.primary" }}
              >
                Kopyala
              </Button>
              <Button
                size="small"
                variant="outlined"
                component="a"
                href={`https://github.com/huseyinafsin/huseyinafsin.github.io/new/blog/src/content/writings/?filename=${encodeURIComponent(
                  fileNameFor(draft)
                )}`}
                target="_blank"
                rel="noopener noreferrer"
                startIcon={<SaveRoundedIcon />}
                sx={{ borderColor: "divider", color: "text.primary" }}
              >
                GitHub'da oluştur
              </Button>
            </Stack>

            <Alert severity="info" sx={{ mt: 1.5, fontSize: 12.5, borderRadius: 2 }}>
              Yayınlamak için dosyayı <code>src/content/writings/</code> klasörüne
              kaydedin ve <code>npm run deploy</code> çalıştırın. Taslağınız bu
              tarayıcıda otomatik saklanır.
            </Alert>
          </Box>
        </Box>

        {/* Sağ: önizleme + paylaşım */}
        <Box
          sx={{
            position: { lg: "sticky" },
            top: { lg: 88 },
            display: "flex",
            flexDirection: "column",
            gap: 2.5,
          }}
        >
          <Box
            sx={{
              border: "1px solid",
              borderColor: "divider",
              borderRadius: 2.5,
              p: 2,
            }}
          >
            <Typography sx={{ fontSize: 12, fontWeight: 600, color: "text.secondary", mb: 1.5 }}>
              KART ÖNİZLEMESİ
            </Typography>

            <CoverArt post={previewPost} ratio="16 / 9" radius={1.5}>
              <Stack
                justifyContent="flex-end"
                sx={{ position: "absolute", inset: 0, p: 1.75 }}
              >
                <Typography
                  sx={{
                    fontFamily: '"Instrument Serif", Georgia, serif',
                    fontSize: 20,
                    lineHeight: 1.15,
                    color: "#fff",
                    letterSpacing: "-0.01em",
                  }}
                >
                  {previewPost.title}
                </Typography>
                <Typography sx={{ fontSize: 11, color: "rgba(255,255,255,0.85)", mt: 0.5 }}>
                  {previewPost.readingTime} dk okuma
                </Typography>
              </Stack>
            </CoverArt>

            {tagList.length > 0 && (
              <Stack direction="row" spacing={0.75} flexWrap="wrap" rowGap={0.75} sx={{ mt: 1.5 }}>
                {tagList.map((tag) => (
                  <Chip
                    key={tag}
                    label={`#${tag}`}
                    size="small"
                    variant="outlined"
                    sx={{ height: 22, fontSize: 11, borderColor: "divider" }}
                  />
                ))}
              </Stack>
            )}
          </Box>

          <Box
            sx={{
              border: "1px solid",
              borderColor: "divider",
              borderRadius: 2.5,
              p: 2,
            }}
          >
            <Typography sx={{ fontSize: 12, fontWeight: 600, color: "text.secondary", mb: 0.5 }}>
              PAYLAŞIM GÖRSELİ
            </Typography>
            <Typography sx={{ fontSize: 12.5, color: "text.secondary", mb: 1.75, lineHeight: 1.6 }}>
              Instagram gönderisi, hikâye ve WhatsApp bağlantı kartı için hazır
              PNG üretin.
            </Typography>

            <ShareImageGenerator
              inline
              title={previewPost.title}
              date={previewPost.date}
              tags={tagList}
              seed={previewPost.slug}
              url={`https://huseyinafsin.github.io/writings/${previewPost.slug}`}
            />
          </Box>

          <Box
            sx={{
              border: "1px solid",
              borderColor: "divider",
              borderRadius: 2.5,
              p: 2,
            }}
          >
            <Typography sx={{ fontSize: 12, fontWeight: 600, color: "text.secondary", mb: 1 }}>
              KONTROL LİSTESİ
            </Typography>
            <Stack spacing={0.9}>
              {[
                { done: Boolean(draft.title.trim()), text: "Başlık" },
                { done: Boolean(draft.summary.trim()), text: "Özet" },
                { done: tagList.length > 0, text: "En az bir etiket" },
                { done: draft.body.trim().length > 80, text: "Yazı metni" },
                { done: Boolean(draft.cover.trim()), text: "Kapak (isteğe bağlı)" },
              ].map((item) => (
                <Stack key={item.text} direction="row" spacing={1} alignItems="center">
                  <Box
                    sx={{
                      width: 16,
                      height: 16,
                      borderRadius: "50%",
                      display: "grid",
                      placeItems: "center",
                      border: "1px solid",
                      borderColor: item.done ? "transparent" : "divider",
                      backgroundColor: item.done ? "text.primary" : "transparent",
                      color: "background.default",
                    }}
                  >
                    {item.done && <CheckRoundedIcon sx={{ fontSize: 11 }} />}
                  </Box>
                  <Typography
                    sx={{
                      fontSize: 12.5,
                      color: item.done ? "text.primary" : "text.secondary",
                    }}
                  >
                    {item.text}
                  </Typography>
                </Stack>
              ))}
            </Stack>
          </Box>
        </Box>
      </Box>

      <MediaDialog
        open={dialog === "image" || dialog === "video"}
        mode={dialog === "video" ? "video" : "image"}
        onClose={() => setDialog(null)}
        onInsert={insertBlock}
      />
      <CodeDialog
        open={dialog === "code"}
        onClose={() => setDialog(null)}
        onInsert={insertBlock}
      />
      <LinkDialog
        open={dialog === "link"}
        onClose={() => setDialog(null)}
        onInsert={(text) => insert("", "", text)}
      />

      <Dialog open={galleryOpen} onClose={() => setGalleryOpen(false)} maxWidth="sm" fullWidth>
        <DialogTitle sx={{ fontWeight: 600, fontSize: 18 }}>Yazı yükle</DialogTitle>
        <DialogContent>
          <Typography sx={{ fontSize: 13, color: "text.secondary", mb: 2 }}>
            Mevcut bir yazıyı düzenlemek için seçin.
          </Typography>
          <Stack spacing={1}>
            {existing.map((post) => (
              <ButtonBase
                key={post.slug}
                onClick={() => loadPost(post)}
                sx={{
                  display: "block",
                  width: "100%",
                  textAlign: "left",
                  p: 1.5,
                  borderRadius: 2,
                  border: "1px solid",
                  borderColor: "divider",
                  "&:hover": { backgroundColor: "action.hover" },
                }}
              >
                <Typography sx={{ fontSize: 14, fontWeight: 600 }}>{post.title}</Typography>
                <Typography sx={{ fontSize: 12, color: "text.secondary" }}>
                  {post.date} · {post.slug}
                </Typography>
              </ButtonBase>
            ))}
          </Stack>
        </DialogContent>
      </Dialog>

      <Snackbar
        open={Boolean(snack)}
        autoHideDuration={3200}
        onClose={() => setSnack("")}
        message={snack}
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
      />
    </Box>
  );
}

export default Studio;
