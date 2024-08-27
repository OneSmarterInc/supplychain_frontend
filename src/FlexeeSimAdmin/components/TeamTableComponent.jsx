import React from "react";
import Piechartimg from "../Assets/Group.png";

const TeamTableComponent = ({ selectedTeam }) => {
  return (
    <div className="bg-white w-full mx-auto pt-4">
      <div className="px-4 rounded-lg">
        <div className="flex justify-between items-center mb-6">
          <div className="text-2xl font-bold">
            {selectedTeam?.firm_key}
            <div className="flex items-center mt-2">
              <div className="bg-red-500 h-0.5 w-24"></div>
              <div className="relative ml-0 flex items-center">
                <i className="fa-solid fa-caret-right text-xl text-red-500"></i>
              </div>
            </div>
          </div>
          <div className="text-gray-500 flex items-center"></div>
        </div>
        <div className="flex justify-between items-center mb-2"></div>

        <div className="h-96 overflow-y-scroll">
          <table className="min-w-full bg-white">
            <thead></thead>
            <tbody>
              {selectedTeam?.users && selectedTeam.users.length > 0 ? (
                selectedTeam.users.map((member, index) => (
                  <tr
                    key={index}
                    className="border-b border-gray-300 hover:bg-gray-200"
                  >
                    <td className="py-4 px-4 flex items-center">
                      <img
                        src={`http://127.0.0.1:8000${member?.image}` || "default-image.png"} // Fallback image if none provided
                        alt={member?.email}
                        className="w-12 h-12 rounded-full mr-4"
                      />
                      <div className="text-start">
                        <div className="text-sm font-normal">
                          {member?.first_name} {member?.last_name}
                        </div>
                        <div className="text-sm text-red-500">
                          #{member?.user_id}
                        </div>
                      </div>
                    </td>
                    <td className="py-4 px-4 text-start">
                      <p className="text-sm text-black">Email</p>
                      <p className="text-green-500">{member.email || "-"}</p>
                    </td>
                    <td className="py-4 px-4 text-start">
                      <p className="text-sm text-black">University</p>
                      <p className="text-green-500">{member.university || "N/A"}</p>
                    </td>
                    {/* <td className="py-4 px-4 text-center text-blue-400 hover:text-blue-500 cursor-pointer">
                      <svg
                        className="h-8 w-8"
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        strokeWidth="1"
                        stroke="currentColor"
                        fill="none"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <path stroke="none" d="M0 0h24v24H0z" />
                        <circle cx="12" cy="12" r="9" />
                        <line x1="16" y1="12" x2="8" y2="12" />
                        <line x1="16" y1="12" x2="12" y2="16" />
                        <line x1="16" y1="12" x2="12" y2="8" />
                      </svg>
                    </td> */}
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="4" className="py-4 px-4 text-center text-gray-500">
                    No users added for this Group.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default TeamTableComponent;