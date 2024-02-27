import './styles/globals.css';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import { GoogleAnalytics } from '@next/third-parties/google';


const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Customnections',
  description: 'Make your own version of the Connections game',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang='en'>
      <body className={ inter.className }>{ children }</body>
      <GoogleAnalytics gaId='G-NSN3DPVQ39' />
    </html>
  )
}
