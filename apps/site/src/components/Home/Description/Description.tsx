import { Box, Heading, Text, useMediaQuery } from "@chakra-ui/react";
import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import greenCar from "@/assets/Description/cars/green.svg";
import redCar from "@/assets/Description/cars/red.svg";
import blueCar from "@/assets/Description/cars/blue.svg";

const MotionBox = motion(Box);
const MotionHeading = motion(Heading);
const MotionText = motion(Text);

const CARS = [
  {
    car: blueCar,
    from: {
      desktop: { left: "33%", top: "-10%", opacity: 0 },
      mobile: { left: "20%", top: "-10%", opacity: 0 }
    },
    to: {
      desktop: { left: "18%", top: "30%", opacity: 1 },
      mobile: { left: "5%", top: "25%", opacity: 1 }
    },
    delay: 0,
    width: "150px",
    trailGradient: "linear(to top, #3B82F6 0%, transparent 25%)",
    trailColor: "#3B82F6"
  },
  {
    car: redCar,
    from: {
      desktop: { left: "57%", top: "-10%", opacity: 0 },
      mobile: { left: "60%", top: "-10%", opacity: 0 }
    },
    to: {
      desktop: { left: "41%", top: "28%", opacity: 1 },
      mobile: { left: "25%", top: "50%", opacity: 1 }
    },
    delay: 0.12,
    width: "150px",
    trailGradient: "linear(to top, #EF4444 0%, transparent 25%)",
    trailColor: "#EF4444"
  },
  {
    car: greenCar,
    from: {
      desktop: { left: "80%", top: "-10%", opacity: 0 },
      mobile: { left: "95%", top: "-10%", opacity: 0 }
    },
    to: {
      desktop: { left: "55%", top: "50%", opacity: 1 },
      mobile: { left: "65%", top: "50%", opacity: 1 }
    },
    delay: 0.24,
    width: "150px",
    trailGradient: "linear(to top, #10B981 0%, transparent 40%)",
    trailColor: "#10B981"
  }
];

export const Description = () => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, amount: 0.5 });
  const [isMobile] = useMediaQuery("(max-width: 1000px)");

  const textRef = useRef(null);
  const textInView = useInView(textRef, { once: true, margin: "-100px" });

  return (
    <Box
      id="description"
      display="flex"
      maxW="1500px"
      mx="auto"
      flexDirection={{ base: "column", lg: "row" }}
      alignItems="center"
      justifyContent="space-between"
      position="relative"
      bg="#100E0E"
      overflowX="hidden"
      overflowY="visible"
      color="white"
      p={{ base: 4, md: 8 }}
    >
      {/* Cars wrapper */}
      <Box
        ref={ref}
        flexBasis={{ lg: "50%" }}
        w={{ base: "100%", md: "75%", lg: "100%" }}
        maxW="700px"
        h={{ base: isMobile ? "50vh" : "70vh", md: "40vh", lg: "70vh" }}
        transform={{ base: "scale(0.7)", md: "scale(1)" }}
        position="relative"
        zIndex={0}
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
              opacity: isMobile ? c.from.mobile.opacity : c.from.desktop.opacity
            }}
            animate={
              inView
                ? {
                    left: isMobile ? c.to.mobile.left : c.to.desktop.left,
                    top: isMobile ? c.to.mobile.top : c.to.desktop.top,
                    opacity: isMobile
                      ? c.to.mobile.opacity
                      : c.to.desktop.opacity
                  }
                : {}
            }
            transition={{
              type: "tween",
              duration: 0.8,
              ease: "linear",
              delay: c.delay
            }}
          >
            {/* glowing, pulsing trail */}
            <MotionBox
              position="absolute"
              bottom="140px"
              left="45%"
              zIndex={0}
              w="68px"
              h="1500px"
              bgGradient={c.trailGradient}
              transformOrigin="bottom"
              initial={{
                transform: "rotate(28deg) scaleY(0)",
                filter: `drop-shadow(0 0 8px ${c.trailColor})`
              }}
              animate={{
                transform: "rotate(28deg) scaleY(1)",
                filter: [
                  `drop-shadow(0 0 4px ${c.trailColor})`,
                  `drop-shadow(0 0 8px ${c.trailColor})`,
                  `drop-shadow(0 0 4px ${c.trailColor})`
                ]
              }}
              transition={{
                transform: {
                  duration: 1.2,
                  ease: "easeInOut",
                  delay: c.delay + 0.3
                },
                filter: {
                  repeat: Infinity,
                  duration: 1.5,
                  ease: "easeInOut",
                  delay: c.delay + 0.1
                }
              }}
            />
            {/* car image */}
            <Box as="img" src={c.car} position="relative" w="100%" zIndex={1} />
          </MotionBox>
        ))}
      </Box>

      {/* Text card */}
      <Box flexBasis={{ lg: "50%" }} maxW={{ lg: "52vw" }} zIndex={1}>
        <Box
          ref={textRef}
          color="white"
          p={{ base: 8, md: 10 }}
          px={{
            base: 0,
            md: 10
          }}
          pt={{
            base: -8,
            md: 0,
            lg: 10
          }}
        >
          <MotionHeading
            mb={4}
            fontFamily="ProRacingSlant"
            letterSpacing={1.5}
            fontSize={{ base: "3xl", md: "6xl" }}
            initial={{ y: -30, opacity: 0 }}
            animate={textInView ? { y: 0, opacity: 1 } : {}}
            transition={{ duration: 0.7, ease: "easeOut" }}
          >
            Welcome to R|P!
          </MotionHeading>
          <MotionText
            mb={4}
            maxW={{ lg: "600px" }}
            fontSize={{ base: "xl", md: "2xl" }}
            lineHeight="1.8"
            fontFamily="Magistral"
            fontWeight={700}
            initial={{ y: -20, opacity: 0 }}
            animate={textInView ? { y: 0, opacity: 1 } : {}}
            transition={{ duration: 0.6, delay: 0.4, ease: "easeOut" }}
          >
            Start your engines and step into the driver’s seat at the Midwest’s
            largest student-run technology conference!{" "}
            <Text
              as="span"
              fontFamily="ProRacing"
              fontSize={{ base: "4xl", md: "5xl" }}
              lineHeight={0}
              fontWeight={700}
            >
              🏎️
            </Text>
          </MotionText>

          <MotionText
            fontSize={{ base: "xl", md: "2xl" }}
            maxW={{ lg: "600px" }}
            lineHeight="1.8"
            fontFamily="Magistral"
            fontWeight={700}
            initial={{ y: -20, opacity: 0 }}
            animate={textInView ? { y: 0, opacity: 1 } : {}}
            transition={{ duration: 0.6, delay: 0.55, ease: "easeOut" }}
          >
            Hosted at the Siebel Center for Computer Science at UIUC from
            September 16–20, we’ll race towards the future with guest speakers,
            tech talks, a career fair, free merch, and more. At R|P, you’ll gear
            up for the road ahead.{" "}
            <Text
              as="span"
              fontFamily="ProRacing"
              fontSize={{ base: "4xl", md: "5xl" }}
              lineHeight={0}
              fontWeight={700}
            >
              🏁
            </Text>
          </MotionText>
        </Box>
      </Box>

      {/* Gradient bar */}
      {/* <Box
        w="100%"
        h="12px"
        bg="linear-gradient(90deg, #ff0000 0%, #ffffff 50%, #ff0000 100%)"
        position="absolute"
        bottom={0}
        left={0}
        zIndex={1}
      /> */}
    </Box>
  );
};

export default Description;
