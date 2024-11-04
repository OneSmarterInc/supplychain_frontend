import React, { useState } from "react";
import { useLocation } from "react-router-dom";
import Modal from "react-modal";
import Inventory from "./Inventory";
import { Box, Button, Text } from "@chakra-ui/react";
import quater from "../FlexeeSimAdmin/Assets/quarter.png";
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

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const day = date.getDate().toString().padStart(2, '0');
    const month = date.toLocaleString('default', { month: 'short' });
    const year = date.getFullYear();
    return `${day}-${month}-${year}`;
  };

  return (
    <div className="">
      <div className="h-auto p-4 bg-white  border-gray-200 rounded-lg">
        {/* FLEXEE Title Section */}
        <div className="flex items-center justify-between">
         
        

      
        <div className="">
          <h2 className="text-xl font-bold text-red-600">{decision.toUpperCase()}</h2>
          <p className="text-lg text-gray-700">
            COURSE: {selectedSim[0]?.course || "MBA-2024-JUN"}
          </p>
        </div>

        {/* Quarter and Deadline Details */}
        <div className=" flex justify-between items-center">
          <div className="text-right">
            <p className=" text-sm text-gray-700">
              <span className="flex font-bold text-red-500">
              <img src={quater} className="mr-2 h-5 w-5"></img>
                {selectedSim[0]?.current_quarter}th Quarter Deadline</span> 
            </p>
              {formatDate(selectedSim[0]?.quarter_specific_decisions?.[`quarter${selectedSim[0]?.current_quarter}`]?.['quarter_end_date'] || "")} 
              {selectedSim[0]?.quarter_specific_decisions?.[`quarter${selectedSim[0]?.current_quarter}`]?.['quarter_end_time'] || ""}
          </div>
        </div>
        </div>
      </div>

      {/* Inventory Modal */}
      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        contentLabel="Inventory Modal"
      >
        <Box display="flex" justifyContent="flex-end" w="100%">
          <Button onClick={closeModal} bg="#D10000" color="white">Close</Button>
        </Box>
        <Inventory />
      </Modal>
    </div>
  );
};

export default InfoImg;