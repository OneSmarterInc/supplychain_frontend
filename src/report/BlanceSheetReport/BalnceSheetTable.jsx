import React, { useRef, useState } from "react";
import html2pdf from "html2pdf.js";

const BalanceSheetTable = ({ reportData }) => {
  const reportRef = useRef();

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
                colSpan={3}
                className="font-bold  text-sm text-gray-900 px-6 py-2"
              >
                Cash
              </td>
              <td
                colSpan={1}
                className="font-bold  text-sm text-gray-900 px-6 py-2"
              >
                {reportData.cash.toFixed(2)}
              </td>
            </tr>
            <tr className="bg-gray-100">
              <td
                colSpan={3}
                className="font-bold  text-sm text-gray-900 px-6 py-2"
              >
                Marketable Securities
              </td>
              <td
                colSpan={1}
                className="font-bold  text-sm text-gray-900 px-6 py-2"
              >
                {reportData.marketable_securities.toFixed(2)}
              </td>
            </tr>
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
                {reportData.plant_dc1_product_0_units.toFixed(2)}
              </td>
              <td className="border px-6 text-sm py-1">
                {reportData.plant_dc1_product_1_units.toFixed(2)}
              </td>
              <td className="border px-6 text-sm py-1">
                {reportData.plant_dc1_product_2_units.toFixed(2)}
              </td>
            </tr>
            <tr>
              <td className="border px-6 text-sm py-1">Unit Price</td>
              <td className="border px-6 text-sm py-1">
                {reportData.plant_dc1_product_0_cost.toFixed(2)}
              </td>
              <td className="border px-6 text-sm py-1">
                {reportData.plant_dc1_product_1_cost.toFixed(2)}
              </td>
              <td className="border px-6 text-sm py-1">
                {reportData.plant_dc1_product_2_cost.toFixed(2)}
              </td>
            </tr>
            <tr>
              <td className="border px-6 text-sm py-1">Total</td>
              <td className="border px-6 text-sm py-1">
                {reportData.plant_dc1_product_0_total.toFixed(2)}
              </td>
              <td className="border px-6 text-sm py-1">
                {reportData.plant_dc1_product_1_total.toFixed(2)}
              </td>
              <td className="border px-6 text-sm py-1">
                {reportData.plant_dc1_product_2_total.toFixed(2)}
              </td>
            </tr>
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
                {reportData.procurement_alpha_units.toFixed(2)} units @{" "}
                {reportData.procurement_alpha_cost.toFixed(2)}/unit:{" "}
                {reportData.procurement_alpha_units.toFixed(2) *
                  reportData.procurement_alpha_cost.toFixed(2)}
              </td>
            </tr>
            <tr>
              <td className="border px-6 text-sm py-1">Casing</td>
              <td colSpan={3} className="border px-6 text-sm py-1">
                {reportData.procurement_beta_units.toFixed(2)} units @
                {reportData.procurement_beta_cost.toFixed(2)}/unit:{" "}
                {reportData.procurement_beta_units.toFixed(2) *
                  reportData.procurement_beta_cost.toFixed(2)}
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
                {reportData.procurement_gamma_units.toFixed(2)} units @{" "}
                {reportData.procurement_gamma_cost.toFixed(2)}
                /unit:{" "}
                {reportData.procurement_gamma_units.toFixed(2) *
                  reportData.procurement_gamma_cost.toFixed(2)}
              </td>
            </tr>
            <tr>
              <td className="border px-6 text-sm py-1">
                Control Interface (Plant & DC1)
              </td>
              <td colSpan={3} className="border px-6 text-sm py-1">
                {reportData.procurement_delta_units.toFixed(2)} units @{" "}
                {reportData.procurement_delta_cost.toFixed(2)}
                /unit:{" "}
                {reportData.procurement_delta_units.toFixed(2) *
                  reportData.procurement_delta_cost.toFixed(2)}
              </td>
            </tr>
            <tr>
              <td className="border px-6 text-sm py-1">
                Motherboard (Plant & DC1)
              </td>
              <td colSpan={3} className="border px-6 text-sm py-1">
                {reportData.procurement_epsilon_units.toFixed(2)} units @{" "}
                {reportData.procurement_epsilon_cost.toFixed(2)}
                /unit:{" "}
                {reportData.procurement_epsilon_units.toFixed(2) *
                  reportData.procurement_epsilon_cost.toFixed(2)}
              </td>
            </tr>
          </tbody>
        </table>

        <div className="my-6 flex justify-center">
          <h3 className="font-bold text-xl">Total Assets: {reportData.total_assets.toFixed(2)}</h3>
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
                {reportData.corporate_capitalization.toFixed(2)}
              </td>
            </tr>
            <tr>
              <td className="border px-6 text-sm py-1">
                Dividends, Current Month
              </td>
              <td className="border px-6 text-sm py-1">
                {reportData.dividends.toFixed(2)}
              </td>
            </tr>
            <tr>
              <td className="border px-6 text-sm py-1">Loans</td>
              <td className="border px-6 text-sm py-1">
                {reportData.loans.toFixed(2)}
              </td>
            </tr>
            <tr>
              <td className="border px-6 text-sm py-1">
                Retained Earnings, Current Month
              </td>
              <td className="border px-6 text-sm py-1">
                {reportData.retained_earnings.toFixed(2)}
              </td>
            </tr>
            <tr>
              <td className="border px-6 text-sm py-1">Plant and SMT</td>
              <td className="border px-6 text-sm py-1">
                {reportData.plant_investment.toFixed(2)}
              </td>
            </tr>
            <tr>
              <td className="border px-6 text-sm py-1">Total</td>
              <td className="border px-6 text-sm py-1">
                {reportData.total_liabilities_equities.toFixed(2)}
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
          <p className="ms-3">
            {reportData.on_order_components &&
            Object.keys(reportData.on_order_components).length > 0
              ? Object.entries(reportData.on_order_components)
                  .map(([key, value]) => `${key}: ${value} `)
                  .join(" ")
              : "No data available"}
          </p>

          {/* Add more regions if needed */}
        </div>
      </div>
    </div>
  );
};

export default BalanceSheetTable;
