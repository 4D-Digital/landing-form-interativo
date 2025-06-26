'use client'

import { useLeadStore } from '@/store/leadStore'
import { useState } from 'react'

export default function StepVideo() {
  const { step, setStep, setVideoWatched } = useLeadStore()
  const [loading, setLoading] = useState(false)

  // Função que será chamada ao clicar em "Continuar"
  const handleNext = async () => {
    setLoading(true)

    try {
      // Chamada para nossa API interna que envia dados para o Supabase com segurança
      const res = await fetch('/api/leads', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({}) // pode enviar dados iniciais se desejar
      })

      const data = await res.json()

      if (!res.ok || !data?.id) throw new Error('ID do lead não retornado')

      // Armazena o ID retornado no localStorage para uso nas próximas etapas
      localStorage.setItem('lead_id', data.id)

      // Atualiza o estado global com Zustand
      setVideoWatched(true)
      setStep(step + 1)
    } catch (err) {
      console.error('Erro ao criar lead:', err)
      alert('Erro ao criar seu registro. Tente novamente.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="mt-10 space-y-6">
      <h2 className="text-xl font-bold">Etapa Video 1: Assista ao vídeo</h2>

      <div className="aspect-w-16 aspect-h-9 w-full">
        <iframe
          className="w-full h-full rounded"
          src="https://www.youtube.com/embed/Rl-wQuemJCI"
          title="Vídeo de Apresentação"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        />
      </div>

      <button
        onClick={handleNext}
        disabled={loading}
        className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 disabled:opacity-50"
      >
        {loading ? 'Carregando...' : 'Continuar'}
      </button>
    </div>
  )
}
