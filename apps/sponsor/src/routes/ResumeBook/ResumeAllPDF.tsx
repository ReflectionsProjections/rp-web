import { Box, Text, useToast } from "@chakra-ui/react";
import { useEffect } from "react";
import { api, path } from "@rp/shared";

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
    api
      .get(path("/s3/download/user/:userId", { userId: "" }))
      .then(function (response) {
        window.location.replace(response.data.url);
      })
      .catch(function () {
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
