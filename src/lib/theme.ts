export const THEME_STORAGE_KEY = "nutrieat-theme";

export const themeInitScript = `(() => {
  try {
    const savedTheme = localStorage.getItem('${THEME_STORAGE_KEY}');
    const preferredDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    const theme = savedTheme === 'light' || savedTheme === 'dark'
      ? savedTheme
      : (preferredDark ? 'dark' : 'light');

    const root = document.documentElement;
    root.classList.toggle('dark', theme === 'dark');
    root.style.colorScheme = theme;
  } catch (error) {
    // If localStorage is unavailable, keep the default stylesheet behavior.
  }
})();`;
