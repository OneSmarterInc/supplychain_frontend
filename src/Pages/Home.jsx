import React from "react";
import homeimg from "../assets/img.png";
import { Link, useNavigate } from "react-router-dom";
import NavBar from "../Components/NavBar";
import { Box, Button, Heading } from "@chakra-ui/react";
import UserNavBar from "../Components/UserNavBar";

const Home = () => {
  const userData = JSON.parse(localStorage.getItem("user"));
  const navigate = useNavigate();
  const handleLogOut = () => {
    localStorage.removeItem("user");
    navigate("/");
  };
  return (
    <>
      {/* <NavBar /> */}
      {/* <UserNavBar/> */}
      <div style={{ display: "flex", height: "100%" }}>
        {/* Left side with image */}
        <div
          style={{
            flex: "1",
            backgroundImage: `url(${homeimg}) `,
            backgroundRepeat: "no-repeat",
            backgroundSize: "cover",
          }}
        />

        {/* Right side with text and buttons */}
        <div
          style={{
            flex: "1",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <div>
            <Heading className="m-4">Welcome to Supplychain Simulation</Heading>
            <Box display="flex" gap={10} justifyContent="center" mt={20}>
              {/* temporary  */}
              {userData ? (
                <Button color={"red"} onClick={handleLogOut}>
                  LogOut {userData.isadmin ? "Admin" : "User"}
                </Button>
              ) : (
                <Link to="/signin">
                  <Button>Login</Button>
                </Link>
              )}
            </Box>
          </div>
        </div>
      </div>
    </>
  );
};

export default Home;
