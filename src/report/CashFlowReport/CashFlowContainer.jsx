import React, { useEffect, useState } from "react";
import ReactDOM from "react-dom";
import CashFlowTable from "./CashReportTable"; // Assuming it's in the same directory
import {
  Button,
  Dialog,
  DialogHeader,
  DialogBody,
  DialogFooter,
} from "@material-tailwind/react";
import { Box, Flex, Text } from "@chakra-ui/react";

// Component to render content in a new window
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

// Destructure `reportData` from props
const CashFlowContainer = ({ reportData, setActiveReport }) => {
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
      {/* <Button onClick={handleOpen}>View Report</Button>  */}
      <Dialog size="lg" open={open} handler={handleOpen}>
        <DialogHeader>
          <Flex width={"100%"} justifyContent={"space-between"}>
            <Text>Report : Cash Flow Report</Text>
            <Box>
              <Button
                variant="gradient"
                color="blue"
                onClick={handleExplode}
                className="ml-4"
              >
                Explode
              </Button>
              <Button
                variant="text"
                color="red"
                onClick={handleClose}
                className="mr-1"
              >
                <span>Close</span>
              </Button>
            </Box>
          </Flex>
        </DialogHeader>
        <DialogBody
          style={{ height: "600px", overflowY: "auto" }}
          className="text-lg overflow-scroll"
        >
          <CashFlowTable data={reportData} />{" "}
          {/* Pass `reportData` as prop to the table */}
        </DialogBody>
        <DialogFooter>
          <Button onClick={handleOpen} variant="gradient" color="red">
            Close
          </Button>
        </DialogFooter>
      </Dialog>
      {openNewPage && (
        <NewPageRenderer>
          <div>
            <h1 className="text-2xl font-bold mb-4">
              Cash Flow Analysis Reports
            </h1>
            <CashFlowTable data={reportData} />{" "}
            {/* Render report in new page */}
          </div>
        </NewPageRenderer>
      )}
    </>
  );
};

export default CashFlowContainer;
