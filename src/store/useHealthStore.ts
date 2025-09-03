import { HealthApiResponse } from '@/lib/edit-image'
import { create } from 'zustand'

export interface HealthInputs {
  name: string
  dob: string
  height: number
  weight: number
  sleepHours: number
  waterMl: number
  steps: number
  calories: number
  gender?: 'male' | 'female' | 'auto'
  goal?: 'fatloss' | 'musclegain'
  bodyFatPct?: number
  imageFile?: File
}

interface HealthStore {
  step: number
  setStep: (step: number) => void
  nextStep: () => void

  processingImageUrl: string
  setProcessingImageUrl: (url: string) => void

  results: HealthApiResponse | null
  setResults: (results: HealthApiResponse) => void

  inputs: HealthInputs
  setInput: <K extends keyof HealthInputs>(
    key: K,
    value: HealthInputs[K]
  ) => void
  resetInputs: () => void
}

export const useHealthStore = create<HealthStore>((set, get) => ({
  step: 0,
  setStep: (step) => set({ step }),
  nextStep: () => {
    const currentStep = get().step
    if (currentStep < 5) {
      set({ step: currentStep + 1 })
    }
  },

  processingImageUrl: '',
  setProcessingImageUrl: (url) => set({ processingImageUrl: url }),

  results: null,
  setResults: (res) => set({ results: res }),

  inputs: {
    name: '',
    dob: '',
    height: 0,
    weight: 0,
    sleepHours: 0,
    waterMl: 0,
    steps: 0,
    calories: 0,
    gender: 'auto',
    goal: 'fatloss',
    bodyFatPct: undefined,
    imageFile: undefined,
  },
  setInput: (key, value) =>
    set((state) => ({ inputs: { ...state.inputs, [key]: value } })),

  resetInputs: () =>
    set({
      step: 0,
      inputs: {
        name: '',
        dob: '',
        height: 0,
        weight: 0,
        sleepHours: 0,
        waterMl: 0,
        steps: 0,
        calories: 0,
        gender: 'auto',
        goal: 'fatloss',
        bodyFatPct: undefined,
        imageFile: undefined,
      },
    }),
}))
