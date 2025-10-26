import DisplayCard from "@/components/Dashboard/DisplayCard";
import MessageModal from "@/components/Dashboard/MessageModal";
import { useMirrorStyles } from "@/styles/Mirror";
import {
  Card,
  CardBody,
  CardHeader,
  Flex,
  Heading,
  Text,
  Button,
  Stack,
  Divider,
  useToast,
  Spacer
} from "@chakra-ui/react";
import { api, usePolling } from "@rp/shared";

export default function Dashboard() {
  const { data } = usePolling("/dashboard", true, 5 * 1000);
  const mirrorStyle = useMirrorStyles();
  const toast = useToast();

  function identifyAll() {
    api
      .post("/dashboard/identify", undefined)
      .then(() =>
        toast({
          title: `Identified all displays`,
          status: "success"
        })
      )
      .catch((err) => {
        console.error(err);
        toast({
          title: `Failed to identify all displays`,
          status: "error"
        });
      });
  }

  function reloadAll() {
    api
      .post("/dashboard/reload", undefined)
      .then(() =>
        toast({
          title: `Reloaded all displays`,
          status: "success"
        })
      )
      .catch((err) => {
        console.error(err);
        toast({
          title: `Failed to reload all displays`,
          status: "error"
        });
      });
  }

  return (
    <>
      <Card sx={mirrorStyle} w="100%">
        <CardHeader>
          <Flex alignItems="end" w="100%">
            <Stack direction={"column"}>
              <Heading size="lg">Dashboard</Heading>
              <Text>{data ? data.length : 0} displays connected</Text>
            </Stack>
            <Spacer />
            <Stack direction="row" spacing={2}>
              <Button
                variant="outline"
                colorScheme="blue"
                onClick={identifyAll}
              >
                Identify All
              </Button>
              <Button variant="outline" colorScheme="green" onClick={reloadAll}>
                Reload All
              </Button>
              <MessageModal target={null} />
            </Stack>
          </Flex>
        </CardHeader>
        <Divider />
        <CardBody>
          <Stack spacing={4} w="100%">
            {data && data.length > 0 ? (
              data.map((display) => (
                <DisplayCard key={display.id} display={display} />
              ))
            ) : (
              <Text>No displays currently connected.</Text>
            )}
          </Stack>
        </CardBody>
      </Card>
    </>
  );
}
