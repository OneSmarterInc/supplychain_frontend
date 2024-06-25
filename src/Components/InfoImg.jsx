import React from "react";
import demand from "../assets/demand.png";
import distribution from "../assets/distribution.png";
import forecasting from "../assets/forecasting.png";
import it from "../assets/it.png";
import service from "../assets/service.png";
import transport from "../assets/transport.png";
import manufacturing from "../assets/manufacturing.png";
import procurement from "../assets/procurement.png";
import { useLocation, useNavigate } from "react-router-dom";

const InfoImg = () => {
  const navigate = useNavigate()
  const location = useLocation();
  const selectedSim = JSON.parse(localStorage.getItem("selectedSim"));
  const user = JSON.parse(localStorage.getItem("user"));

  let firm_key_new = "";
  if (selectedSim[0]?.firm_data.length) {
    let firm_obj = selectedSim[0]?.firm_data.filter((item, index) => {

      return item.emails.includes(user.email);
    });
    if (firm_obj.length) {
      firm_key_new = firm_obj[0].firmName; //note: only one user in one firm so using firm_obj[0]
    }
  }
  const pathname = location.pathname;
  function formatDate(dateString) {
    const date = new Date(dateString);
    const day = date.getDate().toString().padStart(2, '0');
    const month = date.toLocaleString('default', { month: 'short' });
    const year = date.getFullYear();
    return `${day}-${month}-${year}`;
  }

  return (
    <div>
      <div className="relative  ">
        <div
          className=" h-64 bg-img bg-cover overflow-hidden bg-no-repeat  "
          style={{
            backgroundImage: `url(${
              (pathname === "/procurement" && procurement) ||
              (pathname === "/demand" && demand) ||
              (pathname === "/it" && it) ||
              (pathname === "/service" && service) ||
              (pathname === "/transport" && transport) ||
              (pathname === "/manufacturing" && manufacturing) ||
              (pathname === "/distribution" && distribution) ||
              (pathname === "/forecast" && forecasting) ||
              (pathname === "/transportation" && transport)
            }) `,
            width: "900px",
          }}
        />
        <div className="absolute  flex bottom-0 flex-row py-2 justify-center">
          <div
            style={{ backgroundColor: "whitesmoke" }}
            className="bg-slate-300 h-16 px-2 flex items-center  m-1 rounded-lg "
          >
            <h2 className=" p-1 text-base pt-0 ">{firm_key_new}</h2>
          </div>
          <div
            style={{ backgroundColor: "whitesmoke" }}
            className="bg-slate-300 h-16 flex items-center  m-1 rounded-lg  "
          >
            <h2 className="text-base px-2 ">{formatDate(selectedSim[0]?.start_date)} ({selectedSim[0].current_quarter} Quarter)</h2>
          </div>
          <div
            style={{ backgroundColor: "whitesmoke" }}
            className="bg-slate-300 px-2 h-16  m-1 rounded-lg"
          >
            <h2 className="text-base p-1 pb-0">Deadline:</h2>
            <h2 className="text-base p-1 pt-0">{selectedSim[0]?.decision_close} EST {formatDate(selectedSim[0]?.end_date)}</h2>
          </div>
          <div className="m-auto">
            <button onClick={()=>navigate("/inventory")} className="p-2 bg-yellow-500 rounded-md">Inventory</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default InfoImg;
