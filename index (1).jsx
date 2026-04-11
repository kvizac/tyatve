import { useState, useEffect, useRef } from "react";

/* ═══════════════════════════════════════════
   DATA
   ═══════════════════════════════════════════ */
const CATEGORIES = [
  {
    id: "breathing", title: "Dýchání", subtitle: "Návrat k dechu", icon: "🌬️",
    color: "#E8A87C",
    sessions: [
      { id: 1, title: "Ranní probuzení", duration: "8 min", desc: "Jemné dechové cvičení pro start dne" },
      { id: 2, title: "Box breathing", duration: "5 min", desc: "Čtvercové dýchání pro okamžitý klid" },
      { id: 3, title: "Večerní uvolnění", duration: "12 min", desc: "Hluboký dech před spaním" },
    ],
  },
  {
    id: "bodyscan", title: "Body Scan", subtitle: "Cesta tělem", icon: "✨",
    color: "#85CDCA",
    sessions: [
      { id: 4, title: "Rychlý scan", duration: "6 min", desc: "Pozorností skrz celé tělo" },
      { id: 5, title: "Hluboké uvolnění", duration: "20 min", desc: "Uvolnění každého svalu" },
      { id: 6, title: "Jóga nidra", duration: "30 min", desc: "Jogínský spánek – regenerace" },
    ],
  },
  {
    id: "visual", title: "Vizualizace", subtitle: "Vnitřní krajiny", icon: "🏔️",
    color: "#D4A5E5",
    sessions: [
      { id: 7, title: "Procházka lesem", duration: "15 min", desc: "Cesta tichým lesem" },
      { id: 8, title: "U moře", duration: "12 min", desc: "Zvuk vln a slaný vzduch" },
      { id: 9, title: "Horský pramen", duration: "10 min", desc: "Čistá voda a ticho hor" },
    ],
  },
  {
    id: "gratitude", title: "Vděčnost", subtitle: "Otevřené srdce", icon: "💛",
    color: "#F8E16C",
    sessions: [
      { id: 10, title: "Tři dobré věci", duration: "7 min", desc: "Co dobrého máme" },
      { id: 11, title: "Laskavost k sobě", duration: "10 min", desc: "Mettá meditace" },
      { id: 12, title: "Propojení", duration: "12 min", desc: "Sounáležitost se světem" },
    ],
  },
  {
    id: "sleep", title: "Usínání", subtitle: "Ke spánku", icon: "🌙",
    color: "#7EB6FF",
    sessions: [
      { id: 13, title: "Počítání hvězd", duration: "15 min", desc: "Jemné vedení do spánku" },
      { id: 14, title: "Těžké tělo", duration: "20 min", desc: "Propadání do matrace" },
      { id: 15, title: "Noční déšť", duration: "25 min", desc: "Zvuky deště a tichý hlas" },
    ],
  },
];

const TALES = {
  2: [
    { id: 101, title: "O řepě", duration: "4 min", icon: "🌱" },
    { id: 102, title: "O kohoutkovi a slepičce", duration: "5 min", icon: "🐓" },
    { id: 103, title: "O kočičce a pejskovi", duration: "5 min", icon: "🐱" },
    { id: 104, title: "Jak šlo vajíčko na vandr", duration: "4 min", icon: "🥚" },
  ],
  3: [
    { id: 201, title: "O třech medvědech", duration: "7 min", icon: "🐻" },
    { id: 202, title: "O zlaté rybce", duration: "8 min", icon: "🐟" },
    { id: 203, title: "Palečka", duration: "6 min", icon: "👧" },
    { id: 204, title: "O perníkové chaloupce", duration: "9 min", icon: "🏠" },
    { id: 205, title: "O veliké repě", duration: "6 min", icon: "🥕" },
  ],
  4: [
    { id: 301, title: "Jak šel Honzík do světa", duration: "12 min", icon: "🌍" },
    { id: 302, title: "Zvířátka a loupežníci", duration: "11 min", icon: "🎵" },
    { id: 303, title: "O Smolíčkovi", duration: "10 min", icon: "🦌" },
    { id: 304, title: "Budulínek", duration: "9 min", icon: "🏡" },
    { id: 305, title: "O neposlušných kůzlátkách", duration: "8 min", icon: "🐐" },
    { id: 306, title: "O červené Karkulce", duration: "10 min", icon: "🧣" },
  ],
};

/* ═══════════════════════════════════════════
   COMPONENTS
   ═══════════════════════════════════════════ */

function DlBtn({ onClick }) {
  return (
    <button onClick={e => { e.stopPropagation(); onClick(); }} style={{
      background: "linear-gradient(135deg, rgba(232,168,124,0.15), rgba(212,165,229,0.15))",
      border: "1px solid rgba(255,255,255,0.12)", borderRadius: 10, padding: "8px 16px",
      color: "#fff", fontSize: 12, fontFamily: "'Nunito',sans-serif", fontWeight: 700,
      cursor: "pointer", display: "flex", alignItems: "center", gap: 6, flexShrink: 0,
      transition: "all .2s", letterSpacing: "0.02em",
    }}
      onMouseEnter={e => { e.currentTarget.style.background = "linear-gradient(135deg, rgba(232,168,124,0.3), rgba(212,165,229,0.3))"; e.currentTarget.style.transform = "scale(1.06)"; }}
      onMouseLeave={e => { e.currentTarget.style.background = "linear-gradient(135deg, rgba(232,168,124,0.15), rgba(212,165,229,0.15))"; e.currentTarget.style.transform = ""; }}
    ><span style={{ fontSize: 14 }}>⬇</span> 29 Kč</button>
  );
}

function Modal({ item, onClose }) {
  return (
    <div onClick={onClose} style={{
      position: "fixed", inset: 0, background: "rgba(10,8,20,0.75)", backdropFilter: "blur(16px)",
      zIndex: 300, display: "flex", alignItems: "center", justifyContent: "center", padding: 24,
      animation: "fadeIn .2s ease",
    }}>
      <div onClick={e => e.stopPropagation()} style={{
        background: "linear-gradient(170deg, #1F1B2E, #141020)", borderRadius: 28,
        border: "1px solid rgba(255,255,255,0.08)", padding: "44px 36px", maxWidth: 400, width: "100%",
        animation: "popIn .3s cubic-bezier(.16,1,.3,1)", textAlign: "center",
        boxShadow: "0 40px 80px rgba(0,0,0,0.5)",
      }}>
        <div style={{ fontSize: 60, marginBottom: 18 }}>{item.icon}</div>
        <h3 style={{ fontFamily: "'Nunito',sans-serif", fontSize: 22, fontWeight: 800, margin: "0 0 6px" }}>{item.title}</h3>
        <p style={{ color: "rgba(255,255,255,0.4)", fontSize: 14, margin: "0 0 28px", fontWeight: 400 }}>Stáhněte si nahrávku pro offline poslech</p>
        <div style={{
          background: "rgba(255,255,255,0.04)", borderRadius: 16, padding: "20px 24px",
          marginBottom: 28, display: "flex", justifyContent: "space-between", alignItems: "center",
          border: "1px solid rgba(255,255,255,0.06)",
        }}>
          <span style={{ color: "rgba(255,255,255,0.5)", fontSize: 15 }}>Jednorázově</span>
          <span style={{ fontSize: 28, fontWeight: 900, fontFamily: "'Nunito',sans-serif", background: "linear-gradient(135deg,#E8A87C,#D4A5E5)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>29 Kč</span>
        </div>
        <button style={{
          width: "100%", padding: "16px 0", borderRadius: 16,
          background: "linear-gradient(135deg, #E8A87C, #D4A5E5)", border: "none",
          color: "#1a1525", fontSize: 16, fontWeight: 800, fontFamily: "'Nunito',sans-serif",
          cursor: "pointer", marginBottom: 16, transition: "transform .15s",
          letterSpacing: "0.02em",
        }}
          onMouseEnter={e => e.currentTarget.style.transform = "scale(1.02)"}
          onMouseLeave={e => e.currentTarget.style.transform = ""}
        >Zakoupit a stáhnout</button>
        <button onClick={onClose} style={{ background: "none", border: "none", color: "rgba(255,255,255,0.3)", fontSize: 14, cursor: "pointer", fontFamily: "'Nunito',sans-serif", fontWeight: 600 }}>Zrušit</button>
      </div>
    </div>
  );
}

function Player({ session, onClose }) {
  const [on, setOn] = useState(false);
  const [prog, setProg] = useState(0);
  const aRef = useRef(null);

  useEffect(() => {
    const a = aRef.current; if (!a) return;
    const t = () => { if (a.duration) setProg((a.currentTime / a.duration) * 100); };
    const e = () => { setOn(false); setProg(0); };
    a.addEventListener("timeupdate", t); a.addEventListener("ended", e);
    return () => { a.removeEventListener("timeupdate", t); a.removeEventListener("ended", e); };
  }, [session]);

  const toggle = () => {
    const a = aRef.current; if (!a) { setOn(!on); return; }
    if (on) a.pause(); else a.play().catch(() => {});
    setOn(!on);
  };
  const seek = e => {
    const a = aRef.current; if (!a?.duration) return;
    const r = e.currentTarget.getBoundingClientRect();
    a.currentTime = ((e.clientX - r.left) / r.width) * a.duration;
  };

  /* sim progress if no real audio */
  useEffect(() => {
    if (session.src || !on) return;
    const iv = setInterval(() => setProg(p => p >= 100 ? (setOn(false), 0) : p + 0.25), 120);
    return () => clearInterval(iv);
  }, [on, session.src]);

  return (
    <div style={{
      position: "fixed", bottom: 0, left: 0, right: 0,
      background: "linear-gradient(180deg, rgba(20,16,32,0.96), rgba(20,16,32,0.99))",
      backdropFilter: "blur(24px)", padding: "16px 28px", display: "flex", alignItems: "center", gap: 16,
      zIndex: 200, borderTop: "1px solid rgba(255,255,255,0.06)",
      animation: "slideUp .35s cubic-bezier(.16,1,.3,1)",
    }}>
      {session.src && <audio ref={aRef} src={session.src} preload="auto" />}
      <button onClick={toggle} style={{
        width: 50, height: 50, borderRadius: "50%", border: "none",
        background: "linear-gradient(135deg, #E8A87C, #D4A5E5)",
        color: "#1a1525", fontSize: 18, fontWeight: 900, cursor: "pointer", flexShrink: 0,
        display: "flex", alignItems: "center", justifyContent: "center",
        transition: "transform .15s", boxShadow: "0 4px 20px rgba(232,168,124,0.3)",
      }}
        onMouseEnter={e => e.currentTarget.style.transform = "scale(1.08)"}
        onMouseLeave={e => e.currentTarget.style.transform = ""}
      >{on ? "⏸" : "▶"}</button>
      <div style={{ flex: 1, minWidth: 0 }}>
        <div style={{ color: "#fff", fontSize: 15, fontWeight: 700, fontFamily: "'Nunito',sans-serif", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{session.title}</div>
        <div onClick={seek} style={{ marginTop: 8, height: 5, background: "rgba(255,255,255,0.08)", borderRadius: 3, cursor: "pointer", overflow: "hidden" }}>
          <div style={{ width: `${prog}%`, height: "100%", background: "linear-gradient(90deg,#E8A87C,#D4A5E5)", borderRadius: 3, transition: "width .12s linear" }} />
        </div>
      </div>
      <button onClick={onClose} style={{ background: "none", border: "none", color: "rgba(255,255,255,0.3)", fontSize: 26, cursor: "pointer", padding: 4, lineHeight: 1 }}>✕</button>
    </div>
  );
}

function A({ children, i = 0, d = 0 }) {
  return <div style={{ animation: `fadeIn .6s cubic-bezier(.16,1,.3,1) ${d + i * 0.06}s both` }}>{children}</div>;
}

/* ═══════════════════════════════════════════
   APP
   ═══════════════════════════════════════════ */
export default function App() {
  const [view, setView] = useState("home");
  const [cat, setCat] = useState(null);
  const [age, setAge] = useState(null);
  const [playing, setPlaying] = useState(null);
  const [dlItem, setDlItem] = useState(null);
  const [tr, setTr] = useState(false);

  const go = (v, p) => { setTr(true); setTimeout(() => { setView(v); if (v === "ms") setCat(p); if (v === "fs") setAge(p); setTr(false); }, 200); };
  const back = () => { if (view === "ms") go("med"); else if (view === "fs") go("tales"); else go("home"); };

  return (
    <div style={{ minHeight: "100vh", color: "#fff", fontFamily: "'Nunito',sans-serif", position: "relative", paddingBottom: playing ? 82 : 0 }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Nunito:wght@400;600;700;800;900&family=Cormorant+Garamond:ital,wght@0,300;0,400;0,500;0,600;1,300;1,400&display=swap');
        *{box-sizing:border-box;-webkit-tap-highlight-color:transparent;margin:0}
        body{margin:0;background:#0E0B18}
        @keyframes fadeIn{from{opacity:0;transform:translateY(18px)}to{opacity:1;transform:translateY(0)}}
        @keyframes slideUp{from{transform:translateY(100%)}to{transform:translateY(0)}}
        @keyframes popIn{from{opacity:0;transform:scale(.92) translateY(16px)}to{opacity:1;transform:scale(1) translateY(0)}}
        @keyframes orbMove1{0%,100%{transform:translate(0,0) scale(1)}25%{transform:translate(80px,-60px) scale(1.1)}50%{transform:translate(-40px,-100px) scale(0.95)}75%{transform:translate(-80px,40px) scale(1.05)}}
        @keyframes orbMove2{0%,100%{transform:translate(0,0) scale(1)}25%{transform:translate(-100px,50px) scale(1.08)}50%{transform:translate(60px,80px) scale(0.92)}75%{transform:translate(90px,-40px) scale(1.04)}}
        @keyframes orbMove3{0%,100%{transform:translate(0,0) scale(1)}33%{transform:translate(70px,90px) scale(1.06)}66%{transform:translate(-90px,-50px) scale(0.97)}}
        @keyframes float{0%,100%{transform:translateY(0)}50%{transform:translateY(-14px)}}
      `}</style>

      {/* ══ FULL ABSTRACT BACKGROUND ══ */}
      <div style={{ position: "fixed", inset: 0, zIndex: 0, overflow: "hidden", background: "linear-gradient(160deg, #0E0B18 0%, #160F28 30%, #0E0B18 60%, #12101E 100%)" }}>
        {/* large gradient orbs */}
        <div style={{ position: "absolute", width: 700, height: 700, borderRadius: "50%", background: "radial-gradient(circle, rgba(232,168,124,0.12) 0%, transparent 70%)", top: "-10%", left: "-10%", animation: "orbMove1 30s ease-in-out infinite" }} />
        <div style={{ position: "absolute", width: 800, height: 800, borderRadius: "50%", background: "radial-gradient(circle, rgba(212,165,229,0.10) 0%, transparent 70%)", top: "20%", right: "-15%", animation: "orbMove2 35s ease-in-out infinite" }} />
        <div style={{ position: "absolute", width: 600, height: 600, borderRadius: "50%", background: "radial-gradient(circle, rgba(133,205,202,0.09) 0%, transparent 70%)", bottom: "-5%", left: "30%", animation: "orbMove3 25s ease-in-out infinite" }} />
        <div style={{ position: "absolute", width: 500, height: 500, borderRadius: "50%", background: "radial-gradient(circle, rgba(126,182,255,0.07) 0%, transparent 70%)", top: "50%", left: "5%", animation: "orbMove2 28s ease-in-out infinite reverse" }} />
        <div style={{ position: "absolute", width: 550, height: 550, borderRadius: "50%", background: "radial-gradient(circle, rgba(248,225,108,0.06) 0%, transparent 70%)", top: "10%", left: "50%", animation: "orbMove1 32s ease-in-out infinite reverse" }} />
        {/* subtle noise texture */}
        <div style={{ position: "absolute", inset: 0, opacity: 0.03, backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`, backgroundSize: "200px" }} />
        {/* radial vignette */}
        <div style={{ position: "absolute", inset: 0, background: "radial-gradient(ellipse 80% 70% at 50% 40%, transparent 30%, rgba(14,11,24,0.6) 100%)" }} />
      </div>

      {/* ══ CONTENT ══ */}
      <div style={{
        position: "relative", zIndex: 1, maxWidth: 880, margin: "0 auto", padding: "48px 32px",
        opacity: tr ? 0 : 1, transform: tr ? "translateY(8px)" : "", transition: "opacity .2s,transform .2s",
      }}>

        {view !== "home" && (
          <A><button onClick={back} style={{
            background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.1)",
            borderRadius: 12, padding: "10px 22px", color: "rgba(255,255,255,0.55)",
            fontSize: 14, cursor: "pointer", fontFamily: "'Nunito',sans-serif", fontWeight: 700,
            marginBottom: 32, transition: "all .2s",
          }}
            onMouseEnter={e => e.currentTarget.style.background = "rgba(255,255,255,0.1)"}
            onMouseLeave={e => e.currentTarget.style.background = "rgba(255,255,255,0.05)"}
          >← zpět</button></A>
        )}

        {/* ═══════ HOME ═══════ */}
        {view === "home" && <>
          <A>
            <div style={{ textAlign: "center", marginTop: 56, marginBottom: 64 }}>
              {/* ornamental line */}
              <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 16, marginBottom: 28 }}>
                <div style={{ width: 60, height: 1, background: "linear-gradient(90deg, transparent, rgba(232,168,124,0.4))" }} />
                <div style={{ width: 10, height: 10, borderRadius: "50%", background: "linear-gradient(135deg, #E8A87C, #D4A5E5)", animation: "float 4s ease-in-out infinite" }} />
                <div style={{ width: 60, height: 1, background: "linear-gradient(90deg, rgba(212,165,229,0.4), transparent)" }} />
              </div>
              <h1 style={{
                fontFamily: "'Cormorant Garamond',serif", fontSize: "clamp(48px,8vw,84px)",
                fontWeight: 300, letterSpacing: "0.04em", lineHeight: 1, margin: 0,
                fontStyle: "italic",
                background: "linear-gradient(135deg, #E8A87C 0%, #D4A5E5 40%, #85CDCA 70%, #E8A87C 100%)",
                backgroundSize: "200% 200%",
                WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent",
              }}>Ty a Tvé</h1>
              <p style={{
                marginTop: 20, fontSize: "clamp(14px,2vw,17px)", lineHeight: 1.8,
                color: "rgba(255,255,255,0.45)", maxWidth: 500,
                margin: "20px auto 0", fontWeight: 400,
              }}>
                Prostor pro vnitřní klid. Meditace pro dospělé, pohádky pro&nbsp;nejmenší.
                Protože každý si zaslouží chvíli ticha — ať už je mu dva, nebo&nbsp;dvacet.
              </p>
            </div>
          </A>

          {/* two main cards */}
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: 20, maxWidth: 720, margin: "0 auto" }}>
            {[
              { k: "med", t: "Meditace", s: "Vedené meditace pro klid a rovnováhu", icon: "◯", accent: "#D4A5E5", gradBg: "linear-gradient(160deg, rgba(212,165,229,0.08) 0%, rgba(212,165,229,0.02) 100%)", borderC: "rgba(212,165,229,0.2)", glow: "rgba(212,165,229,0.12)" },
              { k: "tales", t: "Pohádky na dobrou noc", s: "Pro děti 2–4 roky · usínání s příběhem", icon: "☽", accent: "#85CDCA", gradBg: "linear-gradient(160deg, rgba(133,205,202,0.08) 0%, rgba(133,205,202,0.02) 100%)", borderC: "rgba(133,205,202,0.2)", glow: "rgba(133,205,202,0.12)" },
            ].map((it, i) => (
              <A key={it.k} i={i + 1} d={0.12}>
                <button onClick={() => go(it.k)} style={{
                  width: "100%", background: it.gradBg, border: `1px solid ${it.borderC}`,
                  borderRadius: 24, padding: "40px 32px", cursor: "pointer", textAlign: "center",
                  transition: "all .35s cubic-bezier(.16,1,.3,1)", position: "relative", overflow: "hidden",
                  minHeight: 240, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center",
                }}
                  onMouseEnter={e => { e.currentTarget.style.transform = "translateY(-6px)"; e.currentTarget.style.borderColor = it.accent + "50"; e.currentTarget.style.boxShadow = `0 24px 64px ${it.glow}`; }}
                  onMouseLeave={e => { e.currentTarget.style.transform = ""; e.currentTarget.style.borderColor = it.borderC; e.currentTarget.style.boxShadow = "none"; }}
                >
                  {/* decorative ring */}
                  <div style={{ position: "absolute", top: -60, right: -60, width: 200, height: 200, borderRadius: "50%", border: `1px solid ${it.accent}15` }} />
                  <div style={{ position: "absolute", bottom: -40, left: -40, width: 140, height: 140, borderRadius: "50%", border: `1px solid ${it.accent}10` }} />
                  <span style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: 48, color: it.accent, opacity: 0.7, display: "block", marginBottom: 16, fontWeight: 300, fontStyle: "italic" }}>{it.icon}</span>
                  <div style={{ fontSize: 22, fontWeight: 800, marginBottom: 8, letterSpacing: "-0.01em" }}>{it.t}</div>
                  <div style={{ fontSize: 14, color: "rgba(255,255,255,0.4)", fontWeight: 400, lineHeight: 1.5, maxWidth: 240 }}>{it.s}</div>
                  <div style={{ marginTop: 20, display: "inline-flex", alignItems: "center", gap: 8, color: it.accent, fontSize: 14, fontWeight: 700, letterSpacing: "0.02em" }}>
                    Prozkoumat →
                  </div>
                </button>
              </A>
            ))}
          </div>

          <A i={4} d={0.15}>
            <div style={{ textAlign: "center", marginTop: 56 }}>
              <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 16, marginBottom: 10 }}>
                <div style={{ width: 40, height: 1, background: "linear-gradient(90deg, transparent, rgba(255,255,255,0.1))" }} />
                <span style={{ fontSize: 10, color: "rgba(255,255,255,0.15)" }}>✦</span>
                <div style={{ width: 40, height: 1, background: "linear-gradient(90deg, rgba(255,255,255,0.1), transparent)" }} />
              </div>
              <p style={{ fontSize: 12, color: "rgba(255,255,255,0.2)", fontWeight: 600, letterSpacing: "0.1em", textTransform: "uppercase" }}>S láskou připravila vaše jóga instruktorka</p>
            </div>
          </A>
        </>}

        {/* ═══════ MEDITATION CATEGORIES ═══════ */}
        {view === "med" && <>
          <A>
            <div style={{ textAlign: "center", marginBottom: 40 }}>
              <h2 style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: "clamp(30px,5vw,48px)", fontWeight: 300, fontStyle: "italic", marginBottom: 8, letterSpacing: "0.02em" }}>Meditace</h2>
              <p style={{ color: "rgba(255,255,255,0.4)", fontSize: 15, maxWidth: 400, margin: "0 auto" }}>Vyberte druh, který vám právě sedí.</p>
            </div>
          </A>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(240px, 1fr))", gap: 16, maxWidth: 800, margin: "0 auto" }}>
            {CATEGORIES.map((c, i) => (
              <A key={c.id} i={i} d={0.06}>
                <button onClick={() => go("ms", c)} style={{
                  width: "100%", background: `${c.color}08`, border: `1px solid ${c.color}20`,
                  borderRadius: 20, padding: "28px 24px", cursor: "pointer", textAlign: "center",
                  transition: "all .3s cubic-bezier(.16,1,.3,1)", minHeight: 160,
                  display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center",
                }}
                  onMouseEnter={e => { e.currentTarget.style.transform = "translateY(-5px)"; e.currentTarget.style.borderColor = c.color + "50"; e.currentTarget.style.boxShadow = `0 16px 48px ${c.color}15`; }}
                  onMouseLeave={e => { e.currentTarget.style.transform = ""; e.currentTarget.style.borderColor = c.color + "20"; e.currentTarget.style.boxShadow = ""; }}
                >
                  <span style={{ fontSize: 36, marginBottom: 14 }}>{c.icon}</span>
                  <div style={{ fontSize: 18, fontWeight: 800, marginBottom: 4 }}>{c.title}</div>
                  <div style={{ fontSize: 13, color: "rgba(255,255,255,0.38)" }}>{c.subtitle}</div>
                  <div style={{ marginTop: 12, fontSize: 11, color: c.color, fontWeight: 700, letterSpacing: "0.05em", textTransform: "uppercase" }}>{c.sessions.length} nahrávky</div>
                </button>
              </A>
            ))}
          </div>
        </>}

        {/* ═══════ MEDITATION SESSIONS ═══════ */}
        {view === "ms" && cat && <>
          <A>
            <div style={{ textAlign: "center", marginBottom: 36 }}>
              <span style={{ fontSize: 44, display: "block", marginBottom: 12 }}>{cat.icon}</span>
              <h2 style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: "clamp(28px,5vw,42px)", fontWeight: 300, fontStyle: "italic", margin: 0 }}>{cat.title}</h2>
              <p style={{ color: "rgba(255,255,255,0.38)", fontSize: 14, marginTop: 6 }}>{cat.subtitle}</p>
            </div>
          </A>
          <div style={{ maxWidth: 640, margin: "0 auto", display: "flex", flexDirection: "column", gap: 10 }}>
            {cat.sessions.map((s, i) => (
              <A key={s.id} i={i} d={0.06}>
                <div onClick={() => setPlaying({ ...s, icon: cat.icon })} style={{
                  background: playing?.id === s.id ? `${cat.color}10` : "rgba(255,255,255,0.02)",
                  border: `1px solid ${playing?.id === s.id ? cat.color + "35" : "rgba(255,255,255,0.06)"}`,
                  borderRadius: 16, padding: "20px 24px", cursor: "pointer",
                  display: "flex", alignItems: "center", gap: 16, transition: "all .2s",
                }}
                  onMouseEnter={e => { e.currentTarget.style.background = `${cat.color}0A`; e.currentTarget.style.borderColor = `${cat.color}25`; }}
                  onMouseLeave={e => { e.currentTarget.style.background = playing?.id === s.id ? `${cat.color}10` : "rgba(255,255,255,0.02)"; e.currentTarget.style.borderColor = playing?.id === s.id ? cat.color + "35" : "rgba(255,255,255,0.06)"; }}
                >
                  <div style={{ width: 46, height: 46, borderRadius: "50%", background: `${cat.color}14`, display: "flex", alignItems: "center", justifyContent: "center", color: cat.color, fontSize: 15, flexShrink: 0, fontWeight: 900 }}>▶</div>
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <div style={{ fontSize: 16, fontWeight: 700 }}>{s.title}</div>
                    <div style={{ fontSize: 13, color: "rgba(255,255,255,0.32)", marginTop: 3, fontWeight: 400 }}>{s.desc}</div>
                  </div>
                  <span style={{ fontSize: 13, color: "rgba(255,255,255,0.25)", marginRight: 10, flexShrink: 0, fontWeight: 600 }}>{s.duration}</span>
                  <DlBtn onClick={() => setDlItem({ ...s, icon: cat.icon })} />
                </div>
              </A>
            ))}
          </div>
        </>}

        {/* ═══════ TALES AGE ═══════ */}
        {view === "tales" && <>
          <A>
            <div style={{ textAlign: "center", marginBottom: 40 }}>
              <h2 style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: "clamp(30px,5vw,48px)", fontWeight: 300, fontStyle: "italic", marginBottom: 8, letterSpacing: "0.02em" }}>Pohádky na dobrou noc</h2>
              <p style={{ color: "rgba(255,255,255,0.4)", fontSize: 15, maxWidth: 360, margin: "0 auto" }}>Kolik je vašemu malému posluchači?</p>
            </div>
          </A>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 16, maxWidth: 420, margin: "0 auto" }}>
            {[2, 3, 4].map((a, i) => {
              const cs = ["#E8A87C", "#85CDCA", "#D4A5E5"];
              const ics = ["🧸", "🦋", "🌟"];
              return (
                <A key={a} i={i} d={0.08}>
                  <button onClick={() => go("fs", a)} style={{
                    width: "100%", aspectRatio: "1/1.2", background: `${cs[i]}08`,
                    border: `1px solid ${cs[i]}25`, borderRadius: 22, padding: 16, cursor: "pointer",
                    display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: 8,
                    transition: "all .3s cubic-bezier(.16,1,.3,1)",
                  }}
                    onMouseEnter={e => { e.currentTarget.style.transform = "translateY(-6px) scale(1.03)"; e.currentTarget.style.borderColor = cs[i] + "60"; e.currentTarget.style.boxShadow = `0 20px 56px ${cs[i]}18`; }}
                    onMouseLeave={e => { e.currentTarget.style.transform = ""; e.currentTarget.style.borderColor = cs[i] + "25"; e.currentTarget.style.boxShadow = ""; }}
                  >
                    <span style={{ fontSize: 40 }}>{ics[i]}</span>
                    <span style={{ fontSize: 36, fontWeight: 900, color: cs[i], fontFamily: "'Nunito',sans-serif" }}>{a}</span>
                    <span style={{ fontSize: 13, color: "rgba(255,255,255,0.4)", fontWeight: 600 }}>roky</span>
                  </button>
                </A>
              );
            })}
          </div>
        </>}

        {/* ═══════ TALE SESSIONS ═══════ */}
        {view === "fs" && age && <>
          <A>
            <div style={{ textAlign: "center", marginBottom: 36 }}>
              <h2 style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: "clamp(28px,5vw,42px)", fontWeight: 300, fontStyle: "italic", margin: 0 }}>Pohádky pro {age}leté</h2>
              <p style={{ color: "rgba(255,255,255,0.38)", fontSize: 14, marginTop: 6 }}>{TALES[age].length} pohádek k poslechu</p>
            </div>
          </A>
          <div style={{ maxWidth: 640, margin: "0 auto", display: "flex", flexDirection: "column", gap: 10 }}>
            {TALES[age].map((t, i) => (
              <A key={t.id} i={i} d={0.05}>
                <div onClick={() => setPlaying(t)} style={{
                  background: playing?.id === t.id ? "rgba(133,205,202,0.07)" : "rgba(255,255,255,0.02)",
                  border: `1px solid ${playing?.id === t.id ? "rgba(133,205,202,0.28)" : "rgba(255,255,255,0.06)"}`,
                  borderRadius: 16, padding: "20px 24px", cursor: "pointer",
                  display: "flex", alignItems: "center", gap: 16, transition: "all .2s",
                }}
                  onMouseEnter={e => { e.currentTarget.style.background = "rgba(133,205,202,0.05)"; e.currentTarget.style.borderColor = "rgba(133,205,202,0.2)"; }}
                  onMouseLeave={e => { e.currentTarget.style.background = playing?.id === t.id ? "rgba(133,205,202,0.07)" : "rgba(255,255,255,0.02)"; e.currentTarget.style.borderColor = playing?.id === t.id ? "rgba(133,205,202,0.28)" : "rgba(255,255,255,0.06)"; }}
                >
                  <span style={{ fontSize: 34 }}>{t.icon}</span>
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <div style={{ fontSize: 16, fontWeight: 700 }}>{t.title}</div>
                    <div style={{ fontSize: 13, color: "rgba(255,255,255,0.3)", marginTop: 2, fontWeight: 400 }}>{t.duration}</div>
                  </div>
                  <DlBtn onClick={() => setDlItem(t)} />
                </div>
              </A>
            ))}
          </div>
        </>}

      </div>

      {playing && <Player session={playing} onClose={() => setPlaying(null)} />}
      {dlItem && <Modal item={dlItem} onClose={() => setDlItem(null)} />}
    </div>
  );
}
