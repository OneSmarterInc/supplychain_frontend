import { useToast } from "@chakra-ui/react";
import React, { useContext, useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import MyContext from "../Components/ContextApi/MyContext";
import axios from "axios";

const EditQuartersDetails = ({ quarter_specific_decisions, simulation_id }) => {
  const navigate = useNavigate();
  const toast = useToast();
  const { api } = useContext(MyContext);
  const bottomRef = useRef(null);

  const getInitialQuarterState = (start, index) => {
    const startDate = new Date(start);
    const endDate = new Date(startDate);
    endDate.setDate(endDate.getDate() + 4); // 4 days gap

    return {
      is_procurement: true,
      is_manufacturing: true,
      is_distribution: true,
      is_service: true,
      is_demand_gen: true,
      is_forecasting: true,
      is_it: true,
      is_transportation: true,
      quarter_start_date: startDate.toISOString().split("T")[0], // Format as YYYY-MM-DD
      quarter_end_date: endDate.toISOString().split("T")[0], // Format as YYYY-MM-DD
      quarter_start_time: "10:00",
      quarter_end_time: "18:00",
    };
  };

  const startDate = new Date(
    quarter_specific_decisions?.quarter4?.quarter_start_date
  );
  const initialStartDate = new Date(startDate);

  const initialQuarters = quarter_specific_decisions
    ? Object.values(quarter_specific_decisions)
    : Array.from((_, index) => getInitialQuarterState(initialStartDate, index));

  const [quarters, setQuarters] = useState(initialQuarters);

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

      if (field === "quarter_start_date") {
        let startDate = new Date(value);
        for (let i = index; i < updatedQuarters.length; i++) {
          if (i > index) {
            startDate.setDate(startDate.getDate() + 4);
          }
          const endDate = new Date(startDate);
          endDate.setDate(endDate.getDate() + 4);

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

  const addQuarter = () => {
    setQuarters((prevQuarters) => {
      const lastQuarter = prevQuarters[prevQuarters.length - 1];
      const newQuarterStartDate = new Date(lastQuarter.quarter_end_date);

      const newQuarters = [
        ...prevQuarters,
        getInitialQuarterState(newQuarterStartDate, prevQuarters.length),
      ];

      setTimeout(() => {
        bottomRef.current.scrollIntoView({ behavior: "smooth" });
      }, 0);

      return newQuarters;
    });
  };

  const deleteQuarter = (index) => {
    setQuarters((prevQuarters) => {
      const updatedQuarters = prevQuarters.filter((_, i) => i !== index);
      return updatedQuarters;
    });
  };

  const updated_quarter_specific_decisions = {
    quarter_specific_decisions: quarters.reduce((prev, quarter, index) => {
      prev[`quarter${index + 4}`] = quarter; // Start from quarter 4
      return prev;
    }, {}),
  };

  localStorage.setItem(
    "updated_quarter_specific_decisions",
    JSON.stringify(updated_quarter_specific_decisions)
  );
  console.log(
    "updated_quarter_specific_decisions",
    updated_quarter_specific_decisions
  );

  const handleSubmit = async () => {
    try {
      await axios.post(`${api}/update-quarter-specific-decision/`, {
        simulation_id: simulation_id,
        quarter_specific_decision:
          updated_quarter_specific_decisions.quarter_specific_decisions,
      });
      toast({
        title: "Success",
        description: "Quarter details updated successfully.",
        status: "success",
        duration: 5000,
        isClosable: true,
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "An error occurred while updating quarter details.",
        status: "error",
        duration: 5000,
        isClosable: true,
      });
    }
  };

  return (
    <div className="p-2 mx-auto bg-slate-200 text-white rounded-xl flex flex-col justify-start items-center">
      {quarters.map((quarter, index) => (
        <div
          key={index}
          className="mb-3 bg-blue-gray-800 bg-slate-300 p-4 py-2 pb-3 rounded-xl"
        >
          <div className="flex justify-between w-full">
            <h3 className="text-xl font-bold mx-2">Quarter {index + 4} :</h3>{" "}
            <button
              onClick={() => deleteQuarter(index)}
              className="my-2 px-2 py-1 bg-red-500 text-white rounded-md"
            >
              Delete Quarter
            </button>
          </div>
          <div className="grid grid-cols-1 gap-x-4 gap-y-2 ml-14">
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
            <div className="flex flex-col">
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
                  className="form-input text-black h-10 px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
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
                  className="form-input text-black h-10 px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                />
              </div>
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
                  className="form-input h-10 px-3 py-2 border text-black border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
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
                  className="form-input text-black h-10 px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                />
              </div>
            </div>
          </div>
        </div>
      ))}
      <div ref={bottomRef} className="w-full flex justify-end">
        <button
          onClick={addQuarter}
          className="rounded-md text-center text-md p-1 bg-blue-500 text-white mr-4"
        >
          Add Quarter
        </button>
        <button
          onClick={handleSubmit}
          className="w-24 rounded-md text-center text-md p-1 bg-green-500 text-white"
        >
          Save
        </button>
      </div>
    </div>
  );
};

export default EditQuartersDetails;
