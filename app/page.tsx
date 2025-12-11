"use client"

import { Header } from "@/components/layout/header"
import { EnquiryFormSection } from "@/components/sections/enquiry-form"
import { Hero } from "@/components/sections/homescreen"
import { WhyDisSection } from "@/components/sections/screen-2"
import ScreenThree from "@/components/sections/screen-3"

export default function Home() {
  return (
    <main className="relative min-h-screen">
      <Header />
      <Hero />
      <WhyDisSection />
      <ScreenThree />
      <EnquiryFormSection />
    </main>
  )
}
