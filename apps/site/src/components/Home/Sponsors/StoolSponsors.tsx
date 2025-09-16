import { Box, Image } from "@chakra-ui/react";
import React from "react";

interface Character {
  id: number;
  src: string;
  position: number;
}

const StoolsSponsors: React.FC = () => {
  const characters: Character[] = [
    {
      id: 1,
      src: "/sponsors/stools/left.png",
      position: 0
    },
    {
      id: 2,
      src: "/sponsors/stools/left1.png",
      position: 1
    },
    {
      id: 3,
      src: "/sponsors/stools/middle.png",
      position: 2
    },
    {
      id: 4,
      src: "/sponsors/stools/right1.png",
      position: 3
    },
    {
      id: 5,
      src: "/sponsors/stools/right.png",
      position: 4
    }
  ];

  return (
    <>
      <style>
        {`
         @media (max-width: 1200px) {
           .character-1, .character-5 { display: none !important; }
         }
         @media (max-width: 768px) {
           .character-1, .character-5 { display: none !important; }
         }
         @media (max-width: 480px) {
           .character-1, .character-5 { display: none !important; }
         }
         @media (max-width: 375px) {
           .character-2 { display: none !important; }
         }
       `}
      </style>
      <Box
        bottom={0}
        left={0}
        w="100%"
        h="15px"
        bg="linear-gradient(90deg, #ff0000 0%, #ffffff 50%, #ff0000 100%)"
        zIndex={1}
      />

      <Box
        position="relative"
        width="100%"
        h="100%"
        backgroundImage="url('/sponsors/stools/stool_bg.svg')"
        backgroundSize="cover"
        backgroundPosition="top"
        backgroundRepeat="no-repeat"
        overflow="hidden"
        display="flex"
        alignItems="flex-end"
        justifyContent="center"
        padding={0}
        filter="blur(4px)"
        opacity={0.3}
      >
        <Box
          display="flex"
          alignItems="flex-end"
          justifyContent="center"
          position="absolute"
          bottom="0"
          left="50%"
          transform="translateX(-50%)"
          padding={{ base: "0 0.25rem", md: "0 1rem" }}
          height="fit-content"
        >
          {characters.map((character) => (
            <Image
              key={character.id}
              src={character.src}
              alt={`Character ${character.id}`}
              className={`character-${character.id}`}
              height={{
                base: "45vh",
                sm: "45vh",
                md: "50vh"
              }}
              minH={"500px"}
              cursor="pointer"
              transition="all 0.3s ease-out"
              transform={"translateY(30px)"}
              _active={{
                transform: "translateY(-10px)"
              }}
            />
          ))}
        </Box>
      </Box>
    </>
  );
};

export default StoolsSponsors;
