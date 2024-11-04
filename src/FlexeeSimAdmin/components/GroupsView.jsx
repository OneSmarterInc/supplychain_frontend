import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import TeamTableComponent from "./TeamTableComponent";
import graph from "../Assets/GroupGraph.png";
import MyContext from "../../Components/ContextApi/MyContext";
import StudentRequest from "./StudentRequest";

const GroupsView = () => {
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
    <div className="">
          <div className="flex p-0">
            {teams?.map((team, index) => (
              <div
                key={index}
                className=""
                onClick={() => handleSelectedTeam(team)}
              >
                <div className="flex rounded-full  border border-[#14AE5C] m-1">
                  <div className="text-sm text-[#009951] rounded-full border-r border-[#14AE5C] px-4 bg-[#EBFFEE] font-medium"><i className="fa fa-users"></i> {team.firm_key}</div>
                  <div className="text-sm text-black rounded-full px-4  font-medium"> {team.users.length || 0}-Students</div>
                </div>
              </div>
            ))}
          </div>
          
    </div>
  );
};

export default GroupsView;