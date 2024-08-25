import React from "react";
import videoimg from "../Assets/introvideo.png";
import deploytosim from "../Assets/deploytosimimg.png";
import graphic from "../../assets/graphic.png";
const CourseComponent = () => {
  const SelectedCourse = JSON.parse(localStorage.getItem("SelectedCourse"));
  const user = JSON.parse(localStorage.getItem("user")) || {};


  // Calculate remaining days
  const calculateRemainingDays = (endDate) => {
    const currentDate = new Date();
    const end = new Date(endDate);
    const timeDiff = end - currentDate;
    const daysRemaining = Math.ceil(timeDiff / (1000 * 60 * 60 * 24));
    return daysRemaining >= 0 ? daysRemaining : 0; // Ensure it doesn't go negative
  };

  const remainingDays = SelectedCourse?.endDate
    ? calculateRemainingDays(SelectedCourse.endDate)
    : 0;

  const handleimg = () => {
    alert('Simulation Deployed Successfully');
  };


  const handleCopyToClipboard = () => {
    if (SelectedCourse?.passcode) {
      navigator.clipboard.writeText(SelectedCourse.passcode).then(() => {
        alert("Passcode copied to clipboard successfully!");
      }).catch((error) => {
        console.error("Failed to copy text: ", error);
      });
    }
  };

  return (
    <div className="bg-white pt-8 w-full max-w-screen-full mx-auto px-10">
      <header className="flex flex-col md:flex-row justify-between pb-6">
        <div>
          <div className="flex items-center space-x-4 mb-4  px-5">
            <p className="h-6 w-6 flex justify-center items-center rounded-full border border-red-500">
              <i className="fa-solid fa-circle"></i>
            </p>
            <div className="text-2xl font-normal">COURSE</div>
            <div className="mx-2">|</div>
            <div className="text-gray-900 text-xl">
              SESSION NUMBER - <span className="text-red-600 font-semibold">8713</span>
            </div>
          </div>
          <div className="text-gray-800 px-5">
            <p className="text-xl font-normal mb-2">{SelectedCourse?.course}</p>
            <p className="text-xl font-normal">
              <span className="opacity-50">ORGANIZATION:</span>{" "}
              <span className="text-gray-900 font-medium">
                {SelectedCourse?.organization}
              </span>
            </p>
          </div>
        </div>
        <div className="text-center md:text-right mt-4 md:mt-0 px-5">
      <h2 className="text-4xl font-medium">
        {SelectedCourse?.passcode}{" "}
        <span className="font-extralight cursor-pointer" onClick={handleCopyToClipboard}>
          <i className="fa-solid fa-share-nodes fa-xs"></i>
        </span>
      </h2>
      <h3
        className="text-lg cursor-pointer text-red-500 mt-2"
        onClick={handleCopyToClipboard}
      >
        COPY TO CLIPBOARD
      </h3>
    </div>
      </header>

      <div className="flex items-center w-full mb-8">
        <div className="h-0.5 w-24 bg-red-500"></div>
        <div className="h-0.5 w-full ml-4 bg-gray-300"></div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-7 gap-1 px-4">
        <div className="space-y-6 col-span-4 text-start">
          <div>
            <p className="text-xl md:text-2xl px-2">PAYMENT / PRICING</p>
            <p className="text-3xl md:text-3xl font-semibold px-2">USD 00.00</p>
          </div>
          <div >
            <p className="text-xl md:text-2xl px-2">DUE DATE</p>
            <p className="text-2xl md:text-3xl font-semibold px-2">
              {SelectedCourse?.endDate}
            </p>
            <p className="text-gray-500 opacity-60 text-xl md:text-1xl px-2 mb-3">
              {remainingDays} DAYS REMAINING
            </p>
          </div>

        </div>
        <div
          className="absolute text-gray-500"
          style={{
            top: '155px',    // Adjust the top position
            right: '25px',  // Adjust the right position
            transform: 'translate(0px, 0px)'  // Adjust the translate values for finer control
          }}
        >
          <i className="fa-solid fa-arrow-right text-lg opacity-30"></i>
        </div>

        <div className="col-span-3 flex justify-center items-center px-10 border-l-2 border-gray-400 border-opacity-70">
          <img
            src={deploytosim}
            alt="Deploy to Simulation"
            className="w-75 max-w-xs cursor-pointer mb-8"
            onClick={handleimg}
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-7 gap-0 bg-cover bg-center" style={{ backgroundImage: `url(${graphic})` }}>
        <div className="col-span-4 flex flex-col items-start border-l-2 border-t-2 rounded-tl-lg border-gray-400 border-opacity-50  px-8 pt-4 h-full">
          <p className="font-semibold text-2xl md:text-2xl pb-2">TRAINER / TEACHER(S)</p>
          <div className="bg-red-500 h-0.5 w-24 mb-2"></div>
          <div className="space-y-2 text-gray-700">
            <div className="flex items-center text-red-400 font-semibold">
              <input
                type="radio"
                name="teacher"
                className="mr-2"
                checked
                readOnly
              />
              <label className="text-lg md:text-xl font-semibold text-[#ED1C24]">
                {user.first_name} {user.last_name} (YOU)
              </label>
            </div>
          </div>
        </div>
        <div className="col-span-3  border-l-2 border-t-2 border-r-2 border-gray-400 border-opacity-50 rounded-tr-lg h-full">
          <img
            src={videoimg}
            alt="Introduction Video"
            className="h-full w-full object-cover"
          />
        </div>
      </div>
    </div>
  );
};

export default CourseComponent;