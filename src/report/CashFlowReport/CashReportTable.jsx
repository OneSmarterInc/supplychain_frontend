import React, { useRef, useState } from "react";
import html2pdf from "html2pdf.js";

const CashFlowTable = ({ data }) => {
  const reportRef = useRef();

  const [isLoading, setIsLoading] = useState(false);

  if (!data || data.length === 0) {
    return <div className="text-center p-4">No data available</div>;
  }

  const downloadPDF = async () => {
    setIsLoading(true);
    try {
      const element = reportRef.current;
      await html2pdf().from(element).save("cash_flow_report.pdf");
    } catch (error) {
      console.error("Error while downloading PDF:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div>
      <div className="flex justify-between mb-4">
        <h1 className="text-xl font-bold ">Cash Flow Analysis Reports</h1>
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

      <div className="p-4">
        <div
          ref={reportRef}
          className="border p-6 mb-6 bg-white rounded-lg shadow-md"
        >
          <h2 className="text-base p-1 bg-gray-300  font-semibold  mb-2 text-red-700">
            Monthly Financial Report
          </h2>

          <table className="min-w-full bg-white border">
            <tbody>
              <tr className="border-b">
                <td className="py-1 text-sm px-4 font-semibold text-gray-600">
                  Starting "Cash" Balance
                </td>
                <td className="py-1 text-sm px-4 text-gray-800">
                  {data.starting_cash_balance.toFixed(2)}
                </td>
              </tr>
              <tr className="border-b">
                <td className="py-1 text-sm px-4 font-semibold text-gray-600">
                  Marketable Securities (Converted To "Cash")
                </td>
                <td className="py-1 text-sm px-4 text-gray-800">
                  {data.marketable_securities.toFixed(2)}
                </td>
              </tr>
              {/* Loans Liquidated */}
              <tr className="border-b">
                <td className="py-1 text-sm px-4 font-semibold text-gray-600">
                  Loans (Liquidated During Month)
                </td>
                <td className="py-1 text-sm px-4 text-gray-800">
                  {data.loans_liquidated.toLocaleString()}
                </td>
              </tr>

              {/* Finished Goods Inventory Changes */}
              <tr className="border-b">
                <td className="py-1 text-sm px-4 font-semibold text-gray-600">
                  Finished Goods Inventory Changes:
                </td>
              </tr>
              <tr className="border-b col-span-2">
                <td className="py-1 text-sm px-4 text-gray-800">
                  <p>
                    Product Zero (From {data.finished_goods_product_0_from} To{" "}
                    {data.finished_goods_product_0_to}){" "}
                  </p>
                  <p>
                    Smart Home Assistant (From{" "}
                    {data.finished_goods_product_1_from} To{" "}
                    {data.finished_goods_product_1_to}){" "}
                  </p>
                  <p>
                    Smart Thermo Assistant (From{" "}
                    {data.finished_goods_product_2_from} To{" "}
                    {data.finished_goods_product_2_to}){" "}
                  </p>
                </td>
                <td className="py-1 text-sm px-4 text-gray-800">
                  <p>
                    {data.finished_goods_product_0_from -
                      data.finished_goods_product_0_to}
                  </p>
                  <p>
                    {data.finished_goods_product_1_from -
                      data.finished_goods_product_1_to}
                  </p>
                  <p>
                    {data.finished_goods_product_2_from -
                      data.finished_goods_product_2_to}
                  </p>
                </td>
              </tr>
              {/* Net Income */}
              <tr className="border-b">
                <td className="py-1 text-sm px-4 font-semibold text-gray-600">
                  Plant Investment Changes
                </td>
                <td className="py-1 text-sm px-4 text-gray-800">
                  {data.plant_investment_changes.toFixed(2)}
                </td>
              </tr>
              <tr className="border-b">
                <td className="py-1 text-sm px-4 font-semibold text-gray-600">
                  Procurement Inventory Changes:
                </td>
              </tr>
              <tr className="border-b col-span-2">
                <td className="py-1 text-sm px-4 text-gray-800">
                  <p>
                    Alpha (From {data.procurement_alpha_from} To{" "}
                    {data.procurement_alpha_to}){" "}
                  </p>
                  <p>
                    Beta (From {data.procurement_beta_from} To{" "}
                    {data.procurement_beta_to}){" "}
                  </p>
                  <p>
                    Gamma (From {data.procurement_gamma_from} To{" "}
                    {data.procurement_gamma_to}){" "}
                  </p>
                  <p>
                    Delta (From {data.procurement_delta_from} To{" "}
                    {data.procurement_delta_to}){" "}
                  </p>
                  <p>
                    Epsilon (From {data.procurement_epsilon_from} To{" "}
                    {data.procurement_epsilon_to}){" "}
                  </p>
                </td>
                <td className="py-1 text-sm px-4 text-gray-800">
                  <p>
                    {data.procurement_alpha_from - data.procurement_alpha_to}
                  </p>
                  <p>{data.procurement_beta_from - data.procurement_beta_to}</p>
                  <p>
                    {data.procurement_gamma_from - data.procurement_gamma_to}
                  </p>
                  <p>
                    {data.procurement_delta_from - data.procurement_delta_to}
                  </p>
                  <p>
                    {data.procurement_epsilon_from -
                      data.procurement_epsilon_to}
                  </p>
                </td>
              </tr>
              <tr className="border-b">
                <td className="py-1 text-sm px-4 font-semibold text-gray-600">
                  Net Income
                </td>
                <td className="py-1 text-sm px-4 text-gray-800">
                  {data.net_income.toFixed(2)}
                </td>
              </tr>
              <tr className="border-b">
                <td className="py-1 text-sm px-4 font-semibold text-gray-600">
                  Preliminary Cash Balance
                </td>
                <td className="py-1 text-sm px-4 text-gray-800">
                  {data.preliminary_cash_balance.toFixed(2)}
                </td>
              </tr>
              <tr className="border-b">
                <td className="py-1 text-sm px-4 font-semibold text-gray-600">
                  Dividends
                </td>
                <td className="py-1 text-sm px-4 text-gray-800">
                  {data.dividends.toFixed(2)}
                </td>
              </tr>
              <tr className="border-b">
                <td className="py-1 text-sm px-4 font-semibold text-gray-600">
                  Actual Cash Balance
                </td>
                <td className="py-1 text-sm px-4 text-gray-800">
                  {data.actual_cash.toFixed(2)}
                </td>
              </tr>
              <tr className="border-b">
                <td className="py-1 text-sm px-4 font-semibold text-gray-600">
                  Operating Cash Excess (To Marketable Securities)
                </td>
                <td className="py-1 text-sm px-4 text-gray-800">
                  {data.operating_cash_excess.toFixed(2)}
                </td>
              </tr>
              <tr className="border-b">
                <td className="py-1 text-sm px-4 font-semibold text-gray-600">
                  Operating Cash Deficit (From Loans)
                </td>
                <td className="py-1 text-sm px-4 text-gray-800">
                  {data.operating_cash_deficit.toFixed(2)}
                </td>
              </tr>
              <tr className="border-b">
                <td className="py-1 text-sm px-4 font-semibold text-gray-600">
                  Final Cash Balance
                </td>
                <td className="py-1 text-sm px-4 text-gray-800">
                  {data.final_cash_balance.toFixed(2)}
                </td>
              </tr>
            </tbody>
          </table>

          <hr className="my-6" />
        </div>
      </div>
    </div>
  );
};

export default CashFlowTable;
