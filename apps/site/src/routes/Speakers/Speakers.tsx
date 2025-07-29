import { Box, HStack, Text, VStack } from "@chakra-ui/react";

type Speaker = {
  name: string;
  company: string;
  description: string;
};

type SpeakerRow = {
  speakers: Speaker[];
  color: string;
};

function SpeakerCard({ row }: { row: SpeakerRow }) {
  return (
    <VStack w="80%" mb={10}>
      <HStack gap={0} w="100%" maxW="1000px" ml={24}>
        {row.speakers.map((speaker) => (
          <Text
            flex={1}
            color={row.color}
            fontFamily="Magistral"
            fontSize="2xl"
            letterSpacing={"1px"}
            fontWeight={"bold"}
          >
            {speaker.name}
          </Text>
        ))}
      </HStack>
      <HStack w="100%" maxW="1000px">
        <Box
          flex={1}
          h="150px"
          bg={row.color}
          transform="skewX(-30deg)"
          mx="auto"
          borderLeftRadius={"md"}
          boxShadow={"md"}
        />
        <Box
          flex={1}
          h="150px"
          bg={row.color}
          transform="skewX(-30deg)"
          mx="auto"
        />
        <Box
          flex={1}
          h="150px"
          bg={row.color}
          transform="skewX(-30deg)"
          mx="auto"
          borderRightRadius={"md"}
        />
      </HStack>
      <HStack gap={0} w="100%" maxW="1000px" ml={-24}>
        {row.speakers.map((speaker) => (
          <Text
            flex={1}
            color={row.color}
            fontFamily="Magistral"
            letterSpacing={"1px"}
            fontSize="xl"
          >
            {speaker.company}
          </Text>
        ))}
      </HStack>
    </VStack>
  );
}

// Now we have six rows (as in your design), each with up to three speakers
// Colors go in the order: blue, red, orange, teal, pink, green
const SPEAKER_DATA: SpeakerRow[] = [
  {
    speakers: [
      {
        name: "Sundar Pichai",
        company: "Google / Alphabet",
        description:
          "Sundar Pichai is the CEO of Google and Alphabet. He has steered Google’s shift to an AI‑first strategy and overseen the growth of Google Cloud."
      },
      {
        name: "Satya Nadella",
        company: "Microsoft",
        description:
          "Satya Nadella is the CEO of Microsoft. Under his leadership, Azure has become a top‑three cloud provider and Microsoft acquired LinkedIn and GitHub."
      },
      {
        name: "Tim Cook",
        company: "Apple",
        description:
          "Tim Cook is the CEO of Apple. He has expanded Apple’s Services business to surpass hardware revenue and championed the company’s environmental initiatives."
      }
    ],
    color: "#007bff" // blue
  },
  {
    speakers: [
      {
        name: "Andy Jassy",
        company: "Amazon",
        description:
          "Andy Jassy is the CEO of Amazon (and former CEO of AWS). He built AWS into the leading cloud platform and now drives Amazon’s e‑commerce and logistics strategy."
      },
      {
        name: "Mark Zuckerberg",
        company: "Meta",
        description:
          "Mark Zuckerberg is the CEO of Meta. He spearheaded acquisitions of Instagram and WhatsApp and is investing heavily in the metaverse and AR/VR."
      },
      {
        name: "Elon Musk",
        company: "Tesla & SpaceX",
        description:
          "Elon Musk is the CEO of Tesla and SpaceX. He revolutionized electric vehicles and reusable rocketry, and also founded Neuralink and The Boring Company."
      }
    ],
    color: "#e74c3c" // red
  },
  {
    speakers: [
      {
        name: "Jensen Huang",
        company: "NVIDIA",
        description:
          "Jensen Huang is the CEO of NVIDIA. He pioneered GPU architectures for gaming and AI, making NVIDIA the standard for deep learning."
      },
      {
        name: "Lisa Su",
        company: "AMD",
        description:
          "Lisa Su is the CEO of AMD. She led AMD’s renaissance with high‑performance Ryzen and EPYC processors, challenging Intel’s dominance."
      },
      {
        name: "Arvind Krishna",
        company: "IBM",
        description:
          "Arvind Krishna is the CEO of IBM. He spearheaded the acquisition of Red Hat to bolster IBM’s hybrid cloud and AI offerings."
      }
    ],
    color: "#f39c12" // orange
  },
  {
    speakers: [
      {
        name: "Werner Vogels",
        company: "Amazon (CTO)",
        description:
          "Werner Vogels is the CTO of Amazon. He architected AWS into the leading cloud infrastructure platform and advocates best practices in scalable system design."
      },
      {
        name: "Parisa Tabriz",
        company: "Google (CTO, Chrome Security)",
        description:
          "Parisa Tabriz is the CTO of Chrome Security at Google. Known as Google’s “Security Princess,” she has fortified browser security and privacy features."
      },
      {
        name: "Mike Schroepfer",
        company: "Meta (former CTO)",
        description:
          "Mike Schroepfer was CTO of Meta from 2013 to 2022. He drove the development of React and advanced Meta’s AI and infrastructure strategy."
      }
    ],
    color: "#1abc9c" // teal
  },
  {
    speakers: [
      {
        name: "Susan Wojcicki",
        company: "YouTube",
        description:
          "Susan Wojcicki is the former CEO of YouTube. She scaled YouTube into the world’s largest video platform and introduced monetization tools for creators."
      },
      {
        name: "Reed Hastings",
        company: "Netflix",
        description:
          "Reed Hastings is the co‑CEO of Netflix. He transformed the company from DVD rentals to global streaming and pioneered binge‑watching with original content."
      },
      {
        name: "Evan Spiegel",
        company: "Snap Inc.",
        description:
          "Evan Spiegel is the CEO of Snap Inc. He innovated ephemeral messaging and AR lenses, and took Snap public in 2017."
      }
    ],
    color: "#e84393" // pink
  },
  {
    speakers: [
      {
        name: "Safra Catz",
        company: "Oracle",
        description:
          "Safra Catz is the CEO of Oracle. She managed Oracle’s shift to cloud computing and led major acquisitions like NetSuite."
      },
      {
        name: "Marc Benioff",
        company: "Salesforce",
        description:
          "Marc Benioff is the CEO of Salesforce. He built it into the leading CRM platform and is a pioneer of corporate philanthropy."
      },
      {
        name: "Dara Khosrowshahi",
        company: "Uber",
        description:
          "Dara Khosrowshahi is the CEO of Uber. He steered Uber through its IPO and expanded the business into food delivery and freight."
      }
    ],
    color: "#2ecc71" // green
  }
];
export default function Speakers() {
  return (
    <VStack gap={0} bgColor="#1F1F1F" py={12} bgImage="">
      <Text fontSize={"5xl"} fontFamily="ProRacing" color="white">
        Speakers
      </Text>
      <Text fontSize={"7xl"} fontFamily="ProRacing" color="white">
        2025
      </Text>
      <br />
      {SPEAKER_DATA.map((row) => (
        <SpeakerCard row={row} />
      ))}
    </VStack>
  );
}
