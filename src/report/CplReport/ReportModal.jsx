import React, { useEffect, useState } from "react";
import ReactDOM from "react-dom";
import {
  Button,
  Dialog,
  DialogHeader,
  DialogBody,
  DialogFooter,
} from "@material-tailwind/react";
import ReportTable1 from "./ReportTable1";
import { Box, Flex, Text } from "@chakra-ui/react";

function NewPageRenderer({ children }) {
  const [newWindow, setNewWindow] = useState(null);

  useEffect(() => {
    const newWin = window.open("", "_blank", "width=800,height=600");
    newWin.document.title = "Report Page";
    setNewWindow(newWin);

    // Copy all style tags from the main document to the new window
    Array.from(document.querySelectorAll("style")).forEach((styleEl) => {
      const newStyleEl = newWin.document.createElement("style");
      newStyleEl.innerHTML = styleEl.innerHTML;
      newWin.document.head.appendChild(newStyleEl);
    });

    // Close the new window when the component unmounts
    return () => {
      newWin.close();
    };
  }, []);

  return newWindow
    ? ReactDOM.createPortal(children, newWindow.document.body)
    : null;
}

export default function ReportModal({ setActiveReport, reportData }) {
  const [open, setOpen] = useState(true);
  const [openNewPage, setOpenNewPage] = useState(false);

  const handleOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
    setActiveReport("");
  };
  const handleExplode = () => setOpenNewPage(true);

  return (
    <>
      <Dialog
        size="lg"
        className="m-4 sm:m-6 md:m-10 mb-6 w-full max-w-4xl"
        open={open}
        handler={handleOpen}
      >
        <DialogHeader>
          <div className="flex justify-between items-center w-full">
            <span className="text-base sm:text-lg md:text-xl font-semibold">
              Report : Corporate P&L
            </span>
            <div className="flex items-center space-x-2">
              <Button
                variant="gradient"
                color="none"
                onClick={handleExplode}
                className="text-yellow-800 bg-transparent hover:bg-yellow-100 transition duration-300"
              >
                Explode{" "}
                <span>
                  <i className="fa-solid fa-up-right-and-down-left-from-center"></i>
                </span>
              </Button>
              <Button
                variant="text"
                color="red"
                onClick={handleClose}
                className="p-1"
              >
                <span className="text-red-500 text-lg">
                  <i className="fa-solid fa-xmark"></i>
                </span>
              </Button>
            </div>
          </div>
        </DialogHeader>

        <DialogBody
          style={{ height: "80vh", overflowY: "auto" }}
          className="text-base sm:text-lg overflow-y-auto"
        >
          <ReportTable1 reportData={reportData} />
        </DialogBody>

      </Dialog>

      {openNewPage && (
        <NewPageRenderer>
          <div>
            <h1 className="text-2xl font-bold mb-4">Report : Corporate P&L</h1>
            <ReportTable1 reportData={reportData} />
          </div>
        </NewPageRenderer>
      )}
    </>
  );
}
