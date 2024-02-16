import React, { useState } from "react";

const RawMaterial = ({ setAlpha_quantity, setBeta_quantity }) => {
  const [newData, setNewData] = useState({
    alpha_quantity: "",
    beta_quantity: "",
  });

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
    <div>
      <h2 className="text-center text-3xl py-1 ">Raw Material</h2>

      <table className="table-auto w-full border-separate border-spacing-2  ">
        <thead>
          <tr className="bg-slate-300  ">
            <th className="text-center py-3 text-2xl ">Entries</th>
            <th className="text-center py-3 text-2xl ">Demands</th>
            <th className="text-center py-3 text-2xl ">Units</th>
          </tr>
        </thead>
        <tbody>
          <tr className="bg-slate-300 ">
            <td className="text-center py-3 text-xl ">Alpha</td>
            <td className="text-center py-3 text-xl ">15000 </td>
            <td className="text-center py-3 text-xl ">
              <input
                id="alpha-input"
                className={`bg-gray-50 border  text-center text-gray-900 text-sm rounded-lg focus:ring-none focus:border-none w-32 mx-auto  p-2 ${
                  !newData.alpha_quantity.trim()
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
            <td className="text-center py-3 text-xl ">Beta</td>
            <td className="text-center py-3 text-xl ">10000</td>
            <td className="text-center py-3 text-xl ">
              <input
                id="beta-input"
                className={`bg-gray-50 border text-center text-gray-900 text-sm rounded-lg -lg focus:ring-blue-500 focus:border-blue-500  w-32 mx-auto  p-2 ${
                  !newData.beta_quantity.trim()
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
