import React, { Suspense, useEffect, useState, lazy } from 'react';
import Slot from './components/Slot';
import SelectOptions from './components/SelectOptions';
import { useCustomization } from './context/Customization';
import {
  sizeOptions,
  armchairBodyMaterialOptions,
  armchairBackMaterialOptions,
} from './utils/options';

// 3d components
import LoadingAlert from './components/LoadingAlert';
const Scene = lazy(() => import('./Scene'));

const App = () => {
  const {
    armchairSize,
    setArmchairSize,
    armchairMaterial,
    setArmchairMaterial,
    armchairBackMaterial,
    setArmchairBackMaterial,
  } = useCustomization();

  //----------- Armchair Size selection -----------------
  const [armchairSizeSlot, setArmchairSizeSlot] = useState(true);
  const toggleArmchairSizeSlot = () => {
    setArmchairSizeSlot(!armchairSizeSlot);
  };

  const handleArmchairSizeChange = (option) => {
    setArmchairSize(option.value);
  };

  //----------- Armchair Legs Material selection -----------------
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
        <Suspense fallback={<LoadingAlert />}>
          <Scene />
        </Suspense>
      </div>

      <div className="controls w-[30%]">
        {/* Размер кресла */}
        <Slot label={'Размер кресла'} isOpen={armchairSizeSlot} onChange={toggleArmchairSizeSlot}>
          <SelectOptions
            options={sizeOptions}
            value={armchairSize}
            onChange={handleArmchairSizeChange}
          />
        </Slot>

        {/* Материал ножек кресла */}
        <Slot
          label={'Материал ножек'}
          isOpen={armchairMaterialSlot}
          onChange={toggleArmchairMaterialSlot}
        >
          <SelectOptions
            options={armchairBodyMaterialOptions}
            value={armchairMaterial}
            onChange={handleArmchairMaterialChange}
          />
        </Slot>

        {/* Материал спинки кресла */}
        <Slot
          label={'Оттенок спинки'}
          isOpen={armchairBackMaterialSlot}
          onChange={toggleArmchairBackMaterialSlot}
        >
          <SelectOptions
            options={armchairBackMaterialOptions}
            value={armchairBackMaterial}
            onChange={handleArmchairBackMaterialChange}
          />
        </Slot>
      </div>
    </div>
  );
};

export default App;
//