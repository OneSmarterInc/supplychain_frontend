import { useContext, useState, useEffect } from "react";
import {
  Flex,
  Heading,
  Input,
  Button,
  InputGroup,
  Stack,
  InputLeftElement,
  chakra,
  Box,
  Avatar,
  FormControl,
  FormHelperText,
  InputRightElement,
  Text,
  useToast,
  HStack,
} from "@chakra-ui/react";
import { FaUserAlt, FaLock } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import MyContext from "./ContextApi/MyContext";
import graphics from '../assets/graphic.png';

import maleProfile from "../assets/male.jpeg";  // Replace with actual path
import femaleProfile from "../assets/female.webp";  // Replace with actual path

const CFaUserAlt = chakra(FaUserAlt);
const CFaLock = chakra(FaLock);

const Signup = () => {
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
  const navigate = useNavigate();
  const toast = useToast();

  // Fetch email from localStorage on component mount
  useEffect(() => {
    const storedEmail = localStorage.getItem("NewUserEmail");
    if (storedEmail) {
      setEmail(storedEmail);
    }
  }, []);

  const handleShowClick = () => setShowPassword(!showPassword);

  const handleDefaultImageSelect = (image) => {
    setSelectedDefaultImage(image);
    setProfileImage(null);
  };
  const signupHandler = async (e) => {
    e.preventDefault();
  
    // Basic email validation regex
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  
    // Password validation regex (at least 6 characters, 1 uppercase, 1 symbol, 1 number)
    const passwordRegex = /^(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,}$/;
  
    // Regex to check for numeric values in first and last name
    const nameRegex = /^[A-Za-z]+$/;
  
    // First and last name validation
    if (firstName.trim() === lastName.trim()) {
      toast({
        title: "Validation Error",
        description: "First name and last name cannot be the same.",
        status: "error",
        duration: 9000,
        isClosable: true,
        position: "top",
      });
      return;
    }
  
    // First name and last name should not contain numeric values
    if (!nameRegex.test(firstName)) {
      toast({
        title: "Invalid First Name",
        description: "First name should not contain numeric values or special characters.",
        status: "error",
        duration: 9000,
        isClosable: true,
        position: "top",
      });
      return;
    }
  
    if (!nameRegex.test(lastName)) {
      toast({
        title: "Invalid Last Name",
        description: "Last name should not contain numeric values or special characters.",
        status: "error",
        duration: 9000,
        isClosable: true,
        position: "top",
      });
      return;
    }
  
    // Email validation
    if (!emailRegex.test(email)) {
      toast({
        title: "Invalid Email",
        description: "Please enter a valid email address.",
        status: "error",
        duration: 9000,
        isClosable: true,
        position: "top",
      });
      return;
    }
  
    // Password validation
    if (!passwordRegex.test(password)) {
      toast({
        title: "Invalid Password",
        description: "Password must be at least 6 characters long, include one capital letter, one symbol, and one number.",
        status: "error",
        duration: 9000,
        isClosable: true,
        position: "top",
      });
      return;
    }
  
    if (!email || !password || !firstName || !lastName || !university || !course || !department) {
      toast({
        title: "Field is empty",
        description: "Please ensure that you have provided all required fields.",
        status: "error",
        duration: 9000,
        isClosable: true,
        position: "top",
      });
      return;
    }
  
    const formData = new FormData();
  
    // Append other form fields
    formData.append("email", email);
    formData.append("password", password);
    formData.append("first_name", firstName);
    formData.append("last_name", lastName);
    formData.append("university", university);
    formData.append("course", course);
    formData.append("department", department);
  
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
          title: "Account Created Successfully",
          description: "Please sign in to continue",
          status: "success",
          duration: 9000,
          isClosable: true,
          position: "top",
        });
        navigate("/signin");
      } else {
        toast({
          title: "Signup failed",
          description: "There was a problem creating your account. Please try again.",
          status: "error",
          duration: 9000,
          isClosable: true,
          position: "top",
        });
      }
    } catch (error) {
      console.error("Error:", error.message);
      if (error.response && error.response.status === 409) {
        toast({
          title: "User already registered",
          description: "Please sign in.",
          status: "error",
          duration: 9000,
          isClosable: true,
          position: "top",
        });
      } else {
        toast({
          title: "Error",
          description: "An unexpected error occurred. Please try again later.",
          status: "error",
          duration: 9000,
          isClosable: true,
          position: "top",
        });
      }
    }
  };

  return (
    <Flex w={"100vw"} justifyContent={"center"} alignItems={"center"} h={"100vh"} backgroundImage={`url(${graphics})`}>
      <Box w={{ base: "90%", md: "50%" }}>
        <Flex
          flexDirection="column"
          justifyContent="center"
          alignItems="center"
          p={6}
          bg="white"
          rounded="md"
          shadow="md"
        >
          <Heading color="black">Register with your e-mail</Heading>
          <Text mt={2} mb={6} color="gray.500" textAlign="center">
            Please enter your e-mail address and a password to start the registration process.
          </Text>

          {/* Profile Image Selection */}
          <Box mb={4} textAlign="center">
            <Text fontWeight={"600"}>Choose Profile Image</Text>
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
                  <InputGroup>
                    <InputLeftElement
                      pointerEvents="none"
                      children={<CFaUserAlt color="gray.300" />}
                    />
                    <Input
                      type="email"
                      placeholder="Email Address"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                    />
                  </InputGroup>
                </FormControl>

                <FormControl isRequired>
                  <InputGroup>
                    <InputLeftElement
                      pointerEvents="none"
                      children={<CFaLock color="gray.300" />}
                    />
                    <Input
                      type={showPassword ? "text" : "password"}
                      placeholder="Password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                    />
                    <InputRightElement width="4.5rem">
                      <Button h="1.75rem" size="sm" onClick={handleShowClick}>
                        {showPassword ? "Hide" : "Show"}
                      </Button>
                    </InputRightElement>
                  </InputGroup>
                  <FormHelperText>
                    Password must be at least 6 characters long, include one capital letter, one symbol, and one number.
                  </FormHelperText>
                </FormControl>

                {/* Additional Fields */}
                <FormControl isRequired>
                  <InputGroup>
                    <Input
                      type="text"
                      placeholder="First Name"
                      value={firstName}
                      onChange={(e) => setFirstName(e.target.value)}
                    />
                  </InputGroup>
                </FormControl>

                <FormControl isRequired>
                  <InputGroup>
                    <Input
                      type="text"
                      placeholder="Last Name"
                      value={lastName}
                      onChange={(e) => setLastName(e.target.value)}
                    />
                  </InputGroup>
                </FormControl>

                <FormControl isRequired>
                  <InputGroup>
                    <Input
                      type="text"
                      placeholder="University"
                      value={university}
                      onChange={(e) => setUniversity(e.target.value)}
                    />
                  </InputGroup>
                </FormControl>

                <FormControl isRequired>
                  <InputGroup>
                    <Input
                      type="text"
                      placeholder="Course"
                      value={course}
                      onChange={(e) => setCourse(e.target.value)}
                    />
                  </InputGroup>
                </FormControl>

                <FormControl isRequired>
                  <InputGroup>
                    <Input
                      type="text"
                      placeholder="Department"
                      value={department}
                      onChange={(e) => setDepartment(e.target.value)}
                    />
                  </InputGroup>
                </FormControl>

                <Button
                  borderRadius={0}
                  type="submit"
                  variant="solid"
                  colorScheme="red"
                  width="full"
                >
                  Register
                </Button>
              </Stack>
            </form>
          </Box>

          <Box mt={4}>
            Already have an Flex account?{" "}
            <Link to="/signin">
              <span style={{ color: "tomato" }}>Log In</span>
            </Link>
          </Box>
        </Flex>
      </Box>
    </Flex>
  );
};

export default Signup;