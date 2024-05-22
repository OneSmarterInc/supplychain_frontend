import React from "react";
import { PDFDownloadLink } from "@react-pdf/renderer";
import { Button } from "@material-tailwind/react";
import { SalesPDFDocument } from "./SalesPDFDocument";

const ReportTable1 = () => {

  const salesData = {
    "Sales Volume": {
      "All Products": 50235,
      "Product 7-1": 31631,
      "Product 7-2": 18604,
    },
    "Unfilled Orders": {
      "All Products": 0,
      "Product 7-1": 0,
      "Product 7-2": 0,
    },
    Price: {
      "All Products": 18604,
      "Product 7-1": 374,
      "Product 7-2": 357,
    },
  };

  const Revenues = {
    "All Products": 18511800,
    "Product 7-1": 11857200,
    "Product 7-2": 6654600,
    details: {
      "Product Costs": {
        "All Products": 8050921,
        "Product 7-1": 4689926,
        "Product 7-2": 3360995,
      },
      "Order Processing": {
        "All Products": 0,
        "Product 7-1": 0,
        "Product 7-2": 0,
      },
      "Replacement Parts": {
        "All Products": 659780,
        "Product 7-1": 442244,
        "Product 7-2": 217536,
      },
      "RFID Costs": {
        "All Products": 114946,
        "Product 7-1": 409395,
        "Product 7-2": 46558,
      },
      "Transportation Costs": {
        "All Products": 237675,
        "Product 7-1": 68388,
        "Product 7-2": 171720,
      },
      "Transportation Rebates": {
        "All Products": 237675,
        "Product 7-1": 68388,
        "Product 7-2": 171720,
      },
      "Volume Discount": {
        "All Products": 237675,
        "Product 7-1": 68388,
        "Product 7-2": 171720,
      },
      "Duties and Traffic": {
        "All Products": 237675,
        "Product 7-1": 68388,
        "Product 7-2": 171720,
      },
    },
  };
  const GrossMargin = {
    "All Products": 0.431,
    "Product 7-1": 0.564,
    "Product 7-2": 0.188,
  };

  const Fixed_Other_Costs = {
    details: {
      "Administrative O/H": {
        "All Products": 50235,
        "Product 7-1": 31631,
        "Product 7-2": 18604,
      },
      "Consulting Fees": {
        "All Products": 0,
        "Product 7-1": 0,
        "Product 7-2": 0,
      },
      "Corporate O/H": {
        "All Products": 18604,
        "Product 7-1": 374,
        "Product 7-2": 357,
      },
      "Cross Docking": {
        "All Products": 50235,
        "Product 7-1": 31631,
        "Product 7-2": 18604,
      },
      "Distribution FC": {
        "All Products": 50235,
        "Product 7-1": 31631,
        "Product 7-2": 18604,
      },
      "Emergency Procurement": {
        "All Products": 50235,
        "Product 7-1": 31631,
        "Product 7-2": 18604,
      },
      "Emergency Production": {
        "All Products": 50235,
        "Product 7-1": 31631,
        "Product 7-2": 18604,
      },
      "Forecast Inaccuracy": {
        "All Products": 50235,
        "Product 7-1": 31631,
        "Product 7-2": 18604,
      },
      "Information Technology": {
        "All Products": 50235,
        "Product 7-1": 31631,
        "Product 7-2": 18604,
      },
      "Inventory Charges": {
        "All Products": 50235,
        "Product 7-1": 31631,
        "Product 7-2": 18604,
      },
      "Plant Capacity FC": {
        "All Products": 50235,
        "Product 7-1": 31631,
        "Product 7-2": 18604,
      },
      "Procurement FC": {
        "All Products": 50235,
        "Product 7-1": 31631,
        "Product 7-2": 18604,
      },
      "Production FC": {
        "All Products": 50235,
        "Product 7-1": 31631,
        "Product 7-2": 18604,
      },
      "Research Studies": {
        "All Products": 50235,
        "Product 7-1": 31631,
        "Product 7-2": 18604,
      },
      "Service Outsourcing": {
        "All Products": 50235,
        "Product 7-1": 31631,
        "Product 7-2": 18604,
      },
      "Unfilled Handling": {
        "All Products": 50235,
        "Product 7-1": 31631,
        "Product 7-2": 18604,
      },
      "Total Fixed & Other": {
        "All Products": 50235,
        "Product 7-1": 31631,
        "Product 7-2": 18604,
      },
    },
  };
  const OperatingIncome = {
    "All Products": 431,
    "Product 7-1": 564,
    "Product 7-2": 188,
  };

  const NonOperatingIncome = {
    "All Products": 0.431,
    "Product 7-1": "-",
    "Product 7-2": "-",
  };
  const Taxes = {
    "All Products": 0.431,
    "Product 7-1": "-",
    "Product 7-2": "-",
  };

  const NetIncome = {
    "All Products": 0.431,
    "Product 7-1": "-",
    "Product 7-2": "-",
  };

  return (
    <div>
      <div className="heading flex justify-between font-bold">
        <div>
          <p>Firm 7: Los Descodificadores</p>
          <p>CORPORATE P&L STATEMENT, MONTH 25</p>
        </div>
        <div>
          <p>INDUSTRY BBB</p>
          <p>PAGE 5</p>
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
