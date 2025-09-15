import { Flex, Heading } from "@chakra-ui/react";
import RolesCard from "../../components/Roles/RolesCard";

function Roles() {
  return (
    <>
      <Flex justifyContent="center" alignItems="center">
        <Heading size="lg">Roles</Heading>
      </Flex>
      <br />
      <Flex
        w="100%"
        p={4}
        flexWrap="wrap"
        justifyContent="space-evenly"
        gap={6}
      >
        <RolesCard />
      </Flex>
    </>
  );
}

export default Roles;
