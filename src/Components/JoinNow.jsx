import React, { useContext, useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Box, Button, Input, Flex, useToast } from "@chakra-ui/react";
import MyContext from "../Components/ContextApi/MyContext";

const JoinNow = () => {
  const navigate = useNavigate();
  const { api } = useContext(MyContext);
  const userData = JSON.parse(localStorage.getItem("user"));
  const [passcode, setPasscode] = useState("");
  const [showInput, setShowInput] = useState(false);
  const toast = useToast();

  const handleJoinClick = (e) => {
    e.stopPropagation(); // Prevent the click from triggering the click outside handler
    setShowInput(true);
  };

  const handleJoin = async () => {
    if (userData?.email && passcode) {
      try {
        const response = await axios.post(`${api}/subscribe/`, {
          user_id: userData.userid,
          passcode: passcode,
        });
        toast({
          title: "Subscription successful.",
          description: response.data.message || "You have successfully joined.",
          status: "success",
          duration: 5000,
          isClosable: true,
        });
        navigate("/usersidelive");
      } catch (error) {
        toast({
          title: "Subscription failed.",
          description: error.response?.data?.message || "An error occurred while subscribing.",
          status: "error",
          duration: 5000,
          isClosable: true,
        });
        console.error("Error subscribing:", error);
      }
    } else {
      toast({
        title: "Error.",
        description: "Passcode is missing.",
        status: "error",
        duration: 5000,
        isClosable: true,
      });
      console.error("passcode is missing");
    }
  };

  const handleClickOutside = (event) => {
    if (!event.target.closest(".join-now-container")) {
      setShowInput(false);
    }
  };

  useEffect(() => {
    if (showInput) {
      document.addEventListener("click", handleClickOutside);
    } else {
      document.removeEventListener("click", handleClickOutside);
    }
    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, [showInput]);

  return (
    <Flex
      position="relative"
      height="0vh"
      width="100vw"
      justify="center"
      align="center"
      className="join-now-container"
    >
      {showInput && (
        <Input
          placeholder="Enter Passcode"
          mb={4}
          value={passcode}
          onChange={(e) => setPasscode(e.target.value)}
          width="200px"
          position="fixed"
          bottom="7rem"
          right="2rem"
          boxShadow="lg"
          bg="white"
        />
      )}
      {showInput && (
        <Button
          colorScheme="red"
          size="lg"
          mb={"1rem"}
          onClick={handleJoin}
          position="fixed"
          bottom="3rem"
          right="2rem"
          boxShadow="lg"
          _hover={{ bg: "red.500", boxShadow: "xl" }}
          _active={{ bg: "red.600" }}
        >
          Submit Passcode
        </Button>
      )}
      {!showInput && (
        <Button
          colorScheme="red"
          
          onClick={handleJoinClick}
          position="fixed"
          bottom="4rem"
          right="2rem"
          boxShadow="lg"
          _hover={{ bg: "red.500", boxShadow: "xl" }}
          _active={{ bg: "red.600" }}
        >
          Join Now
        </Button>
      )}
    </Flex>
  );
};

export default JoinNow;