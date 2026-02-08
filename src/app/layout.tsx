import type { Metadata } from 'next'
import './index.css'

export const metadata: Metadata = {
  title: 'AI Tests',
  description: 'AI test requests'
}

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang='ru'>
      <body>{children}</body>
    </html>
  )
}
