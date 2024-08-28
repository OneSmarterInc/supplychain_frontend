import { useContext, useState } from "react";
import graphics from '../assets/graphic.png';
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
  InputRightElement,
  Text,
  useToast,

  Heading,
} from "@chakra-ui/react";
import { FaEnvelope, FaLock } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import MyContext from "./ContextApi/MyContext";

const CFaEnvelope = chakra(FaEnvelope);
const CFaLock = chakra(FaLock);

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [otpSent, setOtpSent] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const toast = useToast();
  const { api } = useContext(MyContext);
  const navigate = useNavigate();

  const handleShowClick = () => setShowPassword(!showPassword);

  const sendOtpHandler = async () => {
    try {
      const response = await axios.post(`${api}/send-otp/`, { email });
      if (response.status === 200) {
        setOtpSent(true);
        toast({
          title: "OTP sent successfully",
          description: "Please check your email for the OTP.",
          status: "success",
          duration: 9000,
          isClosable: true,
          position: "top",
        });
      }
    } catch (error) {
      console.error("Error:", error);
      toast({
        title: "Error sending OTP",
        description: "Please check the email and try again.",
        status: "error",
        duration: 9000,
        isClosable: true,
        position: "top",
      });
    }
  };

  const resetPasswordHandler = async (e) => {
    e.preventDefault();
  
    // Password validation
    const passwordValidationRegex = /^(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,}$/;
    if (!passwordValidationRegex.test(newPassword)) {
      toast({
        title: "Invalid Password",
        description:
          "Password must be at least 6 characters long, include at least one capital letter, one symbol, and one number.",
        status: "error",
        duration: 9000,
        isClosable: true,
        position: "top",
      });
      return;
    }
  
    if (newPassword !== confirmPassword) {
      toast({
        title: "Passwords do not match",
        description: "Please ensure both passwords are the same.",
        status: "error",
        duration: 9000,
        isClosable: true,
        position: "top",
      });
      return;
    }
  
    try {
      const response = await axios.post(`${api}/reset-password/`, {
        email,
        otp,
        new_password: newPassword,
      });
      if (response.status === 200) {
        toast({
          title: "Password reset successful",
          description: "You can now log in with your new password.",
          status: "success",
          duration: 9000,
          isClosable: true,
          position: "top",
        });
        navigate("/signin");
      }
    } catch (error) {
      console.error("Error:", error);
      toast({
        title: "Error resetting password",
        description: "Please check the OTP and try again.",
        status: "error",
        duration: 9000,
        isClosable: true,
        position: "top",
      });
    }
  };
  return (
    <Flex direction="column" alignItems="center" w="100%" h="100vh" pt={'12rem'} backgroundImage={`url(${graphics})`}
      backgroundPosition="center"
      backgroundSize="cover"
      backgroundRepeat="no-repeat">
        <Heading>Forgot password</Heading>
      <Box w={{ base: "90%", md: "30%" }} mt="5%">
        <Box bg="white" p={6} rounded="md" shadow="md">
          <form onSubmit={resetPasswordHandler}>
            <Stack spacing={4}>
              <FormControl>
                <InputGroup>
                  <InputLeftElement
                    pointerEvents="none"
                    children={<CFaEnvelope color="gray.300" />}
                  />
                  <Input
                    type="email"
                    placeholder="Registered Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    isDisabled={otpSent}
                  />
                </InputGroup>
              </FormControl>
              {otpSent && (
                <>
                  <FormControl>
                    <InputGroup>
                      <InputLeftElement
                        pointerEvents="none"
                        children={<CFaLock color="gray.300" />}
                      />
                      <Input
                        type="text"
                        placeholder="Enter OTP"
                        value={otp}
                        onChange={(e) => setOtp(e.target.value)}
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
                        placeholder="New Password"
                        value={newPassword}
                        onChange={(e) => setNewPassword(e.target.value)}
                      />
                      <InputRightElement width="4.5rem">
                        <Button h="1.75rem" size="sm" onClick={handleShowClick}>
                          {showPassword ? "Hide" : "Show"}
                        </Button>
                      </InputRightElement>
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
                        placeholder="Confirm New Password"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                      />
                      <InputRightElement width="4.5rem">
                        <Button h="1.75rem" size="sm" onClick={handleShowClick}>
                          {showPassword ? "Hide" : "Show"}
                        </Button>
                      </InputRightElement>
                    </InputGroup>
                  </FormControl>
                </>
              )}
              {!otpSent ? (
                <Button
                  colorScheme="red"
                  w="full"
                  mt={4}
                  onClick={sendOtpHandler}
                >
                  Send OTP
                </Button>
              ) : (
                <Button
                  type="submit"
                  colorScheme="red"
                  w="full"
                  mt={4}
                  mb={2}
                >
                  Reset Password
                </Button>
              )}
            </Stack>
          </form>
        </Box>
        <Text mt={4} textAlign="center">
          Remembered your password?{" "}
          <Link to="/signin" style={{ color: "tomato" }}>
            Go back to Login.
          </Link>
        </Text>
      </Box>
    </Flex>
  );
};

export default ForgotPassword;