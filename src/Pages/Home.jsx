import React, { useContext, useState } from "react";
import axios from "axios";
import homeimg from "../assets/img.png";
import { useNavigate } from "react-router-dom";
import { Box, Button, Heading, Image, Input, Flex, Text } from "@chakra-ui/react";
import UserNavBar from "../Components/UserNavBar";
import AdminNavBar from "../Components/AdminNavBar";
import logo from "../assets/favicon.png";
import MyContext from "../Components/ContextApi/MyContext";


const Home = () => {
  const navigate = useNavigate();
  const { api } = useContext(MyContext);
  const userData = JSON.parse(localStorage.getItem("user"));
  const [passcode, setPasscode] = useState("");

  const handleJoin = async () => {
    if (userData?.email && passcode) {
      try {
        const response = await axios.get(`${api}/passcode/`, {
          params: {
            passcode: passcode,
            email: userData.email
          }
        });
        console.log(response.data);
        // Handle successful response, e.g., navigate to another page
        navigate('/usersidelive');
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
          background="black"
          color="white"
          p={8}
          position="relative"
        >
          <Button
            position="absolute"
            top="1rem"
            right="1rem"
            onClick={() => { userData?.isadmin ? navigate('adminsidelive') : navigate('usersidelive') }}
            _hover={{ backgroundColor: "grey" }}
            _focus={{ boxShadow: "none" }}
            bg="transparent"
            border="none"
            color={'white'}
          >
            Go to Live
          </Button>
          <Image src={logo} boxSize="100px" mb={8} />
          <Heading mb={6}>Welcome to Supply Chain Simulation</Heading>
          <Box display="flex" gap={4} flexDirection="column" width="100%" maxW="400px">
            {userData?.isadmin && (
              <Button
                onClick={() => navigate("/createsim")}
                colorScheme="blue"
                size="lg"
                mb={4}
              >
                Create New
              </Button>
            )}
            
            <hr />
            <Text mb={2} m={"auto"}>Enter your passcode to join the simulation</Text>
            
            <Input 
              placeholder="Passcode" 
              mb={4} 
              value={passcode} 
              onChange={(e) => setPasscode(e.target.value)} 
            />

            <Button 
              colorScheme="green" 
              size="lg" 
              mb={"1rem"} 
              onClick={handleJoin}
            >
              Join
            </Button>
          </Box>
        </Flex>
      </Flex>
    </>
  );
};

export default Home;
