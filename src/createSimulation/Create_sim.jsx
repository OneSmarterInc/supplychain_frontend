import React, { useContext, useState, useEffect } from "react";
import {
  Box,
  Button,
  Input,
  Text,
} from "@chakra-ui/react";
import MyContext from "../Components/ContextApi/MyContext";
import { useNavigate } from "react-router-dom";

const CreateSim = ({ setNoOfQuarters, setSimulationDataFromSteps }) => {
  const navigate = useNavigate();
  const { api } = useContext(MyContext);
  const [selectedFirmIndex, setSelectedFirmIndex] = useState(null);

  let user = JSON.parse(localStorage.getItem("user"));

  // Initial state for simulation data
  const [simulationData, setSimulationData] = useState({
    course: "Test Simulation",
    organization: "Wright State",
    total_quarters: 0,
    firms: 0,
    admin_id: user?.userid,
    firm_data: [],
    start_date: getCurrentDate(),
    end_date: "", 
    decision_open: "01:59:00", // You can modify default time if needed
    decision_close: getCurrentTime(), // Set current time as default
  });

  useEffect(() => {
    if (simulationData.start_date && simulationData.total_quarters) {
      setSimulationData((prev) => ({
        ...prev,
        end_date: calculateEndDate(prev.start_date, prev.total_quarters),
      }));
    }
  }, [simulationData.start_date, simulationData.total_quarters]);

  // Utility to get the current date in YYYY-MM-DD format
  function getCurrentDate() {
    const today = new Date();
    const year = today.getFullYear();
    let month = (today.getMonth() + 1).toString().padStart(2, "0");
    let day = today.getDate().toString().padStart(2, "0");
    return `${year}-${month}-${day}`;
  }

  // Utility to get the current time in HH:MM:SS format
  function getCurrentTime() {
    const now = new Date();
    return now.toTimeString().split(" ")[0]; // HH:MM:SS format
  }

  // Calculate end date based on the start date and total number of quarters
  function calculateEndDate(startDate, quarters) {
    const startDateObj = new Date(startDate);
    startDateObj.setDate(startDateObj.getDate() + quarters * 4);
    return startDateObj.toISOString().split("T")[0];
  }

  // Handle changes in input fields
  const handleInputChange = (e) => {
    const { name, value } = e.target;

    if (name === "start_date") {
      const currentDate = getCurrentDate();
      if (value < currentDate) {
        setSimulationData((prev) => ({ ...prev, start_date: currentDate }));
        return;
      }
    }

    setSimulationData((prev) => ({
      ...prev,
      [name]: name === "firms" ? Math.max(0, parseInt(value, 10) || 0) : value,
    }));

    if (name === "firms") {
      const numberOfFirms = Math.max(0, parseInt(value, 10) || 0);
      const newFirmData = new Array(numberOfFirms).fill().map((_, index) => ({
        firmName: `Team ${String(index + 1).padStart(2, "0")}`,
        emails: [],
        users: [],
      }));
      setSimulationData((prev) => ({ ...prev, firm_data: newFirmData }));
    }
  };


  useEffect(() => {
    setSimulationDataFromSteps(simulationData);
  }, [simulationData, setSimulationDataFromSteps]);

  // Handle the next step
  const handleNext = async () => {
    setNoOfQuarters(simulationData.total_quarters);
    localStorage.setItem("noOfQuarters", simulationData.total_quarters);
    localStorage.setItem("createSimData", JSON.stringify(simulationData));
    if (simulationData.total_quarters) {
      navigate("/createsim?step=2");
    }
  };

  // Generate simulation name based on the user data
  const generateSimulationName = (user) => {
    const university = user?.university?.split(" ")[0];
    const firstNameInitial = user?.first_name?.charAt(0) || "";
    const lastNameInitial = user?.last_name?.charAt(0) || "";
    const course = user?.course;

    return `${university}-${firstNameInitial}${lastNameInitial}-${course}`;
  };

  return (
    <>
      <Text width="50%" m="auto" fontSize={20} fontWeight="bold" mt={5}>
        Create New Simulation
      </Text>
      <Box
        width="50%"
        border="1px solid black"
        m="auto"
        p={5}
        bgColor="gray.200"
        mt={5}
      >
        <label>
          <strong>Please specify the Name for Simulation</strong>
        </label>
        <Input
          name="course"
          bgColor="white"
          mt={5}
          mb={10}
          placeholder="Enter Simulation Name"
          value={simulationData.course}
          onChange={handleInputChange}
        />

        <label>
          <strong>Please specify the Name for the organization</strong>
        </label>
        <Input
          name="organization"
          bgColor="white"
          mt={5}
          mb={10}
          placeholder="Organization"
          value={simulationData.organization}
          onChange={handleInputChange}
        />

        <label>
          <strong>Specify the number of quarters</strong>
        </label>
        <Input
          name="total_quarters"
          bgColor="white"
          mt={5}
          mb={10}
          placeholder="Number of Quarters"
          onChange={handleInputChange}
          required
        />

        <label>
          <strong>Specify the number of firms</strong>
        </label>
        <Input
          name="firms"
          bgColor="white"
          mt={5}
          mb={10}
          placeholder="Number of Firms"
          type="number"
          onChange={handleInputChange}
        />

        <Box border="1px solid black" p={5} mb={10} borderRadius={5}>
          {simulationData.firm_data.map((firm, index) => (
            <Box key={index} display="flex" gap={3} mb={10}>
              <Text>{firm.firmName}</Text>
            </Box>
          ))}
        </Box>

        <Box mb={10}>
          <label>
            <strong>Specify the Start Date and End Date</strong>
          </label>
          <Box display="flex" gap={3}>
            <Input
              name="start_date"
              type="date"
              bgColor="white"
              mt={5}
              value={simulationData.start_date}
              onChange={handleInputChange}
              min={getCurrentDate()}
              required
            />
            <Input
              name="end_date"
              type="date"
              bgColor="white"
              mt={5}
              value={simulationData.end_date}
              min={simulationData.start_date}
              onChange={handleInputChange}
            />
          </Box>
        </Box>

        <label>
          <strong>Specify the start and end times for decisions</strong>
        </label>
        <Box display="flex" gap={3}>
          <Input
            name="decision_open"
            type="time"
            bgColor="white"
            mt={5}
            value={simulationData.decision_open}
            onChange={handleInputChange}
            required
          />
          <Input
            name="decision_close"
            type="time"
            bgColor="white"
            mt={5}
            value={simulationData.decision_close}
            onChange={handleInputChange}
          />
        </Box>

        <Box display="flex" justifyContent="space-between" alignItems="center" mt={10}>
          <Button onClick={handleNext} colorScheme="green">
            Next
          </Button>
        </Box>
      </Box>
    </>
  );
};

export default CreateSim;