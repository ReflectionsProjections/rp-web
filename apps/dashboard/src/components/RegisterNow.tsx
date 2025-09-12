import { ArrowLeftIcon } from "@chakra-ui/icons";
import { Box, Text } from "@chakra-ui/react";
import { motion } from "framer-motion";
import QRCode from "react-qr-code";

const REGISTER_URL = "https://reflectionsprojections.org/register";

const MotionBox = motion(Box);

export const RegisterNow = () => {
  return (
    <Box
      alignItems="flex-start"
      w="100%"
      display="flex"
      flexDir="column"
      pt={5}
    >
      <Text
        fontSize="3xl"
        fontWeight="bold"
        mb={4}
        fontFamily="ProRacingSlant"
        textAlign="center"
      >
        Register Now for Free
      </Text>
      <Box display="flex" alignItems="center" justifyContent="center" gap={3}>
        {/* QR CODE */}
        <Box
          p={4}
          borderRadius="lg"
          bgColor={"rgba(0,0,0,0.2)"}
          display="flex"
          justifyContent="center"
          alignItems="center"
          sx={{
            backdropFilter: "blur(12px)",
            WebkitBackdropFilter: "blur(12px)"
          }}
        >
          <QRCode
            style={{
              width: "150px",
              height: "150px",
              background: "transparent"
            }}
            value={REGISTER_URL}
            fgColor="white"
            bgColor="transparent"
          />
        </Box>

        {/* BOUNCING ARROW */}
        <MotionBox
          ml={5}
          initial={{ y: 0 }}
          animate={{ x: [0, -8, 0] }}
          transition={{ repeat: Infinity, duration: 1.2, ease: "easeInOut" }}
          display="flex"
          alignItems="center"
          justifyContent="center"
          color="yellow.400"
          fontSize="2xl"
        >
          <ArrowLeftIcon boxSize={9} />
        </MotionBox>
      </Box>
    </Box>
  );
};
