"use client";

import { useRouter } from "next/navigation";
import Image from "next/image";
import { motion } from "framer-motion";

export default function ApplicationTypeSelectionPage() {
  const router = useRouter();

  const handleSelect = (boardType: "CBSE" | "IB") => {
    // Navigate to application form with board type as query param
    router.push(`/admissions/application?board=${boardType}`);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-100 to-gray-50">
      {/* Header */}
      <div className="relative w-full h-32 bg-[#1C2C5B] overflow-hidden">
        {/* Background pattern */}
        <div className="absolute inset-0 opacity-10">
          <Image
            src="/images/admissioncampus.png"
            alt="Background"
            fill
            className="object-cover"
          />
        </div>
        <div className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-8 h-full flex items-center justify-between">
          {/* Logo */}
          <div className="relative w-16 h-16 sm:w-20 sm:h-20">
            <Image
              src="/images/logo-2.png"
              alt="Doon International School Logo"
              fill
              className="object-contain"
            />
          </div>
          
          {/* Title */}
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-display font-bold text-[#E5B93C] text-center flex-1 px-4">
            Admission Application Form
          </h1>

          {/* Log out button */}
          <button
            onClick={() => router.push("/admissions/login")}
            className="px-4 py-2 border-2 border-[#E5B93C] text-[#E5B93C] rounded-md hover:bg-[#E5B93C] hover:text-[#1C2C5B] transition-all duration-200 font-semibold text-sm sm:text-base"
          >
            Log out
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
        <div className="max-w-6xl mx-auto">
          {/* Application Type Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
            {/* CBSE Card */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="bg-white rounded-lg shadow-lg overflow-hidden cursor-pointer hover:shadow-xl transition-shadow duration-300"
              onClick={() => handleSelect("CBSE")}
            >
              {/* Image */}
              <div className="relative h-48 sm:h-56 md:h-64">
                <Image
                  src="/images/admissioncampus.png"
                  alt="Campus"
                  fill
                  className="object-cover"
                />
              </div>

              {/* Dark Blue Section */}
              <div className="bg-[#1C2C5B] p-6 sm:p-8">
                <h2 className="text-xl sm:text-2xl md:text-3xl font-display font-bold text-white mb-6 text-center">
               Admission Application Form 
              
                 <p>CBSE 2025-26</p> 
                </h2>
                
                {/* Apply Now Button */}
                <button
                  type="button"
                  className="w-full bg-[#E5B93C] text-[#1C2C5B] font-semibold py-3 px-6 rounded-md hover:bg-[#F4C23F] transition-all duration-200 text-base sm:text-lg"
                >
                  APPLY NOW
                </button>
              </div>

              {/* Decorative Pattern */}
              <div className="h-12 sm:h-16 bg-gradient-to-r from-[#1C2C5B] via-[#E5B93C] to-[#1C2C5B] opacity-20"></div>
            </motion.div>

            {/* IB Card */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="bg-white rounded-lg shadow-lg overflow-hidden cursor-pointer hover:shadow-xl transition-shadow duration-300"
              onClick={() => handleSelect("IB")}
            >
              {/* Image */}
              <div className="relative h-48 sm:h-56 md:h-64">
                <Image
                  src="/images/admissioncampus.png"
                  alt="Campus"
                  fill
                  className="object-cover"
                />
              </div>

              {/* Dark Blue Section */}
              <div className="bg-[#1C2C5B] p-6 sm:p-8">
                <h2 className="text-xl sm:text-2xl md:text-3xl font-display font-bold text-white mb-6 text-center">
                  Admission Application Form 
                  IB 2025-26
                </h2>
                
                {/* Apply Now Button */}
                <button
                  type="button"
                  className="w-full bg-[#E5B93C] text-[#1C2C5B] font-semibold py-3 px-6 rounded-md hover:bg-[#F4C23F] transition-all duration-200 text-base sm:text-lg"
                >
                  APPLY NOW
                </button>
              </div>

              {/* Decorative Pattern */}
              <div className="h-12 sm:h-16 bg-gradient-to-r from-[#1C2C5B] via-[#E5B93C] to-[#1C2C5B] opacity-20"></div>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
}

