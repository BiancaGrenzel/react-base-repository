import { useStore } from "zustand";
import { useTranslationStore } from "../../../store";

export const useOptionsPeriodSelect = () => {
  const { intl } = useStore(useTranslationStore);

  return [
    { value: "today", label: intl("today") },
    { value: "lastWeek", label: intl("lastWeek") },
    { value: "lastMonth", label: intl("lastMonth") },
    { value: "lastSemester", label: intl("lastSemester") },
    { value: "all", label: intl("all") },
  ];
};
