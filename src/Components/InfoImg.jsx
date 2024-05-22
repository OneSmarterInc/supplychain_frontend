import React from "react";
import demand from "../assets/demand.png";
import distribution from "../assets/distribution.png";
import forecasting from "../assets/forecasting.png";
import it from "../assets/it.png";
import service from "../assets/service.png";
import transport from "../assets/transport.png";
import manufacturing from "../assets/manufacturing.png";
import procurement from "../assets/procurement.png";
import { useLocation } from "react-router-dom";

const InfoImg = () => {
  const location = useLocation();
  const pathname = location.pathname;
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
        <div className="absolute left-16 flex bottom-0 flex-row py-2 justify-center">
          <div
            style={{ backgroundColor: "whitesmoke" }}
            className="bg-slate-300 h-16 px-2 flex items-center  m-1 rounded-lg "
          >
            <h2 className=" p-1 text-base pt-0 ">Onesmarter Inc.</h2>
          </div>
          <div
            style={{ backgroundColor: "whitesmoke" }}
            className="bg-slate-300 h-16 flex items-center  m-1 rounded-lg  "
          >
            <h2 className="text-base px-2 ">Aug-2023(8th Quarter)</h2>
          </div>
          <div
            style={{ backgroundColor: "whitesmoke" }}
            className="bg-slate-300 px-2 h-16  m-1 rounded-lg  "
          >
            <h2 className="text-base p-1 pb-0">Deadline:</h2>
            <h2 className="text-base p-1 pt-0">15:00 EST 30-Aug-2023</h2>
          </div>
        </div>
      </div>
    </div>
  );
};

export default InfoImg;
