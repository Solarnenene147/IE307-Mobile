import { createContext, useState } from "react";

export const SettingContext = createContext();

export const SettingProvider = ({ children }) => {
  const [darkMode, setDarkMode] = useState(false);
  const [fontSize, setFontSize] = useState(16);

  const toggleDarkMode = () => setDarkMode(prev => !prev);
  const changFontSize = (size) => setFontSize(size);

  return (
    <SettingContext.Provider value={{ darkMode, toggleDarkMode, fontSize, changFontSize }}>
      {children}
    </SettingContext.Provider>
  );
};
