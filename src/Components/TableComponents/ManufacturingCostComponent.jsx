import { useState } from 'react';

const ManufacturingCosts = () => {
  const [manufacturingCosts, setManufacturingCosts] = useState([
    {
      product: 'Postponed Production',
      manufacturingPlant: {
        fixedCosts: 20000,
        laborCosts: 22,
        productionCosts: 11,
      },
      dc1: { fixedCosts: "disabled", laborCosts: "disabled", productionCosts: "disabled" },
      dc2: { fixedCosts: "disabled", laborCosts: "disabled", productionCosts: "disabled" },
      dc3: { fixedCosts: "disabled", laborCosts: "disabled", productionCosts: "disabled" },
    },
    {
      product: 'Hyperware',
      manufacturingPlant: {
        fixedCosts: 22500,
        laborCosts: 30,
        productionCosts: 20,
      },
      dc1: { fixedCosts: 5000, laborCosts: 14, productionCosts: 12 },
      dc2: { fixedCosts: 5000, laborCosts: 15, productionCosts: 14 },
      dc3: { fixedCosts: 4000, laborCosts: 12, productionCosts: 11 },
    },
    {
      product: 'Metaware',
      manufacturingPlant: {
        fixedCosts: 24500,
        laborCosts: 36,
        productionCosts: 16,
      },
      dc1: { fixedCosts: 6000, laborCosts: 16, productionCosts: 12 },
      dc2: { fixedCosts: 8000, laborCosts: 12, productionCosts: 10 },
      dc3: { fixedCosts: 5000, laborCosts: 15, productionCosts: 10 },
    },
  ]);

  console.log("Manufacturing Cost Component:", manufacturingCosts)

  const handleManufacturingInputChange = (event, productIndex, location, field) => {
    const updatedManufacturingCosts = [...manufacturingCosts];
    if (updatedManufacturingCosts[productIndex][location]) {
      updatedManufacturingCosts[productIndex][location][field] = parseFloat(event.target.value) || "disabled";
      setManufacturingCosts(updatedManufacturingCosts);
    }
  };

  const renderManufacturingInput = (value, productIndex, location, field, disabled) => (
    <input
      type="number"
      className={`w-20 px-0 py-1 border rounded text-center ${
        disabled ? 'bg-gray-200 cursor-not-allowed' : 'bg-white'
      }`}
      value={value !== "disabled" ? value : ''}
      onChange={(event) => handleManufacturingInputChange(event, productIndex, location, field)}
      disabled={disabled}
    />
  );

  return (
    <div className="container mx-auto mt-10">
      <h2 className="text-2xl font-bold mb-4">Exhibit 6: Manufacturing Costs (Per Unit)</h2>
      <table className="w-full table-auto border border-gray-300">
        <thead>
            
          <tr className="bg-blue-100">
            <th className="py-2 px-4 border-b border-gray-300 text-center"></th>
            <th colSpan={3} className="py-2 px-4 border-b border-gray-300 text-center"></th>
         
            <th colSpan={9} className="py-2 px-4 border-b border-gray-300 text-center border-l">Postpont Production</th>
          </tr>
          <tr className="bg-blue-100">
            <th className="py-2 px-4 border-b border-gray-300 text-center border-r">Product</th>
            <th colSpan={3} className="py-2 px-4 border-b border-r border-gray-300 text-center">Manufacturing Plant</th>
            <th colSpan={3} className="py-2 px-4 border-b border-r border-gray-300 text-center">DC1</th>
            <th colSpan={3} className="py-2 px-4 border-b border-r border-gray-300 text-center">DC2</th>
            <th colSpan={3} className="py-2 px-4 border-b border-gray-300 text-center">DC3</th>
          </tr>
          <tr className="bg-blue-100">
            <th className="py-2 px-4 border-b border-gray-300 text-center border-r"></th>
            <th className="py-2 px-4 border-b border-gray-300 text-center border-r">Fixed Costs</th>
            <th className="py-2 px-4 border-b border-gray-300 text-center border-r">Labor Costs</th>
            <th className="py-2 px-4 border-b border-gray-300 text-center border-r">Production Costs</th>
            <th className="py-2 px-4 border-b border-gray-300 text-center border-r">Fixed Costs</th>
            <th className="py-2 px-4 border-b border-gray-300 text-center border-r">Labor Costs</th>
            <th className="py-2 px-4 border-b border-gray-300 text-center border-r">Production Costs</th>
            <th className="py-2 px-4 border-b border-gray-300 text-center border-r">Fixed Costs</th>
            <th className="py-2 px-4 border-b border-gray-300 text-center border-r">Labor Costs</th>
            <th className="py-2 px-4 border-b border-gray-300 text-center border-r">Production Costs</th>
            <th className="py-2 px-4 border-b border-gray-300 text-center border-r">Fixed Costs</th>
            <th className="py-2 px-4 border-b border-gray-300 text-center border-r">Labor Costs</th>
            <th className="py-2 px-4 border-b border-gray-300 text-center">Production Costs</th>
          </tr>
        </thead>
        <tbody>
          {manufacturingCosts.map((cost, index) => (
            <tr key={index} className={`${index % 2 === 0 ? 'bg-gray-50' : 'bg-white'}`}>
              <td className="py-2 px-3 border-b border-r border-gray-300 text-center">{cost.product}</td>
              <td className="py-2 px-1 border-b border-r border-gray-300 text-center">
                {renderManufacturingInput(cost.manufacturingPlant.fixedCosts, index, 'manufacturingPlant', 'fixedCosts', cost.manufacturingPlant.fixedCosts === "disabled")}
              </td>
              <td className="py-2 px-1 border-b border-r border-gray-300 text-center">
                {renderManufacturingInput(cost.manufacturingPlant.laborCosts, index, 'manufacturingPlant', 'laborCosts', cost.manufacturingPlant.laborCosts === "disabled")}
              </td>
              <td className="py-2 px-1 border-b border-r border-gray-300 text-center">
                {renderManufacturingInput(cost.manufacturingPlant.productionCosts, index, 'manufacturingPlant', 'productionCosts', cost.manufacturingPlant.productionCosts === "disabled")}
              </td>
              <td className="py-2 px-1 border-b border-r border-gray-300 text-center">
                {renderManufacturingInput(cost.dc1.fixedCosts, index, 'dc1', 'fixedCosts', cost.dc1.fixedCosts === "disabled")}
              </td>
              <td className="py-2 px-1 border-b border-r border-gray-300 text-center">
                {renderManufacturingInput(cost.dc1.laborCosts, index, 'dc1', 'laborCosts', cost.dc1.laborCosts === "disabled")}
              </td>
              <td className="py-2 px-1 border-b border-r border-gray-300 text-center">
                {renderManufacturingInput(cost.dc1.productionCosts, index, 'dc1', 'productionCosts', cost.dc1.productionCosts === "disabled")}
              </td>
              <td className="py-2 px-1 border-b border-r border-gray-300 text-center">
                {renderManufacturingInput(cost.dc2.fixedCosts, index, 'dc2', 'fixedCosts', cost.dc2.fixedCosts === "disabled")}
              </td>
              <td className="py-2 px-1 border-b border-r border-gray-300 text-center">
                {renderManufacturingInput(cost.dc2.laborCosts, index, 'dc2', 'laborCosts', cost.dc2.laborCosts === "disabled")}
              </td>
              <td className="py-2 px-1 border-b border-r border-gray-300 text-center">
                {renderManufacturingInput(cost.dc2.productionCosts, index, 'dc2', 'productionCosts', cost.dc2.productionCosts === "disabled")}
              </td>
              <td className="py-2 px-1 border-b border-r border-gray-300 text-center">
                {renderManufacturingInput(cost.dc3.fixedCosts, index, 'dc3', 'fixedCosts', cost.dc3.fixedCosts === "disabled")}
              </td>
              <td className="py-2 px-1 border-b border-r border-gray-300 text-center">
                {renderManufacturingInput(cost.dc3.laborCosts, index, 'dc3', 'laborCosts', cost.dc3.laborCosts === "disabled")}
              </td>
              <td className="py-2 px-1 border-b border-gray-300 text-center">
                {renderManufacturingInput(cost.dc3.productionCosts, index, 'dc3', 'productionCosts', cost.dc3.productionCosts === "disabled")}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ManufacturingCosts;
