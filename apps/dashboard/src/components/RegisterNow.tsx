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
      pt="2.5vh"
    >
      <Text
        fontSize="3vh"
        fontWeight="bold"
        mb="2vh"
        fontFamily="ProRacingSlant"
        textAlign="center"
      >
        Register Now for Free
      </Text>
      <Box display="flex" alignItems="center" justifyContent="center">
        {/* QR CODE */}
        <Box
          p="1vh"
          borderRadius="1vh"
          bgColor={"rgba(0,0,0,0.2)"}
          display="flex"
          justifyContent="center"
          alignItems="center"
          sx={{
            backdropFilter: "blur(12px)",
            WebkitBackdropFilter: "blur(12px)"
          }}
          marginRight={"1.5vh"}
        >
          <QRCode
            style={{
              width: "18vh",
              height: "18vh",
              background: "transparent"
            }}
            value={REGISTER_URL}
            fgColor="white"
            bgColor="transparent"
          />
        </Box>

        {/* BOUNCING ARROW */}
        <MotionBox
          ml="2.5vh"
          initial={{ y: 0 }}
          animate={{ x: [0, "-1vh", 0] }}
          transition={{ repeat: Infinity, duration: 1.2, ease: "easeInOut" }}
          display="flex"
          alignItems="center"
          justifyContent="center"
          color="yellow.400"
          fontSize="2.2vh"
        >
          <ArrowLeftIcon boxSize="4vh" />
        </MotionBox>
      </Box>
    </Box>
  );
};
