import React, { useState } from "react";

const RawMaterial = () => {
  let [newData, setNewData] = useState([
    {
      alpha: "87654",
    },
    { beta: "12345" },
  ]);
  const onchange = (e) => {
    setNewData({ ...newData, [e.target.name]: [e.target.value] });
    // console.log("alpha", newData.alpha, " beta", newData.beta);
  };
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
              {" "}
              <input
                id="base-input"
                className="bg-gray-50 border text-center border-gray-300 text-gray-900 text-sm rounded-lg -lg focus:ring-blue-500 focus:border-blue-500  w-32 mx-auto  p-2 "
                type="text"
                name="alpha"
                onChange={onchange}
                placeholder="Enter Units"
                value={newData.units}
                required
              />
            </td>
          </tr>

          <tr className="bg-slate-300 ">
            <td className="text-center py-3 text-xl ">Beta</td>
            <td className="text-center py-3 text-xl ">10000</td>
            <td className="text-center py-3 text-xl ">
              {" "}
              <input
                id="base-input"
                className="bg-gray-50 border text-center border-gray-300 text-gray-900 text-sm rounded-lg -lg focus:ring-blue-500 focus:border-blue-500  w-32 mx-auto  p-2 "
                type="text"
                name="beta"
                placeholder="Enter Units"
                onChange={onchange}
                value={newData.units}
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
