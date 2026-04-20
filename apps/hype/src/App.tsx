import { useEffect, useRef } from 'react';
import './App.css';
import { buildSkylineData, drawSkyline, animateWindowsOn, BuildingData } from './skyline';

function App() {
  const appRef = useRef<HTMLDivElement>(null);
  const trainRef = useRef<HTMLDivElement>(null);
  const titleContainerRef = useRef<HTMLDivElement>(null);
  const subtitleRef = useRef<HTMLDivElement>(null);
  const ctaButtonRef = useRef<HTMLAnchorElement>(null);
  const skylineCanvasRef = useRef<HTMLCanvasElement>(null);
  const titleSepRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const app = appRef.current;
    const train = trainRef.current;
    const titleContainer = titleContainerRef.current;
    const subtitle = subtitleRef.current;
    const ctaButton = ctaButtonRef.current;
    const skylineCanvas = skylineCanvasRef.current;
    const titleSep = titleSepRef.current;

    if (!app || !train || !titleContainer || !subtitle || !ctaButton || !skylineCanvas || !titleSep) return;

    const skylineData: BuildingData[] = buildSkylineData();
    drawSkyline(skylineCanvas, skylineData);

    const rafId = requestAnimationFrame(() => {
      setTimeout(() => {
        app.classList.add('animate');
        runRevealLoop(train, titleContainer, titleSep, subtitle, ctaButton, skylineCanvas, skylineData);
      }, 200);
    });

    return () => cancelAnimationFrame(rafId);
  }, []);

  function runRevealLoop(
    train: HTMLDivElement,
    titleContainer: HTMLDivElement,
    titleSep: HTMLSpanElement,
    subtitle: HTMLDivElement,
    ctaButton: HTMLAnchorElement,
    skylineCanvas: HTMLCanvasElement,
    skylineData: BuildingData[]
  ) {
    let revealed = false;
    let skylineShown = false;
    let windowsTriggered = false;
    let titleLeft = 0;
    let titleWidth = 0;
    let cached = false;
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
        const revealPercent = Math.max(0, Math.min(100, (revealPx / titleWidth) * 100));
        const clipRight = 100 - revealPercent;
        titleContainer.style.clipPath = `inset(0 ${clipRight}% 0 0)`;

        if (revealPercent >= 50 && !revealed) {
          revealed = true;
          subtitle.classList.add('visible');
          ctaButton.classList.add('visible');
        }

        if (revealPercent >= 100) {
          titleContainer.style.clipPath = 'inset(0 0 0 0)';
        }
      }

      if (!skylineShown && trainRect.left > vw * 0.15) {
        skylineShown = true;
        skylineCanvas.classList.add('visible');
      }

      if (skylineShown && !windowsTriggered) {
        windowsTriggered = true;
        animateWindowsOn(skylineCanvas, skylineData);
      }

      if (trainRect.left > vw) {
        return;
      }

      requestAnimationFrame(tick);
    }

    requestAnimationFrame(tick);
  }

  return (
    <div id="app" ref={appRef}>
      <div className="vignette"></div>

      <div className="train" ref={trainRef}>
        <div className="train-engine">
          <div className="train-engine-cockpit"></div>
          <div className="train-window" style={{ position: 'absolute', right: '40px', top: '90px' }}></div>
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
      </div>

      <div className="title-container" ref={titleContainerRef}>
        <h1 className="title">
          <span>reflections</span> <span className="title-sep" ref={titleSepRef}>|</span> <span>projections</span>
        </h1>
        <h2 className="subtitle" ref={subtitleRef}>coming soon 2026</h2>
        <a href="https://2025.reflectionsprojections.org" className="cta-button" ref={ctaButtonRef}>
          Visit 2025 Site
        </a>
      </div>

      <canvas id="skyline-canvas" ref={skylineCanvasRef}></canvas>
    </div>
  );
}

export default App;
