import { useState, useEffect, useContext } from "react";
import axios from "axios";
import MyContext from "../../../Components/ContextApi/MyContext";
import ReportModal from "../../../report/CplReport/ReportModal";
import BalanceSheetModel from "../../../report/BlanceSheetReport/BalanceSheetModel";
import FGInventoryModal from "../../../report/FinishedGoodsInventoryReport/FGInventoryModal";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css"; // Import Toast styles
import { Puff } from "react-loader-spinner";

const BackOfficeUser = () => {
  const [users, setUsers] = useState([]);
  const [teams, setTeams] = useState([]); // State to store teams/firms
  const [loading, setLoading] = useState(false);
  const [selectedCourse, setSelectedCourse] = useState(null);
  const [selectedTeam, setSelectedTeam] = useState(null); // State to store selected team
  const [courses, setCourses] = useState([]);
  const [selectedQuarter, setSelectedQuarter] = useState(null);
  const [reportData, setReportData] = useState(null);
  const [activeReport, setActiveReport] = useState(null);
  const { api } = useContext(MyContext);

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const user = JSON.parse(localStorage.getItem("user"));
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
          currentQuarter: item.simulation.current_quarter, // Ensure current quarter is present
        }));
        setCourses(transformedCourses);

        // Set the first course as selected by default
        if (transformedCourses.length > 0) {
          setSelectedCourse(transformedCourses[0]);
        }
        toast.success("Courses fetched successfully!");
      } catch (error) {
        toast.error("Error fetching courses.");
        console.error("Error fetching the courses:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchCourses();
  }, [api]);
  const handleSelectedCourse = (e) => {
    const selectedCourse = courses.find((course) => course.course === e.target.value);
    setSelectedCourse(selectedCourse);
    setTeams([]); // Clear the teams when a new course is selected
    setSelectedTeam(null); // Reset team selection when a new course is selected
  };
  
  useEffect(() => {
    const fetchTeams = async () => {
      if (!selectedCourse?.passcode) return;
  
      try {
        setLoading(true);
        setTeams([]); // Clear teams when fetching new ones to avoid displaying old data
        const response = await axios.get(`${api}/get-firms/${selectedCourse.passcode}/`);
        const flattenedTeams = response.data.map((firm) => ({
          teamName: firm.firm_key,
          users: firm.users,
        }));
        setTeams(flattenedTeams);
        console.log(flattenedTeams);
        console.log(teams);
        
        
        toast.success("Teams fetched successfully!");
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

  const handleTeamSelection = (e) => {
    const selectedTeam = teams.find((team) => team.teamName === e.target.value);
    setSelectedTeam(selectedTeam);
  };

  const handleQuarterClick = (quarter) => {
    setSelectedQuarter(quarter);
  };

  const handleReportChange = async (reportType) => {
    if (!selectedQuarter || !selectedCourse?.simulationId || !selectedTeam?.teamName) return;

    const queryParams = new URLSearchParams({
      simulation_id: selectedCourse.simulationId,
      quarter: selectedQuarter,
      passcode: selectedCourse.passcode,
      firm: selectedTeam.teamName, // Pass the selected team to the report API
    }).toString();

    const url = `${api}/reports/${reportType}/?${queryParams}`;

    try {
      setLoading(true);
      const response = await axios.get(url);
      localStorage.setItem("reportData", JSON.stringify(response.data));
      setReportData(response.data);
      setActiveReport(reportType);
      toast.success(`${reportType} report fetched successfully!`);
      setLoading(false);

    } catch (error) {
      toast.error("Error fetching report.");
      console.error("Error fetching report data:", error);
      setLoading(false);

    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <Puff color="#00BFFF" height={100} width={100} />
      </div>
    );
  }

  if (!selectedCourse) {
    return <p className="text-gray-500">No course selected. Please select a course from the dropdown.</p>;
  }

  return (
    <div className="bg-gray-100 m-0 h-screen">
      <div className="flex h-10">
        <div className="w-full text-start">
          <div className="text-xl flex text-start items-start justify-between font-bold bg-white">
            <h1 className="w-[290px] text-right font-medium bg-slate-200 pr-10 pl-0 p-3 border">
              SELECT A POOL
            </h1>
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

      {/* Team Selection */}
      <div className="px-4 lg:px-10 mt-10 rounded-2xl bg-white py-6 flex flex-col justify-start  mx-4">
        {teams.length > 0 && (
          <div className="flex flex-col lg:flex-row items-center lg:space-x-4 mb-6">
            <p className="text-base font-medium">Select a Team</p>
            <div className="mt-2 lg:mt-0 w-full lg:w-auto flex flex-wrap gap-2">
              {teams.map((team, index) => (
                <div
                  key={index}
                  onClick={() => handleTeamSelection({ target: { value: team.teamName } })}
                  className={`px-4 py-2 cursor-pointer rounded-lg border ${
                    selectedTeam?.teamName === team.teamName
                      ? "bg-red-800 text-white"
                      : "bg-gray-100 border-gray-300 text-gray-700"
                  } hover:bg-gray-300 transition-colors`}
                >
                 {team.teamName}  <span className="px-2">|</span> {team.users.length || 0} <i className="fa fa-user text-sm pl-1"></i>
                </div>
              ))}
            </div>
          </div>
        )}
        <hr />
        {/* Quarter Selection */}
        <div className="flex flex-col lg:flex-row items-center lg:space-x-4 mb-6 pt-4">
          <p className="text-base font-medium">Select Quarter </p>
          <div className="mt-2 lg:mt-0 flex space-x-2 lg:space-x-4">
            {Array.from({ length: selectedCourse?.currentQuarter || 0 }, (_, i) => (
              <div
                key={i + 1}
                onClick={() => handleQuarterClick(i + 1)}
                className={`flex items-center justify-center w-8 h-8 rounded-full border border-gray-300 text-gray-700 cursor-pointer ${selectedQuarter === i + 1
                  ? "bg-red-500 border-red-500 text-white"
                  : "bg-gray-100"
                  }`}
              >
                {i + 1}
              </div>
            ))}
          </div>
        </div>
        <hr />

        {/* Report Buttons */}
        {selectedQuarter && selectedTeam && (
          <div className="flex flex-col lg:flex-row items-center lg:space-x-4 mb-6 pt-4 ">
            <p className="text-base font-medium">Select Report </p>
            {/* <div className="grid grid-cols-1 sm:grid-cols-1 gap-2 w-full"> */}
              <button
                onClick={() => handleReportChange("cpl")}
                className="w-full lg:w-auto py-2 px-4 text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-300 focus:outline-none"
              >
                Corporate P&L
              </button>
              <button
                onClick={() => handleReportChange("bls")}
                className="w-full lg:w-auto py-2 px-4 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-300 focus:outline-none"
              >
                Balance Sheet
              </button>
              <button
                onClick={() => handleReportChange("inventory")}
                className="w-full lg:w-auto py-2 px-4 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-300 focus:outline-none"
              >
                Finished Goods Inventory
              </button>
            </div>
          // </div>
        )}

        {/* Report Display */}
        {activeReport === "cpl" && reportData && <ReportModal reportData={reportData} />}
        {activeReport === "bls" && reportData && <BalanceSheetModel reportData={reportData} />}
        {activeReport === "inventory" && reportData && <FGInventoryModal reportData={reportData} />}
      </div>
    </div>
  );
};

export default BackOfficeUser;