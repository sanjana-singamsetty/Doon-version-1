// "use client";

// import * as React from "react";
// import Image from "next/image";
// import { motion, useReducedMotion } from "framer-motion";
// import { Button } from "@/components/ui/button";
// import { Header } from "@/components/layout/header";

// const eligibilityData = [
//   { grade: "Pre-Nursery", age: "2 years 6 months" },
//   { grade: "Nursery", age: "3 years" },
//   { grade: "KG-1", age: "4 years" },
//   { grade: "KG-2", age: "5 years" },
//   { grade: "Grade-1", age: "6 years" },
//   { grade: "Grade 2-10", age: "As per previous academic record" },
// ];

// export default function AdmissionsPage() {
//   const reduceMotion = useReducedMotion();

//   const container = {
//     hidden: { opacity: 0, y: 12 },
//     show: {
//       opacity: 1,
//       y: 0,
//       transition: { staggerChildren: 0.08, when: "beforeChildren" },
//     },
//   };

//   const item = {
//     hidden: { opacity: 0, y: 14 },
//     show: {
//       opacity: 1,
//       y: 0,
//       transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] },
//     },
//   };

//   return (
//     <main className="relative min-h-screen">
//       <Header />

//       {/* Hero Section */}
//       <section className="relative min-h-screen w-full overflow-hidden pt-24">
//         {/* Background Image */}
//         <div className="absolute inset-0 z-0">
//           <Image
//             src="/images/admissioncampus.png"
//             alt="Doon International School Campus"
//             fill
//             priority
//             className="object-cover"
//             quality={90}
//           />
//           <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-transparent to-black/30" />
//         </div>

//         {/* Yellow Overlay Box with Logo and Content */}
//         <div className="absolute bottom-0 left-0 right-0 z-10 container mx-auto px-4 sm:px-6 lg:px-8 pb-6 md:pb-8 lg:pb-9">
//           <motion.div
//             initial={reduceMotion ? undefined : { opacity: 0.5, y: 28 }}
//             animate={reduceMotion ? { opacity: 1, y: 0 } : { opacity: 1, y: 0 }}
//             transition={{ duration: 0.6, ease: "easeOut" }}
//             className="bg-[#E5B93C] rounded-lg p-6 md:p-8 lg:p-10 max-w-5xl shadow-2xl"
//           >
//             <div className="grid grid-cols-1 md:grid-cols-2 items-center gap-1 lg:gap-6">
//               {/* Left Side - Logo */}
//               <motion.div
//                 initial={reduceMotion ? undefined : { opacity: 0, scale: 0.9 }}
//                 animate={reduceMotion ? { opacity: 1, scale: 1 } : { opacity: 1, scale: 1 }}
//                 transition={{ duration: 0.6, delay: 0.2, ease: "easeOut" }}
//                 className="flex justify-center lg:justify-start"
//               >
//                 <div className="relative h-56 md:w-64 md:h-64 lg:w-72 lg:h-72">
//                   <Image
//                     src="/images/image-logo.png"
//                     alt="Doon International School Logo"
//                     fill
//                     className="object-contain"
//                     priority
//                   />
//                 </div>
//               </motion.div>

//               {/* Right Side - Content */}
//               <div className="space-y-3 md:space-y-4">
//                 <motion.h1
//                   initial={reduceMotion ? undefined : { opacity: 0, y: 20 }}
//                   animate={reduceMotion ? { opacity: 1, y: 0 } : { opacity: 1, y: 0 }}
//                   transition={{ duration: 0.6, delay: 0.3, ease: "easeOut" }}
//                   className="text-2xl sm:text-3xl md:text-4xl lg:text-3xl font-display font-bold text-[#1C2C5B] leading-tight"
//                 >
//                   Admissions Open for Academic Year 2026–27
//                 </motion.h1>

//                 <motion.p
//                   initial={reduceMotion ? undefined : { opacity: 0, y: 20 }}
//                   animate={reduceMotion ? { opacity: 1, y: 0 } : { opacity: 1, y: 0 }}
//                   transition={{ duration: 0.6, delay: 0.4, ease: "easeOut" }}
//                   className="text-base sm:text-lg text-gray-800 leading-relaxed"
//                 >
//                   Join the founding batch of Doon International School Hyderabad
//                   - offering CBSE and IB curricula from Pre-Primary to Grade 10.
//                 </motion.p>

//                 <motion.div
//                   initial={reduceMotion ? undefined : { opacity: 0, y: 20 }}
//                   animate={reduceMotion ? { opacity: 1, y: 0 } : { opacity: 1, y: 0 }}
//                   transition={{ duration: 0.6, delay: 0.5, ease: "easeOut" }}
//                   className="flex justify-end"
//                 >
//                   <Button className="bg-[#1C2C5B] hover:bg-[#162347] text-white font-semibold px-8 py-3 rounded-md shadow-md transition-all duration-300 whitespace-nowrap">
//                     Apply Now
//                   </Button>
//                 </motion.div>
//               </div>
//             </div>
//           </motion.div>
//         </div>
//       </section>

//       {/* Child's Learning Journey Section */}
//       <section className="py-16 md:py-24 bg-white">
//         <div className="container mx-auto px-4 sm:px-6 lg:px-8">
//           <motion.div
//             variants={container}
//             initial={reduceMotion ? "show" : "hidden"}
//             whileInView={reduceMotion ? "show" : "show"}
//             viewport={{ once: true, amount: 0.2 }}
//             className="space-y-12"
//           >
//             {/* Section Title */}
//             <motion.h2
//               variants={item}
//               className="text-4xl sm:text-5xl md:text-4xl font-display font-bold text-[#1C2C5B] leading-tight"
//             >
//               Child's Learning Journey Starts Here
//             </motion.h2>

//             {/* Content Grid */}
//             <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-start">
//               {/* Left Side - Student Image */}
//               <motion.div
//                 variants={item}
//                 className="flex justify-center lg:justify-start"
//               >
//                 <div className="relative w-full max-w-md aspect-square rounded-lg overflow-hidden shadow-2xl">
//                   <Image
//                     src="/images/admission-boy.png"
//                     alt="Student with graduation cap"
//                     fill
//                     className="object-cover"
//                   />
//                 </div>
//               </motion.div>

//               {/* Right Side - Admissions Information */}
//               <motion.div variants={item} className="space-y-6">
//                 {/* Text Paragraph */}
//                 <p className="text-lg sm:text-xl text-gray-700 leading-relaxed">
//                   We're excited to welcome students into our first academic year.
//                   Our admissions process is{" "}
//                   <span className="underline font-semibold">transparent</span>
//                   ,{" "}
//                   <span className="underline font-semibold">personalized</span>
//                   , and designed to ensure a great fit between the student and
//                   the DIS learning community.
//                 </p>

//                 {/* Arrow and Button */}
//                 <div className="pt-6 flex items-end justify-center gap-4">
//                   {/* Arrow Image - Left Side, Bottom Aligned */}
//                   <motion.div
//                     initial={{ opacity: 0, scale: 0.9, x: -20 }}
//                     whileInView={{ opacity: 1, scale: 1, x: 0 }}
//                     viewport={{ once: true }}
//                     transition={{ duration: 0.6, ease: "easeOut" }}
//                     className="flex items-end"
//                   >
//                     <div className="relative w-64 h-32">
//                       <Image
//                         src="/images/arrow.png"
//                         alt="Arrow pointing to button"
//                         fill
//                         className="object-contain"
//                       />
//                     </div>
//                   </motion.div>

//                   {/* Button - Right Side */}
//                   <motion.div 
//                     initial={{ opacity: 0, x: 20 }}
//                     whileInView={{ opacity: 1, x: 0 }}
//                     viewport={{ once: true }}
//                     transition={{ duration: 0.6, delay: 0.2, ease: "easeOut" }}
//                     className="flex items-end"
//                   >
//                     <Button className="bg-[#E5B93C] hover:bg-[#D4A833] text-[#1C2C5B] font-semibold px-8 py-3 rounded-md shadow-md transition-all duration-300 whitespace-nowrap">
//                       Begin Application
//                     </Button>
//                   </motion.div>
//                 </div>
//               </motion.div>
//             </div>

//             {/* Eligibility Table */}
//             <motion.div 
//               initial={{ opacity: 0, y: 30 }}
//               whileInView={{ opacity: 1, y: 0 }}
//               viewport={{ once: true }}
//               transition={{ duration: 0.6, ease: "easeOut" }}
//               className="pt-8 flex flex-col items-end"
//             >
//               <motion.h3 
//                 initial={{ opacity: 0, x: -20 }}
//                 whileInView={{ opacity: 1, x: 0 }}
//                 viewport={{ once: true }}
//                 transition={{ duration: 0.5, delay: 0.2 }}
//                 className="text-2xl sm:text-3xl font-display font-bold text-[#1C2C5B] mb-6"
//               >
//                 Eligibility & Age Criteria
//               </motion.h3>
//               <motion.div 
//                 initial={{ opacity: 0, scale: 0.95 }}
//                 whileInView={{ opacity: 1, scale: 1 }}
//                 viewport={{ once: true }}
//                 transition={{ duration: 0.5, delay: 0.3 }}
//                 className="overflow-x-auto w-full max-w-2xl"
//               >
//                 <table className="w-full border-collapse bg-[#E8F4F6] rounded-lg shadow-md overflow-hidden border-2 border-[#1C2C5B]">
//                   <thead>
//                     <motion.tr 
//                       initial={{ opacity: 0 }}
//                       whileInView={{ opacity: 1 }}
//                       viewport={{ once: true }}
//                       transition={{ duration: 0.5, delay: 0.4 }}
//                       className="bg-[#1C2C5B]"
//                     >
//                       <th className="border border-[#1C2C5B] px-6 py-4 text-left font-semibold text-white">
//                         Grade
//                       </th>
//                       <th className="border border-[#1C2C5B] px-6 py-4 text-left font-semibold text-white">
//                         Minimum Age
//                       </th>
//                     </motion.tr>
//                   </thead>
//                   <tbody>
//                     {eligibilityData.map((row, index) => (
//                       <motion.tr
//                         key={index}
//                         initial={{ opacity: 0, x: -30, scale: 0.95 }}
//                         whileInView={{ opacity: 1, x: 0, scale: 1 }}
//                         viewport={{ once: true }}
//                         transition={{ 
//                           duration: 0.5, 
//                           delay: 0.5 + index * 0.1,
//                           ease: "easeOut"
//                         }}
//                         whileHover={{ 
//                           scale: 1.02, 
//                           x: 5,
//                           transition: { duration: 0.2 }
//                         }}
//                         className="hover:bg-[#D8F0F3] transition-colors duration-200"
//                       >
//                         <td className="border border-[#1C2C5B] px-6 py-4 text-gray-800 font-medium bg-[#E8F4F6]">
//                           {row.grade}
//                         </td>
//                         <td className="border border-[#1C2C5B] px-6 py-4 text-gray-800 bg-[#E8F4F6]">
//                           {row.age}
//                         </td>
//                       </motion.tr>
//                     ))}
//                   </tbody>
//                 </table>
//               </motion.div>
//             </motion.div>
//           </motion.div>
//         </div>
//       </section>
//     </main>
//   );
// }
"use client";

import * as React from "react";
import Image from "next/image";
import { motion, useReducedMotion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Header } from "@/components/layout/header";
import "./AdmissionsPage.css";

const eligibilityData = [
  { grade: "Pre-Nursery", age: "2 years 6 months" },
  { grade: "Nursery", age: "3 years" },
  { grade: "KG-1", age: "4 years" },
  { grade: "KG-2", age: "5 years" },
  { grade: "Grade-1", age: "6 years" },
  { grade: "Grade 2-10", age: "As per previous academic record" },
];

export default function AdmissionsPage() {
  const reduceMotion = useReducedMotion();

  const container = {
    hidden: { opacity: 0, y: 12 },
    show: { opacity: 1, y: 0, transition: { staggerChildren: 0.08, when: "beforeChildren" } },
  };

  const item = {
    hidden: { opacity: 0, y: 14 },
    show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] } },
  };

  return (
    <main className="admissions-page">
      <Header />

      {/* Hero Section */}
      <section className="hero-section">
        <div className="hero-bg">
          <Image
            src="/images/admissioncampus.png"
            alt="Doon International School Campus"
            fill
            priority
            className="hero-image"
            quality={90}
          />
          <div className="hero-overlay" />
        </div>
        <div className="absolute bottom-0 left-0 right-0 z-10 container mx-auto px-4 sm:px-6 lg:px-8 pb-6 md:pb-8 lg:pb-10">
  <motion.div
    initial={reduceMotion ? undefined : { opacity: 0.5, y: 28 }}
    animate={reduceMotion ? { opacity: 1, y: 0 } : { opacity: 1, y: 0 }}
    transition={{ duration: 0.6, ease: "easeOut" }}
    className="bg-[#E5B93C] rounded-lg p-6 md:p-8 lg:p-10 max-w-3xl shadow-2xl flex flex-col md:flex-row items-center gap-6"
  >
    {/* Image on Left */}
    <div className="relative w-32 h-32 md:w-48 md:h-48 flex-shrink-0">
      <Image
        src="/images/image-logo.png"
        alt="Doon International School Logo"
        fill
        className="object-contain"
        priority
      />
    </div>

    {/* Text Content on Right */}
    <div className="flex-1 flex flex-col gap-4">
      <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-4xl font-display font-bold text-[#1C2C5B] leading-tight">
        Academic Excellence for Every Learner
      </h1>

      <motion.p
        initial={reduceMotion ? undefined : { opacity: 0, y: 20 }}
        animate={reduceMotion ? { opacity: 1, y: 0 } : { opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.12, ease: "easeOut" }}
        className="text-base sm:text-lg text-gray-800 leading-relaxed"
      >
        Two globally recognized pathways — CBSE and IB — designed to inspire
        inquiry, innovation, and lifelong learning.
      </motion.p>

      <motion.div
        initial={reduceMotion ? undefined : { opacity: 0, y: 20 }}
        animate={reduceMotion ? { opacity: 1, y: 0 } : { opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.22, ease: "easeOut" }}
        className="flex flex-col sm:flex-row gap-3"
      >
       <Button className="bg-[#1C2C5B] hover:bg-[#162347] text-white font-semibold px-8 py-3 rounded-md shadow-md transition-all duration-300 whitespace-nowrap">
                   Apply Now
                 </Button>
      </motion.div>
    </div>
  </motion.div>
</div>

      </section>

      {/* Child's Learning Journey Section */}
      <section className="learning-journey-section">
        <div className="container">
          <motion.div
            variants={container}
            initial={reduceMotion ? "show" : "hidden"}
            whileInView={reduceMotion ? "show" : "show"}
            viewport={{ once: true, amount: 0.2 }}
            className="learning-content"
          >
            <motion.h2 variants={item} className="learning-title">
              Child&apos;s Learning Journey Starts Here
            </motion.h2>

            <div className="learning-grid">
              {/* Left Side - Student Image */}
              <motion.div variants={item} className="student-image-wrapper">
                <div className="student-image-container">
                  <Image
                    src="/images/admission-boy.png"
                    alt="Student with graduation cap"
                    fill
                    className="student-image"
                  />
                </div>
              </motion.div>

              {/* Right Side - Info */}
              <motion.div variants={item} className="learning-info">
                <p className="learning-text">
                  We&apos;re excited to welcome students into our first academic year. Our admissions process is <span className="underline font-semibold">transparent</span>, <span className="underline font-semibold">personalized</span>, and designed to ensure a great fit between the student and the DIS learning community.
                </p>

                <div className="learning-actions">
                  <motion.div className="arrow-image-wrapper">
                    <Image
                      src="/images/arrow.png"
                      alt="Arrow pointing to button"
                      fill
                      className="arrow-image"
                    />
                  </motion.div>
                  <motion.div className="begin-button-wrapper">
                    <Button className="begin-button">Begin Application</Button>
                  </motion.div>
                </div>
              </motion.div>
            </div>

            {/* Eligibility Table */}
            <motion.div className="eligibility-section">
              <motion.h3 className="eligibility-title">Eligibility & Age Criteria</motion.h3>
              <motion.div className="eligibility-table-wrapper">
                <table className="eligibility-table">
                  <thead>
                    <tr className="eligibility-thead">
                      <th>Grade</th>
                      <th>Minimum Age</th>
                    </tr>
                  </thead>
                  <tbody>
                    {eligibilityData.map((row, index) => (
                      <tr key={index} className="eligibility-row">
                        <td>{row.grade}</td>
                        <td>{row.age}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </motion.div>
            </motion.div>
          </motion.div>
        </div>
      </section>
    </main>
  );
}

