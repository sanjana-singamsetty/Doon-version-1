"use client";

import { FormEvent } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import "../AdmissionsLogin.css";

export default function AdmissionsLoginPage() {
  const router = useRouter();

  const handleLoginSuccess = (event?: FormEvent<HTMLFormElement>) => {
    if (event) event.preventDefault();
    // Navigate to selection page after login
    router.push("/admissions/select");
  };

  return (
    <div className="admissions-login-page">
      
      {/* ---- LOGIN CARD ON TOP OF IMAGE ---- */}
      <div className="login-card">
        <div className="logo-stack">
          <div className="crest-wrapper">
            <Image
              src="/images/logo-2.png"
              alt="Doon International School crest"
              fill
              className="crest-image"
            />
          </div>

          <h1 className="login-hero-title">Welcome !</h1>
        </div>

        <p className="login-hero-subtitle">
          Enter an Indian mobile number / Email to continue
        </p>

        <form className="login-form" onSubmit={handleLoginSuccess}>
          <label className="input-label" htmlFor="mobile">
            Mobile No.
          </label>

          <div className="mobile-row">
            <span className="mobile-prefix">+91</span>
            <input
              id="mobile"
              name="mobile"
              type="tel"
              placeholder="Enter Mobile No."
              inputMode="numeric"
            />
          </div>

          <div className="otp-row">
            <input
              className="otp-input"
              type="text"
              placeholder="XXXX"
              maxLength={6}
              inputMode="numeric"
            />
            <button className="otp-button" type="submit">
              Get OTP
            </button>
          </div>
        </form>

        <div className="divider-row">
          <span />
          <p>Or, Login with</p>
          <span />
        </div>

        <button
          className="email-button"
          type="button"
          onClick={() => handleLoginSuccess()}
        >
          <span className="icon">✉</span>
          Email Address
        </button>

        <div className="pattern-bar" aria-hidden="true"></div>
      </div>

      {/* ---- BACKGROUND IMAGE ---- */}
      <div className="login-hero">
        <Image
          src="/images/image.png"
          alt="Doon International School campus"
          fill
          className="login-hero-image"
        />
        <div className="hero-gradient"></div>
      </div>
    </div>
  );
}
