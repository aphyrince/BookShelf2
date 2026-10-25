export function persistThemePreference(darkTheme: boolean) {
    document.cookie = `theme=${darkTheme ? 'dark' : 'light'}; Path=/; Max-Age=31536000; SameSite=Lax`;
}
