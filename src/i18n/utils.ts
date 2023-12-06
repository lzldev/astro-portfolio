import { getRelativeLocaleUrl } from "astro:i18n";
import { ui, defaultLang } from "./ui";

export function getLangFromUrl(url: URL) {
  const [, lang] = url.pathname.split("/");
  if (lang in ui) return lang as keyof typeof ui;
  return defaultLang;
}

export function useTranslations(lang: keyof typeof ui) {
  return function t(key: keyof (typeof ui)[typeof defaultLang]) {
    return ui[lang][key] || ui[defaultLang][key];
  };
}

export function getRelativeLinkFromUrl(url: URL, href: string) {
  const lang = getLangFromUrl(url);
  return getRelativeLocaleUrl(lang, href);
}

export function useRelativeLocaleURL(url: URL) {
  const lang = getLangFromUrl(url);
  return (href: string) => {
    return getRelativeLocaleUrl(lang, href);
  };
}
