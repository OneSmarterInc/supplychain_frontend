import React, { useState } from "react";
import CashFlowTable from "./CashReportTable"; // Assuming it's in the same directory
import {
  Button,
  Dialog,
  DialogHeader,
  DialogBody,
  DialogFooter,
} from "@material-tailwind/react";

// Destructure `reportData` from props
const CashFlowContainer = ({ reportData }) => {
  const [open, setOpen] = useState(false); // State for dialog

  const handleOpen = () => setOpen(!open); // Toggle dialog open/close

  return (
    <>
      <Button onClick={handleOpen}>View Report</Button> {/* Button to trigger the dialog */}
      <Dialog size="lg" open={open} handler={handleOpen}>
        <DialogHeader></DialogHeader>
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
    </>
  );
};

export default CashFlowContainer;