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

      {/* white box + title */}
      <div style={centerBox}>
        <h1 style={title}>reflections | projections</h1>
      </div>
    </section>
  );
}

const root: React.CSSProperties = {
  position: "relative",
  width:    "100vw",
  height:   "100vh",
  overflow: "hidden",
};

const lottieWrap: React.CSSProperties = {
  position: "absolute",
  inset:    0,
};

const fill: React.CSSProperties = {
  width:          "100%",
  height:         "100%",
  pointerEvents:  "none",
};

const centerBox: React.CSSProperties = {
  position:       "absolute",
  top:            "35vh",            // tweak up/down
  left:           "50%",
  width:          "max(60vw, 500px)",
  height:         "max(12vh, 150px)",
  transform:      "translate(-50%, -50%)",
  backgroundColor: "#fff",
  padding:        "1rem 2rem",
  borderRadius:   "8px",
  boxShadow:      "0 4px 12px rgba(0,0,0,0.15)",
  alignContent:   "center",
  zIndex:         1,
};

const title: React.CSSProperties = {
  margin:      0,
  color:       "#000",
  fontSize:    "clamp(1.5rem, 2.5vw, 4rem)",
  fontWeight:  "bold",
  textAlign:   "center",
};