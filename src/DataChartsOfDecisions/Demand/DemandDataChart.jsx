import React, { useContext, useEffect, useState } from "react";
import Chart from "react-apexcharts";
import { HStack, Select } from "@chakra-ui/react";
import { useLocation } from "react-router-dom";
import TransportationPreview from "../../Components/Previews/TransportationPreview";
import DemandPreview from "../../Components/Previews/DemandPreview";
import axios from "axios";
import MyContext from "../../Components/ContextApi/MyContext";
import ReportComponent from "../../report/ReportComponent";
import CommonGraph from "../CommonGraph";

const DemandDataChart = ({
  metaCh1Value,
  metaCh2Value,
  hypeCh1Value,
  hypeCh2Value,
  submitDemand,
}) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const location = useLocation();
  const path = location.pathname;

  const { api } = useContext(MyContext);
  const user = JSON.parse(localStorage.getItem("user"));
  const selectedSim = JSON.parse(localStorage.getItem("selectedSim"));
  const firm_data = Object.keys(selectedSim[0]?.firm_data)[0];
  let firm_key_new = "";
  if (selectedSim[0]?.firm_data.length) {
    let firm_obj = selectedSim[0]?.firm_data.filter((item, index) => {
      return item.emails.includes(user.email);
    });
    if (firm_obj.length) {
      firm_key_new = firm_obj[0].firmName; // note: only one user in one firm so using firm_obj[0]
    }
  }

  const toggleModal = () => {
    setIsModalOpen(!isModalOpen);
  };

  const onSubmit = () => {
    if (path === "/demand") {
      submitDemand();
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
                  {" "}
                  {path === "/demand" && (
                    <DemandPreview
                      toggleModal={toggleModal}
                      metaCh1Value={metaCh1Value}
                      metaCh2Value={metaCh2Value}
                      hypeCh1Value={hypeCh1Value}
                      hypeCh2Value={hypeCh2Value}
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

export default DemandDataChart;
