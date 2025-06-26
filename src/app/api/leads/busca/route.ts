// src/app/api/leads/busca/route.ts

import { NextResponse } from 'next/server'

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url)
  const id = searchParams.get('id')

  if (!id) {
    return NextResponse.json({ error: 'ID do lead ausente' }, { status: 400 })
  }

  const url = `${process.env.NEXT_PUBLIC_SUPABASE_URL}/rest/v1/leads_lp_01?id=eq.${id}&select=*`

  try {
    const res = await fetch(url, {
      method: 'GET',
      headers: {
        apikey: process.env.SUPABASE_SERVICE_ROLE_KEY!,
        Authorization: `Bearer ${process.env.SUPABASE_SERVICE_ROLE_KEY!}`,
        'Content-Type': 'application/json',
      },
    })

    if (!res.ok) {
      const error = await res.text()
      console.error('🚨 Erro no Supabase:', error)
      return NextResponse.json({ error }, { status: res.status })
    }

    const data = await res.json()
    
    if (!data || data.length === 0) {
      return NextResponse.json({ error: 'Lead não encontrado' }, { status: 404 })
    }

    return NextResponse.json({ success: true, lead: data[0] })
  } catch (error) {
    console.error('🚨 Erro ao buscar lead:', error)
    return NextResponse.json({ error: 'Erro interno do servidor' }, { status: 500 })
  }
}