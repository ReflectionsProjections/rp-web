import { ICON_COLOR_TO_COLOR } from "@/constants/colors";
import { Flex, Heading } from "@chakra-ui/react";
import { IconColor, IconColors, LeaderboardEntry, rad } from "@rp/shared";
import CarSvg from "@/assets/car.svg?raw";
import {
  useCallback,
  useEffect,
  useLayoutEffect,
  useMemo,
  useRef,
  useState
} from "react";
// import { usePolling } from "@rp/shared";

type Segment = { angle: number; radius: number } | { distance: number };
type Metadata =
  | {
      type: "straight";
      distance: number;
      x: number;
      y: number;
      fx: number;
      fy: number;
      angle: number;
    }
  | {
      type: "arc";
      distance: number;
      radius: number;
      cx: number;
      cy: number;
      startAngle: number;
      endAngle: number;
    };
const TRACK_WIDTH = 200;
const SIDE_WIDTH = 50;
const SIDE_DISTANCE = 100;
const TRACK_COLOR = "#686868ff";
const SIDE_COLOR1 = "#f00";
const SIDE_COLOR2 = "#fff";
const CAR_PERCENT = 0.35;
const FIRST_CAR_CAMERA_X_SCALE = 0.5;
const FIRST_CAR_CAMERA_Y_SCALE = 0.125;
const ZOOM_OUT = false;

export default function Leaderboard() {
  // const { data, isLoading } = usePolling("/leaderboard/daily");

  // Testing data until leaderboard is done
  const leaderboard: LeaderboardEntry[] = useMemo(
    () => [
      {
        displayName: "Bob",
        currentTier: "TIER2",
        icon: "ORANGE",
        points: 32,
        rank: 1,
        userId: "1234"
      },
      {
        displayName: "Alice",
        currentTier: "TIER1",
        icon: "RED",
        points: 28,
        rank: 2,
        userId: "12345"
      },
      {
        displayName: "Alex",
        currentTier: "TIER1",
        icon: "BLUE",
        points: 25,
        rank: 3,
        userId: "123456"
      },
      {
        displayName: "Tree",
        currentTier: "TIER1",
        icon: "GREEN",
        points: 18,
        rank: 4,
        userId: "1234567"
      },
      {
        displayName:
          "LongestNameInTheFreakingWorldLikeOhMyGodWhyIsThisNameSoFreakingLongSurelyGoogleWontAllowThis",
        currentTier: "TIER1",
        icon: "PURPLE",
        points: 16,
        rank: 5,
        userId: "1234568"
      },
      {
        displayName: "OnlyOne",
        currentTier: "TIER1",
        icon: "GREEN",
        points: 13,
        rank: 6,
        userId: "1234569"
      },
      {
        displayName: "TesterTheGuy",
        currentTier: "TIER1",
        icon: "RED",
        points: 11,
        rank: 7,
        userId: "12532"
      },
      {
        displayName: "Bazinga",
        currentTier: "TIER1",
        icon: "ORANGE",
        points: 5,
        rank: 8,
        userId: "13454315"
      },
      {
        displayName: "Sheldon",
        currentTier: "TIER1",
        icon: "PINK",
        points: 3,
        rank: 9,
        userId: "12352353"
      },
      {
        displayName: "Duck",
        currentTier: "TIER1",
        icon: "PURPLE",
        points: 2,
        rank: 10,
        userId: "1235235239845"
      }
    ],
    []
  );
  const { data, isLoading } = {
    data: {
      leaderboard
    },
    isLoading: false
  };
  const canvasRef = useRef<HTMLCanvasElement>(null);
  console.log(data, isLoading);

  const [carImages, setCarImages] = useState<
    Record<IconColor, HTMLImageElement> | undefined
  >(undefined);

  // Preload images for each color
  async function loadImages() {
    const loadedEntries = await Promise.all(
      Object.values(IconColors).map(async (color: IconColor) => {
        return new Promise<[IconColor, HTMLImageElement]>((resolve, reject) => {
          const img = new Image();
          const coloredSvg = CarSvg.replace(
            /currentColor/g,
            ICON_COLOR_TO_COLOR[color]
          );
          img.src = "data:image/svg+xml;utf8," + encodeURIComponent(coloredSvg);

          img.onload = () => resolve([color, img]);
          img.onerror = reject;
        });
      })
    );
    // Convert array of [color, image] tuples into an object
    const images = Object.fromEntries(loadedEntries) as Record<
      IconColor,
      HTMLImageElement
    >;

    setCarImages(images);
  }

  useEffect(() => {
    loadImages().catch(console.error);
  }, []);

  // This is called every frame to update the canvas
  const [updateLoopInitialized, setUpdateLoopInitialized] = useState(false);

  // We need to resize the canvas to match the space it takes up
  function resizeCanvas(canvas: HTMLCanvasElement) {
    const realSize = canvas.getBoundingClientRect();
    canvas.width = realSize.width;
    canvas.height = realSize.height;
  }

  // Begins update loop to resize canvas and draw
  const initializeUpdateLoop = useCallback(() => {
    function update() {
      // Resize the canvas so it matches the actual css space it takes up
      if (canvasRef.current) {
        resizeCanvas(canvasRef.current);
        const ctx = canvasRef.current.getContext("2d");
        if (ctx) {
          draw(ctx, leaderboard, carImages);
        }
      }

      requestAnimationFrame(update);
    }

    update();
  }, [carImages, leaderboard]);

  useLayoutEffect(() => {
    if (updateLoopInitialized) return;

    const canvas = canvasRef.current;
    if (!carImages || !canvas) return;

    setUpdateLoopInitialized(true);

    initializeUpdateLoop();
  }, [
    initializeUpdateLoop,
    canvasRef,
    carImages,
    leaderboard,
    updateLoopInitialized
  ]);

  return (
    <Flex flexDirection={"column"} height={"100%"} maxHeight={"100%"}>
      <Heading textAlign={"center"}>Leaderboard</Heading>
      <Flex minHeight={"0"} flexGrow={"1"}>
        <canvas style={{ width: "100%", height: "100%" }} ref={canvasRef} />
      </Flex>
    </Flex>
  );
}

let position = 0;
let cameraX: number | undefined;
let cameraY: number | undefined;
let cameraAngle: number | undefined;

// The main draw function - called every frame to draw the track & cars
function draw(
  ctx: CanvasRenderingContext2D,
  leaderboard?: LeaderboardEntry[],
  carImages?: Record<IconColor, HTMLImageElement>
) {
  const { width, height } = ctx.canvas;

  // Clear screen
  ctx.clearRect(0, 0, width, height);

  if (cameraX && cameraY && cameraAngle) {
    // If zoom out debug flag, zoom the whole screen out
    if (ZOOM_OUT) {
      ctx.scale(0.1, 0.1);
    }
    // Move origin to screen center
    ctx.translate(
      width * FIRST_CAR_CAMERA_X_SCALE,
      height * FIRST_CAR_CAMERA_Y_SCALE
    );
    // Rotate world so car faces "up"
    ctx.rotate(-cameraAngle - Math.PI);
    // Move world so car is centered
    ctx.translate(-cameraX, -cameraY);
  }

  // The track defined as straight and angled segments
  const scale = 20;
  const track: Segment[] = [
    { distance: 200 * scale },
    { angle: 90, radius: 100 * scale },
    { angle: -90, radius: 100 * scale },
    { distance: 200 * scale },
    { angle: 180, radius: 100 * scale },
    { distance: 200 * scale },
    { angle: 90, radius: 150 * scale },
    { angle: -45, radius: 50 * scale },
    { angle: 45, radius: 50 * scale },
    { angle: -45, radius: 50 * scale },
    { angle: -45 - 90, radius: 50 * scale },
    { angle: 180, radius: 100 * scale },
    { distance: 100 * scale },
    { angle: 90, radius: 79.3125 * scale }
  ];

  const [trackMetadata, totalDistance] = drawTrack(ctx, track);

  // Increment the position the leading car is at
  position = (position + 0.000125) % 1;

  if (!leaderboard || !carImages) {
    return;
  }

  // Draw each car slightly farther back from the last
  for (const [i, entry] of leaderboard.entries()) {
    const res = drawCar(
      ctx,
      (position + 10 - 0.0035 * i) % 1,
      carImages[entry.icon],
      trackMetadata,
      totalDistance
    );

    if (i == 0 && res) {
      [cameraX, cameraY, cameraAngle] = res;
    }
  }
}

// Draw the track cars drive on
function drawTrack(
  ctx: CanvasRenderingContext2D,
  track: Segment[]
): [Metadata[], number] {
  // The starting position and angle
  let x = 125;
  let y = 125;
  let angle = 0;

  const trackMetadata: Metadata[] = [];
  let totalDistance = 0;
  // Iterate through each segment, drawing the track and filling track metadata
  for (const segment of track) {
    // ctx.strokeStyle = ["#f00", "#ff0", "#090", "#00f"][i % 4];

    let fx, fy, fangle, distance;

    if ("distance" in segment) {
      // Straight segment
      distance = segment.distance;
      fx = x + distance * Math.cos(rad(angle));
      fy = y + distance * Math.sin(rad(angle));
      fangle = angle;

      // Draw the red-white side of the track
      const maxI = Math.floor(distance / SIDE_DISTANCE);
      const dx = fx - x;
      const dy = fy - y;
      for (let i = 0; i < maxI; i++) {
        ctx.beginPath();
        ctx.lineWidth = TRACK_WIDTH + SIDE_WIDTH;
        ctx.strokeStyle = i % 2 == 0 ? SIDE_COLOR1 : SIDE_COLOR2;
        ctx.moveTo(x + (i / maxI) * dx, y + (i / maxI) * dy);
        ctx.lineTo(x + ((i + 1) / maxI) * dx, y + ((i + 1) / maxI) * dy);
        ctx.stroke();
      }

      // Draw the main track
      ctx.beginPath();
      ctx.lineWidth = TRACK_WIDTH;
      ctx.strokeStyle = TRACK_COLOR;
      ctx.moveTo(x, y);
      ctx.lineTo(fx, fy);
      ctx.stroke();

      // Push the metadata
      trackMetadata.push({
        type: "straight",
        distance,
        x,
        y,
        fx,
        fy,
        angle
      });
    } else {
      // Arc segment
      fangle = angle + segment.angle;
      const right = segment.angle > 0;
      const sign = right ? 1 : -1;
      const radius = segment.radius;
      const cx = x + radius * Math.cos(rad(angle) + (sign * Math.PI) / 2);
      const cy = y + radius * Math.sin(rad(angle) + (sign * Math.PI) / 2);
      const startAngle = rad(angle) - (sign * Math.PI) / 2;
      const endAngle = rad(fangle) - (sign * Math.PI) / 2;

      fx = cx + radius * Math.cos(endAngle);
      fy = cy + radius * Math.sin(endAngle);
      const angleDiff = right ? endAngle - startAngle : startAngle - endAngle;
      distance = 2 * Math.PI * radius * (angleDiff / (Math.PI * 2));

      // Draw sides of the track
      const maxI = Math.floor(distance / SIDE_DISTANCE);
      const dAngle = endAngle - startAngle;
      for (let i = 0; i < maxI; i++) {
        ctx.lineWidth = TRACK_WIDTH + SIDE_WIDTH;
        ctx.strokeStyle = i % 2 == 0 ? SIDE_COLOR1 : SIDE_COLOR2;
        ctx.beginPath();
        ctx.arc(
          cx,
          cy,
          radius,
          startAngle + dAngle * (i / maxI),
          startAngle + dAngle * ((i + 1) / maxI),
          !right
        );
        ctx.stroke();
      }

      // Draw the track
      ctx.lineWidth = TRACK_WIDTH;
      ctx.strokeStyle = TRACK_COLOR;
      ctx.beginPath();
      ctx.arc(cx, cy, radius, startAngle, endAngle, !right);
      ctx.stroke();

      // Push the metadata
      trackMetadata.push({
        type: "arc",
        distance,
        startAngle: angle,
        endAngle: fangle,
        cx,
        cy,
        radius
      });
    }

    // Segment to reduce sub-pixel errors
    ctx.save();
    ctx.translate(x, y);
    ctx.rotate(rad(angle));
    ctx.fillStyle = TRACK_COLOR;
    ctx.beginPath();
    ctx.rect(-1, -TRACK_WIDTH / 2, 2, TRACK_WIDTH);
    ctx.fill();
    ctx.restore();

    // Update next segment start
    x = fx;
    y = fy;
    angle = fangle;
    totalDistance += distance;
  }

  return [trackMetadata, totalDistance];
}

// Draw a car using the metadata
function drawCar(
  ctx: CanvasRenderingContext2D,
  position: number,
  image: HTMLImageElement,
  trackMetadata: Metadata[],
  totalDistance: number
): [number, number, number] | undefined {
  let distance = totalDistance * position;
  let x, y, angle;

  // Figure out which segment the provided position is at, then draw at the right position along that
  for (const metadata of trackMetadata) {
    // If it's not the next segment, we need to draw it somewhere in this segment
    if (distance < metadata.distance) {
      const alpha = distance / metadata.distance;
      if (metadata.type == "straight") {
        // Straight, linearly interpolate
        x = metadata.x * (1 - alpha) + metadata.fx * alpha;
        y = metadata.y * (1 - alpha) + metadata.fy * alpha;
        angle = rad(metadata.angle) - Math.PI / 2;
      } else if (metadata.type == "arc") {
        // Arc, interpolate the arc
        const right = metadata.startAngle < metadata.endAngle;
        const posAngle =
          rad(metadata.startAngle) * (1 - alpha) +
          rad(metadata.endAngle) * alpha +
          (right ? -Math.PI / 2 : Math.PI / 2);
        x = metadata.cx + metadata.radius * Math.cos(posAngle);
        y = metadata.cy + metadata.radius * Math.sin(posAngle);
        angle = right ? posAngle : posAngle - Math.PI;
      }
      break;
    }

    // It's not this segment, move on
    distance -= metadata.distance;
  }

  if (x && y && angle) {
    // Draw the car by translating & rotating then drawing the image
    // We need to save and restore to not change the root transform
    ctx.save();
    ctx.fillStyle = "#000";
    ctx.translate(x, y);
    ctx.rotate(angle + Math.PI / 2);
    ctx.beginPath();
    // viewBox = 49 55 236 109
    const svgWidth = 236;
    const svgHeight = 109;
    const width = TRACK_WIDTH * 2 * CAR_PERCENT;
    const height = TRACK_WIDTH * (svgWidth / svgHeight);
    ctx.drawImage(image, -width / 2, -height / 2, width, height);
    ctx.fill();
    ctx.restore();

    return [x, y, angle];
  }
}
