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
        <div className="flex justify-end w-full my-2">
          <PDFDownloadLink
            document={<FGInventorySalesPDF reportData={reportData} />}
            fileName="Product_report_sales.pdf"
          >
            <Button className="bg-red-500">Download PDF</Button>
          </PDFDownloadLink>
        </div>
      </div>
      <table className="w-full text-start text-sm whitespace-nowrap font-sans">
        <thead>
          <tr className=" bg-gray-300 text-red-700 font-semibold">
            <th className="px-6 py-1 text-sm pl-8   text-left">Metric</th>
            <th className="px-6 py-1 text-sm pl-8   text-left">Product Zero</th>
            <th className="px-6 py-1 text-sm pl-8   text-left">
              Smart Home Assistant
            </th>
            <th className="px-6 py-1 text-sm pl-8   text-left">
              Smart Thermo Assistant
            </th>
          </tr>
        </thead>
        <tbody>
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
              {reportData?.beginning_inventory_product_1_0}
            </td>
            <td className="border px-6 py-1 text-sm pl-8 text-right ">
              {reportData?.beginning_inventory_product_1_1}
            </td>
            <td className="border px-6 py-1 text-sm pl-8 text-right ">
              {reportData?.beginning_inventory_product_1_2}
            </td>
          </tr>
          <tr>
            <td className="border px-6 py-1 text-sm pl-8  ">
              + Regular Production
            </td>
            <td className="border px-6 py-1 text-sm pl-8 text-right ">
              {reportData?.regular_production_product_1_0}
            </td>
            <td className="border px-6 py-1 text-sm pl-8 text-right ">
              {reportData?.regular_production_product_1_1}
            </td>
            <td className="border px-6 py-1 text-sm pl-8 text-right ">
              {reportData?.regular_production_product_1_2}
            </td>
          </tr>
          <tr>
            <td className="border px-6 py-1 text-sm pl-8  ">
              + Emergency Production
            </td>
            <td className="border px-6 py-1 text-sm pl-8 text-right ">
              {reportData?.emergency_production_product_1_0}
            </td>
            <td className="border px-6 py-1 text-sm pl-8 text-right ">
              {reportData?.emergency_production_product_1_1}
            </td>
            <td className="border px-6 py-1 text-sm pl-8 text-right ">
              {reportData?.emergency_production_product_1_2}
            </td>
          </tr>
          <tr>
            <td className="border px-6 py-1 text-sm pl-8  ">
              Postponed Production
            </td>
            <td className="border px-6 py-1 text-sm pl-8 text-right ">
              {reportData?.postponed_production_product_1_0}
            </td>
            <td className="border px-6 py-1 text-sm pl-8 text-right ">
              {reportData?.postponed_production_product_1_1}
            </td>
            <td className="border px-6 py-1 text-sm pl-8 text-right ">
              {reportData?.postponed_production_product_1_2}
            </td>
          </tr>
          <tr>
            <td className="border px-6 py-1 text-sm pl-8 ">
              = Available Inventory
            </td>
            <td className="border px-6 py-1 text-sm pl-8 text-right ">
              {reportData?.available_inventory_product_1_0}
            </td>
            <td className="border px-6 py-1 text-sm pl-8 text-right ">
              {reportData?.available_inventory_product_1_1}
            </td>
            <td className="border px-6 py-1 text-sm pl-8 text-right ">
              {reportData?.available_inventory_product_1_2}
            </td>
          </tr>
          <tr>
            <td className="border px-6 py-1 text-sm pl-8  ">
              Shipments To DC2: Surface
            </td>
            <td className="border px-6 py-1 text-sm pl-8 text-right ">
              {reportData?.shipments_to_dc2_surface_product_1_0}
            </td>
            <td className="border px-6 py-1 text-sm pl-8 text-right ">
              {reportData?.shipments_to_dc2_surface_product_1_1}
            </td>
            <td className="border px-6 py-1 text-sm pl-8 text-right ">
              {reportData?.shipments_to_dc2_surface_product_1_2}
            </td>
          </tr>
          <tr>
            <td className="border px-6 py-1 text-sm pl-8 ">
              Shipments To DC2: Air
            </td>
            <td className="border px-6 py-1 text-sm pl-8 text-right ">
              {reportData?.shipments_to_dc2_air_product_1_0}
            </td>
            <td className="border px-6 py-1 text-sm pl-8 text-right ">
              {reportData?.shipments_to_dc2_air_product_1_1}
            </td>
            <td className="border px-6 py-1 text-sm pl-8 text-right ">
              {reportData?.shipments_to_dc2_air_product_1_2}
            </td>
          </tr>
          <tr>
            <td className="border px-6 py-1 text-sm pl-8  ">
              Shipments To DC2: Emergency
            </td>
            <td className="border px-6 py-1 text-sm pl-8 text-right ">
              {reportData?.shipments_to_dc2_emergency_product_1_0}
            </td>
            <td className="border px-6 py-1 text-sm pl-8 text-right ">
              {reportData?.shipments_to_dc2_emergency_product_1_1}
            </td>
            <td className="border px-6 py-1 text-sm pl-8 text-right ">
              {reportData?.shipments_to_dc2_emergency_product_1_2}
            </td>
          </tr>
          <tr>
            <td className="border px-6 py-1 text-sm pl-8  ">Sales, Region 1</td>
            <td className="border px-6 py-1 text-sm pl-8 text-right ">
              {reportData?.sales_region_1_product_1_0}
            </td>
            <td className="border px-6 py-1 text-sm pl-8 text-right ">
              {reportData?.sales_region_1_product_1_1}
            </td>
            <td className="border px-6 py-1 text-sm pl-8 text-right ">
              {reportData?.sales_region_1_product_1_2}
            </td>
          </tr>
          <tr>
            <td className="border px-6 py-1 text-sm pl-8  ">
              Sales, Other Regions
            </td>
            <td className="border px-6 py-1 text-sm pl-8 text-right ">
              {reportData?.sales_other_regions_product_1_0}
            </td>
            <td className="border px-6 py-1 text-sm pl-8 text-right ">
              {reportData?.sales_other_regions_product_1_1}
            </td>
            <td className="border px-6 py-1 text-sm pl-8 text-right ">
              {reportData?.sales_other_regions_product_1_2}
            </td>
          </tr>
          <tr>
            <td className="border px-6 py-1 text-sm pl-8  ">
              = Ending Inventory
            </td>
            <td className="border px-6 py-1 text-sm pl-8 text-right ">
              {reportData?.ending_inventory_product_1_0}
            </td>
            <td className="border px-6 py-1 text-sm pl-8 text-right ">
              {reportData?.ending_inventory_product_1_1}
            </td>
            <td className="border px-6 py-1 text-sm pl-8 text-right ">
              {reportData?.ending_inventory_product_1_2}
            </td>
          </tr>
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
              {reportData?.dc2_beginning_inventory_product_1_0}
            </td>
            <td className="border px-6 py-1 text-sm pl-8 text-right ">
              {reportData?.dc2_beginning_inventory_product_1_1}
            </td>
            <td className="border px-6 py-1 text-sm pl-8 text-right ">
              {reportData?.dc2_beginning_inventory_product_1_2}
            </td>
          </tr>
          <tr>
            <td className="border px-6 py-1 text-sm pl-8  ">
              Shipments From DC1: Surface
            </td>
            <td className="border px-6 py-1 text-sm pl-8 text-right ">
              {reportData?.shipments_from_dc1_surface_product_1_0}
            </td>
            <td className="border px-6 py-1 text-sm pl-8 text-right ">
              {reportData?.shipments_from_dc1_surface_product_1_1}
            </td>
            <td className="border px-6 py-1 text-sm pl-8 text-right ">
              {reportData?.shipments_from_dc1_surface_product_1_2}
            </td>
          </tr>
          <tr>
            <td className="border px-6 py-1 text-sm pl-8  ">
              Shipments From DC1: Air
            </td>
            <td className="border px-6 py-1 text-sm pl-8 text-right ">
              {reportData?.shipments_from_dc1_air_product_1_0}
            </td>
            <td className="border px-6 py-1 text-sm pl-8 text-right ">
              {reportData?.shipments_from_dc1_air_product_1_1}
            </td>
            <td className="border px-6 py-1 text-sm pl-8 text-right ">
              {reportData?.shipments_from_dc1_air_product_1_2}
            </td>
          </tr>
          <tr>
            <td className="border px-6 py-1 text-sm pl-8 ">
              Shipments From DC1: Emergency
            </td>
            <td className="border px-6 py-1 text-sm pl-8 text-right ">
              {reportData?.shipments_from_dc1_emergency_product_1_0}
            </td>
            <td className="border px-6 py-1 text-sm pl-8 text-right ">
              {reportData?.shipments_from_dc1_emergency_product_1_1}
            </td>
            <td className="border px-6 py-1 text-sm pl-8 text-right ">
              {reportData?.shipments_from_dc1_emergency_product_1_2}
            </td>
          </tr>
          <tr>
            <td className="border px-6 py-1 text-sm pl-8  ">
              + Other Shipments
            </td>
            <td className="border px-6 py-1 text-sm pl-8 text-right ">
              {reportData?.other_shipments_product_1_0}
            </td>
            <td className="border px-6 py-1 text-sm pl-8 text-right ">
              {reportData?.other_shipments_product_1_1}
            </td>
            <td className="border px-6 py-1 text-sm pl-8 text-right ">
              {reportData?.other_shipments_product_1_2}
            </td>
          </tr>
          <tr>
            <td className="border px-6 py-1 text-sm pl-8 ">
              = Available Inventory
            </td>
            <td className="border px-6 py-1 text-sm pl-8 text-right ">
              {reportData?.dc2_available_inventory_product_1_0}
            </td>
            <td className="border px-6 py-1 text-sm pl-8 text-right ">
              {reportData?.dc2_available_inventory_product_1_1}
            </td>
            <td className="border px-6 py-1 text-sm pl-8 text-right ">
              {reportData?.dc2_available_inventory_product_1_2}
            </td>
          </tr>
          <tr>
            <td className="border px-6 py-1 text-sm pl-8  ">Sales, Region 2</td>
            <td className="border px-6 py-1 text-sm pl-8 text-right ">
              {reportData?.sales_region_2_product_1_0}
            </td>
            <td className="border px-6 py-1 text-sm pl-8 text-right ">
              {reportData?.sales_region_2_product_1_1}
            </td>
            <td className="border px-6 py-1 text-sm pl-8 text-right ">
              {reportData?.sales_region_2_product_1_2}
            </td>
          </tr>
          <tr>
            <td className="border px-6 py-1 text-sm pl-8  ">
              Sales, Other Regions
            </td>
            <td className="border px-6 py-1 text-sm pl-8 text-right ">
              {reportData?.sales_other_regions_product_1_0}
            </td>
            <td className="border px-6 py-1 text-sm pl-8 text-right ">
              {reportData?.sales_other_regions_product_1_1}
            </td>
            <td className="border px-6 py-1 text-sm pl-8 text-right ">
              {reportData?.sales_other_regions_product_1_2}
            </td>
          </tr>
          <tr>
            <td className="border px-6 py-1 text-sm pl-8 ">
              = Ending Inventory
            </td>
            <td className="border px-6 py-1 text-sm pl-8 text-right ">
              {reportData?.dc2_ending_inventory_product_1_0}
            </td>
            <td className="border px-6 py-1 text-sm pl-8 text-right ">
              {reportData?.dc2_ending_inventory_product_1_1}
            </td>
            <td className="border px-6 py-1 text-sm pl-8 text-right ">
              {reportData?.dc2_ending_inventory_product_1_2}
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default FGInventoryTable;
