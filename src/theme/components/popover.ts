import { ComponentStyleConfig, theme } from '@chakra-ui/react'

export default <ComponentStyleConfig>{
  parts: theme.components.Popover.parts,
  baseStyle: {
    content: {
      _focus: { boxShadow: 'none' },
    },
  },
}
