import {
  Badge,
  Box,
  Button,
  Card,
  CardBody,
  CardFooter,
  Flex,
  Grid,
  Heading,
  Stack,
} from '@chakra-ui/react';
import rpLogo from '../../assets/rp_logo.png'
import { EditIcon } from '@chakra-ui/icons';
function Events() {
    
  return (
    <Box flex="1" minW='90vw' p={4}>
      <Heading size="lg">Events</Heading>
      <br />
      <Grid templateColumns={{ base: "repeat(1, 1fr)", md: "repeat(2, 1fr)", lg: "repeat(3, 1fr)" }}  gap={6}>
        <Card>
          <CardBody>
            <Flex flexDirection="column" align="center">
              <img src={rpLogo} alt='R|P Logo' style={{ width: '150px' }} />
            </Flex>
            <Stack mt='6' spacing='3'>
              <Heading size='md'>R|P Opening Event</Heading>
              <Badge borderRadius="full" px="2" colorScheme={"green"}>
                Virtual
              </Badge>
              <p>
                June 17th, 9:30 PM - 10:30 PM
              </p>
              <p>
                Points: 10
              </p>
              <p>Get ready to learn all about R|P 2024!</p>
            </Stack>
          </CardBody>
          <CardFooter>
            <Button leftIcon={<EditIcon/>} colorScheme="teal" variant="solid">
            Edit
            </Button>
          </CardFooter>
        </Card>

        <Card>
          <CardBody>
            <Flex flexDirection="column" align="center">
              <img src={rpLogo} alt='R|P Logo' style={{ width: '150px' }} />
            </Flex>
            <Stack mt='6' spacing='3'>
              <Heading size='md'>Sponsor Workshop</Heading>
              <Badge borderRadius="full" px="2" colorScheme={"purple"}>
                In-Person
              </Badge>
              <p>
                June 18th, 9:00 AM - 5:00 PM
              </p>
              <p>
                Points: 50
              </p>
              <p>Talk to our favorite sponsor...[uhh corporate save me here]</p>
            </Stack>
          </CardBody>
          <CardFooter>
            <Button leftIcon={<EditIcon/>} colorScheme="teal" variant="solid">
            Edit
            </Button>
          </CardFooter>
        </Card>

        <Card>
          <CardBody>
            <Flex flexDirection="column" align="center">
              <img src={rpLogo} alt='R|P Logo' style={{ width: '150px' }} />
            </Flex>
            <Stack mt='6' spacing='3'>
              <Heading size='md'>R|P Networking Night</Heading>
              <Badge borderRadius="full" px="2" colorScheme={"orange"}>
                Hybrid
              </Badge>
              <p>
                June 19th, 6:00 PM - 8:00 PM
              </p>
              <p>
                Points: 20
              </p>
              <p>Connect with professionals and expand your network.</p>
            </Stack>
          </CardBody>
          <CardFooter>
            <Button leftIcon={<EditIcon/>} colorScheme="teal" variant="solid">
            Edit
            </Button>
          </CardFooter>
        </Card>

        <Card>
          <CardBody>
            <Flex flexDirection="column" align="center">
              <img src={rpLogo} alt='R|P Logo' style={{ width: '150px' }} />
            </Flex>
            <Stack mt='6' spacing='3'>
              <Heading size='md'>R|P Closing Ceremony</Heading>
              <Badge borderRadius="full" px="2" colorScheme={"red"}>
                Virtual
              </Badge>
              <p>
                June 20th, 7:00 PM - 8:30 PM
              </p>
              <p>
                Points: 15
              </p>
              <p>Celebrate the end of R|P 2024 with us!</p>
            </Stack>
          </CardBody>
          <CardFooter>
            <Button leftIcon={<EditIcon/>} colorScheme="teal" variant="solid">
            Edit
            </Button>
          </CardFooter>
        </Card>
      </Grid>
    </Box>
  )
}
  
  
export default Events;