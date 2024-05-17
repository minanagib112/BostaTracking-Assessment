import LanguageDetector from "i18next-browser-languagedetector";
import { initReactI18next } from "react-i18next";
import HttpApi from "i18next-http-backend";
import i18n from "i18next";

export const supportedLngs = {
  en: "English",
  ar: "Arabic (العربية)",
};

i18n
  .use(HttpApi)
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    lng: "en",
    fallbackLng: "en",
    supportedLngs: Object.keys(supportedLngs),
    debug: true,
    interpolation: {
      escapeValue: false,
    },
  });

export default i18n;