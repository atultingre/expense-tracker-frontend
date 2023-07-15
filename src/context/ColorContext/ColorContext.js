import React, { useState, useEffect, createContext } from "react";
import { colorCombinations } from "./colorData";

// Create the color context
export const ColorContext = createContext();

// Define the color combinations array

const ColorContextProvider = ({ children }) => {
  const [colorCombination, setColorCombination] = useState({});

  useEffect(() => {
    // Generate a random index
    const randomIndex = Math.floor(Math.random() * colorCombinations.length);
    // Set the random color combination
    setColorCombination(colorCombinations[randomIndex]);
  }, []);

  return (
    <ColorContext.Provider value={colorCombination}>
      {children}
    </ColorContext.Provider>
  );
};

export default ColorContextProvider;
