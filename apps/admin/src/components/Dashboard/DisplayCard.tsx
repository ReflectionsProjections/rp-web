import { useMirrorStyles } from "@/styles/Mirror";
import {
  Card,
  Flex,
  Text,
  Button,
  Stack,
  Spacer,
  useToast,
  useDisclosure
} from "@chakra-ui/react";
import { api, Display, path, useTime } from "@rp/shared";
import InfoModal from "./InfoModal";
import MessageModal from "./MessageModal";

export default function DisplayCard({ display }: { display: Display }) {
  const { id, metadata, lastUpdate } = display;
  const time = useTime(1000);
  const mirrorStyle = useMirrorStyles();
  const toast = useToast();
  const messageModalDisclosure = useDisclosure();

  function identify() {
    api
      .post(path("/dashboard/identify/:id", { id }), undefined)
      .then(() =>
        toast({
          title: `Identified display #${id}`,
          status: "success"
        })
      )
      .catch((err) => {
        console.error(err);
        toast({
          title: `Failed to identify display #${id}`,
          status: "error"
        });
      });
  }

  function reload() {
    api
      .post(path("/dashboard/reload/:id", { id }), undefined)
      .then(() =>
        toast({
          title: `Reloaded display #${id}`,
          status: "success"
        })
      )
      .catch((err) => {
        console.error(err);
        toast({
          title: `Failed to reload display #${id}`,
          status: "error"
        });
      });
  }

  return (
    <Card key={id} sx={mirrorStyle} w="100%">
      <Flex alignItems="center" w="100%" gap={"3rem"} textAlign={"left"}>
        <Stack spacing={1} align="flex-start" minWidth={"10%"}>
          <Text fontWeight="semibold" fontSize={"lg"}>
            Display #{id}
          </Text>
          {metadata && (
            <Text fontSize="sm" textAlign={"center"}>
              {metadata.screenWidth}x{metadata.screenHeight}@
              {metadata.devicePixelRatio}x
            </Text>
          )}
          {metadata && metadata.platform.length > 0 && (
            <Text fontSize="sm" textAlign={"center"}>
              {metadata.platform}
            </Text>
          )}
          {metadata && (
            <Text fontSize="sm" textAlign={"center"}>
              Last updated {Math.round((time - lastUpdate) / 1000)}s ago
            </Text>
          )}
        </Stack>

        {metadata && (
          <Text fontSize={"md"} textAlign={"left"} wordBreak={"break-word"}>
            {metadata.userAgent}
          </Text>
        )}

        <Spacer />

        <Stack
          direction="row"
          spacing={2}
          flexWrap={{ base: "wrap", xl: "nowrap" }}
        >
          <Button variant="outline" colorScheme="blue" onClick={identify}>
            Identify
          </Button>
          <Button variant="outline" colorScheme="green" onClick={reload}>
            Reload
          </Button>
          <MessageModal target={id} disclosure={messageModalDisclosure} />
          <InfoModal
            display={display}
            time={time}
            identify={identify}
            reload={reload}
            messageModalDisclosure={messageModalDisclosure}
          />
        </Stack>
      </Flex>
    </Card>
  );
}
