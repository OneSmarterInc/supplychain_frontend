import React from "react";
import videoimg from "../Assets/introvideo.png";
import deploytosim from "../Assets/deploytosimimg.png";
const CourseComponent = () => {
  const SelectedCourse = JSON.parse(localStorage.getItem("SelectedCourse"));
  const handleimg = ()=>{
    alert('Simulation Deployed Successfully')
  }
  return (
    <div className="bg-white p-8 px-16 w-full mx-auto">
      <header className=" flex justify-between pb-3  ">
        <div className="">
          <div className="flex justify-start space-x-4 items-center mb-0">
            <p className=" h-6 w-6 flex justify-center items-center rounded-full border border-red-500 border-spacing-2">
              <i class="fa-solid fa-circle"></i>
            </p>
            <div className=" font-normal text-[32px]">COURSE</div>
            <div className="mx-2">|</div>
            <div className="text-gray-900 text-[20px]">
              SESSION NUMBER - <span className="text-red-600 font-semibold">8713</span>
            </div>
          </div>
          <div className="text-gray-800 text-start mb-6">
            <p className=" font-normal text-[24px] mb-2">
              {SelectedCourse?.course}
            </p>
            <p className=" text-[24px] mb-2 font-normal ">
              <span className=" opacity-50"> ORGANIZATION:</span>{" "}
              <span className="text-gray-900 font-medium">
                {SelectedCourse?.organization}
              </span>
            </p>
          </div>
        </div>
        <div className="text-start">
          <h2 className="text-[64px] font-medium">
          {SelectedCourse?.passcode}{" "}
            <span className=" font-extralight">
              {" "}
              <i class="fa-solid fa-share-nodes fa-xs"></i>
            </span>
          </h2>
          <h3 className="text-xl  pl-20 cursor-pointer text-red-500">
            COPY TO CLIPBOARD
          </h3>
        </div>
      </header>
      <div className="flex items-center w-full mb-8">
        <div className="h-0.5 w-52 bg-red-500"></div>
        <div className="h-0.5 w-full ml-4 bg-gray-300"></div>
      </div>

      <div className="grid grid-cols-7 place-content-end  gap-0  justify-between items-end ">
        <div className="space-y-2 col-span-4 text-start   pb-8">
          <div className="">
            <p className="   text-[32px]">PAYMENT / PRICINFG</p>
            <p className="text-[48px] font-semibold ">USD 00.00</p>
          </div>
          <div className="">
            <p className=" text-[32px]">DUE DATE</p>
            <p className="text-[48px] font-semibold ">  {SelectedCourse?.endDate}
            </p>
          </div>
          <p className="text-gray-500 opacity-60 text-3xl">0 DAYS REMAINING</p>
        </div>
        <div className="  col-span-3  text-white  text-center cursor-pointer flex justify-center items-center p-10 border-0 border-l-2 border-b-0 border-gray-400 border-opacity-50  ">
          <img src={deploytosim} alt="" className="w-[450px]" onClick={handleimg} />
        </div>
      </div>

      <div className="grid grid-cols-7  justify-between items-start">
        <div className="flex flex-col col-span-4 items-start mb-6 border-2 border-e-0 border-gray-400  rounded-s-md p-8 h-full border-opacity-50 ">
          <p className="font-semibold text-4xl mb-2  mr-4">
            TRAINER / TEACHER(S)
          </p>
          <div className="bg-red-500 h-0.5 w-24 my-2"></div>
          <div className="space-y-2 text-gray-700">
           
           
            <div className="flex items-center text-red-400 font-semibold">
              <input
                type="radio"
                name="teacher"
                className="mr-2"
                checked
                readOnly
              />
              <label  className="text-xl font-semibold text-[#ED1C24] p-1">user01 test (YOU)</label>
            </div>
          </div>
        </div>

        <div className=" col-span-3 border-2  rounded-e-md   border-gray-400 border-opacity-50 p-2 pb-8 h-full">
          <img src={videoimg} alt="" className="h-full w-full " />
        </div>
      </div>
    </div>
  );
};

export default CourseComponent;
