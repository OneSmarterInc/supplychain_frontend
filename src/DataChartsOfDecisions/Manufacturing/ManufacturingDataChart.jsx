import React, { useState } from "react";
import Chart from "react-apexcharts";
import { HStack, Select } from "@chakra-ui/react";
import { useLocation } from "react-router-dom";

import ManufacturingPreview from "../../Components/Previews/ManufacturingPreview";
import ReportComponent from "../../report/ReportComponent";
import CommonGraph from "../CommonGraph";

const ManufacturingDataChart = ({
  submitManufacturing,
  ManufacturingDataPreview,
}) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const location = useLocation();
  const path = location.pathname;

  const toggleModal = () => {
    setIsModalOpen(!isModalOpen);
    // console.log("newsac_units", newsac_units[0].name);
  };

  const onSubmit = () => {
    if (path === "/manufacturing") {
      submitManufacturing();
    }
  };
  return (
    <div className="app">
      <div className="row mx-5">
        <div className="mixed-chart flex">
          <div className="w-[530px] h-60 mb-10 ">
            <CommonGraph />
          </div>

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
                  {path === "/manufacturing" && (
                    <ManufacturingPreview
                      toggleModal={toggleModal}
                      ManufacturingDataPreview={ManufacturingDataPreview}
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

        <ReportComponent />
      </div>
    </div>
  );
};

export default ManufacturingDataChart;
