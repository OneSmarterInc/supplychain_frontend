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
} from "@chakra-ui/react";
import { FaUserAlt, FaLock } from "react-icons/fa";
import { Link } from "react-router-dom";
import axios from "axios";
import MyContext from "./ContextApi/MyContext";

const CFaUserAlt = chakra(FaUserAlt);
const CFaLock = chakra(FaLock);

const Admin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const toast = useToast();

  const { api } = useContext(MyContext);
  


  const loginHandler = async (e) => {
    e.preventDefault();

    let data = {
      email,
      password,
    };
    console.log(data);

    try {
      if (!email || !password) {
        toast({
          title: "Field is empty",
          description:
            "Please ensure that you have provided both the email and password.",
          status: "error",
          duration: 9000,
          isClosable: true,
          position: "top",
          colorScheme: "red",
        });
      } else {
        alert(api)
        const response = await axios.post(`${api}/user/login`, data);

        if (response.status === 200) {
          console.log("Login successful");
          toast({
            title: "Login successful",
            status: "success",
            duration: 9000,
            isClosable: true,
            position: "top",
          });
          console.log(response.data);
        } else {
          console.log("Login failed");
          console.log(response.data);
        }
      }
    } catch (error) {
      console.error("Error:", error.code);
      if (error.response && error.response.status === 401) {
        console.log("User not found. Please sign up.");
        toast({
          title: "User not found",
          description: "Please sign up.",
          status: "error",
          duration: 9000,
          isClosable: true,
          position: "top",
        });
      } else if (error.response && error.response.status === 402) {
        console.error("Wrong Password");
        toast({
          title: "Wrong Password.",
          description:
            "Please check that you have entered the correct password.",
          status: "error",
          duration: 9000,
          isClosable: true,
          position: "top",
        });
      }
    }
  };

  const [showPassword, setShowPassword] = useState(false);

  const handleShowClick = () => setShowPassword(!showPassword);

  return (
    <Flex w={"99vw"} justifyContent={"space-between"}>
      <Box w={"20%"} m={"auto"}>
        <Flex
          flexDirection="column"
          width="100%"
          height="100vh"
          // backgroundColor="gray.200"
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
            <Heading color="black">Welcome Admin</Heading>
            <Text color="gray.500" fontWeight={"600"}>
              Log in to continue.
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

                  <Button
                    borderRadius={0}
                    type="submit"
                    variant="solid"
                    bgColor={"black"}
                    color={"white"}
                    _hover={{ color: "white" }}
                    width="full"
                    onClick={loginHandler}
                  >
                    Login
                  </Button>
                </Stack>
              </form>
            </Box>
          </Stack>
          <Box>
            New user?{" "}
            <Link to="/signup">
              <span style={{ color: "tomato" }}>Sign up</span>
            </Link>
          </Box>
        </Flex>
      </Box>
    </Flex>
  );
};

export default Admin;
