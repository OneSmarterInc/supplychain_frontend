import React, { useState } from "react";
import ReactDOM from "react-dom";
import {
  Button,
  Dialog,
  DialogHeader,
  DialogBody,
  DialogFooter,
} from "@material-tailwind/react";
import FGInventoryTable from "./FGInventoryTable";

function NewPageRenderer({ children }) {
  const [newWindow, setNewWindow] = useState(null);

  React.useEffect(() => {
    // Open a new window when the component mounts
    const newWin = window.open("", "_blank", "width=800,height=600");
    newWin.document.title = "Finished Goods Inventory Report";
    setNewWindow(newWin);

    // Close the new window when the component unmounts
    return () => {
      newWin.close();
    };
  }, []);

  // Render the children to the new window's document body
  return newWindow ? ReactDOM.createPortal(children, newWindow.document.body) : null;
}

export default function FGInventoryModal() {
  const [open, setOpen] = useState(false);
  const [openNewPage, setOpenNewPage] = useState(false);

  const handleOpen = () => setOpen(!open);
  const handleExplode = () => setOpenNewPage(true);

  return (
    <>
      <Button onClick={handleOpen} variant="gradient">
        Open Goods Inventory Report
      </Button>
      <Dialog size="lg" open={open} handler={handleOpen}>
        <DialogHeader>
          Report
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
            onClick={handleOpen}
            className="mr-1"
          >
            <span>Close</span>
          </Button>
        </DialogHeader>
        <DialogBody
          style={{ height: "600px", overflowY: "auto" }}
          className="text-lg overflow-scroll "
        >
          <FGInventoryTable />
        </DialogBody>
        <DialogFooter>
        </DialogFooter>
      </Dialog>
      {openNewPage && (
        <NewPageRenderer>
          <div>
            <h1 className="text-2xl font-bold mb-4">Finished Goods Inventory Report</h1>
            <FGInventoryTable />
          </div>
        </NewPageRenderer>
      )}
    </>
  );
}
