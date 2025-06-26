// src/components/steps/StepNome.tsx

'use client'

import { useLeadStore } from '@/store/leadStore'
import { useState, useEffect } from 'react'

export default function StepNome() {
  const { step, setStep, nome, setNome } = useLeadStore()
  const [input, setInput] = useState(nome)
  const [loading, setLoading] = useState(false)

  const handleNext = async () => {
    const leadId = localStorage.getItem('lead_id')
    if (!leadId || !input.trim()) return

    setLoading(true)

    try {
      const nomeFormatado = input.trim()
      const res = await fetch(`/api/leads/update`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          id: leadId,
          nome: nomeFormatado,
          step_completed: 2,
        }),
      })

      if (!res.ok) throw new Error('Erro ao atualizar o nome')

      setNome(nomeFormatado)
      setStep(step + 1)
    } catch (err) {
      console.error('Erro ao salvar nome:', err)
      alert('Erro ao salvar seu nome. Tente novamente.')
    } finally {
      setLoading(false)
    }
  }

  const handleBack = () => {
    setStep(step - 1)
  }

  useEffect(() => {
    setInput(nome)
  }, [nome])

  return (
    <div className="mt-10 space-y-6">
      <h2 className="text-xl font-bold">Etapa 2: Qual o seu nome?</h2>

      <input
        type="text"
        className="w-full p-2 border border-gray-300 rounded"
        placeholder="Digite seu nome completo"
        value={input}
        onChange={(e) => setInput(e.target.value)}
      />

      <div className="flex gap-4">
        <button
          onClick={handleBack}
          className="px-4 py-2 bg-gray-600 text-white rounded hover:bg-gray-700"
        >
          Voltar
        </button>

        <button
          onClick={handleNext}
          disabled={!input.trim() || loading}
          className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 disabled:opacity-50"
        >
          {loading ? 'Salvando...' : 'Próximo'}
        </button>
      </div>
    </div>
  )
}
