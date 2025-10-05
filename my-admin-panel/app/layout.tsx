import './globals.css'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'এডমিন প্যানেল',
  description: 'জোনাকী আইডিয়াল স্কুল',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="bn">
      <body>{children}</body>
    </html>
  )
}