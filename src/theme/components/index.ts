import { ThemeComponents } from "@chakra-ui/react";

import Button from "./button";
import Tabs from "./tabs";
import Popover from "./popover";
import Link from "./link";
import Slider from "./slider";
import Input from "./input";
import NumberInput from "./number-input";

/**
 * https://chakra-ui.com/docs/theming/customize-theme#customizing-single-components
 * 
const ComponentStyle = {
  // style object for base or default style
  baseStyle: {},
  // styles for different sizes ("sm", "md", "lg")
  sizes: {},
  // styles for different visual variants ("outline", "solid")
  variants: {},
  // default values for `size` and `variant`
  defaultProps: {
    size: "",
    variant: "",
  },
}
 */

export default <ThemeComponents>{
  Button,
  Tabs,
  Popover,
  Link,
  Slider,
  Input,
  NumberInput,
};
