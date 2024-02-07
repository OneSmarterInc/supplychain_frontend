import React from "react";
import homeimg from "./assets/homeimg.png";
import { Link } from "react-router-dom";
import NavBar from "./Components/NavBar";
const Home = () => {
  return (
    <div
      style={{
        backgroundImage: `url(${homeimg}) `,
        width: "100%",
        height: "100%",
        backgroundRepeat: "no-repeat",
        backgroundSize: "cover",
      }}
    >
      <NavBar />
    </div>
  );
};

export default Home;
