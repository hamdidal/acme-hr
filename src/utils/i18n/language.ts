export default class LanguageUtils {
  static getLanguage() {
    return localStorage.getItem("i18nextLng") ?? "EN";
  }
  static setLanguage(language: string) {
    return localStorage.setItem("i18nextLng", language);
  }
}
