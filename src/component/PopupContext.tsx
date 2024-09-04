import React, { createContext, useContext, useState, ReactNode } from "react";

interface PopupContextProps {
  activePopup: string | null;
  setActivePopup: (popupId: string | null) => void;
}

const PopupContext = createContext<PopupContextProps | undefined>(undefined);

export const PopupProvider = ({ children }: { children: ReactNode }) => {
  const [activePopup, setActivePopup] = useState<string | null>(null);

  return (
    <PopupContext.Provider value={{ activePopup, setActivePopup }}>
      {children}
    </PopupContext.Provider>
  );
};

export const usePopup = () => {
  const context = useContext(PopupContext);
  if (!context) {
    throw new Error("usePopup must be used within a PopupProvider");
  }
  return context;
};
