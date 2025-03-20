import React, { useRef, useState } from "react";
import { PDFDownloadLink } from "@react-pdf/renderer";
import { Button } from "@material-tailwind/react";
import FGInventorySalesPDF from "./FGInventorySalesPDF";
import html2pdf from "html2pdf.js";
const FGInventoryTable = ({ reportData }) => {
  const reportRef = useRef();

  const [isLoading, setIsLoading] = useState(false);

  const downloadPDF = async () => {
    setIsLoading(true);
    try {
      const element = reportRef.current;

      // Add temporary class for styling during PDF generation
      element.classList.add("pdf-export");

      await html2pdf()
        .set({
          margin: 0.5,
          filename: "fgi_report.pdf",
          image: { type: "jpeg", quality: 0.98 },
          html2canvas: { scale: 2 },
          jsPDF: { unit: "in", format: "letter", orientation: "landscape" },
        })
        .from(element)
        .save();

      // Remove the temporary class after PDF is generated
      element.classList.remove("pdf-export");
    } catch (error) {
      console.error("Error while downloading PDF:", error);
    } finally {
      setIsLoading(false);
    }
  };
  return (
    <div>
      <div className="heading flex justify-between font-bold">
        <div className="flex justify-end w-full my-2 mb-10">
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
            )}{" "}
            <i class="fa-solid fa-download"></i>
          </button>
        </div>
      </div>
      <table
        ref={reportRef}
        className="w-full text-start text-sm whitespace-nowrap font-sans"
      >
        <thead>
          <tr className=" bg-gray-300 text-red-700 font-semibold">
            <th className="px-6 py-1 text-sm pl-8   text-left"></th>
            <th className="px-6 py-1 text-sm pl-8   text-left">Product Zero</th>
            <th className="px-6 py-1 text-sm pl-8   text-left">
              Smart Home Assistant
            </th>
            <th className="px-6 py-1 text-sm pl-8   text-left">
              Smart Thermo Assistant
            </th>
          </tr>
        </thead>
        <tbody className="mb-10">
          <tr className="bg-gray-100">
            <td colSpan={4} className="font-bold  px-6 py-2 text-sm  ">
              PLANT/DC1 FG INVENTORY
            </td>
          </tr>
          <tr>
            <td className="border px-6 py-1 text-sm pl-8   ">
              Beginning Inventory
            </td>
            <td className="border px-6 py-1 text-sm pl-8  text-right">
              {reportData?.product0_beginning_inventory}
            </td>
            <td className="border px-6 py-1 text-sm pl-8 text-right ">
              {reportData?.product1_beginning_inventory}
            </td>
            <td className="border px-6 py-1 text-sm pl-8 text-right ">
              {reportData?.product2_beginning_inventory}
            </td>
          </tr>
          <tr>
            <td className="border px-6 py-1 text-sm pl-8  ">
              + Regular Production
            </td>
            <td className="border px-6 py-1 text-sm pl-8 text-right ">
              {reportData?.product0_regular_production}
            </td>
            <td className="border px-6 py-1 text-sm pl-8 text-right ">
              {reportData?.product1_regular_production}
            </td>
            <td className="border px-6 py-1 text-sm pl-8 text-right ">
              {reportData?.product2_regular_production}
            </td>
          </tr>
          <tr>
            <td className="border px-6 py-1 text-sm pl-8  ">
              + Emergency Production
            </td>
            <td className="border px-6 py-1 text-sm pl-8 text-right ">
              {reportData?.product0_emergency_production}
            </td>
            <td className="border px-6 py-1 text-sm pl-8 text-right ">
              {reportData?.product1_emergency_production}
            </td>
            <td className="border px-6 py-1 text-sm pl-8 text-right ">
              {reportData?.product2_emergency_production}
            </td>
          </tr>
          <tr>
            <td className="border px-6 py-1 text-sm pl-8  ">
              Postponed Production
            </td>
            <td className="border px-6 py-1 text-sm pl-8 text-right ">
              {reportData?.product0_postpone_production}
            </td>
            <td className="border px-6 py-1 text-sm pl-8 text-right ">
              {reportData?.product1_postpone_production}
            </td>
            <td className="border px-6 py-1 text-sm pl-8 text-right ">
              {reportData?.product2_postpone_production}
            </td>
          </tr>
          <tr>
            <td className="border px-6 py-1 text-sm pl-8 ">
              = Available Inventory
            </td>
            <td className="border px-6 py-1 text-sm pl-8 text-right ">
              {reportData?.product0_available_inventory}
            </td>
            <td className="border px-6 py-1 text-sm pl-8 text-right ">
              {reportData?.product1_available_inventory}
            </td>
            <td className="border px-6 py-1 text-sm pl-8 text-right ">
              {reportData?.product2_available_inventory}
            </td>
          </tr>
          <tr>
            <td className="border px-6 py-1 text-sm pl-8  ">
              Shipments To DC2: Surface
            </td>
            <td className="border px-6 py-1 text-sm pl-8 text-right ">
              {reportData?.product0_shipment_to_dc2_surface}
            </td>
            <td className="border px-6 py-1 text-sm pl-8 text-right ">
              {reportData?.product1_shipment_to_dc2_surface}
            </td>
            <td className="border px-6 py-1 text-sm pl-8 text-right ">
              {reportData?.product2_shipment_to_dc2_surface}
            </td>
          </tr>
          <tr>
            <td className="border px-6 py-1 text-sm pl-8 ">
              Shipments To DC2: Air
            </td>
            <td className="border px-6 py-1 text-sm pl-8 text-right ">
              {reportData?.product0_shipment_to_dc2_air}
            </td>
            <td className="border px-6 py-1 text-sm pl-8 text-right ">
              {reportData?.product1_shipment_to_dc2_air}
            </td>
            <td className="border px-6 py-1 text-sm pl-8 text-right ">
              {reportData?.product2_shipment_to_dc2_air}
            </td>
          </tr>
          <tr>
            <td className="border px-6 py-1 text-sm pl-8  ">
              Shipments To DC2: Emergency
            </td>
            <td className="border px-6 py-1 text-sm pl-8 text-right ">
              {reportData?.product0_emergency_shipment_to_dc2}
            </td>
            <td className="border px-6 py-1 text-sm pl-8 text-right ">
              {reportData?.product1_emergency_shipment_to_dc2}
            </td>
            <td className="border px-6 py-1 text-sm pl-8 text-right ">
              {reportData?.product2_emergency_shipment_to_dc2}
            </td>
          </tr>
          <tr>
            <td className="border px-6 py-1 text-sm pl-8  ">
              Shipments To DC3: Surface
            </td>
            <td className="border px-6 py-1 text-sm pl-8 text-right ">
              {reportData?.product0_shipment_to_dc3_surface}
            </td>
            <td className="border px-6 py-1 text-sm pl-8 text-right ">
              {reportData?.product1_shipment_to_dc3_surface}
            </td>
            <td className="border px-6 py-1 text-sm pl-8 text-right ">
              {reportData?.product2_shipment_to_dc3_surface}
            </td>
          </tr>
          <tr>
            <td className="border px-6 py-1 text-sm pl-8 ">
              Shipments To DC3: Air
            </td>
            <td className="border px-6 py-1 text-sm pl-8 text-right ">
              {reportData?.product0_shipment_to_dc3_air}
            </td>
            <td className="border px-6 py-1 text-sm pl-8 text-right ">
              {reportData?.product1_shipment_to_dc3_air}
            </td>
            <td className="border px-6 py-1 text-sm pl-8 text-right ">
              {reportData?.product2_shipment_to_dc3_air}
            </td>
          </tr>
          <tr>
            <td className="border px-6 py-1 text-sm pl-8  ">
              Shipments To DC3: Emergency
            </td>
            <td className="border px-6 py-1 text-sm pl-8 text-right ">
              {reportData?.product0_emergency_shipment_to_dc3}
            </td>
            <td className="border px-6 py-1 text-sm pl-8 text-right ">
              {reportData?.product1_emergency_shipment_to_dc3}
            </td>
            <td className="border px-6 py-1 text-sm pl-8 text-right ">
              {reportData?.product2_emergency_shipment_to_dc3}
            </td>
          </tr>
          <tr>
            <td className="border px-6 py-1 text-sm pl-8  ">Sales, Region 1</td>
            <td className="border px-6 py-1 text-sm pl-8 text-right ">{"-"}</td>
            <td className="border px-6 py-1 text-sm pl-8 text-right ">
              {reportData?.product1_sales_region1}
            </td>
            <td className="border px-6 py-1 text-sm pl-8 text-right ">
              {reportData?.product2_sales_region1}
            </td>
          </tr>
          <tr>
            <td className="border px-6 py-1 text-sm pl-8  ">
              Sales, Other Regions
            </td>
            <td className="border px-6 py-1 text-sm pl-8 text-right ">{"-"}</td>
            <td className="border px-6 py-1 text-sm pl-8 text-right ">
              {reportData?.product1_sales_other_region}
            </td>
            <td className="border px-6 py-1 text-sm pl-8 text-right ">
              {reportData?.product2_sales_other_region}
            </td>
          </tr>
          <tr>
            <td className="border px-6 py-1 text-sm pl-8  ">
              = Ending Inventory
            </td>
            <td className="border px-6 py-1 text-sm pl-8 text-right ">
              {reportData?.product0_ending_inventory}
            </td>
            <td className="border px-6 py-1 text-sm pl-8 text-right ">
              {reportData?.product1_ending_inventory}
            </td>
            <td className="border px-6 py-1 text-sm pl-8 text-right ">
              {reportData?.product2_ending_inventory}
            </td>
          </tr>
          {reportData?.dc2_flag && (
            <>
              <tr className="bg-gray-100">
                <td colSpan={4} className="font-bold  px-6 py-2 text-sm ">
                  DC2 FG INVENTORY
                </td>
              </tr>
              <tr>
                <td className="border px-6 py-1 text-sm pl-8  ">
                  Beginning Inventory
                </td>
                <td className="border px-6 py-1 text-sm pl-8 text-right ">
                  {reportData?.product0_beginning_inventory_dc2}
                </td>
                <td className="border px-6 py-1 text-sm pl-8 text-right ">
                  {reportData?.product1_beginning_inventory_dc2}
                </td>
                <td className="border px-6 py-1 text-sm pl-8 text-right ">
                  {reportData?.product2_beginning_inventory_dc2}
                </td>
              </tr>
              <tr>
                <td className="border px-6 py-1 text-sm pl-8  ">
                  Shipments From DC1: Surface
                </td>
                <td className="border px-6 py-1 text-sm pl-8 text-right ">
                  {reportData?.product0_shipment_from_dc1_surface_to_dc2}
                </td>
                <td className="border px-6 py-1 text-sm pl-8 text-right ">
                  {reportData?.product1_shipment_from_dc1_surface_to_dc2}
                </td>
                <td className="border px-6 py-1 text-sm pl-8 text-right ">
                  {reportData?.product2_shipment_from_dc1_surface_to_dc2}
                </td>
              </tr>
              <tr>
                <td className="border px-6 py-1 text-sm pl-8  ">
                  Shipments From DC1: Air
                </td>
                <td className="border px-6 py-1 text-sm pl-8 text-right ">
                  {reportData?.product0_shipment_from_dc1_air_to_dc2}
                </td>
                <td className="border px-6 py-1 text-sm pl-8 text-right ">
                  {reportData?.product1_shipment_from_dc1_air_to_dc2}
                </td>
                <td className="border px-6 py-1 text-sm pl-8 text-right ">
                  {reportData?.product2_shipment_from_dc1_air_to_dc2}
                </td>
              </tr>
              <tr>
                <td className="border px-6 py-1 text-sm pl-8 ">
                  Shipments From DC1: Emergency
                </td>
                <td className="border px-6 py-1 text-sm pl-8 text-right ">
                  {reportData?.product0_emergency_shipment_from_dc1_to_dc2}
                </td>
                <td className="border px-6 py-1 text-sm pl-8 text-right ">
                  {reportData?.product1_emergency_shipment_from_dc1_to_dc2}
                </td>
                <td className="border px-6 py-1 text-sm pl-8 text-right ">
                  {reportData?.product2_emergency_shipment_from_dc1_to_dc2}
                </td>
              </tr>
              <tr>
                <td className="border px-6 py-1 text-sm pl-8 ">
                  = Available Inventory
                </td>
                <td className="border px-6 py-1 text-sm pl-8 text-right ">
                  {reportData?.product0_available_inventory_dc2}
                </td>
                <td className="border px-6 py-1 text-sm pl-8 text-right ">
                  {reportData?.product1_available_inventory_dc2}
                </td>
                <td className="border px-6 py-1 text-sm pl-8 text-right ">
                  {reportData?.product2_available_inventory_dc2}
                </td>
              </tr>
              <tr>
                <td className="border px-6 py-1 text-sm pl-8  ">
                  Sales, Region 2
                </td>
                <td className="border px-6 py-1 text-sm pl-8 text-right ">
                  {"-"}
                </td>
                <td className="border px-6 py-1 text-sm pl-8 text-right ">
                  {reportData?.product1_sales_region2}
                </td>
                <td className="border px-6 py-1 text-sm pl-8 text-right ">
                  {reportData?.product2_sales_region2}
                </td>
              </tr>
              <tr>
                <td className="border px-6 py-1 text-sm pl-8  ">
                  Delayed Shipments
                </td>
                <td className="border px-6 py-1 text-sm pl-8 text-right ">
                  {reportData?.product0_delayed_shipments_dc2}
                </td>
                <td className="border px-6 py-1 text-sm pl-8 text-right ">
                  {reportData?.product1_delayed_shipments_dc2}
                </td>
                <td className="border px-6 py-1 text-sm pl-8 text-right ">
                  {reportData?.product2_delayed_shipments_dc2}
                </td>
              </tr>
              <tr>
                <td className="border px-6 py-1 text-sm pl-8 ">
                  = Ending Inventory
                </td>
                <td className="border px-6 py-1 text-sm pl-8 text-right ">
                  {reportData?.product0_ending_inventory_dc2}
                </td>
                <td className="border px-6 py-1 text-sm pl-8 text-right ">
                  {reportData?.product1_ending_inventory_dc2}
                </td>
                <td className="border px-6 py-1 text-sm pl-8 text-right ">
                  {reportData?.product2_ending_inventory_dc2}
                </td>
              </tr>
            </>
          )}
          {reportData?.dc3_flag && (
            <>
              <tr className="bg-gray-100">
                <td colSpan={4} className="font-bold  px-6 py-2 text-sm ">
                  DC3 FG INVENTORY
                </td>
              </tr>
              <tr>
                <td className="border px-6 py-1 text-sm pl-8  ">
                  Beginning Inventory
                </td>
                <td className="border px-6 py-1 text-sm pl-8 text-right ">
                  {reportData?.product0_beginning_inventory_dc3}
                </td>
                <td className="border px-6 py-1 text-sm pl-8 text-right ">
                  {reportData?.product1_beginning_inventory_dc3}
                </td>
                <td className="border px-6 py-1 text-sm pl-8 text-right ">
                  {reportData?.product2_beginning_inventory_dc3}
                </td>
              </tr>
              <tr>
                <td className="border px-6 py-1 text-sm pl-8  ">
                  Shipments From DC1: Surface
                </td>
                <td className="border px-6 py-1 text-sm pl-8 text-right ">
                  {reportData?.product0_shipment_from_dc1_surface_to_dc3}
                </td>
                <td className="border px-6 py-1 text-sm pl-8 text-right ">
                  {reportData?.product1_shipment_from_dc1_surface_to_dc3}
                </td>
                <td className="border px-6 py-1 text-sm pl-8 text-right ">
                  {reportData?.product2_shipment_from_dc1_surface_to_dc3}
                </td>
              </tr>
              <tr>
                <td className="border px-6 py-1 text-sm pl-8  ">
                  Shipments From DC1: Air
                </td>
                <td className="border px-6 py-1 text-sm pl-8 text-right ">
                  {reportData?.product0_shipment_from_dc1_air_to_dc3}
                </td>
                <td className="border px-6 py-1 text-sm pl-8 text-right ">
                  {reportData?.product1_shipment_from_dc1_air_to_dc3}
                </td>
                <td className="border px-6 py-1 text-sm pl-8 text-right ">
                  {reportData?.product2_shipment_from_dc1_air_to_dc3}
                </td>
              </tr>
              <tr>
                <td className="border px-6 py-1 text-sm pl-8 ">
                  Shipments From DC1: Emergency
                </td>
                <td className="border px-6 py-1 text-sm pl-8 text-right ">
                  {reportData?.product0_emergency_shipment_from_dc1_to_dc3}
                </td>
                <td className="border px-6 py-1 text-sm pl-8 text-right ">
                  {reportData?.product1_emergency_shipment_from_dc1_to_dc3}
                </td>
                <td className="border px-6 py-1 text-sm pl-8 text-right ">
                  {reportData?.product2_emergency_shipment_from_dc1_to_dc3}
                </td>
              </tr>
              <tr>
                <td className="border px-6 py-1 text-sm pl-8 ">
                  = Available Inventory
                </td>
                <td className="border px-6 py-1 text-sm pl-8 text-right ">
                  {reportData?.product0_available_inventory_dc3}
                </td>
                <td className="border px-6 py-1 text-sm pl-8 text-right ">
                  {reportData?.product1_available_inventory_dc3}
                </td>
                <td className="border px-6 py-1 text-sm pl-8 text-right ">
                  {reportData?.product2_available_inventory_dc3}
                </td>
              </tr>
              <tr>
                <td className="border px-6 py-1 text-sm pl-8  ">
                  Sales, Region 2
                </td>
                <td className="border px-6 py-1 text-sm pl-8 text-right ">
                  {"-"}
                </td>
                <td className="border px-6 py-1 text-sm pl-8 text-right ">
                  {reportData?.product1_sales_region3}
                </td>
                <td className="border px-6 py-1 text-sm pl-8 text-right ">
                  {reportData?.product2_sales_region3}
                </td>
              </tr>
              <tr>
                <td className="border px-6 py-1 text-sm pl-8  ">
                  Delayed Shipments
                </td>
                <td className="border px-6 py-1 text-sm pl-8 text-right ">
                  {reportData?.product0_delayed_shipments_dc3}
                </td>
                <td className="border px-6 py-1 text-sm pl-8 text-right ">
                  {reportData?.product1_delayed_shipments_dc3}
                </td>
                <td className="border px-6 py-1 text-sm pl-8 text-right ">
                  {reportData?.product2_delayed_shipments_dc3}
                </td>
              </tr>
              <tr>
                <td className="border px-6 py-1 text-sm pl-8 ">
                  = Ending Inventory
                </td>
                <td className="border px-6 py-1 text-sm pl-8 text-right ">
                  {reportData?.product0_ending_inventory_dc3}
                </td>
                <td className="border px-6 py-1 text-sm pl-8 text-right ">
                  {reportData?.product1_ending_inventory_dc3}
                </td>
                <td className="border px-6 py-1 text-sm pl-8 text-right ">
                  {reportData?.product2_ending_inventory_dc3}
                </td>
              </tr>
            </>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default FGInventoryTable;
