import React from "react";
import { PDFDownloadLink } from "@react-pdf/renderer";
import { Button } from "@material-tailwind/react";
import FGInventorySalesPDF from "./FGInventorySalesPDF";

const FGInventoryTable = () => {
  const Data = JSON.parse(localStorage.getItem("reportData"));
  const selectedSim = JSON.parse(localStorage.getItem("selectedSim"));
  const reportData = Data[0];

  return (
    <div>
      <div className="heading flex justify-between font-bold">
      </div>
      <table className="w-full text-start whitespace-nowrap">
        <thead>
          <tr>
            <th className="px-4 py-2">Metric</th>
            <th className="px-4 py-2">Product Zero</th>
            <th className="px-4 py-2">Smart Home Asistant</th>
            <th className="px-4 py-2">Smart Tharmo Asistant</th>
          </tr>
        </thead>
        <tbody>
          <tr className="bg-gray-200">
            <td colSpan={4} className="font-bold">
              PLANT/DC1 FG INVENTORY
            </td>
          </tr>
          <tr>
            <td className="border px-4 py-2">Beginning Inventory</td>
            <td className="border px-4 py-2">
              {reportData?.beginning_inventory_product_1_0}
            </td>
            <td className="border px-4 py-2">
              {reportData?.beginning_inventory_product_1_1}
            </td>
            <td className="border px-4 py-2">
              {reportData?.beginning_inventory_product_1_2}
            </td>
          </tr>
          <tr>
            <td className="border px-4 py-2">+ Regular Production</td>
            <td className="border px-4 py-2">
              {reportData?.regular_production_product_1_0}
            </td>
            <td className="border px-4 py-2">
              {reportData?.regular_production_product_1_1}
            </td>
            <td className="border px-4 py-2">
              {reportData?.regular_production_product_1_2}
            </td>
          </tr>
          <tr>
            <td className="border px-4 py-2">+ Emergency Production</td>
            <td className="border px-4 py-2">
              {reportData?.emergency_production_product_1_0}
            </td>
            <td className="border px-4 py-2">
              {reportData?.emergency_production_product_1_1}
            </td>
            <td className="border px-4 py-2">
              {reportData?.emergency_production_product_1_2}
            </td>
          </tr>
          <tr>
            <td className="border px-4 py-2">Postponed Production</td>
            <td className="border px-4 py-2">
              {reportData?.postponed_production_product_1_0}
            </td>
            <td className="border px-4 py-2">
              {reportData?.postponed_production_product_1_1}
            </td>
            <td className="border px-4 py-2">
              {reportData?.postponed_production_product_1_2}
            </td>
          </tr>
          <tr>
            <td className="border px-4 py-2">= Available Inventory</td>
            <td className="border px-4 py-2">
              {reportData?.available_inventory_product_1_0}
            </td>
            <td className="border px-4 py-2">
              {reportData?.available_inventory_product_1_1}
            </td>
            <td className="border px-4 py-2">
              {reportData?.available_inventory_product_1_2}
            </td>
          </tr>
          <tr>
            <td className="border px-4 py-2">Shipments To DC2: Surface</td>
            <td className="border px-4 py-2">
              {reportData?.shipments_to_dc2_surface_product_1_0}
            </td>
            <td className="border px-4 py-2">
              {reportData?.shipments_to_dc2_surface_product_1_1}
            </td>
            <td className="border px-4 py-2">
              {reportData?.shipments_to_dc2_surface_product_1_2}
            </td>
          </tr>
          <tr>
            <td className="border px-4 py-2">Shipments To DC2: Air</td>
            <td className="border px-4 py-2">
              {reportData?.shipments_to_dc2_air_product_1_0}
            </td>
            <td className="border px-4 py-2">
              {reportData?.shipments_to_dc2_air_product_1_1}
            </td>
            <td className="border px-4 py-2">
              {reportData?.shipments_to_dc2_air_product_1_2}
            </td>
          </tr>
          <tr>
            <td className="border px-4 py-2">Shipments To DC2: Emergency</td>
            <td className="border px-4 py-2">
              {reportData?.shipments_to_dc2_emergency_product_1_0}
            </td>
            <td className="border px-4 py-2">
              {reportData?.shipments_to_dc2_emergency_product_1_1}
            </td>
            <td className="border px-4 py-2">
              {reportData?.shipments_to_dc2_emergency_product_1_2}
            </td>
          </tr>
          <tr>
            <td className="border px-4 py-2">Sales, Region 1</td>
            <td className="border px-4 py-2">
              {reportData?.sales_region_1_product_1_0}
            </td>
            <td className="border px-4 py-2">
              {reportData?.sales_region_1_product_1_1}
            </td>
            <td className="border px-4 py-2">
              {reportData?.sales_region_1_product_1_2}
            </td>
          </tr>
          <tr>
            <td className="border px-4 py-2">Sales, Other Regions</td>
            <td className="border px-4 py-2">
              {reportData?.sales_other_regions_product_1_0}
            </td>
            <td className="border px-4 py-2">
              {reportData?.sales_other_regions_product_1_1}
            </td>
            <td className="border px-4 py-2">
              {reportData?.sales_other_regions_product_1_2}
            </td>
          </tr>
          <tr>
            <td className="border px-4 py-2">= Ending Inventory</td>
            <td className="border px-4 py-2">
              {reportData?.ending_inventory_product_1_0}
            </td>
            <td className="border px-4 py-2">
              {reportData?.ending_inventory_product_1_1}
            </td>
            <td className="border px-4 py-2">
              {reportData?.ending_inventory_product_1_2}
            </td>
          </tr>
          <tr className="bg-gray-200">
            <td colSpan={4} className="font-bold">
              DC2 FG INVENTORY
            </td>
          </tr>
          <tr>
            <td className="border px-4 py-2">Beginning Inventory</td>
            <td className="border px-4 py-2">
              {reportData?.dc2_beginning_inventory_product_1_0}
            </td>
            <td className="border px-4 py-2">
              {reportData?.dc2_beginning_inventory_product_1_1}
            </td>
            <td className="border px-4 py-2">
              {reportData?.dc2_beginning_inventory_product_1_2}
            </td>
          </tr>
          <tr>
            <td className="border px-4 py-2">Shipments From DC1: Surface</td>
            <td className="border px-4 py-2">
              {reportData?.shipments_from_dc1_surface_product_1_0}
            </td>
            <td className="border px-4 py-2">
              {reportData?.shipments_from_dc1_surface_product_1_1}
            </td>
            <td className="border px-4 py-2">
              {reportData?.shipments_from_dc1_surface_product_1_2}
            </td>
          </tr>
          <tr>
            <td className="border px-4 py-2">Shipments From DC1: Air</td>
            <td className="border px-4 py-2">
              {reportData?.shipments_from_dc1_air_product_1_0}
            </td>
            <td className="border px-4 py-2">
              {reportData?.shipments_from_dc1_air_product_1_1}
            </td>
            <td className="border px-4 py-2">
              {reportData?.shipments_from_dc1_air_product_1_2}
            </td>
          </tr>
          <tr>
            <td className="border px-4 py-2">Shipments From DC1: Emergency</td>
            <td className="border px-4 py-2">
              {reportData?.shipments_from_dc1_emergency_product_1_0}
            </td>
            <td className="border px-4 py-2">
              {reportData?.shipments_from_dc1_emergency_product_1_1}
            </td>
            <td className="border px-4 py-2">
              {reportData?.shipments_from_dc1_emergency_product_1_2}
            </td>
          </tr>
          <tr>
            <td className="border px-4 py-2">Postponed Production</td>
            <td className="border px-4 py-2">
              {reportData?.dc2_postponed_production_product_1_0}
            </td>
            <td className="border px-4 py-2">
              {reportData?.dc2_postponed_production_product_1_1}
            </td>
            <td className="border px-4 py-2">
              {reportData?.dc2_postponed_production_product_1_2}
            </td>
          </tr>
          <tr>
            <td className="border px-4 py-2">= Available Inventory</td>
            <td className="border px-4 py-2">
              {reportData?.dc2_available_inventory_product_1_0}
            </td>
            <td className="border px-4 py-2">
              {reportData?.dc2_available_inventory_product_1_1}
            </td>
            <td className="border px-4 py-2">
              {reportData?.dc2_available_inventory_product_1_2}
            </td>
          </tr>
          <tr>
            <td className="border px-4 py-2">Sales, Region 2</td>
            <td className="border px-4 py-2">
              {reportData?.sales_region_2_product_1_0}
            </td>
            <td className="border px-4 py-2">
              {reportData?.sales_region_2_product_1_1}
            </td>
            <td className="border px-4 py-2">
              {reportData?.sales_region_2_product_1_2}
            </td>
          </tr>
          <tr>
            <td className="border px-4 py-2">+ Delayed Shipments</td>
            <td className="border px-4 py-2">
              {reportData?.delayed_shipments_product_1_0}
            </td>
            <td className="border px-4 py-2">
              {reportData?.delayed_shipments_product_1_1}
            </td>
            <td className="border px-4 py-2">
              {reportData?.delayed_shipments_product_1_2}
            </td>
          </tr>
          <tr>
            <td className="border px-4 py-2">= Ending Inventory</td>
            <td className="border px-4 py-2">
              {reportData?.dc2_ending_inventory_product_1_0}
            </td>
            <td className="border px-4 py-2">
              {reportData?.dc2_ending_inventory_product_1_1}
            </td>
            <td className="border px-4 py-2">
              {reportData?.dc2_ending_inventory_product_1_2}
            </td>
          </tr>
        </tbody>
      </table>
      <div className="flex justify-center my-4">
        <PDFDownloadLink
          document={<FGInventorySalesPDF reportData={reportData} />}
          fileName="Product_report_sales.pdf"
        >
          <Button>Download PDF</Button>
        </PDFDownloadLink>
      </div>
    </div>
  );
};

export default FGInventoryTable;
