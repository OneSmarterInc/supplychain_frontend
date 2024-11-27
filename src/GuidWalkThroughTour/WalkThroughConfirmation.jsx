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
      popoverClass: "driverjs-theme",
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
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-60 backdrop-blur-sm animate-fadeIn">
          <div className="bg-gradient-to-br from-yellow-300 to-yellow-400 text-black rounded-xl p-8 shadow-2xl w-full max-w-md animate-scaleIn">
            <h2 className="text-2xl font-extrabold mb-4 text-center tracking-wide">
              Start Walkthrough
            </h2>
            <p className="mb-6 text-center text-lg">
              Would you like to begin the walkthrough for this page?
            </p>
            <div className="flex justify-center gap-4">
              <button
                className="px-6 py-3 bg-gray-200 hover:bg-gray-300 text-black font-medium rounded-lg transition-all duration-200 transform hover:scale-105"
                onClick={handleWalkthroughCancel}
              >
                Cancel
              </button>
              <button
                className="px-6 py-3 bg-green-600 hover:bg-green-700 text-white font-medium rounded-lg transition-all duration-200 transform hover:scale-105"
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
          className="fixed btn-restart-tour z-50 bottom-4 left-4 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg shadow-lg"
          onClick={handleWalkthroughRestart}
        >
          Restart Walkthrough
        </button>
      )}
    </div>
  );
};

export default WalkThrough;
