import {
  Box,
  StatGroup,
  StatLabel,
  Stat,
  StatNumber,
  StatHelpText,
  // StatArrow,
  Card,
  Heading,
  CardBody,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  NumberIncrementStepper,
  NumberDecrementStepper,
  CardHeader,
  useToast,
} from '@chakra-ui/react';

import { Bar } from 'react-chartjs-2';
import { Chart, registerables } from 'chart.js';


// Register Chart.js components
Chart.register(...registerables);

import React from 'react';
import api from '../../util/api';

function Stats() {
  const toast = useToast();

  const [checkInStats, setCheckInStats] = React.useState(0);
  const [priorityAttendees, setPriorityAttendees] = React.useState(0);
  const [dietaryRestrictions, setDietaryRestrictions] = React.useState(0);
  const [eventAttendance, setEventAttendance] = React.useState(0);
  const [eligiblePrize, setEligiblePrize] = React.useState(0);

  const [inputEventAttendance, setInputEventAttendance] = React.useState(0);
  const [inputEligiblePrize, setInputEligiblePrize] = React.useState(0);

  const [allergies, setAllergies] = React.useState(0);
  const [both, setBoth] = React.useState(0);
  const [none, setNone] = React.useState(0);

  const [allergyCounts, setAllergyCounts] = React.useState<{ [key: string]: number }>({});
  const [dietaryRestrictionCounts, setDietaryRestrictionCounts] = React.useState<{ [key: string]: number }>({});

  const showToast = (message: string) => {
    toast({
      title: message,
      status: "error",
      duration: 9000,
      isClosable: true,
    });
  };

  const getStats = async () => {

    // setCheckInStats(694);
    // setPriorityAttendees(120);

    api.get("/stats/check-in/")
      .then(function (response) {
        // handle success
        console.log("Check-In Response:", response.data);
        console.log(response.data.count);
        setCheckInStats(response.data.count);
      })
      .catch(function (error) {
        // handle error
        console.log(error);
        showToast("Failed to fetch check-in stats");
      });

    api.get("/stats/priority-attendee/")
      .then(function (response) {
        // handle success
        console.log(response.data.count);
        setPriorityAttendees(response.data.count);
      })
      .catch(function (error) {
        // handle error
        console.log(error);
        showToast("Failed to fetch priority attendees stats");
      });

    api.get("/stats/dietary-restrictions/")
      .then(function (response) {
        // handle success
        console.log(response.data);
        setDietaryRestrictions(response.data.dietaryRestrictions);
        setAllergies(response.data.allergies);
        setBoth(response.data.both);
        setNone(response.data.none);
        setAllergyCounts(response.data.allergyCounts);
        setDietaryRestrictionCounts(response.data.dietaryRestrictionCounts);
      })
      .catch(function (error) {
        // handle error
        console.log(error);
      });

    api.get('/stats/merch-item/0')
      .then((response) => {
        setEligiblePrize(response.data.count);
      })
      .catch((error) => {
        console.log(error);
        showToast('Failed to fetch eligible prize stats');
      });
        
  };

  const handleEventAttendanceChange = async (valueAsString: string) => {
    // setEventAttendance(parseInt(valueAsString));
    const numEvents = parseInt(valueAsString, 10);

    console.log("events num: ", numEvents);
    setInputEventAttendance(parseInt(valueAsString));

    api.get("/stats/attendance/" + numEvents)
      .then(function (response) {
        console.log(response.data.attendanceCounts);
        let sum = 0;

        // Sum the first numEvents elements
        for (let i = 0; i < Math.min(numEvents, response.data.attendanceCounts.length); i++) {
          if (typeof response.data.attendanceCounts[i] === 'number') {
            sum += response.data.attendanceCounts[i];
          }
        }
    
        setEventAttendance(sum);
      })
      .catch(function (error) {
        console.log(error);
        showToast("Failed to fetch priority attendees stats");
      });
  };

  const handleEligiblePrizeChange = async (valueAsString: string) => {
    const price = parseInt(valueAsString);
    console.log("PRICE: ", price);
    setInputEligiblePrize(parseInt(valueAsString));

    api.get("/stats/merch-item/" + price)
      .then(function (response) {
        console.log(response.data.count);
        setEligiblePrize(response.data.count);
      })
      .catch(function (error) {
        console.log(error);
        showToast("Failed to fetch priority attendees stats");
      });
  };

  React.useEffect(() => {
    getStats();
  }, []);

  // const data = {
  //   allergies: 60,
  //   allergyCounts: { "Peanuts": 30, "Dairy": 17, "Gluten": 13 },
  //   both: 35,
  //   dietaryRestrictionCounts: { "Vegetarian": 382, "Vegan": 99 },
  //   dietaryRestrictions: 481,
  //   none: 213
  // };



  // const SummaryStats = ({ data }: { data: { allergies: number, dietaryRestrictions: number, both: number, none: number } }) => (
  const SummaryStats = () => (
    <StatGroup>
      <Stat>
        <StatLabel>Allergies</StatLabel>
        <StatNumber>{allergies}</StatNumber>
      </Stat>
      <Stat>
        <StatLabel>Dietary Restrictions</StatLabel>
        <StatNumber>{dietaryRestrictions}</StatNumber>
      </Stat>
      <Stat>
        <StatLabel>Both</StatLabel>
        <StatNumber>{both}</StatNumber>
      </Stat>
      <Stat>
        <StatLabel>None</StatLabel>
        <StatNumber>{none}</StatNumber>
      </Stat>
    </StatGroup>
  );

  const AllergiesChart = ({ data }: { data: { allergyCounts: { [key: string]: number } } }) => {
    const chartData = {
      labels: Object.keys(data.allergyCounts),
      datasets: [{
        label: 'Allergies',
        data: Object.values(data.allergyCounts),
        backgroundColor: 'rgba(75, 192, 192, 0.6)',
      }]
    };
        
    return <Bar data={chartData} />;
  };
      
  const DietaryRestrictionsChart = ({ data }: { data: { dietaryRestrictionCounts: { [key: string]: number } } }) => {
    const chartData = {
      labels: Object.keys(data.dietaryRestrictionCounts),
      datasets: [{
        label: 'Dietary Restrictions',
        data: Object.values(data.dietaryRestrictionCounts),
        backgroundColor: 'rgba(153, 102, 255, 0.6)',
      }]
    };
        
    return <Bar data={chartData} />;
  };


  return (
    <Box flex="1" p={4} >
      <Heading size="lg">Stats</Heading>
      <br />
      <StatGroup>
        <Card m={5} minWidth='40%'>
          <CardBody>
            <Stat>
              <StatLabel>Number Checked-In</StatLabel>
              <StatNumber>{checkInStats}</StatNumber>
              <StatHelpText>
                {/* <StatArrow type='increase' />
                            23.36% */}
              </StatHelpText>
            </Stat>
          </CardBody>
        </Card>
        <Card m={5} minWidth='40%'>
          <CardBody>
            <Stat>
              <StatLabel>Priority Attendees</StatLabel>
              <StatNumber>{priorityAttendees}</StatNumber>
              <StatHelpText>
                {/* <StatArrow type='decrease' />
                            9.05% */}
              </StatHelpText>
            </Stat>
          </CardBody>
        </Card>
        <Card m={5} minWidth='40%'>
          <CardBody>
            <Stat>
              <StatLabel display="flex" alignItems="center">
                            Past Event Attendance: 
                <NumberInput 
                  size="sm"
                  maxW="100px"
                  ml="4"
                  value={inputEventAttendance}
                  onChange={handleEventAttendanceChange}
                  min={0}
                >
                  <NumberInputField />
                  <NumberInputStepper>
                    <NumberIncrementStepper />
                    <NumberDecrementStepper />
                  </NumberInputStepper>
                </NumberInput>
              </StatLabel>
              <StatNumber>{eventAttendance}</StatNumber>
              <StatHelpText>
                {/* Add any additional info or icons here */}
              </StatHelpText>
            </Stat>
          </CardBody>
        </Card>

        <Card m={5} minWidth='40%'>
          <CardBody>
            <Stat>
              <StatLabel display="flex" alignItems="center">
                            Eligible for Prizes $
                <NumberInput 
                  size="sm"
                  maxW="100px"
                  ml="4"
                  value={inputEligiblePrize}
                  onChange={handleEligiblePrizeChange}
                  min={0}
                >
                  <NumberInputField />
                  <NumberInputStepper>
                    <NumberIncrementStepper />
                    <NumberDecrementStepper />
                  </NumberInputStepper>
                </NumberInput>
              </StatLabel>
              <StatNumber>{eligiblePrize}</StatNumber>
              <StatHelpText>
                {/* Add any additional info or icons here */}
              </StatHelpText>
            </Stat>
          </CardBody>
        </Card>
        <Card m={5} minWidth='90%'>
          <CardHeader>
            <b>Dietary Restrictions</b>
          </CardHeader>
          <SummaryStats/>
          {/* <StatGroup>
            <Card m={5} minWidth='40%'>
              <CardBody>
                <Stat>
                  <StatLabel>Allergy Breakdown</StatLabel>
                  <AllergiesChart data={data} />
                </Stat>
              </CardBody>
            </Card>
            <Card m={5} minWidth='40%'>
              <CardBody>
                <Stat>
                  <StatLabel>Dietary Restrictions Breakdown</StatLabel>
                  <DietaryRestrictionsChart data={data} />
                </Stat>
              </CardBody>
            </Card>
          </StatGroup> */}

          <Box mb={4}>
            <Heading size='md' mb={2} minWidth='40%'>Allergy Breakdown</Heading>
            <AllergiesChart data={{allergyCounts}} />
          </Box>

          <Box>
            <Heading size='md' mb={2} minWidth='40%'>Dietary Restrictions Breakdown</Heading>
            <DietaryRestrictionsChart data={{dietaryRestrictionCounts}} />
          </Box>
        </Card>
      </StatGroup>
    </Box>
  );
}

export default Stats;