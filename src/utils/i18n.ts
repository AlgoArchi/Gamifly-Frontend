import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import type { GetStaticProps, GetServerSideProps } from 'next'

export interface GetI18nStaticProps extends GetStaticProps {
  locale: string
  query: { [key: string]: never }
}

export interface GetI18nServerSideProps extends GetServerSideProps {
  locale: string
  query: { [key: string]: never }
}

export const getI18nSSRProps = async (
  { locale }: GetI18nStaticProps | GetI18nServerSideProps,
  localeArr: string[]
) => {
  // 按需加载国际化数组
  const i18nProps = await serverSideTranslations(locale, ['common', ...localeArr])
  const { title } = i18nProps._nextI18Next.initialI18nStore[locale][localeArr[0]]
  return {
    ...i18nProps,
    title,
  }
}
