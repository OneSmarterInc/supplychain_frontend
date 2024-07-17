import { useContext, useEffect, useState } from "react";

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
} from "@chakra-ui/react";
import { FaUserAlt, FaLock } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import MyContext from "./ContextApi/MyContext";

const CFaUserAlt = chakra(FaUserAlt);
const CFaLock = chakra(FaLock);

const Signup = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [university, setUniversity] = useState("");
  const [course, setCourse] = useState("");
  const [department, setDepartment] = useState("");
  const [is_admin] = useState(true);
  const [my_simulations] = useState({ simulations: [1] });
  const [my_firms] = useState(null);

  const [showPassword, setShowPassword] = useState(false);
  const { api } = useContext(MyContext);
  const navigate = useNavigate();
  const toast = useToast();

  const handleShowClick = () => setShowPassword(!showPassword);

  const signupHandler = async (e) => {
    e.preventDefault();

    let data = {
      username: name,
      email,
      password,
      first_name: firstName,
      last_name: lastName,
      university,
      course,
      department,
      is_admin,
      my_simulations,
      my_firms,
    };
    console.log(data);

    try {
      if (!name || !email || !password || !firstName || !lastName || !university || !course || !department) {
        toast({
          title: "Field is empty",
          description:
            "Please ensure that you have provided all required fields.",
          status: "error",
          duration: 9000,
          isClosable: true,
          position: "top",
          colorScheme: "red",
        });
      } else {
        const response = await axios.post(`${api}/users/createuser/`, data);

        if (response.status === 201) {
          toast({
            title: "Account Created Successfully ",
            description: "Please sign in to continue",
            status: "success",
            duration: 9000,
            isClosable: true,
            position: "top",
          });
          navigate('/signin');
          console.log("Signup successful");
          console.log(response.data);
        } else {
          console.log("Signup failed");
          console.log(response.data);
        }
      }
    } catch (error) {
      console.error("Error:", error.message);
      if (error.response && error.response.status === 409) {
        toast({
          title: "User already registered",
          description: "Please sign in",
          status: "success",
          duration: 9000,
          isClosable: true,
          position: "top",
        });
      }
    }
  };

  return (
    <Flex w={"99vw"} justifyContent={"space-between"}>
      <Box w={"20%"} m={"auto"}>
        <Flex
          flexDirection="column"
          width="100%"
          height="100vh"
          justifyContent="center"
          alignItems="center"
        >
          <Stack
            flexDir="column"
            mb="2"
            justifyContent="center"
            alignItems="center"
          >
            <Avatar bg="black" />
            <Heading color="black">Welcome</Heading>
            <Text color="gray.500" fontWeight={"600"}>
              Sign up to supplychain.
            </Text>
            <Box minW={{ base: "90%", md: "468px" }}>
              <form>
                <Stack spacing={4} p="1rem">
                  <FormControl>
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

                  <FormControl>
                    <InputGroup>
                      <InputLeftElement
                        pointerEvents="none"
                        children={<CFaUserAlt color="gray.300" />}
                      />
                      <Input
                        type="email"
                        placeholder="email address"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                      />
                    </InputGroup>
                  </FormControl>

                  <FormControl>
                    <InputGroup>
                      <InputLeftElement
                        pointerEvents="none"
                        // color="gray.300"
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
                    <FormHelperText textAlign="right">
                      <Link>forgot password?</Link>
                    </FormHelperText>
                  </FormControl>

                  <FormControl>
                    <InputGroup>
                      <Input
                        type="text"
                        placeholder="First Name"
                        value={firstName}
                        onChange={(e) => setFirstName(e.target.value)}
                      />
                    </InputGroup>
                  </FormControl>

                  <FormControl>
                    <InputGroup>
                      <Input
                        type="text"
                        placeholder="Last Name"
                        value={lastName}
                        onChange={(e) => setLastName(e.target.value)}
                      />
                    </InputGroup>
                  </FormControl>

                  <FormControl>
                    <InputGroup>
                      <Input
                        type="text"
                        placeholder="University"
                        value={university}
                        onChange={(e) => setUniversity(e.target.value)}
                      />
                    </InputGroup>
                  </FormControl>

                  <FormControl>
                    <InputGroup>
                      <Input
                        type="text"
                        placeholder="Course"
                        value={course}
                        onChange={(e) => setCourse(e.target.value)}
                      />
                    </InputGroup>
                  </FormControl>

                  <FormControl>
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
                    bgColor="black"
                    color={"white"}
                    width="full"
                    _hover={{ color: "white" }}
                    onClick={(e) => signupHandler(e)}
                  >
                    Sign Up
                  </Button>
                </Stack>
              </form>
            </Box>
          </Stack>
          <Box>
            already have an account?{" "}
            <Link to="/signin">
              <span style={{ color: "tomato" }}>Sign in</span>
            </Link>
          </Box>
        </Flex>
      </Box>
    </Flex>
  );
};

export default Signup;
