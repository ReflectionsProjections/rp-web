import { useEffect, useRef } from "react";

import {
  buildSkylineData,
  drawSkyline,
  animateWindowsOn,
  resizeSkylineCanvas,
  BuildingData
} from "./skyline";

function App() {
  const appRef = useRef<HTMLDivElement>(null);
  const trainRef = useRef<HTMLDivElement>(null);
  const train2Ref = useRef<HTMLDivElement>(null);
  const titleContainerRef = useRef<HTMLDivElement>(null);
  const subtitleRef = useRef<HTMLDivElement>(null);
  const ctaButtonRef = useRef<HTMLAnchorElement>(null);
  const bottomButtonsRef = useRef<HTMLDivElement>(null);
  const skylineCanvasRef = useRef<HTMLCanvasElement>(null);
  const titleSepRef = useRef<HTMLSpanElement>(null);
  const buttonGroupRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const app = appRef.current;
    const train = trainRef.current;
    const titleContainer = titleContainerRef.current;
    const subtitle = subtitleRef.current;
    const ctaButton = ctaButtonRef.current;
    const skylineCanvas = skylineCanvasRef.current;
    const titleSep = titleSepRef.current;

    const train2 = train2Ref.current;
    const bottomButtons = bottomButtonsRef.current;
    const buttonGroup = buttonGroupRef.current;

    if (
      !app ||
      !train ||
      !train2 ||
      !titleContainer ||
      !subtitle ||
      !ctaButton ||
      !bottomButtons ||
      !skylineCanvas ||
      !titleSep ||
      !buttonGroup
    )
      return;

    let timeout1: ReturnType<typeof setTimeout>;
    let timeout2: ReturnType<typeof setTimeout>;
    let cleanupReveal: (() => void) | undefined;
    let cleanupReveal2: (() => void) | undefined;

    const skylineData: BuildingData[] = buildSkylineData();
    resizeSkylineCanvas(skylineCanvas);
    drawSkyline(skylineCanvas, skylineData);

    const rafId = requestAnimationFrame(() => {
      timeout1 = setTimeout(() => {
        app.classList.add("animate");
        cleanupReveal = runRevealLoop(
          train,
          titleContainer,
          subtitle,
          buttonGroup,
          skylineCanvas,
          skylineData
        );
        timeout2 = setTimeout(() => {
          app.classList.add("animate2");
          train2.classList.add("active");
          cleanupReveal2 = runRevealLoop2(train2, bottomButtons);
        }, 1200);
      }, 200);
    });

    return () => {
      cancelAnimationFrame(rafId);
      clearTimeout(timeout1);
      clearTimeout(timeout2);
      if (cleanupReveal) cleanupReveal();
      if (cleanupReveal2) cleanupReveal2();
    };
  }, []);

  function runRevealLoop(
    train: HTMLDivElement,
    titleContainer: HTMLDivElement,
    subtitle: HTMLDivElement,
    buttonGroup: HTMLDivElement,
    skylineCanvas: HTMLCanvasElement,
    skylineData: BuildingData[]
  ) {
    let revealed = false;
    let skylineShown = false;
    let windowsTriggered = false;
    let titleLeft = 0;
    let titleWidth = 0;
    let cached = false;
    let rafId: number;
    let cleanupWindows: (() => void) | undefined;
    const vw = window.innerWidth;

    function tick() {
      const trainRect = train.getBoundingClientRect();

      if (!cached) {
        const titleRect = titleContainer.getBoundingClientRect();
        titleLeft = titleRect.left;
        titleWidth = titleRect.width;
        if (titleWidth > 0) cached = true;
      }

      if (cached) {
        const revealPx = trainRect.left - titleLeft;
        const revealPercent = Math.max(
          0,
          Math.min(100, (revealPx / titleWidth) * 100)
        );
        const clipRight = 100 - revealPercent;
        titleContainer.style.clipPath = `inset(-200px ${clipRight}% -200px -200px)`;

        if (revealPercent >= 10 && !revealed) {
          revealed = true;
          subtitle.classList.add("visible");
          buttonGroup.classList.add("visible");
        }

        if (revealPercent >= 100) {
          titleContainer.style.clipPath = "inset(-200px -200px -200px -200px)";
        }
      }

      if (!skylineShown && trainRect.left > vw * 0.15) {
        skylineShown = true;
        skylineCanvas.classList.add("visible");
      }

      if (skylineShown && !windowsTriggered) {
        windowsTriggered = true;
        cleanupWindows = animateWindowsOn(skylineCanvas, skylineData);
      }

      if (trainRect.left > vw) {
        return;
      }

      rafId = requestAnimationFrame(tick);
    }

    rafId = requestAnimationFrame(tick);
    return () => {
      cancelAnimationFrame(rafId);
      if (cleanupWindows) cleanupWindows();
    };
  }

  function runRevealLoop2(
    train2: HTMLDivElement,
    bottomButtons: HTMLDivElement
  ) {
    let revealed = false;
    let rafId: number;
    const vw = window.innerWidth;

    function tick2() {
      const trainRect = train2.getBoundingClientRect();

      if (!revealed && trainRect.left < vw * 0.6) {
        revealed = true;
        bottomButtons.classList.add("visible");
      }

      if (trainRect.right < 0) return;
      rafId = requestAnimationFrame(tick2);
    }

    rafId = requestAnimationFrame(tick2);
    return () => cancelAnimationFrame(rafId);
  }

  return (
    <div id="app" ref={appRef}>
      <div className="vignette"></div>

      <a
        href="https://reflectionsprojections.org"
        className="logo-link"
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Reflections Projections Home"
      >
        <img src="/rp_logo.svg" className="rp-logo" alt="RP Logo" />
      </a>

      <div className="train" ref={trainRef}>
        <div className="train-body">
          <div className="train-window"></div>
          <div className="train-window"></div>
          <div className="train-window"></div>
          <div className="train-window"></div>
          <div className="train-window"></div>
          <div className="train-stripe"></div>
          <div className="train-wheel train-wheel--front"></div>
          <div className="train-wheel train-wheel--rear"></div>
        </div>

        <div className="train-connector"></div>

        <div className="train-car-half">
          <div className="train-window--half"></div>
          <div className="train-window--half"></div>
          <div className="train-window--half"></div>
          <div className="train-window--half"></div>
          <div className="train-stripe"></div>
          <div className="train-wheel train-wheel--front"></div>
          <div className="train-wheel train-wheel--rear"></div>
        </div>

        <div className="train-connector"></div>

        <div className="train-body">
          <div className="train-window"></div>
          <div className="train-window"></div>
          <div className="train-window"></div>
          <div className="train-window"></div>
          <div className="train-window"></div>
          <div className="train-stripe"></div>
          <div className="train-wheel train-wheel--front"></div>
          <div className="train-wheel train-wheel--rear"></div>
        </div>

        <div className="train-connector"></div>

        <div className="train-car">
          <div className="train-window"></div>
          <div className="train-window"></div>
          <div className="train-window"></div>
          <div className="train-window"></div>
          <div className="train-stripe"></div>
          <div className="train-wheel train-wheel--front"></div>
          <div className="train-wheel train-wheel--rear"></div>
        </div>

        <div className="train-connector"></div>

        <div className="train-engine train-engine--front">
          <div className="train-engine-cockpit"></div>
          <div
            className="train-window"
            style={{ position: "absolute", left: "40px", top: "90px" }}
          ></div>
          <div className="train-engine-headlight"></div>
          <div className="train-engine-grill">
            <div className="grill-line"></div>
            <div className="grill-line"></div>
            <div className="grill-line"></div>
            <div className="grill-line"></div>
            <div className="grill-line"></div>
          </div>
          <div className="train-wheel train-wheel--front"></div>
          <div className="train-wheel train-wheel--rear"></div>
        </div>
      </div>

      <div className="train train--second" ref={train2Ref}>
        <div className="train-engine train-engine--front-reverse">
          <div className="train-engine-cockpit"></div>
          <div
            className="train-window"
            style={{ position: "absolute", right: "40px", top: "90px" }}
          ></div>
          <div className="train-engine-headlight"></div>
          <div className="train-engine-grill">
            <div className="grill-line"></div>
            <div className="grill-line"></div>
            <div className="grill-line"></div>
            <div className="grill-line"></div>
            <div className="grill-line"></div>
          </div>
          <div className="train-wheel train-wheel--front"></div>
          <div className="train-wheel train-wheel--rear"></div>
        </div>

        <div className="train-connector"></div>

        <div className="train-body">
          <div className="train-window"></div>
          <div className="train-window"></div>
          <div className="train-window"></div>
          <div className="train-window"></div>
          <div className="train-stripe"></div>
          <div className="train-wheel train-wheel--front"></div>
          <div className="train-wheel train-wheel--rear"></div>
        </div>

        <div className="train-connector"></div>

        <div className="train-car">
          <div className="train-window"></div>
          <div className="train-window"></div>
          <div className="train-window"></div>
          <div className="train-stripe"></div>
          <div className="train-wheel train-wheel--front"></div>
          <div className="train-wheel train-wheel--rear"></div>
        </div>

        <div className="train-connector"></div>

        <div className="train-body">
          <div className="train-window"></div>
          <div className="train-window"></div>
          <div className="train-window"></div>
          <div className="train-window"></div>
          <div className="train-stripe"></div>
          <div className="train-wheel train-wheel--front"></div>
          <div className="train-wheel train-wheel--rear"></div>
        </div>

        <div className="train-connector"></div>

        <div className="train-car">
          <div className="train-window"></div>
          <div className="train-window"></div>
          <div className="train-window"></div>
          <div className="train-stripe"></div>
          <div className="train-wheel train-wheel--front"></div>
          <div className="train-wheel train-wheel--rear"></div>
        </div>
      </div>

      <div className="title-container" ref={titleContainerRef}>
        <h1 className="title">
          <span>reflections</span>
          <span className="title-sep" ref={titleSepRef}>
            |
          </span>
          <span>projections</span>
        </h1>
        <h2 className="subtitle" ref={subtitleRef}>
          coming soon 2026
        </h2>
        <div className="button-group" ref={buttonGroupRef}>
          <a
            href="https://reflectionsprojections.org"
            target="_blank"
            rel="noopener noreferrer"
            className="cta-button"
            ref={ctaButtonRef}
          >
            2025 Site
          </a>
          <a
            href="https://info.reflectionsprojections.org/"
            target="_blank"
            rel="noopener noreferrer"
            className="cta-button about-button"
          >
            About Us
          </a>
        </div>
      </div>

      <div className="bottom-buttons" ref={bottomButtonsRef}>
        <div className="social-links">
          <a
            href="https://www.instagram.com/uiuc_rp/"
            target="_blank"
            rel="noopener noreferrer"
            className="social-item"
            title="Instagram"
            aria-label="Instagram"
          >
            <svg
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
              <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
              <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
            </svg>
          </a>
          <a
            href="https://www.tiktok.com/@uiuc_rp"
            target="_blank"
            rel="noopener noreferrer"
            className="social-item"
            title="TikTok"
            aria-label="TikTok"
          >
            <svg
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M9 12a4 4 0 1 0 4 4V4a5 5 0 0 0 5 5"></path>
            </svg>
          </a>
          <a
            href="https://www.linkedin.com/company/reflections-projections-uiuc/"
            target="_blank"
            rel="noopener noreferrer"
            className="social-item"
            title="LinkedIn"
            aria-label="LinkedIn"
          >
            <svg
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path>
              <rect x="2" y="9" width="4" height="12"></rect>
              <circle cx="4" cy="4" r="2"></circle>
            </svg>
          </a>
          <a
            href="https://github.com/ReflectionsProjections"
            target="_blank"
            rel="noopener noreferrer"
            className="social-item"
            title="GitHub"
            aria-label="GitHub"
          >
            <svg
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"></path>
            </svg>
          </a>
          <a
            href="mailto:contact@reflectionsprojections.org"
            className="social-item"
            title="Email"
            aria-label="Email"
          >
            <svg
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path>
              <polyline points="22,6 12,13 2,6"></polyline>
            </svg>
          </a>
        </div>
      </div>

      <canvas id="skyline-canvas" ref={skylineCanvasRef}></canvas>
    </div>
  );
}

export default App;
