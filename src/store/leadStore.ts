// src/store/leadStore.ts

import { create } from 'zustand'

type LeadState = {
  step: number
  videoWatched: boolean
  nome: string
  telefone: string
  respostas: {
    pergunta1?: string
    pergunta2?: string
    pergunta3?: string
  }
  setStep: (step: number) => void
  setVideoWatched: (watched: boolean) => void
  setNome: (nome: string) => void
  setTelefone: (telefone: string) => void
  setResposta: (key: 'pergunta1' | 'pergunta2' | 'pergunta3', value: string) => void
  getFullPayload: () => {
    nome: string
    telefone: string
    pergunta1?: string
    pergunta2?: string
    pergunta3?: string
  }
}

export const useLeadStore = create<LeadState>((set, get) => ({
  step: 0,
  videoWatched: false,
  nome: '',
  telefone: '',
  respostas: {},
  setStep: (step) => set({ step }),
  setVideoWatched: (watched) => set({ videoWatched: watched }),
  setNome: (nome) => set({ nome }),
  setTelefone: (telefone) => set({ telefone }),
  setResposta: (key, value) =>
    set((state) => ({
      respostas: {
        ...state.respostas,
        [key]: value,
      },
    })),
  getFullPayload: () => {
    const { nome, telefone, respostas } = get()
    return {
      nome,
      telefone,
      ...respostas,
    }
  },
}))
