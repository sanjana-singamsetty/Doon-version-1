"use client";

import * as React from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { useState, FormEvent, ChangeEvent } from "react";

type EnquiryFormData = {
  childName: string;
  grade: string;
  boardingType: string;
  email: string;
  mobile: string;
  message: string;
};

const gradeOptions = [
  "Pre-Nursery",
  "Nursery",
  "KG-1",
  "KG-2",
  "Grade 1",
  "Grade 2",
  "Grade 3",
  "Grade 4",
  "Grade 5",
  "Grade 6",
  "Grade 7",
  "Grade 8",
  "Grade 9",
  "Grade 10",
];

const boardingTypeOptions = [
  "Day Scholar",
  "Weekly Boarding",
  "Full Boarding",
];

export function EnquiryFormSection() {
  const [formData, setFormData] = useState<EnquiryFormData>({
    childName: "",
    grade: "",
    boardingType: "",
    email: "",
    mobile: "",
    message: "",
  });

  const [errors, setErrors] = useState<Partial<EnquiryFormData>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);

  const handleInputChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));

    if (errors[name as keyof EnquiryFormData]) {
      const updated = { ...errors };
      delete updated[name as keyof EnquiryFormData];
      setErrors(updated);
    }
  };

  const validateForm = (): boolean => {
    const newErrors: Partial<EnquiryFormData> = {};

    if (!formData.childName.trim()) newErrors.childName = "Child&apos;s name is required";
    if (!formData.grade) newErrors.grade = "Grade is required";
    if (!formData.boardingType) newErrors.boardingType = "Boarding type is required";

    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = "Enter a valid email";
    }

    if (!formData.mobile.trim()) {
      newErrors.mobile = "Mobile number is required";
    } else if (!/^\d{10}$/.test(formData.mobile)) {
      newErrors.mobile = "Mobile number must be 10 digits";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!validateForm()) return;

    setIsSubmitting(true);
    setSubmitSuccess(false);

    try {
      const response = await fetch("/api/enquiry/submit", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const result = await response.json();

      if (response.ok) {
        setSubmitSuccess(true);
        setFormData({
          childName: "",
          grade: "",
          boardingType: "",
          email: "",
          mobile: "",
          message: "",
        });

        setTimeout(() => setSubmitSuccess(false), 4000);
      } else {
        alert(result.error || "Submission failed");
      }
    } catch {
      alert("Unable to submit form. Please try again.");
    }

    setIsSubmitting(false);
  };

  return (
    <section className="relative w-full bg-[#FBF9E3] py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="bg-[#15275A] rounded-3xl shadow-2xl overflow-hidden"
        >
          <div className="grid grid-cols-1 lg:grid-cols-5">
            
            {/* LEFT: FORM */}
            <div className="lg:col-span-2 p-8 md:p-10 lg:p-12">

              <h2 className="text-3xl md:text-4xl font-extrabold text-[#F4C23F] mb-8">
                Boarding Admission Enquiry
              </h2>

              <form onSubmit={handleSubmit} className="space-y-6">

                {/* Child Name */}
                <label className="flex flex-col">
                  <span className="text-white text-sm mb-1.5 font-medium">Child&apos;s name<span className="text-yellow-400 ml-1">*</span></span>
                  <input
                    name="childName"
                    value={formData.childName}
                    onChange={handleInputChange}
                    placeholder="Enter child's name"
                    className={`w-full rounded-[0.9rem] border px-4 py-[0.95rem] text-base font-medium bg-white/10 border-white/30 text-white placeholder-white/50 transition-all focus:border-[#F4C23F] focus:outline-none focus:bg-white/15 focus:shadow-[0_0_0_3px_rgba(244,194,63,0.15)] ${
                      errors.childName ? "border-red-400 bg-red-500/10" : ""
                    }`}
                  />
                  {errors.childName && <span className="text-red-400 text-xs mt-1.5 font-medium">{errors.childName}</span>}
                </label>

                {/* Grade & Boarding Type */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <label className="flex flex-col">
                    <span className="text-white text-sm mb-1.5 font-medium">Admission for Grade<span className="text-yellow-400 ml-1">*</span></span>
                    <select
                      name="grade"
                      value={formData.grade}
                      onChange={handleInputChange}
                      className={`w-full rounded-[0.9rem] border px-4 py-[0.95rem] pr-10 text-base font-medium bg-white/10 border-white/30 text-white transition-all appearance-none cursor-pointer focus:border-[#F4C23F] focus:outline-none focus:bg-white/15 focus:shadow-[0_0_0_3px_rgba(244,194,63,0.15)] bg-[url('data:image/svg+xml;charset=UTF-8,%3Csvg xmlns=%22http://www.w3.org/2000/svg%22 width=%2212%22 height=%2212%22 viewBox=%220 0 12 12%22%3E%3Cpath fill=%22white%22 d=%22M6 9L1 4h10z%22/%3E%3C/svg%3E')] bg-[length:12px_12px] bg-[right_1rem_center] bg-no-repeat ${
                        !formData.grade ? "text-white/50" : "text-white"
                      } ${errors.grade ? "border-red-400 bg-red-500/10" : ""}`}
                    >
                      <option value="" disabled className="bg-[#15275A] text-white">Select Grade</option>
                      {gradeOptions.map((g) => (
                        <option key={g} className="bg-[#15275A] text-white" value={g}>{g}</option>
                      ))}
                    </select>
                    {errors.grade && <span className="text-red-400 text-xs mt-1.5 font-medium">{errors.grade}</span>}
                  </label>

                  <label className="flex flex-col">
                  <span className="text-white text-sm mb-1.5 font-medium">Mobile Number<span className="text-yellow-400 ml-1">*</span></span>
                  <input
                    name="mobile"
                    value={formData.mobile}
                    onChange={handleInputChange}
                    placeholder="Enter mobile number"
                    inputMode="numeric"
                    className={`w-full rounded-[0.9rem] border px-4 py-[0.95rem] text-base font-medium bg-white/10 border-white/30 text-white placeholder-white/50 transition-all focus:border-[#F4C23F] focus:outline-none focus:bg-white/15 focus:shadow-[0_0_0_3px_rgba(244,194,63,0.15)] ${
                      errors.mobile ? "border-red-400 bg-red-500/10" : ""
                    }`}
                  />
                  {errors.mobile && <span className="text-red-400 text-xs mt-1.5 font-medium">{errors.mobile}</span>}
                  </label>
                </div>

                {/* Email */}
                <label className="flex flex-col">
                  <span className="text-white text-sm mb-1.5 font-medium">E-mail ID<span className="text-yellow-400 ml-1">*</span></span>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    placeholder="Enter email address"
                    className={`w-full rounded-[0.9rem] border px-4 py-[0.95rem] text-base font-medium bg-white/10 border-white/30 text-white placeholder-white/50 transition-all focus:border-[#F4C23F] focus:outline-none focus:bg-white/15 focus:shadow-[0_0_0_3px_rgba(244,194,63,0.15)] ${
                      errors.email ? "border-red-400 bg-red-500/10" : ""
                    }`}
                  />
                  {errors.email && <span className="text-red-400 text-xs mt-1.5 font-medium">{errors.email}</span>}
                </label>


                {/* Message */}
                <label className="flex flex-col">
                  <span className="text-white text-sm mb-1.5 font-medium">Message</span>
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleInputChange}
                    rows={4}
                    className="w-full rounded-[0.9rem] border px-4 py-4 text-base font-medium bg-white/10 border-white/30 text-white placeholder-white/50 transition-all resize-vertical min-h-[110px] focus:border-[#F4C23F] focus:outline-none focus:bg-white/15 focus:shadow-[0_0_0_3px_rgba(244,194,63,0.15)]"
                    placeholder="Enter your message (optional)"
                  />
                </label>

                {/* Success */}
                {submitSuccess && (
                  <div className="text-green-400 bg-green-500/20 border border-green-500 rounded-md p-3 text-sm">
                    Thank you. Your enquiry has been submitted successfully.
                  </div>
                )}

                {/* Submit */}
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="bg-[#F4C23F] text-[#15275A] font-semibold py-3 px-6 rounded-full w-32 hover:bg-[#ffdd66] transition disabled:opacity-50"
                >
                  {isSubmitting ? "Submitting..." : "Submit"}
                </button>
              </form>
            </div>

            {/* RIGHT IMAGE */}
            <div className="lg:col-span-3 relative h-[500px] lg:h-full">
              <Image
                src="/images/image2.png"
                alt="Classroom"
                fill
                className="object-cover"
              />
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
