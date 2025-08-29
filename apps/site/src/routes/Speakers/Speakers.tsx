import SpeakerCardRow from "@/components/Speakers/SpeakerCardRow";
import { SpeakerRow } from "@/types/speaker-types";
import { Text, useMediaQuery, VStack } from "@chakra-ui/react";
import { Speaker } from "@rp/shared";
import { useMemo } from "react";

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
  const [isMicroScreen] = useMediaQuery("(min-width: 360px)");

  const speakers = useMemo(() => {
    return [
      {
        speakerId: "0",
        name: "Lionel P. Robert Jr.",
        title: "Professor of Information and Robotics, Univ. of Michigan",
        bio: 'He is a Professor of Information and Robotics at the University of Michigan, with joint appointments in the School of Information and the College of Engineering’s Robotics Department. Currently, he oversees the Michigan Autonomous Vehicle Research Intergroup Collaboration (MAVRIC). Recognized as an ACM Distinguished Member, an AIS Distinguished Member "Cum Laude," and a Senior Member of INFORMS and IEEE. His research has been funded by the AAA Foundation, Automotive Research Center/U.S. Army, Army Research Laboratory, Toyota Research Institute, MCity, Lieberthal-Rogel Center for Chinese Studies, and the National Science Foundation. His work has also been featured in media outlets such as ABC, CNN, CNBC, NPR, Inc., The New York Times, and the Associated Press.',
        eventTitle: "",
        eventDescription: "",
        imgUrl: "/speakers/lionel_robert.png"
      },
      {
        speakerId: "1",
        name: "Mehdi Bahrami",
        title: "Principal Researcher, Fujitsu Research of America",
        bio: "Dr. Mehdi Bahrami is a Senior Member of both ACM and IEEE. He is a Principal Researcher at Fujitsu Research of America in California. With expertise in Generative AI, Applied Machine Learning at scale, his work focuses on advancing cutting-edge AI Agent technologies. He holds a Ph.D. in Computer Science from the University of California, Merced. Dr. Bahrami has over 15 years of software industry experience, complemented by more than five years of academic engagement, all toward contributing to AutoML, Natural Language Processing, and Generative AI.\nDr. Bahrami is a recipient of several awards, such as the 2024 IEEE Outstanding Engineer Award for his “pioneering contributions to generative AI and API automation”, the 2024 Fujitsu Research Group Head's Award for “achievements in AI trust technologies”, and the 2016 ACM ICN Best Demo Award. He has also received prestigious fellowships and leadership awards. Dr. Bahrami is the author of over 30 publications and the inventor of more than 34 granted U.S. patents. His work has been featured in prominent media outlets, including MIT Technology Review. Dr. Bahrami served as an AI panelist for the National Science Foundation’s Small Business Innovation Research (NSF SBIR) program.",
        eventTitle: "",
        eventDescription: "",
        imgUrl: "/speakers/mehdi_bahrami.png"
      },
      {
        speakerId: "2",
        name: "Juan Pablo Hourcade",
        title: "Professor, The University of Iowa",
        bio: "Juan Pablo Hourcade is a Professor at The University of Iowa's Department of Computer Science and Director of the Interdisciplinary Graduate Program in Informatics. His main area of research is Human-Computer Interaction, with a focus on the design, implementation, evaluation, and ethics of technologies that support creativity, collaboration, well-being, healthy development, and information access for a variety of users, including children and older adults. He conducts research with his students at the HawCHI Lab. Dr. Hourcade is the author of Child-Computer Interaction, the first comprehensive book on the topic, and has held various leadership roles in his research community. He is in the Editorial Board of Interacting with Computers and the International Journal of Child-Computer Interaction. In 2022, he was named ACM Distinguished Speaker.",
        eventTitle: "",
        eventDescription: "",
        imgUrl: "/speakers/juan_pablo.png"
      },
      {
        speakerId: "3",
        name: "Michael Schrenk",
        title: "Publisher, Mepso Media",
        bio: "Michael Schrenk develops Autonomous Bots and Competitive Intelligence Campaigns for a global client base.  He's written several books on the topic, but is perhaps best known for developing a bot that autonomously purchased tens of millions of dollars in underpriced vehicles.",
        eventTitle: "",
        eventDescription: "",
        imgUrl: "/speakers/michael_shrenk.png"
      },
      {
        speakerId: "4",
        name: "Josh Antonuccio",
        title: "Director, School of Media Arts and Studies",
        bio: "Josh Antonuccio is the Director of the School of Media Arts & Studies and an Associate Professor in Music Production and Recording Industry at Ohio University. He has spent over 2 decades in the music industry as an artist, producer, musician, audio specialist, technology adventurist, and studio owner. He is a Grammy-Voting member of The Recording Academy, an ASCAP-affiliated songwriter, and an AES member. He is the faculty director of the student-run record label Brick City Records and serves as the advisor for OHIO Women in Music Industry.\n\nHe created and now directs the annual Music Industry Summit, the largest annual music industry conference in the Midwest. The conference enters its 8th year in 2026 and has welcomed scores of artists, and music industry leaders to Ohio University. Past artist keynotes have included Earl Sweatshirt, Caamp, Jason Isbell, Phoebe Bridgers, Michelle Zauner, DJ Premier, Killer Mike, mxmtoon, Chuck D, St. Vincent, FINNEAS, and Saba. \n\nHis current research extends into artificial intelligence and its impact on music production and distribution, being interviewed on the topic across news outlets including The Associated Press, NBC News and Teen Vogue.\n",
        eventTitle: "",
        eventDescription: "",
        imgUrl: "/speakers/josh_antonuccio.png"
      },
      {
        speakerId: "5",
        name: "Shubha Jagannatha",
        title: "Startup Founder, Figment",
        bio: "Shubha Jagannatha is a Bay Area-based startup founder and creative technologist. Her startup, Figment, develops playful creative tools for storytelling and world building. Before Figment, she spent three years at Pixar as a Technical Director & Lead on five animated films (Turning Red, Lightyear, Elemental, Elio, and Hoppers). She has her B.S. and M.Eng degrees in Electrical Engineering and Computer Sciences from UC Berkeley.",
        eventTitle: "",
        eventDescription: "",
        imgUrl: "/speakers/shubha_jagannatha.png"
      },
      {
        speakerId: "6",
        name: "Ben Grosser",
        title: "Professor, University of Illinois Urbana-Champaign",
        bio: "BBen Grosser investigates how platform interfaces—from social media to AI chatbots—shape human behavior, desire, and culture. Through tactics such as software recomposition, interface reduction, and radical reimagination, his artworks expose software’s hidden politics and propose alternatives that restore user agency. His work has been exhibited at Centre Pompidou (Paris), Somerset House (London), ZKM (Karlsruhe), SXSW (Austin), and the Japan Media Arts Festival (Tokyo), and has appeared in The New York Times, The New Yorker, Wired, The Atlantic, The Guardian, Le Monde, and Der Spiegel. Grosser’s projects are regularly cited in books on the cultural effects of technology, including The Age of Surveillance Capitalism, The Metainterface, and Investigative Aesthetics. He is Professor of New Media at the University of Illinois Urbana–Champaign and a Faculty Associate at Harvard’s Berkman Klein Center for Internet and Society.",
        eventTitle: "",
        eventDescription: "",
        imgUrl: "/speakers/ben_grosser.png"
      },
      {
        speakerId: "7",
        name: "Karlyn D. Stanley",
        title: "Senior Policy Researcher, RAND Corporation",
        bio: "Karlyn Stanley is a lawyer and Senior Policy Researcher at RAND, an international research institution.   She was the principal investigator for a RAND project on AI Governance issues that provided concise reports on key AI issues to Congressional members on Capitol Hill.  She is a subject matter expert on the legal and policy dimensions of autonomous vehicles. She recently completed a RAND study of the new legal regimes for autonomous vehicles in six countries (China, Japan, Germany, France, Australia and the UK).  She is also the lead author of a 2020 RAND study of the impact of autonomous vehicles on automobile insurance. She is currently teaching a course about the ethical dilemmas of new and emerging technologies as an Adjunct Professor at the Walsh School of Foreign Service, Georgetown University, and is also a Professor of Policy Research in the RAND School of Public Policy. ",
        eventTitle: "",
        eventDescription: "",
        imgUrl: "/speakers/karlyn_stanley.png"
      },
      {
        speakerId: "8",
        name: "Eva Galperin",
        title: "Director of Cybersecurity, Electronic Frontier Foundation",
        bio: "Eva Galperin is EFF's Director of Cybersecurity, where she has worked since 2007. Her work is primarily focused on providing privacy and security for vulnerable populations around the world. To that end, she has applied the combination of her political science and technical background to everything from organizing EFF's Tor Relay Challenge, to writing privacy and security training materials, and publishing research on malware in Syria, Vietnam, Lebanon, and Kazakhstan. Since 2018, she has worked on addressing the digital privacy and security needs of survivors or domestic abuse. She is also a co-founder of the Coalition Against Stalkerware.",
        eventTitle: "",
        eventDescription: "",
        imgUrl: "/speakers/eva_galperin.png"
      }
    ] as Speaker[];
  }, []);

  // const [speakers, setSpeakers] = useState<Speaker[]>([]);

  // const handleLoadSpeakers = async () => {
  //   try {
  //     const response = await api.get("/speakers");
  //     setSpeakers(response.data);
  //   } catch {
  //     console.error("Failed to load speakers");
  //   }
  // };

  // useEffect(() => {
  //   // void handleLoadSpeakers();
  // }, []);

  const speakerRows = useMemo<SpeakerRow[]>(() => {
    const maxPerRow = isMediumScreen
      ? 3
      : isSmallScreen
        ? 2
        : isMicroScreen
          ? 2
          : 1;

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
  }, [isMediumScreen, isSmallScreen, isMicroScreen, speakers]);

  return (
    <VStack gap={0} bgColor="#1F1F1F" py={12} bgImage="/backdrop.svg">
      <Text
        fontSize={{ base: "3xl", sm: "5xl", md: "6xl" }}
        fontFamily="ProRacing"
        color="white"
      >
        Speakers
      </Text>
      <Text
        fontSize={{ base: "5xl", sm: "6xl", md: "8xl" }}
        fontFamily="ProRacing"
        color="white"
        my={0}
        mt={{ base: -5, md: -10 }}
      >
        2025
      </Text>
      <br />
      {speakerRows.map((row, index) => (
        <SpeakerCardRow key={`speaker-${index}`} row={row} />
      ))}
    </VStack>
  );
}
