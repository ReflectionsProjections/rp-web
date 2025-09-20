import useWebhook from "@/hooks/webhook";
import { Flex, Text } from "@chakra-ui/react";

export default function WebhookPopup() {
  const { message } = useWebhook();

  const textMessage = message && "message" in message;
  const width =
    !textMessage && message?.fullscreen
      ? window.innerWidth
      : window.innerWidth / 2;
  const height =
    !textMessage && message?.fullscreen
      ? window.innerWidth
      : window.innerWidth / 2;

  return (
    <>
      {message && (
        <Flex
          position={"absolute"}
          top={0}
          left={0}
          right={0}
          bottom={0}
          zIndex={100}
          alignItems={"center"}
          justifyContent={"center"}
        >
          {"message" in message ? (
            <Text
              background={"black"}
              borderRadius={"2vh"}
              padding={"2vh"}
              fontSize={"5vh"}
              width={"fit-content"}
              height={"fit-content"}
            >
              {message.message}
            </Text>
          ) : message.iframe ? (
            <iframe
              src={message.url}
              width={width}
              height={height}
              allow="autoplay"
              style={{ width, height }}
            />
          ) : (
            <img
              src={message.url}
              width={width}
              height={height}
              style={{ width, height, objectFit: "contain" }}
            />
          )}
        </Flex>
      )}
    </>
  );
}
