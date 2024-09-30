import React from 'react';

const BalanceSheetTable = () => {
  const reportData = JSON.parse(localStorage.getItem("reportData"));
  console.log(reportData.finished_goods.plant_dc1_product1,"from tablr");
  
  return (
    <div>
      <h2 className="text-2xl font-bold">Balance Sheet</h2>
      <table className="w-full text-start whitespace-nowrap">
        <thead>
          <tr>
            <th className="px-4 py-2">Metric</th>
            <th className="px-4 py-2">Product 0</th>
            <th className="px-4 py-2">Smart Home Asistant</th>
            <th className="px-4 py-2">Smart Tharmo Asistant</th>
          </tr>
        </thead>
        <tbody>
          <tr className="bg-gray-200">
            <td colSpan={4} className="font-bold">PLANT/DC1 FG INVENTORY</td>
          </tr>
          <tr>
            <td className="border px-4 py-2">Units</td>
            <td className="border px-4 py-2">{reportData.finished_goods.plant_dc1_product0?.units || 0}</td>
            <td className="border px-4 py-2">{reportData.finished_goods.plant_dc1_product1?.units || 0}</td>
            <td className="border px-4 py-2">{reportData.finished_goods.plant_dc1_product2?.units || 0}</td>
          </tr>
          <tr>
            <td className="border px-4 py-2">Unit Price</td>
            <td className="border px-4 py-2">{reportData.finished_goods.plant_dc1_product0?.unit_price || 0}</td>
            <td className="border px-4 py-2">{reportData.finished_goods.plant_dc1_product1?.unit_price || 0}</td>
            <td className="border px-4 py-2">{reportData.finished_goods.plant_dc1_product2?.unit_price || 0}</td>
          </tr>
          <tr>
            <td className="border px-4 py-2">Total</td>
            <td className="border px-4 py-2">{reportData.finished_goods.plant_dc1_product0?.total || 0}</td>
            <td className="border px-4 py-2">{reportData.finished_goods.plant_dc1_product1?.total || 0}</td>
            <td className="border px-4 py-2">{reportData.finished_goods.plant_dc1_product2?.total || 0}</td>
          </tr>
          {/* Repeat similarly for DC2 and DC3 */}
          <tr className="bg-gray-200">
            <td colSpan={4} className="font-bold">Raw Inventory</td>
          </tr>
          <tr>
            <td className="border px-4 py-2">Plastics</td>
            <td colSpan={3} className="border px-4 py-2">3453 units @ 3.00/unit: {3453*3}</td>
          </tr>
          <tr>
            <td className="border px-4 py-2">Casing</td>
            <td colSpan={3} className="border px-4 py-2">3453 units @ 4.00/unit: {3453*3}</td>
          </tr>

          <tr className="bg-gray-200">
            <td colSpan={4} className="font-bold">Procurement Inventory</td>
          </tr>
         
          <tr>
            <td className="border px-4 py-2">Audio Control (Plant & DC1)</td>
            <td colSpan={3} className="border px-4 py-2">{reportData.procurement_inventory.plant_dc1_gamma?.units || 0} units @ {reportData.procurement_inventory.plant_dc1_gamma?.unit_price || 0}/unit: {reportData.procurement_inventory.plant_dc1_gamma?.total || 0}</td>
          </tr>
          <tr>
            <td className="border px-4 py-2">Control Interface (Plant & DC1)</td>
            <td colSpan={3} className="border px-4 py-2">{reportData.procurement_inventory.plant_dc1_delta?.units || 0} units @ {reportData.procurement_inventory.plant_dc1_delta?.unit_price || 0}/unit: {reportData.procurement_inventory.plant_dc1_delta?.total || 0}</td>
          </tr>
          <tr>
            <td className="border px-4 py-2">Motherboard (Plant & DC1)</td>
            <td colSpan={3} className="border px-4 py-2">{reportData.procurement_inventory.plant_dc1_epsilon?.units || 0} units @ {reportData.procurement_inventory.plant_dc1_epsilon?.unit_price || 0}/unit: {reportData.procurement_inventory.plant_dc1_epsilon?.total || 0}</td>
          </tr>
          {/* Repeat similarly for DC2 and DC3 */}
        </tbody>
      </table>
      <div className="flex justify-center my-4">
        <h3 className="font-bold">Total Assets: {reportData.total_assets}</h3>
      </div>
      <div className="flex justify-center my-4">
        <h3 className="font-bold">Liabilities and Equities</h3>
      </div>
      <table className="w-full text-start whitespace-nowrap">
        <thead>
          <tr>
            <th className="px-4 py-2">Metric</th>
            <th className="px-4 py-2">Amount</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td className="border px-4 py-2">Corporate Capitalization</td>
            <td className="border px-4 py-2">{reportData.liabilities_equities.corporate_capitalization}</td>
          </tr>
          <tr>
            <td className="border px-4 py-2">Dividends, Current Month</td>
            <td className="border px-4 py-2">{reportData.liabilities_equities.dividends_current_month}</td>
          </tr>
          <tr>
            <td className="border px-4 py-2">Dividends, Cumulative</td>
            <td className="border px-4 py-2">{reportData.liabilities_equities.dividends_cumulative}</td>
          </tr>
          <tr>
            <td className="border px-4 py-2">Loans</td>
            <td className="border px-4 py-2">{reportData.liabilities_equities.loans}</td>
          </tr>
          <tr>
            <td className="border px-4 py-2">Retained Earnings, Current Month</td>
            <td className="border px-4 py-2">{reportData.liabilities_equities.retained_earnings_current_month}</td>
          </tr>
          <tr>
            <td className="border px-4 py-2">Plant and SMT</td>
            <td className="border px-4 py-2">45,000,000</td>
          </tr>
          <tr>
            <td className="border px-4 py-2">Total</td>
            <td className="border px-4 py-2">{reportData.liabilities_equities.total}</td>
          </tr>
        </tbody>
      </table>
      <div className="flex justify-center my-4">
        <h3 className="font-bold">Notes</h3>
      </div>
      <div className="flex justify-center my-4">
        <p>These Motherboard components are on-order, for delivery next month:</p>
        <p>Region 1: {reportData.notes.epsilon_order_region1}</p>
        {/* Add region2 and region3 if needed */}
      </div>
    </div>
  );
};

export default BalanceSheetTable;