"use client";

import { ChangeEvent, FormEvent, useState } from "react";
import "./AdmissionFlowForm.css";
import { Header } from "@/components/layout/header";

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
};

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
};

export default function AdmissionFlowForm() {
  const [formData, setFormData] = useState<FormState>(initialFormState);

  const handleInputChange = (
    event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = event.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
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

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    console.log("Form submission data:", formData);
    alert("Student details saved. Check the console for the values.");
  };

  return (
    <form className="admission-form" onSubmit={handleSubmit}>
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
            />
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
          </label>
          <label>
            <span>Last Name</span>
            <input
              name="lastName"
              value={formData.lastName}
              onChange={handleInputChange}
              placeholder="Enter Last Name"
              autoComplete="family-name"
            />
          </label>
        </div>

        <div className="form-grid">
          <label>
            <span>Gender</span>
            <select name="gender" value={formData.gender} onChange={handleInputChange}>
              <option value="" disabled>
                Select Gender
              </option>
              {genderOptions.map((option) => (
                <option key={option} value={option}>
                  {option}
                </option>
              ))}
            </select>
          </label>
          <label>
            <span>Grade</span>
            <select name="grade" value={formData.grade} onChange={handleInputChange}>
              <option value="" disabled>
                Select Grade
              </option>
              {gradeOptions.map((grade) => (
                <option key={grade} value={grade}>
                  {grade}
                </option>
              ))}
            </select>
          </label>
          <label>
            <span>Board/Curriculum Interested In</span>
            <select name="board" value={formData.board} onChange={handleInputChange}>
              <option value="" disabled>
                Select Board
              </option>
              {boardOptions.map((board) => (
                <option key={board} value={board}>
                  {board}
                </option>
              ))}
            </select>
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
            <input type="date" name="dob" value={formData.dob} onChange={handleInputChange} />
          </label>
          <label>
            <span>Birth Region/District</span>
            <input
              name="birthRegion"
              value={formData.birthRegion}
              onChange={handleInputChange}
              placeholder="Enter Region/District"
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
            <select name="nationality" value={formData.nationality} onChange={handleInputChange}>
              <option value="" disabled>
                Select Nationality
              </option>
              {nationalityOptions.map((nation) => (
                <option key={nation} value={nation}>
                  {nation}
                </option>
              ))}
            </select>
          </label>
          <label>
            <span>Aadhar Card No</span>
            <input
              name="aadhar"
              inputMode="numeric"
              value={formData.aadhar}
              onChange={handleInputChange}
              placeholder="0000 0000 0000"
            />
          </label>
          <label>
            <span>Blood Group</span>
            <select name="bloodGroup" value={formData.bloodGroup} onChange={handleInputChange}>
              <option value="" disabled>
                Select Blood Group
              </option>
              {bloodGroups.map((group) => (
                <option key={group} value={group}>
                  {group}
                </option>
              ))}
            </select>
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
              />
            </div>
          ))}
        </div>
      </div>

      <div className="form-card">
        <div className="card-head">
          <h3>Address For Correspondence</h3>
          <p>Provide the complete correspondence address in India.</p>
        </div>

        <label>
          <span>Address</span>
          <textarea
            name="correspondenceAddress"
            value={formData.correspondenceAddress}
            onChange={handleInputChange}
            placeholder="Write the complete address"
          />
        </label>

        <div className="address-grid">
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
        </div>

        <div className="address-lower-grid">
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

        <div className="toggle-row">
          <span className="toggle-prompt">
            Is the correspondence address and permanent address the same?
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

      <div className="submit-row">
        <button className="submit-button" type="submit">
          Save & Continue
        </button>
      </div>
    </form>
  );
}
