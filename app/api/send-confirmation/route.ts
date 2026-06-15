import { NextRequest, NextResponse } from 'next/server'
import { Resend } from 'resend'

const resend = new Resend(process.env.RESEND_API_KEY)

export async function POST(request: NextRequest) {
  const { nom, email, nomBrocante, date, adresse, ville, qrCodeUrl, dashboardUrl } = await request.json()

  const dateFormatted = new Date(date).toLocaleDateString('fr-FR', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  })

  try {
    await resend.emails.send({
      from: 'Brocante Radar <noreply@brocante-radar.fr>',
      to: email,
      subject: `✅ Votre brocante "${nomBrocante}" est inscrite !`,
      html: `
<!DOCTYPE html>
<html lang="fr">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
</head>
<body style="margin:0;padding:0;background:#F8F5F0;font-family:Arial,sans-serif;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background:#F8F5F0;padding:40px 20px;">
    <tr>
      <td align="center">
        <table width="600" cellpadding="0" cellspacing="0" style="max-width:600px;width:100%;">

          <!-- Header -->
          <tr>
            <td style="background:#E8651A;border-radius:16px 16px 0 0;padding:32px;text-align:center;">
              <h1 style="color:white;margin:0;font-size:28px;font-weight:bold;letter-spacing:-0.5px;">
                🗺️ BROCANTE RADAR
              </h1>
              <p style="color:rgba(255,255,255,0.85);margin:8px 0 0;font-size:15px;">
                Le GPS des chineurs
              </p>
            </td>
          </tr>

          <!-- Body -->
          <tr>
            <td style="background:white;padding:40px 32px;">
              <h2 style="color:#1A1A1A;margin:0 0 8px;font-size:22px;">
                Bonjour ${nom} ! 🎉
              </h2>
              <p style="color:#6B6B6B;margin:0 0 24px;font-size:15px;line-height:1.6;">
                Votre brocante est bien inscrite sur Brocante Radar. Voici un récapitulatif :
              </p>

              <!-- Event card -->
              <table width="100%" cellpadding="0" cellspacing="0" style="background:#F8F5F0;border-radius:12px;padding:24px;margin-bottom:28px;">
                <tr>
                  <td>
                    <p style="margin:0 0 12px;font-size:18px;font-weight:bold;color:#1A1A1A;">
                      ${nomBrocante}
                    </p>
                    <p style="margin:0 0 6px;color:#6B6B6B;font-size:14px;">
                      📅 ${dateFormatted}
                    </p>
                    <p style="margin:0;color:#6B6B6B;font-size:14px;">
                      📍 ${adresse}, ${ville}
                    </p>
                  </td>
                </tr>
              </table>

              <!-- QR Code section -->
              <table width="100%" cellpadding="0" cellspacing="0" style="border:2px solid #E8651A;border-radius:12px;padding:24px;margin-bottom:28px;text-align:center;">
                <tr>
                  <td>
                    <p style="margin:0 0 8px;font-weight:bold;color:#1A1A1A;font-size:16px;">
                      📱 Votre QR Code exposant
                    </p>
                    <p style="margin:0 0 20px;color:#6B6B6B;font-size:14px;line-height:1.5;">
                      Affichez ce QR code à l'entrée de votre brocante.<br>
                      Les exposants le scannent pour publier leur stand.
                    </p>
                    <a href="${qrCodeUrl}"
                       style="display:inline-block;background:#E8651A;color:white;text-decoration:none;padding:14px 32px;border-radius:12px;font-weight:bold;font-size:15px;">
                      Voir mon QR Code →
                    </a>
                  </td>
                </tr>
              </table>

              <!-- Steps -->
              <p style="font-weight:bold;color:#1A1A1A;margin:0 0 16px;font-size:15px;">
                Prochaines étapes :
              </p>
              <table width="100%" cellpadding="0" cellspacing="0">
                ${[
                  ['1', 'Téléchargez et imprimez le PDF depuis votre espace'],
                  ['2', 'Affichez le QR code à l\'entrée de votre brocante'],
                  ['3', 'Invitez vos exposants à scanner pour publier leurs stands'],
                  ['4', 'Les visiteurs peuvent rechercher des objets en temps réel !'],
                ].map(([num, text]) => `
                <tr>
                  <td style="padding:6px 0;">
                    <table cellpadding="0" cellspacing="0">
                      <tr>
                        <td style="width:28px;height:28px;background:#E8651A;border-radius:50%;text-align:center;vertical-align:middle;">
                          <span style="color:white;font-weight:bold;font-size:13px;">${num}</span>
                        </td>
                        <td style="padding-left:12px;color:#1A1A1A;font-size:14px;">${text}</td>
                      </tr>
                    </table>
                  </td>
                </tr>`).join('')}
              </table>

              <div style="margin-top:32px;text-align:center;">
                <a href="${dashboardUrl}"
                   style="display:inline-block;border:2px solid #E8651A;color:#E8651A;text-decoration:none;padding:12px 28px;border-radius:12px;font-weight:bold;font-size:14px;">
                  Accéder à mon tableau de bord
                </a>
              </div>
            </td>
          </tr>

          <!-- Footer -->
          <tr>
            <td style="background:#1A1A1A;border-radius:0 0 16px 16px;padding:24px;text-align:center;">
              <p style="color:#6B6B6B;margin:0;font-size:13px;">
                Brocante Radar — Le GPS des chineurs<br>
                <a href="${process.env.NEXT_PUBLIC_APP_URL}" style="color:#E8651A;text-decoration:none;">
                  brocante-radar.fr
                </a>
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
    return NextResponse.json({ error: 'Email non envoyé' }, { status: 500 })
  }
}
