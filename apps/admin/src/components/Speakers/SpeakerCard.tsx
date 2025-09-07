import { useMirrorStyles } from "@/styles/Mirror";
import {
  Card,
  CardBody,
  Stack,
  Heading,
  Text,
  CardFooter,
  Flex,
  Image,
  Badge,
  Skeleton,
  SkeletonText,
  Avatar
} from "@chakra-ui/react";
import { Speaker } from "@rp/shared";
import React from "react";
import EditModal from "./EditModal";
import DeleteModal from "./DeleteModal";

type SpeakerCardProps = {
  speaker: Speaker;
  updateSpeakers: () => void;
};

const SpeakerCard: React.FC<SpeakerCardProps> = ({
  speaker,
  updateSpeakers
}) => {
  const mirrorStyles = useMirrorStyles(true, true);
  const isDefaultImage = speaker.imgUrl === "http://reflectionsprojections.org";

  return (
    <Card sx={mirrorStyles} maxW="sm">
      <CardBody>
        <Stack mt="6" spacing="3">
          {isDefaultImage ? (
            <Flex
              height="200px"
              width="100%"
              borderRadius="lg"
              align="center"
              justify="center"
            >
              <Avatar size="2xl" fontSize="3xl" />
            </Flex>
          ) : (
            <Image
              src={speaker.imgUrl}
              alt={speaker.name}
              borderRadius="lg"
              height="200px"
              objectFit="cover"
            />
          )}
          <Heading size="md">{speaker.name}</Heading>
          <Badge borderRadius="full" px="2" colorScheme="blue">
            {speaker.title}
          </Badge>
          <Text fontSize="sm" noOfLines={4}>
            {speaker.bio}
          </Text>
        </Stack>
      </CardBody>

      <CardFooter>
        <Flex justifyContent="space-between" width="100%">
          <EditModal speaker={speaker} updateSpeakers={updateSpeakers} />
          <DeleteModal speaker={speaker} updateSpeakers={updateSpeakers} />
        </Flex>
      </CardFooter>
    </Card>
  );
};

type SpeakerCardSkeletonProps = {
  animation?: boolean;
};

export const SpeakerCardSkeleton: React.FC<SpeakerCardSkeletonProps> = ({
  animation = true
}) => {
  const mirrorStyles = useMirrorStyles();
  const speed = animation ? undefined : 0;

  return (
    <Card sx={mirrorStyles} w="sm">
      <CardBody>
        <Stack mt="6" spacing="3" alignItems="center">
          <Skeleton
            height="200px"
            width="100%"
            speed={speed}
            borderRadius="lg"
          />
          <Skeleton height="24px" width="60%" speed={speed} />
          <Skeleton
            height="20px"
            width="100%"
            borderRadius="full"
            speed={speed}
          />
          <SkeletonText noOfLines={4} spacing="2" width="85%" speed={speed} />
        </Stack>
      </CardBody>
      <CardFooter>
        <Flex justifyContent="space-between" width="100%">
          <Skeleton
            height="36px"
            width="80px"
            borderRadius="md"
            speed={speed}
          />
          <Skeleton
            height="36px"
            width="80px"
            borderRadius="md"
            speed={speed}
          />
        </Flex>
      </CardFooter>
    </Card>
  );
};

export default SpeakerCard;
