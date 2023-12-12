import type { GetStaticPaths } from "astro"
import { getLangFromUrl, useRelativeLocaleURL, useTranslations } from "./utils"
import type { Prettify } from "../utils/types"
import { getRelativeLocaleUrl } from "astro:i18n"

export const SupportedLanguagesNames = {
  "pt-br": "Português",
  en: "English",
} as const

export const SupportedLanguages = Object.keys(
  SupportedLanguagesNames,
) as SupportedLanguages[]

export const defaultLang = "pt-br" as const satisfies SupportedLanguages

export const ui = {
  "pt-br": {
    "nav.home": "Inicio",
    "nav.cv": "Currículo",
    "nav.goBack": "voltar",
    "download.cv": "Baixar como PDF",
  },
  en: {
    "nav.home": "Home",
    "nav.cv": "Resume",
    "nav.goBack": "go back",
    "download.cv": "Download as PDF",
  },
} satisfies i18nFields

export const generateStaticPaths = (() => {
  return Object.keys(ui).map((lang) => ({
    params: {
      locale: lang,
    },
  }))
}) satisfies GetStaticPaths

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

export type SupportedLanguages = keyof typeof SupportedLanguagesNames

export type i18Type = {
  "nav.home": string
  "nav.cv": string
  "nav.goBack": string
  "download.cv": string
}

/* 
  Requires default language to be complete 
    and all other languages to be partial.
 */
export type i18nFields = Prettify<
  Record<typeof defaultLang, Required<i18Type>> &
    Omit<Record<SupportedLanguages, Partial<i18Type>>, "pt-br">
>
