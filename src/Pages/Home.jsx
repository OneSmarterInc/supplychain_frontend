import React from "react";
import homeimg from "../assets/img.png";
import { Link, useNavigate } from "react-router-dom";
import NavBar from "../Components/NavBar";
import { Box, Button, Heading } from "@chakra-ui/react";
import UserNavBar from "../Components/UserNavBar";
import AdminNavBar from "../Components/AdminNavBar";

const Home = () => {
  const userData = JSON.parse(localStorage.getItem("user"));
  return (
    <>
      {userData?.isadmin ? <AdminNavBar /> : <UserNavBar />}

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
              {/* Profile Section */}
            </Box>
          </div>
        </div>
      </div>
    </>
  );
};

export default Home;
