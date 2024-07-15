import { useState } from "react";

const TransportationTableComponent = () => {

  const [shipments, setShipments] = useState([
    {
      carrier: "Carrier I",
      marketRegion1: "disabled",
      marketRegion2: {
        cost_surface: 6,
        cost_air: 8,
        delivery_inpercent_surface: 70,
        delivery_change_in_percent_surface: 4,
        delivery_inpercent_air: 100,
      },
      marketRegion3: {
        cost_surface: 10,
        cost_air: 14,
        delivery_inpercent_surface: 70,
        delivery_change_in_percent_surface: 4,
        delivery_inpercent_air: 100,
      },
    },
    {
      carrier: "Carrier J",
      marketRegion1: "disabled",
      marketRegion2: {
        cost_surface: 4,
        cost_air: 8,
        delivery_inpercent_surface: 40,
        delivery_change_in_percent_surface: 8,
        delivery_inpercent_air: 100,
      },
      marketRegion3: {
        cost_surface: 4,
        cost_air: 10,
        delivery_inpercent_surface: 30,
        delivery_change_in_percent_surface: 8,
        delivery_inpercent_air: 100,
      },
    },
    {
      carrier: "Carrier K",
      marketRegion1: "disabled",
      marketRegion2: {
        cost_surface: 8,
        cost_air: 10,
        delivery_inpercent_surface: 70,
        delivery_change_in_percent_surface: 12,
        delivery_inpercent_air: 100,
      },
      marketRegion3: {
        cost_surface: 6,
        cost_air: 12,
        delivery_inpercent_surface: 60,
        delivery_change_in_percent_surface: 12,
        delivery_inpercent_air: 100,
      },
    },
    {
      carrier: "Carrier L",
      marketRegion1: "disabled",
      marketRegion2: {
        cost_surface: 8,
        cost_air: 10,
        delivery_inpercent_surface: 75,
        delivery_change_in_percent_surface: 4,
        delivery_inpercent_air: 100,
      },
      marketRegion3: {
        cost_surface: 8,
        cost_air: 16,
        delivery_inpercent_surface: 60,
        delivery_change_in_percent_surface: 4,
        delivery_inpercent_air: 100,
      },
    },
    {
      carrier: "Carrier M",
      marketRegion1: "disabled",
      marketRegion2: {
        cost_surface: 6,
        cost_air: 10,
        delivery_inpercent_surface: 65,
        delivery_change_in_percent_surface: 8,
        delivery_inpercent_air: 100,
      },
      marketRegion3: {
        cost_surface: 6,
        cost_air: 12,
        delivery_inpercent_surface: 75,
        delivery_change_in_percent_surface: 8,
        delivery_inpercent_air: 100,
      },
    },
    {
      carrier: "Carrier N",
      marketRegion1: "disabled",
      marketRegion2: {
        cost_surface: 10,
        cost_air: 12,
        delivery_inpercent_surface: 82,
        delivery_change_in_percent_surface: 12,
        delivery_inpercent_air: 100,
      },
      marketRegion3: {
        cost_surface: 12,
        cost_air: 18,
        delivery_inpercent_surface: 78,
        delivery_change_in_percent_surface: 12,
        delivery_inpercent_air: 100,
      },
    },
  ]);

  const handleTransportationInputChange = (e, index, region, field) => {
    const { value } = e.target;
    const updatedShipments = shipments.map((shipment, i) => {
      if (i === index) {
        return {
          ...shipment,
          [region]: {
            ...shipment[region],
            [field]: value,
          },
        };
      }
      return shipment;
    });
    setShipments(updatedShipments);
  };

  console.log("Shipment:-", shipments);

  return (
    <div className="container mx-auto mt-10">
      <h2 className="text-2xl font-bold mb-4">
        Exhibit 9: Plant-To-DC Transportation Shipments
      </h2>
      <table className="w-full table-auto border border-gray-300">
        <thead>
          <tr className="bg-blue-100">
            <th
              rowSpan="2"
              className="py-2 w-40 px-4 border-b border-gray-300 text-left"
            >
              Carrier
            </th>
            <th
              colSpan="2"
              className="py-2 px-4 border-b border-gray-300 text-center"
            >
              Market Region 1
            </th>
            <th
              colSpan="2"
              className="py-2 px-4 border-b border-gray-300 text-center"
            >
              Market Region 2
            </th>
            <th
              colSpan="2"
              className="py-2 px-4 border-b border-gray-300 text-center"
            >
              Market Region 3
            </th>
          </tr>
          <tr className="bg-blue-100">
            <th className="py-2 px-4 border-b  border-gray-300 text-center"></th>
            <th className="py-2 px-4 border-b  border-gray-300 text-center"></th>
            <th className="py-2 px-4 border-b border-gray-300 text-center">
              Cost
            </th>
            <th className="py-2 px-4 border-b border-gray-300 text-center">
              Delivery
            </th>
            <th className="py-2 px-4 border-b border-gray-300 text-center">
              Cost
            </th>
            <th className="py-2 px-4 border-b border-gray-300 text-center">
              Delivery
            </th>
          </tr>
        </thead>
        <tbody>
          {shipments.map((shipment, index) => (
            <tr
              key={index}
              className={`${index % 2 === 0 ? "bg-gray-50" : "bg-white"}`}
            >
              <td className="py-2 px-4 border-b border-gray-300 text-left">
                {/* {shipment.carrier.split("\n").map((line, index) => (
                  <div key={index}>{line}</div>
                ))} */}
                <p>{shipment.carrier}, Surface</p>
                <p>{shipment.carrier}, Air</p>
              </td>
              <td className="py-2 px-4 border-b  bg-black border-gray-300 text-center"></td>
              <td className="py-2 px-4 border-b bg-black border-gray-300 text-center"></td>
              <td className="py-2 px-4 border-b border-gray-300 text-center">
                <div className="flex items-center">
                  <span className="mr-1  text-green-400">$</span>
                  <input
                    type="number"
                    value={shipment.marketRegion2.cost_surface}
                    onChange={(e) =>
                      handleTransportationInputChange(
                        e,
                        index,
                        "marketRegion2",
                        "cost_surface"
                      )
                    }
                    className="w-full border text-center border-gray-300 px-2 py-1"
                  />
                </div>
                <div className="flex items-center mt-1">
                  <span className="mr-1  text-green-400">$</span>
                  <input
                    type="number"
                    value={shipment.marketRegion2.cost_air}
                    onChange={(e) =>
                      handleTransportationInputChange(e, index, "marketRegion2", "cost_air")
                    }
                    className="w-full border text-center border-gray-300 px-2 py-1"
                  />
                </div>
              </td>
              <td className="py-2 flex flex-col justify-center items-center px-4 border-b border-gray-300 text-center">
                <div className="flex items-center">
                  <input
                    type="text"
                    value={shipment.marketRegion2.delivery_inpercent_surface}
                    onChange={(e) =>
                      handleTransportationInputChange(
                        e,
                        index,
                        "marketRegion2",
                        "delivery_inpercent_surface"
                      )
                    }
                    className="w-full border text-center border-gray-300 px-2 py-1"
                  />
                  <span className="mx-1  text-green-400">%</span>
                  <span className="text-red-500">+-</span>
                  <input
                    type="text"
                    value={
                      shipment.marketRegion2.delivery_change_in_percent_surface
                    }
                    onChange={(e) =>
                      handleTransportationInputChange(
                        e,
                        index,
                        "marketRegion2",
                        "delivery_change_in_percent_surface"
                      )
                    }
                    className="w-full border text-center border-gray-300 px-2 py-1"
                  />
                  <span className="ml-1  text-green-400">%</span>
                </div>
                <div className="flex items-center mt-1">
                  <input
                    type="text"
                    value={shipment.marketRegion2.delivery_inpercent_air}
                    onChange={(e) =>
                      handleTransportationInputChange(
                        e,
                        index,
                        "marketRegion2",
                        "delivery_inpercent_air"
                      )
                    }
                    className="w-full border text-center border-gray-300 px-2 py-1"
                  />
                  <span className="ml-1  text-green-400">%</span>
                </div>
              </td>
              <td className="py-2 px-4 border-b border-gray-300 text-center">
                <div className="flex items-center">
                  <span className="mr-1  text-green-400">$</span>
                  <input
                    type="number"
                    value={shipment.marketRegion3.cost_surface}
                    onChange={(e) =>
                      handleTransportationInputChange(
                        e,
                        index,
                        "marketRegion3",
                        "cost_surface"
                      )
                    }
                    className="w-full border text-center border-gray-300 px-2 py-1"
                  />
                </div>
                <div className="flex items-center mt-1">
                  <span className="mr-1  text-green-400">$</span>
                  <input
                    type="number"
                    value={shipment.marketRegion3.cost_air}
                    onChange={(e) =>
                      handleTransportationInputChange(e, index, "marketRegion3", "cost_air")
                    }
                    className="w-full border text-center border-gray-300 px-2 py-1"
                  />
                </div>
              </td>
              <td className="py-2 flex flex-col justify-center items-center px-4 border-b border-gray-300 text-center">
                <div className="flex items-center">
                  <input
                    type="text"
                    value={shipment.marketRegion3.delivery_inpercent_surface}
                    onChange={(e) =>
                      handleTransportationInputChange(
                        e,
                        index,
                        "marketRegion3",
                        "delivery_inpercent_surface"
                      )
                    }
                    className="w-full border text-center border-gray-300 px-2 py-1"
                  />
                  <span className="mx-1  text-green-400">%</span>
                  <span className="text-red-500">+-</span>
                  <input
                    type="text"
                    value={
                      shipment.marketRegion3.delivery_change_in_percent_surface
                    }
                    onChange={(e) =>
                      handleTransportationInputChange(
                        e,
                        index,
                        "marketRegion3",
                        "delivery_change_in_percent_surface"
                      )
                    }
                    className="w-full border text-center border-gray-300 px-2 py-1"
                  />
                  <span className="ml-1  text-green-400">%</span>
                </div>
                <div className="flex items-center mt-1">
                  <input
                    type="text"
                    value={shipment.marketRegion3.delivery_inpercent_air}
                    onChange={(e) =>
                      handleTransportationInputChange(
                        e,
                        index,
                        "marketRegion3",
                        "delivery_inpercent_air"
                      )
                    }
                    className="w-full border text-center border-gray-300 px-2 py-1"
                  />
                  <span className="ml-1 text-green-400">%</span>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default TransportationTableComponent;
