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
  useColorMode,
  useColorModeValue,
  Link
} from '@chakra-ui/react';
import { HamburgerIcon, CloseIcon, AddIcon } from '@chakra-ui/icons';

import { ReactNode, useState } from 'react';

const Links = ['Dashboard', 'Stats', 'Events', 'Mail', 'Notifications', 'Roles'];
import Dashboard from './pages/Dashboard';
import Stats from './pages/Stats';
import Roles from './pages/Roles';

/**
 * NavLink component.
 *
 * @param children - The content of the NavLink.
 * @param onClick - The click event handler for the NavLink.
 */
const NavLink = ({ children, onClick }: { children: ReactNode, onClick: () => void }) => (
  <Link
    px={2}
    py={1}
    rounded={'md'}
    _hover={{
      textDecoration: 'none',
      bg: useColorModeValue('gray.200', 'gray.700'),
    }}
    onClick={onClick}
    cursor="pointer">
    {children}
  </Link>
);

export default function Home() {
    const printToken = () => {
      console.log('Home page');
      const jwt = localStorage.getItem("jwt");
      console.log("jwt:", jwt);
    }

    const { colorMode, toggleColorMode } = useColorMode();
    const { isOpen, onOpen, onClose } = useDisclosure();
    const [selectedLink, setSelectedLink] = useState('Dashboard');

    const renderComponent = () => {
      switch (selectedLink) {
        case 'Dashboard':
          return <Dashboard />;
        case 'Stats':
          return <Stats />;
        // case 'Events':
        //   return <Events />;
        // case 'Mail':
        //   return <Mail />;
        // case 'Notifications':
        //   return <Notifications />;
        case 'Roles':
          return <Roles />;
        default:
          return <Dashboard />;
      }
    };
  

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
              size={'lg'}
              icon={isOpen ? <CloseIcon /> : <HamburgerIcon />}
              aria-label={'Open Menu'}
              display={{ md: 'none' }}
              onClick={isOpen ? onClose : onOpen}
            />
            <HStack spacing={8} alignItems={'center'}>
              <Flex align="center" mr={5} maxWidth={50}>
                <img src={rpLogo} className='logo' alt='R|P Logo' style={{ width: '50px' }} />
              </Flex>
              <HStack
                as={'nav'}
                spacing={4}
                display={{ base: 'none', md: 'flex' }}>
                {Links.map((link) => (
                  <NavLink key={link} onClick={() => setSelectedLink(link)}>{link}</NavLink>
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
                  <MenuItem onClick={toggleColorMode}>Toggle Light/Dark Mode</MenuItem>
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
                  <NavLink key={link} onClick={() => setSelectedLink(link)}>{link}</NavLink>
                ))}
              </Stack>
            </Box>
          ) : null}
        </Box>

        <Box mt={16} flex="1" display="flex" flexDirection="column" minHeight='100%' height='93vh'>
          {renderComponent()}
        </Box>
      </>
    );
  }
