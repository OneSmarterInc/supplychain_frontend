import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { driver } from "driver.js";
import "driver.js/dist/driver.css";
import "./walkthrough.css";

const WalkThrough = () => {
  const location = useLocation();
  const [showModal, setShowModal] = useState(false);
  const [walkthroughStatus, setWalkthroughStatus] = useState("");

  useEffect(() => {
    const storedStatus = localStorage.getItem(
      `walkthroughStatus_${location.pathname}`
    );
    setWalkthroughStatus(storedStatus);

    if (!storedStatus && getSteps().length > 0) {
      setShowModal(true);
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
              closeBtnText: "Skip",
            },
          },
          {
            element: "#navbar-dashboard",
            popover: {
              title: "Dashboard",
              description: "Access the main dashboard from here.",
              position: "bottom",
              closeBtnText: "Skip",
            },
          },
        ];
      case "/dashboard":
        return [
          {
            element: "#sidebar-button-dashboard",
            popover: {
              title: "Dashboard Button",
              description: "Click to open the dashboard.",
              position: "top",
              closeBtnText: "Skip",
            },
          },
          {
            element: "#decision-button",
            popover: {
              title: "Decision Button",
              description: "Click to make key decisions for the project.",
              position: "top",
              closeBtnText: "Skip",
            },
          },
        ];
      default:
        return [];
    }
  };

  const startWalkthrough = () => {
    const driverObj = driver({
      animate: true,
      opacity: 0.8,
      padding: 10,
      allowClose: true,
      overlayClickNext: true,
      doneBtnText: "Finish",
      closeBtnText: "Skip",
      nextBtnText: "Next",
      prevBtnText: "Previous",
      showProgress: true,
      theme: "custom-theme",
      steps: getSteps(),
    });

    driverObj.drive();

    const observer = new MutationObserver(() => {
      const activeElement = document.querySelector(
        ".driver-highlighted-element"
      );
      if (!activeElement) {
        localStorage.setItem(
          `walkthroughStatus_${location.pathname}`,
          "completed"
        );
        setWalkthroughStatus("completed");
        observer.disconnect();
      }
    });

    observer.observe(document.body, { childList: true, subtree: true });
  };

  const handleWalkthroughStart = () => {
    setShowModal(false);
    startWalkthrough();
  };

  const handleWalkthroughCancel = () => {
    setShowModal(false);
    localStorage.setItem(`walkthroughStatus_${location.pathname}`, "canceled");
    setWalkthroughStatus("canceled");
  };

  const handleWalkthroughRestart = () => {
    startWalkthrough();
  };

  return (
    <div>
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white rounded-lg p-6 shadow-lg w-1/3">
            <h2 className="text-lg font-bold mb-4">Start Walkthrough</h2>
            <p className="mb-6">
              Would you like to start the walkthrough for this page?
            </p>
            <div className="flex justify-end">
              <button
                className="px-4 py-2 mr-4 bg-gray-300 hover:bg-gray-400 rounded-lg"
                onClick={handleWalkthroughCancel}
              >
                Cancel
              </button>
              <button
                className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg"
                onClick={handleWalkthroughStart}
              >
                Start Walkthrough
              </button>
            </div>
          </div>
        </div>
      )}

      {walkthroughStatus === "completed" && (
        <button
          className="fixed btn-restart-tour z-50 bottom-4 right-4 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg shadow-lg"
          onClick={handleWalkthroughRestart}
        >
          Restart Walkthrough
        </button>
      )}
    </div>
  );
};

export default WalkThrough;
