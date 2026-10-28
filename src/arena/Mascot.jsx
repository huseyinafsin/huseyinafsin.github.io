import React from "react";

/**
 * Maskot çizimleri. `mascots/` klasöründeki referans fotoğraflardan
 * esinlenilmiş, tamamen SVG ile çizilmiş yorumlar. Marka logoları
 * kullanılmıyor; sadece siluet, renk ve bakış taklit ediliyor.
 */

/* Tüylü/kadife görünüm için ortak filtre. */
function Fuzz({ id }) {
  return (
    <filter id={id} x="-20%" y="-20%" width="140%" height="140%">
      <feTurbulence type="fractalNoise" baseFrequency="0.9" numOctaves="3" result="noise" />
      <feDisplacementMap in="SourceGraphic" in2="noise" scale="3.2" xChannelSelector="R" yChannelSelector="G" />
    </filter>
  );
}

function Gpt({ id }) {
  return (
    <svg viewBox="0 0 120 120" role="presentation" focusable="false">
      <defs>
        <Fuzz id={`${id}-fuzz`} />
        <radialGradient id={`${id}-body`} cx="38%" cy="26%" r="78%">
          <stop offset="0%" stopColor="#7fd6ff" />
          <stop offset="48%" stopColor="#38a8f2" />
          <stop offset="100%" stopColor="#12457f" />
        </radialGradient>
      </defs>

      <ellipse className="m-shadow" cx="60" cy="110" rx="26" ry="5" />

      {/* Gövde: yumuşak, hafif asimetrik blob */}
      <g filter={`url(#${id}-fuzz)`}>
        <path
          d="M60 30c17 0 30 11 30 26 0 9-4 17-10 22 2 4 1 8-3 8H43c-4 0-5-4-3-8-6-5-10-13-10-22 0-15 13-26 30-26z"
          fill={`url(#${id}-body)`}
        />
      </g>
      <path
        d="M60 30c17 0 30 11 30 26 0 9-4 17-10 22 2 4 1 8-3 8H43c-4 0-5-4-3-8-6-5-10-13-10-22 0-15 13-26 30-26z"
        fill="none"
        stroke="rgba(4,22,42,0.35)"
        strokeWidth="1.4"
      />
      <ellipse cx="46" cy="45" rx="16" ry="9" fill="rgba(255,255,255,0.2)" />

      {/* Bere */}
      <path
        d="M27 39c1-9 9-14 18-12 6-6 17-6 23 0 9-2 17 3 18 12 1 5-2 8-8 8H35c-6 0-9-3-8-8z"
        fill="#1b1b20"
      />
      <path
        d="M27 39c1-9 9-14 18-12 6-6 17-6 23 0 9-2 17 3 18 12"
        fill="none"
        stroke="rgba(255,255,255,0.14)"
        strokeWidth="2"
        strokeLinecap="round"
      />
      <circle cx="57" cy="20" r="5.4" fill="#23232a" />
      <circle cx="55.4" cy="18.4" r="1.8" fill="rgba(255,255,255,0.25)" />

      {/* Yüz: iki küçük oval göz */}
      <g className="m-eyes">
        <ellipse cx="51" cy="63" rx="4.4" ry="6" fill="#06121e" />
        <ellipse cx="69" cy="63" rx="4.4" ry="6" fill="#06121e" />
      </g>

      <ellipse cx="38" cy="70" rx="5.5" ry="2.8" fill="#1f5c96" opacity="0.55" />
      <ellipse cx="82" cy="70" rx="5.5" ry="2.8" fill="#1f5c96" opacity="0.55" />
    </svg>
  );
}

function Claude() {
  return (
    <svg viewBox="0 0 120 120" role="presentation" focusable="false">
      <defs>
        <linearGradient id="claude-body" x1="15%" y1="0%" x2="85%" y2="100%">
          <stop offset="0%" stopColor="#ffa852" />
          <stop offset="55%" stopColor="#f58a24" />
          <stop offset="100%" stopColor="#c25c0c" />
        </linearGradient>
      </defs>

      <ellipse className="m-shadow" cx="60" cy="110" rx="30" ry="5" />

      {/* Kollar */}
      <rect x="14" y="62" width="14" height="10" rx="3" fill="#e07714" />
      <rect x="92" y="62" width="14" height="10" rx="3" fill="#e07714" />

      {/* Bacaklar */}
      <rect x="36" y="92" width="9" height="14" rx="2" fill="#c25c0c" />
      <rect x="51" y="92" width="9" height="14" rx="2" fill="#e07714" />
      <rect x="66" y="92" width="9" height="14" rx="2" fill="#c25c0c" />
      <rect x="79" y="92" width="9" height="14" rx="2" fill="#e07714" />

      {/* Gövde: kutu, hafif yuvarlatılmış */}
      <rect x="24" y="38" width="72" height="56" rx="6" fill="url(#claude-body)" />
      <rect
        x="24"
        y="38"
        width="72"
        height="56"
        rx="6"
        fill="none"
        stroke="rgba(80,30,0,0.32)"
        strokeWidth="1.5"
      />
      <rect x="28" y="34" width="64" height="6" rx="3" fill="#ffbb75" />

      {/* Yüz: iki dikdörtgen göz */}
      <g className="m-eyes">
        <rect x="45" y="54" width="9" height="18" rx="4.5" fill="#14100c" />
        <rect x="66" y="54" width="9" height="18" rx="4.5" fill="#14100c" />
      </g>

      <path
        d="M53 80h14"
        stroke="#8a3c05"
        strokeWidth="2.6"
        strokeLinecap="round"
        opacity="0.55"
      />
    </svg>
  );
}

function Qwen() {
  return (
    <svg viewBox="0 0 120 120" role="presentation" focusable="false">
      <defs>
        <Fuzz id="qwen-fuzz" />
        <radialGradient id="qwen-body" cx="36%" cy="28%" r="80%">
          <stop offset="0%" stopColor="#c7f36b" />
          <stop offset="52%" stopColor="#8fd42c" />
          <stop offset="100%" stopColor="#3f7405" />
        </radialGradient>
      </defs>

      <ellipse className="m-shadow" cx="60" cy="110" rx="25" ry="5" />

      <g filter="url(#qwen-fuzz)">
        <path
          d="M60 34c15 0 27 9 27 21 0 12-12 21-27 21S33 67 33 55c0-12 12-21 27-21z"
          fill="url(#qwen-body)"
        />
        <path d="M44 36c3-8 11-12 16-8 4 3 3 8 3 8z" fill="url(#qwen-body)" />
        <path d="M76 36c-3-8-11-12-16-8-4 3-3 8-3 8z" fill="url(#qwen-body)" />
      </g>

      <path
        d="M60 34c15 0 27 9 27 21 0 12-12 21-27 21S33 67 33 55c0-12 12-21 27-21z"
        fill="none"
        stroke="rgba(30,60,0,0.3)"
        strokeWidth="1.4"
      />

      {/* Patlamış gözler */}
      <g className="m-eyes">
        <circle cx="50" cy="54" r="9.5" fill="#f7fce8" />
        <circle cx="71" cy="54" r="9.5" fill="#f7fce8" />
        <circle cx="52" cy="56" r="5.2" fill="#161d0a" />
        <circle cx="73" cy="56" r="5.2" fill="#161d0a" />
        <circle cx="54" cy="53.5" r="1.7" fill="#ffffff" />
        <circle cx="75" cy="53.5" r="1.7" fill="#ffffff" />
      </g>

      <path
        d="M51 72c3.5 3 14.5 3 18 0"
        fill="none"
        stroke="#2f4d06"
        strokeWidth="2.4"
        strokeLinecap="round"
      />
    </svg>
  );
}

function Grok() {
  return (
    <svg viewBox="0 0 120 120" role="presentation" focusable="false">
      <defs>
        <radialGradient id="grok-body" cx="34%" cy="26%" r="82%">
          <stop offset="0%" stopColor="#ffffff" />
          <stop offset="52%" stopColor="#eceef2" />
          <stop offset="100%" stopColor="#b9bfc9" />
        </radialGradient>
      </defs>

      <ellipse className="m-shadow" cx="60" cy="108" rx="27" ry="5.5" />

      <circle cx="60" cy="56" r="40" fill="url(#grok-body)" />
      <circle
        cx="60"
        cy="56"
        r="40"
        fill="none"
        stroke="rgba(60,66,78,0.28)"
        strokeWidth="1.5"
      />
      <ellipse cx="45" cy="35" rx="15" ry="10" fill="#ffffff" opacity="0.9" />

      {/* İki eğik koyu oval göz */}
      <g className="m-eyes">
        <ellipse
          cx="49"
          cy="54"
          rx="5.6"
          ry="9.4"
          fill="#101319"
          transform="rotate(-10 49 54)"
        />
        <ellipse
          cx="71"
          cy="54"
          rx="5.6"
          ry="9.4"
          fill="#101319"
          transform="rotate(-10 71 54)"
        />
      </g>

      <circle cx="94" cy="30" r="3" fill="#f2ebdd" opacity="0.7" />
      <circle cx="90" cy="22" r="1.6" fill="#f2ebdd" opacity="0.45" />
    </svg>
  );
}

const ART = { gpt: Gpt, claude: Claude, qwen: Qwen, grok: Grok };

function Mascot({ mascot, talking }) {
  const Art = ART[mascot.id] || Gpt;

  return (
    <div
      className={`mascot${talking ? " is-talking" : ""}`}
      style={{ "--mascot-color": mascot.color }}
      aria-hidden="true"
    >
      <Art id={mascot.id} />
    </div>
  );
}

export default Mascot;
