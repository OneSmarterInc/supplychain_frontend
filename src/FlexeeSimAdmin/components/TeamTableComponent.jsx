import React, { useState } from "react";
import Piechartimg from "../Assets/Group.png";
const TeamTableComponent = ({selectedTeam}) => {
  // const selectedTeam = JSON.parse(localStorage.getItem("selectedTeam"));
  console.log("selectedTeam from table:-", selectedTeam)

  console.log(selectedTeam?.users)

  return (
    <div className="bg-white p-0 pt-0 w-full mx-auto">
      <div className="bg-gray-50 p-0 rounded-lg  pt-8">
        <div className="flex w-full justify-between px-4">
          <div className="flex flex-col justify-between items-start mb-4">
            <div className="text-2xl font-bold">{selectedTeam?.firm_key}</div>
            <div className="text-gray-500 flex items-center">
              <i className="fa-solid fa-calendar-alt text-red-500 mr-2"></i>
              CREATED ON: 05/23/2024
            </div>
          </div>
          <div className="flex justify-between items-center mb-4">
            <div className=" m-1 bg-blue-950 mx-3 rounded-full ">
              <img src={Piechartimg} alt="" />
            </div>
            <div className="flex flex-col items-start ">
              <div className="flex space-x-2 items-center">
                <div className="bg-yellow-500 h-2 w-2 rounded-full "></div>
                <div className="text-xs">Email Sent</div>
              </div>
              <div className="flex space-x-2 items-center">
                {" "}
                <div className="bg-blue-500 h-2 w-2 rounded-full "></div>
                <div className="text-xs">Read</div>
              </div>
              <div className="flex space-x-2 items-center">
                {" "}
                <div className="bg-red-500 h-2 w-2 rounded-full "></div>
                <div className="text-xs">Unread</div>
              </div>
            </div>
          </div>
        </div>
        <div className="h-96 overflow-y-scroll">
          <table className="min-w-full bg-white">
            <thead>
              <tr className="">
                <th className=" px-4 text-left">
                  {" "}
                  {/* arrow starts */}
                  <div className="flex justify-start h-3 items-center relative">
                    <p className="bg-red-500 h-0.5 w-32 "></p>
                    <div className="absolute left-32 transform  -translate-x-2 text-red-500 ">
                      <i class="fa-solid fa-caret-right text-xl"></i>
                    </div>
                  </div>
                  {/* arrow ends */}
                </th>
                <th className=" px-4 text-left">
                  {" "}
                  {/* arrow starts */}
                  <div className="flex justify-start h-3 items-center relative">
                    <p className="bg-gray-500 h-0.5 w-24 "></p>
                    <div className="absolute left-24 transform  -translate-x-2 text-gray-500 ">
                      <i class="fa-solid fa-caret-right text-xl"></i>
                    </div>
                  </div>
                  {/* arrow ends */}
                </th>
                <th className=" px-4 text-left">
                  {" "}
                  {/* arrow starts */}
                  <div className="flex justify-start h-3 items-center relative">
                    <p className="bg-red-500 h-0.5 w-14 "></p>
                    <div className="absolute left-14 transform  -translate-x-2 text-red-500 ">
                      <i class="fa-solid fa-caret-right text-xl"></i>
                    </div>
                  </div>
                  {/* arrow ends */}
                </th>
                <th className=" px-4 text-center">-</th>
              </tr>
            </thead>
            <tbody>
              {selectedTeam?.users?.map((member, index) => (
                <tr key={index} className="border-b border-gray-200">
                  <td className="py-4 px-4 flex items-center">
                    <img
                      src={member?.image}
                      alt={member?.email}
                      className="w-12 h-12 rounded-full mr-4"
                    />
                    <div className="text-start">
                      <div className="text-sm font-normal">{member?.email}</div>
                      <div className="text-sm text-red-500">
                        #{member?.user_id}
                      </div>
                    </div>
                  </td>
                  <td className="py-4 px-4 text-green-500 text-start ">
                    <span className="mr-2">
                      {" "}
                      <p className="text-sm text-black">Received Amount</p>
                      {member.amount}
                    </span>
                    <i className="fa-regular fa-check-circle"></i>
                  </td>
                  <td className="py-4 px-4 text-green-500">
                    {" "}
                    <p className="text-sm text-black">Validity</p>
                    {member.validity}
                  </td>
                  <td className="py-4 px-4  text-xl text-blue-400 hover:text-blue-500 cursor-pointer">
                    <svg
                      class="h-8 w-8 text-sky-500"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      stroke-width="1"
                      stroke="currentColor"
                      fill="none"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    >
                      {" "}
                      <path stroke="none" d="M0 0h24v24H0z" />{" "}
                      <circle cx="12" cy="12" r="9" />{" "}
                      <line x1="16" y1="12" x2="8" y2="12" />{" "}
                      <line x1="16" y1="12" x2="12" y2="16" />{" "}
                      <line x1="16" y1="12" x2="12" y2="8" />
                    </svg>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default TeamTableComponent;
