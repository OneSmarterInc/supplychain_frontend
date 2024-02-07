import React from "react";

const RawMaterial = () => {
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
          <td className="text-center py-3 text-xl ">15000</td>
          <td className="text-center py-3 text-xl ">15000</td>
        </tr>

        <tr className="bg-slate-300 ">
          <td className="text-center py-3 text-xl ">Beta</td>
          <td className="text-center py-3 text-xl ">10000</td>
          <td className="text-center py-3 text-xl ">10000</td>
        </tr>
        </tbody>
      </table>
    </div>
  );
};

export default RawMaterial;