import { create } from "zustand";
import { devtools, persist } from "zustand/middleware";

interface FormDataType {
  name: string;
  username: string;
  avatar?: string | File;
  system_news_letters: number[];
  positions: number[];
  interests: number[];
}

interface OnboardingState {
  formData: FormDataType;
  setFormData: (data: Partial<FormDataType>) => void;
  resetForm: () => void;
}

export const onboardingStore = create<OnboardingState>()(
  devtools(
    persist(
      (set) => ({
        formData: {
          name: "",
          username: "",
          avatar: undefined,
          system_news_letters: [],
          positions: [],
          interests: [],
        },
        setFormData: (data: Partial<FormDataType>) => set((state) => ({
          formData: { ...state.formData, ...data },
        })),
        resetForm: () => set({
          formData: {
            name: "",
            username: "",
            avatar: undefined,
            system_news_letters: [],
            positions: [],
            interests: [],
          },
        }),
      }),
      {
        name: "onboarding-storage",
      },
    ),
  ),
);
