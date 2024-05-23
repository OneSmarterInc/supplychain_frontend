import React, { useState } from "react";
import { Stepper, Step, Typography, Button } from "@material-tailwind/react";
import { useLocation, useNavigate } from "react-router-dom";
import Create_sim from "./Create_sim";
import QuarterDetails from "./QuarterDetails";
import { Box, Text, Flex, useToast } from "@chakra-ui/react";

export default function Steps({ setNoOfQuarters }) {
  const noOfQuarters = localStorage.getItem("noOfQuarters")
  const toast = useToast();
  const location = useLocation();
  const navigate = useNavigate();
  const [activeStep, setActiveStep] = React.useState(0);
  const [isLastStep, setIsLastStep] = React.useState(false);
  const [isFirstStep, setIsFirstStep] = React.useState(false);
  const [simulationData, SetSimulationData] = useState();
  const searchParams = new URLSearchParams(location.search);
  const steps = parseInt(searchParams.get("step") || "1", 10);
  React.useEffect(() => {
    setActiveStep(steps - 1);
    setIsFirstStep(steps === 1);
    setIsLastStep(steps === 5);
  }, [location.search]);

  const handleNext = () => {
    if (!isLastStep) {
      setActiveStep((prevStep) => prevStep + 1);
      setSteps(activeStep + 2);
    }
  };

  const handlePrev = () => {
    if (!isFirstStep) {
      setActiveStep((prevStep) => prevStep - 1);
      setSteps(activeStep);
    }
  };

  const setSteps = (step) => {
    if (noOfQuarters) {
      navigate(`?step=${step}`);
    }
  };

  const HandleAdmin = () => {
    const address = "http://localhost:3000/createsim?step=3";
    window.location.href = `http://localhost:5173/?address=${address}`;
  };

  const HandleCreateSimulation = () => {
    toast({
      title: "Simulation Created successful",
      status: "success",
      duration: 2000,
      isClosable: true,
      position: "top",
    });

    navigate("/usersidelive");
  };
  localStorage.setItem("simulationData", simulationData)

  return (
    <>
      <div className="w-full sm:px-24 px-6 text-wrap py-4">
        <Stepper
          activeStep={activeStep}
          lineClassName="bg-green-200/50"
          activeLineClassName="bg-green-800"
        >
          <Step
            activeClassName=" !bg-red-300 "
            completedClassName="!bg-green-400 text-white"
            onClick={() => setSteps(1)}
            className="font-semibold cursor-pointer"
          >
            {" "}
            <p>1</p>
            <div className="absolute -bottom-[2rem]  w-max-24 mx-1 text-center">
              <Typography
                color={activeStep === 0 ? "blue-gray" : "gray"}
                className="font-normal w-24"
              >
                Step 1
              </Typography>
            </div>
          </Step>
          <Step
            activeClassName=" !bg-orange-300 "
            completedClassName="!bg-green-400 text-white"
            onClick={() => setSteps(2)}
            className="font-semibold cursor-pointer"
          >
            <p>2</p>
            <div className="absolute -bottom-[2rem] mx-1 w-max-20 text-center">
              <Typography
                color={activeStep === 1 ? "blue-gray" : "gray"}
                className={`font-normal  w-24`}
              >
                Step 2
              </Typography>
            </div>
          </Step>
          <Step
            activeClassName=" !bg-blue-300 "
            completedClassName="!bg-green-400 text-white"
            onClick={() => setSteps(3)}
            className="font-semibold cursor-pointer"
          >
            <p>3</p>
            <div className="absolute -bottom-[2rem] mx-1 w-max-24 text-center">
              <Typography
                color={activeStep === 2 ? "blue-gray" : "gray"}
                className="font-normal w-24"
              >
                Step 3
              </Typography>
            </div>
          </Step>
        </Stepper>
        <div className="mt-20 flex justify-between">
          {/* <Button onClick={handlePrev} disabled={isFirstStep}>
            Prev
          </Button>
          <Button onClick={handleNext} disabled={isLastStep}>
            Next
          </Button> */}
        </div>
      </div>
      <div className="component">
        {steps === 1 && (
          <Create_sim
            setNoOfQuarters={setNoOfQuarters}
            setSimulationDataFromSteps={SetSimulationData}
          />
        )}
        {steps === 2 && noOfQuarters && (
          <QuarterDetails
            noOfQuarters={noOfQuarters}
            simulationData={simulationData}
          />
        )}

        {steps === 3 && (
          <>
            <Flex h="50vh" justify="center" align="center">
              <Box alignContent={"center"} flex={"column"}>
                <Text>Edit Rules and Default values of First Quarter </Text>
                <Button
                  alignContent={"center"}
                  flex={"column"}
                  onClick={HandleAdmin}
                >
                  Edit
                </Button>
              </Box>
            </Flex>

            <Flex h="10vh" justify="center" align="center">
              <Box alignContent={"center"} flex={"column"}>
                <Button color="green" onClick={HandleCreateSimulation}>
                  Create Simulation{" "}
                </Button>
              </Box>
            </Flex>
          </>
        )}
      </div>
    </>
  );
}
