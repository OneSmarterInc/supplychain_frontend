import React, { useState } from "react";
import ReactDOM from "react-dom";
import {
  Button,
  Dialog,
  DialogHeader,
  DialogBody,
  DialogFooter,
} from "@material-tailwind/react";
import BalanceSheetTable from "./BalnceSheetTable";
import { Box, Flex, Text } from "@chakra-ui/react";

function NewPageRenderer({ children }) {
  const [newWindow, setNewWindow] = useState(null);

  React.useEffect(() => {
    // Open a new window when the component mounts
    const newWin = window.open("", "_blank", "width=800,height=600");
    newWin.document.title = "Balance Sheet Report";
    setNewWindow(newWin);

    // Close the new window when the component unmounts
    return () => {
      newWin.close();
    };
  }, []);

  // Render the children to the new window's document body
  return newWindow
    ? ReactDOM.createPortal(children, newWindow.document.body)
    : null;
}

export default function BalanceSheetModel({ setActiveReport }) {
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
      {/* <Button onClick={handleOpen} variant="gradient">
        Open Balance Sheet
      </Button> */}
      <Dialog size="lg" open={open} handler={handleOpen}>
        <DialogHeader>
          <Flex width={"100%"} justifyContent={"space-between"}>
            <Text>Report : Balance Sheet Report</Text>
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
          className="text-lg overflow-scroll "
        >
          <BalanceSheetTable />
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
            <h1 className="text-2xl font-bold mb-4">Balance Sheet Report</h1>
            <BalanceSheetTable />
          </div>
        </NewPageRenderer>
      )}
    </>
  );
}
