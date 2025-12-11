"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { motion } from "framer-motion";
import "../application/AdmissionFlowForm.css";

type ApplicationData = {
  firstName: string;
  middleName: string;
  lastName: string;
  gender: string;
  grade: string;
  board: string;
  dob: string;
  birthRegion: string;
  birthState: string;
  nationality: string;
  aadhar: string;
  bloodGroup: string;
  identificationMarks: [string, string];
  correspondenceAddress: string;
  area: string;
  district: string;
  state: string;
  country: string;
  pincode: string;
  samePermanentAddress: boolean;
  permanentAddress: string;
  permanentArea: string;
  permanentDistrict: string;
  permanentState: string;
  permanentCountry: string;
  permanentPincode: string;
  motherTongue: string;
  religion: string;
  category: string;
  caste: string;
  subCaste: string;
  apaarId: string;
  familyStructure: string;
  siblings: Array<{ name: string; age: string; institution: string; standard: string }>;
  studentPhoto: string | null;
  fatherFullName: string;
  fatherMobileCode: string;
  fatherMobile: string;
  fatherEmail: string;
  fatherAadhar: string;
  fatherQualification: string;
  fatherProfession: string;
  fatherPhoto: string | null;
  motherFullName: string;
  motherMobileCode: string;
  motherMobile: string;
  motherEmail: string;
  motherAadhar: string;
  motherQualification: string;
  motherProfession: string;
  motherPhoto: string | null;
  grossAnnualIncome: string;
};

export default function AdmissionsDashboardPage() {
  const router = useRouter();
  const [showPreview, setShowPreview] = useState(false);
  const [applicationData, setApplicationData] = useState<ApplicationData | null>(null);

  useEffect(() => {
    // Retrieve application data from localStorage (stored after submission)
    const savedData = localStorage.getItem("lastSubmittedApplication");
    if (savedData) {
      try {
        setApplicationData(JSON.parse(savedData));
      } catch (error) {
        console.error("Error parsing application data:", error);
      }
    }
  }, []);

  const handleContinue = () => {
    // Show preview modal instead of navigating
    setShowPreview(true);
  };

  const handleSelect = (boardType: "CBSE" | "IB") => {
    router.push(`/admissions/application?board=${boardType}`);
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <div className="relative w-full h-32 overflow-hidden">
        {/* Background Image - Full width */}
        <div className="absolute inset-0">
          <Image
            src="/images/image.png"
            alt="Background"
            fill
            className="object-cover"
          />
        </div>
        <div className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-8 h-full flex items-center">
          <div className="flex items-center justify-between w-full gap-4">
            {/* Logo - Left */}
            <div className="relative w-16 h-16 sm:w-20 sm:h-20 flex-shrink-0">
              <Image
                src="/images/logo-2.png"
                alt="Doon International School Logo"
                fill
                className="object-contain"
              />
            </div>
            
            {/* Title - Center */}
            <h1 className="text-xl sm:text-2xl md:text-3xl font-display font-bold text-[#1C2C5B] text-center flex-1 px-6 bg-[#E5B93C] py-2 rounded-md">
              Admission Application Form
            </h1>

            {/* Log out button - Right with background */}
            <div className="relative flex-shrink-0">
              <div className="absolute inset-0 blur-sm opacity-50">
                <Image
                  src="/images/admissioncampus.png"
                  alt="Background"
                  fill
                  className="object-cover"
                />
              </div>
              <button
                onClick={() => router.push("/admissions/login")}
                className="relative px-4 py-2 border-2 border-[#E5B93C] bg-white/90 text-[#1C2C5B] rounded-md hover:bg-white transition-all duration-200 font-semibold text-sm sm:text-base whitespace-nowrap"
              >
                Log out
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            
            {/* In-Complete Application Section - Left Column */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="lg:col-span-1"
            >
              <div className="bg-white rounded-lg shadow-lg overflow-hidden">
                {/* Orange Header */}
                <div className="bg-[#FF7A00] px-6 py-4">
                  <h2 className="text-xl sm:text-2xl font-display font-bold text-[#1C2C5B]">
                    In-Complete Application
                  </h2>
                </div>

                {/* Dark Blue Body */}
                <div className="bg-[#1C2C5B] p-6">
                  <p className="text-white text-base mb-6">Application Number Not Generated</p>
                  
                  {/* Student Image */}
                  <div className="flex justify-center mb-6">
                    <div className="relative w-32 h-32 sm:w-40 sm:h-40 rounded-lg overflow-hidden bg-white/10">
                      <Image
                        src="/images/student-boy.jpg"
                        alt="Student"
                        fill
                        className="object-cover"
                      />
                    </div>
                  </div>

                  {/* Student Info */}
                  <div className="text-center mb-6">
                    <p className="text-white text-xl font-semibold mb-2">
                      {applicationData 
                        ? [applicationData.firstName, applicationData.middleName, applicationData.lastName].filter(Boolean).join(' ') || 'Student Name'
                        : 'Yashwanth Kalluri'
                      }
                    </p>
                    <p className="text-white text-base">
                      Application for: {applicationData 
                        ? `${applicationData.grade || 'Grade-4'} ${applicationData.board || 'CBSE'}`.trim()
                        : 'Grade-4 CBSE'
                      }
                    </p>
                  </div>

                  {/* Continue Button */}
                  <button
                    onClick={handleContinue}
                    className="w-full bg-[#E5B93C] text-[#1C2C5B] font-semibold py-3 px-6 rounded-md hover:bg-[#F4C23F] transition-all duration-200 text-base flex items-center justify-center gap-2"
                  >
                    Continue →
                  </button>
                </div>
              </div>
            </motion.div>

            {/* Create New Application Section - Right Column */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="lg:col-span-2"
            >

              <h2 className="text-2xl sm:text-3xl md:text-4xl font-display font-bold text-[#1C2C5B] mb-6 sm:mb-8">
                Create New Application
              </h2>

              {/* Application Type Cards */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
              {/* CBSE Card */}
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
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
                  <h3 className="text-xl sm:text-2xl md:text-3xl font-display font-bold text-white mb-6 text-center">
                    Admission Application Form 
                    CBSE 2025-26
                  </h3>
                  
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
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: 0.3 }}
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
                  <h3 className="text-xl sm:text-2xl md:text-3xl font-display font-bold text-white mb-6 text-center">
                    Admission Application Form IB 2025-26
                  </h3>
                  
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
            </motion.div>
          </div>
        </div>
      </div>

      {/* Preview Modal */}
      {showPreview && applicationData && (
        <div className="modal-overlay" onClick={() => setShowPreview(false)}>
          <div 
            className="modal-content preview-modal-content" 
            onClick={(e) => e.stopPropagation()}
            style={{ maxWidth: '90%', maxHeight: '90vh', overflowY: 'auto' }}
          >
            <div className="modal-header">
              <h3 className="modal-title" style={{ color: '#fff' }}>Application Details</h3>
            </div>
            <div className="modal-body" style={{ padding: '2rem' }}>
              {/* Student Details Preview */}
              <div style={{ marginBottom: '2rem' }}>
                <h4 style={{ fontSize: '1.25rem', fontWeight: 600, color: '#1c2c5b', marginBottom: '1rem' }}>Student Details</h4>
                
                <div className="preview-student-card">
                  {applicationData.studentPhoto && applicationData.studentPhoto !== "Uploaded" && (
                    <div className="preview-photo">
                      <Image
                        src={applicationData.studentPhoto}
                        alt="Student"
                        fill
                        className="preview-photo-img"
                      />
                    </div>
                  )}
                  <div className="preview-student-info">
                    <h3 className="preview-name">
                      {[applicationData.firstName, applicationData.middleName, applicationData.lastName].filter(Boolean).join(' ') || 'Not provided'}
                    </h3>
                    <p className="preview-grade">
                      Grade: {applicationData.grade || 'Not provided'} {applicationData.board ? `- ${applicationData.board}` : ''}
                    </p>
                    <p className="preview-dob">
                      DOB: {applicationData.dob ? (() => {
                        try {
                          return new Date(applicationData.dob).toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' });
                        } catch {
                          return applicationData.dob;
                        }
                      })() : 'Not provided'}
                    </p>
                  </div>
                </div>

                <div className="preview-details-grid">
                  <div className="preview-details-column">
                    <div className="preview-detail-item">
                      <span className="preview-label">Grade Applied For:</span>
                      <span className="preview-value">{applicationData.grade || 'Not provided'}</span>
                    </div>
                    <div className="preview-detail-item">
                      <span className="preview-label">Gender:</span>
                      <span className="preview-value">{applicationData.gender || 'Not provided'}</span>
                    </div>
                    <div className="preview-detail-item">
                      <span className="preview-label">Birth State:</span>
                      <span className="preview-value">{applicationData.birthState || 'Not provided'}</span>
                    </div>
                    <div className="preview-detail-item">
                      <span className="preview-label">Aadhar Card No.:</span>
                      <span className="preview-value">{applicationData.aadhar || 'Not provided'}</span>
                    </div>
                    <div className="preview-detail-item">
                      <span className="preview-label">Address For Correspondence:</span>
                      <span className="preview-value">
                        {applicationData.correspondenceAddress || 'Not provided'}
                        {applicationData.area && `, ${applicationData.area}`}
                        {applicationData.district && `, ${applicationData.district}`}
                        {applicationData.state && `, ${applicationData.state}`}
                        {applicationData.pincode && ` - ${applicationData.pincode}`}
                      </span>
                    </div>
                    <div className="preview-detail-item">
                      <span className="preview-label">Mother Tongue:</span>
                      <span className="preview-value">{applicationData.motherTongue || 'Not provided'}</span>
                    </div>
                    <div className="preview-detail-item">
                      <span className="preview-label">Category:</span>
                      <span className="preview-value">{applicationData.category || 'Not provided'}</span>
                    </div>
                  </div>

                  <div className="preview-details-column">
                    <div className="preview-detail-item">
                      <span className="preview-label">Date Of Birth:</span>
                      <span className="preview-value">
                        {applicationData.dob ? (() => {
                          try {
                            return new Date(applicationData.dob).toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' });
                          } catch {
                            return applicationData.dob;
                          }
                        })() : 'Not provided'}
                      </span>
                    </div>
                    <div className="preview-detail-item">
                      <span className="preview-label">Birth Region/District:</span>
                      <span className="preview-value">{applicationData.birthRegion || 'Not provided'}</span>
                    </div>
                    <div className="preview-detail-item">
                      <span className="preview-label">Nationality:</span>
                      <span className="preview-value">{applicationData.nationality || 'Not provided'}</span>
                    </div>
                    <div className="preview-detail-item">
                      <span className="preview-label">Blood Group:</span>
                      <span className="preview-value">{applicationData.bloodGroup || 'Not provided'}</span>
                    </div>
                    <div className="preview-detail-item">
                      <span className="preview-label">Religion:</span>
                      <span className="preview-value">{applicationData.religion || 'Not provided'}</span>
                    </div>
                    <div className="preview-detail-item">
                      <span className="preview-label">Caste:</span>
                      <span className="preview-value">{applicationData.caste || 'Not provided'}</span>
                    </div>
                    <div className="preview-detail-item">
                      <span className="preview-label">Family Structure:</span>
                      <span className="preview-value">{applicationData.familyStructure || 'Not provided'}</span>
                    </div>
                  </div>
                </div>

                {applicationData.siblings && applicationData.siblings.length > 0 && (
                  <div style={{ marginTop: '2rem' }}>
                    <h4 style={{ fontSize: '1.25rem', fontWeight: 600, color: '#1c2c5b', marginBottom: '1rem' }}>Siblings Details</h4>
                    <div className="preview-siblings-table">
                      <div className="preview-siblings-header">
                        <div>Name</div>
                        <div>Age</div>
                        <div>Institution</div>
                        <div>Standard</div>
                      </div>
                      {applicationData.siblings.map((sibling, index) => (
                        <div key={index} className="preview-siblings-row">
                          <div>{sibling.name || 'Not provided'}</div>
                          <div>{sibling.age || 'Not provided'}</div>
                          <div>{sibling.institution || 'Not provided'}</div>
                          <div>{sibling.standard || 'Not provided'}</div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              {/* Parent Details Preview */}
              <div>
                <h4 style={{ fontSize: '1.25rem', fontWeight: 600, color: '#1c2c5b', marginBottom: '1rem' }}>Parent Details</h4>
                
                <div className="preview-parents-grid">
                  {/* Father's Details */}
                  <div className="preview-parent-card">
                    <div className="preview-parent-info">
                      <h4 className="preview-parent-label">Father</h4>
                      <div className="preview-detail-item">
                        <span className="preview-label">Name:</span>
                        <span className="preview-value">{applicationData.fatherFullName || 'Not provided'}</span>
                      </div>
                      <div className="preview-detail-item">
                        <span className="preview-label">Phone Number:</span>
                        <span className="preview-value">
                          {applicationData.fatherMobileCode} {applicationData.fatherMobile || 'Not provided'}
                        </span>
                      </div>
                      <div className="preview-detail-item">
                        <span className="preview-label">Email Id:</span>
                        <span className="preview-value">{applicationData.fatherEmail || 'Not provided'}</span>
                      </div>
                      <div className="preview-detail-item">
                        <span className="preview-label">Aadhar Card No.:</span>
                        <span className="preview-value">{applicationData.fatherAadhar || 'Not provided'}</span>
                      </div>
                      <div className="preview-detail-item">
                        <span className="preview-label">Qualification:</span>
                        <span className="preview-value">{applicationData.fatherQualification || 'Not provided'}</span>
                      </div>
                      <div className="preview-detail-item">
                        <span className="preview-label">Profession:</span>
                        <span className="preview-value">{applicationData.fatherProfession || 'Not provided'}</span>
                      </div>
                    </div>
                  </div>

                  {/* Mother's Details */}
                  <div className="preview-parent-card">
                    <div className="preview-parent-info">
                      <h4 className="preview-parent-label">Mother</h4>
                      <div className="preview-detail-item">
                        <span className="preview-label">Name:</span>
                        <span className="preview-value">{applicationData.motherFullName || 'Not provided'}</span>
                      </div>
                      <div className="preview-detail-item">
                        <span className="preview-label">Phone Number:</span>
                        <span className="preview-value">
                          {applicationData.motherMobileCode} {applicationData.motherMobile || 'Not provided'}
                        </span>
                      </div>
                      <div className="preview-detail-item">
                        <span className="preview-label">Email Id:</span>
                        <span className="preview-value">{applicationData.motherEmail || 'Not provided'}</span>
                      </div>
                      <div className="preview-detail-item">
                        <span className="preview-label">Aadhar Card No.:</span>
                        <span className="preview-value">{applicationData.motherAadhar || 'Not provided'}</span>
                      </div>
                      <div className="preview-detail-item">
                        <span className="preview-label">Qualification:</span>
                        <span className="preview-value">{applicationData.motherQualification || 'Not provided'}</span>
                      </div>
                      <div className="preview-detail-item">
                        <span className="preview-label">Profession:</span>
                        <span className="preview-value">{applicationData.motherProfession || 'Not provided'}</span>
                      </div>
                    </div>
                  </div>
                </div>

                {applicationData.grossAnnualIncome && (
                  <div className="preview-detail-item" style={{ marginTop: '1.5rem' }}>
                    <span className="preview-label">Gross Annual Income (INR):</span>
                    <span className="preview-value">
                      {(() => {
                        try {
                          const income = parseInt(applicationData.grossAnnualIncome);
                          return isNaN(income) ? applicationData.grossAnnualIncome : income.toLocaleString('en-IN') + ' INR';
                        } catch {
                          return applicationData.grossAnnualIncome;
                        }
                      })()}
                    </span>
                  </div>
                )}
              </div>
            </div>
            <div className="modal-footer">
              <button 
                type="button" 
                className="modal-button-close" 
                onClick={() => setShowPreview(false)}
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

