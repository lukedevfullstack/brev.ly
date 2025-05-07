import en_us from "@/assets/locales/en_us.json";
import es_es from "@/assets/locales/es_es.json";
import pt_br from "@/assets/locales/pt_br.json";
import i18next from "i18next";
import { initReactI18next } from "react-i18next";

export const availableLanguages = ["en_us", "pt_br", "es_es"] as const;
export type Language = (typeof availableLanguages)[number];

const storedLanguage = localStorage.getItem("language") as Language | null;
const initialLanguage: Language =
  storedLanguage && availableLanguages.includes(storedLanguage)
    ? storedLanguage
    : "pt_br";

i18next.use(initReactI18next).init({
  fallbackLng: "pt_br",
  lng: initialLanguage,
  debug: false,
  resources: {
    pt_br: { translation: pt_br },
    en_us: { translation: en_us },
    es_es: { translation: es_es },
  },
  interpolation: {
    escapeValue: false,
  },
});

export const loadLanguage = (lng: Language) => {
  i18next.changeLanguage(lng);
  localStorage.setItem("language", lng);
};

export default i18next;
