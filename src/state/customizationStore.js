import create from 'zustand';

export const useCustomizationStore = create((set) => ({
  armchairMaterial: 'Oak',
  setArmchairMaterial: (value) => set({ armchairMaterial: value }),

  armchairSize: 'm',
  setArmchairSize: (value) => set({ armchairSize: value }),

  armchairBackMaterial: 'Black',
  setArmchairBackMaterial: (value) => set({ armchairBackMaterial: value }),

  selectedModel: null,
  setSelectedModel: (value) => set({ selectedModel: value }),
}));

export function useCustomization() {
  return useCustomizationStore((state) => state);
}

