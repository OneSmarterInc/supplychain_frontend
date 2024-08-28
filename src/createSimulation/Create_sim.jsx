import React, { useContext, useState, useEffect } from "react";
import {
  Box,
  Button,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Text,
} from "@chakra-ui/react";
import MyContext from "../Components/ContextApi/MyContext";
import { useNavigate } from "react-router";

const Create_sim = ({ setNoOfQuarters, setSimulationDataFromSteps }) => {
  const navigate = useNavigate();
  const { api } = useContext(MyContext);
  const [selectedFirmIndex, setSelectedFirmIndex] = useState(null);

  let user = JSON.parse(localStorage.getItem("user"));

  const [simulationData, setSimulationData] = useState({
    course: "Test Simulation",
    orgnization: "Wright state",
    total_quarters: 0,
    firms: 0,
    admin_id: user?.userid,
    firm_data: [],
    start_date: getCurrentDate(),
    end_date: "", // Do not initialize as current date
    decision_open: "01:59:00",
    decision_close: "01:59:00",
  });

  useEffect(() => {
    if (simulationData.start_date && simulationData.total_quarters) {
      setSimulationData((prev) => ({
        ...prev,
        end_date: calculateEndDate(prev.start_date, prev.total_quarters),
      }));
    }
  }, [simulationData.start_date, simulationData.total_quarters]);

  function getCurrentDate() {
    const today = new Date();
    const year = today.getFullYear();
    let month = (today.getMonth() + 1).toString().padStart(2, "0");
    let day = today.getDate().toString().padStart(2, "0");
    return `${year}-${month}-${day}`;
  }

  function calculateEndDate(startDate, quarters) {
    const startDateObj = new Date(startDate);
    startDateObj.setDate(startDateObj.getDate() + quarters * 4);
    return startDateObj.toISOString().split("T")[0];
  }

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
      const newfirm_data = new Array(numberOfFirms).fill().map(() => ({
        firmName: "",
        emails: [],
        users: [],
      }));
      setSimulationData((prev) => ({ ...prev, firm_data: newfirm_data }));
    }
  };

  const handlefirm_dataChange = (index, field, value) => {
    const updatedfirm_data = [...simulationData.firm_data];
    updatedfirm_data[index][field] = value;
    setSimulationData((prev) => ({ ...prev, firm_data: updatedfirm_data }));
  };

  const handleAddEmail = (index) => {
    const updatedfirm_data = [...simulationData.firm_data];
    updatedfirm_data[index].emails.push(updatedfirm_data[index].email);
    updatedfirm_data[index].email = ""; // Clear the email input
    setSimulationData((prev) => ({ ...prev, firm_data: updatedfirm_data }));
  };

  const handleRemoveEmail = (firmIndex, emailIndex) => {
    setSimulationData((prev) => {
      const newFirmData = [...prev.firm_data];
      newFirmData[firmIndex].emails.splice(emailIndex, 1);
      return { ...prev, firm_data: newFirmData };
    });
  };

  setSimulationDataFromSteps(simulationData);

  const handleNext = async () => {
    setNoOfQuarters(simulationData.total_quarters);
    localStorage.setItem("noOfQuarters", [simulationData.total_quarters]);
    localStorage.setItem("createSimData", JSON.stringify(simulationData));
    if (simulationData.total_quarters) {
      navigate("/flexee/admin-center/super/createsim?step=2");
    }
  };

  const generateSimulationName = (user) => {
    const university = user?.university?.split(" ")[0];
    const firstNameInitial = user.first_name ? user.first_name.charAt(0) : "";
    const lastNameInitial = user.last_name ? user.last_name.charAt(0) : "";
    const course = user?.course;

    const simulationName = `${university}-${firstNameInitial}${lastNameInitial}-${course}`;
    return simulationName;
  };

  const simulationName = generateSimulationName(user);

  return (
    <>
      <Text width="50%" m="auto" fontSize={20} fontWeight="bold" mt={5}>
        Create New Simulation
      </Text>
      <Box
        width="50%"
        h="auto"
        border="1px solid black"
        m="auto"
        p={5}
        bgColor="gray.200"
        mt={5}
      >
        <label htmlFor="">
          <strong>Please specify the Name for {simulationName ? simulationName : "Simulation"}</strong>
        </label>
        <Input
          name="name"
          bgColor="white"
          mt={5}
          mb={10}
          placeholder={simulationName ? simulationName : "Simulation"}
          defaultValue={simulationName}
          onChange={handleInputChange}
        />

        <label htmlFor="">
          <strong>Please specify the Name for the organization</strong>
        </label>
        <Input
          name="orgnization"
          bgColor="white"
          mt={5}
          mb={10}
          placeholder="Organization"
          value={simulationData.orgnization}
          onChange={handleInputChange}
        />

        <label htmlFor="">
          <strong>
            Please specify the number of quarters you would like to include in the simulation.
          </strong>
        </label>
        <Input
          name="total_quarters"
          bgColor="white"
          mt={5}
          mb={10}
          placeholder="Number of Quarters"
          onChange={handleInputChange}
          required={true}
        />
        <label htmlFor="">
          <strong>
            Please specify the number of firms you would like to include in the simulation.
          </strong>
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
              <Box>
                <label htmlFor="">
                  <strong>Enter firm name</strong>
                </label>
                <Input
                  name={`firmName-${index}`}
                  bgColor="white"
                  placeholder={`Firm ${index + 1} Name`}
                  value={firm.firmName}
                  onChange={(e) =>
                    handlefirm_dataChange(index, "firmName", e.target.value)
                  }
                />
              </Box>
              <Box>
                <label htmlFor="">
                  <strong>Enter email of participant</strong>
                </label>
                <Box display="flex" gap={3}>
                  <Input
                    name={`email-${index}`}
                    bgColor="white"
                    placeholder={`Firm ${index + 1} Email`}
                    value={firm.email}
                    onChange={(e) =>
                      handlefirm_dataChange(index, "email", e.target.value)
                    }
                  />
                  <Button
                    onClick={() => handleAddEmail(index)}
                    bgColor="#72EB6F "
                  >
                    Add
                  </Button>
                </Box>
              </Box>
            </Box>
          ))}
          {simulationData.firm_data.map((firm, index) => (
            <Button key={index} onClick={() => setSelectedFirmIndex(index)}>
              View Emails for {firm.firmName || `Firm ${index + 1}`}
            </Button>
          ))}

          {selectedFirmIndex !== null && (
            <Modal
              isOpen={selectedFirmIndex !== null}
              onClose={() => setSelectedFirmIndex(null)}
            >
              <ModalOverlay />
              <ModalContent>
                <ModalHeader>
                  Emails for{" "}
                  {simulationData.firm_data[selectedFirmIndex].firmName ||
                    `Firm ${selectedFirmIndex + 1}`}
                </ModalHeader>
                <ModalCloseButton />
                <ModalBody>
                  {simulationData.firm_data[selectedFirmIndex].emails.map(
                    (email, emailIndex) => (
                      <Box
                        key={emailIndex}
                        display="flex"
                        justifyContent="space-between"
                        alignItems="center"
                      >
                        {email}
                        <Button
                          onClick={() =>
                            handleRemoveEmail(selectedFirmIndex, emailIndex)
                          }
                        >
                          X
                        </Button>
                      </Box>
                    )
                  )}
                </ModalBody>
                <ModalFooter>
                  <Button
                    colorScheme="blue"
                    mr={3}
                    onClick={() => setSelectedFirmIndex(null)}
                  >
                    Close
                  </Button>
                </ModalFooter>
              </ModalContent>
            </Modal>
          )}
        </Box>

        <Box mb={10}>
          <label htmlFor="">
            <strong>
              Please specify the Start Date - Time and End Date - Time for simulation.
            </strong>
          </label>
          <Box display="flex" gap={3}>
            <Input
              name="start_date"
              type="date"
              bgColor="white"
              mt={5}
              placeholder="Start Date - Time"
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
              placeholder="End Date - Time"
              value={simulationData.end_date}
              min={simulationData.start_date}
              onChange={handleInputChange}
            />
          </Box>
        </Box>

        <label htmlFor="">
          <strong>
            Specify the start and end times for decisions in the simulation. Decisions will be active during this timeframe each day and inaccessible outside these hours. For example, if the start time is 1 PM and the end time is 5 PM, decisions will be accessible between 1 PM and 5 PM daily.
          </strong>
        </label>
        <Box display="flex" gap={3}>
          <Input
            name="decision_open"
            type="time"
            placeholder="HH:MM:SS"
            title="Time format should be HH:MM:SS"
            bgColor="white"
            mt={5}
            onChange={handleInputChange}
            required
          />
          <Input
            type="time"
            placeholder="HH:MM:SS"
            title="Time format should be HH:MM:SS"
            name="decision_close"
            bgColor="white"
            mt={5}
            onChange={handleInputChange}
          />
        </Box>

        <Box
          display="flex"
          justifyContent="space-between"
          alignItems="center"
          mt={10}
        >
          <Text fontWeight="bold">
            After clicking Create, all assigned members will receive an email
            with an access link, so they can start working on the assigned
            simulation.
          </Text>
          <button
            onClick={handleNext}
            className="w-28 h-10 py-2 px-4 mx-2 rounded-lg text-center text-xl bg-green-500 hover:bg-green-700 text-white "
          >
            Next
          </button>
        </Box>
      </Box>
    </>
  );
};

export default Create_sim;