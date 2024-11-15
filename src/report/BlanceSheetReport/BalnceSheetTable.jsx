import React, { useRef, useState } from "react";
import html2pdf from "html2pdf.js";

const BalanceSheetTable = () => {
  const reportRef = useRef();

  const reportData = JSON.parse(localStorage.getItem("reportData")) || {
    finished_goods: {
      plant_dc1_product0: { units: 0, unit_price: 0, total: 0 },
      plant_dc1_product1: { units: 0, unit_price: 0, total: 0 },
      plant_dc1_product2: { units: 0, unit_price: 0, total: 0 },
    },
    procurement_inventory: {
      plant_dc1_gamma: { units: 0, unit_price: 0, total: 0 },
      plant_dc1_delta: { units: 0, unit_price: 0, total: 0 },
      plant_dc1_epsilon: { units: 0, unit_price: 0, total: 0 },
    },
    total_assets: 0,
    liabilities_equities: {
      corporate_capitalization: 0,
      dividends_current_month: 0,
      dividends_cumulative: 0,
      loans: 0,
      retained_earnings_current_month: 0,
      total: 0,
    },
    notes: {
      epsilon_order_region1: 0,
    },
  };

  const [isLoading, setIsLoading] = useState(false);

  const downloadPDF = async () => {
    setIsLoading(true);
    try {
      const element = reportRef.current;
      await html2pdf().from(element).save("balance_sheet_report.pdf");
    } catch (error) {
      console.error("Error while downloading PDF:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div>
      <div className="flex justify-between mb-4">
        <h2 className="text-2xl font-bold">Balance Sheet</h2>
        <button
          className={`p-1 rounded-sm text-base hover:bg-red-700 text-white ${
            isLoading ? "bg-gray-400 cursor-not-allowed" : "bg-red-400"
          }`}
          onClick={downloadPDF}
          disabled={isLoading}
        >
          {isLoading ? (
            <div className="flex items-center">
              <span className="loader" />
              <span className="ml-2">Generating PDF...</span>
            </div>
          ) : (
            "Download PDF"
          )}
          <i class="fa-solid fa-download"></i>
        </button>
      </div>

      <div ref={reportRef} className="container mx-auto p-4">
        {/* First Table for Inventory */}
        <table className="min-w-full text-left table-auto">
          <thead className="bg-gray-300 text-red-700 font-semibold">
            <tr>
              <th className="px-6 py-1 text-sm font-semibold">Metric</th>
              <th className="px-6 py-1 text-sm font-semibold">Product 0</th>
              <th className="px-6 py-1 text-sm font-semibold">
                Smart Home Assistant
              </th>
              <th className="px-6 py-1 text-sm font-semibold">
                Smart Thermo Assistant
              </th>
            </tr>
          </thead>
          <tbody className="text-gray-700">
            <tr className="bg-gray-100">
              <td
                colSpan={4}
                className="font-bold  text-sm text-gray-900 px-6 py-2"
              >
                PLANT/DC1 FG INVENTORY
              </td>
            </tr>
            <tr>
              <td className="border px-6 text-sm py-1">Units</td>
              <td className="border px-6 text-sm py-1">
                {reportData.finished_goods.plant_dc1_product0?.units || 0}
              </td>
              <td className="border px-6 text-sm py-1">
                {reportData.finished_goods.plant_dc1_product1?.units || 0}
              </td>
              <td className="border px-6 text-sm py-1">
                {reportData.finished_goods.plant_dc1_product2?.units || 0}
              </td>
            </tr>
            <tr>
              <td className="border px-6 text-sm py-1">Unit Price</td>
              <td className="border px-6 text-sm py-1">
                {reportData.finished_goods.plant_dc1_product0?.unit_price || 0}
              </td>
              <td className="border px-6 text-sm py-1">
                {reportData.finished_goods.plant_dc1_product1?.unit_price || 0}
              </td>
              <td className="border px-6 text-sm py-1">
                {reportData.finished_goods.plant_dc1_product2?.unit_price || 0}
              </td>
            </tr>
            <tr>
              <td className="border px-6 text-sm py-1">Total</td>
              <td className="border px-6 text-sm py-1">
                {reportData.finished_goods.plant_dc1_product0?.total || 0}
              </td>
              <td className="border px-6 text-sm py-1">
                {reportData.finished_goods.plant_dc1_product1?.total || 0}
              </td>
              <td className="border px-6 text-sm py-1">
                {reportData.finished_goods.plant_dc1_product2?.total || 0}
              </td>
            </tr>
            {/* Add more rows for other inventory types */}
            <tr className="bg-gray-100">
              <td
                colSpan={4}
                className="font-bold  text-sm text-gray-900 px-6 py-2"
              >
                Raw Inventory
              </td>
            </tr>
            <tr>
              <td className="border px-6 text-sm py-1">Plastics</td>
              <td colSpan={3} className="border px-6 text-sm py-1">
                3453 units @ 3.00/unit: {3453 * 3}
              </td>
            </tr>
            <tr>
              <td className="border px-6 text-sm py-1">Casing</td>
              <td colSpan={3} className="border px-6 text-sm py-1">
                3453 units @ 4.00/unit: {3453 * 4}
              </td>
            </tr>
            <tr className="bg-gray-200">
              <td
                colSpan={4}
                className="font-bold   text-sm text-gray-900 px-6 py-2"
              >
                Procurement Inventory
              </td>
            </tr>

            <tr>
              <td className="border px-6 text-sm py-1">
                Audio Control (Plant & DC1)
              </td>
              <td colSpan={3} className="border px-6 text-sm py-1">
                {reportData.procurement_inventory.plant_dc1_gamma?.units || 0}{" "}
                units @{" "}
                {reportData.procurement_inventory.plant_dc1_gamma?.unit_price ||
                  0}
                /unit:{" "}
                {reportData.procurement_inventory.plant_dc1_gamma?.total || 0}
              </td>
            </tr>
            <tr>
              <td className="border px-6 text-sm py-1">
                Control Interface (Plant & DC1)
              </td>
              <td colSpan={3} className="border px-6 text-sm py-1">
                {reportData.procurement_inventory.plant_dc1_delta?.units || 0}{" "}
                units @{" "}
                {reportData.procurement_inventory.plant_dc1_delta?.unit_price ||
                  0}
                /unit:{" "}
                {reportData.procurement_inventory.plant_dc1_delta?.total || 0}
              </td>
            </tr>
            <tr>
              <td className="border px-6 text-sm py-1">
                Motherboard (Plant & DC1)
              </td>
              <td colSpan={3} className="border px-6 text-sm py-1">
                {reportData.procurement_inventory.plant_dc1_epsilon?.units || 0}{" "}
                units @{" "}
                {reportData.procurement_inventory.plant_dc1_epsilon
                  ?.unit_price || 0}
                /unit:{" "}
                {reportData.procurement_inventory.plant_dc1_epsilon?.total || 0}
              </td>
            </tr>
          </tbody>
        </table>

        <div className="my-6 flex justify-center">
          <h3 className="font-bold text-xl">
            Total Assets: {reportData.total_assets}
          </h3>
        </div>

        {/* Liabilities and Equities Table */}
        <table className="min-w-full text-left table-auto my-6">
          <thead className=" text-white">
            <tr className=" bg-gray-300 text-red-700 font-semibold  text-right ">
              <th className="px-6 col-span-2   py-1 text-sm font-semibold">
                Liabilities and Equities Table
              </th>
              <th className="px-6 col-span-2   py-1 text-sm font-semibold"></th>
            </tr>
            <tr className="bg-gray-200 text-red-700 font-semibold">
              <th className="px-6 py-1 text-sm font-semibold">Metric</th>
              <th className="px-6 py-1 text-sm font-semibold">Amount</th>
            </tr>
          </thead>
          <tbody className="text-gray-700">
            <tr>
              <td className="border px-6 text-sm py-1">
                Corporate Capitalization
              </td>
              <td className="border px-6 text-sm py-1">
                {reportData.liabilities_equities.corporate_capitalization}
              </td>
            </tr>
            <tr>
              <td className="border px-6 text-sm py-1">
                Dividends, Current Month
              </td>
              <td className="border px-6 text-sm py-1">
                {reportData.liabilities_equities.dividends_current_month}
              </td>
            </tr>
            <tr>
              <td className="border px-6 text-sm py-1">
                Dividends, Cumulative
              </td>
              <td className="border px-6 text-sm py-1">
                {reportData.liabilities_equities.dividends_cumulative}
              </td>
            </tr>
            <tr>
              <td className="border px-6 text-sm py-1">Loans</td>
              <td className="border px-6 text-sm py-1">
                {reportData.liabilities_equities.loans}
              </td>
            </tr>
            <tr>
              <td className="border px-6 text-sm py-1">
                Retained Earnings, Current Month
              </td>
              <td className="border px-6 text-sm py-1">
                {
                  reportData.liabilities_equities
                    .retained_earnings_current_month
                }
              </td>
            </tr>
            <tr>
              <td className="border px-6 text-sm py-1">Plant and SMT</td>
              <td className="border px-6 text-sm py-1">45,000,000</td>
            </tr>
            <tr>
              <td className="border px-6 text-sm py-1">Total</td>
              <td className="border px-6 text-sm py-1">
                {reportData.liabilities_equities.total}
              </td>
            </tr>
          </tbody>
        </table>

        {/* Notes Section */}
        <div className="flex justify-center my-6">
          <h3 className="font-bold text-xl">Notes</h3>
        </div>

        <div className="flex justify-center my-4">
          <p>
            These Motherboard components are on-order, for delivery next month:
          </p>
          <p>Region 1: {reportData.notes.epsilon_order_region1}</p>
          {/* Add more regions if needed */}
        </div>
      </div>
    </div>
  );
};

export default BalanceSheetTable;
