import {
  Avatar,
  Button,
  ButtonGroup,
  Flex,
  HStack,
  Icon,
  IconButton,
  Image,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Spacer,
  Text,
  Tooltip
} from "@chakra-ui/react";
import { BsGrid, BsList } from "react-icons/bs";

export function ResumeBookNavbar({
  setShowList = () => {},
  showList = true
}: {
  setShowList?: (showList: boolean) => void;
  showList?: boolean;
}) {
  const signOut = () => {
    localStorage.removeItem("jwt");
    window.location.href = "/";
  };

  return (
    <Flex
      position="relative"
      h={16}
      minH={16}
      alignItems={"center"}
      justifyContent={"flex-start"}
      transition="background-color 0.3s ease, color 0.3s ease"
      bgColor="gray.200"
      borderBottom={"2px solid"}
      borderBottomColor={"gray.300"}
      px={3}
    >
      <HStack spacing={8} alignItems={"center"}>
        <Flex align="center" mr={2}>
          <Image src="/rp_logo.svg" minHeight={30} maxH="100%" />
        </Flex>
      </HStack>
      <Text
        color="gray.800"
        fontFamily={"Roboto Slab"}
        fontSize="2xl"
        display={{
          base: "none",
          md: "block"
        }}
      >
        Reflections | Projections
      </Text>
      <Text
        color="gray.600"
        fontSize="24px"
        textAlign="center"
        ml={{
          base: "0",
          md: "0.5rem"
        }}
      >
        Resume Book
      </Text>
      <Spacer />
      <Flex alignItems={"center"} zIndex="20" gap={4}>
        <ButtonGroup
          isAttached
          border="1px solid"
          borderColor="gray.400"
          borderRadius="7px"
          variant="outline"
        >
          <Tooltip label="List View" placement="bottom-start">
            <IconButton
              aria-label="List View"
              icon={<Icon as={BsList} boxSize={6} />}
              onClick={() => setShowList(true)}
              borderRightRadius={0}
              borderColor={showList ? "darkslategray" : "transparent"}
              _hover={{ borderColor: "gray", zIndex: 1 }}
              transition="border-color 0.3s ease"
              boxShadow={showList ? "md" : "none"}
            />
          </Tooltip>
          <Tooltip label="Grid View" placement="bottom-end">
            <IconButton
              aria-label="Grid View"
              icon={<Icon as={BsGrid} boxSize={6} />}
              onClick={() => setShowList(false)}
              borderLeftRadius={0}
              borderColor={showList ? "transparent" : "darkslategray"}
              _hover={{ borderColor: "gray", zIndex: 1 }}
              transition="border-color 0.3s ease"
              boxShadow={showList ? "md" : "none"}
            />
          </Tooltip>
        </ButtonGroup>
        <Menu>
          <MenuButton
            as={Button}
            rounded={"full"}
            variant={"link"}
            cursor={"pointer"}
            minW={0}
          >
            <Avatar bg="pink.600" size={"sm"} />
          </MenuButton>
          <MenuList>
            <MenuItem onClick={signOut}>Sign Out</MenuItem>
          </MenuList>
        </Menu>
      </Flex>
    </Flex>
  );
}
