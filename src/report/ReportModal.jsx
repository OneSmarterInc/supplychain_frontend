import React from "react";
import {
  Button,
  Dialog,
  DialogHeader,
  DialogBody,
  DialogFooter,
} from "@material-tailwind/react";
import ReportTable1 from "./ReportTable1";
export default function ReportModal() {
  const [open, setOpen] = React.useState(false);

  const handleOpen = () => setOpen(!open);

  return (
    <>
      <Button onClick={handleOpen} variant="gradient">
        Open Report
      </Button>
      <Dialog size="lg" open={open} handler={handleOpen}>
        <DialogHeader>Report</DialogHeader>
        <DialogBody
          style={{ height: "700px", overflowY: "auto" }}
          className="text-lg overflow-scroll "
        >
          <ReportTable1 />
        </DialogBody>
        <DialogFooter>
          <Button
            variant="text"
            color="red"
            onClick={handleOpen}
            className="mr-1"
          >
            <span>Cancel</span>
          </Button>
          {/* <Button variant="gradient" color="green" onClick={handleOpen}>
            <span>Confirm</span>
          </Button> */}
        </DialogFooter>
      </Dialog>
    </>
  );
}
