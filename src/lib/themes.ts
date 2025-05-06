export interface Theme {
  id: string;
  name: string;
  gradient: string;
  buttonBg: string;
  buttonHover: string;
  textColor: string;
}

export const themes: Theme[] = [
  {
    id: "default",
    name: "Default",
    gradient: "bg-gradient-to-br from-gray-800 to-gray-900",
    buttonBg: "bg-gray-700",
    buttonHover: "hover:bg-gray-600",
    textColor: "text-white",
  },
  {
    id: "light",
    name: "Light",
    gradient: "bg-gradient-to-br from-white to-slate-100",
    buttonBg: "bg-slate-200",
    buttonHover: "hover:bg-slate-300",
    textColor: "text-gray-800",
  },
  {
    id: "feminine",
    name: "Feminine",
    gradient: "bg-gradient-to-br from-pink-200 to-rose-300",
    buttonBg: "bg-rose-100",
    buttonHover: "hover:bg-rose-200",
    textColor: "text-rose-900",
  },
  {
    id: "indigo",
    name: "Indigo",
    gradient: "bg-gradient-to-br from-indigo-800 to-indigo-900",
    buttonBg: "bg-indigo-700",
    buttonHover: "hover:bg-indigo-600",
    textColor: "text-white",
  },
  {
    id: "purple",
    name: "Purple",
    gradient: "bg-gradient-to-br from-purple-800 to-purple-900",
    buttonBg: "bg-purple-700",
    buttonHover: "hover:bg-purple-600",
    textColor: "text-white",
  },
  {
    id: "blue",
    name: "Blue",
    gradient: "bg-gradient-to-br from-blue-800 to-blue-900",
    buttonBg: "bg-blue-700",
    buttonHover: "hover:bg-blue-600",
    textColor: "text-white",
  },
];

export const getThemeById = (themeId: string): Theme => {
  return themes.find((theme) => theme.id === themeId) || themes[0];
};

export const getThemeGradient = (themeId: string): string => {
  return getThemeById(themeId).gradient;
};

export const getThemeColors = (themeId: string): { buttonBg: string; buttonHover: string; textColor: string } => {
  const theme = getThemeById(themeId);
  return {
    buttonBg: theme.buttonBg,
    buttonHover: theme.buttonHover,
    textColor: theme.textColor,
  };
};
