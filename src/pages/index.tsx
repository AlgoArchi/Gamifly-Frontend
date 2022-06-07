import React from 'react'
import { Box } from '@chakra-ui/react'
import { getI18nSSRProps, GetI18nServerSideProps } from '@/utils/i18n'

function App() {
  return (
    <Box
      maxW={{
        lg: '1366px',
      }}
      minW={{
        lg: '1024px',
      }}
      margin=" 0 auto"
    >
      fornt-module
    </Box>
  )
}

export const getServerSideProps = async (ctx: GetI18nServerSideProps) => {
  return {
    props: { ...(await getI18nSSRProps(ctx, ['home'])) },
  }
}
export default App
