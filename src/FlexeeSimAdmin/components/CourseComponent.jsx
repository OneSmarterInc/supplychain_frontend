import React, { useState, useEffect, useContext } from "react";
import videoimg from "../Assets/introvideo.png";
import deploytosim from "../Assets/deploytosimimg.png";
import graphic from "../../assets/graphic.png";
import MyContext from "../../Components/ContextApi/MyContext";
import { Spinner } from "@chakra-ui/react";
import { toast } from "react-toastify";

const CourseComponent = () => {
  const SelectedCourse = JSON.parse(localStorage.getItem("SelectedCourse"));
  const user = JSON.parse(localStorage.getItem("user")) || {};
  const [trainers, setTrainers] = useState([]);
  const [simulation, setSimulation] = useState({});
  const { api } = useContext(MyContext);
  const [isLoading, setIsLoading] = useState(false); // Loading state
  const fetchSimulation = async () => {
    try {
      const response = await fetch(
        `${api}/simulation/${SelectedCourse?.passcode}`
      );
      const data = await response.json();
      console.log(data);
      setSimulation(data);
    } catch (error) {
      console.error("Error fetching trainers:", error);
    }
  };
  useEffect(() => {
    const fetchTrainers = async () => {
      try {
        const response = await fetch(
          `${api}/simulation/${SelectedCourse?.passcode}/subscribers/?format=json`
        );
        const data = await response.json();

        const filteredTrainers = data.filter(
          (subscriber) => subscriber.user_detail.is_admin === true
        );
        setTrainers(filteredTrainers);
      } catch (error) {
        console.error("Error fetching trainers:", error);
      }
    };
    if (SelectedCourse?.passcode) {
      fetchTrainers();
      fetchSimulation();
    }
  }, [SelectedCourse?.passcode]);

  const calculateRemainingDays = (endDate) => {
    const currentDate = new Date();
    const end = new Date(endDate);
    const timeDiff = end - currentDate;
    const daysRemaining = Math.ceil(timeDiff / (1000 * 60 * 60 * 24));
    return daysRemaining >= 0 ? daysRemaining : 0;
  };

  const remainingDays = SelectedCourse?.endDate
    ? calculateRemainingDays(SelectedCourse.endDate)
    : 0;

  const handleimg = async () => {
    setIsLoading(true); // Start loading
    try {
      const response = await fetch(
        `${api}/deploy/${SelectedCourse?.simulation_id}`,
        {
          method: "GET",
        }
      );
      if (response.ok) {
        setSimulation((prevSimulation) => ({
          ...prevSimulation,
          is_deployed: true,
        }));
        toast.success("Simulation deployed successfully");
      } else {
        toast.error("Error deploying simulation");
      }
    } catch (error) {
      console.error("Error deploying simulation:", error);
      toast({
        title: `Error occurred during deployment`,
        status: "error",
        duration: 3000,
        isClosable: true,
        position: "top",
      });
    } finally {
      setIsLoading(false); // Stop loading
    }
  };

  const handleCopyToClipboard = () => {
    if (SelectedCourse?.passcode) {
      navigator.clipboard
        .writeText(SelectedCourse.passcode)
        .then(() => {
          alert("Passcode copied to clipboard successfully!");
        })
        .catch((error) => {
          console.error("Failed to copy text: ", error);
        });
    }
  };

  return (
    <div className="bg-white pt-8 w-full max-w-screen-full mx-auto px-10">
      {isLoading && (
        <div className="fixed inset-0 flex items-center justify-center z-50">
          <Spinner size="xl" color="red.500" />
        </div>
      )}
      <header className="flex flex-col md:flex-row justify-between pb-6">
        <div>
          <div className="flex items-center space-x-4 mb-4 px-5">
            <p className="h-6 w-6 flex justify-center items-center rounded-full border border-red-500">
              <i className="fa-solid fa-circle"></i>
            </p>
            <div className="text-2xl font-normal">COURSE</div>
            <div className="mx-2">|</div>
            <div className="text-gray-900 text-xl">
              SESSION ID -{" "}
              <span className="text-red-600 font-semibold">
                {SelectedCourse?.simulation_id}
              </span>
            </div>
          </div>
          <div className="text-gray-800 px-5">
            <p className="text-xl font-normal mb-2">{SelectedCourse?.course}</p>
            <p className="text-xl font-normal">
              <span className="opacity-50">ORGANIZATION:</span>{" "}
              <span className="text-gray-900 font-medium">
                {simulation?.organization}
              </span>
            </p>
          </div>
        </div>
        <div className="text-center md:text-right mt-4 md:mt-0 px-5">
          <h2 className="text-4xl font-medium">
            {SelectedCourse?.passcode}{" "}
            <span
              className="font-extralight cursor-pointer"
              onClick={handleCopyToClipboard}
            >
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

      {/* Trainer section */}
      <div
        className="grid grid-cols-1 md:grid-cols-7 gap-0 bg-cover bg-center mb-4" 
        style={{ backgroundImage: `url(${graphic})` }}
      >
        <div className="col-span-4 flex flex-col items-start border-2 rounded-tl-lg  rounded-bl-lg border-gray-400 border-opacity-50  px-8 pt-4 h-full">
          <p className="font-semibold text-sm md:text-sm pb-2">Faculties</p>

          <div className="space-y-2 text-gray-700 pb-4">
            {trainers.map((trainer) => (
              <div
                className="flex items-center"
                key={trainer.user_detail.userid}
                style={{
                  color:
                    trainer.user_detail.email === user.email
                      ? "#ED1C24"
                      : "inherit",
                }}
              >
                <input
                  type="radio"
                  name="teacher"
                  className="mr-2"
                  readOnly
                  checked={trainer.user_detail.email === user.email}
                />
                <label
                  className="text-lg md:text-sm font-semibold"
                  style={{
                    color:
                      trainer.user_detail.email === user.email
                        ? "#ED1C24"
                        : "inherit",
                  }}
                >
                  {trainer.user_detail.first_name}{" "}
                  {trainer.user_detail.last_name}{" "}
                  {trainer.user_detail.email === user.email && "(YOU)"}
                </label>
              </div>
            ))}
          </div>
        </div>
        {!simulation.is_deployed ? (
          <div className="col-span-3 border-b-2 border-t-2 border-r-2 border-gray-400 border-opacity-50 rounded-tr-lg rounded-br-lg h-full">
            <div
              alt="Deploy to Simulation"
              className={`margin-auto align-center border border-red-600 m-4 h-10 text-center text-white rounded-lg bg-red-700 cursor-pointer mb-8 ${
                isLoading ? "opacity-50" : ""
              }`}
              onClick={!isLoading ? handleimg : null} // Disable click when loading
              style={{ pointerEvents: isLoading ? "none" : "auto" }} // Disable pointer events when loading
            >
              <p className="mt-2">Deploy Simulation</p>
            </div>
          </div>
        ) : (
          <div className="col-span-3 border-b-2 border-t-2 border-r-2 border-gray-400 border-opacity-50 rounded-tr-lg rounded-br-lg h-full">
            <div
              className="margin-auto align-center border border-gray-600 m-4 h-10 text-center text-black rounded-lg bg-gray-400 cursor-not-allowed mb-8"
              style={{ pointerEvents: "none" }} // Disable pointer events when simulation is deployed
            >
              <p className="mt-2">Simulation Already Deployed</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default CourseComponent;
