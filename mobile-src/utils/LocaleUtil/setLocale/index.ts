async function setLocale(language: string, data: unknown): Promise<void> {
  window.lyrixiLocaleLanguage = language
  window.lyrixiLocaleData = data
}

export default setLocale
