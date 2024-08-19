import React from "react";

const BackOfficeRankings = () => {
  return (
    <div className="  m-0 px-10 ">
      <div className=" w-full">
        <h3 className="text-2xl px-2 text-start font-semibold mb-4 border-0 border-b pb-3 border-b-gray-500 border-opacity-20">
          Round and weighted rankings
        </h3>
      </div>
      <div className="flex justify-between">
        <div className=" flex space-x-4 items-center ">
          <div className="h-12 w-14 flex items-center justify-center bg-slate-950 rounded-md text-white">
            <div className="">1</div>
            <span className="px-2">
              <i class="fa-solid fa-ellipsis-vertical text-4xl"></i>
            </span>
            <div className="">0</div>
          </div>
          <div className="flex items-center h-12 w-44 bg-red-500 rounded-full text-white">
            <div className="w-10">
              <i class="fa-solid fa-circle-plus text-2xl px-2 w-10"></i>
            </div>
            <span className="px-2">|</span>
            <div className="w-full">Round Score</div>
          </div>
          <div className="flex items-center h-12 w-44 bg-white border-red-500 border-2 rounded-full text-red-500">
            <div className="">
              <i class="fa-solid fa-clock text-2xl px-2 w-10"></i>
            </div>
            <span className="px-0">|</span>
            <div className="w-full font-medium">Weight Scores</div>
          </div>
        </div>
        <div className=" text-red-500">
          <span className="px-2">
            {" "}
            <i class="fa-solid fa-file-arrow-down text-gray-950 text-4xl"></i>
          </span>
          <span className="text-2xl">Download</span>
        </div>
      </div>
    </div>
  );
};

export default BackOfficeRankings;
