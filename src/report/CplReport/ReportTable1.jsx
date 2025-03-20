import React, { useRef, useState } from "react";
import { PDFDownloadLink } from "@react-pdf/renderer";
import { Button } from "@material-tailwind/react";
import { SalesPDFDocument } from "./SalesPDFDocument";
import Chart from "react-apexcharts";
import html2pdf from "html2pdf.js";

const ReportTable1 = ({ reportData }) => {
  const reportRef = useRef();
  const [isLoading, setIsLoading] = useState(false);

  const downloadPDF = async () => {
    setIsLoading(true);
    try {
      const element = reportRef.current;
      await html2pdf().from(element).save("c-p&l_report.pdf");
    } catch (error) {
      console.error("Error while downloading PDF:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const [showFullValues, setShowFullValues] = useState(false);

  const toggleValues = () => {
    setShowFullValues((prev) => !prev);
  };

  return (
    <div>
      <div className="heading flex justify-between font-bold mb-4">
        <div>
          <p></p>
        </div>
        <div>
          <button
            className={`p-1 rounded-sm text-base text-white hover:bg-red-700 ${
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
      </div>

      <div id="chart" className="mb-6">
        {/* <Chart
          options={chartData.options}
          series={chartData.series}
          type="bar"
          height={350}
        /> */}
      </div>

      <button
        onClick={toggleValues}
        className="mb-4 bg-blue-500 text-sm text-white py-1 px-2 rounded"
      >
        {showFullValues
          ? "Show Abbreviated Values (M/K) "
          : "Show Complete Values (M/K)"}
      </button>

      <table
        ref={reportRef}
        className="min-w-full bg-white text-gray-800 shadow-md  overflow-hidden"
      >
        <thead className="bg-gray-300 text-white">
          <tr className="py-1">
            <th className="px-6 text-sm py-1 text-red-700 my-auto   text-left ">
              Metric
            </th>
            <th className="px-6 text-sm py-1 text-red-700    text-right ">
              All Products
            </th>
            <th className="px-6 text-sm py-1 text-red-700    text-right ">
              Smart Home Assistant
            </th>
            <th className="px-6 text-sm py-1 text-red-700    text-right ">
              Smart Thermo Assistant
            </th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-200">
          <tr className="hover:bg-gray-50">
            <td className="font-semibold border-t px-6 text-sm py-1">
              Sales Volume
            </td>
            {reportData?.sales_volume?.map((value, index) => (
              <td key={index} className="border-b px-6 text-sm py-1 text-right">
                {value}
              </td>
            ))}
          </tr>
          <tr className="hover:bg-gray-50">
            <td className="font-semibold border-t px-6 text-sm py-1">
              Unfilled Orders
            </td>
            {reportData?.unfilled_orders?.map((value, index) => (
              <td key={index} className="border-b px-6 text-sm py-1 text-right">
                {value}
              </td>
            ))}
          </tr>
          <tr className="hover:bg-gray-50">
            <td className="font-semibold border-t px-6 text-sm py-1">Price</td>
            {reportData?.price?.map((value, index) => (
              <td key={index} className="border-b px-6 text-sm py-1 text-right">
                {value.toFixed(2)}
              </td>
            ))}
          </tr>
          <tr className="bg-gray-100">
            <td className="font-semibold border-t px-6 text-sm py-1">
              Revenues
            </td>
            {reportData?.revenues.map((value, index) => (
              <td key={index} className="border-t px-6 text-sm py-1 text-right">
                {value.toFixed(2)}
              </td>
            ))}
          </tr>
          {showFullValues && (
            <>
              <tr className="bg-gray-50">
                <td className="font-semibold border-t px-6 text-sm py-1">
                  Product Costs
                </td>
                {reportData?.product_costs.map((value, index) => (
                  <td
                    key={index}
                    className="border-t px-6 text-sm py-1 text-right"
                  >
                    {value.toFixed(2)}
                  </td>
                ))}
              </tr>
              <tr className="bg-gray-50">
                <td className="font-semibold border-t px-6 text-sm py-1">
                  Order Processing
                </td>
                {reportData?.order_processing.map((value, index) => (
                  <td
                    key={index}
                    className="border-t px-6 text-sm py-1 text-right"
                  >
                    {value.toFixed(2)}
                  </td>
                ))}
              </tr>
              <tr className="bg-gray-50">
                <td className="font-semibold border-t px-6 text-sm py-1">
                  Replacement Parts
                </td>
                {reportData?.replacement_parts.map((value, index) => (
                  <td
                    key={index}
                    className="border-t px-6 text-sm py-1 text-right"
                  >
                    {value.toFixed(2)}
                  </td>
                ))}
              </tr>
              <tr className="bg-gray-50">
                <td className="font-semibold border-t px-6 text-sm py-1">
                  RFID Costs
                </td>
                {reportData?.rfid_costs.map((value, index) => (
                  <td
                    key={index}
                    className="border-t px-6 text-sm py-1 text-right"
                  >
                    {value.toFixed(2)}
                  </td>
                ))}
              </tr>
              <tr className="bg-gray-50">
                <td className="font-semibold border-t px-6 text-sm py-1">
                  Transportation Costs
                </td>
                {reportData?.transportation_costs.map((value, index) => (
                  <td
                    key={index}
                    className="border-t px-6 text-sm py-1 text-right"
                  >
                    {value.toFixed(2)}
                  </td>
                ))}
              </tr>
              <tr className="bg-gray-50">
                <td className="font-semibold border-t px-6 text-sm py-1">
                  Transportation Rebates
                </td>
                {reportData?.transportation_rebate.map((value, index) => (
                  <td
                    key={index}
                    className="border-t px-6 text-sm py-1 text-right"
                  >
                    {value.toFixed(2)}
                  </td>
                ))}
              </tr>
              <tr className="bg-gray-50">
                <td className="font-semibold border-t px-6 text-sm py-1">
                  Volume Discounts
                </td>
                {reportData?.volume_discounts.map((value, index) => (
                  <td
                    key={index}
                    className="border-t px-6 text-sm py-1 text-right"
                  >
                    {value.toFixed(2)}
                  </td>
                ))}
              </tr>
              <tr className="bg-gray-50">
                <td className="font-semibold border-t px-6 text-sm py-1">
                  Duties & Tariffs
                </td>
                {reportData?.duties_tariffs.map((value, index) => (
                  <td
                    key={index}
                    className="border-t px-6 text-sm py-1 text-right"
                  >
                    {value.toFixed(2)}
                  </td>
                ))}
              </tr>
            </>
          )}

          <tr className="bg-gray-100">
            <td className="font-semibold border-t px-6 text-sm py-1">
              Gross Margin
            </td>
            {reportData?.gross_margin.map((value, index) => (
              <td key={index} className="border-t px-6 text-sm py-1 text-right">
                {value.toFixed(2)}
              </td>
            ))}
          </tr>
          {showFullValues && (
            <>
              {" "}
              <tr className="bg-gray-50">
                <td className="font-semibold border-t px-6 text-sm py-1">
                  Administrative O/H
                </td>
                {reportData?.administrative_oh.map((value, index) => (
                  <td
                    key={index}
                    className="border-t px-6 text-sm py-1 text-right"
                  >
                    {value ? value.toFixed(2) : "-"}
                  </td>
                ))}
              </tr>
              <tr className="bg-gray-50">
                <td className="font-semibold border-t px-6 text-sm py-1">
                  Consulting Fees
                </td>
                {reportData?.consulting_fees.map((value, index) => (
                  <td
                    key={index}
                    className="border-t px-6 text-sm py-1 text-right"
                  >
                    {value ? value.toFixed(2) : "-"}
                  </td>
                ))}
              </tr>
              <tr className="bg-gray-50">
                <td className="font-semibold border-t px-6 text-sm py-1">
                  Corporate O/H
                </td>
                {reportData?.corporate_oh.map((value, index) => (
                  <td
                    key={index}
                    className="border-t px-6 text-sm py-1 text-right"
                  >
                    {value ? value.toFixed(2) : "-"}
                  </td>
                ))}
                <td className="border-t px-6 text-sm py-1 text-right">{"-"}</td>
                <td className="border-t px-6 text-sm py-1 text-right">{"-"}</td>
              </tr>
              <tr className="bg-gray-50">
                <td className="font-semibold border-t px-6 text-sm py-1">
                  Cross-Docking
                </td>
                {reportData?.cross_docking.map((value, index) => (
                  <td
                    key={index}
                    className="border-t px-6 text-sm py-1 text-right"
                  >
                    {value ? value.toFixed(2) : "-"}
                  </td>
                ))}
              </tr>
              <tr className="bg-gray-50">
                <td className="font-semibold border-t px-6 text-sm py-1">
                  Distribution FC
                </td>
                {reportData?.distribution_fc.map((value, index) => (
                  <td
                    key={index}
                    className="border-t px-6 text-sm py-1 text-right"
                  >
                    {value ? value.toFixed(2) : "-"}
                  </td>
                ))}
              </tr>
              <tr className="bg-gray-50">
                <td className="font-semibold border-t px-6 text-sm py-1">
                  Emergency Procurement
                </td>
                {reportData?.emergency_procurement.map((value, index) => (
                  <td
                    key={index}
                    className="border-t px-6 text-sm py-1 text-right"
                  >
                    {value ? value.toFixed(2) : "-"}
                  </td>
                ))}
              </tr>
              <tr className="bg-gray-50">
                <td className="font-semibold border-t px-6 text-sm py-1">
                  Emergency Production
                </td>
                {reportData?.emergency_production.map((value, index) => (
                  <td
                    key={index}
                    className="border-t px-6 text-sm py-1 text-right"
                  >
                    {value ? value.toFixed(2) : "-"}
                  </td>
                ))}
              </tr>
              <tr className="bg-gray-50">
                <td className="font-semibold border-t px-6 text-sm py-1">
                  Forecast Inaccuracy
                </td>
                {reportData?.forecast_inaccuracy.map((value, index) => (
                  <td
                    key={index}
                    className="border-t px-6 text-sm py-1 text-right"
                  >
                    {value ? value.toFixed(2) : "-"}
                  </td>
                ))}
              </tr>
              <tr className="bg-gray-50">
                <td className="font-semibold border-t px-6 text-sm py-1">
                  Information Technology
                </td>
                {reportData?.information_technology.map((value, index) => (
                  <td
                    key={index}
                    className="border-t px-6 text-sm py-1 text-right"
                  >
                    {value ? value.toFixed(2) : "-"}
                  </td>
                ))}
              </tr>
              <tr className="bg-gray-50">
                <td className="font-semibold border-t px-6 text-sm py-1">
                  Introductions
                </td>
                {reportData?.introductions.map((value, index) => (
                  <td
                    key={index}
                    className="border-t px-6 text-sm py-1 text-right"
                  >
                    {value ? value.toFixed(2) : "-"}
                  </td>
                ))}
              </tr>
              <tr className="bg-gray-50">
                <td className="font-semibold border-t px-6 text-sm py-1">
                  Inventory Charges
                </td>
                {reportData?.inventory_charges.map((value, index) => (
                  <td
                    key={index}
                    className="border-t px-6 text-sm py-1 text-right"
                  >
                    {value ? value.toFixed(2) : "-"}
                  </td>
                ))}
              </tr>
              <tr className="bg-gray-50">
                <td className="font-semibold border-t px-6 text-sm py-1">
                  Marketing
                </td>
                {reportData?.marketing.map((value, index) => (
                  <td
                    key={index}
                    className="border-t px-6 text-sm py-1 text-right"
                  >
                    {value ? value.toFixed(2) : "-"}
                  </td>
                ))}
              </tr>
              <tr className="bg-gray-50">
                <td className="font-semibold border-t px-6 text-sm py-1">
                  Plant Capacity FC
                </td>
                {reportData?.plant_capacity_fc.map((value, index) => (
                  <td
                    key={index}
                    className="border-t px-6 text-sm py-1 text-right"
                  >
                    {value ? value.toFixed(2) : "-"}
                  </td>
                ))}
              </tr>
              <tr className="bg-gray-50">
                <td className="font-semibold border-t px-6 text-sm py-1">
                  Price Changes
                </td>
                {reportData?.price_changes.map((value, index) => (
                  <td
                    key={index}
                    className="border-t px-6 text-sm py-1 text-right"
                  >
                    {value ? value.toFixed(2) : "-"}
                  </td>
                ))}
              </tr>
              <tr className="bg-gray-50">
                <td className="font-semibold border-t px-6 text-sm py-1">
                  Procurement FC
                </td>
                {reportData?.procurement_fc.map((value, index) => (
                  <td
                    key={index}
                    className="border-t px-6 text-sm py-1 text-right"
                  >
                    {value ? value.toFixed(2) : "-"}
                  </td>
                ))}
              </tr>
              <tr className="bg-gray-50">
                <td className="font-semibold border-t px-6 text-sm py-1">
                  Production FC
                </td>
                {reportData?.production_fc.map((value, index) => (
                  <td
                    key={index}
                    className="border-t px-6 text-sm py-1 text-right"
                  >
                    {value ? value : "-"}
                  </td>
                ))}
              </tr>
              <tr className="bg-gray-50">
                <td className="font-semibold border-t px-6 text-sm py-1">
                  Research Studies
                </td>
                {reportData?.research_studies.map((value, index) => (
                  <td
                    key={index}
                    className="border-t px-6 text-sm py-1 text-right"
                  >
                    {value ? value.toFixed(2) : "-"}
                  </td>
                ))}
              </tr>
              <tr className="bg-gray-50">
                <td className="font-semibold border-t px-6 text-sm py-1">
                  Service Outsourcing
                </td>
                {reportData?.service_outsourcing.map((value, index) => (
                  <td
                    key={index}
                    className="border-t px-6 text-sm py-1 text-right"
                  >
                    {value ? value : "-"}
                  </td>
                ))}
              </tr>
              <tr className="bg-gray-50">
                <td className="font-semibold border-t px-6 text-sm py-1">
                  Unfilled Handling
                </td>
                {reportData?.unfilled_handling.map((value, index) => (
                  <td
                    key={index}
                    className="border-t px-6 text-sm py-1 text-right"
                  >
                    {value ? value : "-"}
                  </td>
                ))}
              </tr>
              <tr className="bg-gray-50">
                <td className="font-semibold border-b px-6 text-sm py-1">
                  Total Fixed & Other
                </td>
                {reportData?.fixed_other.map((value, index) => (
                  <td
                    key={index}
                    className="border-b px-6 text-sm py-1 text-right"
                  >
                    {value ? value.toFixed(2) : "-"}
                  </td>
                ))}
              </tr>
            </>
          )}
          <tr className="bg-gray-100">
            <td className="font-semibold border-t px-6 text-sm py-1">
              Operating Income
            </td>
            {reportData?.operating_income.map((value, index) => (
              <td key={index} className="border-t px-6 text-sm py-1 text-right">
                {value ? value.toFixed(2) : "-"}
              </td>
            ))}
          </tr>

          <tr>
            <td className="font-semibold border-b px-6 text-sm py-1">
              Non-Operating Income
            </td>
            <td
              className="border-b px-6 text-sm py-1 text-right"
              colSpan={reportData?.sales_volume.length}
            >
              {reportData?.non_operating_income
                ? reportData?.non_operating_income.toFixed(2)
                : "-"}
            </td>
          </tr>

          <tr className="bg-gray-100">
            <td className="font-semibold border-t px-6 text-sm py-1">Taxes</td>
            <td
              className="border-t px-6 text-sm py-1 text-right"
              colSpan={reportData?.sales_volume.length}
            >
              {reportData?.taxes ? reportData?.taxes.toFixed(2) : "-"}
            </td>
          </tr>

          <tr className="bg-gray-100">
            <td className="font-semibold border-b px-6 text-sm py-1">
              Net Income
            </td>
            <td
              className="border-b px-6 text-sm py-1 text-right"
              colSpan={reportData?.sales_volume.length}
            >
              {reportData?.net_income ? reportData?.net_income.toFixed(2) : "-"}
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default ReportTable1;
