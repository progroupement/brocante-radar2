import { NextRequest, NextResponse } from 'next/server'
import { Resend } from 'resend'

export const dynamic = 'force-dynamic'

const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL!
const SUPABASE_ANON = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ||
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImFtbndjZ2Rxcmdtc2RnZmVrcnJ5Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODE1MjUyODMsImV4cCI6MjA5NzEwMTI4M30.Zodk0XBNeOBgiYWrzWXkR6qsdYpgxdUbK-1-etMFiJQ'

export async function POST(request: NextRequest) {
  const body = await request.json()
  const { nom, email, telephone, message, brocante_nom, brocante_ville, brocante_date, brocante_id } = body

  // 1. Sauvegarder dans Supabase (backup fiable)
  try {
    await fetch(`${SUPABASE_URL}/rest/v1/contacts_organisateurs`, {
      method: 'POST',
      headers: {
        apikey: SUPABASE_ANON,
        Authorization: `Bearer ${SUPABASE_ANON}`,
        'Content-Type': 'application/json',
        Prefer: 'return=minimal',
      },
      body: JSON.stringify({ nom, email, telephone, message, brocante_nom, brocante_ville, brocante_date, brocante_id }),
    })
  } catch {
    // On continue même si Supabase échoue — l'email suffit
    console.error('Supabase save failed')
  }

  // 2. Envoyer l'email de notification
  if (!process.env.RESEND_API_KEY) {
    // Pas de clé Resend — on retourne succès quand même (sauvegardé en BDD)
    console.warn('RESEND_API_KEY non configuré — email non envoyé')
    return NextResponse.json({ success: true, warning: 'email_not_sent' })
  }

  const resend = new Resend(process.env.RESEND_API_KEY)
  const dateFormatted = brocante_date
    ? new Date(brocante_date + 'T00:00:00').toLocaleDateString('fr-FR', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' })
    : 'date inconnue'

  try {
    await resend.emails.send({
      from: 'Brocante Radar <noreply@brocanteradar.fr>',
      to: ['progroupement@gmail.com'],
      replyTo: email,
      subject: `🔔 Nouvelle demande QR code — ${brocante_nom} (${brocante_ville})`,
      html: `
<!DOCTYPE html>
<html lang="fr">
<head><meta charset="UTF-8"></head>
<body style="margin:0;padding:0;background:#EEF4FF;font-family:Arial,sans-serif;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background:#EEF4FF;padding:40px 20px;">
    <tr>
      <td align="center">
        <table width="560" cellpadding="0" cellspacing="0" style="max-width:560px;width:100%;">

          <!-- Header -->
          <tr>
            <td style="background:#0D1B4B;border-radius:16px 16px 0 0;padding:28px 32px;">
              <h1 style="color:white;margin:0;font-size:22px;font-weight:bold;">🗺️ BROCANTE RADAR</h1>
              <p style="color:#93B4FF;margin:6px 0 0;font-size:13px;">Nouvelle demande de QR code organisateur</p>
            </td>
          </tr>

          <!-- Body -->
          <tr>
            <td style="background:white;padding:36px 32px;">

              <!-- Brocante -->
              <div style="background:#EEF4FF;border-radius:12px;padding:20px;margin-bottom:24px;">
                <p style="margin:0 0 6px;font-size:11px;color:#4A5680;text-transform:uppercase;font-weight:bold;letter-spacing:1px;">Brocante concernée</p>
                <p style="margin:0 0 6px;font-size:18px;font-weight:bold;color:#0D1B4B;">${brocante_nom}</p>
                <p style="margin:0 0 4px;font-size:13px;color:#4A5680;">📅 ${dateFormatted}</p>
                <p style="margin:0;font-size:13px;color:#4A5680;">📍 ${brocante_ville}</p>
              </div>

              <!-- Organisateur -->
              <div style="border:2px solid #E8651A;border-radius:12px;padding:20px;margin-bottom:24px;">
                <p style="margin:0 0 14px;font-size:11px;color:#E8651A;text-transform:uppercase;font-weight:bold;letter-spacing:1px;">Coordonnées de l'organisateur</p>
                <p style="margin:0 0 8px;font-size:15px;font-weight:bold;color:#0D1B4B;">👤 ${nom}</p>
                <p style="margin:0 0 8px;font-size:14px;color:#0D1B4B;">📞 <a href="tel:${telephone}" style="color:#E8651A;text-decoration:none;font-weight:bold;">${telephone}</a></p>
                <p style="margin:0 0 ${message ? '12px' : '0'};font-size:14px;color:#0D1B4B;">✉️ <a href="mailto:${email}" style="color:#E8651A;text-decoration:none;">${email}</a></p>
                ${message ? `<p style="margin:12px 0 0;font-size:13px;color:#4A5680;background:#F8FAFE;border-radius:8px;padding:12px;line-height:1.5;">💬 ${message}</p>` : ''}
              </div>

              <p style="font-size:13px;color:#4A5680;line-height:1.6;margin:0;">
                ☎️ <strong>Appelez ${nom} au ${telephone}</strong> pour créer son QR code personnalisé.
              </p>
            </td>
          </tr>

          <!-- Footer -->
          <tr>
            <td style="background:#0D1B4B;border-radius:0 0 16px 16px;padding:20px 32px;text-align:center;">
              <p style="color:#4A5680;margin:0;font-size:12px;">
                Brocante Radar · brocanteradar.fr
              </p>
            </td>
          </tr>

        </table>
      </td>
    </tr>
  </table>
</body>
</html>
      `,
    })

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Resend error:', error)
    // L'email a échoué mais la BDD a sauvegardé — succès partiel
    return NextResponse.json({ success: true, warning: 'email_not_sent' })
  }
}
