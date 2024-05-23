import { useToast } from "@chakra-ui/react";
import axios from "axios";
import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import MyContext from "../Components/ContextApi/MyContext";

const QuarterDetails = ({simulationData}) => {
  const noOfQuarters = localStorage.getItem("noOfQuarters");
  const navigate = useNavigate();
  const toast = useToast();

  const { api } = useContext(MyContext);
  toast({
    title: "Email Sent successful",
    status: "success",
    duration: 2000,
    isClosable: true,
    position: "top",
  });
  const initialQuarterState = {
    is_procurement: true,
    is_manufacturing: true,
    is_distribution: true,
    is_service: true,
    is_demand_gen: true,
    is_forecasting: true,
    is_it: true,
    quarter_start_date: "",
    quarter_end_date: "",
    quarter_start_time: "0:00",
    quarter_end_time: "0:00",
  };

  const [quarters, setQuarters] = useState(
    Array.from({ length: noOfQuarters }, () => ({ ...initialQuarterState }))
  );
  console.log("quarters data", quarters);
  const combineSimData = { ...simulationData, quartersData: quarters };
  console.log("Combine Sim Data:--", combineSimData);

  const handleCheckboxChange = (index, field) => {
    setQuarters((prevQuarters) => {
      const updatedQuarters = [...prevQuarters];
      updatedQuarters[index][field] = !updatedQuarters[index][field];
      return updatedQuarters;
    });
  };

  const handleDateChange = (index, field, value) => {
    setQuarters((prevQuarters) => {
      const updatedQuarters = [...prevQuarters];
      updatedQuarters[index] = {
        ...updatedQuarters[index],
        [field]: value,
      };
      return updatedQuarters;
    });
  };

  const handleSubmit = async () => {
    if (combineSimData.total_quarters) {
      try {
        const response = await axios.post(
          `${api}/simulations/simulation/`,
          combineSimData
        );
        console.log("Success:", response.data);
      } catch (error) {
        console.error("Error submitting form:", error);
      }
    } else {
      alert("Please Enter Quarters");
    }
    try {
      //here we have to sumbit post request using axios
      navigate("/createsim?step=3");
    } catch (error) {
      console.log("Error", error.message);
    }
  };

  return (
    <div className="p-6 mx-auto bg-slate-200 rounded-xl shadow-md flex flex-col items-center">
      {quarters.map((quarter, index) => (
        <>
          <div key={index} className="mb-6 bg-slate-300 p-4 rounded-xl ">
            <h3 className="text-xl font-bold m-2 mx-2">
              Quarter {index + 1} :
            </h3>
            <div className="grid grid-cols-1 gap-x-4 gap-y-2 ml-14">
              {/* Checkboxes for decisions */}
              <div className="flex flex-col sm:flex-row space-y-2 sm:items-center">
                <label className="text-sm font-semibold mt-2 w-20">
                  Decisions:
                </label>
                {Object.keys(initialQuarterState)
                  .filter((key) => key.startsWith("is_"))
                  .map((key) => (
                    <div
                      key={key}
                      className="flex items-center space-x-2 mx-2 "
                    >
                      <input
                        id={`${key}-${index}`}
                        type="checkbox"
                        checked={quarter[key]}
                        onChange={() => handleCheckboxChange(index, key)}
                        className="form-checkbox h-5 w-5 text-blue-600"
                        color="red"
                      />
                      <label
                        className="cursor-pointer"
                        htmlFor={`${key}-${index}`}
                      >
                        {key}
                      </label>
                    </div>
                  ))}
              </div>

              {/* Date and Time */}
              <div className="flex flex-col">
                {/* Start date and time input */}
                <div className="flex flex-col sm:flex-row items-center space-x-3 my-3">
                  <label
                    htmlFor={`quarter_start_date-${index}`}
                    className="text-sm font-semibold w-20"
                  >
                    Start Date:
                  </label>
                  <input
                    id={`quarter_start_date-${index}`}
                    type="date"
                    value={quarter.quarter_start_date}
                    onChange={(e) =>
                      handleDateChange(
                        index,
                        "quarter_start_date",
                        e.target.value
                      )
                    }
                    className="form-input h-10 px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  />
                  <label
                    htmlFor={`quarter_start_time-${index}`}
                    className="text-sm font-semibold  w-20"
                  >
                    Start Time:
                  </label>
                  <input
                    id={`quarter_start_time-${index}`}
                    type="time"
                    value={quarter.quarter_start_time}
                    onChange={(e) =>
                      handleDateChange(
                        index,
                        "quarter_start_time",
                        e.target.value
                      )
                    }
                    className="form-input h-10 px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  />
                </div>

                {/* End date and time input */}
                <div className="flex flex-col sm:flex-row  items-center space-x-3">
                  <label
                    htmlFor={`quarter_end_date-${index}`}
                    className="text-sm font-semibold  w-20"
                  >
                    End Date:
                  </label>
                  <input
                    id={`quarter_end_date-${index}`}
                    type="date"
                    value={quarter.quarter_end_date}
                    onChange={(e) =>
                      handleDateChange(
                        index,
                        "quarter_end_date",
                        e.target.value
                      )
                    }
                    className="form-input h-10 px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  />
                  <label
                    htmlFor={`quarter_end_time-${index}`}
                    className="text-sm font-semibold  w-20"
                  >
                    End Time:
                  </label>
                  <input
                    id={`quarter_end_time-${index}`}
                    type="time"
                    value={quarter.quarter_end_time}
                    onChange={(e) =>
                      handleDateChange(
                        index,
                        "quarter_end_time",
                        e.target.value
                      )
                    }
                    className="form-input h-10 px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  />
                </div>
              </div>
            </div>
          </div>
        </>
      ))}
      {/* //tmpporary button for each quarter */}
      <div className="relative flex justify-end">
        <button
          onClick={handleSubmit}
          className="w-28 h-10 rounded-xl text-center text-xl bg-green-500 text-white "
        >
          Submit
        </button>
      </div>
    </div>
  );
};

export default QuarterDetails;
