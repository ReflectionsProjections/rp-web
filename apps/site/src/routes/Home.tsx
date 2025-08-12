import { Box, Flex, Grid, Image, Text } from "@chakra-ui/react";

export default function Home() {
  return (
    <>
      <Box w="100%" h="400px" bg="black">
        <Box
          w="100%"
          h="300px"
          bg="linear-gradient(90deg,rgba(217, 217, 217, 1) 0%, rgba(115, 115, 115, 1) 100%)"
        >
          <Flex flexDirection="column" right={8}>
            <Grid templateColumns="1fr, 1fr, 1fr" templateRows="1fr, 1fr">
              <Image src="icon" />
            </Grid>
            <Text>© 2025 by Reflections | Projections</Text>
          </Flex>
          <Box w="100%" bottom={0}>
            <Image src="bottom car" />
            <Image src="bottom bar" />
          </Box>
        </Box>
      </Box>
    </>
  );
}
