import React, { useState } from "react";

const RawMaterial = ({ setAlpha_quantity, setBeta_quantity }) => {
  const procurementData = JSON.parse(localStorage.getItem("procurementData"));
  console.log("ProcurementDataRaw-", procurementData);
  const [newData, setNewData] = useState({
    alpha_quantity: procurementData?.alpha_quantity,
    beta_quantity: procurementData?.beta_quantity,
  });
  const selectedSim = JSON.parse(localStorage.getItem("selectedSim"));
  const handleChange = (e) => {
    const { name, value } = e.target;
    if (value >= 0 && !value.includes("-")) {
      setNewData((prevState) => ({
        ...prevState,
        [name]: value,
      }));
    }
  };
  setAlpha_quantity(newData.alpha_quantity);
  setBeta_quantity(newData.beta_quantity);

  return (
    <div style={{ fontFamily: "ABeeZee" }}>
      <h2 className="text-start text-xl py-1 font-semibold px-2 ">
        Raw Material
      </h2>

      <table className=" w-full table-fixed border-separate border-spacing-2 bg-blue-gray-50 ">
        <thead>
          <tr className="bg-slate-300  ">
            <th className="text-center py-3 text-lg font-medium ">Entries</th>
            {/* <th className="text-center py-3 text-lg ">Demands</th> */}
            <th className="text-center py-3 text-lg font-medium">Units</th>
          </tr>
        </thead>
        <tbody>
          <tr className="bg-slate-300 ">
            <td className="text-center py-0 text-lg bg-blue-gray-100 rounded-md ">
              {selectedSim[0]?.renamedMappedData?.componentMapp?.alpha}
            </td>
            {/* <td className="text-center py-3 text-lg ">15000 </td> */}
            <td className="text-center py-3 text-lg ">
              <input
                id="alpha-input"
                className={`bg-gray-50 border  text-center text-gray-900 text-sm rounded-lg focus:ring-none focus:border-none mx-auto  p-2 ${
                  !newData.alpha_quantity
                    ? "border-red-500 outline-red-500"
                    : " border-green-500 outline-green-500"
                }`}
                type="number"
                name="alpha_quantity"
                onChange={handleChange}
                placeholder="Enter Units"
                value={newData.alpha_quantity}
                required
              />
            </td>
          </tr>

          <tr className="bg-slate-300 ">
            <td className="text-center py-3 text-lg bg-blue-gray-100 rounded-md ">
              {selectedSim[0]?.renamedMappedData?.componentMapp?.beta}
            </td>
            {/* <td className="text-center py-3 text-lg ">10000</td> */}
            <td className="text-center py-3 text-lg ">
              <input
                id="beta-input"
                className={`bg-gray-50 border text-center text-gray-900 text-sm rounded-lg -lg focus:ring-blue-500 focus:border-blue-500  mx-auto  p-2 ${
                  !newData.beta_quantity
                    ? "border-red-500 outline-red-500"
                    : " border-green-500 outline-green-500"
                }`}
                type="number"
                name="beta_quantity"
                placeholder="Enter Units"
                onChange={handleChange}
                value={newData.beta_quantity}
                required
              />
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default RawMaterial;
