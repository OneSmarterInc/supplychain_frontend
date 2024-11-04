import React, { useContext } from "react";
import MyContext from "../../Components/ContextApi/MyContext";

const TeamTableComponent = ({ selectedTeam }) => {
  const { api1 } = useContext(MyContext);

  return (
    <div className="bg-white w-full mx-auto pt-4 bg-[#F2F2F7] h-full">
      <div className=" rounded-lg">
        <div className="text-xl font-bold mb-6 text-red-500 px-4">
          {selectedTeam?.firm_key || "Select a Team"}
        </div>

        <div className="divide-y divide-gray-200">
          {selectedTeam?.users && selectedTeam.users.length > 0 ? (
            selectedTeam.users.map((member, index) => (
              <div
                key={index}
                className="flex justify-between items-center py-[15px]"
              >
                <div className="flex items-center w-full pb-5  border-b-2 border-gray-300 px-4">
                  <img
                    src={`${api1}${member?.image}` || "default-image.png"}
                    alt={member?.email}
                    className="w-12 h-12 rounded-full mr-4"
                  />
                  <div>
                    <h3 className="text-sm font-semibold">
                      {member?.first_name} {member?.last_name}
                    </h3>
                    <p className="text-sm text-red-500">#{member?.user_id}</p>
                  </div>
                {/* <i className="fa-solid fa-trash text-gray-400 hover:text-red-500 px-4"></i> */}
                </div>

              </div>
            ))
          ) : (
            <div className="text-center text-gray-500 py-4">
              No users added for this group.
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default TeamTableComponent;
