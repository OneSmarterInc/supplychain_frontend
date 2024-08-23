import React, { useState } from "react";
import { useLocation } from "react-router-dom";
import Modal from "react-modal";
import demand from "../assets/demand.png";
import distribution from "../assets/distribution.png";
import forecasting from "../assets/forecasting.png";
import it from "../assets/it.png";
import service from "../assets/service.png";
import transport from "../assets/transport.png";
import manufacturing from "../assets/manufacturing.png";
import procurement from "../assets/procurement.png";
import Inventory from "./Inventory";
import { Text } from "@chakra-ui/react";

const InfoImg = ({ decision }) => {
  const location = useLocation();
  const [modalIsOpen, setModalIsOpen] = useState(false);

  const selectedSim = JSON.parse(localStorage.getItem("selectedSimData")) || {};
  const user = JSON.parse(localStorage.getItem("user")) || {};
  const firm_obj = selectedSim[0]?.firm_data?.filter(item => item.emails.includes(user.email)) || [];
  const firm_key_new = firm_obj.length ? firm_obj[0].firmName : "";

  const handleInventory = () => {
    localStorage.setItem("inventory_firm_key", firm_key_new);
    localStorage.setItem("inventory_simulation_id", selectedSim[0]?.simulation_id || "");
    localStorage.setItem("inventory_current_quarter", selectedSim[0]?.current_quarter || 0);
    localStorage.setItem("simulation_name", selectedSim[0]?.name || "");
    setModalIsOpen(true);
  };

  const closeModal = () => {
    setModalIsOpen(false);
  };

  const pathname = location.pathname;

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const day = date.getDate().toString().padStart(2, '0');
    const month = date.toLocaleString('default', { month: 'short' });
    const year = date.getFullYear();
    return `${day}-${month}-${year}`;
  };

  const backgroundImage = () => {
    switch (pathname) {
      case "/Procurement":
        return procurement;
      case "/Demand":
        return demand;
      case "/It":
        return it;
      case "/Service":
        return service;

      case "/Transport":
        return transport;

      case "/Transportation":
        return transport;
        
      case "/Manufacturing":
        return manufacturing;
      case "/Distribution":
        return distribution;
      case "/Forecast":
        return forecasting;
      default:
        return "";
    }
  };

  return (
    <div className="relative">
      <div
        className="h-28 bg-cover bg-no-repeat rounded-sm overflow-hidden"
        style={{
          backgroundImage: `url(${backgroundImage()})`,
          width: "auto",
        }}
      >
        <div className="absolute inset-0 bg-black bg-opacity-60 rounded-lg flex flex-col justify-end p-4">
          <div className="flex justify-between">
            <h1 className="text-2xl text-start py-2 text-white">{decision} Decision</h1>

            <div className="flex">
              <h1 className="text-xl text-start px-3 py-2 text-white">
                {selectedSim[0]?.name || "Simulation"}
              </h1>
              <h1 className="text-xl text-start px-1 py-2 text-red-500">|</h1>
              <h1 className="text-xl text-start px-3 py-2 text-white ">
                {user.username || "User"}
              </h1>
            </div>
          </div>

          <div className="text-white flex flex-row justify-between w-full">
            <h2 className="text-base">
              {firm_key_new} | Q-{selectedSim[0]?.current_quarter || "N/A"}
            </h2>
            <div>
              <h2 className="text-base">
                {selectedSim[0]?.quarter_specific_decisions?.[`quarter${selectedSim[0]?.current_quarter}`]?.['quarter_end_time'] || "Time"} EST {formatDate(selectedSim[0]?.quarter_specific_decisions?.[`quarter${selectedSim[0]?.current_quarter}`]?.['quarter_end_date'] || "")}
              </h2>
              <hr />
              <Text color="red" pl="6" fontSize="1.1rem">Quarter Deadline</Text>
            </div>
            <button 
              title="Click to open Inventory" 
              onClick={handleInventory} 
              className="bg-red-500 rounded-md text-white h-10 pl-2 pr-2 hover:bg-red-700 shadow-md hover:shadow-lg hover:shadow-grey-500/50"
            >
              Inventory
            </button>
          </div>
        </div>
      </div>

      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        contentLabel="Inventory Modal"
        style={{
          content: {
            top: '50%',
            left: '50%',
            right: 'auto',
            bottom: 'auto',
            marginRight: '-50%',
            transform: 'translate(-50%, -50%)',
          },
        }}
      >
        <Inventory />
        <button onClick={closeModal}>Close</button>
      </Modal>
    </div>
  );
};

export default InfoImg;