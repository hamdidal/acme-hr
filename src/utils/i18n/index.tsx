import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import EN from "./locale/en.json";
import TR from "./locale/tr.json";
import LanguageUtils from "./language";

const resources = {
  EN,
  TR,
};

export const languages = Object.keys(resources);

i18n.use(initReactI18next).init({
  resources: resources,
  lng: LanguageUtils.getLanguage(),
});
