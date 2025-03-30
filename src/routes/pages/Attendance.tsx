import {
  Box,
  Flex,
  Heading,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
  VStack,
} from '@chakra-ui/react';
import AttendanceTable from '../../components/AttendanceTable';
    
function Notifications() {
  const staff = [
    {
        name: "Dev Team 1",
        team: "dev"
    },
    {
        name: "Design Team 1",
        team: "design"
    }
  ];

  const dates = ["3/29", "3/24"];

  return (
    <Box flex="1" minW='90vw' p={4}>
      <Heading size="lg">Attendance</Heading>
      <br />
      <Flex justify="center">
          <VStack>
            <Tabs size="lg">
              <TabList>
                <Tab>Full Team</Tab>
                <Tab>Design</Tab>
                <Tab>Dev</Tab>
                <Tab>Content</Tab>
                <Tab>Marketing</Tab>
                <Tab>Corporate</Tab>
              </TabList>
              <TabPanels>
                <TabPanel>
                  <AttendanceTable staff={staff} meetingDates={dates}/>
                </TabPanel>
                <TabPanel>
                  <AttendanceTable staff={staff.filter((member) => member.team === "design")} meetingDates={dates}/>
                </TabPanel>
                <TabPanel>
                  <AttendanceTable staff={staff.filter((member) => member.team === "dev")} meetingDates={dates}/>
                </TabPanel>
                <TabPanel>
                  <AttendanceTable staff={staff.filter((member) => member.team === "content")} meetingDates={dates}/>
                </TabPanel>
                <TabPanel>
                  <AttendanceTable staff={staff.filter((member) => member.team === "marketing")} meetingDates={dates}/>
                </TabPanel>
                <TabPanel>
                  <AttendanceTable staff={staff.filter((member) => member.team === "corporate")} meetingDates={dates}/>
                </TabPanel>
              </TabPanels>
            </Tabs>
          </VStack>
      </Flex>
    </Box>
  );
}
    
    
export default Notifications;