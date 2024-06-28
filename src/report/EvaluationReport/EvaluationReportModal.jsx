import React, { useContext, useEffect } from "react";
import {
  Button,
  Dialog,
  DialogHeader,
  DialogBody,
  DialogFooter,
} from "@material-tailwind/react";
import EvaluationReportTable from "./EvaluationReportTable";
import axios from "axios";
import MyContext from "../../Components/ContextApi/MyContext";

export default function EvaluationReportModal({ simulation_id, firm_key, selected_quarter }) {
  const [open, setOpen] = React.useState(false);
  const [reportData, setReportData] = React.useState('');
  const { api } = useContext(MyContext);

  useEffect(() => {
    getForecast();
  }, [simulation_id, firm_key, selected_quarter]);
  
  const getForecast = async () => {
    try {
      const response = await axios.get(`${api}/reports/evaluation/`, {
        params: {
          simulation_id: simulation_id,
          firm_key: firm_key,
          selected_quarter: selected_quarter,
        },
      });
      const data = response.data;
      
      setReportData(data[0]);
    } catch (error) {
      console.error("Error making GET request:", error);
    }
  };

  const handleOpen = () => setOpen(!open);

  return (
    <>
      <Button onClick={handleOpen} variant="gradient">
        Open Evaluation Report
      </Button>
      <Dialog size="lg" open={open} handler={handleOpen}>
        <DialogHeader>Evaluation Report</DialogHeader>
        <DialogBody
          style={{ height: "600px", overflowY: "auto" }}
          className="text-lg overflow-scroll"
        >
          <EvaluationReportTable reportData={reportData}/>
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
    </>
  );
}
