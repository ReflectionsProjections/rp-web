import {
  Box,
  StatGroup,
  StatLabel,
  Stat,
  StatNumber,
  StatHelpText,
  StatArrow,
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


import { Config } from "../../config";
import axios from "axios";
import React from 'react';

function Stats() {
  const toast = useToast();

  const [checkInStats, setCheckInStats] = React.useState(0);
  const [priorityAttendees, setPriorityAttendees] = React.useState(0);
  // const [dietaryRestrictions, setDietaryRestrictions] = React.useState(0);
  const [eventAttendance, setEventAttendance] = React.useState(2);
  const [eligiblePrize, setEligiblePrize] = React.useState(15);

  const showToast = (message: string) => {
    toast({
      title: message,
      status: "error",
      duration: 9000,
      isClosable: true,
    });
  }

  const getStats = async () => {

    setCheckInStats(694);
    setPriorityAttendees(120);

    // const jwt = localStorage.getItem("jwt");

    // axios.get(Config.API_BASE_URL + "/stats/check-in/", {
    //   headers: {
    //     Authorization: jwt
    //   }
    // })
    //   .then(function (response) {
    //     // handle success
    //     console.log(response.data.count);
    //     setCheckInStats(response.data.count);
    //   })
    //   .catch(function (error) {
    //     // handle error
    //     console.log(error);
    //     showToast("Failed to fetch check-in stats");
    //   })

    // axios.get(Config.API_BASE_URL + "/stats/priority-attendee/", {
    //   headers: {
    //     Authorization: jwt
    //   }
    // })
    //   .then(function (response) {
    //     // handle success
    //     console.log(response.data.count);
    //     setPriorityAttendees(response.data.count);
    //   })
    //   .catch(function (error) {
    //     // handle error
    //     console.log(error);
    //     showToast("Failed to fetch priority attendees stats");
    //   })

    // axios.get(Config.API_BASE_URL + "/stats/dietary-restrictions/", {
    //     headers: {
    //         Authorization: jwt
    //     }
    //   })
    // .then(function (response) {
    //     // handle success
    //     console.log(response.data);
    //     setDietaryRestrictions(response.data.count);
    //   })
    // .catch(function (error) {
    //     // handle error
    //     console.log(error);
    // })
        
  }

  const handleEventAttendanceChange = (valueAsString: string) => {
    setEventAttendance(parseInt(valueAsString));
  }

  const handleEligiblePrizeChange = (valueAsString: string) => {
    setEligiblePrize(parseInt(valueAsString));
  }

  React.useEffect(() => {
    getStats();
  }, []);

  const data = {
    allergies: 60,
    allergyCounts: { "Peanuts": 30, "Dairy": 17, "Gluten": 13 },
    both: 35,
    dietaryRestrictionCounts: { "Vegetarian": 382, "Vegan": 99 },
    dietaryRestrictions: 481,
    none: 213
  };



  const SummaryStats = ({ data }: { data: { allergies: number, dietaryRestrictions: number, both: number, none: number } }) => (
    <StatGroup>
      <Stat>
        <StatLabel>Allergies</StatLabel>
        <StatNumber>{data.allergies}</StatNumber>
      </Stat>
      <Stat>
        <StatLabel>Dietary Restrictions</StatLabel>
        <StatNumber>{data.dietaryRestrictions}</StatNumber>
      </Stat>
      <Stat>
        <StatLabel>Both</StatLabel>
        <StatNumber>{data.both}</StatNumber>
      </Stat>
      <Stat>
        <StatLabel>None</StatLabel>
        <StatNumber>{data.none}</StatNumber>
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
                  value={eventAttendance}
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
              <StatNumber>{32*eventAttendance}</StatNumber>
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
                  value={eligiblePrize}
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
              <StatNumber>{20-eligiblePrize}</StatNumber>
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
          <SummaryStats data={data} />
          <StatGroup>
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
          </StatGroup>

          {/* <Box mb={4}>
                    <Heading size='md' mb={2}>Allergy Breakdown</Heading>
                    <AllergiesChart data={data} />
                    </Box>

                    <Box>
                    <Heading size='md' mb={2}>Dietary Restrictions Breakdown</Heading>
                    <DietaryRestrictionsChart data={data} />
                    </Box> */}
        </Card>
      </StatGroup>
    </Box>
  )
}

export default Stats;
