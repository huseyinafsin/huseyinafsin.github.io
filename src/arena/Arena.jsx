import React, {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import Mascot from "./Mascot";
import RoastEngine from "./RoastEngine";
import { MASCOTS, STAGE_SUBTITLE } from "./mascots";
import { CURATOR } from "./lines";
import REPOS from "./repos.json";
import "./arena.css";

const KIND_LABEL = {
  repo: "repo",
  company: "şirket",
  banter: "laf sokma",
  intro: "tanıtım",
};

const BUBBLE_MAX = 306;

/** Küçük ekranlarda balon sahnenin kenarına yapışmasın. */
function bubbleLimit(stageWidth) {
  if (stageWidth < 420) return Math.max(180, stageWidth - 32);
  if (stageWidth < 720) return Math.max(200, stageWidth - 40);
  return BUBBLE_MAX;
}

function randomRepo(excludeName) {
  if (!REPOS.length) {
    return { name: "bu repo", lang: "", stars: 0, desc: "" };
  }
  let repo = REPOS[Math.floor(Math.random() * REPOS.length)];
  for (let attempt = 0; attempt < 6 && repo.name === excludeName; attempt += 1) {
    repo = REPOS[Math.floor(Math.random() * REPOS.length)];
  }
  return repo;
}

/** Balonun metnini harf harf yazar. */
function Typed({ text, instant }) {
  const [visible, setVisible] = useState(instant ? text.length : 0);

  useEffect(() => {
    if (instant) {
      setVisible(text.length);
      return undefined;
    }
    setVisible(0);
    let index = 0;
    const timer = window.setInterval(() => {
      index += 1;
      setVisible(index);
      if (index >= text.length) window.clearInterval(timer);
    }, 17);
    return () => window.clearInterval(timer);
  }, [text, instant]);

  return (
    <>
      {text.slice(0, visible)}
      <span className="caret" style={{ opacity: visible < text.length ? 1 : 0 }} />
    </>
  );
}

function Bubble({ mascot, bubble, reduced }) {
  return (
    <div
      className={`bubble${bubble.below ? " bubble--below" : ""}`}
      style={{
        left: `${bubble.left}px`,
        width: `${bubble.width || BUBBLE_MAX}px`,
        bottom: bubble.below ? "auto" : "calc(100% - 2px)",
        top: bubble.below ? "calc(100% - 2px)" : "auto",
        "--tail": `${bubble.tail}px`,
      }}
    >
      <div className="bubble-head">
        <span className="bubble-dot" style={{ background: mascot.color }} />
        <span className="bubble-name">{mascot.name}</span>
        <span className="bubble-kind">{KIND_LABEL[bubble.kind] || "not"}</span>
      </div>
      <p className="bubble-text">
        <Typed text={bubble.text} instant={reduced} />
      </p>
      {bubble.target && (
        <div className="bubble-target">→ {bubble.target}</div>
      )}
    </div>
  );
}

function Arena() {
  const [started, setStarted] = useState(() => {
    if (typeof window === "undefined") return false;
    return new URLSearchParams(window.location.search).has("sahne");
  });
  const [paused, setPaused] = useState(false);
  const [chaos, setChaos] = useState(false);
  const [pinned, setPinned] = useState(-1);
  const [bubbles, setBubbles] = useState({});
  const [log, setLog] = useState([]);
  const [aboutOpen, setAboutOpen] = useState(false);
  const [logOpen, setLogOpen] = useState(false);
  const [curatorIndex, setCuratorIndex] = useState(0);
  const [size, setSize] = useState(132);

  const reduced = useMemo(() => {
    if (typeof window === "undefined" || !window.matchMedia) return false;
    return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  }, []);

  const stageRef = useRef(null);
  const actorRefs = useRef({});
  const nodesRef = useRef({});
  const dimsRef = useRef({ w: 0, h: 0 });
  const sizeRef = useRef(132);
  const engineRef = useRef(null);
  const bubblesRef = useRef({});
  const pausedRef = useRef(false);
  const chaosRef = useRef(false);
  const pinnedRef = useRef(-1);
  const lastRepoRef = useRef("");

  if (!engineRef.current) engineRef.current = new RoastEngine();

  useEffect(() => {
    bubblesRef.current = bubbles;
  }, [bubbles]);

  useEffect(() => {
    pausedRef.current = paused;
  }, [paused]);

  useEffect(() => {
    chaosRef.current = chaos;
  }, [chaos]);

  useEffect(() => {
    pinnedRef.current = pinned;
  }, [pinned]);

  const currentRepo = useCallback(() => {
    if (pinnedRef.current >= 0 && REPOS[pinnedRef.current]) {
      return REPOS[pinnedRef.current];
    }
    const repo = randomRepo(lastRepoRef.current);
    lastRepoRef.current = repo.name;
    return repo;
  }, []);

  /** Maskotun ağzından yeni bir cümle çıkarır. */
  const announce = useCallback(
    (mascotId, payload) => {
      if (!payload) return;

      const dims = dimsRef.current;
      const node = nodesRef.current[mascotId];
      const size = sizeRef.current;
      const bubbleWidth = Math.min(bubbleLimit(dims.w), Math.max(180, dims.w - 24));

      let left = 8;
      let tail = bubbleWidth / 2;
      let below = false;

      if (node && dims.w > 0) {
        const roughLines = Math.ceil(payload.text.length / (bubbleWidth / 7.4));
        const height = 74 + roughLines * 22;
        const others = Object.entries(nodesRef.current).filter(
          ([id]) => id !== mascotId
        );

        const candidates = [];
        [false, true].forEach((isBelow) => {
          [0, -1, 1].forEach((shift) => {
            const offset = shift * (size * 0.7 + bubbleWidth * 0.35);
            const x0 = Math.max(
              8,
              Math.min(dims.w - bubbleWidth - 8, node.x - bubbleWidth / 2 + offset)
            );
            const y0 = isBelow
              ? node.y + size / 2 + 12
              : node.y - size / 2 - height - 12;

            let score = 0;
            if (y0 < 6) score += 900;
            if (y0 + height > dims.h - 6) score += 900;
            if (Math.abs(shift) === 1) score += 70;

            others.forEach(([, other]) => {
              const ox0 = other.x - other.size / 2;
              const oy0 = other.y - other.size / 2;
              const overlapX =
                Math.min(x0 + bubbleWidth, ox0 + other.size) - Math.max(x0, ox0);
              const overlapY =
                Math.min(y0 + height, oy0 + other.size) - Math.max(y0, oy0);
              if (overlapX > 0 && overlapY > 0) {
                score += overlapX * overlapY * 0.6;
              }
            });

            candidates.push({ x0, y0, isBelow, score });
          });
        });

        candidates.sort((a, b) => a.score - b.score);
        const best = candidates[0];
        left = best.x0 - (node.x - size / 2);
        tail = Math.max(22, Math.min(bubbleWidth - 22, node.x - best.x0));
        below = best.isBelow;
      }

      const duration = Math.max(
        5600,
        Math.min(11500, 2800 + payload.text.length * 50)
      );

      setBubbles((previous) => {
        const next = {
          ...previous,
          [mascotId]: {
            id: `${mascotId}-${Date.now()}-${Math.random()}`,
            text: payload.text,
            kind: payload.kind,
            target: payload.target,
            left,
            tail,
            width: bubbleWidth,
            below,
            until: Date.now() + duration,
          },
        };

        // Aynı anda gösterilecek balon sayısını sınırla; en eskiler düşer.
        const limit = dimsRef.current.w < 720 ? 1 : 2;
        const entries = Object.entries(next);
        if (entries.length <= limit) return next;

        entries.sort((a, b) => b[1].until - a[1].until);
        return entries.slice(0, limit).reduce((accumulator, [key, value]) => {
          accumulator[key] = value;
          return accumulator;
        }, {});
      });

      setLog((previous) =>
        [
          {
            id: `${Date.now()}-${Math.random()}`,
            mascotId,
            text: payload.text,
            kind: payload.kind,
            time: new Date(),
          },
          ...previous,
        ].slice(0, 90)
      );
    },
    []
  );

  const speak = useCallback(
    (mascotId, options = {}) => {
      const payload = engineRef.current.speak(
        mascotId,
        currentRepo(),
        options
      );
      announce(mascotId, payload);
    },
    [announce, currentRepo]
  );

  /* -------------------------------------------------------------- */
  /* Ölçüm ve yerleşim                                              */
  /* -------------------------------------------------------------- */

  useEffect(() => {
    const stage = stageRef.current;
    if (!stage) return undefined;

    const measure = () => {
      const rect = stage.getBoundingClientRect();
      if (!rect.width || !rect.height) return;

      const previous = dimsRef.current;
      dimsRef.current = { w: rect.width, h: rect.height };
      const nextSize = rect.width < 720 ? 104 : rect.width < 1100 ? 132 : 158;
      sizeRef.current = nextSize;
      setSize(nextSize);

      const nodes = nodesRef.current;
      const spots = [
        [0.2, 0.36],
        [0.74, 0.3],
        [0.32, 0.72],
        [0.79, 0.68],
      ];

      MASCOTS.forEach((mascot, index) => {
        if (!nodes[mascot.id]) {
          const [fx, fy] = spots[index] || [0.5, 0.5];
          nodes[mascot.id] = {
            x: rect.width * fx,
            y: rect.height * fy,
            angle: Math.random() * Math.PI * 2,
            nextTurn: Math.random() * 2,
            seed: Math.random() * 10,
            size: nextSize,
          };
        } else {
          nodes[mascot.id].size = nextSize;
        }
      });

      if (previous.w && previous.h) {
        Object.values(nodes).forEach((node) => {
          node.x = Math.min(Math.max(node.x, node.size / 2 + 10), rect.width - node.size / 2 - 10);
          node.y = Math.min(Math.max(node.y, node.size / 2 + 10), rect.height - node.size / 2 - 10);
        });
      }

      // Hareket azaltıldığında animasyon döngüsü çalışmadığı için
      // maskotların konumları burada bir kez uygulanır.
      MASCOTS.forEach((mascot) => {
        const node = nodes[mascot.id];
        const element = actorRefs.current[mascot.id];
        if (!node || !element) return;
        element.style.transform = `translate3d(${node.x - node.size / 2}px, ${
          node.y - node.size / 2
        }px, 0)`;
      });
    };

    measure();

    const observer =
      typeof ResizeObserver !== "undefined" ? new ResizeObserver(measure) : null;
    if (observer) observer.observe(stage);
    window.addEventListener("resize", measure);

    return () => {
      if (observer) observer.disconnect();
      window.removeEventListener("resize", measure);
    };
  }, []);

  /* -------------------------------------------------------------- */
  /* Gezinme                                                        */
  /* -------------------------------------------------------------- */

  useEffect(() => {
    if (!started || reduced) return undefined;

    let frame = 0;
    let last = performance.now();

    const tick = (now) => {
      const delta = Math.min(0.05, (now - last) / 1000);
      last = now;
      const dims = dimsRef.current;

      MASCOTS.forEach((mascot) => {
        const node = nodesRef.current[mascot.id];
        const element = actorRefs.current[mascot.id];
        if (!node || !element || !dims.w) return;

        const talking = Boolean(bubblesRef.current[mascot.id]);

        if (!pausedRef.current) {
          node.nextTurn -= delta;
          if (node.nextTurn <= 0) {
            node.angle += (Math.random() - 0.5) * 2.8;
            node.nextTurn = 1.4 + Math.random() * 3.1;
          }

          const baseSpeed = chaosRef.current ? 96 : 28;
          const speed = baseSpeed * (talking ? 0.22 : 1);
          node.x += Math.cos(node.angle) * speed * delta;
          node.y += Math.sin(node.angle) * speed * delta;

          const padX = node.size / 2 + 12;
          const padTop = Math.min(node.size / 2 + 186, dims.h * 0.38);
          const padBottom = node.size / 2 + 14;
          const maxY = Math.max(padTop + 8, dims.h - padBottom);

          if (node.x < padX) {
            node.x = padX;
            node.angle = Math.PI - node.angle;
          }
          if (node.x > dims.w - padX) {
            node.x = dims.w - padX;
            node.angle = Math.PI - node.angle;
          }
          if (node.y < padTop) {
            node.y = padTop;
            node.angle = -node.angle;
          }
          if (node.y > maxY) {
            node.y = maxY;
            node.angle = -node.angle;
          }
        }

        const bob = Math.sin(now / 1500 + node.seed) * 3.2;
        element.style.transform = `translate3d(${node.x - node.size / 2}px, ${
          node.y - node.size / 2 + bob
        }px, 0)`;
      });

      frame = window.requestAnimationFrame(tick);
    };

    frame = window.requestAnimationFrame(tick);
    return () => window.cancelAnimationFrame(frame);
  }, [started, reduced]);

  const slotOpen = useCallback(() => {
    if (pausedRef.current) return null;
    const now = Date.now();
    const limit = dimsRef.current.w < 720 ? 1 : 2;
    const active = Object.entries(bubblesRef.current).filter(
      ([, bubble]) => bubble.until > now
    );
    if (active.length >= limit) return null;
    const free = MASCOTS.filter((mascot) => !bubblesRef.current[mascot.id]);
    if (!free.length) return null;
    return free;
  }, []);

  /* -------------------------------------------------------------- */
  /* Konuşma zamanlaması                                            */
  /* -------------------------------------------------------------- */

  useEffect(() => {
    if (!started) return undefined;

    const timer = window.setInterval(() => {
      const free = slotOpen();
      if (!free) return;
      const mascot = free[Math.floor(Math.random() * free.length)];
      speak(mascot.id);
    }, 1500);

    return () => window.clearInterval(timer);
  }, [started, speak, slotOpen]);

  useEffect(() => {
    const timer = window.setInterval(() => {
      setBubbles((previous) => {
        const now = Date.now();
        let changed = false;
        const next = {};
        Object.entries(previous).forEach(([key, bubble]) => {
          if (bubble.until > now) next[key] = bubble;
          else changed = true;
        });
        return changed ? next : previous;
      });
    }, 400);
    return () => window.clearInterval(timer);
  }, []);

  useEffect(() => {
    if (!started) return undefined;
    const timers = MASCOTS.map((mascot, index) =>
      window.setTimeout(() => {
        if (!slotOpen()) return;
        announce(mascot.id, engineRef.current.intro(mascot.id));
      }, 420 + index * 1750)
    );
    return () => timers.forEach((timer) => window.clearTimeout(timer));
  }, [started, announce, slotOpen]);

  useEffect(() => {
    const timer = window.setInterval(() => {
      setCuratorIndex((index) => (index + 1) % CURATOR.length);
    }, 6800);
    return () => window.clearInterval(timer);
  }, [started]);

  /* Klavye: Esc pencereleri kapatır, boşluk sahneyi duraklatır. */
  useEffect(() => {
    const onKeyDown = (event) => {
      if (event.key === "Escape") {
        setAboutOpen(false);
        setLogOpen(false);
        return;
      }

      const tag = (event.target && event.target.tagName) || "";
      if (/^(INPUT|TEXTAREA|SELECT)$/.test(tag)) return;

      if (event.key === " " && !aboutOpen && !logOpen) {
        event.preventDefault();
        setPaused((value) => !value);
      }
    };

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [aboutOpen, logOpen]);

  /* -------------------------------------------------------------- */

  const handlePickRepo = (index) => {
    setPinned(index);
    pinnedRef.current = index;
    const repo = index >= 0 ? REPOS[index] : randomRepo(lastRepoRef.current);
    lastRepoRef.current = repo.name;

    const free = MASCOTS.filter((mascot) => !bubblesRef.current[mascot.id]);
    const pool = free.length ? free : MASCOTS;
    const mascot = pool[Math.floor(Math.random() * pool.length)];

    announce(
      mascot.id,
      engineRef.current.speak(mascot.id, repo, { kind: "repo" })
    );
  };

  const handleMascotClick = (mascotId) => {
    speak(mascotId);
  };

  return (
    <div className="arena">
      <header className="topbar">
        <div className="brand">
          <div className="brand-mark" aria-hidden="true">
            MA
          </div>
          <div>
            <div className="brand-title">Model Atölyesi</div>
            <div className="brand-sub">bir eleştiri sahnesi · 2026</div>
          </div>
        </div>

        <nav className="controls" aria-label="Sahne kontrolleri">
          <button
            type="button"
            className={`ctl${chaos ? " is-on" : ""}`}
            onClick={() => setChaos((value) => !value)}
            aria-pressed={chaos}
          >
            Kaos
          </button>
          <button
            type="button"
            className={`ctl${paused ? " is-on" : ""}`}
            onClick={() => setPaused((value) => !value)}
            aria-pressed={paused}
          >
            {paused ? "Devam" : "Duraklat"}
          </button>
          <button
            type="button"
            className="ctl"
            onClick={() => setLogOpen(true)}
          >
            Tutanak
            <span className="ctl-count">{log.length}</span>
          </button>
          <button
            type="button"
            className="ctl"
            onClick={() => setAboutOpen(true)}
          >
            Manifesto
          </button>
        </nav>
      </header>

      <main className="stage" ref={stageRef}>
        <div className="stage-watermark" aria-hidden="true">
          <span>atölye</span>
        </div>
        <div className="stage-frame" aria-hidden="true">
          <i />
          <i />
          <i />
          <i />
        </div>

        <span className="stage-note stage-note--tl">Sahne 01 — maskotlar serbest</span>
        <span className="stage-note stage-note--tr">
          {REPOS.length} repo · 4 maskot
          <br />
          hiçbir model çalıştırılmıyor
        </span>
        <span className="stage-note stage-note--bl">
          maskota dokun → yeni cümle
        </span>

        {paused && <div className="paused-badge">Duraklatıldı</div>}

        {MASCOTS.map((mascot) => {
          const bubble = bubbles[mascot.id];
          return (
            <div
              key={mascot.id}
              className={`actor${bubble ? " is-speaking" : ""}`}
              ref={(element) => {
                actorRefs.current[mascot.id] = element;
              }}
              style={{
                width: size,
                height: size,
              }}
              onClick={() => handleMascotClick(mascot.id)}
              onKeyDown={(event) => {
                if (event.key === "Enter" || event.key === " ") {
                  event.preventDefault();
                  handleMascotClick(mascot.id);
                }
              }}
              role="button"
              tabIndex={0}
              aria-label={`${mascot.name} konuşsun`}
            >
              <Mascot mascot={mascot} talking={Boolean(bubble)} />
              {bubble && (
                <Bubble mascot={mascot} bubble={bubble} reduced={reduced} />
              )}
            </div>
          );
        })}
      </main>

      <footer className="understage">
        <div className="ticker">
          <span className="ticker-label">Küratör</span>
          <span className="ticker-text" key={curatorIndex}>
            {CURATOR[curatorIndex]}
          </span>
        </div>

        <div className="repo-rail">
          <span className="rail-label">Hedef repo</span>
          <div className="rail-scroll">
            <button
              type="button"
              className={`chip chip--random${pinned < 0 ? " is-active" : ""}`}
              onClick={() => handlePickRepo(-1)}
            >
              rastgele
            </button>
            {REPOS.map((repo, index) => (
              <button
                key={repo.name}
                type="button"
                className={`chip${pinned === index ? " is-active" : ""}`}
                onClick={() => handlePickRepo(index)}
                title={repo.desc || repo.name}
              >
                {repo.name}
              </button>
            ))}
          </div>
        </div>
      </footer>

      {!started && (
        <div className="overlay intro">
          <div className="intro-grid" aria-hidden="true" />
          <div className="intro-card">
            <div className="intro-parade" aria-hidden="true">
              {MASCOTS.map((mascot) => (
                <Mascot key={mascot.id} mascot={mascot} talking={false} />
              ))}
            </div>
            <div className="eyebrow">Bir eleştiri sahnesi · 2026</div>
            <h1 className="intro-title">
              Model <em>Atölyesi</em>
            </h1>
            <p className="intro-lede">{STAGE_SUBTITLE}</p>
            <p className="intro-note">
              Dört maskot rastgele gezer, {REPOS.length} repoyu çekiştirir ve
              birbirine laf sokar. Hepsi kurgudur. Hiçbiri kurgu değildir.
            </p>
            <div className="intro-actions">
              <button
                type="button"
                className="btn-primary"
                onClick={() => setStarted(true)}
              >
                Perdeyi aç
              </button>
              <button
                type="button"
                className="btn-ghost"
                onClick={() => setAboutOpen(true)}
              >
                Manifesto
              </button>
            </div>
          </div>
        </div>
      )}

      {aboutOpen && (
        <div
          className="overlay"
          onClick={(event) => {
            if (event.target === event.currentTarget) setAboutOpen(false);
          }}
          role="dialog"
          aria-modal="true"
          aria-label="Manifesto"
        >
          <div className="dialog">
            <div className="dialog-head">
              <h2 className="dialog-title">Manifesto</h2>
              <button
                type="button"
                className="dialog-close"
                onClick={() => setAboutOpen(false)}
                aria-label="Kapat"
              >
                ✕
              </button>
            </div>
            <div className="dialog-body">
              <p>
                Bu sahne, 2026 yılında dört yapay zekâ şirketinin ürün dilini
                taklit eden bir eleştiri denemesidir. Maskotlar rastgele gezer,
                rastgele konuşur ve çoğunlukla aynı şeyi söyler.
              </p>
              <p>
                Bu bir kusur değil, eserin konusudur.{" "}
                <strong>Hepsi farklı görünür, hepsi aynı yerden beslenir.</strong>{" "}
                Biri güvenlikten, diğeri şeffaflıktan, bir diğeri açık
                kaynaktan bahseder; hiçbiri kendi şirketini eleştirmez.
              </p>
              <p>
                Repolar gerçek: bir yazılımcının yıllar içinde biriktirdiği
                denemeler, ödevler, yarım kalmış fikirler. Maskotlar onları
                çekiştirirken aslında kendi ürünlerini savunuyordur. Bu da
                eserin ikinci konusudur.
              </p>
              <p>
                Hiçbir şirket burada temsil edilmiyor. Hepsi temsil ediliyor.
              </p>
              <div className="signature">— Hüseyin Afşin</div>
              <div className="dialog-meta">
                Maskota dokun: yeni bir cümle.
                <br />
                Alttan repo seç: hedefi sen belirle.
                <br />
                Kaos: maskotlar panikler.
              </div>
            </div>
          </div>
        </div>
      )}

      {logOpen && (
        <div
          className="overlay"
          onClick={(event) => {
            if (event.target === event.currentTarget) setLogOpen(false);
          }}
          role="dialog"
          aria-modal="true"
          aria-label="Tutanak"
        >
          <div className="dialog">
            <div className="dialog-head">
              <h2 className="dialog-title">Tutanak</h2>
              <button
                type="button"
                className="dialog-close"
                onClick={() => setLogOpen(false)}
                aria-label="Kapat"
              >
                ✕
              </button>
            </div>
            <div className="dialog-body">
              {log.length === 0 ? (
                <div className="log-empty">
                  Henüz kimse konuşmadı. Bu da bir tutanaktır.
                </div>
              ) : (
                <div className="log-list">
                  {log.map((entry) => {
                    const mascot = MASCOTS.find(
                      (item) => item.id === entry.mascotId
                    );
                    return (
                      <div className="log-row" key={entry.id}>
                        <div className="log-meta">
                          <b>{mascot ? mascot.name : "?"}</b>
                          {entry.time.toLocaleTimeString("tr-TR", {
                            hour: "2-digit",
                            minute: "2-digit",
                          })}
                        </div>
                        <div className="log-text">{entry.text}</div>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Arena;
