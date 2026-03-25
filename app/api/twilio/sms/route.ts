import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@supabase/supabase-js'

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
)

export async function POST(req: NextRequest) {
  const formData = await req.formData()

  const body = formData.get('Body')?.toString().trim().toUpperCase() ?? ''
  const from = formData.get('From')?.toString() ?? ''

  console.log('Incoming SMS:', { body, from })

  if (!from) {
    return new NextResponse('Missing sender', { status: 400 })
  }

  if (body === 'YES' || body === 'OK') {
    const { error } = await supabase.from('checkins').insert({
      phone: from,
      status: 'responded',
      response: body
    })

    if (error) {
      console.error('Supabase insert error:', error)
    }

    return new NextResponse(
      '<Response><Message>Got it. You are marked safe.</Message></Response>',
      { headers: { 'Content-Type': 'text/xml' } }
    )
  }

  if (body === 'HELP') {
    const { error } = await supabase.from('checkins').insert({
      phone: from,
      status: 'help_requested',
      response: body
    })

    if (error) {
      console.error('Supabase insert error:', error)
    }

    return new NextResponse(
      '<Response><Message>Help request received. Someone will contact you.</Message></Response>',
      { headers: { 'Content-Type': 'text/xml' } }
    )
  }

  return new NextResponse(
    '<Response><Message>Please reply YES to confirm you are okay.</Message></Response>',
    { headers: { 'Content-Type': 'text/xml' } }
  )
}

