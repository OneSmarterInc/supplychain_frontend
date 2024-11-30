// walkthrough.js
export const getSteps = (pathname) => {
  switch (pathname) {
    case "/dashboard":
      return [
        {
          element: "#dashboard-navbar",
          popover: {
            title: "Your Info",
            description: "Click to open the your info.",
            position: "top",
          },
        },
        {
          element: "#sidebar-button-dashboard",
          popover: {
            title: "Dashboard Button",
            description: "Click to open the dashboard.",
            position: "top",
          },
        },
        {
          element: "#sidebar-button-reports",
          popover: {
            title: "Reports Button",
            description: "Click to open reports.",
            position: "top",
          },
        },
        {
          element: "#sidebar-button-member-logs",
          popover: {
            title: "Member Logs Button",
            description: "Click to view logs.",
            position: "top",
          },
        },
        {
          element: "#sidebar-button-download-manual",
          popover: {
            title: "Download Manual Button",
            description: "Click to download the user manual.",
            position: "top",
          },
        },
        {
          element: "#decision-button",
          popover: {
            title: "Decision Button",
            description: "Click to make key decisions for the project.",
            position: "top",
          },
        },
        {
          element: "#quarters-button",
          popover: {
            title: "Quarters Selector",
            description: "Select your working quarters here.",
            position: "top",
          },
        },
      ];

    case "/Forecast":
      return [
        {
          element: "#forecast-button-load-quarters",
          popover: {
            title: "Load Data Quarterly",
            description:
              "Click a quarter button to load the forecast data for the selected quarter.",
            position: "top",
          },
        },
        {
          element: "#forecast-button-refresh",
          popover: {
            title: "Refresh Forecast",
            description:
              "Click this button to reload the forecast data in case of changes.",
            position: "top",
          },
        },
        {
          element: "#forecast-button-info",
          popover: {
            title: "Information",
            description:
              "Click this button to read crucial information about forecasting accuracy and its financial impact.",
            position: "top",
          },
        },
        {
          element: "#forecast-table-smart-home-assistance",
          popover: {
            title: "Smart Home Assistance",
            description:
              "Enter the forecasted sales volumes for Retail and Direct channels in each region.",
            position: "top",
          },
        },
        {
          element: "#forecast-table-smart-thermostat",
          popover: {
            title: "Smart Thermostat",
            description:
              "Enter the forecasted sales volumes for Retail and Direct channels in each region.",
            position: "top",
          },
        },
        {
          element: "#forecast-button-submit",
          popover: {
            title: "Submit Forecast",
            description:
              "Click this button to submit your forecast for the current quarter. Ensure all data is accurate before submission.",
            position: "top",
          },
        },
      ];

    case "/Procurement":
      return [
        {
          element: "#procurement-table-raw-materials",
          popover: {
            title: "Raw Materials",
            description:
              "Enter the required units for each raw material to meet your production goals.",
            position: "top",
          },
        },
        {
          element: "#procurement-table-supply-chain",
          popover: {
            title: "Supply Chain",
            description:
              "Select suppliers, transport medium, and input the unit requirements for each component (e.g., Audio Modal, Control Interface, Motherboard).",
            position: "top",
          },
        },
        {
          element: "#procurement-dc-selection",
          popover: {
            title: "Distribution Centers",
            description:
              "Select the appropriate distribution center (DC1, DC2, or DC3) for managing your supply chain.",
            position: "top",
          },
        },
        {
          element: "#procurement-add-row",
          popover: {
            title: "Add Row",
            description:
              "Click this button to add a new row for additional supply chain entries or materials.",
            position: "top",
          },
        },
        {
          element: "#procurement-submit",
          popover: {
            title: "Submit Procurement",
            description:
              "Click this button to submit your procurement plan for the current quarter. Ensure all data is accurate before submission.",
            position: "top",
          },
        },
      ];

    case "/Manufacture":
      return [
        {
          element: "#manufacture-production-table",
          popover: {
            title: "Production Table",
            description:
              "Specify production volumes for each product, including emergency limits and volume flexibility options.",
            position: "top",
          },
        },

        {
          element: "#manufacture-submit-button",
          popover: {
            title: "Submit Manufacture",
            description:
              "Click this button to finalize and submit your manufacturing decisions for the current quarter.",
            position: "top",
          },
        },
      ];
    case "/Distribution":
      return [
        {
          element: "#Distribution-production-table",
          popover: {
            title: "Production Table",
            description:
              "Specify production volumes for each product, including emergency limits and volume flexibility options.",
            position: "top",
          },
        },

        {
          element: "#Distribution-submit-button",
          popover: {
            title: "Submit Distribution",
            description:
              "Click this button to finalize and submit your distribution decisions for the current quarter.",
            position: "top",
          },
        },
      ];

    case "/Demand":
      return [
        {
          element: "#demand-Smart-Home-Assistance-Retail",
          popover: {
            title: "Smart Home Assistance (Retail)",
            description:
              "Specify demand values for the retail channel of the Smart Home Assistance product.",
            position: "top",
          },
        },
        {
          element: "#demand-Smart-Home-Assistance-Direct",
          popover: {
            title: "Smart Home Assistance (Direct)",
            description:
              "Specify demand values for the direct channel of the Smart Home Assistance product.",
            position: "top",
          },
        },
        {
          element: "#demand-Smart-Thermostat-Retail",
          popover: {
            title: "Smart Thermostat (Retail)",
            description:
              "Specify demand values for the retail channel of the Smart Thermostat product.",
            position: "top",
          },
        },
        {
          element: "#demand-Smart-Thermostat-Direct",
          popover: {
            title: "Smart Thermostat (Direct)",
            description:
              "Specify demand values for the direct channel of the Smart Thermostat product.",
            position: "top",
          },
        },
      ];

    case "/Service":
      return [
        {
          element: "#service-Smart-Home-Assistance-Retail",
          popover: {
            title: "Smart Home Assistance (Retail)",
            description:
              "Specify service values for the retail channel of the Smart Home Assistance product.",
            position: "top",
          },
        },
        {
          element: "#service-Smart-Home-Assistance-Direct",
          popover: {
            title: "Smart Home Assistance (Direct)",
            description:
              "Specify service values for the direct channel of the Smart Home Assistance product.",
            position: "top",
          },
        },
        {
          element: "#service-Smart-Thermostat-Retail",
          popover: {
            title: "Smart Thermostat (Retail)",
            description:
              "Specify service values for the retail channel of the Smart Thermostat product.",
            position: "top",
          },
        },
        {
          element: "#service-Smart-Thermostat-Direct",
          popover: {
            title: "Smart Thermostat (Direct)",
            description:
              "Specify service values for the direct channel of the Smart Thermostat product.",
            position: "top",
          },
        },
      ];

    default:
      return [];
  }
};
