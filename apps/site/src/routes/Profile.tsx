import {
  Box,
  HStack,
  Icon,
  Image,
  Link,
  Spinner,
  Text,
  VStack
} from "@chakra-ui/react";
import { api, Attendee, path, RoleObject, TierTypes } from "@rp/shared";
import { motion } from "framer-motion";
import { QRCodeSVG } from "qrcode.react";
import { useEffect, useState } from "react";
import { FaMedal } from "react-icons/fa";

const MotionBox = motion(Box);

const tierToName: Record<TierTypes, string> = {
  TIER1: "Tier 1",
  TIER2: "Tier 2",
  TIER3: "Tier 3",
  TIER4: "Tier 4"
};

const tierToLeftMargin: Record<TierTypes, string> = {
  TIER1: "0%",
  TIER2: "30%",
  TIER3: "60%",
  TIER4: "85%"
};

export function Profile() {
  const [qr, setQr] = useState<string>("");
  const [roleObject, setRoleObject] = useState<RoleObject | null>(null);
  const [attendee, setAttendee] = useState<Attendee | null>(null);
  const [foodWave, setFoodWave] = useState<number | null>(null);

  const handleLoadQr = async () => {
    const qrCode = await api.get("/attendee/qr");
    setQr(qrCode.data.qrCode);
  };

  const handleLoadAuthData = async () => {
    const role = await api.get("/auth/info");
    setRoleObject(role.data);

    if (role.data.userId) {
      const newAttendee = await api.get(
        path(`/attendee/id/:userId`, { userId: role.data.userId })
      );
      setAttendee(newAttendee.data);

      const foodWave = await api.get("/attendee/foodwave");
      setFoodWave(foodWave.data.foodwave);
    }
  };

  useEffect(() => {
    void handleLoadQr();
    void handleLoadAuthData();
  }, []);

  return (
    <VStack
      bgColor="black"
      minH="100vh"
      color="white"
      spacing={0}
      align="stretch"
      bgImage="/profile_qr_bg.svg"
      bgSize={"cover"}
      pb={32}
    >
      <Box px={6} pt={6} pb={4} maxW="400px" w="100%" mx="auto">
        <Link
          href={"/"}
          color="blue.300"
          fontFamily={"Magistral"}
          fontSize={"lg"}
          fontWeight={"bold"}
          py={4}
        >
          Back to main site
        </Link>
        <VStack
          border={"1px solid #ccc"}
          p={2}
          pt={0}
          borderRadius={"xl"}
          mt={3}
          gap={0}
        >
          <HStack justifyContent={"flex-end"} w="100%">
            <HStack alignItems={"center"} gap={2}>
              <Text fontFamily="ProRacing" fontSize="3xl" ps="auto">
                {attendee?.points ?? 0}
              </Text>
              <Text
                fontFamily="ProRacing"
                fontSize="lg"
                ps="auto"
                bgColor={"red.500"}
                px={3}
                borderRadius={"lg"}
              >
                PTS
              </Text>
            </HStack>
          </HStack>
          <Image src="/profile_image.svg" w="100%" />
        </VStack>
        <HStack
          bgColor="#ccc"
          p={5}
          py={3}
          my={3}
          justifyContent={"space-between"}
          borderRadius="xl"
          borderLeftWidth="8px"
          borderLeftColor="red.500" // or whatever exact red you need
        >
          <VStack gap={0} alignItems={"flex-start"}>
            <Text
              fontFamily="Magistral"
              fontSize="3xl"
              fontWeight="bold"
              color="gray.800"
            >
              {roleObject?.displayName}
            </Text>
            <Text
              fontFamily="Magistral"
              fontSize="xl"
              fontWeight="bold"
              color="gray.600"
            >
              {roleObject?.email}
            </Text>
          </VStack>
          <Image src="/rp_logo.svg" w="40px" />
        </HStack>
        <HStack>
          <Text
            fontFamily="Magistral"
            fontSize="xl"
            fontWeight="bold"
            color="white"
            fontStyle={"italic"}
          >
            Food Wave:
          </Text>
          {foodWave === 1 ? (
            <Text
              fontFamily="Magistral"
              fontSize="xl"
              fontWeight="bold"
              fontStyle="italic"
            >
              Standard
            </Text>
          ) : foodWave === 2 ? (
            <HStack spacing={2} alignItems="center">
              <Text
                fontFamily="Magistral"
                fontSize="xl"
                fontWeight="bold"
                fontStyle="italic"
                color="yellow.500"
              >
                Priority
              </Text>
              <Icon as={FaMedal} color="yellow.500" w={4} h={4} />
            </HStack>
          ) : (
            <Text
              fontFamily="Magistral"
              fontSize="xl"
              fontWeight="bold"
              fontStyle="italic"
            >
              Not available
            </Text>
          )}
        </HStack>
        <Text
          fontFamily="Magistral"
          fontSize="xl"
          fontWeight="bold"
          mb={6}
          color="white"
          fontStyle={"italic"}
        >
          Prize Tier:{" "}
          {attendee?.currentTier
            ? tierToName[attendee.currentTier]
            : "Not available"}
          {attendee?.currentTier ? (
            <PrizeTier tier={attendee.currentTier} />
          ) : (
            " Not available"
          )}
        </Text>

        <Text fontFamily="Magistral" fontSize="lg" fontWeight="bold" mb={2}>
          Level up your prize tier to unlock more rewards at the end of the
          event.
        </Text>

        <Text fontFamily="Magistral" fontSize="lg" fontWeight="bold" mb={2}>
          Attend events and activities to earn points, which advance your prize
          tier.
        </Text>

        <Text
          fontFamily="Magistral"
          fontSize="2xl"
          fontWeight="bold"
          mb={2}
          mt={4}
        >
          Check-in QR Code
        </Text>
        <Box p={8} bgColor={"#ccc"} borderRadius={"xl"}>
          {qr ? (
            <QRCodeSVG
              value={qr}
              width="100%"
              height="100%"
              bgColor="transparent"
            />
          ) : (
            <Spinner />
          )}
        </Box>
      </Box>
    </VStack>
  );
}

export function PrizeTier({ tier }: { tier: TierTypes }) {
  // map tiers 1–4 → percent offsets
  const tierIndex = Number(tier.slice(-1)) - 1; // 0–3

  // create 4 markers
  const roadMarkers = Array.from({ length: 50 }, (_, i) => (
    <Box
      key={i}
      position="absolute"
      left={`${i * 24}px`}
      top="50%"
      transform="translateY(-50%)"
      width="8px"
      height="2px"
      backgroundColor="#ffd700"
      borderRadius="1px"
      zIndex={1}
      opacity={0.5}
    />
  ));

  const markers = [1, 2, 3, 4].map((n, i) => {
    const isCurrent = i <= tierIndex;
    return {
      label: n,
      left: `${(i / 3) * 100}%`,
      size: isCurrent ? 24 : 20,
      bg: isCurrent ? "#ffd700" : "#555",
      color: isCurrent ? "black" : "white",
      fontSize: isCurrent ? "md" : "sm"
    };
  });

  return (
    <Box width="100%" position="relative" height="60px" mt={2}>
      <Box
        height="24px"
        overflow="hidden"
        position="relative"
        backgroundColor="#333"
        borderRadius="8px"
        margin="0"
        border="1px solid #555"
      >
        {/* ROAD */}
        <MotionBox
          height="100%"
          style={{ width: "100%" }}
          backgroundColor="#666"
          transition="width 0.8s ease-out"
          position="absolute"
          left={0}
          top={0}
          borderRadius="8px"
        />

        {/* DASHED */}
        {roadMarkers}

        <MotionBox
          position="absolute"
          top="50%"
          initial={{ left: tierToLeftMargin[tier] }}
          style={{ left: "0%" }}
          transform="translateY(-50%)"
          zIndex={2}
          transition="left 0.8s ease-out"
        >
          <img
            src="/registration/progress-icon.svg"
            alt="Progress"
            style={{ display: "block", height: "22px" }}
          />
        </MotionBox>
      </Box>

      {/* TIER MARKERS BELOW ROAD */}
      <Box
        display={"flex"}
        alignItems={"center"}
        justifyContent={"space-between"}
        mt={2}
      >
        {markers.map(({ label, size, bg, color, fontSize }) => (
          <Box
            key={label}
            display="flex"
            top="36px"
            textAlign="center"
            flexDir={"column"}
            alignItems={"center"}
          >
            <Box
              width={`${size}px`}
              height={`${size}px`}
              bg={bg}
              borderRadius="50%"
              display="flex"
              alignItems="center"
              justifyContent="center"
              mb={1}
            >
              <Text
                fontSize={fontSize}
                fontWeight="bold"
                color={color}
                ml={"-2px"}
              >
                {label}
              </Text>
            </Box>
          </Box>
        ))}
      </Box>
    </Box>
  );
}
