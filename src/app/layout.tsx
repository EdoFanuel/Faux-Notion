import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import PrelineScript from '@/scripts/PrelineScript'
import './globals.css'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Faux Notion',
  description: 'Simulate a Notion page',
}

export default function RootLayout({children}: {children: React.ReactNode}) {
  return (
    <html lang="en">
      <PrelineScript/>
      <body className={inter.className}>
        {children}
      </body>
    </html>
  )
}
