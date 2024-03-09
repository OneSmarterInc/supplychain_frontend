import React from "react";
import supplychainimg from "../assets/img.png";
const InfoImg = () => {
  return (
    <div>
      <div className="relative  ">
        <div
          className=" h-64 bg-img bg-cover overflow-hidden bg-no-repeat  "
          style={{
            backgroundImage: `url(${supplychainimg}) `,
            width: "900px",
          }}
        />
        <div className="absolute left-16 flex bottom-0 flex-row py-2 justify-center">
          <div className="bg-slate-300 h-16 px-2  m-1 rounded-lg ">
            <h2 className="text-lg p-1 pb-0 ">Aug-2023(8th Quarter)</h2>
            <h2 className="text-lg p-1 pt-0 ">Onesmarter Inc.</h2>
          </div>
          <div className="bg-slate-300 h-16  m-1 rounded-lg  ">
            <h2 className="text-xl text-center p-4">
              28,489,455 <span className="text-green-600 font-bold">$</span>
            </h2>
          </div>
          <div className="bg-slate-300 px-2 h-16  m-1 rounded-lg  ">
            <h2 className="text-lg p-1 pb-0">Deadline:</h2>
            <h2 className="text-lg p-1 pt-0">15:00 EST 30-Aug-2023</h2>
          </div>
        </div>
      </div>
    </div>
  );
};

export default InfoImg;
