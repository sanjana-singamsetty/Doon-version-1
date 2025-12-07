import type { Metadata } from "next"
import { poppins, crimsonPro } from "@/lib/fonts"
import "./globals.css"

export const metadata: Metadata = {
  title: "Doon International School Hyderabad",
  description: "Where Curiosity Becomes Capability - CBSE and IB pathways where learning meets innovation",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={`${poppins.variable} ${crimsonPro.variable} font-sans`}>{children}</body>
    </html>
  )
}
