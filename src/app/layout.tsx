import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import { ThemeProvider } from '@/components/theme-provider'
import { Toaster } from '@/components/ui/sonner'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'TrendScope - Social Media Trends Dashboard',
  description: 'Discover trending content across all social media platforms. Track what\'s viral, analyze engagement, and get AI-powered insights to boost your social media presence.',
  keywords: 'social media trends, viral content, influencer tools, engagement analytics, content discovery',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <div className="min-h-screen bg-background">
            {children}
          </div>
          <Toaster />
        </ThemeProvider>
      </body>
    </html>
  )
}