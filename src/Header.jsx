import { useState, useEffect } from "react";

export default function ThemeToggle() {
  const [theme, setTheme] = useState(() => {
    return localStorage.getItem("theme") || "light"; // Get stored theme or default to light
  });

  useEffect(() => {
    // Apply theme to both <html> and <body> for full coverage
    document.documentElement.classList.remove("light", "dark");
    document.documentElement.classList.add(theme);
    
    document.body.classList.remove("light", "dark");
    document.body.classList.add(theme);

    // Store theme in localStorage
    localStorage.setItem("theme", theme);
  }, [theme]);

  return (
    <button
      onClick={() => setTheme(theme === "light" ? "dark" : "light")}
      className="px-4 py-2 rounded bg-gray-200 dark:bg-gray-800 text-black dark:text-white ms-5 mt-1"
    >
      {theme === "light" ? "🌙 Dark" : "☀️ Light"}
    </button>
  );
}
