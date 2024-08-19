import React from "react";
import TeamTableComponent from "./TeamTableComponent";
import graph from "../Assets/GroupGraph.png";
const GroupsTeamsComponent = () => {
  const teams = [
    {
      name: "Team 01",
      members: [
        {
          name: "Christopher",
          id: "23354824",
          amount: "$968",
          validity: "1 Year",
          image: "path/to/image1",
        },
        {
          name: "Catherine",
          id: "23354824",
          amount: "$968",
          validity: "1 Year",
          image: "path/to/image2",
        },
        {
          name: "Amelia",
          id: "23354824",
          amount: "$968",
          validity: "1 Year",
          image: "path/to/image3",
        },
        {
          name: "Elizabeth",
          id: "23354824",
          amount: "$968",
          validity: "1 Year",
          image: "path/to/image4",
        },
        {
          name: "Charlotte",
          id: "23354824",
          amount: "$968",
          validity: "1 Year",
          image: "path/to/image5",
        },
      ],
      createdOn: "05/23/2024",
    },
    {
      name: "Team 02",
      members: ["04"],
    },
    {
      name: "Team 03",
      members: ["02"],
    },
    {
      name: "Team 04",
      members: [],
    },
  ];

  return (
    <div className="bg-white grid px-16 mx-auto">
      <div className="grid grid-cols-7 justify-start items-start mb-6 ">
        <div className="w-full h-full p-10 col-span-4 border-2  border-t-2 rounded-s-md   border-gray-400 border-opacity-50">
          <header className="flex justify-between items-center mb-4">
            <div className="text-2xl font-bold">
              {" "}
              <p className="">GROUPS</p>{" "}
              {/* arrow starts */}
              <div className="flex justify-center h-8 items-center relative">
                <p className="bg-red-500 h-0.5 w-24 "></p>
                <p className="text-red-500 ">
                  <div className="absolute left-24 transform -translate-y-[18px] -translate-x-2 text-red-500 ">
                    <i class="fa-solid fa-caret-right text-xl"></i>
                  </div>
                </p>
              </div>
              {/* arrow ends */}
            </div>
          </header>
          <div className="bg-gray-50 flex w-full justify-between items-start  rounded ">
            {/* Placeholder for the graph */}
            <div className="   w-[430px]   flex items-center justify-center">
              <img src={graph} alt="" className="h-[110px] w-[412px] mt-10" />
            </div>
            <button className="bg-red-500 h-10 rounded-full flex space-x-1 justify-center items-center text-white px-4 py-2 ">
              <p>
                {" "}
                <i class="fa-solid fa-plus font-semibold"></i>
              </p>{" "}
              <p className="text-lg">|</p> <p>CREATE NEW TEAM </p>
            </button>
          </div>

          <div className="bg-gray-50 p-4 rounded">
            {teams.map((team, index) => (
              <div
                key={index}
                className="flex justify-between space-x-24 items-center border-b-2 border-gray-200 py-2 group hover:border-b-red-500 border-opacity-20"
              >
                <div className="flex space-x-28 border-0">
                  <div className="text-lg">{team.name}</div>
                  <div
                    className={` ${
                      team.members.length === 0 &&
                      "text-gray-500  w-60  text-start"
                    }`}
                  >
                    {team.members.length > 0 ? (
                      <p className="text-black text-start">
                        {" "}
                        Member Joined{" "}
                        <span className="text-red-500 font-medium">
                          {" "}
                          0{team.members.length}
                        </span>
                      </p>
                    ) : (
                      <p className="text-start">Not Added Yet</p>
                    )}
                  </div>{" "}
                </div>
                {team.members.length > 0 ? (
                  <div className="text-red-500 cursor-pointer opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <span>
                      <i class="fa-solid fa-arrow-up-right-from-square"></i>
                    </span>
                  </div>
                ) : (
                  <div className="text-red-500 disabled cursor-pointer opacity-0 group-hover:opacity-100 transition-opacity duration-300 ">
                    <span>
                      <i class="fa-solid fa-arrow-up-right-from-square"></i>
                    </span>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
        <div className=" col-span-3 border-0 border-t-2 border-b-2 border-r-2  rounded-e-md    border-gray-400 border-opacity-50 h-full">
          <TeamTableComponent />
        </div>
      </div>
    </div>
  );
};

export default GroupsTeamsComponent;
