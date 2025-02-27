import { create } from "zustand";

interface FormField {
  label: string;
  type: "text" | "number" | "password" | "textarea" | "date" | "file";
  value?: string;
}

interface FormState {
  formFields: FormField[];
  addField: (field: FormField) => void;
  removeField: (index: number) => void;
  updateField: (index: number, updateField: Partial<FormField>) => void;
  resetFields: () => void;
}

export const useStore = create<FormState>((set) => ({
  formFields: [],

  addField: (field) =>
    set((state) => ({ formFields: [...state.formFields, field] })),

  removeField: (index: number) =>
    set((state) => ({
      formFields: state.formFields.filter((_, i) => i !== index),
    })),

  updateField: (index, updateField) =>
    set((state) => ({
      formFields: state.formFields.map((field, i) =>
        i === index ? { ...field, ...updateField } : field
      ),
    })),

  resetFields: () => set({ formFields: [] }),
}));
