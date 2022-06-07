import { ComponentStyleConfig } from "@chakra-ui/react";

export default <ComponentStyleConfig>{
  baseStyle: {
    padding: "0 10px",
    color: "blue.100",
    borderRadius: "0",
    border: "2px solid",
    borderColor: "blue.100",
    _focus: { boxShadow: "none" },
  },
  sizes: {
    md: {
      fontSize: "16px",
    },
  },
};
