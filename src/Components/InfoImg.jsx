import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import demand from "../assets/demand.png";
import distribution from "../assets/distribution.png";
import forecasting from "../assets/forecasting.png";
import it from "../assets/it.png";
import service from "../assets/service.png";
import transport from "../assets/transport.png";
import manufacturing from "../assets/manufacturing.png";
import procurement from "../assets/procurement.png";

const InfoImg = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const selectedSim = JSON.parse(localStorage.getItem("selectedSim")) || [];
  const user = JSON.parse(localStorage.getItem("user")) || {};
  console.log(selectedSim[0].quarter_specific_decisions[`quarter${selectedSim[0].current_quarter}`]['quarter_end_time']);
  const firm_obj = selectedSim[0]?.firm_data.filter(item => item.emails.includes(user.email)) || [];
  const firm_key_new = firm_obj.length ? firm_obj[0].firmName : "";

  const handleInventory = (firm_key, selectedSim) => {
    localStorage.setItem("inventory_firm_key", firm_key);
    localStorage.setItem("inventory_simulation_id", selectedSim[0].simulation_id);
    localStorage.setItem("inventory_current_quarter", selectedSim[0].current_quarter);
    localStorage.setItem("simulation_name", selectedSim[0].name);
    navigate('/inventory');
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
      case "/procurement":
        return procurement;
      case "/demand":
        return demand;
      case "/it":
        return it;
      case "/service":
        return service;
      case "/transport":
      case "/transportation":
        return transport;
      case "/manufacturing":
        return manufacturing;
      case "/distribution":
        return distribution;
      case "/forecast":
        return forecasting;
      default:
        return "";
    }
  };

  return (
    <div className="relative">
      <div
        className="h-44 bg-cover bg-no-repeat rounded-sm overflow-hidden"
        style={{
          backgroundImage: `url(${backgroundImage()})`,
          width: "auto",
        }}
      >
        <div className="absolute inset-0 bg-black bg-opacity-50 rounded-lg flex flex-col justify-end p-4">
          <div className="text-white flex flex-row justify-between w-full">
            <h2 className="text-base">{firm_key_new} | Q-{selectedSim[0]?.current_quarter}</h2>
            <div>
              <h2 className="text-base">Deadline:</h2>
              <h2 className="text-base">{selectedSim[0].quarter_specific_decisions[`quarter${selectedSim[0].current_quarter}`]['quarter_end_time']} EST {formatDate(selectedSim[0].quarter_specific_decisions[`quarter${selectedSim[0].current_quarter}`]['quarter_end_date'])}</h2>
            </div>
            <button title="Click to open Inventory" onClick={() => handleInventory(firm_key_new, selectedSim)} className="bg-blue-500 rounded-md text-white p-2 hover:bg-blue-700 shadow-md hover:shadow-lg hover:shadow-blue-500/50">Inventory</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default InfoImg;
