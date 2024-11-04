import React, { useContext, useEffect, useState } from "react";
import MyContext from "../../Components/ContextApi/MyContext";

const FacultyView = ({ selectedTeam }) => {
  const { api1, api } = useContext(MyContext);
  const SelectedCourse = JSON.parse(localStorage.getItem("SelectedCourse"));
  const user = JSON.parse(localStorage.getItem("user")) || {};

  const [trainers, setTrainers] = useState([]);

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
    }
  }, [SelectedCourse?.passcode]);

  return (
    <div className="bg-white w-full mx-auto pt-4 bg-[#F2F2F7] h-full">
      <div className="px-4 rounded-lg">
        <div className="text-xl font-bold mb-6 text-red-500">Faculty</div>

        <div className="text-gray-700 flex-grow">
          {trainers.map((trainer) => (
            <div
              className="text-sm md:text-sm border-b border-gray-700 pb-2"
              key={trainer.user_detail.userid}
            >
              {trainer.user_detail.first_name} {trainer.user_detail.last_name}{" "}
              {trainer.user_detail.email === user.email && "(YOU)"}
              <span className="text-red-500"> {trainer.user_detail.email}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default FacultyView;
