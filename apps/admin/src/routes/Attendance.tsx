import { useEffect, useState } from "react";
import { useSearchParams, Link } from "react-router-dom";
import {
  Box,
  Heading,
  useToast,
  Center,
  Spinner,
  Text,
  Button,
  VStack
} from "@chakra-ui/react";
import Lottie from "lottie-react";
import successAnimation from "../assets/animations/success.json";
import api from "../util/api";
import axios from "axios";
import { useMirrorStyles } from "@/styles/Mirror";
import { MdArrowBack } from "react-icons/md";

type Status =
  | "loading"
  | "success"
  | "alreadyCheckedIn"
  | "expired"
  | "notFound"
  | "clientError"
  | "serverError";

const AttendancePage = () => {
  const toast = useToast();
  const [searchParams] = useSearchParams();
  const meetingId = searchParams.get("meetingId");
  const mirrorStyles = useMirrorStyles();

  const [status, setStatus] = useState<Status>("loading");
  const [errorMessage, setErrorMessage] = useState<string>("");

  useEffect(() => {
    const checkInToMeeting = async () => {
      if (!meetingId) {
        toast({
          title: "Missing Meeting ID",
          description: "No meeting ID provided in the URL.",
          status: "error",
          duration: 5000,
          isClosable: true
        });
        setStatus("clientError");
        return;
      }

      try {
        const res = await api.post("/staff/check-in", { meetingId });

        if (res.status === 200) {
          toast({
            title: "Attendance Marked",
            description: "You have been checked into the meeting.",
            status: "success",
            duration: 5000,
            isClosable: true
          });
          setStatus("success");
          return;
        }
      } catch (err) {
        console.error("Check-in failed:", err);
        if (axios.isAxiosError(err) && err.response?.data) {
          // Pull these off err.response.data
          console.log("Check-in response:", err);
          const { error: code, message: msg } = err.response.data as {
            error?: string;
            message?: string;
          };
          if (code === "AlreadyCheckedIn") {
            toast({
              title: "Already Checked In",
              description: "You have already checked into this meeting!",
              status: "info",
              duration: 5000,
              isClosable: true
            });
            setStatus("alreadyCheckedIn");
            return;
          } else if (code === "Expired") {
            toast({
              title: "Check‑in Expired",
              description: "This check-in link has expired.",
              status: "warning",
              duration: 5000,
              isClosable: true
            });
            setStatus("expired");
            return;
          } else if (code === "NotFound") {
            toast({
              title: "Meeting Not Found",
              description: "The specified meeting ID does not exist.",
              status: "error",
              duration: 5000,
              isClosable: true
            });
            setStatus("notFound");
            return;
          } else {
            console.error("Unexpected error code:", code);
            toast({
              title:
                code === "AlreadyCheckedIn"
                  ? "Already Checked In"
                  : "Check‑in Failed",
              description: msg ?? "Please try again.",
              status: "error",
              duration: 5000,
              isClosable: true
            });
            setErrorMessage(msg ?? "Unexpected response");
            setStatus("serverError");
            return;
          }
        } else {
          const message = (err as Error).message;
          toast({
            title: "Unexpected Error",
            description: message,
            status: "error",
            duration: 5000,
            isClosable: true
          });
          setErrorMessage(message);
          setStatus("serverError");
          return;
        }
      }
    };

    void checkInToMeeting();
  }, [meetingId, toast]);

  return (
    <Center padding={8} minHeight="100vh">
      <Box sx={mirrorStyles} p={8} borderRadius="lg" maxW="500px" w="100%">
        <VStack spacing={6} align="stretch">
          {/* Return to Dashboard Button */}
          <Box>
            <Button
              as={Link}
              to="/"
              leftIcon={<MdArrowBack />}
              variant="ghost"
              size="sm"
              colorScheme="blue"
            >
              Return to Dashboard
            </Button>
          </Box>

          {/* Content */}
          {status === "loading" && (
            <Box textAlign="center">
              <Heading size="md">Checking you in…</Heading>
              <Spinner mt={4} />
            </Box>
          )}

          {status === "success" && (
            <Box textAlign="center">
              <Lottie
                animationData={successAnimation}
                loop={false}
                style={{ height: 200 }}
              />
              <Heading mt={4}>You're all checked in ✅</Heading>
            </Box>
          )}

          {status === "alreadyCheckedIn" && (
            <Box textAlign="center">
              <Heading size="md">You already checked in 👀</Heading>
              <Text mt={2}>No need to worry, you're counted.</Text>
            </Box>
          )}

          {status === "expired" && (
            <Box textAlign="center">
              <Heading size="md" color="orange.500">
                Check‑in Expired
              </Heading>
              <Text mt={2}>
                This check-in link has expired. Please contact an admin for
                help.
              </Text>
            </Box>
          )}

          {status === "notFound" && (
            <Box textAlign="center">
              <Heading size="md" color="red.500">
                Meeting Not Found
              </Heading>
              <Text mt={2}>
                The specified meeting ID does not exist. Please double check the
                code.
              </Text>
            </Box>
          )}

          {status === "serverError" && (
            <Box textAlign="center">
              <Heading size="md" color="red.500">
                {errorMessage || "Check‑in Failed"}
              </Heading>
            </Box>
          )}
        </VStack>
      </Box>
    </Center>
  );
};

export default AttendancePage;
