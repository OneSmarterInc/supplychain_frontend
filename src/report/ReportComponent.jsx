import React, { useContext, useState } from "react";
import { HStack, Tabs, TabList, TabPanels, Tab, TabPanel, Button, VStack } from "@chakra-ui/react";
import axios from "axios";
import ReportModal from "./CplReport/ReportModal";
import ProductReportModal from "./ProductReport/ProductReportModel";
import FGInventoryModal from "./FinishedGoodsInventoryReport/FGInventoryModal";
import EvaluationReportModal from "./EvaluationReport/EvaluationReportModal";
import MyContext from "../Components/ContextApi/MyContext";
import BalanceSheetModel from "./BlanceSheetReport/BalanceSheetModel";

const ReportComponent = () => {
  const { api } = useContext(MyContext);
  const [selectedQuarter, setSelectedQuarter] = useState(1);
  const [reportData, setReportData] = useState(null);
  const [activeReport, setActiveReport] = useState("");

  let simData = localStorage.getItem("selectedSim");
  simData = JSON.parse(simData);
  let user = localStorage.getItem("user");
  user = JSON.parse(user);
  user = user.email;
  let firm_key_new = "";

  if (simData[0]?.firm_data.length) {
    let firm_obj = simData[0]?.firm_data.filter((item) => {
      return item.emails.includes(user);
    });
    if (firm_obj.length) {
      firm_key_new = firm_obj[0].firmName;
    }
  }

  const handleQuarterChange = (index) => {
    setSelectedQuarter(index + 1);
    setActiveReport("");
    setReportData(null);
  };

  const handleReportChange = async (reportType) => {
    setActiveReport(reportType);

    const queryParams = new URLSearchParams({
      simulation_id: simData[0].simulation_id,
      quarter: selectedQuarter,
      firm: firm_key_new,
    }).toString();

    const url = `${api}/reports/${reportType}/?${queryParams}`;

    try {
      const response = await axios.get(url);
      console.log("GET request successful", response.data);
      localStorage.setItem("reportData", JSON.stringify(response.data));
      setReportData(response.data);
    } catch (error) {
      console.error("Error making GET request:", error);
    }
  };

  return (
    <div>
      <Tabs isFitted onChange={(index) => handleQuarterChange(index)}>
        <TabList>
          {Array.from({ length: simData[0].current_quarter - 1 }, (_, index) => (
            <Tab key={index}>Quarter {index + 1}</Tab>
          ))}
        </TabList>
        <TabPanels>
          {Array.from({ length: simData[0].current_quarter - 1 }, (_, index) => (
            <TabPanel key={index}>
              <VStack spacing={4}>
                <HStack spacing={3} wrap="wrap">
                  <Button onClick={() => handleReportChange("cpl")}>Corporate P&L Statement</Button>
                  <Button onClick={() => handleReportChange("pcpl")}>Hyperware P&L Statement</Button>
                  <Button onClick={() => handleReportChange("mpls")}>Metaware P&L Statement</Button>
                  <Button onClick={() => handleReportChange("bl")}>Balance Sheet</Button>
                  <Button onClick={() => handleReportChange("inventory")}>Finished Goods Inventory Report</Button>
                </HStack>
                {activeReport === "cpl" ? <ReportModal reportData={reportData} /> : null}
                {activeReport === "pcpl" || activeReport === "mpls" ? <ProductReportModal reportData={reportData} /> : null}
                {activeReport === "inventory" ? <FGInventoryModal reportData={reportData} /> : null}
                {activeReport === "bl" ? <BalanceSheetModel reportData={reportData} /> : null}
                <EvaluationReportModal
                  simulation_id={simData[0].simulation_id}
                  firm_key={firm_key_new}
                  selected_quarter={selectedQuarter}
                />
              </VStack>
            </TabPanel>
          ))}
        </TabPanels>
      </Tabs>
    </div>
  );
};

export default ReportComponent;