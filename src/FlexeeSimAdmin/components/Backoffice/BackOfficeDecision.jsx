import { useState, useEffect, useContext } from "react";
import axios from "axios";
import MyContext from "../../../Components/ContextApi/MyContext";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Puff } from "react-loader-spinner";
import { ForecastingSales2View, ForecastingSalesView } from "./view/ForecastView";
import ProcurementView from "./view/ProcurementView";
import ManufactureView from "./view/ManufactureView";
import TransportView from "./view/TransportVIew";
import DemandView from "./view/DemandView";
import ITView from "./view/ITView";
import ServiceView from "./view/ServiceVIew";
import { Table, Thead, Tbody, Tr, Th, Td, Input, Box } from "@chakra-ui/react";

const BackOfficeDecision = () => {
  const [users, setUsers] = useState([]);
  const [teams, setTeams] = useState([]);
  const [loading, setLoading] = useState(false);
  const [selectedCourse, setSelectedCourse] = useState(null);
  const [selectedTeam, setSelectedTeam] = useState(null);
  const [courses, setCourses] = useState([]);
  const [selectedQuarter, setSelectedQuarter] = useState(null);
  const [reportData, setReportData] = useState(null);
  const [selectedDecision, setSelectedDecision] = useState(null);
  const [logs, setLogs] = useState([]); // State for user logs
  const { api } = useContext(MyContext);
  const user = JSON.parse(localStorage.getItem("user"));

  const decisions = ["Forecast", "Procurement", "Manufacture", "Transportation", "Demand", "IT", "Service"];

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        setLoading(true);
        const response = await axios.get(`${api}/user/${user.userid}/subscriptions/`);
        const transformedCourses = response.data.map((item) => ({
          course: item.simulation.course || "Unnamed Course",
          members: item.simulation.members,
          organization: `Simulation ${item.simulation.simulation_id}`,
          startDate: item.simulation.start_date,
          endDate: item.simulation.end_date,
          passcode: item.simulation.passcode,
          simulationId: item.simulation.simulation_id,
          currentQuarter: item.simulation.current_quarter,
          renamedMappedData: item.simulation.renamedMappedData,
        }));
        setCourses(transformedCourses);
        if (transformedCourses.length > 0) {
          setSelectedCourse(transformedCourses[0]);
        }
      } catch (error) {
        toast.error("Error fetching courses.");
        console.error("Error fetching the courses:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchCourses();
  }, [api]);

  useEffect(() => {
    const fetchTeams = async () => {
      if (!selectedCourse?.passcode) return;

      try {
        setLoading(true);
        const response = await axios.get(`${api}/get-firms/${selectedCourse.passcode}/`);
        const flattenedTeams = response.data.map((firm) => ({
          teamName: firm.firm_key,
          users: firm.users,
        }));
        setTeams(flattenedTeams);
      } catch (error) {
        toast.error("Error fetching teams.");
        console.error("Error fetching teams:", error);
      } finally {
        setLoading(false);
      }
    };

    if (selectedCourse) {
      fetchTeams();
    }
  }, [api, selectedCourse]);

  useEffect(() => {
    if (selectedDecision && selectedQuarter && selectedTeam) {
      handleDecisionClick(selectedDecision);
    }
  }, [selectedTeam, selectedQuarter]);

  const handleSelectedCourse = (e) => {
    const selectedCourse = courses.find((course) => course.course === e.target.value);
    setSelectedCourse(selectedCourse);
    setTeams([]);
    setSelectedTeam(null);
  };

  const handleTeamSelection = (e) => {
    const selectedTeam = teams.find((team) => team.teamName === e.target.value);
    setSelectedTeam(selectedTeam);
  };

  const handleQuarterClick = (quarter) => {
    setSelectedQuarter(quarter);
  };

  const handleDecisionClick = async (decision) => {
    if (!selectedQuarter || !selectedCourse?.simulationId || !selectedTeam?.teamName) return;

    const queryParams = new URLSearchParams({
      simulation_id: selectedCourse.simulationId,
      sim_id: 4,
      admin_id: 1,
      current_quarter: selectedQuarter,
      firm_key: selectedTeam.teamName,
      current_decision: decision,
    }).toString();

    const url = `${api}/previous/?${queryParams}`;

    try {
      setLoading(true);
      const response = await axios.get(url);
      setReportData(response.data);
      setSelectedDecision(decision);
    } catch (error) {
      toast.error("Error fetching decision data.");
      console.error("Error fetching decision data:", error);
    } finally {
      setLoading(false);
    }
  };

  // Fetch Logs
  const fetchLogs = async () => {
    if (!selectedCourse || !selectedTeam || !selectedQuarter) return;
    try {
      setLoading(true);
      const response = await axios.get(`${api}/adduserlogs/`, {
        params: {
          simulation_id: selectedCourse.simulationId,
          firm_key: selectedTeam.teamName,
          current_quarter: selectedQuarter,
        },
      });
      setLogs(response.data); // Set logs data
    } catch (error) {
      console.error("Error fetching user logs:", error);
      toast.error("Error fetching user logs.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (selectedCourse && selectedTeam && selectedQuarter) {
      fetchLogs();
    }
  }, [selectedCourse, selectedTeam, selectedQuarter]);

  // Render Logs Table
  const renderLogsTable = () => {
    if (!logs.length) return <p>No logs available for this selection.</p>;
    return (
      <Table className="min-w-full bg-white rounded-md shadow-md">
        <Thead className="bg-gray-100 text-gray-700 font-semibold">
          <Tr>
            <th className="px-4 py-2">Name</th>
            <th className="px-4 py-2">Email</th>
            <th className="px-4 py-2">Decision</th>
            <th className="px-4 py-2">Action</th>
            <th className="px-4 py-2">Date</th>
            {/* <th className="px-4 py-2">IP Address</th> */}
            <th className="px-4 py-2">Firm</th>
            <th className="px-4 py-2">Quarter</th>
          </Tr>
        </Thead>
        <tbody>
          {logs.map((log) => (
            <tr key={log.id} className="border-t">
              <td className="border px-4 py-2">{log.username}</td>
              <td className="border px-4 py-2">{log.email}</td>
              <td className="border px-4 py-2">{log.decision}</td>
              <td className="border px-4 py-2">{log.action}</td>
              <td className="border px-4 py-2">
                {new Date(log.date).toLocaleString('en-US', {
                  year: 'numeric',
                  month: '2-digit',
                  day: '2-digit',
                  hour: '2-digit',
                  minute: '2-digit',
                  second: '2-digit',
                  hour12: true // This will show the time in 12-hour format with AM/PM
                })}
              </td>
              {/* <td className="border px-4 py-2">{log.ip_address}</td> */}
              <td className="border px-4 py-2">{log.firm_key}</td>
              <td className="border px-4 py-2">{log.current_quarter}</td>
            </tr>
          ))}
        </tbody>
      </Table>
    );
  };

  return (
    <>
      {/* <ToastContainer /> */}
      {loading ? (
        <div className="flex justify-center items-center h-screen">
              <Puff color="red" height={100} width={100} />
            </div>
          ) : (
            
            
      <div className="bg-gray-100 m-0 min-h-screen">
      <div className="flex h-10">
        <div className="w-full text-start">
          <div className="text-xl flex text-start items-start justify-between font-bold bg-white">
            <h1 className="w-[290px] text-right font-medium bg-slate-200 pr-10 pl-0 p-3 border">SELECT A POOL</h1>
            <div className="relative w-full py-0">
              <select
                value={selectedCourse?.course || ""}
                onChange={handleSelectedCourse}
                className="px-3 w-full p-3 border-gray-300 border-0 border-b-2 border-l-2 font-normal appearance-none pl-10"
              >
                {courses.map((course, index) => (
                  <option key={index} value={course.course}>
                    {course.course}
                  </option>
                ))}
              </select>
              <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                <div className="bg-gray-200 border-0 border-l-2 border-l-red-500 w-24 flex justify-center items-center h-[3.25rem] absolute right-0 top-0">
                  <i className="fa-solid fa-chevron-down"></i>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
          

      <div className="px-4 lg:px-10 mt-10 rounded-2xl bg-white py-6 flex flex-col justify-start mx-4">
        {teams.length > 0 && (
          <div className="flex flex-col lg:flex-row items-center lg:space-x-4 mb-6">
            <p className="text-base font-medium">Select a Team</p>
            <div className="mt-2 lg:mt-0 w-full lg:w-auto flex flex-wrap gap-2">
              {teams.map((team, index) => (
                <div
                  key={index}
                  onClick={() => handleTeamSelection({ target: { value: team.teamName } })}
                  className={`px-4 py-2 cursor-pointer rounded-lg border ${selectedTeam?.teamName === team.teamName
                    ? "bg-red-800 text-white "
                    : "bg-gray-100 border-gray-300 text-gray-700"
                    } hover:bg-gray-300 transition-colors`}
                >
                  {team.teamName} <span className="px-2">|</span> {team.users.length || 0} <i className="fa fa-user text-sm pl-1"></i>
                </div>
              ))}
            </div>
          </div>
        )}
        <hr />

        <div className="flex flex-col lg:flex-row items-center lg:space-x-4 mb-6 pt-4">
          <p className="text-base font-medium">Select Quarter</p>
          <div className="mt-2 lg:mt-0 flex space-x-2 lg:space-x-4">
            {Array.from({ length: selectedCourse?.currentQuarter || 0 }, (_, i) => (
              <div
                key={i + 1}
                onClick={() => handleQuarterClick(i + 1)}
                className={`flex items-center justify-center w-8 h-8 rounded-full border border-gray-300 text-gray-700 cursor-pointer ${selectedQuarter === i + 1 ? "bg-red-500 border-red-500 text-white" : "bg-gray-100"
                  }`}
              >
                {i + 1}
              </div>
            ))}
          </div>
        </div>
        <hr />

        {selectedQuarter && selectedTeam && (
          <div className="flex flex-col lg:flex-row items-center lg:space-x-4 mb-6 pt-4">
            <p className="text-base font-medium">Select Decision</p>
            <div className="flex flex-wrap gap-4">
              {decisions.map((decision, index) => (
                <button
                  key={index}
                  onClick={() => handleDecisionClick(decision)}

                  className={`px-4 py-2 text-gray-700 rounded-lg ${selectedDecision === decision ? "bg-red-800 text-white" : "bg-gray-100"
                    } hover:bg-gray-300 border-gray-300 text-gray-700 focus:outline-none`}
                >
                  {decision}
                </button>
              ))}
            </div>
          </div>

        )}
        <hr />

        {loading ? (
          <div className="flex justify-center items-center h-screen">
            <Puff color="#red" height={100} width={100} />
          </div>
        ) : reportData ? (
          <>
            {selectedDecision === "Forecast" && (
              <div className="overflow-auto mt-10">
                {/* Render forecast-related tables when 'Forecast' decision is selected */}
                <ForecastingSalesView data={selectedCourse} repo={reportData} />
                <ForecastingSales2View data={selectedCourse} repo={reportData} />
              </div>
            )}
            {selectedDecision === "Procurement" && (
              <div className="overflow-auto mt-10">
                {/* Render procurement-related tables when 'Procurement' decision is selected */}
                <ProcurementView data={selectedCourse} repo={reportData} />

              </div>
            )}

            {selectedDecision === "Manufacture" && (
              <div className="overflow-auto mt-10">
                {/* Render procurement-related tables when 'Procurement' decision is selected */}
                <ManufactureView data={selectedCourse} repo={reportData} />

              </div>
            )}

            {selectedDecision === "Transportation" && (
              <div className="overflow-auto mt-10">
                {/* Render procurement-related tables when 'Procurement' decision is selected */}
                <TransportView data={selectedCourse} repo={reportData} />
              </div>
            )}

            {selectedDecision === "Demand" && (
              <div className="overflow-auto mt-10">
                {/* Render procurement-related tables when 'Procurement' decision is selected */}
                <DemandView data={selectedCourse.renamedMappedData} repo={reportData} />
              </div>
            )}

            {selectedDecision === "IT" && (
              <div className="overflow-auto mt-10">
                {/* Render procurement-related tables when 'Procurement' decision is selected */}
                <ITView data={selectedCourse} repo={reportData} />
              </div>
            )}

            {selectedDecision === "Service" && (
              <div className="overflow-auto mt-10">
                {/* Render procurement-related tables when 'Procurement' decision is selected */}
                <ServiceView data={selectedCourse} repo={reportData} />
              </div>
            )}

          </>
        ) : (
          <div></div>
        )}

        {/* User Logs Section */}
        <div className="mt-8">
          <h2 className="text-lg font-bold">User Logs</h2>
          {loading ? (
            <div className="flex justify-center items-center">
              <Puff color="red" height={100} width={100} />
            </div>
          ) : (
            renderLogsTable()
          )}
        </div>
      </div>
    </div>
    )}
  </>
  );
};

export default BackOfficeDecision;