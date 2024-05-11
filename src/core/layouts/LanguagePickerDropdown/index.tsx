import { languages } from "@/utils/i18n";
import LanguageUtils from "@/utils/i18n/language";
import { useState } from "react";
import { useTranslation } from "react-i18next";

export const LanguagePickerDropdown = () => {
  const { t } = useTranslation();
  const [dropdownVisible, setDropdownVisible] = useState(false);
  const {
    i18n: { changeLanguage },
  } = useTranslation();

  const onChangeLang = (lang: string) => {
    changeLanguage(lang);
    LanguageUtils.setLanguage(lang);
  };

  return (
    <div className="flex w-20 items-center justify-center ">
      <select
        className="border w-full mt-10  rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-offset-2 text-gray-900 focus:ring-indigo-500"
        onChange={(e) => onChangeLang(e.target.value)}
      >
        {languages.map((lang) => (
          <option key={lang} value={lang}>
            {lang}
          </option>
        ))}
      </select>
    </div>
  );
};
