import axios from "axios";
import MyContext from "./MyContext";
import { useState } from "react";

const MyProvider = ({ children }) => {
  // const api = "http://127.0.0.1:8000/api3/simulation"
  const api = "https://api.cyberbriefs.org/api3/simulation";

  const selectedSimData = JSON.parse(localStorage.getItem("selectedSimData"));
  const user = JSON.parse(localStorage.getItem("user"));
  const passcode = selectedSimData?.passcode;

  const [firm_key_new, set_firm_key_new] = useState();
  const getFirmKey = async () => {  
    try {
      const response = await axios.get(
        `https://api.cyberbriefs.org/api3/simulation/get-firm-key/${user.email}/${passcode}/`
      );
      const data = await response.data;
      set_firm_key_new(data);
    } catch (error) {
      console.log("error", error)
    }
    
  };

  console.log("firm_key_new from context :", firm_key_new)

  useState(() => {
    getFirmKey();
  }, []);

  return (
    <MyContext.Provider
      value={{
        api,
        firm_key_new
      }}
    >
      {children}
    </MyContext.Provider>
  );
};
export default MyProvider;
