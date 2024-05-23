// import { useState } from 'react'
// import reactLogo from './assets/react.svg'
import rpLogo from '../assets/rp_logo.png'
// import viteLogo from '/vite.svg'
import '../App.css'
// import axios from 'axios';
import {
  Box,
  Flex,
  IconButton,
  useDisclosure,
  HStack,
  Button,
  Menu,
  MenuButton,
  Avatar,
  MenuList,
  MenuItem,
  MenuDivider,
  Stack,
  useColorModeValue,
  Link,
  StatGroup,
  StatLabel,
  Stat,
  StatNumber,
  StatHelpText,
  StatArrow,
  Card,
  CardHeader,
  Heading,
  CardBody,
  StackDivider
} from '@chakra-ui/react';
import { HamburgerIcon, CloseIcon, AddIcon } from '@chakra-ui/icons';

import { ReactNode } from 'react';

const Links = ['Dashboard', 'Editing', 'TBD'];

const NavLink = ({ children }: { children: ReactNode }) => (
  <Link
    px={2}
    py={1}
    rounded={'md'}
    _hover={{
      textDecoration: 'none',
      bg: useColorModeValue('gray.200', 'gray.700'),
    }}
    href={'#'}>
    {children}
  </Link>
);

export default function Login() {
    // const [count, setCount] = useState(0)
    
  
    const printToken = () => {
      console.log('Home page');
      const jwt = localStorage.getItem("jwt");
      console.log("jwt:", jwt);
    }
    const { isOpen, onOpen, onClose } = useDisclosure();

    return (
      <>
        <Box
          bg={useColorModeValue('gray.100', 'gray.900')}
          px={4}
          position="fixed"
          top={0}
          left={0}
          width="100%"
          zIndex={1}
        >
          <Flex h={16} alignItems={'center'} justifyContent={'space-between'} bg={useColorModeValue('gray.100', 'gray.900')}>
            <IconButton
              size={'md'}
              icon={isOpen ? <CloseIcon /> : <HamburgerIcon />}
              aria-label={'Open Menu'}
              display={{ md: 'none' }}
              onClick={isOpen ? onClose : onOpen}
            />
            <HStack spacing={8} alignItems={'center'}>
              <Flex align="center" mr={5}>
                <img src={rpLogo} alt='R|P Logo' style={{ width: '50px' }} />
              </Flex>
              <HStack
                as={'nav'}
                spacing={4}
                display={{ base: 'none', md: 'flex' }}>
                {Links.map((link) => (
                  <NavLink key={link}>{link}</NavLink>
                ))}
              </HStack>
            </HStack>
            <Flex alignItems={'center'}>
              <Menu>
                <MenuButton
                  as={Button}
                  rounded={'full'}
                  variant={'link'}
                  cursor={'pointer'}
                  minW={0}>
                  <Avatar
                    size={'sm'}
                    src={
                      'https://cdn-icons-png.freepik.com/512/8742/8742495.png'
                    }
                  />
                </MenuButton>
                <MenuList>
                  <MenuItem onClick={printToken}>Print JWT</MenuItem>
                  <MenuItem>Link 2</MenuItem>
                  <MenuDivider />
                  <MenuItem>Sign Out</MenuItem>
                </MenuList>
              </Menu>
            </Flex>
          </Flex>

          {isOpen ? (
            <Box pb={4} display={{ md: 'none' }}>
              <Stack as={'nav'} spacing={4}>
                {Links.map((link) => (
                  <NavLink key={link}>{link}</NavLink>
                ))}
              </Stack>
            </Box>
          ) : null}
        </Box>

        <Box mt={16} flex="1" display="flex" flexDirection="column" height='94vh' width='90vw'>
          <Box flex="1" p={4}>
            <Card>
              <CardHeader>
                <Heading size='md'>Welcome to R|P Admin</Heading>
              </CardHeader>

              <CardBody>
                <Stack divider={<StackDivider />} spacing='4'>
                  <Box>
                    <Heading size='xs' textTransform='uppercase'>
                      Dashboard
                    </Heading>
                    <span>
                      View a summary of all your statistics.
                    </span>
                  </Box>
                  <Box>
                    <Heading size='xs' textTransform='uppercase'>
                      Editing
                    </Heading>
                    <span>
                      Edit events, emails, and other content.
                    </span>
                  </Box>
                  <Box>
                    <Heading size='xs' textTransform='uppercase'>
                      TBD
                    </Heading>
                    <span>
                      Yup. To be decided
                    </span>
                  </Box>
                </Stack>
              </CardBody>
            </Card>
            <br />
            <StatGroup>
              <Stat>
                <StatLabel>Sent</StatLabel>
                <StatNumber>345,670</StatNumber>
                <StatHelpText>
                  <StatArrow type='increase' />
                  23.36%
                </StatHelpText>
              </Stat>

              <Stat>
                <StatLabel>Clicked</StatLabel>
                <StatNumber>45</StatNumber>
                <StatHelpText>
                  <StatArrow type='decrease' />
                  9.05%
                </StatHelpText>
              </Stat>
            </StatGroup>
          </Box>
        </Box>
      </>
    );
  }
