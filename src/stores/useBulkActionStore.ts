import { create } from 'zustand';
import type { ScreenData } from '@/types/screen-types';

type BulkActionState = {
  selectedScreens: Record<string, ScreenData>;
  selectScreen: (screen: ScreenData) => void;
  deselectScreen: (screenId: string) => void;
  clearSelection: () => void;
  isSelected: (screenId: string) => boolean;
};

export const useBulkActionStore = create<BulkActionState>((set, get) => ({
  selectedScreens: {},
  selectScreen: (screen) => set((state) => ({
    selectedScreens: { ...state.selectedScreens, [screen.id.toString()]: screen },
  })),
  deselectScreen: (screenId) => set((state) => {
    // eslint-disable-next-line @typescript-eslint/naming-convention, unused-imports/no-unused-vars
    const { [screenId]: _, ...rest } = state.selectedScreens;
    return { selectedScreens: rest };
  }),
  clearSelection: () => set({ selectedScreens: {} }),
  isSelected: (screenId) => !!get().selectedScreens[screenId],
}));
