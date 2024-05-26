import { MenuItem, Select, SelectChangeEvent } from "@mui/material";
import { Languages, useTranslationStore } from "../../store/translationStore";
import { useStore } from "zustand";
import useStyles from "./styles";

interface SelectLanguageProps {
  isMobile?: boolean;
}

export const SelectLanguage: React.FC<SelectLanguageProps> = ({
  isMobile,
}: SelectLanguageProps) => {
  const styles = useStyles();
  const { intl, setTranslation, language } = useStore(useTranslationStore);

  const handleLanguageChange = (
    event: React.ChangeEvent<{ value: Languages }>
  ) => {
    const selectedLanguage = event.target.value;
    setTranslation(selectedLanguage);
  };

  return (
    <Select
      sx={isMobile ? styles.selectMobile : styles.select}
      value={language}
      onChange={
        handleLanguageChange as (event: SelectChangeEvent<Languages>) => void
      }
      size="small"
    >
      <MenuItem value={"en"}>{intl("english")}</MenuItem>
      <MenuItem value={"pt"}>{intl("portuguese")}</MenuItem>
    </Select>
  );
};
