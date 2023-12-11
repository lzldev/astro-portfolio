import type { GetStaticPaths } from "astro";
import { getLangFromUrl, useRelativeLocaleURL, useTranslations } from "./utils";

export const languages = {
  en: "English",
  pt: "Português",
};

export const defaultLang = "pt-br";

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
} as const;

export const generateStaticPaths = (() => {
  return Object.keys(ui).map((lang) => ({
    params: {
      locale: lang,
    },
  }));
}) satisfies GetStaticPaths;

const useI18n = (url: URL) => {
  const getRelativeUrl = useRelativeLocaleURL(url);
  const lang = getLangFromUrl(url);
  const useI18Text = useTranslations(lang);

  return {
    useI18Text,
    lang,
    getRelativeUrl,
  };
};

export { useI18n };
