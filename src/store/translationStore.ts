/* eslint-disable @typescript-eslint/no-explicit-any */
import { format } from "date-fns";
import { createStore } from "zustand";
import { messages } from "../libs/messages";

export type Languages = "pt" | "en";

interface TranslationStore {
  language: Languages;
  setTranslation: (language: Languages) => void;
  intl: (key: string) => any;
  formatShortDate: (date: Date | undefined) => string;
}

const getInitialLanguage = () => {
  const language = localStorage.getItem("language") as Languages;
  if (language) return language;

  const userLanguage = navigator.language as Languages;
  if (userLanguage === "pt" || userLanguage === "en") return userLanguage;

  return "pt";
};

export const useTranslationStore = createStore<TranslationStore>(
  (set, get) => ({
    language: getInitialLanguage(),
    setTranslation: (language) => {
      localStorage.setItem("language", language);
      return set({ language });
    },
    intl(key: string) {
      const message = messages[key];
      const language = get().language;

      if (!message) {
        throw new Error(
          `no text found for key [${key}] in language [${language}]`
        );
      }

      if (language === "pt") return message.pt;
      if (language === "en") return message.en;

      return `no text found for key [${key}] in language [${language}]`;
    },
    formatShortDate(date) {
      if (!date) return "";

      if (get().language === "pt") {
        return format(date, "dd/MM/yyyy");
      }

      return format(date, "MM/dd/yyyy");
    },
  })
);
