import React from "react";
import homeimg from "../assets/homeimg.png";
import { Link } from "react-router-dom";
import NavBar from "../Components/NavBar";
import { Box, Button, Heading } from "@chakra-ui/react";

const Home = () => {
  return (
    <>
      <NavBar />

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
            <Heading>Welcome to Supplychain Simulation</Heading>
            <Box display="flex" gap={10} justifyContent="center" mt={20}>
              <Link to="/admin">
                <Button>Admin</Button>
              </Link>
              <Link to="/signin">
                <Button>User</Button>
              </Link>
            </Box>
          </div>
        </div>
      </div>
    </>
  );
};

export default Home;
