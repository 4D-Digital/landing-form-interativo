// src/components/steps/StepTelefone.tsx

'use client'

import { useLeadStore } from '@/store/leadStore'
import { useState, useEffect } from 'react'

export default function StepTelefone() {
  const { step, setStep, telefone, setTelefone } = useLeadStore()
  const [input, setInput] = useState(telefone)

  const handleNext = async () => {
    const leadId = localStorage.getItem('lead_id')
    if (!leadId || !isValidPhone(input)) return

    try {
      const telefoneInternacional = '55' + input.replace(/\D/g, '')

      await fetch('/api/leads/update', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          id: leadId,
          telefone: telefoneInternacional,
          step_completed: 3,
        }),
      })

      setTelefone(telefoneInternacional)
      setStep(step + 1)
    } catch (err) {
      console.error('Erro ao salvar telefone:', err)
      alert('Erro ao salvar seu telefone. Tente novamente.')
    }
  }

  const handleBack = () => {
    setStep(step - 1)
  }

  useEffect(() => {
    setInput(telefone ? formatPhone(telefone.replace(/^55/, '')) : '')
  }, [telefone])

  const formatPhone = (value: string) => {
    return value
      .replace(/\D/g, '')
      .replace(/^(\d{2})(\d)/g, '($1) $2')
      .replace(/(\d{5})(\d)/, '$1-$2')
      .slice(0, 15)
  }

  const isValidPhone = (value: string) => {
    return /\(\d{2}\)\s\d{5}-\d{4}/.test(value)
  }

  return (
    <div className="mt-10 space-y-6">
      <h2 className="text-xl font-bold">Etapa 3: Qual seu número de WhatsApp hein?</h2>

      <div className="relative">
        <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-xl">🇧🇷</span>

        <input
          type="text"
          inputMode="numeric"
          value={input}
          onChange={(e) => setInput(formatPhone(e.target.value))}
          placeholder="(00) 00000-0000"
          className="w-full pl-10 p-2 border border-gray-300 rounded"
        />
      </div>

      <div className="flex gap-4">
        <button
          onClick={handleBack}
          className="px-4 py-2 bg-gray-600 text-white rounded hover:bg-gray-700"
        >
          Voltar
        </button>

        <button
          onClick={handleNext}
          disabled={!isValidPhone(input)}
          className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 disabled:opacity-50"
        >
          Próximo
        </button>
      </div>
    </div>
  )
}
