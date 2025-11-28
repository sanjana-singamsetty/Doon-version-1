"use client";

import * as React from "react";
import Image from "next/image";
import { motion, useReducedMotion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Header } from "@/components/layout/header";
import { Download } from "lucide-react";

const curriculumBlocks = [
  {
    title: "Scholastic Learning; Building Strong Foundations",
    description:
      "The scholastic curriculum at DIS Hyderabad emphasizes conceptual understanding, analytical ability, and creative expression across subjects.",
    items: [
      "Languages: English, Hindi, Telugu, French & Spanish",
      "Mathematics: Concept mastery through real-world problem-solving",
      "Science: Hands-on experiments and integrated STEM challenges",
      "Social Studies: Global awareness through historical and cultural understanding",
      "ICT & Digital Literacy: Early introduction to coding and computational thinking",
    ],
  },
  {
    title: "Co-Scholastic Learning; Beyond the Textbook",
    description:
      "We encourage expression through arts, music, drama, and physical education. Students learn teamwork, discipline, and leadership through participation.",
    items: [
      "Visual & Performing Arts: Fine arts, theatre, dance, music",
      "Physical Education: Structured sports program - football, athletics, badminton, yoga",
      "Cultural Activities: Inter-house competitions, fests, exhibitions",
      "Value Education: Ethics, social awareness, and respect",
    ],
  },
  {
    title: "Life Skills & SEL (Social-Emotional Learning)",
    description:
      "We nurture emotional intelligence, communication, empathy, and resilience through structured SEL sessions and mentorship programs.",
    coreSkills: [
      "Decision-making and problem-solving",
      "Effective communication",
      "Emotional regulation and empathy",
      "Relationship management",
      "Self-awareness and confidence",
    ],
    programs: [
      "Weekly advisory sessions",
      "Peer mentoring",
      "Mindfulness and reflection activities",
    ],
  },
  {
    title: "Technology for Tomorrow's Learners",
    description:
      "At DIS Hyderabad, technology empowers creativity. Our classrooms are digitally enabled with smart boards, 1:1 device programs, and coding modules that prepare students for the digital future.",
    items: [
      "Interactive Smart Classrooms",
      "Robotics & AI Clubs",
      "3D Printing & Design Thinking Labs",
      "Safe Internet & Digital Citizenship training",
      "STEM and Maker Space Projects",
    ],
  },
];

const curriculumResources = [
  "Early School Curriculum Guide (PDF)",
  "Primary School Curriculum Guide (PDF)",
  "Middle School Curriculum Guide (PDF)",
];

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

export default function CurriculumPage() {
  const reduceMotion = useReducedMotion();

  const container = {
    hidden: { opacity: 0, y: 12 },
    show: {
      opacity: 1,
      y: 0,
      transition: { staggerChildren: 0.08, when: "beforeChildren" },
    },
  };

  return (
    <main className="relative min-h-screen">
      <Header />

      {/* Hero Section */}
      <section className="relative min-h-screen w-full overflow-hidden pt-24">
        {/* Background Image */}
        <div className="absolute inset-0 z-0">
          <Image
            src="/images/curriculam.png"
            alt="Classroom background"
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
            <motion.h1
              initial={reduceMotion ? undefined : { opacity: 0, y: 20 }}
              animate={
                reduceMotion ? { opacity: 1, y: 0 } : { opacity: 1, y: 0 }
              }
              transition={{ duration: 0.6, delay: 0.2, ease: "easeOut" }}
              className="text-3xl sm:text-4xl md:text-5xl lg:text-5xl font-display font-bold text-[#1C2C5B] leading-tight mb-4"
            >
              Learning That Inspires Mind and Heart
            </motion.h1>

            <motion.p
              initial={reduceMotion ? undefined : { opacity: 0, y: 20 }}
              animate={
                reduceMotion ? { opacity: 1, y: 0 } : { opacity: 1, y: 0 }
              }
              transition={{ duration: 0.6, delay: 0.3, ease: "easeOut" }}
              className="text-base sm:text-lg text-gray-800 leading-relaxed"
            >
              Our curriculum balances scholastic excellence with creativity,
              empathy, and life skills; preparing students for both exams and
              experiences.
            </motion.p>
          </motion.div>
        </div>

        {/* Student Image on Right */}
        <div className="absolute bottom-0 right-0 z-10 hidden lg:block">
          <motion.div
            initial={reduceMotion ? undefined : { opacity: 0, scale: 0.9 }}
            animate={
              reduceMotion ? { opacity: 1, scale: 1 } : { opacity: 1, scale: 1 }
            }
            transition={{ duration: 0.8, delay: 0.4, ease: "easeOut" }}
            className="relative w-96 h-[500px]"
          >
            {/* <Image
              src="/images/girl.jpg"
              alt="Student with books"
              fill
              className="object-contain object-bottom"
              priority
            /> */}
          </motion.div>
        </div>
      </section>

      {/* Curriculum Blocks Section */}
      <section className="py-16 md:py-24 bg-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            variants={container}
            initial={reduceMotion ? "show" : "hidden"}
            whileInView={reduceMotion ? "show" : "show"}
            viewport={{ once: true, amount: 0.2 }}
            className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8"
          >
            {curriculumBlocks.map((block, index) => (
              <motion.div
                key={index}
                variants={card(index)}
                whileHover={{
                  scale: 1.02,
                  y: -4,
                  boxShadow:
                    "0 10px 25px -5px rgba(0, 0, 0, 0.1), 0 8px 10px -6px rgba(0, 0, 0, 0.1)",
                }}
                transition={{ duration: 0.2, ease: "easeOut" }}
                className="bg-white rounded-lg shadow-md border border-gray-200 overflow-hidden cursor-pointer transition-all duration-200 hover:border-[#1C2C5B]/20 flex flex-col"
              >
                {/* Header Bar */}
                <div className="bg-[#1C2C5B] px-6 py-4">
                  <h3 className="text-lg sm:text-xl font-display font-bold text-white leading-tight">
                    {block.title}
                  </h3>
                </div>

                {/* Content Area */}
                <div className="p-6 flex-grow flex flex-col bg-[#E8F4F6]">
                  <p className="text-gray-700 leading-relaxed mb-6">
                    {block.description}
                  </p>

                  {/* Items List */}
                  <div className="space-y-3 mb-6 flex-grow">
                    {block.items && (
                      <ul className="space-y-2">
                        {block.items.map((item, itemIndex) => (
                          <li
                            key={itemIndex}
                            className="text-gray-700 leading-relaxed flex items-start"
                          >
                            <span className="text-[#1C2C5B] font-bold mr-2">
                              •
                            </span>
                            <span>{item}</span>
                          </li>
                        ))}
                      </ul>
                    )}

                    {/* Special format for Life Skills block */}
                    {block.coreSkills && (
                      <div className="space-y-4">
                        <div>
                          <h4 className="font-semibold text-[#1C2C5B] mb-2">
                            Core Skills Developed Skills:
                          </h4>
                          <ul className="space-y-2">
                            {block.coreSkills.map((skill, skillIndex) => (
                              <li
                                key={skillIndex}
                                className="text-gray-700 leading-relaxed flex items-start"
                              >
                                <span className="text-[#1C2C5B] font-bold mr-2">
                                  •
                                </span>
                                <span>{skill}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                        <div>
                          <h4 className="font-semibold text-[#1C2C5B] mb-2">
                            Programs:
                          </h4>
                          <ul className="space-y-2">
                            {block.programs.map((program, programIndex) => (
                              <li
                                key={programIndex}
                                className="text-gray-700 leading-relaxed flex items-start"
                              >
                                <span className="text-[#1C2C5B] font-bold mr-2">
                                  •
                                </span>
                                <span>{program}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Download Button */}
                  <Button className="bg-[#E5B93C] hover:bg-[#D4A833] text-[#1C2C5B] font-semibold px-6 py-3 rounded-md shadow-md transition-all duration-300 w-full mt-auto">
                    Download Curriculum Guide
                  </Button>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Curriculum Resources Section */}
      <section className="py-16 md:py-24 bg-[#E5B93C]">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={reduceMotion ? undefined : { opacity: 0, y: 30 }}
            whileInView={
              reduceMotion ? { opacity: 1, y: 0 } : { opacity: 1, y: 0 }
            }
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center"
          >
            {/* Left Side - Text Content */}
            <div className="space-y-4">
              <motion.h2
                initial={reduceMotion ? undefined : { opacity: 0, x: -20 }}
                whileInView={
                  reduceMotion ? { opacity: 1, x: 0 } : { opacity: 1, x: 0 }
                }
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="text-3xl sm:text-4xl md:text-5xl font-display font-bold text-[#1C2C5B] leading-tight"
              >
                Curriculum Resources
              </motion.h2>
              <motion.p
                initial={reduceMotion ? undefined : { opacity: 0, x: -20 }}
                whileInView={
                  reduceMotion ? { opacity: 1, x: 0 } : { opacity: 1, x: 0 }
                }
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.3 }}
                className="text-lg sm:text-xl text-gray-800 leading-relaxed"
              >
                Access detailed curriculum guides, subject outlines, and
                assessment rubrics for each stage.
              </motion.p>
            </div>

            {/* Right Side - Download Buttons */}
            <div className="space-y-4">
              {curriculumResources.map((resource, index) => (
                <motion.div
                  key={index}
                  initial={reduceMotion ? undefined : { opacity: 0, x: 20 }}
                  whileInView={
                    reduceMotion ? { opacity: 1, x: 0 } : { opacity: 1, x: 0 }
                  }
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: 0.4 + index * 0.1 }}
                  whileHover={{ scale: 1.02, x: 5 }}
                >
                  <Button className="w-full bg-[#1C2C5B] hover:bg-[#162347] text-white font-semibold px-6 py-4 rounded-md shadow-md transition-all duration-300 flex items-center justify-center gap-3">
                    <Download className="w-5 h-5" />
                    {resource}
                  </Button>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>
    </main>
  );
}
