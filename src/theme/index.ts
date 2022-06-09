import { extendTheme, theme as baseTheme, ThemeConfig } from "@chakra-ui/react";
import { createBreakpoints } from "@chakra-ui/theme-tools";

import styles from "./styles";
import borders from "./foundations/borders";
import components from "./components";

const config: ThemeConfig = {};

const breakpoints = createBreakpoints({
  sm: "640px",
  md: "768px",
  lg: "1080px",
  xl: "1920px",
});

const colors = {
  ...baseTheme.colors,
  white: {
    "100": "#FFFFFF",
    "200": "rgba(255, 255, 255, 0.13)",
    "300": "rgba(255, 255, 255, 0.45)",
    "400": "rgba(255, 255, 255, 0.07)",
    "500": "rgba(255, 255, 255, 0.8)",
  },
  black: {
    "100": "#000000",
    "200": "rgba(0, 0, 0, 0.1)",
    "300": "rgba(0, 0, 0, 0.4)",
    "400": "rgba(0, 0, 0, 0.45)",
    "500": "rgba(0, 0, 0, 0.54)",
    "600": "rgba(0, 0, 0, 0.55)",
    "700": "rgba(0, 0, 0, 0.75)",
    "800": "rgba(0, 0, 0, 0.9)",
    "900": "#181D42",
    "1000": "#202449",
    "1100": "rgba(14, 17, 40, 0.95)",
  },
  blue: {
    "100": "#3D50FF",
  },
  green: {
    "100": "#5EC6B8",
    "200": "rgba(94, 198, 184, 0.6)",
    "300": "rgba(94, 198, 184, 0.15)",
    "400": "rgba(94, 198, 184, 0.05)",
  },
  yellow: { "200": "#EDAB06" },
};

const textStyles = {
  "12": {
    fontSize: 12,
    fontWeight: "bold",
    lineHeight: 1,
  },
  "14": {
    fontSize: 14,
    fontWeight: "bold",
    lineHeight: 1,
  },
  "16": {
    fontSize: 16,
    fontWeight: "bold",
    lineHeight: 1,
  },
  "18": {
    fontSize: 18,
    fontWeight: "bold",
    lineHeight: 1,
  },
  "24": {
    fontSize: 24,
    fontWeight: "bold",
    lineHeight: 1,
  },
  "30": {
    fontSize: 30,
    fontWeight: "bold",
    lineHeight: 1,
  },
  "48": {
    fontSize: 48,
    fontWeight: "bold",
    lineHeight: 1,
  },
  "64": {
    fontSize: 64,
    fontWeight: "bold",
    lineHeight: 1,
  },
};

const layerStyles = {};

// https://chakra-ui.com/docs/theming/theme
const theme = extendTheme({
  config,
  colors,
  fonts: {
    body: "'Orbitron','Nunito','sans-serif'",
  },
  sizes: {
    xl: "1080px",
  },
  fontSizes: {
    "12": "12px",
    "14": "14px",
    "16": "16px",
    "18": "18px",
    "24": "24px",
  },
  styles,
  borders,
  components,
  breakpoints,
  layerStyles,
  textStyles,
});

export default theme;
