// Description.tsx
import { useRef } from "react";
import { motion, useInView } from "framer-motion";

import greenCar from "../assets/cars/green.svg";
import greenTrail from "../assets/cars/greenTrail.svg";
import redCar from "../assets/cars/red.svg";
import redTrail from "../assets/cars/redTrail.svg";
import blueCar from "../assets/cars/blue.svg";
import blueTrail from "../assets/cars/blueTrail.svg";

type CarCfg = {
  car: string;
  trail: string;
  from: { tx: string; ty: string; rot: string; opacity?: number };
  to:   { tx: string; ty: string; rot: string; opacity?: number };
  delay?: number;
  widthVW?: number;
  trailOffset?: { dx: string; dy: string };
  trailLen?: number; // 0→1 scalar for reveal
};

const CARS: CarCfg[] = [
  {
    car: blueCar,  trail: blueTrail,
    from: { tx: "16vw", ty: "-10vh", rot: "-25deg", opacity: 0 },
    to:   { tx: "6vw",  ty: "40vh",  rot: "3deg",   opacity: 1 },
    trailOffset: { dx: "3vw", dy: "-38vh" },
    widthVW: 10, delay: 0.00, trailLen: 1.3
  },
  {
    car: redCar,   trail: redTrail,
    from: { tx: "60vw", ty: "-10vh", rot: "15deg",  opacity: 0 },
    to:   { tx: "17vw", ty: "35vh",  rot: "3deg",   opacity: 1 },
    trailOffset: { dx: "2vw", dy: "-42vh" },
    widthVW: 10, delay: 0.12, trailLen: 1.2
  },
  {
    car: greenCar, trail: greenTrail,
    from: { tx: "70vw", ty: "-10vh", rot: "-10deg", opacity: 0 },
    to:   { tx: "20vw", ty: "70vh",  rot: "6deg",   opacity: 1 },
    trailOffset: { dx: "1.5vw", dy: "-66vh" },
    widthVW: 10, delay: 0.24, trailLen: 1.4
  },
];

export default function Description() {
  const triggerRef = useRef<HTMLDivElement>(null);
  const fire = useInView(triggerRef, { once: true, amount: 0.5 });

  return (
    <section style={section}>
      <div ref={triggerRef} style={{ position: "absolute", top: "50%", width: 1, height: 1 }} />

      {CARS.map((cfg, i) => {
        const init = { "--tx": cfg.from.tx, "--ty": cfg.from.ty, "--rot": cfg.from.rot, "--len": 0, opacity: cfg.from.opacity ?? 1 } as any;
        const fin  = { "--tx": cfg.to.tx,   "--ty": cfg.to.ty,   "--rot": cfg.to.rot,   "--len": cfg.trailLen ?? 1, opacity: cfg.to.opacity ?? 1 };

        return (
          <motion.div
            key={i}
            style={rig}
            initial={init}
            animate={fire ? fin : init}
            transition={{ type: "spring", stiffness: 120, damping: 15, delay: cfg.delay }}
          >
            {/* Trail (behind) */}
            <motion.img
              src={cfg.trail}
              style={{
                ...trailBase,
                transform: `translate(calc(var(--tx) + ${cfg.trailOffset?.dx ?? "0vw"}), calc(var(--ty) + ${cfg.trailOffset?.dy ?? "0vh"})) rotate(var(--rot))`,
                WebkitMaskImage: "linear-gradient(to top, black calc(var(--len)*100%), transparent calc(var(--len)*100%))",
                maskImage:       "linear-gradient(to top, black calc(var(--len)*100%), transparent calc(var(--len)*100%))",
                WebkitMaskSize: "100% 100%",
                maskSize: "100% 100%",
                WebkitMaskRepeat: "no-repeat",
                maskRepeat: "no-repeat",
              } as React.CSSProperties}
            />

            {/* Car (front) */}
            <motion.img
              src={cfg.car}
              style={{
                ...carBase,
                width: `${cfg.widthVW ?? 12}vw`,
                transform: "translate(var(--tx), var(--ty)) rotate(var(--rot))",
              } as React.CSSProperties}
            />
          </motion.div>
        );
      })}

      <motion.aside
        style={aside}
        initial={{ x: "20vw", opacity: 0 }}
        animate={fire ? { x: 0, opacity: 1 } : { x: "20vw", opacity: 0 }}
        transition={{ duration: 0.6, delay: 0.15 }}
      >
        <h2 style={{ margin: 0, fontSize: "2rem" }}>Reflections | Projections 2025</h2>
        <p style={{ marginTop: "1rem", lineHeight: 1.5 }}>
          Put your description here…
        </p>
      </motion.aside>
    </section>
  );
}

const section: React.CSSProperties = {
  position: "relative",
  minHeight: "160vh",
  background: "#000",
  overflow: "hidden",
  color: "#fff",
};

const rig: React.CSSProperties = {
  position: "absolute",
  inset: 0,
  pointerEvents: "none",
};

const trailBase: React.CSSProperties = {
  position: "absolute",
  zIndex: 0,
  transformOrigin: "50% 100%", // bottom center (car side)
  opacity: 0.9,
  filter: "blur(1px)",
};

const carBase: React.CSSProperties = {
  position: "absolute",
  minWidth: 100,
  transformOrigin: "50% 50%",
  zIndex: 1,
  filter: "drop-shadow(0 0 20px rgba(255,255,255,0.08))",
};

const aside: React.CSSProperties = {
  position: "absolute",
  top: "50%",
  right: "8vw",
  transform: "translateY(-50%)",
  maxWidth: 420,
};