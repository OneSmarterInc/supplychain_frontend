import React from "react";
import { PDFDownloadLink } from "@react-pdf/renderer";
import { Button } from "@material-tailwind/react";
import ProductReportSalesPDF from "./ProductReportSalesPDF";

const ProductReportTable = () => {
  const Data = JSON.parse(localStorage.getItem("reportData"));
  const user = JSON.parse(localStorage.getItem("user"));
  const selectedSim = JSON.parse(localStorage.getItem("selectedSim"));

  const reportData = Data[0];

  return (
    <div>
      <div className="heading flex justify-between font-bold">
        <div>
          <p>Firm : {selectedSim[0].firm_key}</p>
          <p>PERFORMANCE Product REPORT, MONTH {selectedSim[0].current_quarter}</p>
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
            <th className="px-4 py-2">All Regions</th>
            <th className="px-4 py-2">Region 1</th>
            <th className="px-4 py-2">Region 2</th>
            <th className="px-4 py-2">Region 3</th>
          </tr>
        </thead>
        <tbody>
          <tr className="bg-gray-200">
            <td colSpan={5} className="font-bold">
              SALES VOLUME
            </td>
          </tr>
          <td className="border px-4 py-2">Sales Volume All Regions</td>
          <tr>
            <td className="border px-4 py-2">Sales Volume Channel 1</td>
            <td className="border px-4 py-2">
              {reportData.sales_volume_all_regions}
            </td>
            <td className="border px-4 py-2">
              {reportData.sales_volume_region_1_channel_1}
            </td>
            <td className="border px-4 py-2">
              {reportData.sales_volume_region_2_channel_1}
            </td>
            <td className="border px-4 py-2">
              {reportData.sales_volume_region_3_channel_1}
            </td>
          </tr>
          <tr>
            <td className="border px-4 py-2">Sales Volume Channel 2</td>
            <td className="border px-4 py-2">
              {reportData.sales_volume_all_regions}
            </td>
            <td className="border px-4 py-2">
              {reportData.sales_volume_region_1_channel_2}
            </td>
            <td className="border px-4 py-2">
              {reportData.sales_volume_region_2_channel_2}
            </td>
            <td className="border px-4 py-2">
              {reportData.sales_volume_region_3_channel_2}
            </td>
          </tr>
          <tr className="bg-gray-200">
            <td colSpan={5} className="font-bold">
              UNFILLED ORDERS
            </td>
          </tr>
          <tr>
            <td className="border px-4 py-2">Unfilled Orders All Regions</td>
            <td className="border px-4 py-2">
              {reportData.unfilled_orders_all_regions}
            </td>
            <td className="border px-4 py-2">
              {reportData.unfilled_orders_region_1}
            </td>
            <td className="border px-4 py-2">
              {reportData.unfilled_orders_region_2}
            </td>
            <td className="border px-4 py-2">
              {reportData.unfilled_orders_region_3}
            </td>
          </tr>
          <tr className="bg-gray-200">
            <td colSpan={5} className="font-bold">
              PRICES
            </td>
          </tr>
          <tr>
            <td className="border px-4 py-2">Price Channel1</td>
            <td className="border px-4 py-2">{reportData.price_all_regions}</td>
            <td className="border px-4 py-2">{reportData.price_region_1}</td>
            <td className="border px-4 py-2">{reportData.price_region_2}</td>
            <td className="border px-4 py-2">{reportData.price_region_3}</td>
          </tr>
          <tr>
            <td className="border px-4 py-2">Price Channel2</td>
            <td className="border px-4 py-2">{reportData.price_all_regions}</td>
            <td className="border px-4 py-2">{reportData.price_region_1}</td>
            <td className="border px-4 py-2">{reportData.price_region_2}</td>
            <td className="border px-4 py-2">{reportData.price_region_3}</td>
          </tr>
          <tr className="bg-gray-200">
            <td colSpan={5} className="font-bold">
              REVENUE
            </td>
          </tr>
          <tr>
            <td className="border px-4 py-2">Revenue All Regions</td>
            <td className="border px-4 py-2">
              {reportData.revenue_all_regions}
            </td>
            <td className="border px-4 py-2">{reportData.revenue_region_1}</td>
            <td className="border px-4 py-2">{reportData.revenue_region_2}</td>
            <td className="border px-4 py-2">{reportData.revenue_region_3}</td>
          </tr>
          <tr>
            <td className="border px-4 py-2">Product Costs All Regions</td>
            <td className="border px-4 py-2">
              {reportData.product_costs_all_regions}
            </td>
            <td className="border px-4 py-2">
              {reportData.product_costs_region_1}
            </td>
            <td className="border px-4 py-2">
              {reportData.product_costs_region_2}
            </td>
            <td className="border px-4 py-2">
              {reportData.product_costs_region_3}
            </td>
          </tr>
          <tr>
            <td className="border px-4 py-2">Order Processing All Regions</td>
            <td className="border px-4 py-2">
              {reportData.order_processing_all_regions}
            </td>
            <td className="border px-4 py-2">
              {reportData.order_processing_region_1}
            </td>
            <td className="border px-4 py-2">
              {reportData.order_processing_region_2}
            </td>
            <td className="border px-4 py-2">
              {reportData.order_processing_region_3}
            </td>
          </tr>
          <tr>
            <td className="border px-4 py-2">Replacement Parts All Regions</td>
            <td className="border px-4 py-2">
              {reportData.replacement_parts_all_regions}
            </td>
            <td className="border px-4 py-2">
              {reportData.replacement_parts_region_1}
            </td>
            <td className="border px-4 py-2">
              {reportData.replacement_parts_region_2}
            </td>
            <td className="border px-4 py-2">
              {reportData.replacement_parts_region_3}
            </td>
          </tr>
          <tr>
            <td className="border px-4 py-2">RFID Costs All Regions</td>
            <td className="border px-4 py-2">
              {reportData.rfid_costs_all_regions}
            </td>
            <td className="border px-4 py-2">
              {reportData.rfid_costs_region_1}
            </td>
            <td className="border px-4 py-2">
              {reportData.rfid_costs_region_2}
            </td>
            <td className="border px-4 py-2">
              {reportData.rfid_costs_region_3}
            </td>
          </tr>
          <tr>
            <td className="border px-4 py-2">Duties & Tariffs All Regions</td>
            <td className="border px-4 py-2">
              {reportData.duties_tariffs_all_regions}
            </td>
            <td className="border px-4 py-2">
              {reportData.duties_tariffs_region_1}
            </td>
            <td className="border px-4 py-2">
              {reportData.duties_tariffs_region_2}
            </td>
            <td className="border px-4 py-2">
              {reportData.duties_tariffs_region_3}
            </td>
          </tr>
          <tr className="bg-gray-200">
            <td colSpan={5} className="font-bold">
              GROSS MARGIN
            </td>
          </tr>
          <tr>
            <td className="border px-4 py-2">Gross Margin All Regions</td>
            <td className="border px-4 py-2">
              {reportData.gross_margin_all_regions}
            </td>
            <td className="border px-4 py-2">
              {reportData.gross_margin_region_1}
            </td>
            <td className="border px-4 py-2">
              {reportData.gross_margin_region_2}
            </td>
            <td className="border px-4 py-2">
              {reportData.gross_margin_region_3}
            </td>
          </tr>
          <tr className="bg-gray-200">
            <td colSpan={5} className="font-bold">
              FIXED COSTS
            </td>
          </tr>
          <tr>
            <td className="border px-4 py-2">
              Administrative Overhead All Regions
            </td>
            <td className="border px-4 py-2">
              {reportData.administrative_overhead_all_regions}
            </td>
            <td className="border px-4 py-2">
              {reportData.administrative_overhead_region_1}
            </td>
            <td className="border px-4 py-2">
              {reportData.administrative_overhead_region_2}
            </td>
            <td className="border px-4 py-2">
              {reportData.administrative_overhead_region_3}
            </td>
          </tr>

          <tr>
            <td className="border px-4 py-2">
              Forecast Inaccuracy All Regions
            </td>
            <td className="border px-4 py-2">
              {reportData.forecast_inaccuracy_all_regions}
            </td>
            <td className="border px-4 py-2">
              {reportData.forecast_inaccuracy_region_1}
            </td>
            <td className="border px-4 py-2">
              {reportData.forecast_inaccuracy_region_2}
            </td>
            <td className="border px-4 py-2">
              {reportData.forecast_inaccuracy_region_3}
            </td>
          </tr>

          <tr>
            <td className="border px-4 py-2">Marketing , CH1</td>
            <td className="border px-4 py-2">
              {reportData.marketing_all_regions}
            </td>
            <td className="border px-4 py-2">
              {reportData.marketing_region_1}
            </td>
            <td className="border px-4 py-2">
              {reportData.marketing_region_2}
            </td>
            <td className="border px-4 py-2">
              {reportData.marketing_region_3}
            </td>
          </tr>
          <tr>
            <td className="border px-4 py-2">Marketing, CH2</td>
            <td className="border px-4 py-2">
              {reportData.marketing_all_regions}
            </td>
            <td className="border px-4 py-2">
              {reportData.marketing_region_1}
            </td>
            <td className="border px-4 py-2">
              {reportData.marketing_region_2}
            </td>
            <td className="border px-4 py-2">
              {reportData.marketing_region_3}
            </td>
          </tr>

          <tr>
            <td className="border px-4 py-2">Price Change</td>
            <td className="border px-4 py-2">{reportData.price_all_regions}</td>
            <td className="border px-4 py-2">{reportData.price_region_1}</td>
            <td className="border px-4 py-2">{reportData.price_region_2}</td>
            <td className="border px-4 py-2">{reportData.price_region_3}</td>
          </tr>
          <tr>
            <td className="border px-4 py-2">
              Service Outsourcing All Regions
            </td>
            <td className="border px-4 py-2">
              {reportData.service_outsourcing_all_regions}
            </td>
            <td className="border px-4 py-2">
              {reportData.service_outsourcing_region_1}
            </td>
            <td className="border px-4 py-2">
              {reportData.service_outsourcing_region_2}
            </td>
            <td className="border px-4 py-2">
              {reportData.service_outsourcing_region_3}
            </td>
          </tr>

          <tr>
            <td className="border px-4 py-2">Total Fixed Costs </td>
            <td className="border px-4 py-2">
              {reportData.total_fixed_costs_all_regions}
            </td>
            <td className="border px-4 py-2">
              {reportData.total_fixed_costs_region_1}
            </td>
            <td className="border px-4 py-2">
              {reportData.total_fixed_costs_region_2}
            </td>
            <td className="border px-4 py-2">
              {reportData.total_fixed_costs_region_3}
            </td>
          </tr>
          <tr className="bg-gray-200">
            <td colSpan={5} className="font-bold">
              OPERATING INCOME
            </td>
          </tr>
          <tr>
            <td className="border px-4 py-2">Operating Income </td>
            <td className="border px-4 py-2">
              {reportData.operating_income_all_regions}
            </td>
            <td className="border px-4 py-2">
              {reportData.operating_income_region_1}
            </td>
            <td className="border px-4 py-2">
              {reportData.operating_income_region_2}
            </td>
            <td className="border px-4 py-2">
              {reportData.operating_income_region_3}
            </td>
          </tr>
          <tr className="bg-gray-200">
            <td colSpan={5} className="font-bold">
              DISTRIBUTION CENTER
            </td>
          </tr>
          <tr>
            <td className="border px-4 py-2">Distribution Center</td>
            <td className="border px-4 py-2">
              {reportData.distribution_center_all_regions}
            </td>
            <td className="border px-4 py-2">
              {reportData.distribution_center_region_1}
            </td>
            <td className="border px-4 py-2">
              {reportData.distribution_center_region_2}
            </td>
            <td className="border px-4 py-2">
              {reportData.distribution_center_region_3}
            </td>
          </tr>
          <tr className="bg-gray-200">
            <td colSpan={5} className="font-bold">
              RFID OUTSOURCE
            </td>
          </tr>
          <tr>
            <td className="border px-4 py-2">RFID Outsource </td>
            <td className="border px-4 py-2">
              {reportData.rfid_outsource_all_regions}
            </td>
            <td className="border px-4 py-2">
              {reportData.rfid_outsource_region_1}
            </td>
            <td className="border px-4 py-2">
              {reportData.rfid_outsource_region_2}
            </td>
            <td className="border px-4 py-2">
              {reportData.rfid_outsource_region_3}
            </td>
          </tr>
          <tr className="bg-gray-200">
            <td colSpan={5} className="font-bold">
              EMERGENCY CARRIER
            </td>
          </tr>
          <tr>
            <td className="border px-4 py-2">Emergency Carrier </td>
            <td className="border px-4 py-2">
              {reportData.emergency_carrier_all_regions}
            </td>
            <td className="border px-4 py-2">
              {reportData.emergency_carrier_region_1}
            </td>
            <td className="border px-4 py-2">
              {reportData.emergency_carrier_region_2}
            </td>
            <td className="border px-4 py-2">
              {reportData.emergency_carrier_region_3}
            </td>
          </tr>
          <tr className="bg-gray-200">
            <td colSpan={5} className="font-bold">
              SALES VOLUME FORECAST
            </td>
          </tr>
          <tr>
            <td className="border px-4 py-2">
              Sales Volume Forecast Channel 1
            </td>
            <td className="border px-4 py-2">
              {reportData.sales_volume_forecast_region_1_channel_1}
            </td>
            <td className="border px-4 py-2">
              {reportData.sales_volume_forecast_region_2_channel_1}
            </td>
            <td className="border px-4 py-2">
              {reportData.sales_volume_forecast_region_3_channel_1}
            </td>
          </tr>
          <tr>
            <td className="border px-4 py-2">Sales Volume Forecas Channel 2</td>
            <td className="border px-4 py-2">
              {reportData.sales_volume_forecast_region_1_channel_2}
            </td>
            <td className="border px-4 py-2">
              {reportData.sales_volume_forecast_region_2_channel_2}
            </td>
            <td className="border px-4 py-2">
              {reportData.sales_volume_forecast_region_3_channel_2}
            </td>
          </tr>
          <tr className="bg-gray-200">
            <td colSpan={5} className="font-bold">
              PRODUCT CONFIGURATION
            </td>
          </tr>
          <tr>
            <td className="border px-4 py-2">Product Configuration</td>
            <td className="border px-4 py-2">
              {reportData.product_configuration_all_regions}
            </td>
          </tr>
        </tbody>
      </table>
      <div className="flex justify-center my-4">
        <PDFDownloadLink
          document={<ProductReportSalesPDF reportData={reportData} />}
          fileName="Product_report_sales.pdf"
        >
          <Button>Download PDF</Button>
        </PDFDownloadLink>
      </div>
    </div>
  );
};

export default ProductReportTable;
