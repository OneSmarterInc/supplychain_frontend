import React, { useState, useEffect, useContext } from 'react';

import {
  Flex,
  Heading,
  Input,
  Button,
  Stack,
  Box,
  Avatar,
  FormControl,
  HStack,
  Text,
  useToast,
} from "@chakra-ui/react";
import axios from "axios";

import maleProfile from "../assets/male.jpeg";  // Replace with the actual path to male profile image
import femaleProfile from "../assets/female.webp";  // Replace with the actual path to female profile image
import { useNavigate } from "react-router-dom";  // React Router hook for navigation (replace if not using React Router)
import MyContext from '../Components/ContextApi/MyContext';



const AdminSignup = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [university, setUniversity] = useState("");
    const [course, setCourse] = useState("");
    const [department, setDepartment] = useState("");
    const [profileImage, setProfileImage] = useState(null);
    const [selectedDefaultImage, setSelectedDefaultImage] = useState(null);
    const [showPassword, setShowPassword] = useState(false);
  
    const { api } = useContext(MyContext);
    const toast = useToast();
  
    const handleShowClick = () => setShowPassword(!showPassword);
  
    const handleDefaultImageSelect = (image) => {
      setSelectedDefaultImage(image);
      setProfileImage(null);
    };
  
    const signupHandler = async (e) => {
      e.preventDefault();
  
      // Basic validation logic (you can reuse your existing validation)
  
      const formData = new FormData();
  
      // Append other form fields
      formData.append("email", email);
      formData.append("password", password);
      formData.append("first_name", firstName);
      formData.append("last_name", lastName);
      formData.append("university", university);
      formData.append("course", course);
      formData.append("department", department);
      formData.append("is_admin", true);  // Flag the user as an admin
  
      // Append the profile image (either the selected file or default image)
      if (profileImage) {
        formData.append("image", profileImage);
      } else if (selectedDefaultImage) {
        const response = await fetch(selectedDefaultImage);
        const blob = await response.blob();
        formData.append("image", blob, selectedDefaultImage.split('/').pop());
      }
  
      try {
        const response = await axios.post(`${api}/users/createuser/`, formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        });
  
        if (response.status === 201) {
          toast({
            title: "Admin Account Created Successfully",
            description: "The new admin can now sign in.",
            status: "success",
            duration: 9000,
            isClosable: true,
            position: "top",
          });
        } else {
          toast({
            title: "Signup failed",
            description: "There was a problem creating the admin account. Please try again.",
            status: "error",
            duration: 9000,
            isClosable: true,
            position: "top",
          });
        }
      } catch (error) {
        console.error("Error:", error.message);
        toast({
          title: "Error",
          description: "An unexpected error occurred. Please try again later.",
          status: "error",
          duration: 9000,
          isClosable: true,
          position: "top",
        });
      }
    };
  
    return (
      <Flex justifyContent="center" alignItems="center" >
        <Box>
          <Flex
            flexDirection="column"
            justifyContent="center"
            alignItems="center"
            p={6}
            bg="white"
            rounded="md"
            shadow="md"
          >
            <Text color="black">Create New Faculty</Text>
  
            {/* Profile Image Selection */}
            <Box mb={4} textAlign="center">
              <Text fontWeight="600">Choose Profile Image</Text>
              <HStack mt={2} spacing={4} justify="center">
                <Avatar
                  src={maleProfile}
                  onClick={() => handleDefaultImageSelect(maleProfile)}
                  cursor="pointer"
                  border={selectedDefaultImage === maleProfile ? "2px solid blue" : "none"}
                />
                <Avatar
                  src={femaleProfile}
                  onClick={() => handleDefaultImageSelect(femaleProfile)}
                  cursor="pointer"
                  border={selectedDefaultImage === femaleProfile ? "2px solid blue" : "none"}
                />
              </HStack>
            </Box>
  
            <Box minW={{ base: "90%", md: "80%" }}>
              <form onSubmit={signupHandler}>
                <Stack spacing={4}>
                  <FormControl isRequired>
                    <Input
                      type="email"
                      placeholder="Email Address"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                    />
                  </FormControl>
  
                  <FormControl isRequired>
                    <Input
                      type={showPassword ? "text" : "password"}
                      placeholder="Password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                    />
                    <Button onClick={handleShowClick}>
                      {showPassword ? "Hide" : "Show"}
                    </Button>
                  </FormControl>
  
                  <FormControl isRequired>
                    <Input
                      type="text"
                      placeholder="First Name"
                      value={firstName}
                      onChange={(e) => setFirstName(e.target.value)}
                    />
                  </FormControl>
  
                  <FormControl isRequired>
                    <Input
                      type="text"
                      placeholder="Last Name"
                      value={lastName}
                      onChange={(e) => setLastName(e.target.value)}
                    />
                  </FormControl>
  
                  <FormControl isRequired>
                    <Input
                      type="text"
                      placeholder="University"
                      value={university}
                      onChange={(e) => setUniversity(e.target.value)}
                    />
                  </FormControl>
  
                  <FormControl isRequired>
                    <Input
                      type="text"
                      placeholder="Course"
                      value={course}
                      onChange={(e) => setCourse(e.target.value)}
                    />
                  </FormControl>
  
                  <FormControl isRequired>
                    <Input
                      type="text"
                      placeholder="Department"
                      value={department}
                      onChange={(e) => setDepartment(e.target.value)}
                    />
                  </FormControl>
  
                  <Button
                    borderRadius={0}
                    type="submit"
                    variant="solid"
                    colorScheme="blue"
                    width="full"
                  >
                    Register Faculty
                  </Button>
                </Stack>
              </form>
            </Box>
          </Flex>
        </Box>
      </Flex>
    );
  };
  
  export default AdminSignup;