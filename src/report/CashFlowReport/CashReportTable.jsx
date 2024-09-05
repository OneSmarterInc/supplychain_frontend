import React from "react";

// Table component that receives `data` via props
const CashFlowTable = () => {
  // Helper function to render table rows dynamically
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
        <p>Product 1 (From: {report.finished_goods_product_1_from.toLocaleString()} To: {report.finished_goods_product_1_to.toLocaleString()})</p>
        <p>Product 2 (From: {report.finished_goods_product_2_from.toLocaleString()} To: {report.finished_goods_product_2_to.toLocaleString()})</p>
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

  return (
    <div className="p-4">
      {data.map((report) => renderReport(report))}
    </div>
  );
};

export default CashFlowTable;