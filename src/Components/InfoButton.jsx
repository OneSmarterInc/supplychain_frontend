import React, { useState } from 'react';

const InfoButton = ({ decision }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleButtonClick = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  // Define the content for each decision type
  const getModalContent = () => {
    switch (decision) {
      case 'Forecast':
        return (
          <ul className="text-sm text-gray-700 list-disc pl-5">
            <li>Accurate sales volume forecasting is crucial as it directly impacts administrative overhead costs.</li>
            <li>For every 1% error in sales forecasts, administrative overhead costs increase by 1%.</li>
            <li>The maximum penalty for forecasting inaccuracy can double the administrative overhead costs for a product in a region.</li>
            <li>Forecast error costs are reported as "Forecast Inaccuracy" in financial statements.</li>
            <li>Base administrative overhead costs are $80,000/quarter for Channel 1 and $120,000/quarter for Channel 2 per product in all regions.</li>
            <li>Sales forecasting is independent of procurement and production decisions, focusing on estimating customer demand.</li>
            <li>Forecasting accuracy affects both direct administrative overhead adjustments and inventory pipeline efficiency.</li>
            <li>The formula for forecasting accuracy is:
              <code>
                Forecasting Accuracy = 100 × (1 - |Forecast - Actual| / Actual)
              </code>
            </li>
            <li>A forecast of 11,000 units with an actual of 8,000 units results in a forecasting accuracy of 62.5%.</li>
            <li>The lowest possible forecasting accuracy score is 0.0%.</li>

          </ul>
        );
      case 'Procurement':
        return (
          <ul className="text-sm text-gray-700 list-disc pl-5">

            <li>FLEX firm manages procurement by sourcing raw materials and sub-assembly components from suppliers.</li>
            <li>Postponed production requires inventory management decisions at regional distribution centers.</li>
            <li>Sub-assembly components may fail in the field during customer use.</li>
            <li>Replacement parts are provided at no cost within the warranty period.</li>
            <li>Regional distribution centers supply replacement parts to their local regions.</li>
            <li>If no regional distribution center exists, demand is met by the center adjacent to the manufacturing plant in market region 1.</li>
            <li>Emergency procurement orders are automatically executed if inventory is insufficient for production.</li>
            <li>Plastics and casings are widely available single-grade commodities purchased at worldwide spot-market prices.</li>
            <li>Transportation for raw materials is covered by suppliers, typically using surface transportation.</li>
            <li>Delivery of raw materials is always within the current quarter.</li>
            <li>Current prices: $3/kg for plastics and $4/kg for casings.</li>
            <li>Volume discounts are available for large procurements, up to 19.2% for over 1,000,000 kg.</li>
            <li>Emergency orders incur an additional $1/kg transportation charge.</li>
            <li>Smart Home Assistant (SHA) includes the Audio Module (AM) sub-assembly component.</li>
            <li>Smart Thermostat (ST) includes the Control Interface (CI) sub-assembly component.</li>
          </ul>
        );
      case 'Manufacture':
        return (
          <ul className="text-sm text-gray-700 list-disc pl-5">
            <li>Postponed production involves creating a partially completed product, known as a "SHELL," at the manufacturing plant.</li>
            <li>SHELLS are converted into specific finished goods at regional distribution centers (DCs).</li>
            <li>The final product identity is assigned at the distribution center, not at the manufacturing plant.</li>
            <li>Postponed production helps reduce demand-supply imbalances at distribution centers.</li>
            <li>SHELLS can be converted into either Smart Home Assistant (SHA) or Smart Thermostat (ST) to meet local demand variations.</li>
            <li>Postponed production is only possible with an owned DC, not with a third-party DC.</li>
            <li>Emergency production limits allow you to control product-specific emergency production levels.</li>
            <li>If finished goods inventory is insufficient, an emergency production order is automatically executed up to the specified limit.</li>
            <li>Production volume flexibility permits exceeding quarter-over-quarter production order change limits by up to 10,000 units.</li>
            <li>If demand exceeds the emergency production limit, customer sales and shipments to other DCs must be reduced proportionately.</li>
            <li>Unfilled orders occur when actual customer sales are lower than potential sales due to inadequate inventory after accounting for emergency production limits.</li>
            <li>Unfilled orders are not backlogged and do not guarantee future sales.</li>
            <li>Past experience indicates that 8%-12% of sales result in returns, with potential increases if unfilled orders exist.</li>

          </ul>
        );

      case 'Distribution':
        return (
          <ul className="text-sm text-gray-700 list-disc pl-5">
            <li>An owned distribution center (DC) is mandatory in Region 1; optional in other regions.</li>
            <li>If no DC exists in a region, sales are serviced from the Region 1 DC.</li>
            <li>Owned DCs in regions allow for postponed production and inventorying of sub-assembly components.</li>
            <li>New regional DCs will not have inventory of the Motherboard sub-assembly in the first quarter, leading to emergency ordering costs.</li>
            <li>Surface transportation is used for finished goods from a regional DC; air transportation is required from the Region 1 DC if no local DC exists.</li>
            <li>Decision Option 0: No DC; Decision Option 1: Outsourced DC; Decision Option 2: Owned DC with varying costs and inventory charges.</li>
            <li>RFID is required for products distributed through the retail channel, with options for outsourced or insourced RFID application.</li>
            <li>Emergency carriers must be chosen for each DC (except DC1) for plant-to-DC shipments.</li>
            <li>Cross-docking reduces inventory holding costs and DC operating costs, with options to enable cross-docking with specific carriers.</li>
            <li>Surface shipping methods (expedited, standard, economy) are available for both finished goods and sub-assembly components, affecting delivery reliability and cost.</li>

          </ul>
        );

      case 'Transport':
        return (
          <ul className="text-sm text-gray-700 list-disc pl-5">
            <li>FLEX transportation decisions involve selecting transportation modes (surface and air) for inbound sub-assembly components and finished goods shipments from the plant to DCs.</li>
            <li>Surface transportation is less expensive but less reliable than air transportation.</li>
            <li>Air transportation is more expensive but guarantees 100% delivery reliability within the current quarter.</li>
            <li>For regions outside Region 1, you must decide on shipment volumes across surface and air modes and choose from six carriers (I, J, K, L, M, N).</li>
            <li>Carriers offer a 20% rebate on transportation charges if used exclusively during the current quarter.</li>
            <li>An emergency carrier must be selected for each DC (excluding DC1) for emergency shipments.</li>
            <li>Inbound raw materials transportation is vendor-managed and bundled with their prices, requiring no decisions.</li>
            <li>Inbound sub-assembly components require joint decisions between suppliers and manufacturers, with manufacturers choosing the transportation mode.</li>
            <li>Manufacturers are responsible for transportation decisions for plant-to-DC shipments, particularly in regions outside Region 1.</li>
            <li>No transportation costs are incurred for shipments to DC1, as it is located adjacent to the manufacturing plant.</li>

          </ul>
        );

      case 'Demand':
        return (
          <ul className="text-sm text-gray-700 list-disc pl-5">
            <li>Products can be introduced or dropped from regions or channels, with introduction costs of $300,000 for Channel #1 and $100,000 for Channel #2.</li>
            <li>Dropping a product incurs no costs, but introduction costs are recorded under "Introductions" on financial statements.</li>
            <li>To activate or drop a product, change the "Active Product?" status accordingly; the product remains active until explicitly dropped.</li>
            <li>Marketing spending must be reduced to $0 when a product is dropped to avoid unnecessary costs.</li>
            <li>New product-region-channel launches are limited to a maximum of three per quarter due to manufacturing capacity constraints.</li>
            <li>Two sales channels exist: Channel 1 (Retail) and Channel 2 (Direct), each serving distinct customer bases.</li>
            <li>Retail channel supports in-person shoppers, while the direct channel sells directly to customers via e-commerce.</li>
            <li>Price decisions are required for each product in each region and channel, with different pricing controls for retail and direct channels.</li>
            <li>Price changes incur costs, including a base fee of $10,000, $200 per dollar change, and 0.25% of current-quarter revenues.</li>
            <li>Marketing spending decisions must be made for each product in each region and channel, covering advertising, promotion, and sales efforts.</li>

          </ul>
        );

      case 'Service':
        return (
          <ul className="text-sm text-gray-700 list-disc pl-5">
            <li>Service management in the FLEX Supply Chain Management Simulation is outsourced to reputable call-center service providers.</li>
            <li>This outsourcing allows firms to focus on core supply chain activities while leveraging external expertise.</li>
            <li>Service outsourcing is region-specific, with four available service outsourcing levels.</li>
            <li>Level "0" indicates no service is provided ("None").</li>
            <li>Each service level has associated per-call costs and guaranteed service quality performance levels ("SQ Guarantee").</li>

          </ul>
        );

      case 'IT':
        return (
          <ul className="text-sm text-gray-700 list-disc pl-5">
            <li>You can establish vendor-managed inventory systems with sub-assembly component suppliers for better supply chain synchronization.</li>
            <li>IT synchronization improves procurement efficiency, surface transportation delivery performance, and component quality by reducing failure rates.</li>
            <li>Setting up IT synchronization involves a one-time cost per supplier, plus ongoing per-quarter maintenance costs.</li>
            <li>You can terminate IT synchronization at any time without cost, but reestablishing it incurs the initial setup cost again.</li>
            <li>Improved delivery reliability through IT synchronization makes surface transport more attractive compared to air transport.</li>
            <li>IT synchronization decreases failure rates of sub-assembly components due to closer supplier-buyer collaboration.</li>
            <li>Each sub-assembly component supplier has specific costs and benefits associated with IT synchronization.</li>
            <li>Decision Option "0": No IT synchronization with the supplier.</li>
            <li>Decision Option "1": Establish and maintain IT synchronization with the supplier, incurring setup and maintenance costs.</li>

          </ul>
        );
      default:
        return (
          <ul className="text-sm text-gray-700 list-disc pl-5">
            <li>No information available for this decision.</li>
          </ul>
        );
    }
  };

  return (
    <div className="relative inline-block">
      <button
        onClick={handleButtonClick}
        className="bg-gray-200 text-black rounded-lg w-12 h-8 flex items-center justify-center text-lg cursor-pointer"
      >
        info
      </button>

      {isModalOpen && (
        <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex items-center justify-center z-50 m-5">
          <div className="bg-white p-6 rounded-lg shadow-lg w-98">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-bold">Information</h2>
              <button
                onClick={handleCloseModal}
                className="text-gray-600 hover:text-gray-900"
              >
                &times;
              </button>
            </div>
            {getModalContent()}
            <div className="mt-4 text-right">
              <button
                onClick={handleCloseModal}
                className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default InfoButton;