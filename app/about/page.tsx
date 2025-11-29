"use client";

import * as React from "react";
import Image from "next/image";
import { motion, useReducedMotion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Header } from "@/components/layout/header";
import { Brain } from "lucide-react";

const learningPrinciples = [
  "Inquiry-driven and experiential pedagogy",
  "Student-led projects and presentations",
  "Regular feedback and reflective assessments",
  "Interdisciplinary learning for concept mastery",
  "Emphasis on collaboration, creativity, and empathy",
];

export default function AboutPage() {
  const reduceMotion = useReducedMotion();

  const container = {
    hidden: { opacity: 0, y: 12 },
    show: {
      opacity: 1,
      y: 0,
      transition: { staggerChildren: 0.08, when: "beforeChildren" },
    },
  };

  const item = {
    hidden: { opacity: 0, y: 14 },
    show: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] },
    },
  };

  const card = (i = 0) => ({
    hidden: { opacity: 0, y: 12 },
    show: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.55,
        delay: 0.12 + i * 0.06,
        ease: [0.22, 1, 0.36, 1],
      },
    },
  });

  return (
    <main className="relative min-h-screen">
      <Header />

      {/* Hero Section */}
      <section className="relative min-h-screen w-full overflow-hidden pt-24">
        {/* Background Image */}
        <div className="absolute inset-0 z-0">
          <Image
            src="/images/about.png"
            alt="Classroom with teacher and students"
            fill
            priority
            className="object-cover"
            quality={90}
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-transparent to-black/30" />
        </div>

        {/* Yellow Overlay Box */}
        <div className="absolute bottom-0 left-0 right-0 z-10 container mx-auto px-4 sm:px-6 lg:px-8 pb-6 md:pb-8 lg:pb-10">
          <motion.div
            initial={reduceMotion ? undefined : { opacity: 0.5, y: 28 }}
            animate={reduceMotion ? { opacity: 1, y: 0 } : { opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="bg-[#E5B93C] rounded-lg p-6 md:p-8 lg:p-10 max-w-2xl shadow-2xl"
          >
            <div className="flex items-start gap-3 mb-5">
              <div className="w-1 h-14 md:h-16 bg-[#1C2C5B] rounded-full flex-shrink-0 mt-1" />
              <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-4xl font-display font-bold text-[#1C2C5B] leading-tight">
              A Legacy of Excellence Now in Hyderabad
              </h1>
            </div>

            <motion.p
              initial={reduceMotion ? undefined : { opacity: 0, y: 20 }}
              animate={
                reduceMotion ? { opacity: 1, y: 0 } : { opacity: 1, y: 0 }
              }
              transition={{ duration: 0.6, delay: 0.12, ease: "easeOut" }}
              className="text-base sm:text-lg text-gray-800 leading-relaxed mb-6 ml-3"
            >
            Doon International School, Dehradun’s legacy of global education and human values continues its journey in Hyderabad.
            </motion.p>

            <motion.div
              initial={reduceMotion ? undefined : { opacity: 0, y: 20 }}
              animate={
                reduceMotion ? { opacity: 1, y: 0 } : { opacity: 1, y: 0 }
              }
              transition={{ duration: 0.6, delay: 0.22, ease: "easeOut" }}
              className="flex flex-col sm:flex-row gap-3 ml-4"
            >
          
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* The Doon International Network Section */}
      <section className="py-16 md:py-24 bg-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            variants={container}
            initial={reduceMotion ? "show" : "hidden"}
            whileInView={reduceMotion ? "show" : "show"}
            viewport={{ once: true, amount: 0.2 }}
          >
            {/* Title */}
            <motion.h2
              variants={item}
              className="text-3xl sm:text-4xl md:text-5xl font-serif font-bold text-[#1C2C5B] mb-12 md:mb-16"
            >
              The Doon International Network
            </motion.h2>

            {/* Main Content: Image + Text Panel */}
            <motion.div
              variants={item}
              className="grid grid-cols-1 lg:grid-cols-5 gap-0 bg-white rounded-lg overflow-hidden shadow-2xl"
            >
              {/* Left Side: Image (60% = 3/5) */}
              <div className="lg:col-span-3 relative h-64 sm:h-80 md:h-96 lg:h-[500px]">
                <Image
                  src="/images/doon-old.png"
                  alt="Doon International School building"
                  fill
                  className="object-cover"
                  priority={false}
                />
              </div>

              {/* Right Side: Text Panel (40% = 2/5) */}
              <div className="lg:col-span-2 bg-[#1C2C5B] p-8 md:p-10 lg:p-12 flex flex-col justify-center">
                {/* Paragraph */}
                <motion.p
                  variants={item}
                  className="text-white text-base sm:text-lg leading-relaxed mb-8 font-sans"
                >
                  Founded in Dehradun in 1993, Doon International School is one of
                  India&apos;s premier educational institutions known for its commitment
                  to academic excellence and holistic development. With campuses across
                  India, the Hyderabad branch brings this trusted legacy to the City of
                  Pearls.
                </motion.p>

                {/* Bullet Points in Lighter Blue Box */}
                <motion.div
                  variants={item}
                  className="bg-[#effcff] rounded-lg p-6 space-y-4"
                >
                  <div className="text-[#1C2C5B] font-sans space-y-3">
                    <div className="flex items-start gap-3">
                      <span className="text-[#1C2C5B] mt-1 font-bold">•</span>
                      <span className="text-base sm:text-lg font-medium">30+ Years of Academic Leadership</span>
                    </div>
                    <div className="flex items-start gap-3">
                      <span className="text-[#1C2C5B] mt-1 font-bold">•</span>
                      <span className="text-base sm:text-lg font-medium">Global Teaching Pedagogies</span>
                    </div>
                    <div className="flex items-start gap-3">
                      <span className="text-[#1C2C5B] mt-1 font-bold">•</span>
                      <span className="text-base sm:text-lg font-medium">10000+ Alumni Across the Globe</span>
                    </div>
                    <div className="flex items-start gap-3">
                      <span className="text-[#1C2C5B] mt-1 font-bold">•</span>
                      <span className="text-base sm:text-lg font-medium">Award-winning Network of Schools</span>
                    </div>
                  </div>
                </motion.div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>

 
    </main>
  );
}
