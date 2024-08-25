import React from "react";
// import logout_img from "../../Assets/logout.png";
const NewFooter = () => {
  return (
    <div className="flex absolute bottom-0  items-center w-screen bg-white z-50 h-4 border-t-2 pt-3 pl-4" style={{marginBottom:'-8px'}}>
      <div className="text-sm text-black-400 text-center ">
        Copyright 2024{" "}
        <span className="text-red-500 font-semibold">FLEXEE SIMULATION SYSTEMS</span> , All Rights Reserved
      </div>
    </div>
  );
};

export default NewFooter;
