"use client";

import { ChangeEvent, FormEvent, useState, useEffect, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Image from "next/image";
import "./AdmissionFlow.css";
import "./AdmissionFlowForm.css";

type Sibling = {
  name: string;
  age: string;
  institution: string;
  standard: string;
};

type FormState = {
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
  siblings: Sibling[];
  studentPhoto: File | null;
  // Parent details
  fatherFullName: string;
  fatherMobileCode: string;
  fatherMobile: string;
  fatherEmail: string;
  fatherAadhar: string;
  fatherQualification: string;
  fatherProfession: string;
  fatherPhoto: File | null;
  motherFullName: string;
  motherMobileCode: string;
  motherMobile: string;
  motherEmail: string;
  motherAadhar: string;
  motherQualification: string;
  motherProfession: string;
  motherPhoto: File | null;
  grossAnnualIncome: string;
};

type StepId = "student" | "parent" | "preview";

const progressSteps: { id: StepId; label: string }[] = [
  { id: "student", label: "Student details" },
  { id: "parent", label: "Parent details" },
  { id: "preview", label: "Preview" },
];

const genderOptions = ["Male", "Female", "Non-binary", "Prefer not to say"];
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
const boardOptions = ["CBSE", "IB"];
const nationalityOptions = ["Indian", "American", "British", "Other"];
const bloodGroups = ["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"];
const countryOptions = ["India", "United States", "United Kingdom", "United Arab Emirates", "Other"];
const religionOptions = ["Hindu", "Muslim", "Christian", "Sikh", "Buddhist", "Jain", "Other"];
const categoryOptions = ["General", "OBC", "SC", "ST", "Other"];
const familyStructureOptions = ["Both With Parents", "Father Only", "Mother Only", "Guardian"];

const initialFormState: FormState = {
  firstName: "",
  middleName: "",
  lastName: "",
  gender: "",
  grade: "",
  board: "",
  dob: "",
  birthRegion: "",
  birthState: "",
  nationality: "",
  aadhar: "",
  bloodGroup: "",
  identificationMarks: ["", ""],
  correspondenceAddress: "",
  area: "",
  district: "",
  state: "",
  country: "India",
  pincode: "",
  samePermanentAddress: true,
  permanentAddress: "",
  permanentArea: "",
  permanentDistrict: "",
  permanentState: "",
  permanentCountry: "India",
  permanentPincode: "",
  motherTongue: "",
  religion: "",
  category: "",
  caste: "",
  subCaste: "",
  apaarId: "",
  familyStructure: "Both With Parents",
  siblings: [],
  studentPhoto: null,
  // Parent details
  fatherFullName: "",
  fatherMobileCode: "+91",
  fatherMobile: "",
  fatherEmail: "",
  fatherAadhar: "",
  fatherQualification: "",
  fatherProfession: "",
  fatherPhoto: null,
  motherFullName: "",
  motherMobileCode: "+91",
  motherMobile: "",
  motherEmail: "",
  motherAadhar: "",
  motherQualification: "",
  motherProfession: "",
  motherPhoto: null,
  grossAnnualIncome: "",
};

type FormErrors = {
  [key in keyof FormState]?: string;
};

// Inner component that uses useSearchParams
function AdmissionsPageContent() {
  const router = useRouter();
  const [formData, setFormData] = useState<FormState>(initialFormState);
  const [currentStep, setCurrentStep] = useState<StepId>("student");
  const [errors, setErrors] = useState<FormErrors>({});
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [showInstructionsModal, setShowInstructionsModal] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [photoPreviews, setPhotoPreviews] = useState<{
    studentPhoto: string | null;
    fatherPhoto: string | null;
    motherPhoto: string | null;
  }>({
    studentPhoto: null,
    fatherPhoto: null,
    motherPhoto: null,
  });

  const searchParams = useSearchParams();

  // Set board type from query parameter
  useEffect(() => {
    const boardParam = searchParams.get("board");
    if (boardParam && (boardParam === "CBSE" || boardParam === "IB")) {
      setFormData((prev) => ({ ...prev, board: boardParam }));
    }
  }, [searchParams]);

  const handleInputChange = (
    event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = event.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    // Clear error when user starts typing
    if (errors[name as keyof FormState]) {
      setErrors((prev) => {
        const newErrors = { ...prev };
        delete newErrors[name as keyof FormState];
        return newErrors;
      });
    }
  };

  const handleMarkChange = (index: number) => (event: ChangeEvent<HTMLInputElement>) => {
    setFormData((prev) => {
      const marks = [...prev.identificationMarks] as [string, string];
      marks[index] = event.target.value;
      return { ...prev, identificationMarks: marks };
    });
  };

  const toggleSameAddress = (value: boolean) => {
    setFormData((prev) => ({ ...prev, samePermanentAddress: value }));
  };

  const handleSiblingChange = (index: number, field: keyof Sibling, value: string) => {
    setFormData((prev) => {
      const siblings = [...prev.siblings];
      siblings[index] = { ...siblings[index], [field]: value };
      return { ...prev, siblings };
    });
  };

  const addSibling = () => {
    setFormData((prev) => ({
      ...prev,
      siblings: [...prev.siblings, { name: "", age: "", institution: "", standard: "" }],
    }));
  };

  const removeSibling = (index: number) => {
    setFormData((prev) => ({
      ...prev,
      siblings: prev.siblings.filter((_, i) => i !== index),
    }));
  };

  const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0] || null;
    const fieldName = event.target.name;
    
    if (fieldName === "studentPhoto") {
      // Clean up previous preview URL
      if (typeof window !== 'undefined' && photoPreviews.studentPhoto) {
        URL.revokeObjectURL(photoPreviews.studentPhoto);
      }
      
      setFormData((prev) => ({ ...prev, studentPhoto: file }));
      setPhotoPreviews((prev) => ({
        ...prev,
        studentPhoto: file && typeof window !== 'undefined' ? URL.createObjectURL(file) : null,
      }));
      
      if (errors.studentPhoto) {
        setErrors((prev) => {
          const newErrors = { ...prev };
          delete newErrors.studentPhoto;
          return newErrors;
        });
      }
    } else if (fieldName === "fatherPhoto") {
      // Clean up previous preview URL
      if (typeof window !== 'undefined' && photoPreviews.fatherPhoto) {
        URL.revokeObjectURL(photoPreviews.fatherPhoto);
      }
      
      setFormData((prev) => ({ ...prev, fatherPhoto: file }));
      setPhotoPreviews((prev) => ({
        ...prev,
        fatherPhoto: file && typeof window !== 'undefined' ? URL.createObjectURL(file) : null,
      }));
      
      if (errors.fatherPhoto) {
        setErrors((prev) => {
          const newErrors = { ...prev };
          delete newErrors.fatherPhoto;
          return newErrors;
        });
      }
    } else if (fieldName === "motherPhoto") {
      // Clean up previous preview URL
      if (typeof window !== 'undefined' && photoPreviews.motherPhoto) {
        URL.revokeObjectURL(photoPreviews.motherPhoto);
      }
      
      setFormData((prev) => ({ ...prev, motherPhoto: file }));
      setPhotoPreviews((prev) => ({
        ...prev,
        motherPhoto: file && typeof window !== 'undefined' ? URL.createObjectURL(file) : null,
      }));
      
      if (errors.motherPhoto) {
        setErrors((prev) => {
          const newErrors = { ...prev };
          delete newErrors.motherPhoto;
          return newErrors;
        });
      }
    }
  };

  const handleDiscardPhoto = (fieldName: "studentPhoto" | "fatherPhoto" | "motherPhoto") => {
    // Clean up preview URL
    if (typeof window !== 'undefined' && photoPreviews[fieldName]) {
      URL.revokeObjectURL(photoPreviews[fieldName]);
    }
    
    // Clear the file and preview
    setFormData((prev) => ({ ...prev, [fieldName]: null }));
    setPhotoPreviews((prev) => ({ ...prev, [fieldName]: null }));
    
    // Clear the file input
    if (typeof window !== 'undefined') {
      const fileInput = document.querySelector('input[name="' + fieldName + '"]') as HTMLInputElement;
      if (fileInput) {
        fileInput.value = '';
      }
    }
  };

  // Cleanup preview URLs on component unmount
  useEffect(() => {
    return () => {
      if (typeof window !== 'undefined') {
        if (photoPreviews.studentPhoto) {
          URL.revokeObjectURL(photoPreviews.studentPhoto);
        }
        if (photoPreviews.fatherPhoto) {
          URL.revokeObjectURL(photoPreviews.fatherPhoto);
        }
        if (photoPreviews.motherPhoto) {
          URL.revokeObjectURL(photoPreviews.motherPhoto);
        }
      }
    };
  }, [photoPreviews.studentPhoto, photoPreviews.fatherPhoto, photoPreviews.motherPhoto]);

  const validateStudentDetails = (): { isValid: boolean; errors: FormErrors } => {
    const newErrors: FormErrors = {};

    // Required fields validation
    if (!formData.firstName.trim()) {
      newErrors.firstName = "First name is required";
    }
    if (!formData.lastName.trim()) {
      newErrors.lastName = "Last name is required";
    }
    if (!formData.gender) {
      newErrors.gender = "Gender is required";
    }
    if (!formData.grade) {
      newErrors.grade = "Grade is required";
    }
    if (!formData.board) {
      newErrors.board = "Board/Curriculum is required";
    }
    if (!formData.dob) {
      newErrors.dob = "Date of birth is required";
    }
    if (!formData.birthState.trim()) {
      newErrors.birthState = "Birth state is required";
    }
    if (!formData.nationality) {
      newErrors.nationality = "Nationality is required";
    }
    if (!formData.aadhar.trim()) {
      newErrors.aadhar = "Aadhar card number is required";
    } else if (!/^\d{4}\s?\d{4}\s?\d{4}$/.test(formData.aadhar.replace(/\s/g, ""))) {
      newErrors.aadhar = "Aadhar card number must be 12 digits";
    }
    if (!formData.bloodGroup) {
      newErrors.bloodGroup = "Blood group is required";
    }
    if (!formData.identificationMarks[0]?.trim() && !formData.identificationMarks[1]?.trim()) {
      newErrors.identificationMarks = "At least one identification mark is required";
    }
    if (!formData.correspondenceAddress.trim()) {
      newErrors.correspondenceAddress = "Correspondence address is required";
    }
    if (!formData.area.trim()) {
      newErrors.area = "Area is required";
    }
    if (!formData.district.trim()) {
      newErrors.district = "District is required";
    }
    if (!formData.state.trim()) {
      newErrors.state = "State is required";
    }
    if (!formData.pincode.trim()) {
      newErrors.pincode = "Pincode is required";
    } else if (!/^\d{6}$/.test(formData.pincode)) {
      newErrors.pincode = "Pincode must be 6 digits";
    }
    if (!formData.motherTongue.trim()) {
      newErrors.motherTongue = "Mother tongue is required";
    }
    if (!formData.religion) {
      newErrors.religion = "Religion is required";
    }
    if (!formData.category) {
      newErrors.category = "Category is required";
    }
    if (!formData.studentPhoto) {
      newErrors.studentPhoto = "Student photo is required";
    }

    // Permanent address validation if different
    if (!formData.samePermanentAddress) {
      if (!formData.permanentAddress.trim()) {
        newErrors.permanentAddress = "Permanent address is required";
      }
      if (!formData.permanentArea.trim()) {
        newErrors.permanentArea = "Permanent area is required";
      }
      if (!formData.permanentDistrict.trim()) {
        newErrors.permanentDistrict = "Permanent district is required";
      }
      if (!formData.permanentState.trim()) {
        newErrors.permanentState = "Permanent state is required";
      }
      if (!formData.permanentPincode.trim()) {
        newErrors.permanentPincode = "Permanent pincode is required";
      } else if (!/^\d{6}$/.test(formData.permanentPincode)) {
        newErrors.permanentPincode = "Permanent pincode must be 6 digits";
      }
    }

    // Validate siblings if any
    formData.siblings.forEach((sibling, index) => {
      if (sibling.name && (!sibling.age || !sibling.institution || !sibling.standard)) {
        newErrors[`sibling_${index}` as keyof FormState] = "Please fill all sibling details or remove the entry";
      }
    });

    setErrors(newErrors);
    return { isValid: Object.keys(newErrors).length === 0, errors: newErrors };
  };

  const validateParentDetails = (): { isValid: boolean; errors: FormErrors } => {
    const newErrors: FormErrors = {};

    // Father&apos;s details
    if (!formData.fatherFullName.trim()) {
      newErrors.fatherFullName = "Father&apos;s full name is required";
    }
    if (!formData.fatherMobile.trim()) {
      newErrors.fatherMobile = "Father&apos;s mobile number is required";
    } else if (!/^\d{10}$/.test(formData.fatherMobile.replace(/\s/g, ""))) {
      newErrors.fatherMobile = "Mobile number must be 10 digits";
    }
    if (!formData.fatherEmail.trim()) {
      newErrors.fatherEmail = "Father&apos;s email is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.fatherEmail)) {
      newErrors.fatherEmail = "Please enter a valid email address";
    }
    if (!formData.fatherAadhar.trim()) {
      newErrors.fatherAadhar = "Father&apos;s Aadhar card number is required";
    } else if (!/^\d{4}\s?\d{4}\s?\d{4}$/.test(formData.fatherAadhar.replace(/\s/g, ""))) {
      newErrors.fatherAadhar = "Aadhar card number must be 12 digits";
    }
    if (!formData.fatherQualification.trim()) {
      newErrors.fatherQualification = "Father&apos;s qualification is required";
    }
    if (!formData.fatherProfession.trim()) {
      newErrors.fatherProfession = "Father&apos;s profession is required";
    }
    if (!formData.fatherPhoto) {
      newErrors.fatherPhoto = "Father&apos;s photo is required";
    }

    // Mother&apos;s details
    if (!formData.motherFullName.trim()) {
      newErrors.motherFullName = "Mother&apos;s full name is required";
    }
    if (!formData.motherMobile.trim()) {
      newErrors.motherMobile = "Mother&apos;s mobile number is required";
    } else if (!/^\d{10}$/.test(formData.motherMobile.replace(/\s/g, ""))) {
      newErrors.motherMobile = "Mobile number must be 10 digits";
    }
    if (!formData.motherEmail.trim()) {
      newErrors.motherEmail = "Mother&apos;s email is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.motherEmail)) {
      newErrors.motherEmail = "Please enter a valid email address";
    }
    if (!formData.motherAadhar.trim()) {
      newErrors.motherAadhar = "Mother&apos;s Aadhar card number is required";
    } else if (!/^\d{4}\s?\d{4}\s?\d{4}$/.test(formData.motherAadhar.replace(/\s/g, ""))) {
      newErrors.motherAadhar = "Aadhar card number must be 12 digits";
    }
    if (!formData.motherQualification.trim()) {
      newErrors.motherQualification = "Mother&apos;s qualification is required";
    }
    if (!formData.motherProfession.trim()) {
      newErrors.motherProfession = "Mother&apos;s profession is required";
    }
    if (!formData.motherPhoto) {
      newErrors.motherPhoto = "Mother&apos;s photo is required";
    }

    // Gross annual income
    if (!formData.grossAnnualIncome.trim()) {
      newErrors.grossAnnualIncome = "Gross annual income is required";
    } else if (isNaN(parseInt(formData.grossAnnualIncome)) || parseInt(formData.grossAnnualIncome) <= 0) {
      newErrors.grossAnnualIncome = "Please enter a valid income amount";
    }

    setErrors(newErrors);
    return { isValid: Object.keys(newErrors).length === 0, errors: newErrors };
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (currentStep === "student") {
      const validation = validateStudentDetails();
      if (validation.isValid) {
        setShowConfirmModal(true);
      } else {
        // Scroll to first error
        const firstErrorField = Object.keys(validation.errors)[0];
        if (firstErrorField && typeof window !== 'undefined') {
          const element = document.querySelector(`[name="${firstErrorField}"]`);
          element?.scrollIntoView({ behavior: "smooth", block: "center" });
        }
      }
    } else if (currentStep === "parent") {
      const validation = validateParentDetails();
      if (validation.isValid) {
        setCurrentStep("preview");
      } else {
        // Scroll to first error
        const firstErrorField = Object.keys(validation.errors)[0];
        if (firstErrorField && typeof window !== 'undefined') {
          const element = document.querySelector(`[name="${firstErrorField}"]`);
          element?.scrollIntoView({ behavior: "smooth", block: "center" });
        }
      }
    } else if (currentStep === "preview") {
      setIsSubmitting(true);
      try {
        // Prepare data for submission (convert File objects to indicators)
        const submissionData = {
          ...formData,
          studentPhoto: formData.studentPhoto ? "Uploaded" : null,
          fatherPhoto: formData.fatherPhoto ? "Uploaded" : null,
          motherPhoto: formData.motherPhoto ? "Uploaded" : null,
        };

        const response = await fetch("/api/admissions/submit", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(submissionData),
        });

        const result = await response.json();

        if (response.ok) {
          // Save submitted application data to localStorage for preview
          if (typeof window !== 'undefined') {
            const dataToStore = {
              ...formData,
              studentPhoto: formData.studentPhoto ? "Uploaded" : null,
              fatherPhoto: formData.fatherPhoto ? "Uploaded" : null,
              motherPhoto: formData.motherPhoto ? "Uploaded" : null,
            };
            localStorage.setItem("lastSubmittedApplication", JSON.stringify(dataToStore));
          }
          
          // Redirect to dashboard page
          router.push("/admissions/dashboard");
        } else {
          alert(`Error submitting form: ${result.error || "Unknown error"}`);
        }
      } catch (error) {
        console.error("Error submitting form:", error);
        alert("Failed to submit form. Please try again later.");
      } finally {
        setIsSubmitting(false);
      }
    }
  };

  const handleConfirmProceed = () => {
    setShowConfirmModal(false);
    setCurrentStep("parent");
  };

  const handleCancelConfirm = () => {
    setShowConfirmModal(false);
  };

  const handleSaveDraft = () => {
    console.log("Form draft saved:", formData);
    alert("Draft saved successfully.");
  };

  const handlePreviousStep = () => {
    if (currentStep === "parent") {
      setCurrentStep("student");
    } else if (currentStep === "preview") {
      setCurrentStep("parent");
    }
  };

  const getStepStage = (stepId: StepId): "active" | "completed" | "upcoming" => {
    const currentIndex = progressSteps.findIndex((s) => s.id === currentStep);
    const stepIndex = progressSteps.findIndex((s) => s.id === stepId);
    if (stepIndex < currentIndex) return "completed";
    if (stepIndex === currentIndex) return "active";
    return "upcoming";
  };

  return (
    <main className="admission-flow-page">
      {/* Instructions Modal */}
      {showInstructionsModal && (
        <div className="modal-overlay" onClick={() => setShowInstructionsModal(false)}>
          <div className="modal-content instructions-modal" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h3 className="modal-title">Instructions</h3>
            </div>
            <div className="modal-body">
              <div className="instructions-content">
                <p className="instructions-intro">
                  At Doon International School (DIS) Hyderabad, we are committed to nurturing young talents 
                  while celebrating traditions. Our approach blends core Indian values with a global perspective, 
                  ensuring that every child receives a well-rounded, holistic education.
                </p>

                <h4 className="instructions-subtitle">General Instructions while filling out the form:</h4>

                <ol className="instructions-list">
                  <li>
                    Provide accurate and complete information about the student, including full name, date of 
                    birth, gender, nationality, and contact details
                  </li>
                  <li>
                    Provide information about the student&apos;s parents or guardians, including their names, 
                    occupations, and contact details
                  </li>
                  <li>
                    Grades 3 - 11 may require an entrance assessment or interview. We suggest a basic preparation 
                    for interviews, assessments, or interactions that the school may require as part of the admission 
                    process. Details will be provided after receiving the application.
                  </li>
                  <li>
                    Pay the required non-refundable application fee, which is mentioned in the instructions. 
                    Ensure you keep a record of the payment receipt.
                  </li>
                  <li>
                    Once the admission decision is made, parents or guardians will be notified through email 
                    or Telephone call
                  </li>
                </ol>
              </div>
            </div>
            <div className="modal-footer">
              <button 
                type="button" 
                className="modal-button-close" 
                onClick={() => setShowInstructionsModal(false)}
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Confirmation Modal */}
      {showConfirmModal && (
        <div className="modal-overlay" onClick={handleCancelConfirm}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h3 className="modal-title">Confirm Your Selections</h3>
            </div>
            <div className="modal-body">
              <div className="confirm-selections">
                <div className="confirm-item">
                  <span className="confirm-label">Grade:</span>
                  <span className="confirm-value">{formData.grade}</span>
                </div>
                <div className="confirm-item">
                  <span className="confirm-label">Curriculum:</span>
                  <span className="confirm-value">{formData.board}</span>
                </div>
              </div>
              <p className="confirm-question">Do you want to proceed with these selections?</p>
            </div>
            <div className="modal-footer">
              <button type="button" className="modal-button-cancel" onClick={handleCancelConfirm}>
                Go Back & Edit
              </button>
              <button type="button" className="modal-button-confirm" onClick={handleConfirmProceed}>
                Save & Proceed
              </button>
            </div>
          </div>
        </div>
      )}
      <section className="hero-banner">
        <div className="hero-media">
          <Image
            src="/images/image.png"
            alt="Doon International School campus"
            fill
            quality={90}
            className="hero-image"
            priority
          />
        </div>
        <div className="hero-overlay" />
        <div className="hero-content container">
          <div className="hero-brand">
            <div className="crest-wrapper">
              <div className="crest">
                <Image
                  src="/images/doon-logo.png"
                  alt="Doon International School emblem"
                  fill
                  className="crest-image"
                  priority
                />
              </div>
            </div>
          </div>
          <div className="hero-middle">
            <div className="hero-title-banner">
              <h1 className="hero-title">Admission Application Form</h1>
            </div>
          </div>
          <div className="hero-right">
          <button type="button" className="logout-button">
            Log out
          </button>
          </div>
        </div>
      </section>

      <section className="steps-section container">
        <div className="progress-steps" role="list">
          {progressSteps.map((step, index) => {
            const stage = getStepStage(step.id);
            return (
            <div className="progress-step-wrapper" key={step.id}>
              <div className={`progress-step ${stage}`} role="listitem">
                <span className={`step-circle ${stage === "active" || stage === "completed" ? "active" : ""} ${stage === "completed" ? "completed" : ""}`}>
                  {stage === "completed" ? (
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41L9 16.17z" fill="currentColor"/>
                    </svg>
                  ) : (
                    <>
                      {step.id === "student" && (
                        <svg width="28" height="28" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <path d="M12 12C14.21 12 16 10.21 16 8C16 5.79 14.21 4 12 4C9.79 4 8 5.79 8 8C8 10.21 9.79 12 12 12Z" fill="currentColor"/>
                          <path d="M12 14C9.33 14 4 15.34 4 18V20H20V18C20 15.34 14.67 14 12 14Z" fill="currentColor"/>
                          <rect x="6" y="16" width="12" height="2" rx="1" fill="currentColor"/>
                          <rect x="7" y="18" width="10" height="1" rx="0.5" fill="currentColor"/>
                        </svg>
                      )}
                      {step.id === "parent" && (
                        <svg width="28" height="28" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <circle cx="8" cy="7" r="3.5" fill="currentColor"/>
                          <path d="M8 13C5.33 13 0 14.34 0 17V19H16V17C16 14.34 10.67 13 8 13Z" fill="currentColor"/>
                          <circle cx="16" cy="7" r="3.5" fill="currentColor"/>
                          <path d="M16 13C13.33 13 8 14.34 8 17V19H24V17C24 14.34 18.67 13 16 13Z" fill="currentColor"/>
                        </svg>
                      )}
                      {step.id === "preview" && (
                        <svg width="28" height="28" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <path d="M14 2H6C4.9 2 4 2.9 4 4V20C4 21.1 4.89 22 5.99 22H18C19.1 22 20 21.1 20 20V8L14 2Z" fill="currentColor"/>
                          <circle cx="16" cy="16" r="3.5" stroke="currentColor" strokeWidth="1.5" fill="none"/>
                          <path d="M19 19L21.5 21.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
                        </svg>
                      )}
                    </>
                  )}
                </span>
                <span className="step-label">{step.label}</span>
              </div>
              {index < progressSteps.length - 1 && (
                <span className="progress-separator" aria-hidden="true" />
              )}
            </div>
            );
          })}
        </div>
      </section>

      <section className="form-section">
        <form className="admission-form container" onSubmit={handleSubmit}>
          {currentStep === "student" && (
          <>
          <div className="form-card">
            <div className="card-head">
              <h2>Student Details</h2>
              <p>Enter your name and the curriculum you are applying for.</p>
            </div>

            <div className="form-grid">
              <label>
                <span>First Name</span>
                <input
                  name="firstName"
                  value={formData.firstName}
                  onChange={handleInputChange}
                  placeholder="Enter First Name"
                  autoComplete="given-name"
                  className={errors.firstName ? "error" : ""}
                />
                {errors.firstName ? (
                  <span className="error-message">{errors.firstName}</span>
                ) : (
                  <span className="field-hint">As per official records</span>
                )}
              </label>
              <label>
                <span>Middle Name</span>
                <input
                  name="middleName"
                  value={formData.middleName}
                  onChange={handleInputChange}
                  placeholder="Enter Middle Name"
                  autoComplete="additional-name"
                />
                <span className="field-hint">As per official records</span>
              </label>
              <label>
                <span>Last Name</span>
                <input
                  name="lastName"
                  value={formData.lastName}
                  onChange={handleInputChange}
                  placeholder="Enter Last Name"
                  autoComplete="family-name"
                  className={errors.lastName ? "error" : ""}
                />
                {errors.lastName ? (
                  <span className="error-message">{errors.lastName}</span>
                ) : (
                  <span className="field-hint">As per official records</span>
                )}
              </label>
            </div>

            <div className="form-grid">
              <label>
                <span>Gender</span>
                <select name="gender" value={formData.gender} onChange={handleInputChange} className={errors.gender ? "error" : ""}>
                  <option value="" disabled>
                    Select Gender
                  </option>
                  {genderOptions.map((option) => (
                    <option key={option} value={option}>
                      {option}
                    </option>
                  ))}
                </select>
                {errors.gender && <span className="error-message">{errors.gender}</span>}
              </label>
              <label>
                <span>Grade</span>
                <select name="grade" value={formData.grade} onChange={handleInputChange} className={errors.grade ? "error" : ""}>
                  <option value="" disabled>
                    admission is being sought For
                  </option>
                  {gradeOptions.map((grade) => (
                    <option key={grade} value={grade}>
                      {grade}
                    </option>
                  ))}
                </select>
                {errors.grade && <span className="error-message">{errors.grade}</span>}
              </label>
              <label>
                <span>Board/Curriculum Interested In</span>
                <select name="board" value={formData.board} onChange={handleInputChange} className={errors.board ? "error" : ""}>
                  <option value="" disabled>
                    Select Grade
                  </option>
                  {boardOptions.map((board) => (
                    <option key={board} value={board}>
                      {board}
                    </option>
                  ))}
                </select>
                {errors.board && <span className="error-message">{errors.board}</span>}
              </label>
            </div>
          </div>

          <div className="form-card">
            <div className="card-head">
              <h3>Personal Information</h3>
              <p>Provide your birth details and official documents.</p>
            </div>

            <div className="form-grid">
              <label>
                <span>Date Of Birth</span>
                <input
                  type="date"
                  name="dob"
                  value={formData.dob}
                  onChange={handleInputChange}
                  placeholder="Enter Date Of Birth"
                />
              </label>
              <label>
                <span>Birth Regio/District</span>
                <input
                  name="birthRegion"
                  value={formData.birthRegion}
                  onChange={handleInputChange}
                  placeholder="Enter Region/Dirstrict"
                />
              </label>
              <label>
                <span>Birth State</span>
                <input
                  name="birthState"
                  value={formData.birthState}
                  onChange={handleInputChange}
                  placeholder="Enter State Name"
                />
              </label>
            </div>

            <div className="form-grid">
              <label>
                <span>Nationality</span>
                <input
                  name="nationality"
                  value={formData.nationality}
                  onChange={handleInputChange}
placeholder="Enter Nationality"
                >
                </input>
                {errors.nationality && <span className="error-message">{errors.nationality}</span>}
              </label>
              <label>
                <span>Aadhar Card No</span>
                <input
                  name="aadhar"
                  inputMode="numeric"
                  value={formData.aadhar}
                  onChange={handleInputChange}
                  placeholder="0000 0000 0000"
                  className={errors.aadhar ? "error" : ""}
                />
                {errors.aadhar ? (
                  <span className="error-message">{errors.aadhar}</span>
                ) : null}
              </label>
              <label>
                <span>Blood Group</span>
                <select
                  name="bloodGroup"
                  value={formData.bloodGroup}
                  onChange={handleInputChange}
                  className={errors.bloodGroup ? "error" : ""}
                >
                  <option value="" disabled>
                    Select Blood Group
                  </option>
                  {bloodGroups.map((group) => (
                    <option key={group} value={group}>
                      {group}
                    </option>
                  ))}
                </select>
                {errors.bloodGroup && <span className="error-message">{errors.bloodGroup}</span>}
              </label>
            </div>
          </div>

          <div className="form-card">
            <div className="card-head">
              <h3>Student Identification Marks</h3>
              <p>List two distinctive marks that help identify the student.</p>
            </div>

            <div className="marks-section">
              {formData.identificationMarks.map((value, index) => (
                <div className="mark-line" key={`mark-${index}`}>
                  <span>{index + 1}.</span>
                  <input
                    name={`identificationMark-${index}`}
                    value={value}
                    onChange={handleMarkChange(index)}
                    placeholder="Enter identification mark"
                    className={errors.identificationMarks ? "error" : ""}
                  />
                </div>
              ))}
              {errors.identificationMarks && (
                <span className="error-message">{errors.identificationMarks}</span>
              )}
            </div>
          </div>

          <div className="form-card">
            <div className="card-head">
              <h3>Address For Correspondence</h3>
              <p>Provide the complete correspondence address in India.</p>
            </div>

            <div className="address-layout">
              <label className="address-textarea-label">
              <span>Address</span>
              <textarea
                name="correspondenceAddress"
                value={formData.correspondenceAddress}
                onChange={handleInputChange}
                  placeholder="Enter Address"
                className={errors.correspondenceAddress ? "error" : ""}
              />
              {errors.correspondenceAddress && (
                <span className="error-message">{errors.correspondenceAddress}</span>
              )}
            </label>

              <div className="address-fields-column">
              <label>
                <span>Area</span>
                <input
                  name="area"
                  value={formData.area}
                  onChange={handleInputChange}
                  placeholder="Enter Area"
                />
              </label>
              <label>
                <span>District</span>
                <input
                  name="district"
                  value={formData.district}
                  onChange={handleInputChange}
                  placeholder="Enter District"
                />
              </label>
              <label>
                <span>State</span>
                <input
                  name="state"
                  value={formData.state}
                  onChange={handleInputChange}
                  placeholder="Enter State"
                />
              </label>
              <label>
                <span>Country</span>
                <select name="country" value={formData.country} onChange={handleInputChange}>
                  {countryOptions.map((country) => (
                    <option key={country} value={country}>
                      {country}
                    </option>
                  ))}
                </select>
              </label>
              <label>
                <span>Pincode</span>
                <input
                  name="pincode"
                  inputMode="numeric"
                  value={formData.pincode}
                  onChange={handleInputChange}
                  placeholder="Enter Pincode"
                />
              </label>
              </div>
            </div>

            <div className="toggle-row">
              <span className="toggle-prompt">
                Is the correspondence address and permanent address same?
              </span>
              <div className="toggle-buttons">
                <button
                  type="button"
                  className={`toggle-chip ${formData.samePermanentAddress ? "active" : ""}`}
                  onClick={() => toggleSameAddress(true)}
                >
                  Yes
                </button>
                <button
                  type="button"
                  className={`toggle-chip ${!formData.samePermanentAddress ? "active" : ""}`}
                  onClick={() => toggleSameAddress(false)}
                >
                  No
                </button>
              </div>
            </div>
          </div>

          {!formData.samePermanentAddress && (
            <div className="form-card">
              <div className="card-head">
                <h3>Permanent Address</h3>
                <p>Provide the complete permanent address.</p>
              </div>

              <div className="address-layout">
                <label className="address-textarea-label">
                  <span>Address</span>
                  <textarea
                    name="permanentAddress"
                    value={formData.permanentAddress}
                    onChange={handleInputChange}
                    placeholder="Enter permanent Address"
                  />
                </label>

                <div className="address-fields-column">
                  <label>
                    <span>Area</span>
                    <input
                      name="permanentArea"
                      value={formData.permanentArea}
                      onChange={handleInputChange}
                      placeholder="Enter Area"
                    />
                  </label>
                  <label>
                    <span>District</span>
                    <input
                      name="permanentDistrict"
                      value={formData.permanentDistrict}
                      onChange={handleInputChange}
                      placeholder="Enter District"
                    />
                  </label>
                  <label>
                    <span>State</span>
                    <input
                      name="permanentState"
                      value={formData.permanentState}
                      onChange={handleInputChange}
                      placeholder="Enter State"
                    />
                  </label>
                  <label>
                    <span>Country</span>
                    <select
                      name="permanentCountry"
                      value={formData.permanentCountry}
                      onChange={handleInputChange}
                    >
                      {countryOptions.map((country) => (
                        <option key={country} value={country}>
                          {country}
                        </option>
                      ))}
                    </select>
                  </label>
                  <label>
                    <span>Pincode</span>
                    <input
                      name="permanentPincode"
                      inputMode="numeric"
                      value={formData.permanentPincode}
                      onChange={handleInputChange}
                      placeholder="Enter Pincode"
                    />
                  </label>
                </div>
              </div>
            </div>
          )}

          <div className="form-card">
            <div className="card-head">
              <h3>Additional Information</h3>
              <p>Provide additional personal and family details.</p>
            </div>

            <div className="form-grid-two-column">
              <div className="form-column">
                <label>
                  <span>Mother Tongue</span>
                  <input
                    name="motherTongue"
                    value={formData.motherTongue}
                    onChange={handleInputChange}
                    placeholder="Enter Mother Tongue"
                    className={errors.motherTongue ? "error" : ""}
                  />
                  {errors.motherTongue ? (
                    <span className="error-message">{errors.motherTongue}</span>
                  ) : null}
                </label>

                <label>
                  <span>Category</span>
                  <select name="category" value={formData.category} onChange={handleInputChange} className={errors.category ? "error" : ""}>
                    <option value="" disabled>
                      Select Category
                    </option>
                    {categoryOptions.map((cat) => (
                      <option key={cat} value={cat}>
                        {cat}
                      </option>
                    ))}
                  </select>
                  {errors.category ? (
                    <span className="error-message">{errors.category}</span>
                  ) : (
                    <span className="field-hint">
                      This information is being collected solely for Board requirements. The
                      school/College does not require or use this data for any internal purposes.
                    </span>
                  )}
                </label>

                <label>
                  <span>Sub caste</span>
                  <input
                    name="subCaste"
                    value={formData.subCaste}
                    onChange={handleInputChange}
                    placeholder="Enter Sub Caste"
                  />
                  <span className="field-hint">
                    This information is being collected solely for Board requirements. The
                    school/College does not require or use this data for any internal purposes.
                  </span>
                </label>

                <label>
                  <span>Family Structure (for administrative records only)</span>
                  <select
                    name="familyStructure"
                    value={formData.familyStructure}
                    onChange={handleInputChange}
                  >
                    {familyStructureOptions.map((structure) => (
                      <option key={structure} value={structure}>
                        {structure}
                      </option>
                    ))}
                  </select>
                  <span className="field-hint">If Yes Select Father or Mother.</span>
                </label>

                <div className="siblings-section">
                  <h4>Siblings Details</h4>
                  <div className="siblings-table">
                    <div className="siblings-header">
                      <div>Name</div>
                      <div>Age</div>
                      <div>Name Of the Institution</div>
                      <div>Standard</div>
                      <div></div>
                    </div>
                    {formData.siblings.map((sibling, index) => (
                      <div key={index} className="siblings-row">
                        <input
                          value={sibling.name}
                          onChange={(e) => handleSiblingChange(index, "name", e.target.value)}
                          placeholder="Enter Name"
                        />
                        <input
                          value={sibling.age}
                          onChange={(e) => handleSiblingChange(index, "age", e.target.value)}
                          placeholder="Enter Age"
                          type="number"
                        />
                        <input
                          value={sibling.institution}
                          onChange={(e) =>
                            handleSiblingChange(index, "institution", e.target.value)
                          }
                          placeholder="Enter Institution"
                        />
                        <input
                          value={sibling.standard}
                          onChange={(e) =>
                            handleSiblingChange(index, "standard", e.target.value)
                          }
                          placeholder="Enter Standard"
                        />
                        <button
                          type="button"
                          className="remove-sibling"
                          onClick={() => removeSibling(index)}
                        >
                          🗑️
                        </button>
                      </div>
                    ))}
                    <button type="button" className="add-sibling" onClick={addSibling}>
                      +
                    </button>
                  </div>
                </div>
              </div>

              <div className="form-column">
                <label>
                  <span>Religion</span>
                  <select name="religion" value={formData.religion} onChange={handleInputChange} className={errors.religion ? "error" : ""}>
                    <option value="" disabled>
                      Select Religion
                    </option>
                    {religionOptions.map((rel) => (
                      <option key={rel} value={rel}>
                        {rel}
                      </option>
                    ))}
                  </select>
                  {errors.religion ? (
                    <span className="error-message">{errors.religion}</span>
                  ) : (
                    <span className="field-hint">
                      This information is being collected solely for Board requirements. The
                      school/College does not require or use this data for any internal purposes.
                    </span>
                  )}
                </label>

                <label>
                  <span>Caste</span>
                  <input
                    name="caste"
                    value={formData.caste}
                    onChange={handleInputChange}
                    placeholder="Enter Caste"
                  />
                  <span className="field-hint">
                    This information is being collected solely for Board requirements. The
                    school/College does not require or use this data for any internal purposes.
                  </span>
                </label>

                <label>
                  <span>AAPAR ID</span>
                  <input
                    name="apaarId"
                    value={formData.apaarId}
                    onChange={handleInputChange}
                    placeholder="Enter APAAR ID"
                  />
                  <span className="field-hint">
                    Enter Automated Permanent Academin Account Registry
                  </span>
                </label>
              </div>
            </div>
          </div>

          <div className="form-card">
            <div className="card-head">
              <h3>Student Recent Photo</h3>
              <p>Upload a recent passport size photograph.</p>
            </div>

            <div className="photo-upload">
              <label className="photo-upload-label">
                <input
                  type="file"
                  name="studentPhoto"
                  accept="image/jpeg,image/png,image/jpg"
                  onChange={handleFileChange}
                  className="photo-input"
                />
                <div className={`photo-upload-box ${errors.studentPhoto ? "error" : ""} ${photoPreviews.studentPhoto ? "has-preview" : ""}`}>
                  {photoPreviews.studentPhoto ? (
                    <>
                      <div className="photo-preview-wrapper">
                        <img src={photoPreviews.studentPhoto} alt="Student photo preview" className="photo-preview" />
                        <button
                          type="button"
                          className="photo-discard-btn"
                          onClick={(e) => {
                            e.preventDefault();
                            e.stopPropagation();
                            handleDiscardPhoto("studentPhoto");
                          }}
                          title="Discard image"
                        >
                          ×
                        </button>
                      </div>
                      <div className="photo-upload-indicator">
                        <span className="photo-checkmark">✓</span>
                        <span className="photo-upload-text">Image uploaded</span>
                      </div>
                    </>
                  ) : (
                    <>
                      <div className="photo-icon"></div>
                      <div className="photo-text">Click to upload</div>
                      <div className="photo-hint">JPEG, PNG, JPG Max size: 10MB</div>
                    </>
                  )}
                </div>
              </label>
              {errors.studentPhoto ? (
                <span className="error-message">{errors.studentPhoto}</span>
              ) : (
                <span className="field-hint">Upload recent passport size photograph.</span>
              )}
            </div>
          </div>

          <div className="submit-row">
            <button type="button" className="draft-button" onClick={handleSaveDraft}>
              Save as draft
            </button>
            <button className="submit-button" type="submit">
              Save & Proceed
            </button>
          </div>
          </>
          )}

          {currentStep === "parent" && (
            <>
              <div className="form-card">
                <div className="card-head">
                  <h2>Parent Details</h2>
                  <p>Enter parent/guardian information as per official documents.</p>
                </div>

                <div className="form-grid-two-column">
                  {/* Father&apos;s Details Column */}
                  <div className="form-column">
                    <label>
                      <span>Father&apos;s Full Name</span>
                      <input
                        name="fatherFullName"
                        value={formData.fatherFullName}
                        onChange={handleInputChange}
                        placeholder="Enter Father&apos;s Name"
                        autoComplete="name"
                        className={errors.fatherFullName ? "error" : ""}
                      />
                      {errors.fatherFullName ? (
                        <span className="error-message">{errors.fatherFullName}</span>
                      ) : (
                        <span className="field-hint">As per official document</span>
                      )}
                    </label>

                    <label>
                      <span>Father&apos;s Mobile Number</span>
                      <div className="mobile-input-group">
                        <select
                          name="fatherMobileCode"
                          value={formData.fatherMobileCode}
                          onChange={handleInputChange}
                          className="mobile-code-select"
                        >
                          <option value="+91">+91</option>
                          <option value="+1">+1</option>
                          <option value="+44">+44</option>
                          <option value="+971">+971</option>
                        </select>
                        <input
                          name="fatherMobile"
                          value={formData.fatherMobile}
                          onChange={handleInputChange}
                          placeholder="000 000 0000"
                          inputMode="tel"
                          autoComplete="tel"
                          className={errors.fatherMobile ? "error" : ""}
                        />
                      </div>
                      {errors.fatherMobile && <span className="error-message">{errors.fatherMobile}</span>}
                    </label>

                    <label>
                      <span>Father&apos;s Email Id</span>
                      <input
                        name="fatherEmail"
                        type="email"
                        value={formData.fatherEmail}
                        onChange={handleInputChange}
                        placeholder="Enter Father&apos;s Email Id"
                        autoComplete="email"
                        className={errors.fatherEmail ? "error" : ""}
                      />
                      {errors.fatherEmail && <span className="error-message">{errors.fatherEmail}</span>}
                    </label>

                    <label>
                      <span>Father&apos;s Aadhar Card Number</span>
                      <input
                        name="fatherAadhar"
                        value={formData.fatherAadhar}
                        onChange={handleInputChange}
                        placeholder="Enter Father&apos;s Aadhar Card Number"
                        inputMode="numeric"
                        className={errors.fatherAadhar ? "error" : ""}
                      />
                      {errors.fatherAadhar && <span className="error-message">{errors.fatherAadhar}</span>}
                    </label>

                    <label>
                      <span>Qualification</span>
                      <input
                        name="fatherQualification"
                        value={formData.fatherQualification}
                        onChange={handleInputChange}
                        placeholder="Enter Qualification"
                        className={errors.fatherQualification ? "error" : ""}
                      />
                      {errors.fatherQualification && <span className="error-message">{errors.fatherQualification}</span>}
                    </label>

                    <label>
                      <span>Profession</span>
                      <input
                        name="fatherProfession"
                        value={formData.fatherProfession}
                        onChange={handleInputChange}
                        placeholder="Enter Profession"
                        className={errors.fatherProfession ? "error" : ""}
                      />
                      {errors.fatherProfession && <span className="error-message">{errors.fatherProfession}</span>}
                    </label>

                    <div className="photo-upload">
                      <span className="photo-upload-label-text">Father&apos;s Recent Photo</span>
                      <label className="photo-upload-label">
                        <input
                          type="file"
                          name="fatherPhoto"
                          accept="image/jpeg,image/png,image/jpg"
                          onChange={handleFileChange}
                          className="photo-input"
                        />
                        <div className={`photo-upload-box ${errors.fatherPhoto ? "error" : ""} ${photoPreviews.fatherPhoto ? "has-preview" : ""}`}>
                          {photoPreviews.fatherPhoto ? (
                            <>
                              <div className="photo-preview-wrapper">
                                <img src={photoPreviews.fatherPhoto} alt="Father photo preview" className="photo-preview" />
                                <button
                                  type="button"
                                  className="photo-discard-btn"
                                  onClick={(e) => {
                                    e.preventDefault();
                                    e.stopPropagation();
                                    handleDiscardPhoto("fatherPhoto");
                                  }}
                                  title="Discard image"
                                >
                                  ×
                                </button>
                              </div>
                              <div className="photo-upload-indicator">
                                <span className="photo-checkmark">✓</span>
                                <span className="photo-upload-text">Image uploaded</span>
                              </div>
                            </>
                          ) : (
                            <>
                              <div className="photo-icon"></div>
                              <div className="photo-text">Click to upload</div>
                              <div className="photo-hint">JPEG, PNG, JPG Max size: 10MB</div>
                            </>
                          )}
                        </div>
                      </label>
                      {errors.fatherPhoto ? (
                        <span className="error-message">{errors.fatherPhoto}</span>
                      ) : (
                        <span className="field-hint">Upload recent passport size photograph.</span>
                      )}
                    </div>
                  </div>

                  {/* Mother&apos;s Details Column */}
                  <div className="form-column">
                    <label>
                      <span>Mother&apos;s Full Name</span>
                      <input
                        name="motherFullName"
                        value={formData.motherFullName}
                        onChange={handleInputChange}
                        placeholder="Enter Mother&apos;s Full Name"
                        autoComplete="name"
                        className={errors.motherFullName ? "error" : ""}
                      />
                      {errors.motherFullName ? (
                        <span className="error-message">{errors.motherFullName}</span>
                      ) : (
                        <span className="field-hint">As per official document</span>
                      )}
                    </label>

                    <label>
                      <span>Mother&apos;s Mobile Number</span>
                      <div className="mobile-input-group">
                        <select
                          name="motherMobileCode"
                          value={formData.motherMobileCode}
                          onChange={handleInputChange}
                          className="mobile-code-select"
                        >
                          <option value="+91">+91</option>
                          <option value="+1">+1</option>
                          <option value="+44">+44</option>
                          <option value="+971">+971</option>
                        </select>
                        <input
                          name="motherMobile"
                          value={formData.motherMobile}
                          onChange={handleInputChange}
                          placeholder="000 000 0000"
                          inputMode="tel"
                          autoComplete="tel"
                          className={errors.motherMobile ? "error" : ""}
                        />
                      </div>
                      {errors.motherMobile && <span className="error-message">{errors.motherMobile}</span>}
                    </label>

                    <label>
                      <span>Mother&apos;s Email Id</span>
                      <input
                        name="motherEmail"
                        type="email"
                        value={formData.motherEmail}
                        onChange={handleInputChange}
                        placeholder="Enter Mother&apos;s Email Id"
                        autoComplete="email"
                        className={errors.motherEmail ? "error" : ""}
                      />
                      {errors.motherEmail && <span className="error-message">{errors.motherEmail}</span>}
                    </label>

                    <label>
                      <span>Mother&apos;s Aadhar Card Number</span>
                      <input
                        name="motherAadhar"
                        value={formData.motherAadhar}
                        onChange={handleInputChange}
                        placeholder="Enter Mother&apos;s Aadhar Card Number"
                        inputMode="numeric"
                        className={errors.motherAadhar ? "error" : ""}
                      />
                      {errors.motherAadhar && <span className="error-message">{errors.motherAadhar}</span>}
                    </label>

                    <label>
                      <span>Qualification</span>
                      <input
                        name="motherQualification"
                        value={formData.motherQualification}
                        onChange={handleInputChange}
                        placeholder="Enter Qualification"
                        className={errors.motherQualification ? "error" : ""}
                      />
                      {errors.motherQualification && <span className="error-message">{errors.motherQualification}</span>}
                    </label>

                    <label>
                      <span>Profession</span>
                      <input
                        name="motherProfession"
                        value={formData.motherProfession}
                        onChange={handleInputChange}
                        placeholder="Enter Profession"
                        className={errors.motherProfession ? "error" : ""}
                      />
                      {errors.motherProfession && <span className="error-message">{errors.motherProfession}</span>}
                    </label>

                    <div className="photo-upload">
                      <span className="photo-upload-label-text">Mother&apos;s Recent Photo</span>
                      <label className="photo-upload-label">
                        <input
                          type="file"
                          name="motherPhoto"
                          accept="image/jpeg,image/png,image/jpg"
                          onChange={handleFileChange}
                          className="photo-input"
                        />
                        <div className={`photo-upload-box ${errors.motherPhoto ? "error" : ""} ${photoPreviews.motherPhoto ? "has-preview" : ""}`}>
                          {photoPreviews.motherPhoto ? (
                            <>
                              <div className="photo-preview-wrapper">
                                <img src={photoPreviews.motherPhoto} alt="Mother photo preview" className="photo-preview" />
                                <button
                                  type="button"
                                  className="photo-discard-btn"
                                  onClick={(e) => {
                                    e.preventDefault();
                                    e.stopPropagation();
                                    handleDiscardPhoto("motherPhoto");
                                  }}
                                  title="Discard image"
                                >
                                  ×
                                </button>
                              </div>
                              <div className="photo-upload-indicator">
                                <span className="photo-checkmark">✓</span>
                                <span className="photo-upload-text">Image uploaded</span>
                              </div>
                            </>
                          ) : (
                            <>
                              <div className="photo-icon"></div>
                              <div className="photo-text">Click to upload</div>
                              <div className="photo-hint">JPEG, PNG, JPG Max size: 10MB</div>
                            </>
                          )}
                        </div>
                      </label>
                      {errors.motherPhoto ? (
                        <span className="error-message">{errors.motherPhoto}</span>
                      ) : (
                        <span className="field-hint">Upload recent passport size photograph.</span>
                      )}
                    </div>
                  </div>
                </div>

                <div className="form-grid" style={{ marginTop: "1.5rem" }}>
                  <label>
                    <span>Gross Annual Income (INR)</span>
                    <input
                      name="grossAnnualIncome"
                      value={formData.grossAnnualIncome}
                      onChange={handleInputChange}
                      placeholder="Enter Annual Income"
                      inputMode="numeric"
                      className={errors.grossAnnualIncome ? "error" : ""}
                    />
                    {errors.grossAnnualIncome && <span className="error-message">{errors.grossAnnualIncome}</span>}
                  </label>
                </div>
              </div>

              <div className="submit-row">
                <button type="button" className="draft-button" onClick={handlePreviousStep}>
                  Previous Step
                </button>
                <button type="button" className="draft-button" onClick={handleSaveDraft}>
                  Save as draft
                </button>
                <button className="submit-button" type="submit">
                  Save & Proceed
                </button>
              </div>
            </>
          )}

          {currentStep === "preview" && (
            <>
              {/* Student Details Preview */}
              <div className="form-card">
                <div className="card-head">
                  <h2>Student Details</h2>
                  <p>Review all student information before submitting.</p>
                </div>

                <div className="preview-student-card">
                  {photoPreviews.studentPhoto && (
                    <div className="preview-photo">
                      <img
                        src={photoPreviews.studentPhoto}
                        alt="Student"
                        className="preview-photo-img"
                      />
                    </div>
                  )}
                  <div className="preview-student-info">
                    <h3 className="preview-name">
                      {[formData.firstName, formData.middleName, formData.lastName].filter(Boolean).join(' ') || 'Not provided'}
                    </h3>
                    <p className="preview-grade">
                      Grade: {formData.grade || 'Not provided'} {formData.board ? `- ${formData.board}` : ''}
                    </p>
                    <p className="preview-dob">
                      DOB: {formData.dob ? (() => {
                        try {
                          return new Date(formData.dob).toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' });
                        } catch {
                          return formData.dob;
                        }
                      })() : 'Not provided'}
                    </p>
                  </div>
                </div>

                <div className="preview-details-grid">
                  <div className="preview-details-column">
                    <div className="preview-detail-item">
                      <span className="preview-label">Grade Applied For:</span>
                      <span className="preview-value">{formData.grade || 'Not provided'}</span>
                    </div>
                    <div className="preview-detail-item">
                      <span className="preview-label">Gender:</span>
                      <span className="preview-value">{formData.gender || 'Not provided'}</span>
                    </div>
                    <div className="preview-detail-item">
                      <span className="preview-label">Birth State:</span>
                      <span className="preview-value">{formData.birthState || 'Not provided'}</span>
                    </div>
                    <div className="preview-detail-item">
                      <span className="preview-label">Aadhar Card No.:</span>
                      <span className="preview-value">{formData.aadhar || 'Not provided'}</span>
                    </div>
                    <div className="preview-detail-item">
                      <span className="preview-label">Address For Correspondence:</span>
                      <span className="preview-value">
                        {formData.correspondenceAddress || 'Not provided'}
                        {formData.area && `, ${formData.area}`}
                        {formData.district && `, ${formData.district}`}
                        {formData.state && `, ${formData.state}`}
                        {formData.pincode && ` - ${formData.pincode}`}
                      </span>
                    </div>
                    <div className="preview-detail-item">
                      <span className="preview-label">Mother Tongue:</span>
                      <span className="preview-value">{formData.motherTongue || 'Not provided'}</span>
                    </div>
                    <div className="preview-detail-item">
                      <span className="preview-label">Category:</span>
                      <span className="preview-value">{formData.category || 'Not provided'}</span>
                    </div>
                    <div className="preview-detail-item">
                      <span className="preview-label">Sub-Caste:</span>
                      <span className="preview-value">{formData.subCaste || 'Not provided'}</span>
                    </div>
                    <div className="preview-detail-item">
                      <span className="preview-label">Family Structure:</span>
                      <span className="preview-value">{formData.familyStructure || 'Not provided'}</span>
                    </div>
                  </div>

                  <div className="preview-details-column">
                    <div className="preview-detail-item">
                      <span className="preview-label">Date Of Birth:</span>
                      <span className="preview-value">
                        {formData.dob ? (() => {
                          try {
                            return new Date(formData.dob).toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' });
                          } catch {
                            return formData.dob;
                          }
                        })() : 'Not provided'}
                      </span>
                    </div>
                    <div className="preview-detail-item">
                      <span className="preview-label">Birth Region/District:</span>
                      <span className="preview-value">{formData.birthRegion || 'Not provided'}</span>
                    </div>
                    <div className="preview-detail-item">
                      <span className="preview-label">Nationality:</span>
                      <span className="preview-value">{formData.nationality || 'Not provided'}</span>
                    </div>
                    <div className="preview-detail-item">
                      <span className="preview-label">Blood Group:</span>
                      <span className="preview-value">{formData.bloodGroup || 'Not provided'}</span>
                    </div>
                    <div className="preview-detail-item">
                      <span className="preview-label">Personal Details:</span>
                      <span className="preview-value">
                        {formData.samePermanentAddress ? 'Same as Correspondence' : 'Different'}
                      </span>
                    </div>
                    <div className="preview-detail-item">
                      <span className="preview-label">Religion:</span>
                      <span className="preview-value">{formData.religion || 'Not provided'}</span>
                    </div>
                    <div className="preview-detail-item">
                      <span className="preview-label">Caste:</span>
                      <span className="preview-value">{formData.caste || 'Not provided'}</span>
                    </div>
                    <div className="preview-detail-item">
                      <span className="preview-label">AAPAR ID:</span>
                      <span className="preview-value">{formData.apaarId || 'Not provided'}</span>
                    </div>
                    <div className="preview-detail-item">
                      <span className="preview-label">Student Identification Marks:</span>
                      <span className="preview-value">
                        {formData.identificationMarks.filter(m => m).join(', ') || 'Not provided'}
                      </span>
                    </div>
                  </div>
                </div>

                {formData.siblings.length > 0 && (
                  <div className="preview-siblings-section">
                    <h4 className="preview-section-title">Siblings Details</h4>
                    <div className="preview-siblings-table">
                      <div className="preview-siblings-header">
                        <div>Name</div>
                        <div>Age</div>
                        <div>Name Of the Institution</div>
                        <div>Standard</div>
                      </div>
                      {formData.siblings.map((sibling, index) => (
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
              <div className="form-card">
                <div className="card-head">
                  <h2>Parent Details</h2>
                  <p>Review all parent/guardian information.</p>
                </div>

                <div className="preview-parents-grid">
                  {/* Father&apos;s Details */}
                  <div className="preview-parent-card">
                    {photoPreviews.fatherPhoto && (
                      <div className="preview-photo">
                        <img
                          src={photoPreviews.fatherPhoto}
                          alt="Father"
                          className="preview-photo-img"
                        />
                      </div>
                    )}
                    <div className="preview-parent-info">
                      <h4 className="preview-parent-label">Father</h4>
                      <div className="preview-detail-item">
                        <span className="preview-label">Name:</span>
                        <span className="preview-value">{formData.fatherFullName || 'Not provided'}</span>
                      </div>
                      <div className="preview-detail-item">
                        <span className="preview-label">Phone Number:</span>
                        <span className="preview-value">
                          {formData.fatherMobileCode} {formData.fatherMobile || 'Not provided'}
                        </span>
                      </div>
                      <div className="preview-detail-item">
                        <span className="preview-label">Email Id:</span>
                        <span className="preview-value">{formData.fatherEmail || 'Not provided'}</span>
                      </div>
                      <div className="preview-detail-item">
                        <span className="preview-label">Aadhar Card No.:</span>
                        <span className="preview-value">{formData.fatherAadhar || 'Not provided'}</span>
                      </div>
                      <div className="preview-detail-item">
                        <span className="preview-label">Qualification:</span>
                        <span className="preview-value">{formData.fatherQualification || 'Not provided'}</span>
                      </div>
                      <div className="preview-detail-item">
                        <span className="preview-label">Profession:</span>
                        <span className="preview-value">{formData.fatherProfession || 'Not provided'}</span>
                      </div>
                      {formData.grossAnnualIncome && (
                        <div className="preview-detail-item">
                          <span className="preview-label">Gross Annual Income (INR):</span>
                          <span className="preview-value">
                            {(() => {
                              try {
                                const income = parseInt(formData.grossAnnualIncome);
                                return isNaN(income) ? formData.grossAnnualIncome : income.toLocaleString('en-IN') + ' INR';
                              } catch {
                                return formData.grossAnnualIncome;
                              }
                            })()}
                          </span>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Mother&apos;s Details */}
                  <div className="preview-parent-card">
                    {photoPreviews.motherPhoto && (
                      <div className="preview-photo">
                        <img
                          src={photoPreviews.motherPhoto}
                          alt="Mother"
                          className="preview-photo-img"
                        />
                      </div>
                    )}
                    <div className="preview-parent-info">
                      <h4 className="preview-parent-label">Mother</h4>
                      <div className="preview-detail-item">
                        <span className="preview-label">Name:</span>
                        <span className="preview-value">{formData.motherFullName || 'Not provided'}</span>
                      </div>
                      <div className="preview-detail-item">
                        <span className="preview-label">Phone Number:</span>
                        <span className="preview-value">
                          {formData.motherMobileCode} {formData.motherMobile || 'Not provided'}
                        </span>
                      </div>
                      <div className="preview-detail-item">
                        <span className="preview-label">Email Id:</span>
                        <span className="preview-value">{formData.motherEmail || 'Not provided'}</span>
                      </div>
                      <div className="preview-detail-item">
                        <span className="preview-label">Aadhar Card No.:</span>
                        <span className="preview-value">{formData.motherAadhar || 'Not provided'}</span>
                      </div>
                      <div className="preview-detail-item">
                        <span className="preview-label">Qualification:</span>
                        <span className="preview-value">{formData.motherQualification || 'Not provided'}</span>
                      </div>
                      <div className="preview-detail-item">
                        <span className="preview-label">Profession:</span>
                        <span className="preview-value">{formData.motherProfession || 'Not provided'}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="submit-row">
                <button type="button" className="draft-button" onClick={handlePreviousStep}>
                  Previous Step
                </button>
                <button type="button" className="draft-button" onClick={handleSaveDraft}>
                  Save as draft
                </button>
                <button className="submit-button" type="submit" disabled={isSubmitting}>
                  {isSubmitting ? "Submitting..." : "Pay & Submit Application"}
                </button>
              </div>
            </>
          )}
        </form>
      </section>
    </main>
  );
}

// Default export with Suspense wrapper
export default function AdmissionsPage() {
  return (
    <Suspense fallback={
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <div className="text-lg text-gray-600">Loading...</div>
        </div>
      </div>
    }>
      <AdmissionsPageContent />
    </Suspense>
  );
}
