import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Box, Button, Input, Text, HStack, VStack } from "@chakra-ui/react";
import api from "@/util/api";

interface TwoFactorProps {
  email: string;
  sponsorLogin: (email: string) => void;
}

const TwoFactor: React.FC<TwoFactorProps> = ({ email, sponsorLogin }) => {
  const [code, setCode] = useState<string[]>(Array(6).fill(""));
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const navigate = useNavigate(); // Hook for navigation

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    index: number
  ) => {
    const value = e.target.value.toUpperCase();
    const newCode = [...code];

    if (value.length === 1) {
      newCode[index] = value;
      setCode(newCode);

      // Move focus to the next input
      if (index < 5) {
        const nextInput = document.getElementById(`box-${index + 1}`);
        if (nextInput) {
          (nextInput as HTMLInputElement).focus();
        }
      }
    }
  };

  const handleKeyDown = (
    e: React.KeyboardEvent<HTMLInputElement>,
    index: number
  ) => {
    if (e.key === "Backspace") {
      const newCode = [...code];

      if (!code[index] && index > 0) {
        // Focus on the previous input if current input is empty
        const prevInput = document.getElementById(`box-${index - 1}`);
        if (prevInput) {
          (prevInput as HTMLInputElement).focus();
        }

        // Also delete the value in the previous input
        newCode[index - 1] = "";
      } else {
        // Delete the current value
        newCode[index] = "";
      }

      setCode(newCode);
    }
  };

  const handlePaste = (e: React.ClipboardEvent<HTMLInputElement>) => {
    const paste = e.clipboardData.getData("text").toUpperCase();
    const pasteValues = paste.slice(0, 6).split("");
    const newCode = [...code];

    pasteValues.forEach((char, index) => {
      newCode[index] = char;
    });

    setCode(newCode);

    // Automatically focus the last filled input
    const lastFilledIndex = pasteValues.length - 1;
    if (lastFilledIndex < 5) {
      const nextInput = document.getElementById(`box-${lastFilledIndex + 1}`);
      if (nextInput) {
        (nextInput as HTMLInputElement).focus();
      }
    }
  };

  const handleSubmit = async (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    e.preventDefault();
    const fullCode = code.join("");

    if (fullCode.length !== 6) {
      setError("Please enter a 6-digit code.");
      return;
    }

    setLoading(true);
    setError("");
    setSuccess("");

    try {
      const response = await api.post("/auth/sponsor/verify", {
        sixDigitCode: fullCode,
        email: email
      });
      setSuccess("Two-factor authentication successful!");
      localStorage.setItem("jwt", response.data.token);
      navigate("/resume-book");
    } catch {
      setError("Invalid Code. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box mt="10vh" zIndex="2">
      <Text fontSize="24" fontFamily={"Nunito"} fontWeight={"400"}>
        Enter 6-Digit Code:
      </Text>
      <HStack spacing={2} mt="20px" justify="center">
        {code.map((value, index) => (
          <Input
            key={index}
            id={`box-${index}`}
            value={value}
            onChange={(e) => handleChange(e, index)}
            onKeyDown={(e) => handleKeyDown(e, index)}
            onPaste={handlePaste}
            maxLength={1}
            textAlign="center"
            size="md"
            width="50px"
            bg="white"
            textColor="black"
            borderRadius="5px"
            isDisabled={loading}
            _placeholder={{ color: "gray.400" }}
          />
        ))}
      </HStack>
      <VStack spacing={2} mt="20px" justify="center">
        <Button
          bg="green.500"
          color="white"
          borderRadius="5px"
          zIndex="3"
          m={4}
          mb={5}
          _hover={{ bg: "green.600" }}
          type="submit"
          onClick={(e) => void handleSubmit(e)}
          disabled={loading}
        >
          {loading ? "Submitting..." : "Submit"}
        </Button>

        <Button
          bg="blue.500"
          color="white"
          borderRadius="5px"
          m={4}
          mb={5}
          onClick={() => sponsorLogin(email)}
          _hover={{ bg: "blue.600" }}
        >
          Resend Code
        </Button>
      </VStack>

      {error && <p style={{ color: "red" }}>{error}</p>}
      {success && <p style={{ color: "green" }}>{success}</p>}
    </Box>
  );
};

export default TwoFactor;
