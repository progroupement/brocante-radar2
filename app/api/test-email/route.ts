import { NextResponse } from 'next/server'
import { Resend } from 'resend'

export async function GET() {
  const results: Record<string, unknown> = {
    RESEND_API_KEY_present: !!process.env.RESEND_API_KEY,
    RESEND_FROM: process.env.RESEND_FROM ?? '(non défini — fallback onboarding@resend.dev)',
  }

  if (!process.env.RESEND_API_KEY) {
    return NextResponse.json({
      ...results,
      error: 'RESEND_API_KEY manquant dans les variables Vercel',
    }, { status: 500 })
  }

  try {
    const resend = new Resend(process.env.RESEND_API_KEY)
    const from = process.env.RESEND_FROM ?? 'onboarding@resend.dev'

    const { data, error } = await resend.emails.send({
      from,
      to: ['progroupement@gmail.com'],
      subject: '✅ Test email — Brocante Radar',
      html: `
        <div style="font-family: Arial, sans-serif; padding: 24px; max-width: 500px;">
          <h2 style="color: #0D1B4B;">Test de notification Brocante Radar</h2>
          <p>Si vous recevez cet email, les notifications fonctionnent correctement !</p>
          <p style="color: #4A5680; font-size: 13px;">Envoyé depuis : <strong>${from}</strong></p>
        </div>
      `,
    })

    if (error) {
      return NextResponse.json({ ...results, resend_error: error }, { status: 500 })
    }

    return NextResponse.json({ ...results, success: true, email_id: data?.id })
  } catch (err) {
    return NextResponse.json({ ...results, exception: String(err) }, { status: 500 })
  }
}
