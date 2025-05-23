import {create} from "zustand";
import {persist} from "zustand/middleware"

export const useThemeStore = create(
  persist(
    (set) => ({
      theme: "dark", //"light"
      toggleTheme: ()=>set((state)=> ({theme: state.theme==="light"? "dark": "light"})),
    })),
  {
    name: "theme-storage",
  });



