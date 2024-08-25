import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import TeamTableComponent from "./TeamTableComponent";
import graph from "../Assets/GroupGraph.png";
import MyContext from "../../Components/ContextApi/MyContext";
import StudentRequest from "./StudentRequest";

const GroupsTeamsComponent = () => {
  const selectedSimData = JSON.parse(localStorage.getItem("SelectedCourse"));
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
    <div className="w-full max-w-screen-full mx-auto px-10">
      <div className="grid grid-cols-1 md:grid-cols-7 gap-0">
        <div className="col-span-4 bg-white p-6 border-l-2 border-t-2 border-b-2 rounded-bl-lg  border-gray-400 border-opacity-50">
          <header className="flex justify-between items-center mb-6">
            <div className="text-2xl font-bold">
              <p>GROUPS</p>
              <div className="flex items-center mt-2">
                <div className="bg-red-500 h-0.5 w-24"></div>
                <div className="relative ml-0 flex items-center">
                  <i className="fa-solid fa-caret-right text-xl text-red-500"></i>
                </div>
              </div>
            </div>
          </header>
          <div className="flex justify-between items-center">
            <img src={graph} alt="Group Graph" className="h-[110px] w-[412px]" />
          </div>

          <div className=" p-4">
            {teams?.map((team, index) => (
              <div
                key={index}
                className="flex justify-between items-center border-b-2 border-gray-200 py-3 hover:border-b-red-500 hover:bg-gray-100 transition-all cursor-pointer"
                onClick={() => handleSelectedTeam(team)}
              >
                <div className="flex space-x-12">
                  <div className="text-lg font-medium">{team.firm_key}</div>
                  <div
                    className={`${team.users.length === 0 ? "text-gray-500" : "text-black"
                      } text-start`}
                  >
                    {team.users.length > 0 ? (
                      <p>
                        Member Joined{"  "}
                        <span className="text-red-500 font-medium">
                          0{team.users.length}
                        </span>
                      </p>
                    ) : (
                      <p>Not Added Yet</p>
                    )}
                  </div>
                </div>
                {team.users.length > 0 && (
                  <div className="text-red-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <i className="fa-solid fa-arrow-up-right-from-square"></i>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        <div className="col-span-3 bg-white border-2 rounded-br-lg border-gray-400 border-opacity-50">
          <TeamTableComponent
            selectedTeam={teams.find((team) => team.firm_key === selectedFirm)}
          />
        </div>
      </div>

      <div className="mt-8">
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