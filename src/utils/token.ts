import getConfig from 'next/config'

const { publicRuntimeConfig } = getConfig()

export function getTokenDecimal(key: string) {
  return publicRuntimeConfig?.decimals?.[key.toLocaleUpperCase()] ?? 18
}
