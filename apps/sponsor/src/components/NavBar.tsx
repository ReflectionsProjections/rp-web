import { Box, Image } from "@chakra-ui/react";

export function NavBar() {
  return (
    <Box
      height="100%"
      display="flex"
      alignItems="center"
      pl="10px"
      pt="10px"
      pb="10px"
    >
      <Image
        src="/2024_rp_logo.svg"
        maxH="100%"
        _hover={{
          filter: "brightness(30%)",
          transition: "filter 0.2s ease-in-out",
          cursor: "pointer"
        }}
        onClick={() => {
          window.location.href = "https://reflectionsprojections.org";
        }}
      />
    </Box>
  );
}
