import React, { useState } from "react";
import Chart from "react-apexcharts";
import { HStack, Select } from "@chakra-ui/react";
import { useLocation } from "react-router-dom";

import TransportationPreview from "../../Components/Previews/TransportationPreview";

const TransportationDataChart = ({ Dc1Data, submitTransportation }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const location = useLocation();
  const path = location.pathname;

  const toggleModal = () => {
    setIsModalOpen(!isModalOpen);
    // console.log("newsac_units", newsac_units[0].name);
  };
  // eslint-disable-next-line
  const [options, setOptions] = useState({
    chart: {
      id: "area-chart",
    },
    xaxis: {
      categories: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul"],
    },
  });
  // eslint-disable-next-line
  const [series, setSeries] = useState([
    {
      name: "Units Sold",
      data: [1500, 1560, 1700, 1880, 1970, 2160, 1955],
    },
  ]);

  const onSubmit = () => {
    if (path === "/transportation") {
      submitTransportation();
    }
  };
  return (
    <div className="app">
      <div className="row mx-5">
        <div className="mixed-chart flex">
          <Chart options={options} series={series} type="area" width="510" />
          {/* Preview, Reports and submit buttons */}
          <div className="flex flex-col w-[210px] justify-evenly">
            {/* Modal start */}
            <div className="modal-start flex flex-col">
              <button
                onClick={toggleModal}
                data-modal-target="small-modal"
                data-modal-toggle="small-modal"
                className="h-10 w-28 bg-gray-700 text-white rounded-lg  p-1 hover:bg-slate-800 m-2 text-xl cursor-pointer"
                type="button"
              >
                Preview
              </button>

              {isModalOpen && (
                <>
                  {" "}
                  {path === "/transportation" && (
                    <TransportationPreview
                      toggleModal={toggleModal}
                      Dc1Data={Dc1Data}
                    />
                  )}
                </>
              )}

              <button
                onClick={onSubmit}
                className="h-10 w-28 bg-green-700 text-white text-center rounded-lg  p-1.5 hover:bg-green-800 m-2 text-xl cursor-pointer"
              >
                Submit
              </button>
            </div>
            {/* Modal ends */}
          </div>
        </div>
        <HStack spacing={3} ml={9}>
          <Select width="165px" border="1px solid black">
            <option value="">Select Quarter 1</option>
            <option value="">Select Quarter 2</option>
            <option value="">Select Quarter 3</option>
          </Select>
          <Select width="165px" border="1px solid black">
            <option value="">Select Report 1</option>
            <option value="">Select Report 2</option>
            <option value="">Select Report 3</option>
          </Select>
          <button className="h-10  bg-gray-700 text-white  hover:bg-slate-800 text-xl text-center cursor-pointer rounded-lg   p-1.5 w-24 ">
            View
          </button>
        </HStack>
      </div>
    </div>
  );
};

export default TransportationDataChart;
