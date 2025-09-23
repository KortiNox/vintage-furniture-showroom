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
  armchairBackMaterialOptions, // Добавляем импорт
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

    armchairSize,
    setArmchairSize,
    armchairMaterial,
    setArmchairMaterial,
    armchairBackMaterial, // Добавляем из контекста
    setArmchairBackMaterial, // Добавляем из контекста
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

  //----------- Armchair Back Material selection -----------------
  const [armchairBackMaterialSlot, setArmchairBackMaterialSlot] = useState(true);
  const toggleArmchairBackMaterialSlot = () => {
    setArmchairBackMaterialSlot(!armchairBackMaterialSlot);
  };

  const handleArmchairBackMaterialChange = (option) => {
    setArmchairBackMaterial(option.label);
  };

  return (
    <div className="w-full h-[100vh] flex flex-row overflow-hidden">
      <div className="w-[70%] rad-gradient">
        <Suspense fallback={<LoadingAlert></LoadingAlert>}>
          <Scene></Scene>
        </Suspense>
      </div>

      <div className="controls w-[30%]">
        {/* Размер кресла */}
        <Slot label={'Armchair Size'} isOpen={armchairSizeSlot} onChange={toggleArmchairSizeSlot}>
          <SelectOptions
            options={sizeOptions}
            value={armchairSize}
            onChange={handleArmchairSizeChange}
          ></SelectOptions>
        </Slot>

        {/* Материал ножек кресла */}
        <Slot
          label={'Armchair Legs Material'}
          isOpen={armchairMaterialSlot}
          onChange={toggleArmchairMaterialSlot}
        >
          <SelectOptions
            options={armchairBodyMaterialOptions}
            value={armchairMaterial}
            onChange={handleArmchairMaterialChange}
          ></SelectOptions>
        </Slot>

        {/* Материал спинки кресла */}
        <Slot
          label={'Armchair Back Material'}
          isOpen={armchairBackMaterialSlot}
          onChange={toggleArmchairBackMaterialSlot}
        >
          <SelectOptions
            options={armchairBackMaterialOptions}
            value={armchairBackMaterial}
            onChange={handleArmchairBackMaterialChange}
          ></SelectOptions>
        </Slot>

        <Slot label={'Inner Lamination'}>
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
