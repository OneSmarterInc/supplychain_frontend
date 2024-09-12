import { Select, HStack, Toast } from "@chakra-ui/react";
import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import MyContext from "../Components/ContextApi/MyContext";
import UserLoggerApi from "../LoggerApis/UserLoggerApi";
import backgroundImage from "../assets/bg.png";

const PlayComponent = ({
  id,
  batch,
  startDate,
  endDate,
  currentQuarter,
  firm_data,
  selectedSimData,
}) => {
  const navigate = useNavigate();
  const { api } = useContext(MyContext);
  const [isUserAssigned, setIsUserAssigned] = useState(false);
  const [firm, setFirm] = useState("");
  let user = JSON.parse(localStorage.getItem("user"));
  const email = user.email;
  let firm_key_map = "";

  useEffect(() => {
    if (Array.isArray(firm_data) && firm_data.length > 0) {
      let firm_obj = firm_data.find((item) => item.emails?.includes(email));
      if (firm_obj) {
        setFirm(firm_obj.firmName);
        firm_key_map = firm_obj.firmName;
        setIsUserAssigned(true);
      } else {
        setIsUserAssigned(false);
      }
    } else {
      setIsUserAssigned(false);
    }
  }, [firm_data, email]);

  const handleSubmit = () => {
    if (isUserAssigned) {
      const filteredSimData = selectedSimData.filter(
        (sim) => sim.simulation_id === id
      );

      localStorage.setItem("selectedSimulation", JSON.stringify(id));
      localStorage.setItem("selectedSimData", JSON.stringify(filteredSimData));
      localStorage.setItem("selectedSim", JSON.stringify(filteredSimData));

      navigate("/Forecast");
    }
  };

  return (
    <div
      className={`flex mt-0 h-full bg-white justify-around items-center rounded-lg border-2 border-neutral-600 ${
        isUserAssigned
          ? "cursor-pointer hover:bg-gray-200"
          : "cursor-not-allowed"
      }`}
      onClick={handleSubmit}
    >
      <div className="flex w-full">
        <div
          className="flex-1 flex flex-col items-center justify-center"
        >
          <div className="info text-center">
            <h2 className="text-3xl p-2">

              <span className="text-3xl p-2 text-red-500">{batch}</span> |{" "}
              <span className="text-3xl p-2">Quarter {currentQuarter}</span>
            </h2>
            <p className="text-base p-2">
              Start Date :{" "}
              {new Date(startDate)
                .toLocaleString("en-US", {
                  month: "long",
                  day: "numeric",
                  year: "numeric",
                })
                .replace(",", "")
                .replace(/ /g, "-")}{" "}
              | End Date :{" "}
              {new Date(endDate)
                .toLocaleString("en-US", {
                  month: "long",
                  day: "numeric",
                  year: "numeric",
                })
                .replace(",", "")
                .replace(/ /g, "-")}
            </p>
        <div className="text-[#ED1C24] flex items-start space-x-2 text-right absolute top-5 right-5 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <span>
            <i className="fa-regular fa-circle-dot px-1 text-xs"></i>
            Click to Enter 
          </span>
          <span className="text-3xl">
            <i className="fa-solid fa-arrow-up-right-from-square py-4"></i>
          </span>
        </div>
          </div>
          {!isUserAssigned && (
            <p className="text-red-600 mt-2 p-4">
              You will be assigned to a team by faculty soon. Once assigned, you
              will receive an email.
            </p>
          )}
        </div>
        {/* <div className="flex-1">
          <div className="logger">
            <UserLoggerApi
              simulation_id={id}
              firm_key={firm}
              current_quarter={currentQuarter}
            />
          </div>
        </div> */}
      </div>
    </div>
  );
};

export default PlayComponent;
