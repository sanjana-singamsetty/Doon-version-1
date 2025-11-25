"use client"

import * as React from "react"
import Image from "next/image"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { ArrowRight } from "lucide-react"

export function Hero() {
  return (
    <section className="relative min-h-screen w-full overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/images/campus-img.png"
          alt="Doon International School Campus"
          fill
          priority
          className="object-cover"
          quality={90}
        />
        {/* Overlay for better text readability */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/30 to-black/50" />
      </div>

      {/* Content */}
      <div className="relative z-10 flex flex-col items-center justify-center min-h-screen pt-24 sm:pt-32 pb-16 px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="flex flex-col items-center space-y-6 sm:space-y-8 md:space-y-10 max-w-5xl mx-auto text-center"
        >
          {/* Logo */}
          <motion.div
  initial={{ opacity: 0, scale: 0.9 }}
  animate={{ opacity: 1, scale: 1 }}
  transition={{ duration: 0.6, delay: 0.2, ease: "easeOut" }}
  className="flex flex-col items-center mb-6 sm:mb-8 w-full"
>
  <div className="relative w-full max-w-[21.6vw] sm:max-w-[19.4vw] md:max-w-[17.1vw] lg:max-w-[203px] xl:max-w-[271px] 2xl:max-w-[316px]">
    <Image
      src="/images/doon-logo.png"
      alt="Doon International School Logo"
      width={2000}
      height={2000}
      className="w-full h-auto object-contain drop-shadow-2xl"
      priority
      sizes="(max-width: 640px) 21.6vw, (max-width: 1024px) 19.4vw, (max-width: 1280px) 203px, 316px"
    />
  </div>
</motion.div>







          {/* Main Heading */}
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6, ease: "easeOut" }}
            className="text-4xl font-display font-bold text-white leading-[1.1] drop-shadow-2xl mb-6"
          >
            Where Curiosity Becomes Capability
          </motion.h1>

          {/* Description */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.8, ease: "easeOut" }}
            className="text-lg sm:text-xl md:text-xl text-white max-w-4xl leading-relaxed drop-shadow-lg mb-8 px-4"
          >
            Doon International School Hyderabad offers CBSE and IB pathways where
            learning meets innovation.
          </motion.p>

          {/* CTA Button */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1, ease: "easeOut" }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Button
              size="lg"
              className="bg-yellow-400 hover:bg-yellow-500 text-gray-900 font-bold px-10 py-4 text-lg sm:text-xl rounded-lg shadow-xl hover:shadow-2xl transition-all duration-300 group"
            >
              Learn more
              <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Button>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}

