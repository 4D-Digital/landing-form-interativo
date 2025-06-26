// src/components/steps/Step1.tsx

'use client'

import { useLeadStore } from '@/store/leadStore'

// Lista de opções da pergunta 1
const opcoes = [
  { id: 1, texto: 'Estou começando agora mesmo' },
  { id: 2, texto: 'Já tenho alguma estrutura no digital' },
  { id: 3, texto: 'Já vendo bem, mas quero escalar' },
]

export default function Step1() {
  // Zustand para estado global da jornada do lead
  const { step, setStep, respostas, setResposta } = useLeadStore()

  // Manipula clique em uma opção
  const handleSelecionar = async (texto: string) => {
    const leadId = localStorage.getItem('lead_id')
    if (!leadId) return // Se não houver ID do lead, não continua

    try {
      // Envia PATCH com a resposta e o step concluído
      await fetch('/api/leads/update', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          id: leadId,
          resposta_1: texto,
          step_completed: 4,
        }),
      })

      // Atualiza Zustand e avança para o próximo passo
      setResposta('pergunta1', texto)
      setStep(step + 1)
    } catch (err) {
      console.error('Erro ao salvar resposta 1:', err)
      alert('Erro ao salvar sua resposta. Tente novamente.')
    }
  }

  // Volta uma etapa no fluxo
  const handleBack = () => {
    setStep(step - 1)
  }

  return (
    <div className="mt-10 space-y-6">
      <h2 className="text-xl font-bold">
        Etapa 4: Em que momento você está no digital?
      </h2>

      {/* Botões dinâmicos com base nas opções disponíveis */}
      <div className="space-y-4">
        {opcoes.map(({ id, texto }) => (
          <button
            key={id}
            id={`resposta1_${id}`} // Identificador visual no DOM
            onClick={() => handleSelecionar(texto)}
            className={`w-full p-3 border rounded text-left transition-all
              ${
                respostas.pergunta1 === texto
                  ? 'bg-blue-600 text-white border-blue-700'
                  : 'bg-white text-black border-gray-300 hover:bg-gray-100'
              }`}
          >
            {texto}
          </button>
        ))}
      </div>

      {/* Botão de voltar */}
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
