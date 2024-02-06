import React from "react";

import supplychainimg from "../assets/supplychainimg2.webp";

const Forecasting_infoimg = () => {
  return (
    <div>
      <div className="">
        <div
          className=" h-64 bg-img bg-cover overflow-hidden bg-no-repeat "
          style={{
            backgroundImage: `url(${supplychainimg}) `,
            width: "900px",
          }}
        />
        <div className="absolute top-12 right-0 flex w-56 flex-col py-2 justify-center">
          <div className="bg-slate-300 h-20 m-1 rounded">
            <h2 className="text-lg p-2 pb-0 ">Aug-2023(8th Quarter)</h2>
            <h2 className="text-lg p-2 pt-0 ">Onesmarter Inc.</h2>
          </div>
          <div className="bg-slate-300 h-16  m-1 rounded ">
            <h2 className="text-xl text-center p-4">28,489,455 <span className="text-green-600 font-bold">$</span></h2>
          </div>
          <div className="bg-slate-300 h-20  m-1 rounded ">
            <h2 className="text-lg p-2 pb-0">Deadline:</h2>
            <h2 className="text-lg p-2 pt-0">15:00 EST 30-Aug-2023</h2>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Forecasting_infoimg;
