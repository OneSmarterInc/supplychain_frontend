import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { driver } from "driver.js";
import "driver.js/dist/driver.css";
// import "./walkthrough.css";

const WalkThrough = () => {
  const location = useLocation();
  const [hasWalkthroughStarted, setHasWalkthroughStarted] = useState(false);

  useEffect(() => {
    const walkthroughShown = localStorage.getItem(
      `walkthroughShown_${location.pathname}`
    );

    if (!walkthroughShown) {
      startWalkthrough();
      localStorage.setItem(`walkthroughShown_${location.pathname}`, "true");
    }
  }, [location]);

  const getSteps = () => {
    switch (location.pathname) {
      case "/":
        return [
          {
            element: "#navbar-notification",
            popover: {
              title: "Navbar Notifications",
              description: "Check notifications, log in, and sign up here.",
              position: "bottom",
            },
          },
          {
            element: "#navbar-dashboard",
            popover: {
              title: "Dashboard",
              description: "Access the main dashboard from here.",
              position: "bottom",
            },
          },
        ];
      case "/dashboard":
        return [
          {
            element: "#sidebar-button-dashboard",
            popover: {
              title: "Decision Button",
              description: "Click to open dashboard.",
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
              description: "Click to download user manual.",
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
      case "/forecast":
        return [
          {
            element: "#forecast-decision",
            popover: {
              title: "Forecast Decision",
              description: "Make your forecast decisions here.",
              position: "right",
            },
          },
        ];
      default:
        return [];
    }
  };

  // Start the walkthrough
  const startWalkthrough = () => {
    const driverObj = driver({
      animate: true,
      opacity: 0.8,
      padding: 10,
      allowClose: true,
      overlayClickNext: true,
      doneBtnText: "Finish",
      closeBtnText: "Close",
      nextBtnText: "Next",
      prevBtnText: "Previous",
      showProgress: true,
      theme: "custom-theme",
      steps: getSteps(),
    });

    driverObj.drive();
  };

  const handleWalkthroughButtonClick = () => {
    setHasWalkthroughStarted(true);
    startWalkthrough();
  };

  return (
    <div>
      <button
        className="fixed btn-start-tour z-50 bottom-4 right-4 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg shadow-lg"
        onClick={handleWalkthroughButtonClick}
      >
        {hasWalkthroughStarted ? "Restart Walkthrough" : "Start Walkthrough"}
      </button>
    </div>
  );
};

export default WalkThrough;
