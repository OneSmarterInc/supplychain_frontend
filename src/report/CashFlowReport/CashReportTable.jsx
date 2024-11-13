import React, { useRef } from "react";
import html2pdf from "html2pdf.js";

// Table component that receives `data` via props
const CashFlowTable = () => {
  const reportRef = useRef();
  const data = JSON.parse(localStorage.getItem("reportData"));

  if (!data || data.length === 0) {
    return <div className="text-center p-4">No data available</div>;
  }

  // Render a single report (assuming one report is being displayed at a time)
  const renderReport = (report) => (
    <div
      key={report.id}
      className="border p-6 mb-6 bg-white rounded-lg shadow-md"
    >
      <h2 className="text-base p-1 bg-gray-300  font-semibold  mb-2 text-red-700">
        Monthly Financial Report
      </h2>

      {/* Table Layout */}
      <table className="min-w-full bg-white border">
        <tbody>
          {/* Starting Cash Balance */}
          <tr className="border-b">
            <td className="py-1 text-sm px-4 font-semibold text-gray-600">
              Starting "Cash" Balance
            </td>
            <td className="py-1 text-sm px-4 text-gray-800">
              {report.starting_cash_balance.toLocaleString()}
            </td>
          </tr>

          {/* Loans Liquidated */}
          <tr className="border-b">
            <td className="py-1 text-sm px-4 font-semibold text-gray-600">
              Loans (Liquidated During Month)
            </td>
            <td className="py-1 text-sm px-4 text-gray-800">
              {report.loans_liquidated.toLocaleString()}
            </td>
          </tr>

          {/* Finished Goods Inventory Changes */}
          <tr className="border-b">
            <td className="py-1 text-sm px-4 font-semibold text-gray-600">
              Finished Goods Inventory Changes
            </td>
            <td className="py-1 text-sm px-4">
              <div className="text-gray-800">
                <p>
                  Smart Home Assistant: From{" "}
                  {report.finished_goods_product_1_from.toLocaleString()} to{" "}
                  {report.finished_goods_product_1_to.toLocaleString()}
                </p>
                <p>
                  Smart Thermostat: From{" "}
                  {report.finished_goods_product_2_from.toLocaleString()} to{" "}
                  {report.finished_goods_product_2_to.toLocaleString()}
                </p>
              </div>
            </td>
          </tr>

          {/* Net Income */}
          <tr className="border-b">
            <td className="py-1 text-sm px-4 font-semibold text-gray-600">
              Net Income
            </td>
            <td className="py-1 text-sm px-4 text-gray-800">
              {report.net_income.toLocaleString()}
            </td>
          </tr>

          {/* Operating Cash Deficit */}
          <tr className="border-b">
            <td className="py-1 text-sm px-4 font-semibold text-gray-600">
              Operating "Cash" Deficit (From Loans)
            </td>
            <td className="py-1 text-sm px-4 text-gray-800">
              {report.operating_cash_deficit.toLocaleString()}
            </td>
          </tr>

          {/* Final Cash Balance */}
          <tr>
            <td className="py-1 text-sm px-4 font-semibold text-gray-600">
              Final "Cash" Balance (End of Month)
            </td>
            <td className="py-1 text-sm px-4 text-gray-800">
              {report.final_cash_balance.toLocaleString()}
            </td>
          </tr>
        </tbody>
      </table>

      <hr className="my-6" />
    </div>
  );

  // Function to download the current view as PDF
  const downloadPDF = () => {
    const element = reportRef.current;
    html2pdf().from(element).save("cash_flow_report.pdf");
  };

  return (
    <div>
      <div className="flex justify-between mb-4">
        <h1 className="text-xl font-bold ">Cash Flow Analysis Reports</h1>
        <button
          onClick={downloadPDF}
          className="bg-red-500 text-white text-base px-2 py-1 rounded-md"
        >
          Download PDF
        </button>
      </div>

      <div ref={reportRef} className="p-4">
        {data.map((report) => renderReport(report))}
      </div>
    </div>
  );
};

export default CashFlowTable;
