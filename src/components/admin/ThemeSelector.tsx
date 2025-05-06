import { themes } from "@/lib/themes";

interface ThemeSelectorProps {
  currentTheme: string;
  onThemeChange: (theme: string) => void;
}

export function ThemeSelector({ currentTheme, onThemeChange }: ThemeSelectorProps) {
  return (
    <div className="grid grid-cols-2 gap-4">
      {themes.map((theme) => (
        <button
          key={theme.id}
          onClick={() => onThemeChange(theme.id)}
          className={`p-4 rounded-2xl border transition-all ${
            currentTheme === theme.id
              ? "border-indigo-500 bg-indigo-500/10"
              : "border-gray-700 hover:border-indigo-500/50"
          }`}
        >
          <div className={`h-24 rounded-xl bg-gradient-to-br ${theme.gradient} mb-3`} />
          <div className="flex items-center justify-between">
            <span className="text-sm font-medium text-gray-200">{theme.name}</span>
            {currentTheme === theme.id && (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={2}
                stroke="currentColor"
                className="w-5 h-5 text-indigo-500"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
            )}
          </div>
        </button>
      ))}
    </div>
  );
}
