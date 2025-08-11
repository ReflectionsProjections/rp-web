import { Box, Heading, Text, useMediaQuery } from "@chakra-ui/react";
import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import greenCar from "@/assets/Description/cars/green.svg";
import greenTrail from "@/assets/Description/cars/greenTrail.svg";
import redCar from "@/assets/Description/cars/red.svg";
import redTrail from "@/assets/Description/cars/redTrail.svg";
import blueCar from "@/assets/Description/cars/blue.svg";
import blueTrail from "@/assets/Description/cars/blueTrail.svg";

const MotionBox = motion(Box);
const MotionImg = motion("img");

const CARS = [
  {
    car: blueCar as string,
    trail: blueTrail as string,
    from: {
      desktop: { left: "33%", top: "-10%", rot: "-25deg", opacity: 0 },
      mobile: { left: "20%", top: "-10%", rot: "-25deg", opacity: 0 }
    },
    to: {
      desktop: { left: "18%", top: "30%", rot: "3deg", opacity: 1 },
      mobile: { left: "5%", top: "25%", rot: "3deg", opacity: 1 }
    },
    delay: 0,
    width: "150px",
    trailHeight: "400px",
    trailWidth: "177px",
    trailTransform: "rotate(2deg) translateX(-5%) translateY(-8%)"
  },
  {
    car: redCar as string,
    trail: redTrail as string,
    from: {
      desktop: { left: "57%", top: "-10%", rot: "15deg", opacity: 0 },
      mobile: { left: "50%", top: "-10%", rot: "15deg", opacity: 0 }
    },
    to: {
      desktop: { left: "41%", top: "28%", rot: "3deg", opacity: 1 },
      mobile: { left: "25%", top: "50%", rot: "3deg", opacity: 1 }
    },
    delay: 0.12,
    width: "150px",
    trailHeight: "500px",
    trailWidth: "174px",
    trailTransform: "rotate(3deg) translateX(-5%) translateY(4%)"
  },
  {
    car: greenCar as string,
    trail: greenTrail as string,
    from: {
      desktop: { left: "65%", top: "-10%", rot: "-10deg", opacity: 0 },
      mobile: { left: "80%", top: "-10%", rot: "-10deg", opacity: 0 }
    },
    to: {
      desktop: { left: "50%", top: "45%", rot: "6deg", opacity: 1 },
      mobile: { left: "54%", top: "50%", rot: "6deg", opacity: 1 }
    },
    delay: 0.24,
    width: "150px",
    trailHeight: "600px",
    trailWidth: "230px",
    trailTransform: "rotate(2deg) translateX(-5%) translateY(4%)"
  }
];

export default function Description() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, amount: 0.5 });
  const [isMobile] = useMediaQuery("(max-width: 1000px)");

  return (
    <Box
      position="relative"
      minH="100vh"
      bg="black"
      overflow="hidden"
      color="white"
    >
      <Box ref={ref} position="absolute" top="50%" w="1px" h="1px" />

      {/* Cars wrapper */}
      <Box
        position="relative"
        w={isMobile ? "100vw" : "50vw"}
        h={isMobile ? "50vh" : "100vh"}
        zIndex={0}
        // You can now easily move all cars as a group:
        // example: top={{ base: '20px', md: '0' }} left="5%" transform="scale(0.9)"
      >
        {CARS.map((c, i) => (
          <MotionBox
            key={i}
            position="absolute"
            left={isMobile ? c.from.mobile.left : c.from.desktop.left}
            top={isMobile ? c.from.mobile.top : c.from.desktop.top}
            w={c.width}
            pointerEvents="none"
            initial={{
              opacity: isMobile
                ? c.from.mobile.opacity
                : c.from.desktop.opacity,
              transform: `rotate(${isMobile ? c.from.mobile.rot : c.from.desktop.rot})`
            }}
            animate={
              inView
                ? {
                    left: isMobile ? c.to.mobile.left : c.to.desktop.left,
                    top: isMobile ? c.to.mobile.top : c.to.desktop.top,
                    opacity: isMobile
                      ? c.to.mobile.opacity
                      : c.to.desktop.opacity,
                    transform: `rotate(${isMobile ? c.to.mobile.rot : c.to.desktop.rot})`
                  }
                : {}
            }
            transition={{
              type: "spring",
              stiffness: 120,
              damping: 15,
              delay: c.delay
            }}
          >
            <MotionImg
              src={c.trail}
              style={{
                position: "absolute",
                bottom: 0,
                left: "50%",
                transform: c.trailTransform,
                maxWidth: c.trailWidth,
                height: c.trailHeight,
                objectFit: "fill",
                zIndex: 0,
                maskImage:
                  "linear-gradient(to top, black var(--pct), transparent var(--pct))",
                WebkitMaskImage:
                  "linear-gradient(to top, black var(--pct), transparent var(--pct))"
              }}
              initial={{ "--pct": "0%" }}
              animate={inView ? { "--pct": "100%" } : {}}
              transition={{ delay: c.delay + 0.1, duration: 0.8 }}
            />
            <Box as="img" src={c.car} position="relative" w="100%" zIndex={1} />
          </MotionBox>
        ))}
      </Box>

      {/* Text card */}
      <MotionBox
        position={{ base: "relative", md: "absolute" }}
        top={{ base: "auto", md: "50%" }}
        right={{ base: "auto", md: "8%" }}
        transform={{ base: "none", md: "translateY(-50%)" }}
        zIndex={1}
        maxW={isMobile ? "100vw" : "520px"}
        mx={{ base: "auto", md: 0 }}
        initial={{ x: "20%", opacity: 0 }}
        animate={inView ? { x: 0, opacity: 1 } : {}}
        transition={{ duration: 0.6, delay: 0.15 }}
      >
        <Box
          color="white"
          borderRadius="2xl"
          boxShadow="xl"
          p={{ base: 6, md: 8 }}
        >
          <Heading mb={3} fontSize={{ base: "2xl", md: "3xl" }}>
            Welcome to R|P!
          </Heading>
          <Text fontSize={{ base: "md", md: "lg" }} lineHeight="1.8">
            Miss the 80's? Look no further because the Midwest’s largest student
            run tech-conference is bringing the raddest decade back! Join us for
            a week of insightful talks from industry & academia leaders,
            recruitment events by renowned companies, and more!
          </Text>
        </Box>
      </MotionBox>
    </Box>
  );
}
