'use client'

import { Suspense, useEffect, useState, useRef } from 'react'
import { useSearchParams } from 'next/navigation'
import Link from 'next/link'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import {
  CheckCircle, Download, Copy, Check, Printer, QrCode, CalendarDays, MapPin, ExternalLink, Loader2
} from 'lucide-react'

function ConfirmationContent() {
  const searchParams = useSearchParams()
  const token = searchParams.get('token') ?? ''
  const nom = searchParams.get('nom') ?? 'Ma brocante'
  const date = searchParams.get('date') ?? ''
  const ville = searchParams.get('ville') ?? ''

  const [qrDataUrl, setQrDataUrl] = useState('')
  const [copied, setCopied] = useState(false)
  const [qrError, setQrError] = useState(false)
  const printRef = useRef<HTMLDivElement>(null)

  const standUrl = `https://brocanteradar.fr/stand/${token}`
  const dateFormatted = date
    ? new Date(date + 'T00:00:00').toLocaleDateString('fr-FR', {
        weekday: 'long', day: 'numeric', month: 'long', year: 'numeric'
      })
    : ''

  // Générer le QR code côté client
  useEffect(() => {
    if (!token) return
    import('qrcode').then(QRCode => {
      QRCode.toDataURL(standUrl, {
        width: 400,
        margin: 2,
        color: { dark: '#0D1B4B', light: '#FFFFFF' },
        errorCorrectionLevel: 'H',
      }).then(url => {
        setQrDataUrl(url)
      }).catch(() => setQrError(true))
    }).catch(() => setQrError(true))
  }, [token, standUrl])

  // Copier le lien
  async function copyLink() {
    await navigator.clipboard.writeText(standUrl)
    setCopied(true)
    setTimeout(() => setCopied(false), 2500)
  }

  // Télécharger le QR code en PNG
  function downloadQr() {
    if (!qrDataUrl) return
    const a = document.createElement('a')
    a.href = qrDataUrl
    a.download = `qr-brocante-${token.substring(0, 8)}.png`
    a.click()
  }

  // Imprimer la fiche PDF
  function printPdf() {
    if (!printRef.current) return
    const printContents = printRef.current.innerHTML
    const win = window.open('', '_blank', 'width=800,height=900')
    if (!win) return
    win.document.write(`
      <!DOCTYPE html>
      <html lang="fr">
      <head>
        <meta charset="UTF-8">
        <title>QR Code — ${nom}</title>
        <style>
          * { margin: 0; padding: 0; box-sizing: border-box; }
          body { font-family: Arial, sans-serif; background: white; display: flex; justify-content: center; align-items: center; min-height: 100vh; }
          .print-card {
            width: 400px;
            padding: 40px;
            text-align: center;
            border: 3px solid #0D1B4B;
            border-radius: 24px;
          }
          .logo { font-size: 11px; font-weight: bold; letter-spacing: 2px; color: #4A5680; text-transform: uppercase; margin-bottom: 4px; }
          .title { font-size: 22px; font-weight: 900; color: #0D1B4B; margin-bottom: 8px; }
          .subtitle { font-size: 13px; color: #4A5680; margin-bottom: 6px; }
          .qr { margin: 24px auto; display: block; width: 240px; height: 240px; }
          .instruction { font-size: 15px; font-weight: bold; color: #E8651A; margin: 20px 0 8px; }
          .url { font-size: 11px; color: #9AABCC; word-break: break-all; }
          .divider { border: none; border-top: 1px solid #EEF4FF; margin: 20px 0; }
          @media print { body { -webkit-print-color-adjust: exact; print-color-adjust: exact; } }
        </style>
      </head>
      <body>
        <div class="print-card">
          <p class="logo">Brocante Radar</p>
          <h1 class="title">${nom}</h1>
          ${dateFormatted ? `<p class="subtitle">📅 ${dateFormatted}</p>` : ''}
          ${ville ? `<p class="subtitle">📍 ${ville}</p>` : ''}
          <hr class="divider">
          ${qrDataUrl ? `<img class="qr" src="${qrDataUrl}" alt="QR Code stand" />` : '<p>QR code</p>'}
          <p class="instruction">📲 Scannez ce QR code pour publier votre stand</p>
          <p class="url">${standUrl}</p>
        </div>
      </body>
      </html>
    `)
    win.document.close()
    win.focus()
    setTimeout(() => { win.print(); win.close() }, 500)
  }

  if (!token) {
    return (
      <div className="text-center py-20">
        <p className="text-red-600">Lien invalide. <Link href="/organisateur" className="underline text-[#E8651A]">Retour</Link></p>
      </div>
    )
  }

  return (
    <div className="max-w-2xl mx-auto">

      {/* Succès */}
      <div className="text-center mb-10">
        <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-5">
          <CheckCircle className="w-10 h-10 text-green-500" />
        </div>
        <h1 className="text-3xl font-black text-[#0D1B4B] mb-2">Votre brocante est créée !</h1>
        <p className="text-[#4A5680]">Distribuez ce QR code à vos exposants pour qu&apos;ils publient leur stand.</p>
      </div>

      {/* Fiche événement */}
      <div className="bg-white rounded-3xl border border-blue-100 shadow-sm p-6 mb-6">
        <div className="flex items-start gap-3 mb-4">
          <div className="w-10 h-10 bg-[#EEF4FF] rounded-xl flex items-center justify-center shrink-0">
            <QrCode className="w-5 h-5 text-[#0D1B4B]" />
          </div>
          <div>
            <h2 className="font-black text-[#0D1B4B] text-lg">{nom}</h2>
            {dateFormatted && (
              <p className="text-sm text-[#4A5680] flex items-center gap-1 mt-1">
                <CalendarDays className="w-3.5 h-3.5" /> {dateFormatted}
              </p>
            )}
            {ville && (
              <p className="text-sm text-[#4A5680] flex items-center gap-1 mt-0.5">
                <MapPin className="w-3.5 h-3.5" /> {ville}
              </p>
            )}
          </div>
        </div>
      </div>

      {/* QR Code */}
      <div ref={printRef} className="bg-white rounded-3xl border-2 border-[#0D1B4B] p-8 text-center mb-6">
        <p className="text-xs font-bold text-[#4A5680] uppercase tracking-widest mb-1">Brocante Radar</p>
        <h3 className="font-black text-[#0D1B4B] text-xl mb-1">{nom}</h3>
        {dateFormatted && <p className="text-sm text-[#4A5680] mb-4">📅 {dateFormatted} · 📍 {ville}</p>}

        <div className="flex items-center justify-center my-6 bg-[#EEF4FF] rounded-2xl p-6">
          {qrDataUrl ? (
            <img src={qrDataUrl} alt="QR code stand" className="w-48 h-48 sm:w-56 sm:h-56" />
          ) : qrError ? (
            <div className="w-48 h-48 flex items-center justify-center text-red-500 text-sm">Erreur QR</div>
          ) : (
            <div className="w-48 h-48 flex items-center justify-center">
              <Loader2 className="w-8 h-8 animate-spin text-[#E8651A]" />
            </div>
          )}
        </div>

        <p className="text-base font-bold text-[#E8651A] mb-1">📲 Scannez pour publier votre stand</p>
        <p className="text-xs text-[#9AABCC] break-all">{standUrl}</p>
      </div>

      {/* Actions */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mb-6">
        <button
          onClick={downloadQr}
          disabled={!qrDataUrl}
          className="flex items-center justify-center gap-2 bg-[#0D1B4B] hover:bg-[#162560] disabled:opacity-40 text-white font-semibold px-4 py-3 rounded-2xl transition-colors text-sm"
        >
          <Download className="w-4 h-4" /> Télécharger QR
        </button>

        <button
          onClick={printPdf}
          disabled={!qrDataUrl}
          className="flex items-center justify-center gap-2 bg-[#0D1B4B] hover:bg-[#162560] disabled:opacity-40 text-white font-semibold px-4 py-3 rounded-2xl transition-colors text-sm"
        >
          <Printer className="w-4 h-4" /> Imprimer / PDF
        </button>

        <button
          onClick={copyLink}
          className="flex items-center justify-center gap-2 bg-white border-2 border-[#0D1B4B] hover:bg-[#EEF4FF] text-[#0D1B4B] font-semibold px-4 py-3 rounded-2xl transition-colors text-sm"
        >
          {copied ? <><Check className="w-4 h-4 text-green-500" /> Copié !</> : <><Copy className="w-4 h-4" /> Copier le lien</>}
        </button>
      </div>

      {/* Lien direct */}
      <div className="bg-[#EEF4FF] rounded-2xl p-4 flex items-center gap-3 mb-8">
        <ExternalLink className="w-4 h-4 text-[#4A5680] shrink-0" />
        <div className="flex-1 min-w-0">
          <p className="text-xs text-[#4A5680] mb-0.5">Lien de partage pour vos exposants</p>
          <p className="text-sm font-semibold text-[#0D1B4B] truncate">{standUrl}</p>
        </div>
        <a
          href={standUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="text-xs font-semibold text-[#E8651A] hover:underline whitespace-nowrap"
        >
          Voir →
        </a>
      </div>

      {/* Instructions */}
      <div className="bg-white rounded-2xl border border-blue-100 p-5 space-y-3">
        <h3 className="font-black text-[#0D1B4B] text-sm">Comment utiliser votre QR code ?</h3>
        {[
          'Imprimez le QR code et affichez-le à l\'entrée de la brocante',
          'Envoyez le lien de partage par email ou WhatsApp aux exposants inscrits',
          'Les exposants scannent le QR code avec leur téléphone',
          'Ils remplissent leur fiche stand : photo + mots-clés en 2 minutes',
          'Les chineurs peuvent rechercher leurs articles en temps réel',
        ].map((step, i) => (
          <div key={i} className="flex items-start gap-3">
            <div className="w-5 h-5 bg-[#E8651A] rounded-full flex items-center justify-center text-white text-xs font-bold shrink-0 mt-0.5">{i + 1}</div>
            <p className="text-sm text-[#4A5680]">{step}</p>
          </div>
        ))}
      </div>

      <div className="text-center mt-8">
        <Link href="/organisateur" className="text-sm text-[#4A5680] hover:text-[#0D1B4B]">
          ← Créer une autre brocante
        </Link>
      </div>
    </div>
  )
}

export default function ConfirmationPage() {
  return (
    <>
      <Navbar />
      <main className="flex-1 bg-[#EEF4FF] min-h-screen px-4 py-14">
        <Suspense fallback={
          <div className="flex justify-center py-20">
            <Loader2 className="w-8 h-8 animate-spin text-[#E8651A]" />
          </div>
        }>
          <ConfirmationContent />
        </Suspense>
      </main>
      <Footer />
    </>
  )
}
