// src/components/steps/Step2.tsx

'use client'

import { useLeadStore } from '@/store/leadStore'

// Opções com ID numérico como identificador interno, mas só o texto será enviado
const opcoes = [
  { id: 1, texto: 'Preciso montar toda a estrutura do zero! É urgente!' },
  { id: 2, texto: 'Já tenho algo, mas quero profissionalizar' },
  { id: 3, texto: 'Quero otimizar e escalar o que já tenho' },
]

export default function Step2() {
  const { step, setStep, respostas, setResposta } = useLeadStore()

  // Clicou em uma resposta → envia para API e avança
  const handleSelecionar = async (texto: string) => {
    const leadId = localStorage.getItem('lead_id')
    if (!leadId) return

    try {
      // PATCH para endpoint genérico que lê dados do .env no server
      await fetch('/api/leads/update', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          id: leadId,
          resposta_2: texto, // Apenas o texto é salvo no banco
          step_completed: 5,
        }),
      })

      // Atualiza o Zustand com a resposta e avança o passo
      setResposta('pergunta2', texto)
      setTimeout(() => setStep(step + 1), 150)
    } catch (err) {
      console.error('Erro ao salvar resposta 2:', err)
      alert('Erro ao salvar sua resposta. Tente novamente.')
    }
  }

  // Botão voltar uma etapa
  const handleBack = () => {
    setStep(step - 1)
  }

  return (
    <div className="mt-10 space-y-6">
      <h2 className="text-xl font-bold">
        Etapa 5: Em que nível está sua estrutura digital?
      </h2>

      {/* Botões de resposta, com estado visual baseado no Zustand */}
      <div className="space-y-4">
        {opcoes.map(({ id, texto }) => (
          <button
            key={id}
            id={`resposta2_${id}`} // Identificador único para automações/testes
            onClick={() => handleSelecionar(texto)}
            className={`w-full p-3 border rounded text-left transition-all
              ${
                respostas.pergunta2 === texto
                  ? 'bg-blue-600 text-white border-blue-700'
                  : 'bg-white text-black border-gray-300 hover:bg-gray-100'
              }`}
          >
            {texto}
          </button>
        ))}
      </div>

      {/* Botão voltar */}
      <div className="pt-4">
        <button
          onClick={handleBack}
          className="px-4 py-2 bg-gray-600 text-white rounded hover:bg-gray-700"
        >
          Voltar
        </button>
      </div>
    </div>
  )
}
