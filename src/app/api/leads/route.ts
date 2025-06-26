// src/app/api/leads/route.ts

import { NextResponse } from 'next/server'

export async function POST(req: Request) {
  try {
    const data = await req.json()

    const response = await fetch(`${process.env.NEXT_PUBLIC_SUPABASE_URL}/rest/v1/leads_lp_01`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        apikey: process.env.SUPABASE_SERVICE_ROLE_KEY!,
        Authorization: `Bearer ${process.env.SUPABASE_SERVICE_ROLE_KEY!}`,
        Prefer: 'return=representation',
      },
      body: JSON.stringify(data),
    })

    const result = await response.json()

    if (!response.ok) {
      console.error('Erro na resposta do Supabase:', result)
      return NextResponse.json({ error: 'Erro ao salvar no Supabase.' }, { status: 500 })
    }

    return NextResponse.json(result[0]) // já retorna o lead com ID
  } catch (error) {
    console.error('Erro geral na API:', error)
    return NextResponse.json({ error: 'Erro interno ao criar o lead.' }, { status: 500 })
  }
}
