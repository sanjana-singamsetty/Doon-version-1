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

export default function AcademicsPage() {
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
            src="/images/classroom.jpg"
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
                Academic Excellence for Every Learner
              </h1>
            </div>

            <motion.p
              initial={reduceMotion ? undefined : { opacity: 0, y: 20 }}
              animate={
                reduceMotion ? { opacity: 1, y: 0 } : { opacity: 1, y: 0 }
              }
              transition={{ duration: 0.6, delay: 0.12, ease: "easeOut" }}
              className="text-base sm:text-lg text-gray-800 leading-relaxed mb-6 ml-4"
            >
              Two globally recognized pathways — CBSE and IB — designed to
              inspire inquiry, innovation, and lifelong learning.
            </motion.p>

            <motion.div
              initial={reduceMotion ? undefined : { opacity: 0, y: 20 }}
              animate={
                reduceMotion ? { opacity: 1, y: 0 } : { opacity: 1, y: 0 }
              }
              transition={{ duration: 0.6, delay: 0.22, ease: "easeOut" }}
              className="flex flex-col sm:flex-row gap-3 ml-4"
            >
              <Button className="bg-[#F9E7A1] hover:bg-[#F5DD8A] text-[#1C2C5B] font-semibold px-6 py-3 rounded-md shadow-md transition-all duration-300 whitespace-nowrap opacity-40 hover:opacity-100">
                Explore the CBSE Pathway
              </Button>
              <Button className="bg-[#F9E7A1] hover:bg-[#F5DD8A] text-[#1C2C5B] font-semibold px-6 py-3 rounded-md shadow-md transition-all duration-300 whitespace-nowrap opacity-40 hover:opacity-100">
                Explore the IB Pathway
              </Button>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Our Learning Philosophy Section */}
      <section className="py-16 md:py-24 bg-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            variants={container}
            initial={reduceMotion ? "show" : "hidden"}
            whileInView={reduceMotion ? "show" : "show"}
            viewport={{ once: true, amount: 0.35 }}
            className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start"
          >
            {/* Left Column — Heading + Intro + Cards */}
            <div>
              <motion.h2
                variants={item}
                className="text-4xl sm:text-5xl md:text-4xl font-display font-bold text-[#1C2C5B] leading-tight mb-6 text-left max-w-[56ch]"
              >
                Our Learning Philosophy
              </motion.h2>

              <motion.p
                variants={item}
                className="text-lg sm:text-xl text-gray-700 leading-relaxed mb-8 max-w-[58ch]"
              >
                We believe education must evolve with the learner. At DIS
                Hyderabad, every child experiences a balanced blend of
                academics, creativity, and real-world application through
                inquiry-based learning, experiential projects, and continuous
                reflection.
              </motion.p>

              {/* two-column card layout (left column has 3 items, right column has 2) */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6">
                <div className="space-y-6">
                  {/*
                    left column: items 0,2,4 (stacked)
                  */}
                  {[
                    learningPrinciples[0],
                    learningPrinciples[2],
                    learningPrinciples[4],
                  ].map((text, i) => (
                    <motion.div
                      key={`left-${i}`}
                      variants={card(i * 2)}
                      whileHover={{ 
                        scale: 1.02, 
                        y: -4,
                        boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.1), 0 8px 10px -6px rgba(0, 0, 0, 0.1)"
                      }}
                      transition={{ duration: 0.2, ease: "easeOut" }}
                      className="bg-[#E8F9FB] rounded-lg p-5 shadow-md border border-blue-50 min-h-[72px] flex items-center cursor-pointer transition-all duration-200 hover:bg-[#D8F0F3] hover:border-blue-200"
                    >
                      <p className="text-gray-800 font-medium leading-relaxed">
                        {text}
                      </p>
                    </motion.div>
                  ))}
                </div>

                <div className="space-y-6">
                  {/*
                    right column: items 1,3
                  */}
                  {[learningPrinciples[1], learningPrinciples[3]].map(
                    (text, i) => (
                      <motion.div
                        key={`right-${i}`}
                        variants={card(i * 2 + 1)}
                        whileHover={{ 
                          scale: 1.02, 
                          y: -4,
                          boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.1), 0 8px 10px -6px rgba(0, 0, 0, 0.1)"
                        }}
                        transition={{ duration: 0.2, ease: "easeOut" }}
                        className="bg-[#E8F9FB] rounded-lg p-5 shadow-md border border-blue-50 min-h-[72px] flex items-center cursor-pointer transition-all duration-200 hover:bg-[#D8F0F3] hover:border-blue-200"
                      >
                        <p className="text-gray-800 font-medium leading-relaxed">
                          {text}
                        </p>
                      </motion.div>
                    )
                  )}
                </div>
              </div>
            </div>

            {/* Right Column — Stacked Images + Badge */}
            <motion.div
              variants={item}
              className="relative flex items-center justify-center"
            >
              <div className="relative w-full max-w-lg h-[550px]">
                {/* Back image (right, taller) */}
                <div
                  className="absolute right-0 top-0 rounded-lg overflow-hidden shadow-xl"
                  style={{ height: 420, width: "360px" }}
                >
                  <Image
                    src="/images/student-girl.jpg"
                    alt="Student working on electronics"
                    fill
                    className="object-cover"
                  />
                </div>

                {/* Front image (left, overlapping) */}
                <div
                  className="absolute left-0 bottom-0 rounded-lg overflow-hidden shadow-2xl"
                  style={{ height: 360, width: "300px" }}
                >
                  <Image
                    src="/images/student-boy.jpg"
                    alt="Student presenting"
                    fill
                    className="object-cover"
                  />
                </div>

                {/* Navy badge overlay — centered between both images */}
                <motion.div
                  initial={
                    reduceMotion
                      ? { opacity: 1, scale: 1 }
                      : { opacity: 0, scale: 0.8 }
                  }
                  whileInView={
                    reduceMotion
                      ? { opacity: 1, scale: 1 }
                      : { opacity: 1, scale: 1 }
                  }
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: 0.42 }}
                  className="absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 z-30"
                >
                  <div className="bg-[#1C2C5B] rounded-full w-58 h-45 flex items-center justify-center shadow-2xl border-4 border-white p-2">
                    <Image
                      src="/images/blue-logo.png"
                      alt="DIS Logo"
                      width={80}
                      height={80}
                      className="object-contain"
                    />
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
