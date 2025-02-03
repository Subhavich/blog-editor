import { createContext, useContext, useState } from "react";

const ModeContext = createContext();

export function ModeProvider({ children }) {
  const [mode, setMode] = useState("editing"); // Default mode
  const [boxWidth, setBoxWidth] = useState(0);

  const toggleMode = () => {
    setMode((prevMode) =>
      prevMode === "production" ? "editing" : "production"
    );
  };

  return (
    <ModeContext.Provider
      value={{
        mode,
        toggleMode,
        boxWidth,
        setBoxWidth,
        isMobile: boxWidth <= 384,
        isTablet: boxWidth > 384 && boxWidth <= 760,
        isPC: boxWidth > 760,
      }}
    >
      {children}
    </ModeContext.Provider>
  );
}

export function useMode() {
  const context = useContext(ModeContext);
  if (!context) {
    throw new Error("useMode must be used within a ModeProvider");
  }
  return context;
}
