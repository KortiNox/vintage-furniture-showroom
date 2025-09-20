import React, { Suspense, useEffect, useState, lazy } from 'react';

import Slot from './components/Slot';
import SelectOptions from './components/SelectOptions';
import { useCustomization } from './context/Customization';
import {
  bodyMaterialOptions,
  innerMaterialOptions,
  handlesMaterialOptions,
  sizeOptions,
  armchairSizeOptions,
  armchairBodyMaterialOptions,
} from './utils/options';

// 3d components
import LoadingAlert from './components/LoadingAlert';
const Scene = lazy(() => import('./Scene'));

const App = () => {
  const {
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
    armchairMaterial, // Добавляем материал кресла
    setArmchairMaterial, // Добавляем материал кресла
  } = useCustomization();

  //------------ outer body Material -------------
  const [isBodySlotOpen, setIsBodySlotOpen] = useState(true);
  const handleBodySlot = () => {
    setIsBodySlotOpen(!isBodySlotOpen);
  };

  const handleBodyMaterialChange = (option) => {
    setOuterMaterial(option.label);
  };

  //------------------- Interior-------------
  const handleDoorOpen = () => {
    setIsDoorOpen(!isDoorOpen);
  };

  const handleInnerMaterial = (option) => {
    setInnerMaterial(option.label);
  };

  //----------- Handles material -----------------
  const [handlesSlot, setHandlesSlot] = useState(true);
  const changeHandlesSLot = () => {
    setHandlesSlot(!handlesSlot);
  };

  //----------- Size selection -----------------
  const [sizeSlot, setSizeSlot] = useState(true);
  const toggleSizeSlot = () => {
    setSizeSlot(!sizeSlot);
  };

  const handleSizeChange = (option) => {
    setDoorSize(option.value);
  };

  //----------- Armchair Size selection -----------------
  const [armchairSizeSlot, setArmchairSizeSlot] = useState(true);
  const toggleArmchairSizeSlot = () => {
    setArmchairSizeSlot(!armchairSizeSlot);
  };

  const handleArmchairSizeChange = (option) => {
    setArmchairSize(option.value);
  };

  //----------- Armchair Material selection -----------------
  const [armchairMaterialSlot, setArmchairMaterialSlot] = useState(true);
  const toggleArmchairMaterialSlot = () => {
    setArmchairMaterialSlot(!armchairMaterialSlot);
  };

  const handleArmchairMaterialChange = (option) => {
    setArmchairMaterial(option.label);
  };

  return (
    <div className="w-full h-[100vh] flex flex-row overflow-hidden">
      <div className="w-[70%] rad-gradient">
        <Suspense fallback={<LoadingAlert></LoadingAlert>}>
          <Scene></Scene>
        </Suspense>
      </div>

      <div className="controls w-[30%]">
        {/* Размер двери */}
        <Slot label={'Door Size'} isOpen={sizeSlot} onChange={toggleSizeSlot}>
          <SelectOptions
            options={sizeOptions}
            value={doorSize}
            onChange={handleSizeChange}
          ></SelectOptions>
        </Slot>

        {/* Размер кресла */}
        <Slot label={'Armchair Size'} isOpen={armchairSizeSlot} onChange={toggleArmchairSizeSlot}>
          <SelectOptions
            options={sizeOptions}
            value={armchairSize}
            onChange={handleArmchairSizeChange}
          ></SelectOptions>
        </Slot>

        {/* Материал кресла */}
        <Slot
          label={'Armchair Material'}
          isOpen={armchairMaterialSlot}
          onChange={toggleArmchairMaterialSlot}
        >
          <SelectOptions
            options={armchairBodyMaterialOptions} // Используем те же опции что и для двери
            value={armchairMaterial}
            onChange={handleArmchairMaterialChange}
          ></SelectOptions>
        </Slot>

        <Slot label={'Door Material'} isOpen={isBodySlotOpen} onChange={handleBodySlot}>
          <SelectOptions
            options={bodyMaterialOptions}
            value={outerMaterial}
            onChange={handleBodyMaterialChange}
          ></SelectOptions>
        </Slot>

        <Slot label={'Inner Lamination'} isOpen={isDoorOpen} onChange={handleDoorOpen}>
          <SelectOptions
            options={innerMaterialOptions}
            value={innerMaterial}
            onChange={handleInnerMaterial}
          ></SelectOptions>
        </Slot>

        <Slot label={'Handles Material'} isOpen={handlesSlot} onChange={changeHandlesSLot}>
          <SelectOptions
            options={handlesMaterialOptions}
            value={handlesMaterial}
            onChange={(option) => {
              setHandlesMaterial(option.label);
            }}
          ></SelectOptions>
        </Slot>
      </div>
    </div>
  );
};

export default App;
