import React from "react";

const BackOfficeReports = () => {
  return (
    <div className=" bg-gray-100 m-0 px-10 ">
      <div className=" w-full">
        <h3 className="text-2xl px-2 text-start font-semibold mb-4 border-0 border-b pb-3 border-b-gray-500 border-opacity-20">
          TRAINER FEEDBACK
        </h3>
      </div>
      <div className="bg-white p-6 rounded-lg shadow-md">
        <div className="flex justify-start space-x-3 items-center mb-4">
          <p className="text-gray-600 ">SELECT A ROUND TO LOAD FEEDBACK</p>
          <div className="flex gap-2">
            <div className="rounded-full border-2 border-gray-400 w-8 h-8 flex justify-center items-center text-sm">
              1
            </div>
            <div className="rounded-full border-2 border-gray-400 w-8 h-8 flex justify-center items-center text-sm">
              2
            </div>
            <div className="rounded-full border-2 border-gray-400 w-8 h-8 flex justify-center items-center text-sm">
              3
            </div>
            <div className="rounded-full border-2 border-gray-400 w-8 h-8 flex justify-center items-center text-sm">
              4
            </div>
            <div className="rounded-full border-2 border-red-500 w-8 h-8 flex justify-center items-center text-sm">
              5
            </div>
          </div>
        </div>

        <div className="flex gap-4 mb-4">
          <p className="text-sm font-semibold text-gray-500">STRATEGY</p>
          <p className="text-sm font-semibold text-gray-500">
            <i className="fa-solid fa-circle text-xs text-red-500"></i> SERVICE
          </p>
          <p className="text-sm font-semibold text-gray-500">
            <i className="fa-solid fa-circle text-xs text-red-500"></i> OBSOLETES
          </p>
        </div>
        <div className="flex flex-col justify-start items-start">
          <h3 className="text-lg font-bold mb-2">
            75499 - TFC - MBA 7800 - B90 - JUNE 2022 - TEAM 1
          </h3>
          <ul className="list-disc pl-5 text-start text-gray-600">
            <li>
              The Return on Investment is -1.7%, the round before it was -6.5%
            </li>
            <li>
              Responsive strategy with an average shelflife promise of 78.3%
            </li>
            <li>
              This is combined with a moderate reliability promise to the
              customers of 95.0%
            </li>
            <li>
              For customer Food & Groceries the shelflife promised is 80.0%
            </li>
          </ul>
        </div>
        <div className="flex items-center mt-4">
          <div className="rounded-full border-2 border-red-400 w-3 h-3 flex justify-center items-center"></div>
          <div className="w-60 h-0.5 bg-gray-300 ml-3"></div>
          <i class="fa-solid fa-arrow-right text-gray-300 text-lg"></i>
        </div>
        <div className="flex gap-4 my-4 ">
          <p className="text-sm font-semibold text-gray-500">STRATEGY</p>
          <p className="text-sm font-semibold text-gray-500">
            <i className="fa-solid fa-circle text-xs text-red-500"></i> SERVICE
          </p>
          <p className="text-sm font-semibold text-gray-500">
            <i className="fa-solid fa-circle text-xs text-red-500"></i> OBSOLETES
          </p>
        </div>
        <div className=" flex flex-col justify-center items-start">
          <h3 className="text-lg text-start font-bold mb-2">
            75499 - TFC - MBA 7800 - B90 - JUNE 2022 - TEAM 1
          </h3>
          <ul className="list-disc text-start pl-5 text-gray-600">
            <li>
              The Return on Investment is -1.7%, the round before it was -6.5%
            </li>
            <li>
              Responsive strategy with an average shelflife promise of 78.3%
            </li>
            <li>
              This is combined with a moderate reliability promise to the
              customers of 95.0%
            </li>
            <li>
              For customer Food & Groceries the shelflife promised is 80.0%
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default BackOfficeReports;
