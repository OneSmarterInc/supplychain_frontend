import React, { useEffect, useState } from "react";

const RawMaterial = ({ setAlpha_quantity, setBeta_quantity, procurementData1 }) => {
  const procurementData = JSON.parse(localStorage.getItem("procurementData"));
  console.log("ProcurementDataRaw-", procurementData);

  const [newData, setNewData] = useState({
    alpha_quantity: "",
    beta_quantity: "",
  });

  useEffect(() => {
    if (procurementData) {
      setNewData({
        alpha_quantity: procurementData?.alpha_quantity || "",
        beta_quantity: procurementData?.beta_quantity || "",
      });
    }
  }, []);

  useEffect(() => {
    setAlpha_quantity(newData.alpha_quantity);
    setBeta_quantity(newData.beta_quantity);
  }, [newData, setAlpha_quantity, setBeta_quantity]);

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

  return (
    <div className="font-sans">
      <h2 className="text-left text-2xl py-2 font-semibold px-4">
        Raw Material
      </h2>

      <table className="w-full table-auto border-separate border-spacing-2 bg-gray-50">
        <thead>
          <tr className="bg-gray-200">
            <th className="text-center py-3 text-lg font-medium">Entries</th>
            <th className="text-center py-3 text-lg font-medium">Units</th>
          </tr>
        </thead>
        <tbody>
          <tr className="bg-white">
            <td className="text-center py-2 text-lg bg-gray-100 rounded-md">
              {selectedSim[0]?.renamedMappedData?.componentMapp?.alpha}
            </td>
            <td className="text-center py-2 text-lg">
              <input
                id="alpha-input"
                className={`bg-gray-50 border text-center text-gray-900 text-sm rounded-lg focus:ring-none focus:border-none mx-auto p-2 w-full sm:w-3/4 ${
                  !newData.alpha_quantity
                    ? "border-red-500 outline-red-500"
                    : "border-green-500 outline-green-500"
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

          <tr className="bg-white">
            <td className="text-center py-2 text-lg bg-gray-100 rounded-md">
              {selectedSim[0]?.renamedMappedData?.componentMapp?.beta}
            </td>
            <td className="text-center py-2 text-lg">
              <input
                id="beta-input"
                className={`bg-gray-50 border text-center text-gray-900 text-sm rounded-lg focus:ring-none focus:border-none mx-auto p-2 w-full sm:w-3/4 ${
                  !newData.beta_quantity
                    ? "border-red-500 outline-red-500"
                    : "border-green-500 outline-green-500"
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