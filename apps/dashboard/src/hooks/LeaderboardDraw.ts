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
  drawX: number;
  drawY: number;
  angle: number;
};

const TRACK_WIDTH = 200;
const SIDE_WIDTH = 50;
const SIDE_DISTANCE = 100;
const FINISH_LINE_WIDTH = TRACK_WIDTH / 4;
const FINISH_LINE_SQUARE_SIZE = 25;
const TRACK_COLOR = "#686868ff";
const SIDE_COLOR1 = "#f00";
const SIDE_COLOR2 = "#fff";
const CAR_PERCENT = 0.325;
const FIRST_CAR_CAMERA_X_SCALE = 0.5;
const FIRST_CAR_CAMERA_Y_SCALE = 0.125;
const ZOOM_OUT = false;

const SCALE = 20;
// The track defined as straight and angled segments
const TRACK: TrackSegment[] = [
  { distance: 200 * SCALE },
  { angle: 90, radius: 100 * SCALE },
  { angle: -90, radius: 100 * SCALE },
  { distance: 200 * SCALE },
  { angle: 180, radius: 100 * SCALE },
  { distance: 200 * SCALE },
  { angle: 90, radius: 150 * SCALE },
  { angle: -45, radius: 50 * SCALE },
  { angle: 45, radius: 50 * SCALE },
  { angle: -45, radius: 50 * SCALE },
  { angle: -45 - 90, radius: 50 * SCALE },
  { angle: 180, radius: 100 * SCALE },
  { distance: 100 * SCALE },
  { angle: 90, radius: 79.3125 * SCALE }
];

// We need to resize the canvas to match the space it takes up
function resizeCanvas(canvas: HTMLCanvasElement) {
  const realSize = canvas.getBoundingClientRect();
  canvas.width = realSize.width;
  canvas.height = realSize.height;
}

// A hook which connects to the update animation loop
// On cancel, the animation loop is canceled and restarted with the next invocation
// Positions is returned to be used by dom elements
export default function useUpdateAnimationLoop({
  canvasRef,
  carImages,
  leaderboard
}: {
  canvasRef: React.RefObject<HTMLCanvasElement>;
  carImages: Record<IconColor, HTMLImageElement> | undefined;
  leaderboard: LeaderboardEntry[] | undefined;
}) {
  const [positions, setPositions] = useState<(CarPosition | undefined)[]>([]);

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
            trackDrawSegments,
            totalDistance,
            leaderboard,
            carImages
          );
          if (result) {
            const { positions, transform } = result;
            setPositions(
              positions.map((pos) => {
                const canvas = canvasRef.current;
                if (!canvas || !pos) return;

                const transformed = transform.transformPoint(
                  new DOMPoint(pos.x, pos.y)
                );

                const drawTransformed = transform.transformPoint(
                  new DOMPoint(pos.drawX, pos.drawY)
                );
                return {
                  x: transformed.x,
                  y: transformed.y,
                  drawX: drawTransformed.x,
                  drawY: drawTransformed.y,
                  angle: pos.angle
                };
              })
            );
          }
        }
      }

      frame = requestAnimationFrame(update);
    }

    frame = requestAnimationFrame(update);

    // On cancel, make sure to cancel the previous frame loop
    return () => cancelAnimationFrame(frame);
  }, [canvasRef, carImages, leaderboard]);

  return { positions };
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
  const maxSideI = Math.floor(distance / SIDE_DISTANCE);
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

  const maxI = Math.floor(distance / SIDE_DISTANCE);
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
  let distance = (totalDistance * position) % totalDistance;

  while (distance < 0) {
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
let position = 0;

// The main draw function - called every frame to draw the track & cars
function draw(
  ctx: CanvasRenderingContext2D,
  trackDrawSegments: TrackDrawSegment[],
  totalDistance: number,
  leaderboard?: LeaderboardEntry[],
  carImages?: Record<IconColor, HTMLImageElement>
) {
  const { width, height } = ctx.canvas;

  // Clear screen
  ctx.clearRect(0, 0, width, height);

  // Update camera
  updateCamera(ctx, trackDrawSegments, totalDistance, position);

  // Draw track
  drawTrack(ctx, trackDrawSegments);

  // Increment the position the leading car is at
  position = (position + 0.0005) % 1;

  if (!leaderboard || !carImages) {
    return;
  }

  // Draw each car slightly farther back from the last
  const positions: (CarPosition | undefined)[] = [];
  const time = Date.now() / 1000;
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
    const stagerX = i % 2 == 0 ? 0.5 : -0.5;
    const driftX =
      stagerX +
      0.2 * Math.sin(time / carCycles[i].cycleX + carCycles[i].offsetX);
    const driftY =
      0.05 * Math.sin(time / carCycles[i].cycleY + carCycles[i].offsetY);

    // Draw the car
    const carPosition = (position + 10 - 0.0035 * i) % 1;
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

  // Return positions of cars
  return {
    positions,
    transform: ctx.getTransform()
  };
}

// Updates the camera based on the track position
function updateCamera(
  ctx: CanvasRenderingContext2D,
  trackDrawSegments: TrackDrawSegment[],
  totalDistance: number,
  position: number
) {
  const {
    x: cameraX,
    y: cameraY,
    angle: cameraAngle
  } = getTrackPosition(trackDrawSegments, totalDistance, position);
  // If zoom out debug flag, zoom the whole screen out
  if (ZOOM_OUT) {
    ctx.scale(0.1, 0.1);
  }
  // Move origin to screen center
  ctx.translate(
    ctx.canvas.width * FIRST_CAR_CAMERA_X_SCALE,
    ctx.canvas.height * FIRST_CAR_CAMERA_Y_SCALE
  );
  // Rotate world so car faces "up"
  ctx.rotate(-cameraAngle - Math.PI);
  // Move world so car is centered
  ctx.translate(-cameraX, -cameraY);
}

// Draw the track cars drive on
function drawTrack(
  ctx: CanvasRenderingContext2D,
  trackDrawSegments: TrackDrawSegment[]
) {
  // Iterate through each segment, drawing the track and filling track metadata
  for (const segment of trackDrawSegments) {
    // ctx.strokeStyle = ["#f00", "#ff0", "#090", "#00f"][i % 4];

    if (segment.type == "straight") {
      drawStraightTrack(ctx, segment);
    } else if (segment.type == "arc") {
      drawArcTrack(ctx, segment);
    }

    // Segment to reduce sub-pixel error
    const { x, y, angle } = segment;
    ctx.save();
    ctx.translate(x, y);
    ctx.rotate(rad(angle));
    ctx.fillStyle = TRACK_COLOR;
    ctx.beginPath();
    ctx.rect(-1, -TRACK_WIDTH / 2, 2, TRACK_WIDTH);
    ctx.fill();
    ctx.restore();
  }

  // Draw the finish line
  const { x, y, angle } = trackDrawSegments[0];
  drawFinishLine(ctx, x, y, angle);
}

function drawStraightTrack(
  ctx: CanvasRenderingContext2D,
  { x, y, sideI, fX, fY, fSideI }: TrackDrawSegment
) {
  // Draw the red-white side of the track
  const maxI = fSideI - sideI;
  const dx = fX - x;
  const dy = fY - y;
  for (let i = 0; i < maxI; i++) {
    ctx.beginPath();
    ctx.lineWidth = TRACK_WIDTH + SIDE_WIDTH;
    ctx.strokeStyle = (i + sideI) % 2 == 0 ? SIDE_COLOR1 : SIDE_COLOR2;
    ctx.moveTo(x + (i / maxI) * dx, y + (i / maxI) * dy);
    ctx.lineTo(x + ((i + 1) / maxI) * dx, y + ((i + 1) / maxI) * dy);
    ctx.stroke();
  }

  // Draw the main track
  ctx.beginPath();
  ctx.lineWidth = TRACK_WIDTH;
  ctx.strokeStyle = TRACK_COLOR;
  ctx.moveTo(x, y);
  ctx.lineTo(fX, fY);
  ctx.stroke();
}

function drawArcTrack(
  ctx: CanvasRenderingContext2D,
  {
    sideI,
    fSideI,
    cx,
    cy,
    radius,
    startDrawAngle,
    endDrawAngle,
    right
  }: ArcTrackDrawSegment
) {
  // Draw sides of the track
  const maxI = fSideI - sideI;
  const dAngle = endDrawAngle - startDrawAngle;
  for (let i = 0; i < maxI; i++) {
    ctx.lineWidth = TRACK_WIDTH + SIDE_WIDTH;
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

  // Draw the track
  ctx.lineWidth = TRACK_WIDTH;
  ctx.strokeStyle = TRACK_COLOR;
  ctx.beginPath();
  ctx.arc(cx, cy, radius, startDrawAngle, endDrawAngle, !right);
  ctx.stroke();
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
  const width = FINISH_LINE_WIDTH;
  const height = TRACK_WIDTH + SIDE_WIDTH;

  for (let i = 0; i < width / FINISH_LINE_SQUARE_SIZE; i++) {
    for (let j = 0; j < height / FINISH_LINE_SQUARE_SIZE; j++) {
      ctx.beginPath();
      ctx.fillStyle = (i + j) % 2 == 0 ? "#fff" : "#000";
      ctx.rect(
        i * FINISH_LINE_SQUARE_SIZE - width / 2,
        j * FINISH_LINE_SQUARE_SIZE - height / 2,
        FINISH_LINE_SQUARE_SIZE,
        FINISH_LINE_SQUARE_SIZE
      );
      ctx.fill();
    }
  }

  ctx.restore();
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
) {
  // viewBox = 49 55 236 109
  const svgWidth = 236;
  const svgHeight = 109;
  const width = Math.floor(TRACK_WIDTH * CAR_PERCENT);
  const height = Math.floor(width * (svgWidth / svgHeight));

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
  ctx.translate(drawX, drawY);
  ctx.rotate(angle + Math.PI / 2);
  ctx.beginPath();
  ctx.drawImage(image, -height / 2, -width / 2, height, width);
  ctx.fill();
  ctx.restore();

  return {
    x,
    y,
    drawX,
    drawY,
    angle
  };
}
