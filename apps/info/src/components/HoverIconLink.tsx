import { Box, Image, Link } from "@chakra-ui/react";
import { motion } from "framer-motion";
import React from "react";

interface HoverIconLinkProps {
  link: string;
  src: string;
  title?: string;
}

export const HoverIconLink: React.FC<HoverIconLinkProps> = ({
  link,
  src,
  title
}) => {
  // const [isHovered, setIsHovered] = useState(false);
  // const animation = useAnimation();

  // useEffect(() => {
  //     console.log("animate START")

  //     console.log("animate STOP")

  // }, [isHovered, animation])

  return (
    <Box
      justifyContent="center"
      alignItems="center"
      display="flex"
      overflow="visible"
      w="60px"
      h="60px"
      position="relative"
      zIndex="1"
      sx={{
        perspective: "600px"
      }}
    >
      <Link href={link} isExternal title={title} pos="absolute" zIndex="3">
        <Image
          src={src}
          fit="cover"
          filter="brightness(0)"
          borderRadius="200px"
          transition="transform 0.3s ease-out"
          pos="relative"
          zIndex="5"
          pointerEvents="none"
        />

        <motion.div
          initial={{ scale: 1, opacity: 0 }}
          //animate={animation}
          whileHover={{
            opacity: 0.4,
            scale: 1.2,
            rotateZ: [0, 360]
          }}
          transition={{
            opacity: { duration: 0.5 },
            scale: { type: "spring", stiffness: 100, damping: 5 },
            rotateZ: { duration: 8, repeat: Infinity, ease: "linear" }
          }}
          // onMouseEnter={() => setIsHovered(true)}
          // onMouseLeave={() => setIsHovered(false)}
          style={{
            width: "60px",
            height: "60px",
            zIndex: "2",
            position: "absolute",
            top: "0px",
            justifyContent: "center",
            alignItems: "center",
            display: "flex",
            transformStyle: "preserve-3d"
          }}
        >
          <Image
            src={src}
            style={{
              width: "100%",
              height: "100%",
              borderRadius: "200px",
              position: "absolute",
              zIndex: "1"
            }}
          />
          <Box
            style={{
              width: "92%",
              height: "92%",
              borderRadius: "200px",
              background: "white",
              position: "absolute",
              zIndex: "3"
            }}
          />
        </motion.div>
      </Link>
    </Box>
  );
};
