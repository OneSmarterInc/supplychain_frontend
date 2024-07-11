import { useState } from "react";

const SubAssemblyComponents = () => {
  const [subAssemblyComponents, setSubAssemblyComponents] = useState([
    {
      supplier: "Supplier A",
      gamma: {
        cost: 12,
        delivery_inpercent: 80,
        deliveryChange_inpercent: 2,
        failure_inpercent: 2.0,
      },
      delta: {
        cost: "disabled",
        delivery_inpercent: "disabled",
        deliveryChange_inpercent: "disabled",
        failure_inpercent: "disabled",
      },
      epsilon: {
        cost: "disabled",
        delivery_inpercent: "disabled",
        deliveryChange_inpercent: "disabled",
        failure_inpercent: "disabled",
      },
    },
    {
      supplier: "Supplier B",
      gamma: {
        cost: 14,
        delivery_inpercent: 85,
        deliveryChange_inpercent: 4,
        failure_inpercent: 1.9,
      },
      delta: {
        cost: 15,
        delivery_inpercent: 75,
        deliveryChange_inpercent: 4,
        failure_inpercent: 2.6,
      },
      epsilon: {
        cost: "disabled",
        delivery_inpercent: "disabled",
        deliveryChange_inpercent: "disabled",
        failure_inpercent: "disabled",
      },
    },
    {
      supplier: "Supplier C",
      gamma: {
        cost: 13,
        delivery_inpercent: 85,
        deliveryChange_inpercent: 6,
        failure_inpercent: 2.6,
      },
      delta: {
        cost: 16,
        delivery_inpercent: 78,
        deliveryChange_inpercent: 6,
        failure_inpercent: 2.5,
      },
      epsilon: {
        cost: "disabled",
        delivery_inpercent: "disabled",
        deliveryChange_inpercent: "disabled",
        failure_inpercent: "disabled",
      },
    },
    {
      supplier: "Supplier D",
      gamma: {
        cost: 22,
        delivery_inpercent: 90,
        deliveryChange_inpercent: 8,
        failure_inpercent: 1.2,
      },
      delta: {
        cost: 24,
        delivery_inpercent: 80,
        deliveryChange_inpercent: 8,
        failure_inpercent: 1.8,
      },
      epsilon: {
        cost: 29,
        delivery_inpercent: 80,
        deliveryChange_inpercent: 8,
        failure_inpercent: 1.1,
      },
    },
    {
      supplier: "Supplier E",
      gamma: {
        cost: "disabled",
        delivery_inpercent: "disabled",
        deliveryChange_inpercent: "disabled",
        failure_inpercent: "disabled",
      },
      delta: {
        cost: 14,
        delivery_inpercent: 70,
        deliveryChange_inpercent: 10,
        failure_inpercent: 2.7,
      },
      epsilon: {
        cost: 20,
        delivery_inpercent: 75,
        deliveryChange_inpercent: 10,
        failure_inpercent: 1.7,
      },
    },
    {
      supplier: "Supplier F",
      gamma: {
        cost: "disabled",
        delivery_inpercent: "disabled",
        deliveryChange_inpercent: "disabled",
        failure_inpercent: "disabled",
      },
      delta: {
        cost: 13,
        delivery_inpercent: 70,
        deliveryChange_inpercent: 12,
        failure_inpercent: 2.8,
      },
      epsilon: {
        cost: 19,
        delivery_inpercent: 77,
        deliveryChange_inpercent: 12,
        failure_inpercent: 1.8,
      },
    },
    {
      supplier: "Supplier G",
      gamma: {
        cost: "disabled",
        delivery_inpercent: "disabled",
        deliveryChange_inpercent: "disabled",
        failure_inpercent: "disabled",
      },
      delta: {
        cost: "disabled",
        delivery_inpercent: "disabled",
        deliveryChange_inpercent: "disabled",
        failure_inpercent: "disabled",
      },
      epsilon: {
        cost: 21,
        delivery_inpercent: 78,
        deliveryChange_inpercent: 14,
        failure_inpercent: 1.7,
      },
    },
  ]);

  console.log("subassembly component", subAssemblyComponents);

  const handleSubAssemblyInputChange = (event, supplierIndex, component, field) => {
    const updatedSubAssemblyComponents = [...subAssemblyComponents];
    updatedSubAssemblyComponents[supplierIndex] = {
      ...updatedSubAssemblyComponents[supplierIndex],
      [component]: {
        ...updatedSubAssemblyComponents[supplierIndex][component],
        [field]: parseFloat(event.target.value),
      },
    };
    setSubAssemblyComponents(updatedSubAssemblyComponents);
  };

  const renderInput = (componentName, index, field, disabled) => (
    <input
      type="number"
      className={`w-full px-2 py-1 border rounded ${
        disabled ? "bg-gray-200 cursor-not-allowed" : "bg-white"
      }`}
      value={subAssemblyComponents[index][componentName][field]}
      onChange={(event) =>
        handleSubAssemblyInputChange(event, index, componentName, field)
      }
      disabled={disabled}
    />
  );

  return (
    <div className="container mx-auto mt-10">
            <h2 className="text-2xl font-bold mb-4">
              Exhibit 5: Sub-Assembly Component Characteristics
            </h2>
            <table className="w-full table-auto border border-green-700 border-spacing-3 gap-3">
              <thead>
                <tr className="bg-blue-100">
                  <th className="py-2 px-4 border-b border-r border-gray-300 text-left">
                    Supplier
                  </th>
                  <th
                    colSpan={3}
                    className="py-2 px-4 border-b border-r border-gray-300 text-center"
                  >
                    Gamma
                  </th>
                  <th
                    colSpan={3}
                    className="py-2 px-4 border-b border-r border-gray-300 text-center"
                  >
                    Delta
                  </th>
                  <th
                    colSpan={3}
                    className="py-2 px-4 border-b border-gray-300 text-center"
                  >
                    Epsilon
                  </th>
                </tr>
                <tr className="bg-blue-100">
                  <th className="py-2 px-4 border-b border-gray-300 text-left"></th>
                  <th className="py-2 px-4 border-b border-l  border-gray-300 text-center">
                    Cost
                  </th>
                  <th className="py-2 px-4 border-b border-l border-gray-300 text-center">
                    Delivery
                  </th>
                  <th className="py-2 px-4 border-b border-l border-gray-300 text-center">
                    Failure
                  </th>
                  <th className="py-2 px-4 border-b border-l border-gray-300 text-center">
                    Cost
                  </th>
                  <th className="py-2 px-4 border-b border-l border-gray-300 text-center">
                    Delivery
                  </th>
                  <th className="py-2 px-4 border-b border-l border-gray-300 text-center">
                    Failure
                  </th>
                  <th className="py-2 px-4 border-b border-l border-gray-300 text-center">
                    Cost
                  </th>
                  <th className="py-2 px-4 border-b border-l border-gray-300 text-center">
                    Delivery
                  </th>
                  <th className="py-2 px-4 border-b border-l border-gray-300 text-center">
                    Failure
                  </th>
                </tr>
              </thead>
              <tbody className="">
                {subAssemblyComponents.map((component, index) => (
                  <tr
                    key={index}
                    className={`${index % 2 === 0 ? "bg-gray-50" : "bg-white"}`}
                  >
                    <td className="py-2 px-4 border-b border-r border-gray-300 text-left">
                      {component.supplier}
                    </td>
                    <td className="py-2 px-4 border-b border-r border-gray-300 text-center">
                      <div className="flex items-center space-x-1">
                        <p className="text-green-500">$</p>
                        {renderInput(
                          "gamma",
                          index,
                          "cost",
                          component.gamma.cost === "disabled"
                        )}
                      </div>
                    </td>
                    <td className="delivery py-2 px-4 border-b border-r  border-gray-300 text-center">
                      <div className="flex">
                        {renderInput(
                          "gamma",
                          index,
                          "delivery_inpercent",
                          component.gamma.delivery_inpercent === "disabled"
                        )}
                        <p className="text-red-500 mx-1">±</p>
                        {renderInput(
                          "gamma",
                          index,
                          "deliveryChange_inpercent",
                          component.gamma.deliveryChange_inpercent ===
                            "disabled"
                        )}
                      </div>
                    </td>
                    <td className="py-2 px-4 border-b border-r border-gray-300 text-center">
                      {renderInput(
                        "gamma",
                        index,
                        "failure_inpercent",
                        component.gamma.failure_inpercent === "disabled"
                      )}
                    </td>
                    <td className="py-2 px-4 border-b border-r border-gray-300 text-center">
                      <div className="flex items-center space-x-1">
                        <p className="text-green-500">$</p>
                        {renderInput(
                          "delta",
                          index,
                          "cost",
                          component.delta.cost === "disabled"
                        )}
                      </div>
                    </td>
                    <td className="delivery py-2 px-4 border-b border-r  border-gray-300 text-center">
                      <div className="flex">
                        {renderInput(
                          "delta",
                          index,
                          "delivery_inpercent",
                          component.delta.delivery_inpercent === "disabled"
                        )}
                        <p className="text-red-500 mx-1">±</p>
                        {renderInput(
                          "delta",
                          index,
                          "deliveryChange_inpercent",
                          component.delta.deliveryChange_inpercent ===
                            "disabled"
                        )}
                      </div>
                    </td>
                    <td className="py-2 px-4 border-b border-r border-gray-300 text-center">
                      {renderInput(
                        "delta",
                        index,
                        "failure_inpercent",
                        component.delta.failure_inpercent === "disabled"
                      )}
                    </td>
                    <td className="py-2 px-4 border-b border-r border-gray-300 text-center">
                      <div className="flex items-center space-x-1">
                        <p className="text-green-500">$</p>
                        {renderInput(
                          "epsilon",
                          index,
                          "cost",
                          component.epsilon.cost === "disabled"
                        )}
                      </div>
                    </td>
                    <td className="delivery py-2 px-4 border-b border-r  border-gray-300 text-center">
                      <div className="flex">
                        {renderInput(
                          "epsilon",
                          index,
                          "delivery_inpercent",
                          component.epsilon.delivery_inpercent === "disabled"
                        )}
                        <p className="text-red-500 mx-1">±</p>
                        {renderInput(
                          "epsilon",
                          index,
                          "deliveryChange_inpercent",
                          component.epsilon.deliveryChange_inpercent ===
                            "disabled"
                        )}
                      </div>
                    </td>
                    <td className="py-2 px-4 border-b border-gray-300 text-center">
                      {renderInput(
                        "epsilon",
                        index,
                        "failure_inpercent",
                        component.epsilon.failure_inpercent === "disabled"
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
  );
};

export default SubAssemblyComponents;
