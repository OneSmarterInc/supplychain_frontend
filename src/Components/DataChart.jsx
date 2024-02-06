import React, { useState } from "react";
import Chart from "react-apexcharts";

const DataChart = ({ newData }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const toggleModal = () => {
    setIsModalOpen(!isModalOpen);
  };
  // eslint-disable-next-line
  const [options, setOptions] = useState({
    chart: {
      id: "area-chart",
    },
    xaxis: {
      categories: [
        "Jan",
        "Feb",
        "Mar",
        "Apr",
        "May",
        "Jun",
        "Jul",
        "Aug",
        "Sep",
        "Oct",
        "Nov",
        "Dec",
      ],
    },
  });
  // eslint-disable-next-line
  const [series, setSeries] = useState([
    {
      name: "Units Sold",
      data: [50, 60, 70, 80, 70, 60, 55, 65, 80, 85, 90, 100],
    },
  ]);
  return (
    <div className="app">
      <div className="row mx-5">
        <div className="mixed-chart">
          <Chart options={options} series={series} type="area" width="510" />
        </div>
      </div>
      <div className="flex flex-row w-[510px] justify-evenly">
        {/* Modal start */}
        <div className="modal-start flex">
          {/* Modal toggle */}
          <button
            onClick={toggleModal}
            data-modal-target="small-modal"
            data-modal-toggle="small-modal"
            className="h-10 bg-slate-400 rounded-lg p-2 text-black text-center text-xl cursor-pointer  ease-in duration-150  place-items-start hover:cursor-pointer active:bg-violet-700 focus:bg-violet-500 active:outline-none hover:ring hover:ring-violet-400 mx-2 p-auto"
            type="button"
          >
            Preview
          </button>

          {/* Main modal */}
          {isModalOpen && (
            <div
              id="default-modal"
              tabIndex="-1"
              aria-hidden="true"
              className="fixed top-0 right-0 left-0 z-50 flex justify-center items-center w-full h-screen"
            >
              <div className="relative p-4 w-96 max-w-2xl max-h-full">
                {/* Modal content */}
                <div className="relative bg-white rounded-lg shadow dark:bg-gray-700">
                  {/* Modal header */}
                  <div className="flex items-center justify-between p-2 border-b rounded-t dark:border-gray-600">
                    <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                      Details
                    </h3>
                    <button
                      onClick={toggleModal}
                      type="button"
                      className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white"
                      data-modal-hide="default-modal"
                    >
                      <span className="sr-only">Close modal</span>
                    </button>
                  </div>
                  {/* Modal body */}
                  <div className="p-4 py-2 md:p-5 md:py-2 space-y-3">
                    <div className="text-base text-start leading-relaxed text-gray-500 dark:text-gray-400">
                      <p className="text-xl py-2">
                        <span className="underline font-bold pr-10">User:</span>{" "}
                        <span>{newData.name}</span>
                      </p>
                      <p className="text-xl py-2">
                        <span className="underline font-bold pr-1">
                          Supplier:
                        </span>{" "}
                        <span>{newData.supplier}</span>
                      </p>
                      <p className="text-xl py-2">
                        <span className="underline font-bold pr-2 ">
                          Medium:
                        </span>{" "}
                        <span>{newData.medium}</span>
                      </p>
                      <p className="text-xl py-2">
                        <span className="underline font-bold pr-1">
                          Demand:
                        </span>{" "}
                        <span>15000</span>
                      </p>
                      <p className="text-xl py-2">
                        <span className="underline font-bold pr-8">Units:</span>{" "}
                        <span>{newData.units}</span>
                      </p>
                    </div >
                  </div>
                  {/* Modal footer */}
                  <div className="flex justify-end items-center p-4 md:p-3 border-t border-gray-200 rounded-b dark:border-gray-600">
                    <button
                      onClick={toggleModal}
                      type="button"
                      className="h-10 bg-slate-400 rounded-lg p-2 text-black text-center text-xl cursor-pointer  ease-in duration-150  place-items-start hover:cursor-pointer active:bg-violet-700 focus:bg-violet-500 active:outline-none hover:ring hover:ring-violet-400 mx-2 p-auto"
                      data-modal-hide="default-modal"
                    >
                      All Fine
                    </button>
                    <button
                      onClick={toggleModal}
                      type="button"
                      className="ms-3 text-gray-500 bg-white hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-blue-300 rounded-lg border border-gray-200 text-sm font-medium px-5 py-2.5 hover:text-gray-900 focus:z-10 dark:bg-gray-700 dark:text-gray-300 dark:border-gray-500 dark:hover:text-white dark:hover:bg-gray-600 dark:focus:ring-gray-600"
                      data-modal-hide="default-modal"
                    >
                      Decline
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}
          <div className=" h-10 bg-slate-400 rounded-lg p-2 text-black text-center text-xl cursor-pointer  ease-in duration-150  place-items-start hover:cursor-pointer active:bg-violet-700 focus:bg-violet-500 active:outline-none hover:ring hover:ring-violet-400 mx-2 p-auto">
            Submit
          </div>
        </div>
        {/* Modal ends */}

        <div className=" h-10 bg-slate-400 rounded-lg p-2 text-black text-center text-xl cursor-pointer  ease-in duration-150  place-items-start hover:cursor-pointer active:bg-violet-700 focus:bg-violet-500 active:outline-none hover:ring hover:ring-violet-400 mx-2 p-auto">
          Reports
        </div>
      </div>
    </div>
  );
};

export default DataChart;
