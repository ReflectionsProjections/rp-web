import { Box, Text, useToast } from "@chakra-ui/react";
import axios from "axios";
import { Config } from "../config";
import { useEffect } from "react";

export function ResumeAllPDF() {
  const toast = useToast();

  const showToast = (message: string) => {
    toast({
      title: message,
      status: "error",
      duration: 9000,
      isClosable: true
    });
  };

  const openResume = () => {
    const jwt = localStorage.getItem("jwt");
    axios
      .get(Config.API_BASE_URL + "/s3/download/user/", {
        headers: {
          Authorization: jwt
        }
      })
      .then(function (response) {
        window.location.replace(response.data.url);
      })
      .catch(function (error) {
        console.log(error);
        showToast("Failed to open resume. Please try again later.");
      });
  };

  useEffect(() => {
    openResume();
  }, []);

  return (
    <Box>
      <Text>Loading All PDFs</Text>
    </Box>
  );
}

export default ResumeAllPDF;
