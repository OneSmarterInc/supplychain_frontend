import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import TeamTableComponent from "./TeamTableComponent";
import graph from "../Assets/GroupGraph.png";
import MyContext from "../../Components/ContextApi/MyContext";
import StudentRequest from "./StudentRequest";

const GroupsTeamsComponent = () => {
  const selectedSimData = JSON.parse(localStorage.getItem("SelectedCourse"));
  console.log("<<<<<><<>>",selectedSimData);
  
  const passcode = selectedSimData?.passcode;
  const [teams, setTeams] = useState([]);
  const [selectedFirm, setSelectedFirm] = useState("Team 01");
  const [selectedOption, setSelectedOption] = useState("");
  const { api } = useContext(MyContext);

  const fetchTeams = async () => {
    try {
      const response = await axios.get(`${api}/get-firms/${passcode}/`);
      setTeams(response.data);
    } catch (error) {
      console.error("Error fetching teams data:", error);
    }
  };

  useEffect(() => {
    fetchTeams();
  }, [selectedOption]);

  const handleSelectedTeam = (team) => {
    setSelectedFirm(team.firm_key);
    localStorage.setItem("selectedTeam", JSON.stringify(team));
  };

  return (
    <div className="">
      <div className="bg-white grid px-16 mx-auto">
        <div className="grid grid-cols-7 justify-start items-start mb-6 ">
          <div className="w-full h-full p-10 col-span-4 border-2 border-t-2 rounded-s-md border-gray-400 border-opacity-50">
            <header className="flex justify-between items-center mb-4">
              <div className="text-2xl font-bold">
                <p className="">GROUPS</p>
                <div className="flex justify-center h-8 items-center relative">
                  <p className="bg-red-500 h-0.5 w-24"></p>
                  <p className="text-red-500">
                    <div className="absolute left-24 transform -translate-y-[18px] -translate-x-2 text-red-500">
                      <i className="fa-solid fa-caret-right text-xl"></i>
                    </div>
                  </p>
                </div>
              </div>
            </header>
            <div className="bg-gray-50 flex w-full justify-between items-start rounded">
              <div className="w-[430px] flex items-center justify-center">
                <img src={graph} alt="" className="h-[110px] w-[412px] mt-10" />
              </div>
              {/* <button className="bg-red-500 h-10 rounded-full flex space-x-1 justify-center items-center text-white px-4 py-2">
              <p>
                <i className="fa-solid fa-plus font-semibold"></i>
              </p>
              <p className="text-lg">|</p> <p>CREATE NEW TEAM</p>
            </button> */}
            </div>

            <div className="bg-gray-50 p-4 rounded">
              {teams?.map((team, index) => (
                <div
                  key={index}
                  className="flex justify-between space-x-24 items-center border-b-2 border-gray-200 py-2 group hover:border-b-red-500 border-opacity-20"
                  onClick={() => handleSelectedTeam(team)}
                >
                  <div className="flex space-x-28 border-0">
                    <div className="text-lg">{team.firm_key}</div>
                    <div
                      className={` ${
                        team.users.length === 0 &&
                        "text-gray-500  w-60  text-start"
                      }`}
                    >
                      {team.users.length > 0 ? (
                        <p className="text-black text-start">
                          Member Joined{" "}
                          <span className="text-red-500 font-medium">
                            0{team.users.length}
                          </span>
                        </p>
                      ) : (
                        <p className="text-start">Not Added Yet</p>
                      )}
                    </div>
                  </div>
                  {team.users.length > 0 ? (
                    <div className="text-red-500 cursor-pointer opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <span>
                        <i className="fa-solid fa-arrow-up-right-from-square"></i>
                      </span>
                    </div>
                  ) : (
                    <div className="text-red-500 disabled cursor-pointer opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <span>
                        <i className="fa-solid fa-arrow-up-right-from-square"></i>
                      </span>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
          <div className="col-span-3 border-0 border-t-2 border-b-2 border-r-2 rounded-e-md border-gray-400 border-opacity-50 h-full">
            <TeamTableComponent selectedTeam={teams?.filter((team)=> team.firm_key===selectedFirm)[0]} />
          </div>
        </div>
      </div>
      <div className="">
        <StudentRequest
          setSelectedOption={setSelectedOption}
          fetchTeams={fetchTeams}
          teams={teams}
        />
      </div>
    </div>
  );
};

export default GroupsTeamsComponent;
