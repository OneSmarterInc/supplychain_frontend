import { useContext, useState } from "react";
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
  RadioGroup,
  Radio,
  HStack,
} from "@chakra-ui/react";
import { FaUserAlt, FaLock, FaCamera } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import MyContext from "./ContextApi/MyContext";
import graphics from '../assets/graphic.png'


import maleProfile from "../assets/male.jpeg";  // Replace with actual path
import femaleProfile from "../assets/female.webp";  // Replace with actual path

const CFaUserAlt = chakra(FaUserAlt);
const CFaLock = chakra(FaLock);
const CFaCamera = chakra(FaCamera);

const Signup = () => {
  const [name, setName] = useState("");
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

  const handleShowClick = () => setShowPassword(!showPassword);

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    setProfileImage(file);
    setSelectedDefaultImage(null);
  };

  const handleDefaultImageSelect = (image) => {
    setSelectedDefaultImage(image);
    setProfileImage(null);
  };
  const signupHandler = async (e) => {
    e.preventDefault();
  
    const formData = new FormData();
  
    // Append other form fields
    formData.append("username", name);
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
      // Convert the selected default image URL to a blob and append it
      const response = await fetch(selectedDefaultImage);
      const blob = await response.blob();
      formData.append("image", blob, selectedDefaultImage.split('/').pop());
    }
  
    try {
      if (!name || !email || !password || !firstName || !lastName || !university || !course || !department) {
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
    <Flex w={"100vw"} justifyContent={"center"} alignItems={"center"} h={"100vh"}  backgroundImage={`url(${graphics})`}>
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
            Please enter your e-mail address and a password to start the registration process. You will receive a confirmation e-mail to activate your account.
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
              <Input
                type="file"
                accept="image/*"
                onChange={handleImageUpload}
                display="none"
                id="profile-upload"
              />
              <Button as="label" htmlFor="profile-upload" leftIcon={<CFaCamera />} colorScheme="teal">
                Upload Image
              </Button>
            </HStack>
          </Box>

          <Box minW={{ base: "90%", md: "80%" }}>
            <form>
              <Stack spacing={4}>
                <FormControl isRequired>
                  <InputGroup>
                    <InputLeftElement
                      pointerEvents="none"
                      children={<CFaUserAlt color="gray.300" />}
                    />
                    <Input
                      type="text"
                      placeholder="User Name"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                    />
                  </InputGroup>
                </FormControl>

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
                  onClick={signupHandler}
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