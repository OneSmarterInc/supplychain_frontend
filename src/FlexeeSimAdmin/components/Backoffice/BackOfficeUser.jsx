import { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleUser, faDownload } from "@fortawesome/free-solid-svg-icons";
import axios from "axios";

const BackOfficeUser = () => {
  const [users, setUsers] = useState([]);
  const selectedSimData = JSON.parse(localStorage.getItem("SelectedCourse"));

  const passcode = selectedSimData?.passcode;

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get(
          `https://api.cyberbriefs.org/api3/simulation/get-firms/${passcode}/`
        );
        const data = response.data;
        const flattenedUsers = data.flatMap((firm) =>
          firm.users.map((user) => ({
            name: "Unknown Name",
            id: `#${user.user_id}`,
            email: user.email,
            // opinion: "Operations, Sales",
            team: firm.firm_key,
          }))
        );
        setUsers(flattenedUsers);
      } catch (error) {
        console.error("Error fetching users:", error);
      }
    };

    fetchUsers();
  }, []);

  return (
    <div className=" bg-gray-100 m-0 px-10 ">
      <div className=" w-full">
        <h3 className="text-2xl px-2 text-start font-semibold mb-2 border-0 border-b pb-3 border-b-gray-500 border-opacity-20">
          USERS
        </h3>
        <table className="w-full text-left border-collapse">
          <thead>
            <tr>
              <th className="py-2 px-4 border-b">
                NAME / ID{" "}
                <i className="fa-solid fa-arrow-down-a-z text-red-500"></i>
              </th>
              <th className="py-2 px-4 border-b">EMAIL / USERNAME</th>
              {/* <th className="py-2 px-4 border-b">OPINION FOR</th> */}
              <th className="py-2 px-4 border-b">TEAM NAME</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user, index) => (
              <tr key={index} className="hover:bg-gray-200">
                <td className="py-2 px-4 border-b">
                  <div className="flex items-center">
                    <FontAwesomeIcon
                      icon={faCircleUser}
                      className="mr-2 text-3xl text-gray-500"
                    />
                    <div>
                      <span className="font-semibold">{user.name}</span>
                      <br />
                      <span className="text-red-500">{user.id}</span>
                    </div>
                  </div>
                </td>
                <td className="py-2 px-4 border-b">
                  <span className="text-gray-800">{user.email}</span>
                  <br />
                  <span className="text-xs text-gray-400">
                    {user.email.split("@")[1]}
                  </span>
                </td>
                <td className="py-2 px-4 border-b">
                  <span className="text-gray-800">{user.opinion}</span>
                </td>
                <td className="py-2 px-4 border-b w-52">
                  <span className="text-gray-900">{user.team}</span>
                </td>
                <td className="py-2 px-4 border-b">
                  <i className="fa-solid fa-arrow-up-right-from-square"></i>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <div className="flex justify-between items-center mt-4">
          <div className="flex items-center">
            <p className="text-gray-800">
              Showing 1 to 10 Out Of {users.length}
            </p>
            <button className=" flex items-center justify-between w-36 px-4 py-2 rounded">
              <p className=" flex justify-center items-center w-7 h-7 border-opacity-50 border border-black rounded-full">
                <FontAwesomeIcon icon={faDownload} className="" />
              </p>
              <p className=" font-medium text-[14px] text-red-500">Download</p>
            </button>
          </div>
          <button className="w-40 text-sm px-4 py-2 bg-red-500 rounded-full text-white mt-4 hover:bg-gray-700">
            <i className="fa-solid fa-arrows-rotate"></i> LOAD MORE
          </button>
        </div>
      </div>
    </div>
  );
};

export default BackOfficeUser;
