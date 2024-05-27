import React from "react";
import { PDFDownloadLink } from "@react-pdf/renderer";
import { Button } from "@material-tailwind/react";
import EvaluationReportSalesPDF from "./EvaluationReportSalesPDF";

const EvaluationReportTable = () => {
  const reportData = {
    id: 1,
    simulation_id: 73,
    admin_id: 1,
    firm_key: "onesmarter inc.",
    quarter: 1,
    net_income_to_revenues_firm_3: 4.5,
    net_income_to_revenues_worst: 4.5,
    net_income_to_revenues_average: 5.4,
    net_income_to_revenues_best: 5.9,
    change_in_net_income_to_revenues_firm_3: -1.7,
    change_in_net_income_to_revenues_worst: -1.7,
    change_in_net_income_to_revenues_average: -0.1,
    change_in_net_income_to_revenues_best: 1.0,
    return_on_assets_firm_3: 13.8,
    return_on_assets_worst: 13.8,
    return_on_assets_average: 16.4,
    return_on_assets_best: 18.0,
    net_asset_turns_firm_3: 3.0,
    net_asset_turns_worst: 2.8,
    net_asset_turns_average: 3.0,
    net_asset_turns_best: 3.0,
    inventory_turnover_firm_3: 4.5,
    inventory_turnover_worst: 3.9,
    inventory_turnover_average: 4.3,
    inventory_turnover_best: 4.7,
    fill_rate_firm_3: 91.1,
    fill_rate_worst: 91.1,
    fill_rate_average: 96.6,
    fill_rate_best: 100.0,
    unplanned_production_firm_3: 15.4,
    unplanned_production_worst: 15.4,
    unplanned_production_average: 12.8,
    unplanned_production_best: 6.4,
    failure_rate_firm_3: 7.2,
    failure_rate_worst: 7.5,
    failure_rate_average: 7.1,
    failure_rate_best: 2.8,
    controllable_procure_mfg_to_revenues_firm_3: 3.1,
    controllable_procure_mfg_to_revenues_worst: 3.1,
    controllable_procure_mfg_to_revenues_average: 2.1,
    controllable_procure_mfg_to_revenues_best: "N/A",
    transportation_expenses_per_unit_sold_firm_3: 34.1,
    transportation_expenses_per_unit_sold_worst: 34.1,
    transportation_expenses_per_unit_sold_average: 32.6,
    transportation_expenses_per_unit_sold_best: 31.1,
    forecasting_accuracy_firm_3: 81.8,
    forecasting_accuracy_worst: 81.8,
    forecasting_accuracy_average: 85.2,
    forecasting_accuracy_best: 87.7,
    marketing_service_to_revenues_firm_3: 8.7,
    marketing_service_to_revenues_worst: 9.0,
    marketing_service_to_revenues_average: 8.7,
    marketing_service_to_revenues_best: 8.5,
    change_in_market_share_firm_3: -0.1,
    change_in_market_share_worst: -1.0,
    change_in_market_share_average: 0.0,
    change_in_market_share_best: 0.5,
    customer_satisfaction_firm_3: 26.6,
    customer_satisfaction_worst: 24.4,
    customer_satisfaction_average: 25.3,
    customer_satisfaction_best: 26.6,
  };

  return (
    <div>
      <div className="heading flex justify-between font-bold">
        <div>
          <p>FIRM 3: InterSet BV</p>
          <p>PERFORMANCE EVALUATION REPORT, MONTH 23</p>
        </div>
        <div>
          <p>INDUSTRY AAA</p>
          <p>PAGE 1</p>
        </div>
      </div>
      <table className="w-full text-start whitespace-nowrap">
        <thead>
          <tr>
            <th className="px-4 py-2">Metric</th>
            <th className="px-4 py-2">Firm 3</th>
            <th className="px-4 py-2">Worst</th>
            <th className="px-4 py-2">Industry Average</th>
            <th className="px-4 py-2">Best</th>
          </tr>
        </thead>
        <tbody>
          <tr className="bg-gray-200">
            <td colSpan={5} className="font-bold">
              FINANCIAL
            </td>
          </tr>
          <tr>
            <td className={`border px-4 py-2 `}>Net Income to Revenues</td>
            <td
              className={`border px-4 py-2 ${
                reportData.net_income_to_revenues_firm_3 < 0
                  ? "text-red-500"
                  : ""
              } `}
            >
              {reportData.net_income_to_revenues_firm_3}%
            </td>
            <td
              className={`border px-4 py-2 ${
                reportData.net_income_to_revenues_worst < 0
                  ? "text-red-500"
                  : ""
              } `}
            >
              {reportData.net_income_to_revenues_worst}%
            </td>
            <td
              className={`border px-4 py-2 ${
                reportData.net_income_to_revenues_average < 0
                  ? "text-red-500"
                  : ""
              } `}
            >
              {reportData.net_income_to_revenues_average}%
            </td>
            <td
              className={`border px-4 py-2 ${
                reportData.net_income_to_revenues_best < 0 ? "text-red-500" : ""
              } `}
            >
              {reportData.net_income_to_revenues_best}%
            </td>
          </tr>
          <tr>
            <td className={`border px-4 py-2`}>
              Change in Net Income to Revenues
            </td>
            <td
              className={`border px-4 py-2 ${
                reportData.change_in_net_income_to_revenues_firm_3 < 0
                  ? "text-red-500"
                  : ""
              } `}
            >
              {reportData.change_in_net_income_to_revenues_firm_3}%
            </td>
            <td
              className={`border px-4 py-2 ${
                reportData.change_in_net_income_to_revenues_worst < 0
                  ? "text-red-500"
                  : ""
              } `}
            >
              {reportData.change_in_net_income_to_revenues_worst}%
            </td>
            <td
              className={`border px-4 py-2 ${
                reportData.change_in_net_income_to_revenues_average < 0
                  ? "text-red-500"
                  : ""
              } `}
            >
              {reportData.change_in_net_income_to_revenues_average}%
            </td>
            <td
              className={`border px-4 py-2 ${
                reportData.change_in_net_income_to_revenues_best < 0
                  ? "text-red-500"
                  : ""
              } `}
            >
              {reportData.change_in_net_income_to_revenues_best}%
            </td>
          </tr>
          <tr>
            <td className={`border px-4 py-2  `}>Return on Assets</td>
            <td
              className={`border px-4 py-2 ${
                reportData.return_on_assets_firm_3 < 0 ? "text-red-500" : ""
              } `}
            >
              {reportData.return_on_assets_firm_3}%
            </td>
            <td
              className={`border px-4 py-2 ${
                reportData.return_on_assets_worst < 0 ? "text-red-500" : ""
              } `}
            >
              {reportData.return_on_assets_worst}%
            </td>
            <td
              className={`border px-4 py-2 ${
                reportData.return_on_assets_average < 0 ? "text-red-500" : ""
              } `}
            >
              {reportData.return_on_assets_average}%
            </td>
            <td
              className={`border px-4 py-2 ${
                reportData.return_on_assets_best < 0 ? "text-red-500" : ""
              } `}
            >
              {reportData.return_on_assets_best}%
            </td>
          </tr>
          <tr>
            <td className={`border px-4 py-2 `}>Net Asset Turns</td>
            <td
              className={`border px-4 py-2 ${
                reportData.net_asset_turns_firm_3 < 0 ? "text-red-500" : ""
              } `}
            >
              {reportData.net_asset_turns_firm_3}
            </td>
            <td
              className={`border px-4 py-2 ${
                reportData.net_asset_turns_worst < 0 ? "text-red-500" : ""
              } `}
            >
              {reportData.net_asset_turns_worst}
            </td>
            <td
              className={`border px-4 py-2 ${
                reportData.net_asset_turns_average < 0 ? "text-red-500" : ""
              } `}
            >
              {reportData.net_asset_turns_average}
            </td>
            <td
              className={`border px-4 py-2 ${
                reportData.net_asset_turns_best < 0 ? "text-red-500" : ""
              } `}
            >
              {reportData.net_asset_turns_best}
            </td>
          </tr>

          <tr className="bg-gray-200">
            <td colSpan={5} className="font-bold">
              OPERATIONAL
            </td>
          </tr>
          <tr>
            <td className={`border px-4 py-2 `}>Inventory Turnover</td>
            <td
              className={`border px-4 py-2 ${
                reportData.inventory_turnover_firm_3 < 0 ? "text-red-500" : ""
              } `}
            >
              {reportData.inventory_turnover_firm_3}
            </td>
            <td
              className={`border px-4 py-2 ${
                reportData.inventory_turnover_worst < 0 ? "text-red-500" : ""
              } `}
            >
              {reportData.inventory_turnover_worst}
            </td>
            <td
              className={`border px-4 py-2 ${
                reportData.inventory_turnover_average < 0 ? "text-red-500" : ""
              } `}
            >
              {reportData.inventory_turnover_average}
            </td>
            <td
              className={`border px-4 py-2 ${
                reportData.inventory_turnover_best < 0 ? "text-red-500" : ""
              } `}
            >
              {reportData.inventory_turnover_best}
            </td>
          </tr>
          <tr>
            <td className={`border px-4 py-2 `}>Fill Rate</td>
            <td
              className={`border px-4 py-2 ${
                reportData.fill_rate_firm_3 < 0 ? "text-red-500" : ""
              } `}
            >
              {reportData.fill_rate_firm_3}%
            </td>
            <td
              className={`border px-4 py-2 ${
                reportData.fill_rate_worst < 0 ? "text-red-500" : ""
              } `}
            >
              {reportData.fill_rate_worst}%
            </td>
            <td
              className={`border px-4 py-2 ${
                reportData.fill_rate_average < 0 ? "text-red-500" : ""
              } `}
            >
              {reportData.fill_rate_average}%
            </td>
            <td
              className={`border px-4 py-2 ${
                reportData.fill_rate_best < 0 ? "text-red-500" : ""
              } `}
            >
              {reportData.fill_rate_best}%
            </td>
          </tr>
          <tr>
            <td className={`border px-4 py-2  `}>Unplanned Production</td>
            <td
              className={`border px-4 py-2 ${
                reportData.unplanned_production_firm_3 < 0 ? "text-red-500" : ""
              } `}
            >
              {reportData.unplanned_production_firm_3}%
            </td>
            <td
              className={`border px-4 py-2 ${
                reportData.unplanned_production_worst < 0 ? "text-red-500" : ""
              } `}
            >
              {reportData.unplanned_production_worst}%
            </td>
            <td
              className={`border px-4 py-2 ${
                reportData.unplanned_production_average < 0
                  ? "text-red-500"
                  : ""
              } `}
            >
              {reportData.unplanned_production_average}%
            </td>
            <td
              className={`border px-4 py-2 ${
                reportData.unplanned_production_best < 0 ? "text-red-500" : ""
              } `}
            >
              {reportData.unplanned_production_best}%
            </td>
          </tr>
          <tr>
            <td className={`border px-4 py-2 `}>Failure Rate</td>
            <td
              className={`border px-4 py-2 ${
                reportData.failure_rate_firm_3 < 0 ? "text-red-500" : ""
              } `}
            >
              {reportData.failure_rate_firm_3}%
            </td>
            <td
              className={`border px-4 py-2 ${
                reportData.failure_rate_worst < 0 ? "text-red-500" : ""
              } `}
            >
              {reportData.failure_rate_worst}%
            </td>
            <td
              className={`border px-4 py-2 ${
                reportData.failure_rate_average < 0 ? "text-red-500" : ""
              } `}
            >
              {reportData.failure_rate_average}%
            </td>
            <td
              className={`border px-4 py-2 ${
                reportData.failure_rate_best < 0 ? "text-red-500" : ""
              } `}
            >
              {reportData.failure_rate_best}%
            </td>
          </tr>
          <tr>
            <td className={`border px-4 py-2  `}>
              Controllable Procure & Mfg to Revenues
            </td>
            <td
              className={`border px-4 py-2 ${
                reportData.controllable_procure_mfg_to_revenues_firm_3 < 0
                  ? "text-red-500"
                  : ""
              } `}
            >
              {reportData.controllable_procure_mfg_to_revenues_firm_3}%
            </td>
            <td
              className={`border px-4 py-2 ${
                reportData.controllable_procure_mfg_to_revenues_worst < 0
                  ? "text-red-500"
                  : ""
              } `}
            >
              {reportData.controllable_procure_mfg_to_revenues_worst}%
            </td>
            <td
              className={`border px-4 py-2 ${
                reportData.controllable_procure_mfg_to_revenues_average < 0
                  ? "text-red-500"
                  : ""
              } `}
            >
              {reportData.controllable_procure_mfg_to_revenues_average}%
            </td>
            <td
              className={`border px-4 py-2 ${
                reportData.controllable_procure_mfg_to_revenues_best < 0
                  ? "text-red-500"
                  : ""
              } `}
            >
              {reportData.controllable_procure_mfg_to_revenues_best}%
            </td>
          </tr>
          <tr>
            <td className={`border px-4 py-2  `}>
              Transportation Expenses Per Unit Sold
            </td>
            <td
              className={`border px-4 py-2 ${
                reportData.transportation_expenses_per_unit_sold_firm_3 < 0
                  ? "text-red-500"
                  : ""
              } `}
            >
              {reportData.transportation_expenses_per_unit_sold_firm_3}
            </td>
            <td
              className={`border px-4 py-2 ${
                reportData.transportation_expenses_per_unit_sold_worst < 0
                  ? "text-red-500"
                  : ""
              } `}
            >
              {reportData.transportation_expenses_per_unit_sold_worst}
            </td>
            <td
              className={`border px-4 py-2 ${
                reportData.transportation_expenses_per_unit_sold_average < 0
                  ? "text-red-500"
                  : ""
              } `}
            >
              {reportData.transportation_expenses_per_unit_sold_average}
            </td>
            <td
              className={`border px-4 py-2 ${
                reportData.transportation_expenses_per_unit_sold_best < 0
                  ? "text-red-500"
                  : ""
              } `}
            >
              {reportData.transportation_expenses_per_unit_sold_best}
            </td>
          </tr>
          <tr>
            <td className={`border px-4 py-2 `}>Forecasting Accuracy</td>
            <td
              className={`border px-4 py-2 ${
                reportData.forecasting_accuracy_firm_3 < 0 ? "text-red-500" : ""
              } `}
            >
              {reportData.forecasting_accuracy_firm_3}%
            </td>
            <td
              className={`border px-4 py-2 ${
                reportData.forecasting_accuracy_worst < 0 ? "text-red-500" : ""
              } `}
            >
              {reportData.forecasting_accuracy_worst}%
            </td>
            <td
              className={`border px-4 py-2 ${
                reportData.forecasting_accuracy_average < 0
                  ? "text-red-500"
                  : ""
              } `}
            >
              {reportData.forecasting_accuracy_average}%
            </td>
            <td
              className={`border px-4 py-2 ${
                reportData.forecasting_accuracy_best < 0 ? "text-red-500" : ""
              } `}
            >
              {reportData.forecasting_accuracy_best}%
            </td>
          </tr>
          <tr>
            <td className={`border px-4 py-2  `}>
              (Marketing + Service) to Revenues
            </td>
            <td
              className={`border px-4 py-2 ${
                reportData.marketing_service_to_revenues_firm_3 < 0
                  ? "text-red-500"
                  : ""
              } `}
            >
              {reportData.marketing_service_to_revenues_firm_3}%
            </td>
            <td
              className={`border px-4 py-2 ${
                reportData.marketing_service_to_revenues_worst < 0
                  ? "text-red-500"
                  : ""
              } `}
            >
              {reportData.marketing_service_to_revenues_worst}%
            </td>
            <td
              className={`border px-4 py-2 ${
                reportData.marketing_service_to_revenues_average < 0
                  ? "text-red-500"
                  : ""
              } `}
            >
              {reportData.marketing_service_to_revenues_average}%
            </td>
            <td
              className={`border px-4 py-2 ${
                reportData.marketing_service_to_revenues_best < 0
                  ? "text-red-500"
                  : ""
              } `}
            >
              {reportData.marketing_service_to_revenues_best}%
            </td>
          </tr>

          <tr className="bg-gray-200">
            <td colSpan={5} className="font-bold">
              CUSTOMER SATISFACTION
            </td>
          </tr>
          <tr>
            <td className={`border px-4 py-2 `}>Change in Market Share</td>
            <td
              className={`border px-4 py-2 ${
                reportData.change_in_market_share_firm_3 < 0
                  ? "text-red-500"
                  : ""
              } `}
            >
              {reportData.change_in_market_share_firm_3}%
            </td>
            <td
              className={`border px-4 py-2 ${
                reportData.change_in_market_share_worst < 0
                  ? "text-red-500"
                  : ""
              } `}
            >
              {reportData.change_in_market_share_worst}%
            </td>
            <td
              className={`border px-4 py-2 ${
                reportData.change_in_market_share_average < 0
                  ? "text-red-500"
                  : ""
              } `}
            >
              {reportData.change_in_market_share_average}%
            </td>
            <td
              className={`border px-4 py-2 ${
                reportData.change_in_market_share_best < 0 ? "text-red-500" : ""
              } `}
            >
              {reportData.change_in_market_share_best}%
            </td>
          </tr>
          <tr>
            <td className={`border px-4 py-2 `}>Customer Satistfaction</td>
            <td
              className={`border px-4 py-2 ${
                reportData.customer_satisfaction_firm_3 < 0
                  ? "text-red-500"
                  : ""
              } `}
            >
              {reportData.customer_satisfaction_firm_3}%
            </td>
            <td
              className={`border px-4 py-2 ${
                reportData.customer_satisfaction_worst < 0 ? "text-red-500" : ""
              } `}
            >
              {reportData.customer_satisfaction_worst}%
            </td>
            <td
              className={`border px-4 py-2 ${
                reportData.customer_satisfaction_average < 0
                  ? "text-red-500"
                  : ""
              } `}
            >
              {reportData.customer_satisfaction_average}%
            </td>
            <td
              className={`border px-4 py-2 ${
                reportData.customer_satisfaction_best < 0 ? "text-red-500" : ""
              } `}
            >
              {reportData.customer_satisfaction_best}%
            </td>
          </tr>
        </tbody>
      </table>
      <PDFDownloadLink
        document={<EvaluationReportSalesPDF reportData={reportData} />}
        fileName="evaluation_report.pdf"
      >
        <Button className="mt-4" variant="contained" color="primary">
          Download PDF
        </Button>
      </PDFDownloadLink>
    </div>
  );
};

export default EvaluationReportTable;
