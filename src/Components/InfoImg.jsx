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
    <div>
      <div className="relative">
        <div
          className="h-64 bg-img bg-cover overflow-hidden bg-no-repeat"
          style={{
            backgroundImage: `url(${backgroundImage()})`,
            width: "900px",
          }}
        />
        <div className="absolute bottom-0 flex flex-row py-2 justify-center">
          <div
            style={{ backgroundColor: "whitesmoke" }}
            className="bg-slate-300 h-16 px-2 flex items-center m-1 rounded-lg"
          >
            <h2 className="p-1 text-base pt-0">{firm_key_new}</h2>
          </div>
          <div
            style={{ backgroundColor: "whitesmoke" }}
            className="bg-slate-300 h-16 flex items-center m-1 rounded-lg"
          >
            <h2 className="text-base px-2">{formatDate(selectedSim[0]?.start_date)} ({selectedSim[0]?.current_quarter} Quarter)</h2>
          </div>
          <div
            style={{ backgroundColor: "whitesmoke" }}
            className="bg-slate-300 px-2 h-16 m-1 rounded-lg"
          >
            <h2 className="text-base p-1 pb-0">Deadline:</h2>
            <h2 className="text-base p-1 pt-0">{selectedSim[0]?.decision_close.slice(0, 5)} EST {formatDate(selectedSim[0]?.end_date)}</h2>
          </div>
          <div className="m-auto">
            <button onClick={() => handleInventory(firm_key_new, selectedSim)} className="p-2 bg-yellow-500 rounded-md">Inventory</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default InfoImg;
