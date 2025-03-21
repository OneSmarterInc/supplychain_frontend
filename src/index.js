import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { ChakraProvider } from "@chakra-ui/react";
import MyProvider from "./Components/ContextApi/MyProvider";
import { BrowserRouter as Router } from "react-router-dom";
import theme from "./theme"; 

const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
  <Router>
    <MyProvider>
    
      <ChakraProvider theme={theme}>
        <App />
      </ChakraProvider>
    </MyProvider>
  </Router>
);

reportWebVitals();