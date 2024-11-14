import React from "react";
import { PDFDownloadLink } from "@react-pdf/renderer";
import { Button } from "@material-tailwind/react";
import { SalesPDFDocument } from "./SalesPDFDocument";
import Chart from "react-apexcharts";

const ReportTable1 = () => {
  const reportData = JSON.parse(localStorage.getItem("reportData")) || [
    {
      "Sales Volume": {
        "All Products": 0,
        "Product 7-1": 0,
        "Product 7-2": 0,
      },
      "Unfilled Orders": {
        "All Products": 0,
        "Product 7-1": 0,
        "Product 7-2": 0,
      },
      Price: {
        "All Products": 0,
        "Product 7-1": 0,
        "Product 7-2": 0,
      },
    },
    {
      details: {
        "Product Costs": {
          "All Products": 0,
          "Product 7-1": 0,
          "Product 7-2": 0,
        },
        "Order Processing": {
          "All Products": 0,
          "Product 7-1": 0,
          "Product 7-2": 0,
        },
        "Replacement Parts": {
          "All Products": 0,
          "Product 7-1": 0,
          "Product 7-2": 0,
        },
        "RFID Costs": {
          "All Products": 0,
          "Product 7-1": 0,
          "Product 7-2": 0,
        },
        "Transportation Costs": {
          "All Products": 0,
          "Product 7-1": 0,
          "Product 7-2": 0,
        },
        "Transportation Rebates": {
          "All Products": 0,
        },
        "Volume Discount": {
          "All Products": 0,
        },
        "Duties and Tariffs": {
          "All Products": 0,
          "Product 7-1": 0,
          "Product 7-2": 0,
        },
      },
      "All Products": 0,
      "Product 7-1": 0,
      "Product 7-2": 0,
    },
    {
      "All Products": 0,
      "Product 7-1": 0,
      "Product 7-2": 0,
    },
    {
      details: {
        "Administrative O/H": {
          "All Products": 0,
          "Product 7-1": 0,
          "Product 7-2": 0,
        },
        "Consulting Fees": {
          "All Products": 0,
        },
        "Corporate O/H": {
          "All Products": 0,
        },
        "Cross Docking": {
          "All Products": 0,
        },
        "Distribution FC": {
          "All Products": 0,
        },
        "Emergency Procurement": {
          "All Products": 0,
        },
        "Emergency Production": {
          "All Products": 0,
        },
        "Forecast Inaccuracy": {
          "All Products": 0,
        },
        "Information Technology": {
          "All Products": 0,
        },
        "Inventory Charges": {
          "All Products": 0,
        },
        Marketing: {
          "All Products": 0,
          "Product 7-1": 0,
          "Product 7-2": 0,
        },
        "Plant Capacity FC": {
          "All Products": 0,
        },
        "Procurement FC": {
          "All Products": 0,
        },
        "Production FC": {
          "All Products": 0,
        },
        "Research Studies": {
          "All Products": 0,
        },
        "Service Outsourcing": {
          "All Products": 0,
          "Product 7-1": "-",
          "Product 7-2": "-",
        },
        "Unfilled Handling": {
          "All Products": 0,
        },
        "Total Fixed & Other": {
          "All Products": 0,
        },
      },
    },
    {
      "All Products": 0,
      "Product 7-1": 0,
      "Product 7-2": 0,
    },
    {
      "All Products": 0,
    },
    {
      "All Products": 0,
    },
    {
      "All Products": 0,
    },
  ];

  const salesData = reportData[0];
  const Revenues = reportData[1];
  const GrossMargin = reportData[2];
  const Fixed_Other_Costs = reportData[3];
  const OperatingIncome = reportData[4];
  const NonOperatingIncome = reportData[5];
  const Taxes = reportData[6];
  const NetIncome = reportData[7];

  const chartData = {
    series: [
      {
        name: "All Products",
        data: [
          Math.trunc(Revenues["All Products"]),
          Math.trunc(GrossMargin["All Products"]),
          Math.trunc(OperatingIncome["All Products"]),
          Math.trunc(NonOperatingIncome["All Products"]),
          Math.trunc(Taxes["All Products"]),
          Math.trunc(NetIncome["All Products"]),
        ],
      },
      {
        name: "Smart Home Asistant",
        data: [
          Math.trunc(Revenues["Product 7-1"]),
          Math.trunc(GrossMargin["Product 7-1"]),
          Math.trunc(OperatingIncome["Product 7-1"]),
          Math.trunc(NonOperatingIncome["Product 7-1"]),
          Math.trunc(Taxes["Product 7-1"]),
          Math.trunc(NetIncome["Product 7-1"]),
        ],
      },
      {
        name: "Smart Tharmo Asistant",
        data: [
          Math.trunc(Revenues["Product 7-2"]),
          Math.trunc(GrossMargin["Product 7-2"]),
          Math.trunc(OperatingIncome["Product 7-2"]),
          Math.trunc(NonOperatingIncome["Product 7-2"]),
          Math.trunc(Taxes["Product 7-2"]),
          Math.trunc(NetIncome["Product 7-2"]),
        ],
      },
    ],
    options: {
      chart: {
        type: "bar",
        height: 350,
      },
      plotOptions: {
        bar: {
          horizontal: false,
          columnWidth: "55%",
        },
      },
      // colors: ["#FFB38E", "#FFCF9D", "#FFB26F"],
      colors: ["#fa1e1e", "#FFB38E", "#FFB26F"],
      // colors: ["#A9A9A9", "#C0C0C0", "#808080"],
      dataLabels: {
        enabled: false,
      },
      stroke: {
        show: true,
        width: 2,
        colors: ["transparent"],
      },
      xaxis: {
        categories: [
          "Revenue",
          "Gross Margin",
          "Operating Income",
          "Non Operating Income",
          "Taxes",
          "Net Income",
        ],
      },
      yaxis: {
        title: {
          text: "Amount",
        },
        labels: {
          formatter: function (val) {
            return Math.trunc(val);
          },
        },
      },
      fill: {
        opacity: 1,
      },
      tooltip: {
        y: {
          formatter: function (val) {
            return `$ ${Math.trunc(val)}`;
          },
        },
      },
    },
  };

  const formatNumber = (num) => {
    if (typeof num === "number") {
      return new Intl.NumberFormat("en-US", {
        maximumFractionDigits: 0,
      }).format(num);
    }
    return num;
  };
  const currencyFormatter = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  });

  const formatCurrency = (value) => {
    if (typeof value === "number") {
      return currencyFormatter.format(value);
    }
    return value;
  };

  return (
    <div>
      <div className="heading flex justify-between font-bold mb-4">
        <div>
          <p></p>
        </div>
        <div>
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
              loading ? (
                "Loading document..."
              ) : (
                <Button className=" bg-red-500">Download Report</Button>
              )
            }
          </PDFDownloadLink>
        </div>
      </div>

      <div id="chart" className="mb-6">
        <Chart
          options={chartData.options}
          series={chartData.series}
          type="bar"
          height={350}
        />
      </div>

      <table className="min-w-full bg-white text-gray-800 shadow-md  overflow-hidden">
        <thead className="bg-gray-300 text-white">
          <tr>
            <th className="px-6 text-sm py-1 text-red-700   text-left ">
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
          {Object.keys(salesData).map((key, index) => (
            <tr key={index} className="hover:bg-gray-50">
              <td className="border-b px-6 text-sm py-1 font-semibold text-gray-700">
                {key}
              </td>
              <td className="border-b px-6 text-sm py-1  text-right">
                {typeof salesData[key] === "object"
                  ? key === "Sales Volume" || key === "Unfilled Orders"
                    ? Object.values(salesData[key])[0]
                    : formatCurrency(Object.values(salesData[key])[0])
                  : key === "Sales Volume" || key === "Unfilled Orders"
                  ? salesData[key]
                  : formatCurrency(salesData[key])}
              </td>
              <td className="border-b px-6 text-sm py-1  text-right">
                {typeof salesData[key] === "object"
                  ? key === "Sales Volume" || key === "Unfilled Orders"
                    ? Object.values(salesData[key])[1]
                    : formatCurrency(Object.values(salesData[key])[1])
                  : key === "Sales Volume" || key === "Unfilled Orders"
                  ? salesData[key]
                  : formatCurrency(salesData[key])}
              </td>
              <td className="border-b px-6 text-sm py-1  text-right">
                {typeof salesData[key] === "object"
                  ? key === "Sales Volume" || key === "Unfilled Orders"
                    ? Object.values(salesData[key])[2]
                    : formatCurrency(Object.values(salesData[key])[2])
                  : key === "Sales Volume" || key === "Unfilled Orders"
                  ? salesData[key]
                  : formatCurrency(salesData[key])}
              </td>
            </tr>
          ))}

          <tr className="bg-gray-100">
            <td className="font-semibold border-t px-6 text-sm py-1">
              Revenue
            </td>
            <td className="border-t px-6 text-sm py-1  text-right">
              {formatCurrency(Revenues["All Products"])}
            </td>
            <td className="border-t px-6 text-sm py-1  text-right">
              {formatCurrency(Revenues["Product 7-1"])}
            </td>
            <td className="border-t px-6 text-sm py-1  text-right">
              {formatCurrency(Revenues["Product 7-2"])}
            </td>
          </tr>

          {Object.keys(Revenues.details).map((detailKey, index) => (
            <tr key={index} className="hover:bg-gray-50">
              <td className="border-b px-6 text-sm py-1 pl-8">- {detailKey}</td>
              <td className="border-b px-6 text-sm py-1  text-right">
                {formatCurrency(Revenues.details[detailKey]["All Products"])}
              </td>
              <td className="border-b px-6 text-sm py-1  text-right">
                {formatCurrency(Revenues.details[detailKey]["Product 7-1"])}
              </td>
              <td className="border-b px-6 text-sm py-1  text-right">
                {formatCurrency(Revenues.details[detailKey]["Product 7-2"])}
              </td>
            </tr>
          ))}

          <tr className="bg-gray-100">
            <td className="font-semibold border-t px-6 text-sm py-1">
              Gross Margin
            </td>
            <td className="border-t px-6 text-sm py-1  text-right">
              {formatCurrency(GrossMargin["All Products"])}
            </td>
            <td className="border-t px-6 text-sm py-1  text-right">
              {formatCurrency(GrossMargin["Product 7-1"])}
            </td>
            <td className="border-t px-6 text-sm py-1  text-right">
              {formatCurrency(GrossMargin["Product 7-2"])}
            </td>
          </tr>

          <tr>
            <td className="font-semibold border-b px-6 text-sm py-1">
              Fixed Other Costs
            </td>
            <td className="border-b px-6 text-sm py-1  text-right"></td>
            <td className="border-b px-6 text-sm py-1  text-right"></td>
            <td className="border-b px-6 text-sm py-1  text-right"></td>
          </tr>

          {Object.keys(Fixed_Other_Costs.details).map((detailKey, index) => (
            <tr key={index} className="hover:bg-gray-50">
              <td className="border-b px-6 text-sm py-1 pl-8">- {detailKey}</td>
              <td className="border-b px-6 text-sm py-1  text-right">
                {formatCurrency(
                  Fixed_Other_Costs.details[detailKey]["All Products"]
                )}
              </td>
              <td className="border-b px-6 text-sm py-1  text-right">
                {formatCurrency(
                  Fixed_Other_Costs.details[detailKey]["Product 7-1"]
                )}
              </td>
              <td className="border-b px-6 text-sm py-1  text-right">
                {formatCurrency(
                  Fixed_Other_Costs.details[detailKey]["Product 7-2"]
                )}
              </td>
            </tr>
          ))}

          <tr className="bg-gray-100">
            <td className="font-semibold border-t px-6 text-sm py-1">
              Operating Income
            </td>
            <td className="border-t px-6 text-sm py-1  text-right">
              {formatCurrency(OperatingIncome["All Products"])}
            </td>
            <td className="border-t px-6 text-sm py-1  text-right">
              {formatCurrency(OperatingIncome["Product 7-1"])}
            </td>
            <td className="border-t px-6 text-sm py-1  text-right">
              {formatCurrency(OperatingIncome["Product 7-2"])}
            </td>
          </tr>

          <tr>
            <td className="font-semibold border-b px-6 text-sm py-1">
              Non-Operating Income
            </td>
            <td className="border-b px-6 text-sm py-1  text-right">
              {formatCurrency(NonOperatingIncome["All Products"])}
            </td>
            <td className="border-b px-6 text-sm py-1  text-right">
              {formatCurrency(NonOperatingIncome["Product 7-1"])}
            </td>
            <td className="border-b px-6 text-sm py-1  text-right">
              {formatCurrency(NonOperatingIncome["Product 7-2"])}
            </td>
          </tr>

          <tr className="bg-gray-100">
            <td className="font-semibold border-t px-6 text-sm py-1">Taxes</td>
            <td className="border-t px-6 text-sm py-1  text-right">
              {formatCurrency(Taxes["All Products"])}
            </td>
            <td className="border-t px-6 text-sm py-1  text-right">
              {formatCurrency(Taxes["Product 7-1"])}
            </td>
            <td className="border-t px-6 text-sm py-1  text-right">
              {formatCurrency(Taxes["Product 7-2"])}
            </td>
          </tr>

          <tr>
            <td className="font-semibold border-b px-6 text-sm py-1">
              Net Income
            </td>
            <td className="border-b px-6 text-sm py-1  text-right">
              {formatCurrency(NetIncome["All Products"])}
            </td>
            <td className="border-b px-6 text-sm py-1  text-right">
              {formatCurrency(NetIncome["Product 7-1"])}
            </td>
            <td className="border-b px-6 text-sm py-1  text-right">
              {formatCurrency(NetIncome["Product 7-2"])}
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default ReportTable1;
