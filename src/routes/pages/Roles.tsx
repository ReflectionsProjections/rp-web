import {
  Box,
  Grid,
} from '@chakra-ui/react';
import RolesCard from './RolesCard';

function Roles() {
  
  return (
    <Box flex="1" minW='90vw' p={4}>
      <Grid templateColumns="repeat(3, 1fr)" gap={6}>
        <RolesCard role="ADMIN" />
        <RolesCard role="STAFF" />
        <RolesCard role="CORPORATE" />
      </Grid>
    </Box>
  )
}


export default Roles;