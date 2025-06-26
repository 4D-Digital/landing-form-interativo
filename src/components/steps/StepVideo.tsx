// src/components/steps/StepVideo.tsx

'use client'

import { useLeadStore } from '@/store/leadStore'
import { useState } from 'react'

export default function StepVideo() {
  const { step, setStep, setVideoWatched } = useLeadStore()
  const [loading, setLoading] = useState(false)

  const handleNext = async () => {
    setLoading(true)

    try {
      const res = await fetch('/api/leads', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({}),
      })

      const data = await res.json()

      if (!res.ok || !data?.id) throw new Error('ID do lead não retornado')

      localStorage.setItem('lead_id', data.id)

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

      <div className="relative w-full" style={{ paddingTop: '56.25%' }}>
        <iframe
          className="absolute top-0 left-0 w-full h-full rounded"
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
