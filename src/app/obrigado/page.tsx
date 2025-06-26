// src/app/obrigado/page.tsx

'use client'

import { useEffect, useState } from 'react'

export default function PaginaObrigado() {
  const [enviado, setEnviado] = useState(false)
  const [carregando, setCarregando] = useState(true)
  const [erro, setErro] = useState<string | null>(null)

  useEffect(() => {
    const enviarDadosParaN8N = async () => {
      try {
        // 1. Buscar ID do localStorage
        const leadId = localStorage.getItem('lead_id')
        console.log('🔍 Lead ID do localStorage:', leadId)

        if (!leadId) {
          setErro('ID do lead não encontrado no localStorage')
          setCarregando(false)
          return
        }

        // 2. Buscar dados atualizados do Supabase
        console.log('📡 Buscando dados do Supabase...')
        const resLead = await fetch(`/api/leads/busca?id=${leadId}`)
        
        if (!resLead.ok) {
          throw new Error(`Erro ao buscar lead: ${resLead.status}`)
        }

        const leadData = await resLead.json()
        console.log('📋 Dados recebidos do Supabase:', leadData)

        if (!leadData.success || !leadData.lead) {
          throw new Error('Lead não encontrado no banco de dados')
        }

        const lead = leadData.lead

        // 3. Montar payload para N8N
        const payload = {
          id: lead.id,
          nome: lead.nome,
          telefone: lead.telefone,
          pergunta1: lead.resposta_1,
          pergunta2: lead.resposta_2,
          pergunta3: lead.resposta_3,
          step_completed: lead.step_completed,
          created_at: lead.created_at,
          updated_at: lead.updated_at,
        }

        console.log('📦 Payload para N8N:', payload)

        // 4. Validar se temos dados essenciais
        if (!payload.nome || !payload.telefone) {
          throw new Error('Dados essenciais (nome/telefone) não encontrados')
        }

        // 5. Enviar para N8N
        console.log('🚀 Enviando dados para N8N...')
        const resN8N = await fetch(process.env.NEXT_PUBLIC_WEBHOOK_N8N_URL as string, {
          method: 'POST',
          headers: { 
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(payload),
        })

        console.log('📨 Resposta do N8N:', resN8N.status, resN8N.statusText)

        if (!resN8N.ok) {
          throw new Error(`Erro ao enviar para N8N: ${resN8N.status}`)
        }

        console.log('✅ Dados enviados com sucesso para N8N!')
        setEnviado(true)

      } catch (error) {
        console.error('🚨 Erro no processo:', error)
        setErro(error instanceof Error ? error.message : 'Erro desconhecido')
      } finally {
        setCarregando(false)
      }
    }

    enviarDadosParaN8N()
  }, [])

  return (
    <div className="mt-20 text-center space-y-6 max-w-xl mx-auto">
      <h1 className="text-3xl font-bold text-green-700">🎉 Tudo certo!</h1>
      
      <p className="text-lg">
        Seus dados foram recebidos com sucesso. <br />
        Nossa equipe entrará em contato com você em breve.
      </p>

      {/* Status do envio */}
      {carregando && (
        <div className="space-y-2">
          <p className="text-sm text-blue-600">⏳ Processando seus dados...</p>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div className="bg-blue-600 h-2 rounded-full animate-pulse w-1/2"></div>
          </div>
        </div>
      )}

      {erro && (
        <div className="bg-red-50 border border-red-200 rounded p-4">
          <p className="text-sm text-red-600">❌ {erro}</p>
          <p className="text-xs text-red-500 mt-1">
            Não se preocupe, suas informações foram salvas e nossa equipe foi notificada.
          </p>
        </div>
      )}

      {enviado && (
        <div className="bg-green-50 border border-green-200 rounded p-4">
          <p className="text-sm text-green-600">🔔 Informações enviadas ao nosso sistema com sucesso!</p>
        </div>
      )}


    </div>
  )
}