import type React from "react"
import type { Metadata } from "next"
import { Space_Grotesk, Inter, JetBrains_Mono } from "next/font/google"
import { ThemeProvider } from "@/components/theme-provider"
import { Suspense } from "react"
import "./globals.css"

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-space-grotesk",
  display: "swap",
})

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
})

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-jetbrains-mono",
  display: "swap",
})

export const metadata: Metadata = {
  title: "Việt Ngô Quang - Software Engineer",
  openGraph: {
    title: "Viet's Portfolio - Software Engineer",
  },
  description:
    "Personal portfolio of Viet - Software Engineer, Tech Explorer, and Creator. Showcasing projects developed by me and my team.",
  generator: "v0.app",
  icons: {
    icon: "/favicon.ico",
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="icon" href="/favicon.ico" />
      </head>
      <body className={`${spaceGrotesk.variable} ${inter.variable} ${jetbrainsMono.variable} font-inter antialiased`}>
        <Suspense fallback={null}>
          <ThemeProvider attribute="class" defaultTheme="dark" enableSystem={false}>
            {children}
          </ThemeProvider>
        </Suspense>
      </body>
    </html>
  )
}
