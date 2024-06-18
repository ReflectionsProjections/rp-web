import {
  Box,
  Grid,
  Heading,
} from '@chakra-ui/react';
import RolesCard from './RolesCard';

function Roles() {
  
  return (
    <Box flex="1" minW='90vw' p={4}>
      <Heading size="lg">Roles</Heading>
      <br />
      <Grid templateColumns={{ base: "repeat(1, 1fr)", md: "repeat(3, 1fr)" }}  gap={6}>
        <RolesCard role="ADMIN" />
        <RolesCard role="STAFF" />
        <RolesCard role="CORPORATE" />
      </Grid>
    </Box>
  )
}


export default Roles;