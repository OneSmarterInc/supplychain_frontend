import React, { useState, useEffect, useContext } from "react";
import MyContext from "../../Components/ContextApi/MyContext";

const GroupDashboard = () => {
  const [teams, setTeams] = useState([]);
  const [activeTeam, setActiveTeam] = useState(null);
  const [logs, setLogs] = useState([]);
  const [loadingLogs, setLoadingLogs] = useState(false); // Loader state for logs
  const { api1, api } = useContext(MyContext);

  // Fetch teams on component mount
  useEffect(() => {
    const course = JSON.parse(localStorage.getItem("SelectedCourse")) || {};
    fetch(`${api}/get-firms/${course.passcode}/`)
      .then((response) => response.json())
      .then((data) => {
        setTeams(data);
        if (data.length > 0) setActiveTeam(data[0]); // Set the first team as the default active team
      })
      .catch((error) => console.error("Error fetching teams:", error));
  }, []);

  // Function to fetch logs when a team is selected
  const fetchLogs = (team) => {
    const course = JSON.parse(localStorage.getItem("SelectedCourse")) || {};
    const simulationId = course.simulation_id; // Assuming simulation_id comes from the selected course
    const currentQuarter = course.quarter || 1; // Assuming current_quarter from the selected course

    setLoadingLogs(true); // Start loader
    fetch(
      `${api}/adduserlogs/?simulation_id=${simulationId}&firm_key=${team.firm_key}&current_quarter=${currentQuarter}`
    )
      .then((response) => response.json())
      .then((data) => {
        setLogs(data);
        setLoadingLogs(false); // Stop loader
      })
      .catch((error) => {
        console.error("Error fetching logs:", error);
        setLoadingLogs(false); // Stop loader on error
      });
  };

  // Handle team selection
  const handleTeamSelection = (team) => {
    setActiveTeam(team);
    fetchLogs(team); // Fetch logs for the selected team
  };

  return (
    <div className="flex  p-6">
      {/* Main Content */}
      <div className="flex w-[99%] space-x-0">
        {/* Teams Section */}
        <div className="w-1/2 p-6 bg-white rounded-bl-lg rounded-tl-lg ml-4 border-b-2 border-l-2 border-t-2 border-gray-300 "> 
          {/* Teams Navigation */}
          <div className="mb-6">
            <h2 className="text-xl font-bold text-gray-800">Teams</h2>
            <div className="flex space-x-4 mt-4">
              {teams.map((team, index) => (
                <button
                  key={index}
                  className={`px-4 py-2 rounded-full ${
                    activeTeam?.firm_key === team.firm_key
                      ? "bg-red-300 text-white border-2 border-red-500"
                      : "bg-white text-red-700 border-2 border-red-500"
                  }`}
                  onClick={() => handleTeamSelection(team)}
                >
                  {team.firm_key}
                </button>
              ))}
            </div>
          </div>

          {/* Display Selected Team Info */}
          {activeTeam && (
            <>
              <div className="mb-6">
                <h3 className="text-lg font-semibold text-gray-800">
                  {activeTeam.firm_key} | {activeTeam.users.length} Students
                </h3>
                <div className="flex space-x-4 mt-2">
                  {activeTeam.users.map((user) => (
                    <div
                      key={user.user_id}
                      className="flex flex-col items-center"
                    >
                      <img
                        src={`${api1}/${user.image}`}
                        alt={`${user.first_name} ${user.last_name}`}
                        className="w-16 h-16 rounded-full"
                      />
                      <p className="mt-2 text-gray-700 text-sm">{`${user.first_name} ${user.last_name}`}</p>
                    </div>
                  ))}
                </div>
              </div>
            </>
          )}
        </div>

        {/* Logs Section */}
        <div className="w-1/2 p-4 bg-white mr-6  rounded-br-lg rounded-tr-lg mr-4 border-b-2 border-r-2 border-l-2 border-t-2 border-gray-300">
          {/* Loader for Logs */}
          {loadingLogs ? (
            <div className="flex justify-center items-center h-full">
              <div className="loader ease-linear rounded-full border-4 border-t-4 border-gray-200 h-12 w-12"></div>
              <p className="ml-4 text-gray-500">Loading logs...</p>
            </div>
          ) : (
            <div className="bg-gray-50 p-6 rounded-lg">
              {/* Render Logs */}
              {logs.length > 0 ? (
                logs.map((log, index) => (
                  <div key={log.id} className="mb-4">
                    <span className="text-sm text-gray-500">
                      {new Date(log.date).toLocaleDateString("en-US")} | Time:{" "}
                      {new Date(log.date).toLocaleTimeString("en-US", {
                        hour: "numeric",
                        minute: "numeric",
                        second: "numeric",
                        hour12: true,
                      })}
                    </span>
                    <p className="text-gray-800 mt-1">
                      <strong>User:</strong> {log.username}
                      <br />
                      <strong>Action:</strong> {log.action} {log.decision}
                      <br />
                     
                      <strong>Quarter:</strong> {log.current_quarter}
                    </p>
                  </div>
                ))
              ) : (
                <p className="text-gray-500">
                  No logs available for this team.
                </p>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default GroupDashboard;
