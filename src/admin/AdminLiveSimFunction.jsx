import { Select, Text, HStack, useToast } from "@chakra-ui/react";
import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import Chart from "react-apexcharts"; // Ensure you've installed react-apexcharts
import { useNavigate } from "react-router-dom";
import MyContext from "../Components/ContextApi/MyContext";
import ReportModal from "../report/CplReport/ReportModal";
import ProductReportModal from "../report/ProductReport/ProductReportModel";
import FGInventoryModal from "../report/FinishedGoodsInventoryReport/FGInventoryModal";
import EvaluationReportModal from "../report/EvaluationReport/EvaluationReportModal";

const AdminSideLiveFunction = ({
  id,
  batch,
  startDate,
  endDate,
  currentQuarter,
}) => {
  let navigate = useNavigate();
  let simData = localStorage.getItem("simData");

  const { api } = useContext(MyContext);
  simData = JSON.parse(simData);
  const toast = useToast();
  const filteredSimulation = simData.filter(
    (item) => item.simulation_id === parseInt(id)
  );
  localStorage.setItem("selectedSim", JSON.stringify(filteredSimulation));

  const [isReportModalOpen, setIsReportModalOpen] = useState(false);
  const [firstDropdownValue, setFirstDropdownValue] = useState("1");
  const [secondDropdownValue, setSecondDropdownValue] = useState("");

  let user = localStorage.getItem("user");
  user = JSON.parse(user);
  const [isAddAdminInputModalOpen, setIsAddAdminInputModalOpen] =
    useState(false);
  const [isAddUserInputModalOpen, setIsAddUserInputModalOpen] = useState(false);
  const [isFirmModalOpen, setIsFirmModalOpen] = useState(false);
  const [newAdminEmail, setNewAdminEmail] = useState("");
  const [newUserEmail, setNewUserEmail] = useState("");
  const [selectedFirm, setSelectedFirm] = useState(null);

  const firm_key = Object.keys(filteredSimulation[0]?.firm_data)[0];

  let firm_key_new = "";
  if (filteredSimulation[0]?.firm_data.length) {
    let firm_obj = filteredSimulation[0]?.firm_data.filter((item, index) => {
      return item.emails.includes(user.email);
    });
    if (firm_obj.length) {
      firm_key_new = firm_obj[0].firmName; //note: only one user in one firm so using firm_obj[0]
    }
  }
  console.log("Firm Key admin Live Sim: -------", firm_key_new);

  const option = [];
  for (let i = 1; i <= filteredSimulation[0]?.current_quarter-1; i++) {
    option.push(
      <option key={i} value={i}>
        Select Quarter {i}
      </option>
    );
  }

  const toggleModal = () => {
    setIsReportModalOpen(!isReportModalOpen);
  };

  const handleQuarterSelectChange = (e) => {
    setFirstDropdownValue(e.target.value);
  };

  const handleButtonClick = async (e) => {
    const newDropdownValue = e.target.value;
    setSecondDropdownValue(newDropdownValue);

    // Construct the query parameters
    const queryParams = new URLSearchParams({
      simulation_id: filteredSimulation[0]?.simulation_id,
      quarter: firstDropdownValue,
      firm: Object.keys(simData[0]?.firm_data)[0],
    }).toString();

    // Append the query parameters to the URL
    const url = `${api}/reports/${
      newDropdownValue ? newDropdownValue : "cpl"
    }/?${queryParams}`;

    // Make a GET request with the constructed URL
    try {
      const response = await axios.get(url);
      // console.log("GET request successful", response.data);
      localStorage.setItem("reportData", JSON.stringify(response.data));
    } catch (error) {
      console.error("Error making GET request:", error);
    }
  };

  const addAdminInputModal = () => {
    setIsAddAdminInputModalOpen(!isAddAdminInputModalOpen);
  };

  const addUserInputModal = () => {
    setIsAddUserInputModalOpen(!isAddUserInputModalOpen);
  };

  useEffect(() => {
    firmsFetch();
  }, []);

  const handleAddAdmin = async () => {
    try {
      const response = await axios.post(`${api}/addadmin/`, {
        params: {
          admin_id: user.userid,
          simulation_id: filteredSimulation[0]?.simulation_id,
          email: newAdminEmail,
        },
      });
      // console.log("Admin added:", response.data);
      setIsAddAdminInputModalOpen(false);
      setNewAdminEmail("");
      toast({
        title: "Admin Added Successful",
        status: "success",
        duration: 9000,
        isClosable: true,
        position: "top",
      });
    } catch (error) {
      console.error("Error adding admin:", error);
    }
  };

  const handleAddUser = async () => {
    try {
      const response = await axios.post(
        `${api}/firmsbyadmin/?admin_id=${user.userid}&email=${newUserEmail}&firm_key=${selectedFirm.firm_key}&simulation_id=${filteredSimulation[0]?.simulation_id}`
      );
      // console.log("User added:", response.data);
      setIsAddUserInputModalOpen(false);
      setNewUserEmail("");
      toast({
        title: "User Added Successful",
        status: "success",
        duration: 9000,
        isClosable: true,
        position: "top",
      });
    } catch (error) {
      console.error("Error adding admin:", error);
    }
  };

  const [firms, setFirms] = useState([]);
  const firmsFetch = async () => {
    try {
      const response = await axios.get(`${api}/firmsbyadmin/`, {
        params: {
          admin_id: user.userid,
          simulation_id: filteredSimulation[0]?.simulation_id,
          firm_key: firm_key_new,
          email: user.email,
        },
      });
      // console.log("Firms by admin:", response.data);
      setFirms(response.data);
    } catch (error) {
      console.error("Error adding admin:", error);
    }
  };

  const handleFirmsUsers = (firmdata) => {
    setSelectedFirm(firmdata);
    setIsFirmModalOpen(!isFirmModalOpen);
  };
  
  return (
    <div className="flex h-80 pl-96 bg-slate-200 justify-start items-center bg-blue-gray-900">
      <div className="info min-w-[700px] p-4 bg-blue-gray-800">
        <div className="text-3xl w-full  flex items-center justify-between">
          <div className="flex text-white items-center ">
            <h1 className="text-3xl"> {batch} |</h1>
            <span className="text-3xl p-2">Quarter : {currentQuarter}</span>
          </div>
          <button
            onClick={addAdminInputModal}
            className="ml-4 text-lg h-10 bg-blue-500 text-white p-1 px-2 rounded-lg hover:bg-blue-700"
          >
            Add Admin
          </button>
          <button
            // onClick={addAdminInputModal}
            className="text-lg h-10 bg-green-500 text-white p-1 px-2 rounded-lg hover:bg-green-700"
            onClick={()=>{navigate('/usersidelive')}}
          >
            User Side
          </button>
        </div>

        <p className="text-base p-3 text-blue-gray-500">
          start Date {startDate} | End Date {endDate}
        </p>

        {isAddAdminInputModalOpen && (
          <div className="modal bg-white p-4 rounded-lg w-fit m-3 shadow-lg mt-4">
            <input
              type="email"
              value={newAdminEmail}
              onChange={(e) => setNewAdminEmail(e.target.value)}
              placeholder="Enter admin email"
              className="p-2 border-2 border-gray-300 w-96 rounded-lg"
            />
            <button
              onClick={handleAddAdmin}
              className="ml-4 w-24 bg-green-500 text-white p-2 rounded-lg hover:bg-green-700"
            >
              Add
            </button>
          </div>
        )}

        <div className="relative flex items-center bg-blue-gray-700 p-3">
          {firms?.map((firmsdata) => {
            return (
              <button
                key={firmsdata.firm_key}
                className="w-40 h-10 rounded-lg bg-green-600 text-white text-center p-2 m-2 hover:bg-sky-950"
                onClick={() => {
                  handleFirmsUsers(firmsdata);
                }}
              >
                {firmsdata ? firmsdata.firm_key : "Unknown Firm"}
              </button>
            );
          })}

          {isFirmModalOpen && selectedFirm && (
            <div className="modal z-50 bg-white p-4 rounded-lg   fixed top-24 w-[800px] shadow-lg mt-4 ">
              <div className="buttons my-2 flex  items-center justify-between">
                <h2 className="text-2xl font-bold mb-4">
                  Users of{" "}
                  <span className="text-green-600">
                    {selectedFirm.firm_key}
                  </span>
                </h2>
                <div className="flex  items-center space-x-3">
                  <button
                    onClick={toggleModal}
                    className="w-28 h-10 rounded-lg bg-green-600 text-white text-center p-2 hover:bg-green-700"
                  >
                    Reports
                  </button>
                  <h2
                    onClick={() => {
                      setIsFirmModalOpen(false);
                    }}
                    className="flex justify-end text-red-300 cursor-pointer"
                  >
                    close
                  </h2>
                </div>
              </div>
              <div className="h-80  overflow-y-scroll">
                {selectedFirm.users.map((user) => (
                  <div className="p-4 bg-white shadow-md rounded-lg">
                    <div
                      key={user.user_id}
                      className="mb-4 flex items-center space-x-4"
                    >
                      <h1 className="text-3xl text-blue-500">
                        <i className="fa-solid fa-user"></i>
                      </h1>
                      <div className="">
                        <p className="text-lg font-semibold text-gray-700">
                          UserID:{" "}
                          <span className="font-normal">{user.user_id}</span>
                        </p>
                        <p className="text-lg font-semibold text-gray-700">
                          Email:{" "}
                          <span className="font-normal">{user.email}</span>
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              <div className="">
                {" "}
                <div className="flex items-center">
                  <div className="h-28 flex items-center">
                    <button
                      onClick={addUserInputModal}
                      className="ml-4 text-lg bg-blue-500 text-white p-1 h-10 px-2 rounded-lg hover:bg-blue-700"
                    >
                      Add User
                    </button>
                  </div>
                  {isAddUserInputModalOpen && (
                    <div className="modal bg-white p-4 rounded-lg w-fit m-3 shadow-lg mt-4">
                      <input
                        type="email"
                        value={newUserEmail}
                        onChange={(e) => setNewUserEmail(e.target.value)}
                        placeholder="Enter User email"
                        className="p-2 border-2 border-gray-300 w-96 rounded-lg"
                      />
                      <button
                        onClick={handleAddUser}
                        className="ml-4 w-24 bg-green-500 text-white p-2 rounded-lg hover:bg-green-700"
                      >
                        Add
                      </button>
                    </div>
                  )}
                </div>
              </div>
            </div>
          )}
        </div>
        {/* <button
            className="w-32 h-10 rounded-lg bg-blue-600 text-white text-center p-2 mx-2 hover:bg-sky-950"
            onClick={handleSubmit}
          >
            Enter
          </button> */}
      </div>
      <div className="graph">
        <div className="mixed-chart pt-4">
          {/* <Chart options={options} series={series} type="area" width="450" /> */}
        </div>
      </div>
      {isReportModalOpen && (
        <>
          <div
            className="fixed inset-0 bg-black bg-opacity-50 z-40"
            onClick={toggleModal}
          ></div>
          <div className="fixed inset-0 z-50 flex items-center justify-center">
            <div className="bg-white rounded-lg shadow-xl p-6 w-2/3 max-w-xl">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-2xl font-bold">Select Reports</h2>
                <button
                  className="text-red-600 font-bold"
                  onClick={toggleModal}
                >
                  X
                </button>
              </div>
              <HStack spacing={3}>
                <Select
                  width="165px"
                  border="1px solid black"
                  onChange={(e) => handleQuarterSelectChange(e)}
                  value={firstDropdownValue}
                >
                  {option}
                </Select>
                <Select
                  width="165px"
                  border="1px solid black"
                  onChange={(e) => handleButtonClick(e)}
                  value={secondDropdownValue}
                >
                  {" "}
                  <option value="">Select</option>
                  <option value="cpl">Corporate P&L Statement</option>
                  {/* <option value="pcpl">Hyperware P&L Statement</option>
                  <option value="inventory">
                    Finished Goods Inventory Report
                  </option> */}
                </Select>
              </HStack>
              <div className="mt-4 flex">
                {secondDropdownValue === "cpl" && <ReportModal />}
                {secondDropdownValue === "pcpl" && <ProductReportModal />}
                {secondDropdownValue === "inventory" && <FGInventoryModal />}\
                <div className="px-5">
                  {" "}
                  <EvaluationReportModal />
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default AdminSideLiveFunction;
