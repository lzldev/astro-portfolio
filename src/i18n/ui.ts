import { getRelativeLocaleUrl } from "astro:i18n"
import { getLangFromUrl, useTranslations } from "./utils"

export const SupportedLanguagesNames = {
  "pt-br": "Português",
  en: "English",
} as const

export const SupportedLanguages = Object.keys(
  SupportedLanguagesNames,
) as SupportedLanguages[]

export const defaultLang = "pt-br" as const satisfies SupportedLanguages

const createLanguagePack = <
  T1 extends Record<DefaultLanguage, object>,
  T2 extends Record<AdditionalLanguages, Partial<T1[DefaultLanguage]>>,
>(
  base: T1,
  def2: T2,
) => {
  return { ...base, ...def2 }
}

export const ui = createLanguagePack(
  {
    "pt-br": {
      "nav.home": "Inicio",
      "nav.cv": "Currículo",
      "nav.goBack": "voltar",
      "nav.seeAlso": "Disponivel em:",
      "about.subtitle": "Desenvolvedor Web Fullstack",
      "lucky.yournumber": "O seu número da sorte é",
      "download.cv": "Baixar como PDF",
    },
  },
  {
    en: {
      "nav.home": "Home",
      "nav.cv": "Resume",
      "nav.goBack": "go back",
      "nav.seeAlso": "See also in:",
      "about.subtitle": "Fullstack web dev",
      "lucky.yournumber": "Your lucky number is",
      "download.cv": "Download as PDF",
    },
  },
)

export const generateStaticPaths = () => {
  return Object.keys(ui).map((lang) => ({
    params: {
      locale: lang,
    },
  }))
}

export const useI18n = (url: URL) => {
  const lang = getLangFromUrl(url)

  const getRelativeUrl = (path: string) => getRelativeLocaleUrl(lang, path)
  const useI18Text = useTranslations(lang)

  return {
    useI18Text,
    lang,
    getRelativeUrl,
  }
}

import type { Prettify } from "../utils/types"

type DefaultLanguage = typeof defaultLang
type AdditionalLanguages = Exclude<SupportedLanguages, DefaultLanguage>

type i18n = typeof ui

export type SupportedLanguages = keyof typeof SupportedLanguagesNames
export type i18Type = i18n[DefaultLanguage]

export type i18nFields = Prettify<
  Record<DefaultLanguage, i18Type> &
    Omit<Record<SupportedLanguages, Partial<i18Type>>, DefaultLanguage>
>
