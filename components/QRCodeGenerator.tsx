'use client'

import { useEffect, useRef, useState } from 'react'
import { Button } from '@/components/ui/button'
import { Download, Copy, Check } from 'lucide-react'

interface QRCodeGeneratorProps {
  url: string
  eventNom: string
  eventDate: string
  eventAdresse: string
  eventId: string
}

export default function QRCodeGenerator({
  url,
  eventNom,
  eventDate,
  eventAdresse,
  eventId,
}: QRCodeGeneratorProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const [copied, setCopied] = useState(false)
  const [qrDataUrl, setQrDataUrl] = useState('')

  useEffect(() => {
    async function generateQR() {
      const QRCode = (await import('qrcode')).default
      if (canvasRef.current) {
        await QRCode.toCanvas(canvasRef.current, url, {
          width: 300,
          margin: 2,
          color: { dark: '#1A1A1A', light: '#ffffff' },
        })
        setQrDataUrl(canvasRef.current.toDataURL('image/png'))
      }
    }
    generateQR()
  }, [url])

  async function downloadPDF() {
    const { jsPDF } = await import('jspdf')
    const doc = new jsPDF({ orientation: 'portrait', unit: 'mm', format: 'a4' })

    const pageW = 210
    const pageH = 297

    // Fond blanc
    doc.setFillColor(255, 255, 255)
    doc.rect(0, 0, pageW, pageH, 'F')

    // Bandeau orange en-tête
    doc.setFillColor(232, 101, 26)
    doc.rect(0, 0, pageW, 40, 'F')

    // Logo / titre
    doc.setTextColor(255, 255, 255)
    doc.setFontSize(26)
    doc.setFont('helvetica', 'bold')
    doc.text('BROCANTE RADAR', pageW / 2, 22, { align: 'center' })
    doc.setFontSize(12)
    doc.setFont('helvetica', 'normal')
    doc.text('Le GPS des chineurs', pageW / 2, 32, { align: 'center' })

    // Infos événement
    doc.setTextColor(26, 26, 26)
    doc.setFontSize(18)
    doc.setFont('helvetica', 'bold')
    doc.text(eventNom, pageW / 2, 58, { align: 'center' })

    doc.setFontSize(13)
    doc.setFont('helvetica', 'normal')
    doc.setTextColor(107, 107, 107)
    doc.text(new Date(eventDate).toLocaleDateString('fr-FR', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' }), pageW / 2, 68, { align: 'center' })
    doc.text(eventAdresse, pageW / 2, 76, { align: 'center' })

    // QR code centré
    if (qrDataUrl) {
      const qrSize = 100
      const qrX = (pageW - qrSize) / 2
      doc.addImage(qrDataUrl, 'PNG', qrX, 90, qrSize, qrSize)
    }

    // Cadre autour du QR
    doc.setDrawColor(232, 101, 26)
    doc.setLineWidth(1)
    doc.roundedRect((pageW - 106) / 2, 87, 106, 106, 4, 4)

    // Instructions
    doc.setFontSize(16)
    doc.setFont('helvetica', 'bold')
    doc.setTextColor(26, 26, 26)
    doc.text('📱 Comment publier votre stand ?', pageW / 2, 210, { align: 'center' })

    const steps = [
      '1. Scannez ce QR code avec votre smartphone',
      '2. Entrez le numéro de votre stand',
      '3. Ajoutez une photo et vos mots-clés',
      '4. Publiez — les visiteurs vous trouvent !',
    ]

    doc.setFontSize(12)
    doc.setFont('helvetica', 'normal')
    doc.setTextColor(50, 50, 50)
    steps.forEach((step, i) => {
      doc.text(step, pageW / 2, 222 + i * 9, { align: 'center' })
    })

    // URL de secours
    doc.setDrawColor(240, 240, 240)
    doc.setFillColor(248, 245, 240)
    doc.roundedRect(20, 258, pageW - 40, 18, 3, 3, 'FD')
    doc.setFontSize(9)
    doc.setTextColor(107, 107, 107)
    doc.text('Lien de secours :', 25, 266)
    doc.setTextColor(232, 101, 26)
    doc.text(url, 55, 266)

    // Pied de page
    doc.setFillColor(248, 245, 240)
    doc.rect(0, 280, pageW, 17, 'F')
    doc.setFontSize(9)
    doc.setTextColor(107, 107, 107)
    doc.text('brocante-radar.fr · Île-de-France · Accès gratuit pour les exposants', pageW / 2, 290, { align: 'center' })

    doc.save(`QR_${eventId}_brocante-radar.pdf`)
  }

  async function copyLink() {
    await navigator.clipboard.writeText(url)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <div className="flex flex-col items-center gap-6">
      {/* QR Code */}
      <div className="relative">
        <div className="p-4 bg-white rounded-2xl shadow-sm border border-gray-100">
          <canvas ref={canvasRef} className="block" />
        </div>
        <div className="absolute -bottom-3 left-1/2 -translate-x-1/2 bg-[#E8651A] text-white text-xs font-bold px-3 py-1 rounded-full whitespace-nowrap">
          Scanner pour s'inscrire
        </div>
      </div>

      {/* Lien */}
      <div className="w-full bg-[#F8F5F0] rounded-xl p-3 text-sm text-[#6B6B6B] break-all text-center mt-2">
        {url}
      </div>

      {/* Actions */}
      <div className="flex flex-col sm:flex-row gap-3 w-full">
        <Button onClick={downloadPDF} className="flex-1 gap-2">
          <Download className="w-4 h-4" />
          Télécharger le PDF
        </Button>
        <Button onClick={copyLink} variant="outline" className="flex-1 gap-2">
          {copied ? <Check className="w-4 h-4 text-green-500" /> : <Copy className="w-4 h-4" />}
          {copied ? 'Lien copié !' : 'Copier le lien'}
        </Button>
      </div>
    </div>
  )
}
