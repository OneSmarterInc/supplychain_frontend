// src/theme.js
import { extendTheme } from "@chakra-ui/react";

const theme = extendTheme({
  styles: {
    global: {
      // Apply a global background color
      body: {
        bg: "white", // Change this to your desired background color
      },
    },
  },
});

export default theme;