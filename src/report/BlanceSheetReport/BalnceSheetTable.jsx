import React from 'react';

const BalanceSheetTable = () => {
  const reportData = {
    cash: 925590,
    marketableSecurities: 0,
    finishedGoods: {
      plantDC1: {
        product10: { units: 0, unitPrice: 0.00, total: 0 },
        product11: { units: 5107, unitPrice: 148.23, total: 757033 },
        product12: { units: 1855, unitPrice: 180.60, total: 335017 }
      },
      dc2: {
        product10: { units: 0, unitPrice: 0.00, total: 0 },
        product11: { units: 6599, unitPrice: 147.50, total: 973356 },
        product12: { units: 5726, unitPrice: 179.00, total: 1024954 }
      }
    },
    plantInvestment: 100000000,
    procurementInventory: {
      plantDC1: {
        gamma: { units: 5370, unitPrice: 17.90, total: 96143 },
        delta: { units: 2350, unitPrice: 20.81, total: 48899 },
        epsilon: { units: 7850, unitPrice: 23.87, total: 187358 }
      },
      dc2: {
        gamma: { units: 1380, unitPrice: 17.45, total: 24079 },
        delta: { units: 377, unitPrice: 20.47, total: 7718 },
        epsilon: { units: 2383, unitPrice: 23.97, total: 57109 }
      }
    },
    totalAssets: 104437256,
    liabilitiesEquities: {
      corporateCapitalization: 100000000,
      dividendsCurrentMonth: -304625,
      dividendsCumulative: -865720,
      loans: 1706447,
      retainedEarningsCurrentMonth: 1015419,
      retainedEarningsCumulative: 2885735,
      total: 104437256
    },
    notes: {
      epsilonOrder: {
        region1: '12,000Ds 41,000Da',
        region2: '750Ds 750Da'
      }
    }
  };

  return (
    <div>
      <h2 className="text-2xl font-bold">Balance Sheet</h2>
      <table className="w-full text-start whitespace-nowrap">
        <thead>
          <tr>
            <th className="px-4 py-2">Metric</th>
            <th className="px-4 py-2">Product zero</th>
            <th className="px-4 py-2">Hyperware</th>
            <th className="px-4 py-2">Metaware</th>
          </tr>
        </thead>
        <tbody>
          <tr className="bg-gray-200">
            <td colSpan={4} className="font-bold">PLANT/DC1 FG INVENTORY</td>
          </tr>
          <tr>
            <td className="border px-4 py-2">Units</td>
            <td className="border px-4 py-2">{reportData.finishedGoods.plantDC1.product10.units}</td>
            <td className="border px-4 py-2">{reportData.finishedGoods.plantDC1.product11.units}</td>
            <td className="border px-4 py-2">{reportData.finishedGoods.plantDC1.product12.units}</td>
          </tr>
          <tr>
            <td className="border px-4 py-2">Unit Price</td>
            <td className="border px-4 py-2">{reportData.finishedGoods.plantDC1.product10.unitPrice}</td>
            <td className="border px-4 py-2">{reportData.finishedGoods.plantDC1.product11.unitPrice}</td>
            <td className="border px-4 py-2">{reportData.finishedGoods.plantDC1.product12.unitPrice}</td>
          </tr>
          <tr>
            <td className="border px-4 py-2">Total</td>
            <td className="border px-4 py-2">{reportData.finishedGoods.plantDC1.product10.total}</td>
            <td className="border px-4 py-2">{reportData.finishedGoods.plantDC1.product11.total}</td>
            <td className="border px-4 py-2">{reportData.finishedGoods.plantDC1.product12.total}</td>
          </tr>
          <tr className="bg-gray-200">
            <td colSpan={4} className="font-bold">DC2 FG INVENTORY</td>
          </tr>
          <tr>
            <td className="border px-4 py-2">Units</td>
            <td className="border px-4 py-2">{reportData.finishedGoods.dc2.product10.units}</td>
            <td className="border px-4 py-2">{reportData.finishedGoods.dc2.product11.units}</td>
            <td className="border px-4 py-2">{reportData.finishedGoods.dc2.product12.units}</td>
          </tr>
          <tr>
            <td className="border px-4 py-2">Unit Price</td>
            <td className="border px-4 py-2">{reportData.finishedGoods.dc2.product10.unitPrice}</td>
            <td className="border px-4 py-2">{reportData.finishedGoods.dc2.product11.unitPrice}</td>
            <td className="border px-4 py-2">{reportData.finishedGoods.dc2.product12.unitPrice}</td>
          </tr>
          <tr>
            <td className="border px-4 py-2">Total</td>
            <td className="border px-4 py-2">{reportData.finishedGoods.dc2.product10.total}</td>
            <td className="border px-4 py-2">{reportData.finishedGoods.dc2.product11.total}</td>
            <td className="border px-4 py-2">{reportData.finishedGoods.dc2.product12.total}</td>
          </tr>
          <tr className="bg-gray-200">
            <td colSpan={4} className="font-bold">Procurement Inventory</td>
          </tr>
          <tr>
            <td className="border px-4 py-2">Gamma (Plant & DC1)</td>
            <td colSpan={3} className="border px-4 py-2">{reportData.procurementInventory.plantDC1.gamma.units} units @ {reportData.procurementInventory.plantDC1.gamma.unitPrice}/unit: {reportData.procurementInventory.plantDC1.gamma.total}</td>
          </tr>
          <tr>
            <td className="border px-4 py-2">Delta (Plant & DC1)</td>
            <td colSpan={3} className="border px-4 py-2">{reportData.procurementInventory.plantDC1.delta.units} units @ {reportData.procurementInventory.plantDC1.delta.unitPrice}/unit: {reportData.procurementInventory.plantDC1.delta.total}</td>
          </tr>
          <tr>
            <td className="border px-4 py-2">Epsilon (Plant & DC1)</td>
            <td colSpan={3} className="border px-4 py-2">{reportData.procurementInventory.plantDC1.epsilon.units} units @ {reportData.procurementInventory.plantDC1.epsilon.unitPrice}/unit: {reportData.procurementInventory.plantDC1.epsilon.total}</td>
          </tr>
          <tr>
            <td className="border px-4 py-2">Gamma (DC2)</td>
            <td colSpan={3} className="border px-4 py-2">{reportData.procurementInventory.dc2.gamma.units} units @ {reportData.procurementInventory.dc2.gamma.unitPrice}/unit: {reportData.procurementInventory.dc2.gamma.total}</td>
          </tr>
          <tr>
            <td className="border px-4 py-2">Delta (DC2)</td>
            <td colSpan={3} className="border px-4 py-2">{reportData.procurementInventory.dc2.delta.units} units @ {reportData.procurementInventory.dc2.delta.unitPrice}/unit: {reportData.procurementInventory.dc2.delta.total}</td>
          </tr>
          <tr>
            <td className="border px-4 py-2">Epsilon (DC2)</td>
            <td colSpan={3} className="border px-4 py-2">{reportData.procurementInventory.dc2.epsilon.units} units @ {reportData.procurementInventory.dc2.epsilon.unitPrice}/unit: {reportData.procurementInventory.dc2.epsilon.total}</td>
          </tr>
        </tbody>
      </table>
      <div className="flex justify-center my-4">
        <h3 className="font-bold">Total Assets: {reportData.totalAssets}</h3>
      </div>
      <div className="flex justify-center my-4">
        <h3 className="font-bold">Liabilities and Equities</h3>
      </div>
      <table className="w-full text-start whitespace-nowrap">
        <thead>
          <tr>
            <th className="px-4 py-2">Metric</th>
            <th className="px-4 py-2">Amount</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td className="border px-4 py-2">Corporate Capitalization</td>
            <td className="border px-4 py-2">{reportData.liabilitiesEquities.corporateCapitalization}</td>
          </tr>
          <tr>
            <td className="border px-4 py-2">Dividends, Current Month</td>
            <td className="border px-4 py-2">{reportData.liabilitiesEquities.dividendsCurrentMonth}</td>
          </tr>
          <tr>
            <td className="border px-4 py-2">Dividends, Cumulative</td>
            <td className="border px-4 py-2">{reportData.liabilitiesEquities.dividendsCumulative}</td>
          </tr>
          <tr>
            <td className="border px-4 py-2">Loans</td>
            <td className="border px-4 py-2">{reportData.liabilitiesEquities.loans}</td>
          </tr>
          <tr>
            <td className="border px-4 py-2">Retained Earnings, Current Month</td>
            <td className="border px-4 py-2">{reportData.liabilitiesEquities.retainedEarningsCurrentMonth}</td>
          </tr>
          <tr>
            <td className="border px-4 py-2">Retained Earnings, Cumulative</td>
            <td className="border px-4 py-2">{reportData.liabilitiesEquities.retainedEarningsCumulative}</td>
          </tr>
          <tr>
            <td className="border px-4 py-2">Total</td>
            <td className="border px-4 py-2">{reportData.liabilitiesEquities.total}</td>
          </tr>
        </tbody>
      </table>
      <div className="flex justify-center my-4">
        <h3 className="font-bold">Notes</h3>
      </div>
      <div className="flex justify-center my-4">
        <p>These Epsilon components are on-order, for delivery next month:</p>
        <p>Region 1: {reportData.notes.epsilonOrder.region1}</p>
        <p>Region 2: {reportData.notes.epsilonOrder.region2}</p>
      </div>
    </div>
  );
};

export default BalanceSheetTable;
