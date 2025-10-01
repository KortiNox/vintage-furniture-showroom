// context/Customization.js
import React, { createContext, useContext, useState } from 'react';

const CustomizationContext = createContext({});

export const CustomizationProvider = ({ children }) => {
  const [armchairMaterial, setArmchairMaterial] = useState('Oak');
  const [armchairSize, setArmchairSize] = useState('m');
  const [armchairBackMaterial, setArmchairBackMaterial] = useState('Black');

  // Добавляем состояние для выбранной модели
  const [selectedModel, setSelectedModel] = useState(null);

  return (
    <CustomizationContext.Provider
      value={{
        // Существующие состояния
        armchairMaterial,
        setArmchairMaterial,
        armchairSize,
        setArmchairSize,
        armchairBackMaterial,
        setArmchairBackMaterial,
        // Новое состояние для выбранной модели
        selectedModel,
        setSelectedModel,
      }}
    >
      {children}
    </CustomizationContext.Provider>
  );
};

export const useCustomization = () => {
  const context = useContext(CustomizationContext);
  return context;
};
