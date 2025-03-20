import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import TeamTableComponent from "./TeamTableComponent";
import graph from "../Assets/GroupGraph.png";
import MyContext from "../../Components/ContextApi/MyContext";
import StudentRequest from "./StudentRequest";

const GroupsView = ({course}) => {
  return (
    <div className="">
          <div className="flex p-0">
            {course?.map((team, index) => (
              <div
                key={index}
                className=""
              >
                <div className="flex rounded-full  border border-[#14AE5C] m-1">
                  <div className="text-sm text-[#009951] rounded-full border-r border-[#14AE5C] px-4 bg-[#EBFFEE] font-medium"><i className="fa fa-users"></i>  {team.firmName || "Unnamed Team"}</div>
                  <div className="text-sm text-black rounded-full px-4  font-medium"> {team.users.length || 0}-Students</div>
                </div>
              </div>
            ))}
          </div>
          
    </div>
  );
};

export default GroupsView;