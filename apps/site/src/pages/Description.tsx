// pages/Description.tsx
import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import greenCar    from "../assets/cars/green.svg";
import greenTrail  from "../assets/cars/greenTrail.svg";
import redCar      from "../assets/cars/red.svg";
import redTrail    from "../assets/cars/redTrail.svg";
import blueCar     from "../assets/cars/blue.svg";
import blueTrail   from "../assets/cars/blueTrail.svg";

type CarCfg = {
  car: string;
  trail: string;
  from: { left: string; top: string; rot: string; opacity?: number };
  to:   { left: string; top: string; rot: string; opacity?: number };
  delay?: number;
  widthPct?: string;    // percent of container width
};

const CARS: CarCfg[] = [
  {
    car: blueCar,  trail: blueTrail,
    from: { left: "14%", top: "-10%", rot: "-25deg", opacity: 0 },
    to:   { left: "6%",  top: "30%",  rot: "3deg",   opacity: 1 },
    delay: 0,
    widthPct: "150px"
  },
  {
    car: redCar,   trail: redTrail,
    from: { left: "60%", top: "-10%", rot: "15deg",  opacity: 0 },
    to:   { left: "17%", top: "25%",  rot: "3deg",   opacity: 1 },
    delay: 0.12,
    widthPct: "150px"
  },
  {
    car: greenCar, trail: greenTrail,
    from: { left: "70%", top: "-10%", rot: "-10deg", opacity: 0 },
    to:   { left: "20%", top: "45%",  rot: "6deg",   opacity: 1 },
    delay: 0.24,
    widthPct: "150px"
  },
];

export default function Description() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.5 });

  return (
    <section style={section}>
      <div ref={ref} style={{ position: "absolute", top: "50%", width: 1, height: 1 }} />

      {CARS.map((c, i) => (
        <motion.div
          key={i}
          style={{
            position: "absolute",
            left:    c.from.left,
            top:     c.from.top,
            width:   c.widthPct,
            pointerEvents: "none",
          }}
          initial={{
            opacity:   c.from.opacity,
            transform: `rotate(${c.from.rot})`,
          }}
          animate={inView ? {
            left:      c.to.left,
            top:       c.to.top,
            opacity:   c.to.opacity,
            transform: `rotate(${c.to.rot})`,
          } : {}}
          transition={{ type: "spring", stiffness: 120, damping: 15, delay: c.delay }}
        >
          {/* trail */}
          <img
            src={c.trail}
            style={{
              position: "absolute",
              bottom:   0,         // anchor to the car’s bottom
              left:     "50%",
              transform: "rotate(0deg) translateX(3%) translateY(-15%)",
              width:    "100%",
              height:   "360px",   // tall enough to cover to the top
              objectFit: "fill",
              zIndex:   0,
              maskImage: "linear-gradient(to top, black var(--pct), transparent var(--pct))",
              WebkitMaskImage: "linear-gradient(to top, black var(--pct), transparent var(--pct))",
            }}
            // animate CSS var --pct from 0%→100%
            as={motion.img}
            initial={{ "--pct": "0%" } as any}
            animate={inView ? { "--pct": "100%" } as any : {}}
            transition={{ delay: c.delay + 0.1, duration: 0.8 }}
          />

          {/* car */}
          <img
            src={c.car}
            style={{
              position: "relative",
              width:    "100%",
              zIndex:   1,
            }}
          />
        </motion.div>
      ))}

      {/* your text panel */}
      <motion.aside
        style={aside}
        initial={{ x: "20%", opacity: 0 }}
        animate={inView ? { x: 0, opacity: 1 } : {}}
        transition={{ duration: 0.6, delay: 0.15 }}
      >
        <h2>Reflections | Projections 2025</h2>
        <p>Put your description here…</p>
      </motion.aside>
    </section>
  );
}

const section: React.CSSProperties = {
  position:  "relative",
  minHeight: "160vh",
  background: "#000",
  overflow:   "hidden",
  color:      "#fff",
};

const aside: React.CSSProperties = {
  position: "absolute",
  top:      "50%",
  right:    "8%",
  transform: "translateY(-50%)",
  maxWidth:  "420px",
};