import React, { createContext, useState, ReactNode } from "react";

interface MenuContextProps {
  menuNumber: number;
  setMenuNumber: React.Dispatch<React.SetStateAction<number>>;
}

export const MenuContext = createContext<MenuContextProps | undefined>(
  undefined
);

export const MenuProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [menuNumber, setMenuNumber] = useState<number>(1);

  return (
    <MenuContext.Provider value={{ menuNumber, setMenuNumber }}>
      {children}
    </MenuContext.Provider>
  );
};
