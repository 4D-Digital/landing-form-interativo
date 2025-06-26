// src/components/steps/Step3.tsx

'use client'

import { useLeadStore } from '@/store/leadStore'

const opcoes = [
  { id: 1, texto: 'Quero atrair mais clientes todos os dias' },
  { id: 2, texto: 'Quero parecer mais profissional e confiável' },
  { id: 3, texto: 'Quero automatizar e economizar tempo' },
]

export default function Step3() {
  const {
    step,
    setStep,
    respostas,
    setResposta,
    setNome,
    setTelefone,
  } = useLeadStore()

  const handleSelecionar = async (texto: string) => {
    const leadId = localStorage.getItem('lead_id')
    if (!leadId) {
      alert('ID do lead não encontrado.')
      return
    }

    console.log('📤 Enviando PATCH com resposta 3 para Supabase:', texto)

    try {
      const res = await fetch('/api/leads/update', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          id: leadId,
          resposta_3: texto,
          step_completed: 6,
        }),
      })

      console.log('📨 Resposta do fetch bruto:', res)

      if (!res.ok) throw new Error('Erro ao salvar no Supabase')

      const json = await res.json()
      console.log('🧾 JSON do Supabase:', json)

      const lead = json.lead

      if (lead?.nome) setNome(lead.nome)
      if (lead?.telefone) setTelefone(lead.telefone)

      setResposta('pergunta3', texto)

      setTimeout(() => {
        window.location.href = '/obrigado'
      }, 300)
    } catch (err) {
      console.error('🚨 Erro ao salvar resposta 3:', err)
      alert('Erro ao salvar sua resposta. Tente novamente.')
    }
  }

  const handleBack = () => {
    setStep(step - 1)
  }

  return (
    <div className="mt-10 space-y-6">
      <h2 className="text-xl font-bold">
        Etapa 6: Qual é sua prioridade agora?
      </h2>

      <div className="space-y-4">
        {opcoes.map(({ id, texto }) => (
          <button
            key={id}
            id={`resposta3_${id}`}
            onClick={() => handleSelecionar(texto)}
            className={`w-full p-3 border rounded text-left transition-all
              ${
                respostas.pergunta3 === texto
                  ? 'bg-blue-600 text-white border-blue-700'
                  : 'bg-white text-black border-gray-300 hover:bg-gray-100'
              }`}
          >
            {texto}
          </button>
        ))}
      </div>

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
