import { useToast } from "@chakra-ui/react";
import React, { useContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import MyContext from "../Components/ContextApi/MyContext";

const QuarterDetails = () => {
  const noOfQuarters = parseInt(localStorage.getItem("noOfQuarters"));
  const createSimData = JSON.parse(localStorage.getItem("createSimData"));
  const navigate = useNavigate();
  const toast = useToast();

  const { api } = useContext(MyContext);

  const getInitialQuarterState = (startDate, index) => {
    const start = new Date(startDate);
    start.setDate(start.getDate() + index * 4); // Each quarter starts after the previous ends

    const end = new Date(start);
    end.setDate(end.getDate() + 4); // 4 days gap

    return {
      is_procurement: true,
      is_manufacturing: true,
      is_distribution: true,
      is_service: true,
      is_demand_gen: true,
      is_forecasting: true,
      is_it: true,
      is_transportation: true,
      quarter_start_date: start.toISOString().split("T")[0], // Format as YYYY-MM-DD
      quarter_end_date: end.toISOString().split("T")[0], // Format as YYYY-MM-DD
      quarter_start_time: "10:00",
      quarter_end_time: "18:00",
    };
  };

  const startDate = new Date(createSimData?.start_date);
  const initialStartDate = new Date(startDate); // Use the start date from createSimData
  initialStartDate.setDate(initialStartDate.getDate()); // Ensure initial start date is set correctly

  const [quarters, setQuarters] = useState(
    Array.from({ length: noOfQuarters }, (_, index) =>
      getInitialQuarterState(initialStartDate, index)
    )
  );

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

      // If the start date is changed, update subsequent quarters
      if (field === "quarter_start_date") {
        let startDate = new Date(value);
        for (let i = index; i < updatedQuarters.length; i++) {
          if (i > index) {
            startDate.setDate(startDate.getDate() + 4); // Next quarter starts the day after the current ends
          }
          const endDate = new Date(startDate);
          endDate.setDate(endDate.getDate() + 4); // 4 days gap

          updatedQuarters[i] = {
            ...updatedQuarters[i],
            quarter_start_date: startDate.toISOString().split("T")[0],
            quarter_end_date: endDate.toISOString().split("T")[0],
          };
        }
      }
      return updatedQuarters;
    });
  };

  const combineSimData = {
    ...createSimData,
    quarter_specific_decisions: quarters.reduce((prev, quarter, index) => {
      prev[`quarter${index + 1}`] = quarter; // Start from quarter 4
      return prev;
    }, {}),
  };

  localStorage.setItem("combineSimData", JSON.stringify(combineSimData));

  const handleSubmit = async () => {
    try {
      navigate("/createsim?step=3");
    } catch (error) {
      console.log("Error", error.message);
    }
  };

  return (
    <div className="p-6 mx-auto bg-slate-200 rounded-xl shadow-md flex flex-col items-center">
      {quarters.map((quarter, index) => (
        <div key={index} className="mb-6 bg-slate-300 p-4 rounded-xl">
          <h3 className="text-xl font-bold m-2 mx-2">Quarter {index + 1} :</h3> {/* Start from quarter 4 */}
          <div className="grid grid-cols-1 gap-x-4 gap-y-2 ml-14">
            {/* Checkboxes for decisions */}
            <div className="flex flex-col sm:flex-row space-y-2 sm:items-center">
              <label className="text-sm font-semibold mt-2 w-20">
                Decisions:
              </label>
              {Object.keys(quarter)
                .filter((key) => key.startsWith("is_"))
                .map((key) => (
                  <div key={key} className="flex items-center space-x-2 mx-2">
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
                      {(key === "is_procurement" && "Procurement") ||
                        (key === "is_manufacturing" && "Manufacturing") ||
                        (key === "is_distribution" && "Distribution") ||
                        (key === "is_service" && "Service") ||
                        (key === "is_demand_gen" && "Demand Generation") ||
                        (key === "is_forecasting" && "Forecasting") ||
                        (key === "is_it" && "IT") ||
                        (key === "is_transportation" && "Transportation")}
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
                  className="text-sm font-semibold w-20"
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
              <div className="flex flex-col sm:flex-row items-center space-x-3">
                <label
                  htmlFor={`quarter_end_date-${index}`}
                  className="text-sm font-semibold w-20"
                >
                  End Date:
                </label>
                <input
                  id={`quarter_end_date-${index}`}
                  type="date"
                  value={quarter.quarter_end_date}
                  onChange={(e) =>
                    handleDateChange(index, "quarter_end_date", e.target.value)
                  }
                  className="form-input h-10 px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                />
                <label
                  htmlFor={`quarter_end_time-${index}`}
                  className="text-sm font-semibold w-20"
                >
                  End Time:
                </label>
                <input
                  id={`quarter_end_time-${index}`}
                  type="time"
                  value={quarter.quarter_end_time}
                  onChange={(e) =>
                    handleDateChange(index, "quarter_end_time", e.target.value)
                  }
                  className="form-input h-10 px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                />
              </div>
            </div>
          </div>
        </div>
      ))}
      <div className="relative w-[80%] flex justify-end">
        <button
          onClick={handleSubmit}
          className="w-28 h-10 rounded-md text-center text-xl bg-green-500 text-white"
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default QuarterDetails;
