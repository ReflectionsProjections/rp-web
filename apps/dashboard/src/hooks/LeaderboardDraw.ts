/*

Racetrack leaderboard drawing hook
Created by Timothy Gonzalez

This won't fit into 2026 theme so when you do delete this make sure to archive 2025.dash.reflectionsprojections.org c:

*/

import { IconColor, LeaderboardEntry, rad } from "@rp/shared";
import { useEffect, useState } from "react";

type TrackSegment = { angle: number; radius: number } | { distance: number };
type TrackDrawSegmentCommon = {
  distance: number;
  x: number;
  y: number;
  angle: number;
  sideI: number;
  fX: number;
  fY: number;
  fAngle: number;
  fSideI: number;
};
type StraightTrackDrawSegment = TrackDrawSegmentCommon & {
  type: "straight";
};
type ArcTrackDrawSegment = TrackDrawSegmentCommon & {
  type: "arc";
  radius: number;
  cx: number;
  cy: number;
  startDrawAngle: number;
  endDrawAngle: number;
  right: boolean;
};
type TrackDrawSegment = StraightTrackDrawSegment | ArcTrackDrawSegment;
export type CarPosition = {
  x: number;
  y: number;
  width: number;
  height: number;
  drawX: number;
  drawY: number;
  drawAngle: number;
};

// If we should draw cars directly on the canvas
// Perf testing found drawing cars directly to take a lot of perf
// If disabled, cars are drawn in the dom as svgs instead
// Not sure which is better so leaving this as a toggle
export const DRAW_CARS_IN_CANVAS = true;

const CAR_SPEED = 2000;
const CAR_SPACING = 150;
const TRACK_WIDTH = 200;
const SIDE_WIDTH = 35;
// const SIDE_DISTANCE = 200;
const CONNECTOR_SEGMENT_WIDTH = 10;
const FINISH_LINE_SQUARE_ROWS = 4;
const FINISH_LINE_SQUARE_COLS = 20;
const TRACK_COLOR = "#686868ff";
const SIDE_COLOR1 = "#fff";
const SIDE_COLOR2 = "#fff";
const CAR_PERCENT = 0.35;
const FIRST_CAR_CAMERA_X_SCALE = 0.5;
const FIRST_CAR_CAMERA_Y_SCALE = 0.115;
const PAN_DOWN_TIME = 2.5;
const PAN_DOWN_PAUSE = 30;
const PAN_DOWN_TO_CAR = 3.1; // 0-indexed
const CAMERA_MOVE_SPEED = CAR_SPEED;
const CAMERA_ZOOM_SPEED = 1.125;

const SCALE = 20;
// The track defined as straight and angled segments
const TRACK: TrackSegment[] = [
  { distance: 100 * SCALE },
  { angle: 90, radius: 100 * SCALE },
  { distance: 100 * SCALE },
  { angle: -90, radius: 100 * SCALE },
  { distance: 200 * SCALE },
  { angle: 90, radius: 100 * SCALE },
  { distance: 100 * SCALE },
  { angle: 90, radius: 100 * SCALE },
  { distance: 100 * SCALE },
  { angle: 90, radius: 100 * SCALE },
  { distance: 100 * SCALE },
  { angle: 270, radius: 50 * SCALE },
  { distance: 100 * SCALE },
  { angle: -90, radius: 75 * SCALE },
  { distance: 50 * SCALE },
  { angle: 90, radius: 75 * SCALE },
  { distance: 50 * SCALE },
  { angle: 180, radius: 100 * SCALE },
  { distance: 50 * SCALE },
  { angle: -180, radius: 85 * SCALE },
  { angle: -30, radius: 200 * SCALE },
  { angle: 30, radius: 200 * SCALE },
  { angle: 90, radius: 75 * SCALE },
  { distance: 183.5875 * SCALE },
  { angle: 90, radius: 75 * SCALE },
  { distance: 100 * SCALE }
];

// Camera position
let cameraFollowing = true;
let cameraX: number = 0;
let cameraY: number = 0;
let cameraAngle: number = 0;
let cameraScale: number = 1;

// We need to resize the canvas to match the space it takes up
function resizeCanvas(canvas: HTMLCanvasElement) {
  const realSize = canvas.getBoundingClientRect();
  canvas.width = realSize.width;
  canvas.height = realSize.height;
}

// Handle camera input
function useCameraInput() {
  useEffect(() => {
    const pressed: Record<string, boolean | undefined> = {};
    function keydown(event: KeyboardEvent) {
      pressed[event.code] = true;
    }
    function keyup(event: KeyboardEvent) {
      pressed[event.code] = false;

      if (event.code === "KeyF") {
        if (cameraFollowing) {
          cameraFollowing = false;
        } else {
          cameraFollowing = true;
          cameraScale = 1;
        }
      }
    }
    function wheel(event: WheelEvent) {
      if (event.deltaY > 0) {
        cameraScale *= 1 / CAMERA_ZOOM_SPEED;
      } else if (event.deltaY < 0) {
        cameraScale *= CAMERA_ZOOM_SPEED;
      }

      if (Math.abs(cameraScale - 1) < 0.01) {
        cameraScale = 1;
      }
    }
    window.addEventListener("keydown", keydown);
    window.addEventListener("keyup", keyup);
    window.addEventListener("wheel", wheel);

    let frame: number;
    let prev: number;
    function updateInput() {
      const now = Date.now();
      if (!prev) {
        prev = now;
      }
      const delta = (now - prev) / 1000;

      if (pressed["KeyW"]) {
        cameraFollowing = false;
        cameraY -= delta * (CAMERA_MOVE_SPEED / cameraScale);
      }
      if (pressed["KeyS"]) {
        cameraFollowing = false;
        cameraY += delta * (CAMERA_MOVE_SPEED / cameraScale);
      }
      if (pressed["KeyA"]) {
        cameraFollowing = false;
        cameraX -= delta * (CAMERA_MOVE_SPEED / cameraScale);
      }
      if (pressed["KeyD"]) {
        cameraFollowing = false;
        cameraX += delta * (CAMERA_MOVE_SPEED / cameraScale);
      }

      prev = now;

      frame = requestAnimationFrame(updateInput);
    }
    frame = requestAnimationFrame(updateInput);

    return () => {
      window.removeEventListener("keydown", keydown);
      window.removeEventListener("keyup", keyup);
      window.removeEventListener("wheel", wheel);
      cancelAnimationFrame(frame);
    };
  }, []);
}

// A hook which connects to the update animation loop
// On cancel, the animation loop is canceled and restarted with the next invocation
// Positions is returned to be used by dom elements
export default function useUpdateAnimationLoop({
  canvasRef,
  trackPercent,
  carImages,
  leaderboard
}: {
  canvasRef: React.RefObject<HTMLCanvasElement>;
  trackPercent: number;
  carImages: Record<IconColor, HTMLImageElement> | undefined;
  leaderboard: LeaderboardEntry[] | undefined;
}) {
  const [positions, setPositions] = useState<CarPosition[]>([]);
  const [zoomedOut, setZoomedOut] = useState(false);
  useCameraInput();

  useEffect(() => {
    const { trackDrawSegments, totalDistance } = getTrackDrawSegments(TRACK);

    let frame: number;
    function update() {
      // Resize the canvas so it matches the actual css space it takes up
      if (canvasRef.current) {
        resizeCanvas(canvasRef.current);
        const ctx = canvasRef.current.getContext("2d");
        if (ctx) {
          const result = draw(
            ctx,
            trackPercent,
            trackDrawSegments,
            totalDistance,
            leaderboard,
            carImages
          );
          if (result) {
            const { positions, transform, zoomedOut } = result;
            setPositions(
              positions.map((pos) => {
                const transformed = transform.transformPoint(
                  new DOMPoint(pos.x, pos.y)
                );

                const scaleX = Math.hypot(transform.a, transform.b);
                const scaleY = Math.hypot(transform.c, transform.d);
                const widthTransformed = pos.width * scaleX;
                const heightTransformed = pos.height * scaleY;

                const drawTransformed = transform.transformPoint(
                  new DOMPoint(pos.drawX, pos.drawY)
                );
                const drawAngleTransformed =
                  pos.drawAngle + Math.atan2(transform.b, transform.a);

                return {
                  x: transformed.x,
                  y: transformed.y,
                  width: widthTransformed,
                  height: heightTransformed,
                  drawX: drawTransformed.x,
                  drawY: drawTransformed.y,
                  drawAngle: drawAngleTransformed
                };
              })
            );
            setZoomedOut(zoomedOut);
          }
        }
      }

      frame = requestAnimationFrame(update);
    }

    frame = requestAnimationFrame(update);

    // On cancel, make sure to cancel the previous frame loop
    return () => cancelAnimationFrame(frame);
  }, [canvasRef, trackPercent, carImages, leaderboard]);

  return { positions, zoomedOut };
}

function getTrackDrawSegments(track: TrackSegment[]) {
  // The starting position and angle
  let x = 125;
  let y = 125;
  let angle = 0;
  let sideI = 0;
  let totalDistance = 0;

  const trackDrawSegments: TrackDrawSegment[] = [];
  for (const segment of track) {
    const trackDrawSegment: TrackDrawSegment =
      "distance" in segment
        ? getStraightTrackDrawSegment(x, y, angle, sideI, segment.distance)
        : getArcTrackDrawSegment(
            x,
            y,
            angle,
            sideI,
            segment.angle,
            segment.radius
          );

    trackDrawSegments.push(trackDrawSegment);
    x = trackDrawSegment.fX;
    y = trackDrawSegment.fY;
    angle = trackDrawSegment.fAngle;
    sideI = trackDrawSegment.fSideI;
    totalDistance += trackDrawSegment.distance;
  }

  return { trackDrawSegments, totalDistance };
}

function getStraightTrackDrawSegment(
  x: number,
  y: number,
  angle: number,
  sideI: number,
  distance: number
): TrackDrawSegment {
  const fX = x + distance * Math.cos(rad(angle));
  const fY = y + distance * Math.sin(rad(angle));
  const fAngle = angle;
  const maxSideI = 1;
  const fSideI = sideI + maxSideI;

  return {
    type: "straight",
    distance,
    x,
    y,
    angle,
    sideI,
    fX,
    fY,
    fAngle,
    fSideI
  };
}

function getArcTrackDrawSegment(
  x: number,
  y: number,
  angle: number,
  sideI: number,
  arcAngle: number,
  radius: number
): TrackDrawSegment {
  const fAngle = angle + arcAngle;
  const right = arcAngle > 0;
  const sign = right ? 1 : -1;
  const cx = x + radius * Math.cos(rad(angle) + (sign * Math.PI) / 2);
  const cy = y + radius * Math.sin(rad(angle) + (sign * Math.PI) / 2);
  const startDrawAngle = rad(angle) - (sign * Math.PI) / 2;
  const endDrawAngle = rad(fAngle) - (sign * Math.PI) / 2;

  const fX = cx + radius * Math.cos(endDrawAngle);
  const fY = cy + radius * Math.sin(endDrawAngle);
  const angleDiff = right
    ? endDrawAngle - startDrawAngle
    : startDrawAngle - endDrawAngle;
  const distance = 2 * Math.PI * radius * (angleDiff / (Math.PI * 2));

  const maxI = 1;
  const fSideI = sideI + maxI;

  // Create the metadata
  return {
    type: "arc",
    distance,
    x,
    y,
    angle,
    sideI,
    fX,
    fY,
    fAngle,
    fSideI,
    cx,
    cy,
    radius,
    startDrawAngle,
    endDrawAngle,
    right
  };
}

function getTrackPosition(
  trackDrawSegments: TrackDrawSegment[],
  totalDistance: number,
  position: number
) {
  let distance = position % totalDistance;

  if (distance < 0) {
    distance = (distance + totalDistance) % totalDistance;
  }

  // Figure out which segment the provided position is at, then draw at the right position along that
  for (const segment of trackDrawSegments) {
    // If it's not the next segment, we need to draw it somewhere in this segment
    if (distance < segment.distance) {
      const alpha = distance / segment.distance;
      if (segment.type == "straight") {
        // Straight, linearly interpolate
        return {
          x: segment.x * (1 - alpha) + segment.fX * alpha,
          y: segment.y * (1 - alpha) + segment.fY * alpha,
          angle: rad(segment.angle) - Math.PI / 2
        };
      } else if (segment.type == "arc") {
        // Arc, interpolate the arc
        const right = segment.startDrawAngle < segment.endDrawAngle;
        const posAngle =
          rad(segment.angle) * (1 - alpha) +
          rad(segment.fAngle) * alpha +
          (right ? -Math.PI / 2 : Math.PI / 2);
        return {
          x: segment.cx + segment.radius * Math.cos(posAngle),
          y: segment.cy + segment.radius * Math.sin(posAngle),
          angle: right ? posAngle : posAngle - Math.PI
        };
      }
      break;
    }

    // It's not this segment, move on
    distance -= segment.distance;
  }

  // If it's not on the track, give up
  throw Error(`Invalid position: ${position}`);
}

const carCycles: {
  offsetX: number;
  cycleX: number;
  offsetY: number;
  cycleY: number;
}[] = [];

// The main draw function - called every frame to draw the track & cars
function draw(
  ctx: CanvasRenderingContext2D,
  trackPercent: number,
  trackDrawSegments: TrackDrawSegment[],
  totalDistance: number,
  leaderboard?: LeaderboardEntry[],
  carImages?: Record<IconColor, HTMLImageElement>
) {
  const { width, height } = ctx.canvas;
  const timeSeconds = Date.now() / 1000;

  // Clear screen
  ctx.clearRect(0, 0, width, height);

  // Increment the position the leading car is at based on time
  const position = (timeSeconds * CAR_SPEED) % totalDistance;

  // Update camera
  updateCamera(
    ctx,
    trackPercent,
    timeSeconds,
    trackDrawSegments,
    totalDistance,
    position
  );

  // Draw track
  drawTrack(ctx, trackDrawSegments);

  // We need leaderboard and car images to draw the cars
  if (!leaderboard || !carImages) {
    return;
  }

  // Draw cars
  const positions = drawCars(
    ctx,
    timeSeconds,
    position,
    trackDrawSegments,
    totalDistance,
    leaderboard,
    carImages
  );

  // Return positions of cars
  return {
    positions,
    transform: ctx.getTransform(),
    zoomedOut: cameraScale < 0.75
  };
}

// Cycles through:
// 1. pause for PAN_DOWN_PAUSE
// 2. pan down to PAN_DOWN_TO_CAR
// 3. pause for PAN_DOWN_PAUSE
// 4. pan up to 0
function getCameraFocus(timeSeconds: number) {
  const t = timeSeconds % ((PAN_DOWN_TIME + PAN_DOWN_PAUSE) * 2);
  if (t < PAN_DOWN_PAUSE) {
    return 0;
  } else if (t < PAN_DOWN_PAUSE + PAN_DOWN_TIME) {
    return ((t - PAN_DOWN_PAUSE) / PAN_DOWN_TIME) * PAN_DOWN_TO_CAR;
  } else if (t < PAN_DOWN_PAUSE + PAN_DOWN_TIME + PAN_DOWN_PAUSE) {
    return PAN_DOWN_TO_CAR;
  } else {
    return (
      PAN_DOWN_TO_CAR -
      ((t - PAN_DOWN_PAUSE - PAN_DOWN_TIME - PAN_DOWN_PAUSE) / PAN_DOWN_TIME) *
        PAN_DOWN_TO_CAR
    );
  }
}

// Updates the camera based on the track position
function updateCamera(
  ctx: CanvasRenderingContext2D,
  trackPercent: number,
  timeSeconds: number,
  trackDrawSegments: TrackDrawSegment[],
  totalDistance: number,
  position: number
) {
  const focusPosition = position - CAR_SPACING * getCameraFocus(timeSeconds);

  // Update camera if following
  if (cameraFollowing) {
    const { x, y, angle } = getTrackPosition(
      trackDrawSegments,
      totalDistance,
      focusPosition
    );
    cameraX = x;
    cameraY = y;
    cameraAngle = angle - Math.PI;
  } else {
    cameraAngle = 0;
  }

  // Move origin to screen center
  const centerX =
    (cameraFollowing ? FIRST_CAR_CAMERA_X_SCALE : 0.5) * trackPercent;
  const centerY = cameraFollowing ? FIRST_CAR_CAMERA_Y_SCALE : 0.5;
  ctx.translate(ctx.canvas.width * centerX, ctx.canvas.height * centerY);

  // Scale to user screen vs expected world space
  const scale = (ctx.canvas.height / 1100) * cameraScale;

  ctx.scale(scale, scale);
  // Rotate world so car faces "up"
  ctx.rotate(-cameraAngle);
  // Move world so car is centered
  ctx.translate(-cameraX, -cameraY);
}

// Draw the track cars drive on
function drawTrack(
  ctx: CanvasRenderingContext2D,
  trackDrawSegments: TrackDrawSegment[]
) {
  // Draw siding first
  for (const segment of trackDrawSegments) {
    drawTrackSegmentSide(ctx, segment);
  }

  // Then draw track
  for (const segment of trackDrawSegments) {
    drawTrackSegment(ctx, segment);
  }

  // Draw the finish line
  const { x, y, angle } = trackDrawSegments[0];
  drawFinishLine(ctx, x, y, angle);
}

function drawTrackSegmentSide(
  ctx: CanvasRenderingContext2D,
  segment: TrackDrawSegment
) {
  const { type, x, y, angle, sideI, fX, fY, fSideI } = segment;
  // Draw the red-white side of the track
  ctx.lineWidth = TRACK_WIDTH + SIDE_WIDTH;
  const maxI = fSideI - sideI;
  if (type == "straight") {
    const dx = fX - x;
    const dy = fY - y;
    for (let i = 0; i < maxI; i++) {
      ctx.beginPath();
      ctx.strokeStyle = (i + sideI) % 2 == 0 ? SIDE_COLOR1 : SIDE_COLOR2;
      ctx.moveTo(x + (i / maxI) * dx, y + (i / maxI) * dy);
      ctx.lineTo(x + ((i + 1) / maxI) * dx, y + ((i + 1) / maxI) * dy);
      ctx.stroke();
    }
  } else if (type == "arc") {
    const { startDrawAngle, endDrawAngle, cx, cy, radius, right } = segment;
    const maxI = fSideI - sideI;
    const dAngle = endDrawAngle - startDrawAngle;
    for (let i = 0; i < maxI; i++) {
      ctx.strokeStyle = (i + sideI) % 2 == 0 ? SIDE_COLOR1 : SIDE_COLOR2;
      ctx.beginPath();
      ctx.arc(
        cx,
        cy,
        radius,
        startDrawAngle + dAngle * (i / maxI),
        startDrawAngle + dAngle * ((i + 1) / maxI),
        !right
      );
      ctx.stroke();
    }
  }

  // Segment to reduce sub-pixel error
  ctx.fillStyle = sideI % 2 ? SIDE_COLOR1 : SIDE_COLOR2;
  drawTrackSegmentConnector(ctx, x, y, angle, TRACK_WIDTH + SIDE_WIDTH);
}

function drawTrackSegment(
  ctx: CanvasRenderingContext2D,
  segment: TrackDrawSegment
) {
  ctx.lineWidth = TRACK_WIDTH;
  ctx.strokeStyle = TRACK_COLOR;
  const { type, x, y, angle, fX, fY } = segment;
  if (type == "straight") {
    ctx.beginPath();
    ctx.moveTo(x, y);
    ctx.lineTo(fX, fY);
    ctx.stroke();
  } else if (type == "arc") {
    const { startDrawAngle, endDrawAngle, cx, cy, radius, right } = segment;
    ctx.beginPath();
    ctx.arc(cx, cy, radius, startDrawAngle, endDrawAngle, !right);
    ctx.stroke();
  }

  // Segment to reduce sub-pixel error
  ctx.fillStyle = TRACK_COLOR;
  drawTrackSegmentConnector(ctx, x, y, angle, TRACK_WIDTH);
}

function drawTrackSegmentConnector(
  ctx: CanvasRenderingContext2D,
  x: number,
  y: number,
  angle: number,
  width: number
) {
  ctx.save();
  ctx.translate(x, y);
  ctx.rotate(rad(angle));
  ctx.beginPath();
  const connectorSegmentWidth = Math.ceil(
    CONNECTOR_SEGMENT_WIDTH / cameraScale
  );
  ctx.rect(
    -connectorSegmentWidth / 2,
    -width / 2,
    connectorSegmentWidth,
    width
  );
  ctx.fill();
  ctx.restore();
}

function drawFinishLine(
  ctx: CanvasRenderingContext2D,
  x: number,
  y: number,
  angle: number
) {
  ctx.save();
  ctx.translate(x, y);
  ctx.rotate(rad(angle));
  const width = TRACK_WIDTH;
  const squareSize = width / FINISH_LINE_SQUARE_COLS;
  const height = squareSize * FINISH_LINE_SQUARE_ROWS;

  for (let i = 0; i < FINISH_LINE_SQUARE_ROWS; i++) {
    for (let j = 0; j < FINISH_LINE_SQUARE_COLS; j++) {
      ctx.beginPath();
      ctx.fillStyle = (i + j) % 2 == 0 ? "#fff" : "#000";
      ctx.rect(
        i * squareSize - height / 2,
        j * squareSize - width / 2,
        squareSize,
        squareSize
      );
      ctx.fill();
    }
  }

  ctx.restore();
}

// Draws all cars using the starting position
function drawCars(
  ctx: CanvasRenderingContext2D,
  timeSeconds: number,
  position: number,
  trackDrawSegments: TrackDrawSegment[],
  totalDistance: number,
  leaderboard: LeaderboardEntry[],
  carImages: Record<IconColor, HTMLImageElement>
): CarPosition[] {
  const positions: CarPosition[] = [];

  for (const [i, entry] of leaderboard.entries()) {
    // Create cycles for x and y drift to add realism
    if (carCycles.length <= i) {
      carCycles.push({
        offsetX: 3 * Math.random(),
        cycleX: 0.5 * Math.random() + 1,
        offsetY: 3 * Math.random(),
        cycleY: 0.5 * Math.random() + 1
      });
    }

    // Stagger cars left-right-left-right
    const stagerX = i % 2 == 0 ? 0.25 : -0.25;
    const driftX =
      stagerX +
      0.1 * Math.sin(timeSeconds / carCycles[i].cycleX + carCycles[i].offsetX);
    const driftY =
      0.025 *
      Math.sin(timeSeconds / carCycles[i].cycleY + carCycles[i].offsetY);

    // Draw the car
    const carPosition = position + -CAR_SPACING * i;
    const { x, y, angle } = getTrackPosition(
      trackDrawSegments,
      totalDistance,
      carPosition
    );
    const res = drawCar(
      ctx,
      x,
      y,
      angle,
      driftX,
      driftY,
      carImages[entry.icon]
    );

    positions.push(res);
  }

  return positions;
}

// Draw a car using the metadata
function drawCar(
  ctx: CanvasRenderingContext2D,
  x: number,
  y: number,
  angle: number,
  driftX: number,
  driftY: number,
  image: HTMLImageElement
): CarPosition {
  // viewBox = 49 55 236 109
  const svgWidth = 236;
  const svgHeight = 109;
  const width = Math.floor(TRACK_WIDTH * 2 * CAR_PERCENT);
  const height = Math.floor(width * (svgHeight / svgWidth));

  // Draw the car by translating & rotating then drawing the image
  // We need to save and restore to not change the root transform
  ctx.save();
  ctx.fillStyle = "#000";

  // Apply drift
  const drawX =
    x +
    width * driftX * Math.cos(angle + Math.PI) +
    height * driftY * Math.cos(angle + Math.PI / 2);
  const drawY =
    y +
    width * driftX * Math.sin(angle + Math.PI) +
    height * driftY * Math.sin(angle + Math.PI / 2);
  const drawAngle = angle + Math.PI / 2;

  if (DRAW_CARS_IN_CANVAS) {
    ctx.translate(drawX, drawY);
    ctx.rotate(drawAngle);
    ctx.beginPath();
    ctx.drawImage(image, -width / 2, -height / 2, width, height);
    ctx.fill();
    ctx.restore();
  }

  return {
    x,
    y,
    width,
    height,
    drawX,
    drawY,
    drawAngle
  };
}
