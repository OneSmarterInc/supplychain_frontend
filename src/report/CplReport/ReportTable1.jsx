import React from "react";
import { PDFDownloadLink } from "@react-pdf/renderer";
import { Button } from "@material-tailwind/react";
import { SalesPDFDocument } from "./SalesPDFDocument";

const ReportTable1 = () => {
  const reportData = JSON.parse(localStorage.getItem("reportData"));

  // const reportData = [
  //   {
  //     "Sales Volume": {
  //       "All Products": 123,
  //       "Product 7-1": 31631,
  //       "Product 7-2": 18604,
  //     },
  //     "Unfilled Orders": {
  //       "All Products": 0,
  //       "Product 7-1": 0,
  //       "Product 7-2": 0,
  //     },
  //     Price: {
  //       "All Products": 368,
  //       "Product 7-1": 374,
  //       "Product 7-2": 357,
  //     },
  //   },
  //   {
  //     details: {
  //       "Product Costs": {
  //         "All Products": 8050921,
  //         "Product 7-1": 4689926,
  //         "Product 7-2": 3360995,
  //       },
  //       "Order Processing": {
  //         "All Products": 659780,
  //       },
  //       "Replacement Parts": {
  //         "All Products": 114946,
  //       },
  //       "RFID Costs": {
  //         "All Products": 409395,
  //       },
  //       "Transportation Costs": {
  //         "All Products": 1706785,
  //       },
  //       "Transportation Rebates": {
  //         "All Products": 40000,
  //       },
  //       "Volume Discount": {
  //         "All Products": 0,
  //       },
  //       "Duties and Traffic": {
  //         "All Products": 838687,
  //       },
  //     },
  //     "All Products": 18511800,
  //     "Product 7-1": 11857200,
  //     "Product 7-2": 6654600,
  //   },
  //   {
  //     "All Products": 6771286,
  //     "Product 7-1": 5896151,
  //     "Product 7-2": 2541920,
  //   },
  //   {
  //     details: {
  //       "Administrative O/H": {
  //         "All Products": 1200000,
  //       },
  //       "Consulting Fees": {
  //         "All Products": 0,
  //       },
  //       "Corporate O/H": {
  //         "All Products": 500000,
  //       },
  //       "Cross Docking": {
  //         "All Products": 0,
  //       },
  //       "Distribution FC": {
  //         "All Products": 75000,
  //       },
  //       "Emergency Procurement": {
  //         "All Products": 143401,
  //       },
  //       "Emergency Production": {
  //         "All Products": 25000,
  //       },
  //       "Forecast Inaccuracy": {
  //         "All Products": 167447,
  //       },
  //       "Information Technology": {
  //         "All Products": 14000,
  //       },
  //       "Inventory Charges": {
  //         "All Products": 223785,
  //       },
  //       "Plant Capacity FC": {
  //         "All Products": 200000,
  //       },
  //       "Procurement FC": {
  //         "All Products": 5000,
  //       },
  //       "Production FC": {
  //         "All Products": 47000,
  //       },
  //       "Research Studies": {
  //         "All Products": 0,
  //       },
  //       "Service Outsourcing": {
  //         "All Products": 692000,
  //       },
  //       "Unfilled Handling": {
  //         "All Products": 0,
  //       },
  //       "Total Fixed & Other": {
  //         "All Products": 4732633,
  //       },
  //     },
  //   },
  //   {
  //     "All Products": 2038653,
  //     "Product 7-1": 4081281,
  //     "Product 7-2": 857343,
  //   },
  //   {
  //     "All Products": -7185,
  //   },
  //   {
  //     "All Products": -1015419,
  //   },
  //   {
  //     "All Products": 1015419,
  //   },
  // ];
  const selectedSim = JSON.parse(localStorage.getItem("selectedSim"));
  let user = localStorage.getItem("user");
  user = JSON.parse(user);
  const userEmail = user.email;

  const salesData = reportData[0];
  const Revenues = reportData[1];
  const GrossMargin = reportData[2];
  const Fixed_Other_Costs = reportData[3];
  const OperatingIncome = reportData[4];
  const NonOperatingIncome = reportData[5];
  const Taxes = reportData[6];
  const NetIncome = reportData[7];

  // selectedSim[0].firm_data.map((firmData, index) => {
  //   const firmName = firmData[userEmail];
  //   console.log(`Firm key ${index}:`, firmName);
  // });

  return (
    <div>
      <div className="heading flex justify-between font-bold">
        <div>
          <p>Firm : {Object.keys(selectedSim[0]?.firm_data)[0]}</p>
          <p>
            PERFORMANCE Product REPORT, MONTH {selectedSim[0].current_quarter}
          </p>
        </div>
        <div>
          <p>INDUSTRY AAA</p>
          <p>PAGE 1</p>
        </div>
      </div>
      <table className="w-full text-start whitespace-nowrap">
        <thead>
          <tr className="bg-gray-400 text-red-500">
            <th className="px-4 py-2">Metric</th>
            <th className="px-4 py-2">All Products</th>
            <th className="px-4 py-2">Product 7-1</th>
            <th className="px-4 py-2">Product 7-2</th>
          </tr>
        </thead>
        <tbody>
          {Object.keys(salesData).map((key, index) => (
            <tr key={index}>
              <td className=" border font-bold px-4 py-2">{key}</td>
              <td className="border px-4 py-2 text-center">
                {typeof salesData[key] === "object"
                  ? Object.values(salesData[key])[0]
                  : salesData[key]}
              </td>
              <td className="border px-4 py-2 text-center">
                {typeof salesData[key] === "object"
                  ? Object.values(salesData[key])[1]
                  : salesData[key]}
              </td>
              <td className="border px-4 py-2 text-center">
                {typeof salesData[key] === "object"
                  ? Object.values(salesData[key])[2]
                  : salesData[key]}
              </td>
            </tr>
          ))}
          <tr>
            <td className="font-bold border px-4 py-2">Revenue</td>
            <td className="border px-4 py-2 text-center">
              {Revenues["All Products"]}
            </td>
            <td className="border px-4 py-2 text-center">
              {Revenues["Product 7-1"]}
            </td>
            <td className="border px-4 py-2 text-center">
              {Revenues["Product 7-2"]}
            </td>
          </tr>
          {Object.keys(Revenues.details).map((detailKey, index) => (
            <tr key={index}>
              <td className="border px-4 py-2 pl-8">- {detailKey}</td>
              <td className="border px-4 py-2 text-center">
                {Revenues.details[detailKey]["All Products"]}
              </td>
              <td className="border px-4 py-2 text-center">
                {Revenues.details[detailKey]["Product 7-1"]}
              </td>
              <td className="border px-4 py-2 text-center">
                {Revenues.details[detailKey]["Product 7-2"]}
              </td>
            </tr>
          ))}
          <tr>
            <td className="font-bold border px-4 py-2">Gross Margin</td>
            <td className="border px-4 py-2 text-center">
              {GrossMargin["All Products"]}
            </td>
            <td className="border px-4 py-2 text-center">
              {GrossMargin["Product 7-1"]}
            </td>
            <td className="border px-4 py-2 text-center">
              {GrossMargin["Product 7-2"]}
            </td>
          </tr>
          <tr>
            <td className="font-bold border px-4 py-2">Fixed_Other_Costs</td>
            <td className="border px-4 py-2 text-center"></td>
            <td className="border px-4 py-2 text-center"></td>
            <td className="border px-4 py-2 text-center"></td>
          </tr>
          {Object.keys(Fixed_Other_Costs.details).map((detailKey, index) => (
            <tr key={index}>
              <td className="border px-4 py-2 pl-8">- {detailKey}</td>
              <td className="border px-4 py-2 text-center">
                {Fixed_Other_Costs.details[detailKey]["All Products"]}
              </td>
              <td className="border px-4 py-2 text-center">
                {Fixed_Other_Costs.details[detailKey]["Product 7-1"]}
              </td>
              <td className="border px-4 py-2 text-center">
                {Fixed_Other_Costs.details[detailKey]["Product 7-2"]}
              </td>
            </tr>
          ))}
          <tr>
            <td className="font-bold border px-4 py-2">OperatingIncome</td>
            <td className="border px-4 py-2 text-center">
              {OperatingIncome["All Products"]}
            </td>
            <td className="border px-4 py-2 text-center">
              {OperatingIncome["Product 7-1"]}
            </td>
            <td className="border px-4 py-2 text-center">
              {OperatingIncome["Product 7-2"]}
            </td>
          </tr>
          <tr>
            <td className="font-bold border px-4 py-2">NonOperatingIncome</td>
            <td className="border px-4 py-2 text-center">
              {NonOperatingIncome["All Products"]}
            </td>
            <td className="border px-4 py-2 text-center">
              {NonOperatingIncome["Product 7-1"]}
            </td>
            <td className="border px-4 py-2 text-center">
              {NonOperatingIncome["Product 7-2"]}
            </td>
          </tr>
          <tr>
            <td className="font-bold border px-4 py-2">Taxes</td>
            <td className="border px-4 py-2 text-center">
              {Taxes["All Products"]}
            </td>
            <td className="border px-4 py-2 text-center">
              {Taxes["Product 7-1"]}
            </td>
            <td className="border px-4 py-2 text-center">
              {Taxes["Product 7-2"]}
            </td>
          </tr>
          <tr>
            <td className="font-bold border px-4 py-2">NetIncome</td>
            <td className="border px-4 py-2 text-center">
              {NetIncome["All Products"]}
            </td>
            <td className="border px-4 py-2 text-center">
              {NetIncome["Product 7-1"]}
            </td>
            <td className="border px-4 py-2 text-center">
              {NetIncome["Product 7-2"]}
            </td>
          </tr>
        </tbody>
      </table>

      <div className="flex justify-end py-4">
        {" "}
        <PDFDownloadLink
          document={
            <SalesPDFDocument
              salesData={salesData}
              Revenues={Revenues}
              GrossMargin={GrossMargin}
              Fixed_Other_Costs={Fixed_Other_Costs}
              OperatingIncome={OperatingIncome}
              NonOperatingIncome={NonOperatingIncome}
              Taxes={Taxes}
              NetIncome={NetIncome}
            />
          }
          fileName="sales_report.pdf"
        >
          {({ loading }) =>
            loading ? "Loading document..." : <Button>Download Report</Button>
          }
        </PDFDownloadLink>
      </div>
    </div>
  );
};

export default ReportTable1;
