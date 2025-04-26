export const applyTheme = (theme: string) =>
  document.documentElement.classList.toggle("dark", theme == "dark");
