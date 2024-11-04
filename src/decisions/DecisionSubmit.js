import axios from "axios";
import { useToast } from "@chakra-ui/react";
export const submitDecisionStatus = async (api, decisionType, simData, firmKey,  quarter) => {
  try {
    const response = await axios.post(`${api}/decision-status/`, {
      simulation_id: simData[0]?.simulation_id || "",
      firm_key: firmKey,
      quarter: quarter || 1,
      decision: decisionType
    });

  } catch (error) {
    console.error(`Error making POST request: ${decisionType}`, error);
  }
};