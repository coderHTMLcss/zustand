import { create } from "zustand";

type PasswordState = {
  length: number;
  includeNumbers: boolean;
  includeSymbols: boolean;
  includeUppercase: boolean;
  includeLowercase: boolean;
  generatedPassword: string;
  setLength: (length: number) => void;
  toggleNumbers: () => void;
  toggleSymbols: () => void;
  toggleUppercase: () => void;
  toggleLowercase: () => void;
  generatePassword: () => void;
};

export const useStore = create<PasswordState>((set) => ({
  length: 12,
  includeNumbers: true,
  includeSymbols: false,
  includeUppercase: true,
  includeLowercase: true,
  generatedPassword: "",

  setLength: (length) => set({ length: Math.max(4, Math.min(50, length)) }),
  toggleNumbers: () =>
    set((state) => ({ includeNumbers: !state.includeNumbers })),
  toggleSymbols: () =>
    set((state) => ({ includeSymbols: !state.includeSymbols })),
  toggleUppercase: () =>
    set((state) => ({ includeUppercase: !state.includeUppercase })),
  toggleLowercase: () =>
    set((state) => ({ includeLowercase: !state.includeLowercase })),
  generatePassword: () =>
    set((state) => {
      const charSets = [
        { enabled: state.includeNumbers, chars: "0123456789" },
        { enabled: state.includeSymbols, chars: "!@#$%^&*()" },
        {
          enabled: state.includeLowercase,
          chars: "abcdefghijklmnopqrstuvwxyz",
        },
        {
          enabled: state.includeUppercase,
          chars: "ABCDEFGHIJKLMNOPQRSTUVWXYZ",
        },
      ];

      const characters = charSets
        .filter((set) => set.enabled)
        .map((set) => set.chars)
        .join("");

      if (!characters)
        return { generatedPassword: "Error: No character set selected" };

      const password = Array.from({ length: state.length }, () =>
        characters.charAt(Math.floor(Math.random() * characters.length))
      ).join("");

      return { generatedPassword: password };
    }),
}));
