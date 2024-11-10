import React from "react";
import ReactDOM from "react-dom";
import {
  Button,
  Dialog,
  DialogHeader,
  DialogBody,
  DialogFooter,
} from "@material-tailwind/react";
import ReportTable1 from "./ReportTable1";

function NewPageRenderer({ children }) {
  const [newWindow, setNewWindow] = React.useState(null);

  React.useEffect(() => {
    // Open a new window when the component mounts
    const newWin = window.open("", "_blank", "width=800,height=600");
    newWin.document.title = "Report Page";
    setNewWindow(newWin);

    // Close the new window when the component unmounts
    return () => {
      newWin.close();
    };
  }, []);

  // Render the children to the new window's document body
  return newWindow ? ReactDOM.createPortal(children, newWindow.document.body) : null;
}

export default function ReportModal() {
  const [open, setOpen] = React.useState(true);
  const [openNewPage, setOpenNewPage] = React.useState(false);

  const handleOpen = () => setOpen(!open);
  const handleExplode = () => setOpenNewPage(true);

  return (
    <>
      <Dialog size="lg" open={open} handler={handleOpen}>
        <DialogHeader>
          Report : Corporate P&L
          <Button
            variant="gradient"
            color="blue"
            onClick={handleExplode}
            className="ml-4"
          >
            Explode
          </Button>
        </DialogHeader>
        <DialogBody
          style={{ height: "80vh", overflowY: "auto" }}
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
        </DialogFooter>
      </Dialog>
      {openNewPage && (
        <NewPageRenderer>
          <div>
            <h1 className="text-2xl font-bold mb-4">Report : Corporate P&L</h1>
            <ReportTable1 />
          </div>
        </NewPageRenderer>
      )}
    </>
  );
}
