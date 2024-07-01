import React from "react";
import { PDFDownloadLink } from "@react-pdf/renderer";
import { Button } from "@material-tailwind/react";
import { SalesPDFDocument } from "./SalesPDFDocument";
import Chart from "react-apexcharts";

const ReportTable1 = () => {
  const reportData = JSON.parse(localStorage.getItem("reportData"));

  const selectedSim = JSON.parse(localStorage.getItem("selectedSim"));
  let user = localStorage.getItem("user");
  user = JSON.parse(user);
  let firm_key_new = "";
  if (selectedSim[0]?.firm_data.length) {
    let firm_obj = selectedSim[0]?.firm_data.filter((item, index) => {
      return item.emails.includes(user.email);
    });
    if (firm_obj.length) {
      firm_key_new = firm_obj[0].firmName; //note: only one user in one firm so using firm_obj[0]
    }
  }
  const userEmail = user.email;

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
          Math.trunc(NetIncome["All Products"])
        ]
      },
      {
        name: "Hyperware",
        data: [
          Math.trunc(Revenues["Product 7-1"]),
          Math.trunc(GrossMargin["Product 7-1"]),
          Math.trunc(OperatingIncome["Product 7-1"]),
          Math.trunc(NonOperatingIncome["Product 7-1"]),
          Math.trunc(Taxes["Product 7-1"]),
          Math.trunc(NetIncome["Product 7-1"])
        ]
      },
      {
        name: "Metaware",
        data: [
          Math.trunc(Revenues["Product 7-2"]),
          Math.trunc(GrossMargin["Product 7-2"]),
          Math.trunc(OperatingIncome["Product 7-2"]),
          Math.trunc(NonOperatingIncome["Product 7-2"]),
          Math.trunc(Taxes["Product 7-2"]),
          Math.trunc(NetIncome["Product 7-2"])
        ]
      }
    ],
    options: {
      chart: {
        type: "bar",
        height: 350
      },
      plotOptions: {
        bar: {
          horizontal: false,
          columnWidth: "55%"
        }
      },
      dataLabels: {
        enabled: false
      },
      stroke: {
        show: true,
        width: 2,
        colors: ["transparent"]
      },
      xaxis: {
        categories: [
          "Revenue",
          "Gross Margin",
          "Operating Income",
          "Non Operating Income",
          "Taxes",
          "Net Income"
        ]
      },
      yaxis: {
        title: {
          text: "Amount"
        },
        labels: {
          formatter: function (val) {
            return Math.trunc(val);
          }
        }
      },
      fill: {
        opacity: 1
      },
      tooltip: {
        y: {
          formatter: function (val) {
            return `$ ${Math.trunc(val)}`;
          }
        }
      }
    }
  };

  const formatNumber = (num) => {
    if (typeof num === "number") {
      return new Intl.NumberFormat("en-US", {
        maximumFractionDigits: 0
      }).format(num);
    }
    return num;
  };
  const currencyFormatter = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
  });

  const formatCurrency = (value) => {
    if (typeof value === 'number') {
      return currencyFormatter.format(value);
    }
    return value;
  };

  return (
    <div>
      <div className="heading flex justify-between font-bold mb-4">
        <div>
          <p>Firm: {firm_key_new}</p>
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

      <table className="w-full text-start whitespace-nowrap mb-4">
        <thead>
          <tr className="bg-gray-400 text-white">
            <th className="px-4 py-2">Metric</th>
            <th className="px-4 py-2">All Products</th>
            <th className="px-4 py-2">Hyperware</th>
            <th className="px-4 py-2">Metaware</th>
          </tr>
        </thead>
        <tbody>
           {Object.keys(salesData).map((key, index) => (
            <tr key={index}>
              <td className=" border font-bold px-4 py-2">{key}</td>
              <td className="border px-4 py-2 text-center">
                {typeof salesData[key] === "object"
                  ? formatCurrency(Object.values(salesData[key])[0])
                  : formatCurrency(salesData[key])}
              </td>
              <td className="border px-4 py-2 text-center">
                {typeof salesData[key] === "object"
                  ? formatCurrency(Object.values(salesData[key])[1])
                  : formatCurrency(salesData[key])}
              </td>
              <td className="border px-4 py-2 text-center">
                {typeof salesData[key] === "object"
                  ? formatCurrency(Object.values(salesData[key])[2])
                  : formatCurrency(salesData[key])}
              </td>
            </tr>
          ))}
          <tr>
            <td className="font-bold border px-4 py-2">Revenue</td>
            <td className="border px-4 py-2 text-center">
              {formatCurrency(Revenues["All Products"])}
            </td>
            <td className="border px-4 py-2 text-center">
              {formatCurrency(Revenues["Product 7-1"])}
            </td>
            <td className="border px-4 py-2 text-center">
              {formatCurrency(Revenues["Product 7-2"])}
            </td>
          </tr>
          {Object.keys(Revenues.details).map((detailKey, index) => (
            <tr key={index}>
              <td className="border px-4 py-2 pl-8">- {detailKey}</td>
              <td className="border px-4 py-2 text-center">
                {formatCurrency(Revenues.details[detailKey]["All Products"])}
              </td>
              <td className="border px-4 py-2 text-center">
                {formatCurrency(Revenues.details[detailKey]["Product 7-1"])}
              </td>
              <td className="border px-4 py-2 text-center">
                {formatCurrency(Revenues.details[detailKey]["Product 7-2"])}
              </td>
            </tr>
          ))}
          <tr>
            <td className="font-bold border px-4 py-2">Gross Margin</td>
            <td className="border px-4 py-2 text-center">
              {formatCurrency(GrossMargin["All Products"])}
            </td>
            <td className="border px-4 py-2 text-center">
              {formatCurrency(GrossMargin["Product 7-1"])}
            </td>
            <td className="border px-4 py-2 text-center">
              {formatCurrency(GrossMargin["Product 7-2"])}
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
                {formatCurrency(Fixed_Other_Costs.details[detailKey]["All Products"])}
              </td>
              <td className="border px-4 py-2 text-center">
                {formatCurrency(Fixed_Other_Costs.details[detailKey]["Product 7-1"])}
              </td>
              <td className="border px-4 py-2 text-center">
                {formatCurrency(Fixed_Other_Costs.details[detailKey]["Product 7-2"])}
              </td>
            </tr>
          ))}
          <tr>
            <td className="font-bold border px-4 py-2">OperatingIncome</td>
            <td className="border px-4 py-2 text-center">
              {formatCurrency(OperatingIncome["All Products"])}
            </td>
            <td className="border px-4 py-2 text-center">
              {formatCurrency(OperatingIncome["Product 7-1"])}
            </td>
            <td className="border px-4 py-2 text-center">
              {formatCurrency(OperatingIncome["Product 7-2"])}
            </td>
          </tr>
          <tr>
            <td className="font-bold border px-4 py-2">NonOperatingIncome</td>
            <td className="border px-4 py-2 text-center">
              {formatCurrency(NonOperatingIncome["All Products"])}
            </td>
            <td className="border px-4 py-2 text-center">
              {formatCurrency(NonOperatingIncome["Product 7-1"])}
            </td>
            <td className="border px-4 py-2 text-center">
              {formatCurrency(NonOperatingIncome["Product 7-2"])}
            </td>
          </tr>
          <tr>
            <td className="font-bold border px-4 py-2">Taxes</td>
            <td className="border px-4 py-2 text-center">
              {formatCurrency(Taxes["All Products"])}
            </td>
            <td className="border px-4 py-2 text-center">
              {formatCurrency(Taxes["Product 7-1"])}
            </td>
            <td className="border px-4 py-2 text-center">
              {formatCurrency(Taxes["Product 7-2"])}
            </td>
          </tr>
          <tr>
            <td className="font-bold border px-4 py-2">NetIncome</td>
            <td className="border px-4 py-2 text-center">
              {formatCurrency(NetIncome["All Products"])}
            </td>
            <td className="border px-4 py-2 text-center">
              {formatCurrency(NetIncome["Product 7-1"])}
            </td>
            <td className="border px-4 py-2 text-center">
              {formatCurrency(NetIncome["Product 7-2"])}
            </td>
          </tr>
        </tbody>
      </table>

      <div className="flex justify-end py-4">
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
