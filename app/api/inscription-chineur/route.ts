import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@supabase/supabase-js'
import { Resend } from 'resend'

const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://amnwcgdqrgmsdgfekrry.supabase.co'
const SUPABASE_KEY = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImFtbndjZ2Rxcmdtc2RnZmVrcnJ5Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODE1MjUyODMsImV4cCI6MjA5NzEwMTI4M30.Zodk0XBNeOBgiYWrzWXkR6qsdYpgxdUbK-1-etMFiJQ'

const DEPT_LABELS: Record<string, string> = {
  '75': 'Paris', '77': 'Seine-et-Marne', '78': 'Yvelines',
  '91': 'Essonne', '92': 'Hauts-de-Seine', '93': 'Seine-Saint-Denis',
  '94': 'Val-de-Marne', '95': "Val-d'Oise",
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json()
    const { prenom, email, departement, objet_recherche, notifications } = body

    if (!prenom || !email) {
      return NextResponse.json({ error: 'Prénom et email requis' }, { status: 400 })
    }

    const supabase = createClient(SUPABASE_URL, SUPABASE_KEY)

    const { error } = await supabase.from('profils_chineurs').insert({
      prenom,
      email,
      departement: departement || null,
      objet_recherche: objet_recherche || null,
      notifications: notifications ?? false,
    })

    if (error) {
      console.error('Supabase error:', error)
      if (error.code !== '42P01') {
        return NextResponse.json({ error: "Erreur lors de l'inscription" }, { status: 500 })
      }
    }

    // Notification email à progroupement@gmail.com
    if (process.env.RESEND_API_KEY) {
      try {
        const resend = new Resend(process.env.RESEND_API_KEY)
        const deptLabel = departement ? `${departement} — ${DEPT_LABELS[departement] ?? departement}` : 'Non précisé'

        await resend.emails.send({
          from: 'Brocante Radar <noreply@brocanteradar.fr>',
          to: ['progroupement@gmail.com'],
          subject: `🔍 Nouveau chineur inscrit — ${prenom}`,
          html: `
            <div style="font-family: Arial, sans-serif; max-width: 500px; margin: 0 auto; padding: 24px;">
              <h2 style="color: #0D1B4B; margin-bottom: 4px;">Nouveau profil chineur</h2>
              <p style="color: #4A5680; margin-top: 0; margin-bottom: 24px;">Un chineur vient de s'inscrire sur Brocante Radar.</p>

              <table style="width: 100%; border-collapse: collapse;">
                <tr style="border-bottom: 1px solid #EEF4FF;">
                  <td style="padding: 10px 0; color: #4A5680; font-size: 14px; width: 140px;">Prénom</td>
                  <td style="padding: 10px 0; font-weight: bold; color: #0D1B4B;">${prenom}</td>
                </tr>
                <tr style="border-bottom: 1px solid #EEF4FF;">
                  <td style="padding: 10px 0; color: #4A5680; font-size: 14px;">Email</td>
                  <td style="padding: 10px 0; font-weight: bold; color: #E8651A;">
                    <a href="mailto:${email}" style="color: #E8651A;">${email}</a>
                  </td>
                </tr>
                <tr style="border-bottom: 1px solid #EEF4FF;">
                  <td style="padding: 10px 0; color: #4A5680; font-size: 14px;">Département</td>
                  <td style="padding: 10px 0; color: #0D1B4B;">${deptLabel}</td>
                </tr>
                <tr style="border-bottom: 1px solid #EEF4FF;">
                  <td style="padding: 10px 0; color: #4A5680; font-size: 14px;">Objet recherché</td>
                  <td style="padding: 10px 0; font-weight: bold; color: #0D1B4B;">${objet_recherche || '—'}</td>
                </tr>
                <tr>
                  <td style="padding: 10px 0; color: #4A5680; font-size: 14px;">Notifications</td>
                  <td style="padding: 10px 0; color: #0D1B4B;">${notifications ? '✅ Oui' : '❌ Non'}</td>
                </tr>
              </table>
            </div>
          `,
        })
      } catch (emailErr) {
        console.error('Email error:', emailErr)
        // On continue même si l'email échoue
      }
    }

    return NextResponse.json({ success: true })
  } catch (err) {
    console.error('API error:', err)
    return NextResponse.json({ error: 'Erreur serveur' }, { status: 500 })
  }
}
