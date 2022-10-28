import { extendTheme, theme as baseTheme, ThemeConfig } from "@chakra-ui/react";
import { createBreakpoints } from "@chakra-ui/theme-tools";

import styles from "./styles";
import borders from "./foundations/borders";
import components from "./components";
import px2vw from "../utils/px2vw";

const config: ThemeConfig = {};

const breakpoints = createBreakpoints({
  sm: "640px",
  md: "768px",
  lg: "1280px",
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
    "600": "rgba(255, 255, 255, 0.85)",
    "700": "rgba(255, 255, 255, 0.1)",
    "800": "rgba(186, 186, 186,0.6)",
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
    "1200": "rgba(0, 0, 0, 0.85)",
    "1300": "rgba(0, 0, 0, 0.25)",
    "1400": "rgba(0, 0, 0, 0.35)",
    "1500": "rgba(0, 0, 0, 0.5)",
    "1600": "#0F0F0F",
    "1700": "#0B0B0B",
    "1800": "#979797",
    "1900": "RGBA(15, 15, 15, 0.7)",
    "2000": "RGBA(15, 15, 15, 1)",
  },
  blue: {
    "100": "#3D50FF",
    "200": "#3DC2FF",
    "300": "#4D56F6",
    "400": "#3B51F6",
  },
  green: {
    "100": "#5EC6B8",
    "200": "rgba(94, 198, 184, 0.6)",
    "300": "rgba(94, 198, 184, 0.15)",
    "400": "rgba(94, 198, 184, 0.05)",
    "500": "rgba(94, 198, 184, 0.11)",
    "600": "rgba(94, 198, 184, 0.21)",
    "700": "rgba(94, 198, 184, 0.35)",
    "800": "#6CCCB0",
    "900": "#C4F863",
    "1000": "#BCFC47",
  },
  gray: {
    "100": "rgba(104, 104, 104, 0.3)",
    "200": "#5E5E5E",
    "300": "#D8D8D8",
    "400": "#99999A",
    "500": "#515151",
    "600": "#DCDCDC",
    "700": "#515151",
    "800": "#2C2C2C",
  },
  yellow: {
    "100": "#EFC049",
    "200": "#EDAB06",
    "300": "#F8D250",
  },
  purple: {
    "100": "#9537F6",
  },
};

const textStyles = {
  "12": {
    fontSize: {
      base: px2vw(12),
      lg: "12px",
    },
    lineHeight: {
      base: px2vw(12),
      lg: "12px",
    },
  },
  "14": {
    fontSize: {
      base: px2vw(14),
      lg: "14px",
    },
    lineHeight: {
      base: px2vw(14),
      lg: "14px",
    },
  },
  "16": {
    fontSize: {
      base: px2vw(16),
      lg: "16px",
    },
    lineHeight: {
      base: px2vw(16),
      lg: "16px",
    },
  },
  "18": {
    fontSize: {
      base: px2vw(18),
      lg: "18px",
    },
    lineHeight: {
      base: px2vw(18),
      lg: "18px",
    },
  },
  "20": {
    fontSize: {
      base: px2vw(20),
      lg: "20px",
    },
    lineHeight: {
      base: px2vw(20),
      lg: "20px",
    },
  },
  "22": {
    fontSize: {
      base: px2vw(22),
      lg: "22px",
    },
    lineHeight: {
      base: px2vw(22),
      lg: "22px",
    },
  },
  "24": {
    fontSize: {
      base: px2vw(24),
      lg: "24px",
    },
    lineHeight: {
      base: px2vw(24),
      lg: "24px",
    },
  },
  "26": {
    fontSize: {
      base: px2vw(26),
      lg: "26px",
    },
    lineHeight: {
      base: px2vw(26),
      lg: "26px",
    },
  },
  "30": {
    fontSize: {
      base: px2vw(30),
      lg: "30px",
    },
    lineHeight: {
      base: px2vw(30),
      lg: "30px",
    },
  },
  "32": {
    fontSize: {
      base: px2vw(32),
      lg: "32px",
    },
    lineHeight: {
      base: px2vw(32),
      lg: "32px",
    },
  },
  "36": {
    fontSize: {
      base: px2vw(36),
      lg: "36px",
    },
    lineHeight: {
      base: px2vw(36),
      lg: "36px",
    },
  },
};

const layerStyles = {};

// https://chakra-ui.com/docs/theming/theme
const theme = extendTheme({
  config,
  colors,
  fonts: {
    body: "'Orbitron','Nunito','Eurostile','SofiaPro','sans-serif'",
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
