import React, { useRef } from "react";
import html2pdf from "html2pdf.js";

// Table component that receives `data` via props
const CashFlowTable = () => {
  const reportRef = useRef();
  const data = JSON.parse(localStorage.getItem("reportData"));

  if (!data || data.length === 0) {
    return (
      <div className="text-center p-4">
        No data available
      </div>
    );
  }

  // Render a single report (assuming one report is being displayed at a time)
  const renderReport = (report) => (
    <div key={report.id} className="border p-4 mb-4">
      {/* Starting Cash Balance */}
      <div className="mb-4">
        <h3 className="font-semibold">Starting "Cash" Balance:</h3>
        <p>{report.starting_cash_balance.toLocaleString()}</p>
      </div>

      {/* Loans Liquidated */}
      <div className="mb-4">
        <h3 className="font-semibold">Loans (Liquidated During Month):</h3>
        <p>{report.loans_liquidated.toLocaleString()}</p>
      </div>

      {/* Finished Goods Inventory Changes */}
      <div className="mb-4">
        <h3 className="font-semibold">Finished Goods Inventory Changes:</h3>
        <p>Smart Home Asistant ---(From: {report.finished_goods_product_1_from.toLocaleString()} To: {report.finished_goods_product_1_to.toLocaleString()})</p>
        <p>Smart Tharmostat ---(From: {report.finished_goods_product_2_from.toLocaleString()} To: {report.finished_goods_product_2_to.toLocaleString()})</p>
      </div>

      {/* Net Income */}
      <div className="mb-4">
        <h3 className="font-semibold">Net Income:</h3>
        <p>{report.net_income.toLocaleString()}</p>
      </div>

      {/* Operating Cash Deficit */}
      <div className="mb-4">
        <h3 className="font-semibold">Operating "Cash" Deficit (From Loans):</h3>
        <p>{report.operating_cash_deficit.toLocaleString()}</p>
      </div>

      {/* Final Cash Balance */}
      <div className="mb-4">
        <h3 className="font-semibold">Final "Cash" Balance (End of Month):</h3>
        <p>{report.final_cash_balance.toLocaleString()}</p>
      </div>

      <hr className="my-4" />
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
        <h2 className="text-2xl font-bold">Cash Flow Report</h2>
        <button onClick={downloadPDF} className="bg-red-500 text-white px-4 py-2 rounded">
          Download as PDF
        </button>
      </div>

      <div ref={reportRef} className="p-4">
        {data.map((report) => renderReport(report))}
      </div>
    </div>
  );
};

export default CashFlowTable;