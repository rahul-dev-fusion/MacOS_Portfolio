import { create } from "zustand";
import { immer } from "zustand/middleware/immer";

const useDogFollowerStore = create(
  immer((set) => ({
    isVisible: true,

    toggleDogFollower: () =>
      set((state) => {
        state.isVisible = !state.isVisible;
      }),

    showDogFollower: () =>
      set((state) => {
        state.isVisible = true;
      }),

    hideDogFollower: () =>
      set((state) => {
        state.isVisible = false;
      }),
  }))
);

export default useDogFollowerStore;
