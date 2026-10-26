import React, { useEffect } from "react";
import {
  Box,
  Card,
  CardActionArea,
  CardContent,
  Chip,
  Grid,
  Typography,
} from "@mui/material";
import { Link as RouterLink } from "react-router-dom";
import { makeStyles } from "@mui/styles";
import { formatDate, getAllWritings } from "../utils/writings";

const useStyles = makeStyles((theme) => ({
  header: {
    marginBottom: theme.spacing(4),
  },
  card: {
    border: `1px solid ${theme.palette.grey[200]}`,
    borderRadius: "12px",
    backgroundColor: "transparent",
    transition: "transform 150ms ease, border-color 150ms ease",
    "&:hover": {
      transform: "translateY(-2px)",
      borderColor: theme.palette.grey[100],
    },
  },
  action: {
    display: "block",
    padding: theme.spacing(1),
  },
  meta: {
    color: theme.palette.text.secondary,
    fontSize: "13px",
  },
  title: {
    fontFamily: "Inter, sans-serif",
    fontWeight: 600,
    fontSize: "1.35rem",
    lineHeight: 1.4,
    margin: "6px 0 8px",
  },
  summary: {
    color: theme.palette.text.secondary,
    fontSize: "15px",
    lineHeight: 1.6,
  },
  tags: {
    display: "flex",
    flexWrap: "wrap",
    gap: theme.spacing(0.75),
    marginTop: theme.spacing(2),
  },
  empty: {
    border: `1px dashed ${theme.palette.grey[100]}`,
    borderRadius: "12px",
    padding: theme.spacing(5),
    textAlign: "center",
    color: theme.palette.text.secondary,
  },
}));

function Wiritings() {
  const classes = useStyles();
  const writings = getAllWritings();

  useEffect(() => {
    document.title = "Writings | Hüseyin Afşin";
  }, []);

  return (
    <div>
      <Box className={classes.header}>
        <Typography variant="caption" component="h1">
          Writings
        </Typography>
        <Typography variant="subtitle1">
          Yazılım, teknoloji ve öğrenme sürecimden notlar.
        </Typography>
      </Box>

      {writings.length === 0 ? (
        <Box className={classes.empty}>
          <Typography variant="h6" gutterBottom>
            Henüz yazı yok
          </Typography>
          <Typography variant="body2">
            <code>src/content/writings/</code> klasörüne bir markdown dosyası
            ekleyin. Yazılar otomatik olarak burada listelenir.
          </Typography>
        </Box>
      ) : (
        <Grid container spacing={2}>
          {writings.map((writing) => (
            <Grid item xs={12} key={writing.slug}>
              <Card className={classes.card} elevation={0}>
                <CardActionArea
                  component={RouterLink}
                  to={`/writings/${writing.slug}`}
                  className={classes.action}
                >
                  <CardContent>
                    <Typography className={classes.meta} component="p">
                      {formatDate(writing.date)} · {writing.readingTime} dk
                      okuma
                    </Typography>
                    <Typography className={classes.title} component="h2">
                      {writing.title}
                    </Typography>
                    {writing.summary && (
                      <Typography className={classes.summary} component="p">
                        {writing.summary}
                      </Typography>
                    )}
                    {writing.tags.length > 0 && (
                      <Box className={classes.tags}>
                        {writing.tags.map((tag) => (
                          <Chip
                            key={tag}
                            label={tag}
                            size="small"
                            variant="outlined"
                          />
                        ))}
                      </Box>
                    )}
                  </CardContent>
                </CardActionArea>
              </Card>
            </Grid>
          ))}
        </Grid>
      )}
    </div>
  );
}

export default Wiritings;
