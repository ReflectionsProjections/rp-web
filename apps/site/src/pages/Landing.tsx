// Landing.tsx
import Player from "lottie-react";
import animationData from "../assets/homeScreen1.json";

export default function Landing() {
  return (
    <section style={root}>
      <div style={lottieWrap}>
        <Player
          autoplay
          loop
          animationData={animationData as any}
          rendererSettings={{ preserveAspectRatio: "xMidYMid slice" }}
          style={fill}
        />
      </div>
      <div style={overlay}>reflections | projections</div>
    </section>
  );
}

const root: React.CSSProperties = {
  position: "relative",   // <- was fixed
  width: "100vw",
  height: "100vh",
  overflow: "hidden",
  zIndex: 0,
};

const lottieWrap: React.CSSProperties = {
  position: "absolute",
  inset: 0,
};

const fill: React.CSSProperties = {
  width: "100%",
  height: "100%",
  pointerEvents: "none",
};

const overlay: React.CSSProperties = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  zIndex: 1,
  color: "#fff",
  fontSize: "2.5rem",
  fontWeight: "bold",
  textAlign: "center",
  textShadow: "0 2px 8px rgba(0,0,0,0.5)",
};