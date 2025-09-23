import { createContext, useContext, useState } from 'react';

const CustomizationContext = createContext({});

export const CustomizationProvider = (props) => {
  const [outerMaterial, setOuterMaterial] = useState('Oak');
  const [innerMaterial, setInnerMaterial] = useState('White');
  const [handlesMaterial, setHandlesMaterial] = useState('White');

  const [armchairSize, setArmchairSize] = useState('m');
  const [armchairMaterial, setArmchairMaterial] = useState('Oak'); // Добавляем материал кресла
  const [armchairBackMaterial, setArmchairBackMaterial] = useState('Black');

  return (
    <CustomizationContext.Provider
      value={{
        outerMaterial,
        setOuterMaterial,
        innerMaterial,
        setInnerMaterial,
        handlesMaterial,
        setHandlesMaterial,

        armchairSize,
        setArmchairSize,
        armchairMaterial, // Добавляем в контекст
        setArmchairMaterial, // Добавляем в контекст
        armchairBackMaterial,
        setArmchairBackMaterial,
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
