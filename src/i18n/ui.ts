import { getLangFromUrl, useTranslations } from "./utils"
import { getRelativeLocaleUrl } from "astro:i18n"
import type { Prettify } from "../utils/types"

export type DefaultLanguage = typeof defaultLang
export type Languages = keyof typeof LanguageNames
export type AdditionalLanguages = Exclude<Languages, DefaultLanguage>
export type i18n = typeof ui
export type i18Type = i18n[DefaultLanguage]
export type i18nFields = Prettify<
  Record<DefaultLanguage, i18Type> &
    Omit<Record<Languages, Partial<i18Type>>, DefaultLanguage>
>

export const defaultLang = "pt-br" as const satisfies Languages

export const LanguageNames = {
  "pt-br": "Português",
  en: "English",
} as const

export const Languages = Object.keys(LanguageNames) as Languages[]

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
      "ui.changelanguage": "Leia tambem em ",
      "about.subtitle": "Desenvolvedor Web Fullstack",
      "download.cv": "Baixar como PDF",
    },
  },
  {
    en: {
      "nav.home": "Home",
      "nav.cv": "Resume",
      "nav.goBack": "go back",
      "nav.seeAlso": "See also in:",
      "ui.changelanguage": "Read this in ",
      "about.subtitle": "Fullstack web dev",
      "download.cv": "Download as PDF",
    },
  },
)

export const generateI18nStaticPaths = () => {
  return Object.keys(ui).map((lang) => ({
    params: {
      locale: lang,
    },
  }))
}

export const useI18n = (url: URL) => {
  const lang = getLangFromUrl(url)
  const name = LanguageNames[lang]

  const getRelativeUrl = (path: string) => getRelativeLocaleUrl(lang, path)
  const useI18Text = useTranslations(lang)

  return {
    useI18Text,
    lang,
    name,
    getRelativeUrl,
  }
}

export const getNextLanguage = (lang: Languages) => {
  const id = Languages.indexOf(lang)
  const len = Languages.length
  const next = Languages.at((id + 1) % len)!
  const name = LanguageNames[lang]

  return {
    lang: next,
    name,
  }
}
