import React, { useEffect, useState } from "react";
import ReactDOM from "react-dom";
import {
  Button,
  Dialog,
  DialogHeader,
  DialogBody,
  DialogFooter,
} from "@material-tailwind/react";
import FGInventoryTable from "./FGInventoryTable";
import { Box, Flex, Text } from "@chakra-ui/react";

function NewPageRenderer({ children }) {
  const [newWindow, setNewWindow] = useState(null);

  useEffect(() => {
    const newWin = window.open("", "_blank", "width=800,height=600");
    newWin.document.title = "Report Page";
    setNewWindow(newWin);

    Array.from(document.querySelectorAll("style")).forEach((styleEl) => {
      const newStyleEl = newWin.document.createElement("style");
      newStyleEl.innerHTML = styleEl.innerHTML;
      newWin.document.head.appendChild(newStyleEl);
    });

    return () => {
      newWin.close();
    };
  }, []);

  return newWindow
    ? ReactDOM.createPortal(children, newWindow.document.body)
    : null;
}

export default function FGInventoryModal({ setActiveReport }) {
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
        Open Goods Inventory Report
      </Button> */}
      <Dialog size="lg" open={open} handler={handleOpen}>
        <DialogHeader>
          <Flex width={"100%"} justifyContent={"space-between"}>
            <Text>Report : Finished Goods Inventory Report</Text>
            <Box>
              <Button
                variant="gradient"
                color="none"
                onClick={handleExplode}
                className="ml-4 bg-none text-yellow-800"
              >
                Explode{" "}
                <span>
                  <i class="fa-solid fa-up-right-and-down-left-from-center"></i>
                </span>
              </Button>
              <Button
                variant="text"
                color="red"
                onClick={handleClose}
                className="m-1"
              >
                <span className=" text-red-500 px-1 text-xl">
                  <i class="fa-solid fa-xmark"></i>
                </span>
              </Button>
            </Box>
          </Flex>
        </DialogHeader>
        <DialogBody
          style={{ height: "600px", overflowY: "auto" }}
          className="text-lg overflow-scroll "
        >
          <FGInventoryTable />
        </DialogBody>
        <DialogFooter></DialogFooter>
      </Dialog>
      {openNewPage && (
        <NewPageRenderer>
          <div>
            <h1 className="text-2xl font-bold mb-4">
              Finished Goods Inventory Report
            </h1>
            <FGInventoryTable />
          </div>
        </NewPageRenderer>
      )}
    </>
  );
}
