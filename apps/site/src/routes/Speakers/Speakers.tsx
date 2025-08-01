import SpeakerCard from "@/components/SpeakersCard";
import { SpeakerRow } from "@/types/speaker-types";
import { Text, useMediaQuery, VStack } from "@chakra-ui/react";
import { Speaker } from "@rp/shared";
import { useEffect, useMemo, useState } from "react";

const COLORS = [
  "#007bff", // blue
  "#e74c3c", // red
  "#f39c12", // orange
  "#1abc9c", // teal
  "#e84393", // pink
  "#2ecc71" // green
];

// Now we have six rows (as in your design), each with up to three speakers
// Colors go in the order: blue, red, orange, teal, pink, green
export default function Speakers() {
  const [isMediumScreen] = useMediaQuery("(min-width: 960px)");
  const [isSmallScreen] = useMediaQuery("(min-width: 768px)");

  const [speakers, setSpeakers] = useState<Speaker[]>([]);

  const handleLoadSpeakers = () => {
    // try {
    //   const response = await api.get("/speakers");
    //   setSpeakers(response.data);
    // } catch {
    //   console.error("Failed to load speakers");
    // }
    setSpeakers([
      {
        speakerId: "1",
        name: "Sundar Pichai",
        title: "CEO, Google & Alphabet",
        bio: "Sundar Pichai has led Google’s transformation into an AI-first company, driving innovations in search, cloud, and consumer hardware.",
        eventTitle: "AI-First Strategies for the Modern Enterprise",
        eventDescription:
          "Explore how AI can be integrated at every level of your organization to boost productivity, drive innovation, and maintain ethical standards.",
        imgUrl: "https://example.com/images/sundar_pichai.jpg"
      },
      {
        speakerId: "2",
        name: "Satya Nadella",
        title: "CEO, Microsoft",
        bio: "Under Satya Nadella’s leadership, Microsoft has embraced cloud computing and open source, making Azure one of the world’s top cloud platforms.",
        eventTitle: "Building the Next-Gen Cloud Infrastructure",
        eventDescription:
          "A deep dive into Azure’s evolution and best practices for architecting scalable, secure cloud solutions.",
        imgUrl: "https://example.com/images/satya_nadella.jpg"
      },
      {
        speakerId: "3",
        name: "Tim Cook",
        title: "CEO, Apple",
        bio: "Tim Cook has expanded Apple’s Services business and championed privacy and sustainability initiatives across the company’s product lineup.",
        eventTitle: "Designing for Privacy and Sustainability",
        eventDescription:
          "Learn how to build products that delight users while protecting their data and minimizing environmental impact.",
        imgUrl: "https://example.com/images/tim_cook.jpg"
      },
      {
        speakerId: "4",
        name: "Andy Jassy",
        title: "CEO, Amazon",
        bio: "As former CEO of AWS, Andy Jassy built the leading cloud platform and now spearheads Amazon’s global e-commerce and logistics innovations.",
        eventTitle: "Scaling E-Commerce with Cloud-Native Architectures",
        eventDescription:
          "Insights on leveraging microservices, serverless, and containerization to handle massive traffic and drive operational excellence.",
        imgUrl: "https://example.com/images/andy_jassy.jpg"
      },
      {
        speakerId: "5",
        name: "Werner Vogels",
        title: "CTO, Amazon Web Services",
        bio: "Werner Vogels is the visionary CTO behind AWS’s design principles, championing distributed system best practices and resiliency at scale.",
        eventTitle: "Architecting Resilient Distributed Systems",
        eventDescription:
          "Proven patterns and pitfalls in building fault-tolerant, highly available services in the cloud.",
        imgUrl: "https://example.com/images/werner_vogels.jpg"
      },
      {
        speakerId: "6",
        name: "Mike Schroepfer",
        title: "Former CTO, Meta",
        bio: "During his tenure as Meta’s CTO, Mike Schroepfer led the company’s AI and connectivity initiatives, including advancements in AR/VR technologies.",
        eventTitle: "The Future of AR & VR in Social Experiences",
        eventDescription:
          "An exploration of emerging augmented and virtual reality platforms and their impact on digital interaction.",
        imgUrl: "https://example.com/images/mike_schroepfer.jpg"
      },
      {
        speakerId: "7",
        name: "Elon Musk",
        title: "CEO, Tesla & SpaceX",
        bio: "Elon Musk is the entrepreneur behind Tesla’s electric revolution and SpaceX’s achievements in reusable rocketry and interplanetary exploration.",
        eventTitle: "Engineering the Future: Electric Vehicles to Mars",
        eventDescription:
          "Hear how cross-industry innovation drives breakthroughs from sustainable transport to space travel.",
        imgUrl: "https://example.com/images/elon_musk.jpg"
      },
      {
        speakerId: "8",
        name: "Jensen Huang",
        title: "CEO, NVIDIA",
        bio: "Jensen Huang co-founded NVIDIA and turned it into the leader in GPU-accelerated computing for AI, gaming, and scientific research.",
        eventTitle: "Accelerating AI with GPU Computing",
        eventDescription:
          "Understand how GPU architectures are shaping the future of machine learning and high-performance computing.",
        imgUrl: "https://example.com/images/jensen_huang.jpg"
      },
      {
        speakerId: "9",
        name: "Mark Zuckerberg",
        title: "CEO, Meta",
        bio: "Mark Zuckerberg co-founded Facebook and now leads Meta’s vision for the metaverse and immersive social platforms.",
        eventTitle: "Building the Metaverse: Social Worlds of Tomorrow",
        eventDescription:
          "Discuss the technical and social challenges in creating interconnected virtual environments.",
        imgUrl: "https://example.com/images/mark_zuckerberg.jpg"
      },
      {
        speakerId: "10",
        name: "Shantanu Narayen",
        title: "CEO, Adobe",
        bio: "Shantanu Narayen has transformed Adobe into a cloud-based creative platform powerhouse, pioneering subscriptions and digital experiences.",
        eventTitle: "Creative Cloud: The Next Frontier",
        eventDescription:
          "Explore innovations in digital media, design workflows, and AI-powered creative tools.",
        imgUrl: "https://example.com/images/shantanu_narayen.jpg"
      },
      {
        speakerId: "11",
        name: "Parag Agrawal",
        title: "Former CTO, Twitter",
        bio: "Parag Agrawal oversaw Twitter’s technical direction, focusing on scaling real-time systems and machine learning infrastructure.",
        eventTitle: "Scaling Real-Time Social Platforms",
        eventDescription:
          "Trade-offs and techniques in managing billions of events per day in a high-throughput environment.",
        imgUrl: "https://example.com/images/parag_agrawal.jpg"
      },
      {
        speakerId: "12",
        name: "Kevin Scott",
        title: "CTO, Microsoft",
        bio: "Kevin Scott leads Microsoft’s AI and developer tooling initiatives, driving integration of cutting-edge research into products.",
        eventTitle: "Bridging Research and Production in AI",
        eventDescription:
          "Best practices for taking AI models from prototype to enterprise-grade deployments.",
        imgUrl: "https://example.com/images/kevin_scott.jpg"
      },
      {
        speakerId: "13",
        name: "Urs Hölzle",
        title: "SVP, Technical Infrastructure, Google",
        bio: "Urs Hölzle architected Google’s global data centers and transport networks, pioneering energy-efficient large-scale operations.",
        eventTitle: "Powering Planet-Scale Services",
        eventDescription:
          "Lessons from building and running some of the world’s largest, most energy-efficient data centers.",
        imgUrl: "https://example.com/images/urs_holzle.jpg"
      },
      {
        speakerId: "14",
        name: "Jeff Dean",
        title: "SVP, Google AI",
        bio: "Jeff Dean co-founded Google Brain and has driven breakthroughs in deep learning, spanning language, vision, and systems research.",
        eventTitle: "Deep Learning at Scale",
        eventDescription:
          "Techniques for training and serving neural networks on massive datasets across distributed systems.",
        imgUrl: "https://example.com/images/jeff_dean.jpg"
      },
      {
        speakerId: "15",
        name: "Drew Baglino",
        title: "CTO, Tesla",
        bio: "Drew Baglino leads Tesla’s powertrain and battery engineering, driving advances in electric vehicle efficiency and performance.",
        eventTitle: "Electrifying Transportation: Batteries & Beyond",
        eventDescription:
          "Innovations in battery chemistry, thermal management, and vehicle integration for electric mobility.",
        imgUrl: "https://example.com/images/drew_baglino.jpg"
      },
      {
        speakerId: "16",
        name: "Dario Gil",
        title: "CTO, IBM Research",
        bio: "Dario Gil oversees IBM’s global research organization, spanning AI, quantum computing, and advanced materials.",
        eventTitle: "Quantum & AI: The Next Computing Paradigms",
        eventDescription:
          "An overview of quantum hardware progress and AI innovations shaping future computing landscapes.",
        imgUrl: "https://example.com/images/dario_gil.jpg"
      },
      {
        speakerId: "17",
        name: "Adam Selipsky",
        title: "CEO, Amazon Web Services",
        bio: "Adam Selipsky returned to run AWS, focusing on customer-driven innovation and next-generation cloud services.",
        eventTitle: "The Future of Cloud: Trends & Technologies",
        eventDescription:
          "Key developments and emerging services that will define the next decade of cloud computing.",
        imgUrl: "https://example.com/images/adam_selipsky.jpg"
      },
      {
        speakerId: "18",
        name: "Larry Ellison",
        title: "CTO & Co-Founder, Oracle",
        bio: "Larry Ellison co-founded Oracle and continues to drive its technology vision, including autonomous databases and cloud infrastructure.",
        eventTitle: "Autonomous Databases & Cloud Evolution",
        eventDescription:
          "Dive into self-managing database technology and Oracle’s roadmap for enterprise cloud adoption.",
        imgUrl: "https://example.com/images/larry_ellison.jpg"
      },
      {
        speakerId: "19",
        name: "Bill McDermott",
        title: "CEO, SAP",
        bio: "Bill McDermott transformed SAP into a cloud-first software company, expanding its portfolio in enterprise applications and platforms.",
        eventTitle: "Enterprise Software in the Cloud Era",
        eventDescription:
          "Strategies for migrating mission-critical ERP and analytics workloads to the cloud securely and efficiently.",
        imgUrl: "https://example.com/images/bill_mcdermott.jpg"
      },
      {
        speakerId: "20",
        name: "Stewart Butterfield",
        title: "CEO, Slack (Salesforce)",
        bio: "Stewart Butterfield co-founded Slack, redefining workplace collaboration with messaging, bots, and integrations.",
        eventTitle: "The Future of Work: Collaboration Platforms",
        eventDescription:
          "How real-time messaging and integrations are reshaping team productivity and organizational culture.",
        imgUrl: "https://example.com/images/stewart_butterfield.jpg"
      }
    ]);
  };

  useEffect(() => {
    void handleLoadSpeakers();
  }, []);

  const speakerRows = useMemo<SpeakerRow[]>(() => {
    const maxPerRow = isMediumScreen ? 3 : isSmallScreen ? 2 : 2;

    return speakers.reduce<SpeakerRow[]>((rows, speaker: Speaker, idx) => {
      const rowIndex = Math.floor(idx / maxPerRow);
      if (!rows[rowIndex]) {
        rows[rowIndex] = {
          speakers: [],
          color: COLORS[rowIndex % COLORS.length]
        };
      }
      rows[rowIndex].speakers.push(speaker);
      return rows;
    }, []);
  }, [isMediumScreen, isSmallScreen, speakers]);

  return (
    <VStack gap={0} bgColor="#1F1F1F" py={12} bgImage="/backdrop.svg">
      <Text fontSize={"6xl"} fontFamily="ProRacing" color="white">
        Speakers
      </Text>
      <Text
        fontSize={"8xl"}
        fontFamily="ProRacing"
        color="white"
        my={0}
        mt={-10}
      >
        2025
      </Text>
      <br />
      {speakerRows.map((row, index) => (
        <SpeakerCard key={`speaker-${index}`} row={row} />
      ))}
    </VStack>
  );
}
