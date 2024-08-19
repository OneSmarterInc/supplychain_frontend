import React from "react";

const BackOfficeNavbar = ({ isSideBarOpen, setIsSideBarOpen }) => {

  const handleSidebarOpen = () => {
    setIsSideBarOpen(!isSideBarOpen);
    localStorage.setItem("isSideBarOpen", isSideBarOpen);
  };

  return (
    <div className="">
      <div className="w-full  top-0 left-0  ">
        <div className="flex justify-between items-center  bg-black text-white p-2 h-12">
          <div className="flex justify-between w-full">
            <div className="px-3 cursor-pointer" onClick={handleSidebarOpen}>
              <i class="fa-solid fa-bars mr-2 px-3 text-2xl text-red-500"></i>
            </div>
            <div className="flex items-center px-3 ">
              <svg
                class="h-8 w-8 text-white "
                width="24"
                height="24"
                viewBox="0 0 24 24"
                stroke-width="1"
                stroke="currentColor"
                fill="none"
                stroke-linecap="round"
                stroke-linejoin="round"
              >
                {" "}
                <path stroke="none" d="M0 0h24v24H0z" />{" "}
                <rect x="4" y="4" width="6" height="6" rx="1" />{" "}
                <rect x="14" y="4" width="6" height="6" rx="1" />{" "}
                <rect x="4" y="14" width="6" height="6" rx="1" />{" "}
                <rect x="14" y="14" width="6" height="6" rx="1" />
              </svg>
              <i className="fa-solid fa-bell mx-2 px-3 text-2xl"></i>
              <p className="px-3 text-2xl opacity-50">|</p>
              <a href="/" className="hover:text-gray-500">
                Back To My Account
              </a>
              <i className="fa-solid fa-circle-user mr-2 px-3 text-3xl"></i>
            </div>
          </div>
        </div>
        <div className="">
          <div className="flex h-10">
            <div className=" w-full text-start  ">
              <div
                className={`text-xl flex text-start items-start justify-between font-bold  bg-white  `}
              >
                <h1 className="w-[280px] text-right font-medium bg-slate-200 pr-10  pl-0 p-3 border">
                  SELECT A POOL{" "}
                </h1>
                <div className="relative w-full py-0">
                  <select
                    name=""
                    id=""
                    className="px-3 w-full p-3 border-gray-300 border-0 border-b-2 border-l-2 font-normal appearance-none pl-10"
                  >
                    <option value="">
                      {" "}
                      15745 - Wright State University - Vikram Sethi - MBA 7800
                      - B90 (6375) - Open
                    </option>
                  </select>
                  <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                    <div className="bg-gray-200  border-0  border-l-2  border-l-red-500 w-24 flex justify-center items-center h-12 absolute right-0 top-1">
                      <i class="fa-solid fa-chevron-down"></i>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BackOfficeNavbar;
