import { createContext, useContext, useState } from 'react';

const CustomizationContext = createContext({});

export const CustomizationProvider = (props) => {
  const [outerMaterial, setOuterMaterial] = useState('Oak');
  const [innerMaterial, setInnerMaterial] = useState('White');
  const [handlesMaterial, setHandlesMaterial] = useState('White');
  const [isDoorOpen, setIsDoorOpen] = useState(false);
  const [doorSize, setDoorSize] = useState('m');
  const [armchairSize, setArmchairSize] = useState('m');
  const [armchairMaterial, setArmchairMaterial] = useState('Oak'); // Добавляем материал кресла

  return (
    <CustomizationContext.Provider
      value={{
        outerMaterial,
        setOuterMaterial,
        innerMaterial,
        setInnerMaterial,
        handlesMaterial,
        setHandlesMaterial,
        isDoorOpen,
        setIsDoorOpen,
        doorSize,
        setDoorSize,
        armchairSize,
        setArmchairSize,
        armchairMaterial, // Добавляем в контекст
        setArmchairMaterial, // Добавляем в контекст
      }}
    >
      {props.children}
    </CustomizationContext.Provider>
  );
};

export const useCustomization = () => {
  const context = useContext(CustomizationContext);
  return context;
};
