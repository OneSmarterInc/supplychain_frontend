import React, { useContext, useState } from "react";
import axios from "axios";
import homeimg from "../assets/img.png";
import { useLocation, useNavigate } from "react-router-dom";
import {
  Box,
  Button,
  Heading,
  Image,
  Input,
  Flex,
  Text,
} from "@chakra-ui/react";
import logo from "../assets/favicon.png";
import MyContext from "../Components/ContextApi/MyContext";

const Home = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { api } = useContext(MyContext);
  const userData = JSON.parse(localStorage.getItem("user"));
  const [passcode, setPasscode] = useState("");

  const handleJoin = async () => {
    if (userData?.email && passcode) {
      try {
        const response = await axios.get(`${api}/passcode/`, {
          params: {
            passcode: passcode,
            email: userData.email,
          },
        });
        console.log(response.data);
        // Handle successful response, e.g., navigate to another page
        navigate("/usersidelive");
      } catch (error) {
        console.error("Error fetching data:", error);
        // Handle error, e.g., show error message to the user
      }
    } else {
      // Handle missing email or passcode
      console.error("Email or passcode is missing");
    }
  };

  return (
    <>
      <Flex height="100vh">
        {/* Left side with image */}
        <Box
          flex="1"
          backgroundImage={`url(${homeimg})`}
          backgroundRepeat="no-repeat"
          backgroundSize="cover"
        />

        {/* Right side with text and buttons */}
        <Flex
          flex="1"
          flexDirection="column"
          alignItems="center"
          justifyContent="center"
          background="#2F4F4F"
          color="white"
          p={8}
          position="relative"
        >
          <Button
            position="absolute"
            top="1rem"
            right="1rem"
            onClick={() => navigate("/signin")}
            _hover={{ backgroundColor: ".gray.200" }}
            _focus={{ boxShadow: "none" }}
            bg="transparent"
            border="none"
            color={"black"}
            bgColor={"white"}
          >
            {userData?.email ? "Go to Home" : "Sign In"}
          </Button>
          <Image src={logo} boxSize="100px" mb={8} />
          <Heading textAlign={"center"} mb={6}>
            Welcome to Supply Chain Simulation
          </Heading>
        </Flex>
      </Flex>
    </>
  );
};

export default Home;
