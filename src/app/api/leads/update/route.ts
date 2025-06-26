// src/app/api/leads/update/route.ts

import { NextResponse } from 'next/server'

export async function PATCH(req: Request) {
  const body = await req.json()
  const { id, ...campos } = body

  if (!id) {
    return NextResponse.json({ error: 'ID do lead ausente' }, { status: 400 })
  }

  const url = `${process.env.NEXT_PUBLIC_SUPABASE_URL}/rest/v1/leads_lp_01?id=eq.${id}`

  const res = await fetch(url, {
    method: 'PATCH',
    headers: {
      apikey: process.env.SUPABASE_SERVICE_ROLE_KEY!,
      Authorization: `Bearer ${process.env.SUPABASE_SERVICE_ROLE_KEY!}`,
      'Content-Type': 'application/json',
      Prefer: 'return=representation',
    },
    body: JSON.stringify(campos),
  })

  if (!res.ok) {
    const error = await res.text()
    return NextResponse.json({ error }, { status: res.status })
  }

  const data = await res.json()
  return NextResponse.json({ success: true, lead: data[0] })
}
