import React, { useState } from "react";
import { Box, Image } from "@chakra-ui/react";

interface Character {
  id: number;
  src: string;
  position: number;
}

const StoolsSponsors: React.FC = () => {
  const [hoveredPerson, setHoveredPerson] = useState<number | null>(null);

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
        position="relative"
        width="100%"
        height={{ base: "70vh", md: "80vh", lg: "90vh" }}
        backgroundImage="url('/sponsors/stools/stool_bg.svg')"
        backgroundSize="cover"
        backgroundPosition="center"
        backgroundRepeat="no-repeat"
        overflow="hidden"
        display="flex"
        alignItems="flex-end"
        justifyContent="center"
        padding={0}
      >
        <Box
          display="flex"
          alignItems="flex-end"
          justifyContent="center"
          gap={{
            base: "0.5rem",
            sm: "1rem",
            md: "2rem",
            lg: "3rem"
          }}
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
                base: character.id === 3 ? "45vh" : "40vh",
                sm: character.id === 3 ? "50vh" : "45vh",
                md: character.id === 3 ? "65vh" : "60vh"
              }}
              maxHeight={{
                base: character.id === 3 ? "320px" : "280px",
                sm: character.id === 3 ? "350px" : "300px",
                md: character.id === 3 ? "550px" : "500px"
              }}
              width="auto"
              cursor="pointer"
              transition="all 0.3s ease-out"
              transform={
                hoveredPerson === character.id
                  ? "translateY(-10px)"
                  : "translateY(0px)"
              }
              onMouseEnter={() => setHoveredPerson(character.id)}
              onMouseLeave={() => setHoveredPerson(null)}
              _active={{
                transform: "translateY(-10px)"
              }}
              zIndex={hoveredPerson === character.id ? 10 : 1}
            />
          ))}
        </Box>
      </Box>
    </>
  );
};

export default StoolsSponsors;
