import { useContext, useEffect, useState } from "react";
import signin from '../assets/signin.png';
import graphics from '../assets/graphic.png'
import {
  Flex,
  Box,
  Input,
  Button,
  InputGroup,
  Stack,
  InputLeftElement,
  chakra,
  FormControl,
  FormHelperText,
  InputRightElement,
  Text,
  useToast,
  Image,
} from "@chakra-ui/react";
import { FaUserAlt, FaLock } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import MyContext from "./ContextApi/MyContext";

const CFaUserAlt = chakra(FaUserAlt);
const CFaLock = chakra(FaLock);

const Signin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const toast = useToast();
  const { api } = useContext(MyContext);
  const navigate = useNavigate();

  useEffect(() => {
    const user = localStorage.getItem("user");
    if (user) {
      const userData = JSON.parse(user);
      if (userData.isadmin) {
        navigate("/flexeesim/dashboard");
      } else {
        navigate("/usersidelive");
      }
    }
  }, [navigate]);

  const loginHandler = async (e) => {
    e.preventDefault();

    let data = {
      email,
      password,
    };

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
        const response = await axios.post(`${api}/users/login/`, data);
        if (response.status === 200) {
          toast({
            title: "Login successful",
            status: "success",
            duration: 2000,
            isClosable: true,
            position: "top",
          });
          const serializedValue = JSON.stringify(response.data);
          localStorage.setItem("user", serializedValue);
          if (response.data.isadmin) {
            navigate("/flexeesim/dashboard");
            setTimeout(() => {
              toast({
                title: "Welcome Admin",
                status: "info",
                duration: 7000,
                isClosable: true,
                position: "top",
              });
            }, 2000);
          } else {
            navigate("/usersidelive");
            setTimeout(() => {
              toast({
                title: "Welcome User",
                status: "info",
                duration: 7000,
                isClosable: true,
                position: "top",
              });
            }, 2000);
          }
        } else {
          console.log("Login failed");
          console.log(response.data);
        }
      }
    } catch (error) {
      console.error("Error:", error.code);
      if (error.response && error.response.status === 401) {
        toast({
          title: "User not found",
          description: "Please sign up.",
          status: "error",
          duration: 9000,
          isClosable: true,
          position: "top",
        });
      } else if (error.response && error.response.status === 402) {
        toast({
          title: "Wrong Password.",
          description: "Please check that you have entered the correct password.",
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
    <Flex direction="column" alignItems="center" w="100%" h="100vh" pt={'2rem'} backgroundImage={`url(${graphics})`}
      backgroundPosition="center"
      backgroundSize="cover"
      backgroundRepeat="no-repeat">
       <Box w={{ base: "90%", md: "30%" }} mt="5%">
        <Box bg="white" p={6} rounded="md" shadow="md"  >
          <form onSubmit={loginHandler}>
            <Stack spacing={4}>
              <FormControl>
                <InputGroup>
                  <InputLeftElement
                    pointerEvents="none"
                    children={<CFaUserAlt color="gray.300" />}
                  />
                  <Input
                    type="email"
                    placeholder="Registered Email / Username"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </InputGroup>
              </FormControl>
              <FormControl>
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
                <FormHelperText textAlign="right">
                  <Link to="/forgot-password">Forgot Password?</Link>
                </FormHelperText>
              </FormControl>
              <Button
                type="submit"
                colorScheme="red"
                w="full"
                mt={4}
                mb={2}
              >
                Login
              </Button>
            </Stack>
          </form>
        </Box>
        <Text mt={4} textAlign="center">
          No account yet?{" "}
          <Link to="/signup" style={{ color: "tomato" }}>
            Register as a new user.
          </Link>
        </Text>
      </Box>

      <Image
        src={signin}
        alt="Supply Chain Image"
        mt="auto"
        w="full"
        h={'50%'}
      />
    </Flex>
  );
};

export default Signin;