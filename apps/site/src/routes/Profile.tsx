import {
  Box,
  HStack,
  Image,
  Link,
  Spinner,
  Text,
  VStack
} from "@chakra-ui/react";
import { api, Attendee, path, RoleObject } from "@rp/shared";
import { QRCodeSVG } from "qrcode.react";
import { useEffect, useState } from "react";

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
        <Text
          fontFamily="Magistral"
          fontSize="xl"
          fontWeight="bold"
          color="white"
          fontStyle={"italic"}
        >
          Food Wave: {foodWave ?? "Not available"}
        </Text>
        <Text
          fontFamily="Magistral"
          fontSize="xl"
          fontWeight="bold"
          mb={6}
          color="white"
          fontStyle={"italic"}
        >
          Prize Tier: {attendee?.currentTier ?? "Not available"}
        </Text>
        <Text fontFamily="Magistral" fontSize="2xl" fontWeight="bold" mb={2}>
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
