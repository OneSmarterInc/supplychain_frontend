import React, { useState } from "react";
import ReactDOM from "react-dom";
import CashFlowTable from "./CashReportTable"; // Assuming it's in the same directory
import {
  Button,
  Dialog,
  DialogHeader,
  DialogBody,
  DialogFooter,
} from "@material-tailwind/react";

// Component to render content in a new window
function NewPageRenderer({ children }) {
  const [newWindow, setNewWindow] = useState(null);

  React.useEffect(() => {
    // Open a new window when the component mounts
    const newWin = window.open("", "_blank", "width=800,height=600");
    newWin.document.title = "Cash Flow Report";
    setNewWindow(newWin);

    // Close the new window when the component unmounts
    return () => {
      newWin.close();
    };
  }, []);

  // Render the children to the new window's document body
  return newWindow ? ReactDOM.createPortal(children, newWindow.document.body) : null;
}

// Destructure `reportData` from props
const CashFlowContainer = ({ reportData }) => {
  const [open, setOpen] = useState(false); // State for dialog
  const [openNewPage, setOpenNewPage] = useState(false); // State for new page

  const handleOpen = () => setOpen(!open); // Toggle dialog open/close
  const handleExplode = () => setOpenNewPage(true); // Open new page

  return (
    <>
      <Button onClick={handleOpen}>View Report</Button> {/* Button to trigger the dialog */}
      <Dialog size="lg" open={open} handler={handleOpen}>
        <DialogHeader>
          <Button
            variant="gradient"
            color="blue"
            onClick={handleExplode}
            className="ml-4"
          >
            Explode
          </Button>
        </DialogHeader>
        <DialogBody style={{ height: "600px", overflowY: "auto" }} className="text-lg overflow-scroll">
          <h1 className="text-xl font-bold mb-4">Cash Flow Analysis Reports</h1>
          <CashFlowTable data={reportData} /> {/* Pass `reportData` as prop to the table */}
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
            <h1 className="text-2xl font-bold mb-4">Cash Flow Analysis Reports</h1>
            <CashFlowTable data={reportData} /> {/* Render report in new page */}
          </div>
        </NewPageRenderer>
      )}
    </>
  );
};

export default CashFlowContainer;
