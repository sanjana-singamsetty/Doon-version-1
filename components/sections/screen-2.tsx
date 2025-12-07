"use client"

import * as React from "react"
import Image from "next/image"
import { motion } from "framer-motion"
import { Check } from "lucide-react"

const advantages = [
  "Dual Curriculum Advantage: CBSE and IB pathways for diverse learning styles.",
  "Global Pedagogy: Inquiry-based learning that builds lifelong skills",
  "Safe & Secure Campus: CCTV surveilled, trained staff, medical care, and wellbeing programs.",
  "Expert Faculty: Qualified educators trained in modern pedagogies.",
  "Beyond the Classroom: Arts, sports, and community engagement opportunities.",
]

export function WhyDisSection() {
  return (
    <section className="relative w-full bg-[#1e3a8a] overflow-hidden">
      {/* Blurred Outdoor Scene at Top */}
      <div className="relative h-24 sm:h-32 md:h-40 overflow-hidden">
        <Image
          src="/images/campus-img.png"
          alt="Campus Scene"
          fill
          className="object-cover blur-md scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent to-[#1e3a8a]" />
      </div>

      {/* Main Content */}
      <div className="relative bg-[#1e3a8a] py-12 sm:py-16 md:py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          {/* Title at Top Left */}
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-3xl sm:text-4xl md:text-5xl font-display font-bold text-yellow-400 mb-8 sm:mb-10"
          >
            Why DIS Hyderabad
          </motion.h2>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 lg:items-stretch">
            {/* Left Side - Image */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.6, ease: "easeOut" }}
              className="flex lg:h-full"
            >
              <div className="relative w-full rounded-xl overflow-hidden shadow-2xl bg-blue-950/20 flex items-center justify-center min-h-[500px] lg:min-h-0 lg:h-full">
                <Image
                  src="/images/girl.jpg"
                  alt="Student learning at DIS Hyderabad"
                  width={600}
                  height={900}
                  className="w-full h-full object-contain"
                />
              </div>
            </motion.div>

            {/* Right Side - Content */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.6, ease: "easeOut" }}
              className="space-y-6"
            >
              {/* Introductory Paragraph */}
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="text-lg sm:text-xl md:text-2xl text-white leading-relaxed font-display"
              >
                A legacy of excellence from{" "}
                <span className="text-yellow-400 font-semibold">Dehradun</span>, now in{" "}
                <span className="text-yellow-400 font-semibold">Hyderabad</span>; offering
                world-class infrastructure, holistic education, and a nurturing environment
                for young minds.
              </motion.p>

              {/* Advantages List - Numbered */}
              <motion.ol
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.3 }}
                className="space-y-3 sm:space-y-4 list-decimal list-inside"
              >
                {advantages.map((advantage, index) => (
                  <motion.li
                    key={index}
                    initial={{ opacity: 0, x: 20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.4, delay: 0.4 + index * 0.1 }}
                    className="text-white text-sm sm:text-base leading-relaxed marker:text-yellow-400 marker:font-bold"
                  >
                    {advantage}
                  </motion.li>
                ))}
              </motion.ol>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  )
}
