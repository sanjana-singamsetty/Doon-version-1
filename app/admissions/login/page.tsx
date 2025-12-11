"use client";

import { FormEvent, useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import "../AdmissionsLogin.css";

export default function AdmissionsLoginPage() {
  const router = useRouter();
  const [input, setInput] = useState("");
  const [otp, setOtp] = useState("");
  const [isOtpSent, setIsOtpSent] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [isSignUp, setIsSignUp] = useState(true); // Default to sign up

  // Detect if input is email or mobile
  const detectInputType = (value: string): "email" | "mobile" => {
    // Remove all non-digit characters for mobile check
    const digitsOnly = value.replace(/\D/g, "");
    // If it's 10 digits and doesn't contain @, it's mobile
    if (digitsOnly.length === 10 && !value.includes("@")) {
      return "mobile";
    }
    // If it contains @, it's email
    if (value.includes("@")) {
      return "email";
    }
    // Default to email for empty or ambiguous input
    return "email";
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    const inputType = detectInputType(value);
    
    if (inputType === "mobile") {
      // Only allow digits, max 10
      setInput(value.replace(/\D/g, "").slice(0, 10));
    } else {
      // Allow email format
      setInput(value);
    }
  };

  const handleSendOTP = async (e: FormEvent) => {
    e.preventDefault();
    setError("");
    setIsLoading(true);

    try {
      const inputType = detectInputType(input);
      const endpoint = inputType === "email" 
        ? "/api/auth/send-otp" 
        : "/api/auth/send-mobile-otp";
      
      const body = inputType === "email"
        ? { email: input.toLowerCase().trim(), isSignIn: !isSignUp }
        : { mobile: input.replace(/\D/g, ""), isSignIn: !isSignUp };

      const response = await fetch(endpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Failed to send OTP");
      }

      setIsOtpSent(true);
      
      // In development, show OTP if returned (when email is not configured)
      if (data.otp) {
        console.log(`OTP for ${input}: ${data.otp}`);
        // Show OTP in a more user-friendly way
        if (typeof window !== 'undefined') {
          alert(`OTP: ${data.otp}\n\n(Development mode - Email not configured)`);
        }
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to send OTP");
    } finally {
      setIsLoading(false);
    }
  };

  const handleVerifyOTP = async (e: FormEvent) => {
    e.preventDefault();
    setError("");
    setIsLoading(true);

    try {
      const inputType = detectInputType(input);
      const endpoint = inputType === "email"
        ? "/api/auth/verify-otp"
        : "/api/auth/verify-mobile-otp";
      
      const body = inputType === "email"
        ? { email: input.toLowerCase().trim(), otp }
        : { mobile: input.replace(/\D/g, ""), otp };

      const response = await fetch(endpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Invalid OTP");
      }

      // Store token in localStorage
      if (data.token) {
        localStorage.setItem("auth-token", data.token);
      }

      // Navigate to selection page
      router.push("/admissions/select");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Invalid OTP");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="admissions-login-page">
      
      {/* ---- LOGIN CARD ON TOP OF IMAGE ---- */}
      <div className="login-card">
        {/* Logo Section */}
        <div className="logo-section">
          <div className="crest-wrapper">
            <Image
              src="/images/logo-2.png"
              alt="Doon International School Logo"
              fill
              className="crest-image"
              priority
            />
          </div>
        </div>

        {/* Header Section */}
        <div className="header-section">
          <h1 className="login-title">
            {isSignUp ? "Create Account" : "Welcome Back"}
          </h1>
          <p className="login-subtitle">
            {isSignUp 
              ? "Join us and start your learning journey" 
              : "Welcome back! Continue your journey with us"}
          </p>
        </div>

        {/* Error Message */}
        {error && (
          <div className="error-message" role="alert" aria-live="polite">
            {error}
          </div>
        )}

        {/* Sign Up / Sign In Toggle */}
        {!isOtpSent && (
          <div className="toggle-group">
            <div className="segmented-control">
              <div 
                className="segmented-indicator"
                style={{ 
                  transform: `translateX(${!isSignUp ? "0%" : "100%"})` 
                }}
              />
              <button
                type="button"
                onClick={() => {
                  setIsSignUp(false);
                  setError("");
                  setOtp("");
                  setInput("");
                }}
                className={`segmented-option ${!isSignUp ? "active" : ""}`}
                aria-pressed={!isSignUp}
              >
                <span className="option-text">Sign In</span>
              </button>
              <button
                type="button"
                onClick={() => {
                  setIsSignUp(true);
                  setError("");
                  setOtp("");
                  setInput("");
                }}
                className={`segmented-option ${isSignUp ? "active" : ""}`}
                aria-pressed={isSignUp}
              >
                <span className="option-text">Sign Up</span>
              </button>
            </div>
          </div>
        )}

        {/* Form */}
        <form
          className={`login-form ${isOtpSent ? "otp-mode" : ""}`}
          onSubmit={isOtpSent ? handleVerifyOTP : handleSendOTP}
        >
          {!isOtpSent ? (
            <>
              {/* Single Input Field */}
              <div className="form-group">
                <label className="input-label" htmlFor="contact-input">
                  Enter your mobile number or email
                </label>
                <input
                  id="contact-input"
                  name="contact"
                  type="text"
                  placeholder="Enter mobile number or email"
                  value={input}
                  onChange={handleInputChange}
                  required
                  disabled={isLoading}
                  className="form-input"
                  autoComplete={detectInputType(input) === "email" ? "email" : "tel"}
                  inputMode={detectInputType(input) === "mobile" ? "numeric" : "email"}
                  aria-describedby="contact-hint"
                  aria-invalid={input.length > 0 && (detectInputType(input) === "mobile" ? input.replace(/\D/g, "").length !== 10 : !input.includes("@"))}
                />
                <span id="contact-hint" className="input-hint">
                  We&apos;ll send you a verification code
                </span>
              </div>

              {/* Submit Button */}
              <button
                className="submit-button"
                type="submit"
                disabled={isLoading || !input.trim() || (detectInputType(input) === "mobile" && input.replace(/\D/g, "").length !== 10)}
              >
                {isLoading ? (
                  <span className="button-loading">
                    <span className="spinner"></span>
                    Sending OTP...
                  </span>
                ) : (
                  <span>Send OTP</span>
                )}
              </button>
            </>
          ) : (
            <>
              {/* OTP Section */}
              <div className="otp-section">
                <div className="otp-header">
                  <p className="otp-info">
                    We&apos;ve sent a 6-digit code to {detectInputType(input) === "email" ? input.toLowerCase().trim() : `+91 ${input.replace(/\D/g, "")}`}
                  </p>
                </div>

                <div className="form-group">
                  <label className="input-label" htmlFor="otp">
                    Enter OTP
                  </label>
                  <input
                    id="otp"
                    name="otp"
                    type="text"
                    placeholder="000000"
                    value={otp}
                    onChange={(e) => setOtp(e.target.value.replace(/\D/g, "").slice(0, 6))}
                    maxLength={6}
                    inputMode="numeric"
                    required
                    disabled={isLoading}
                    className="otp-input-field"
                    autoComplete="one-time-code"
                    autoFocus
                  />
                </div>

                <button
                  className="submit-button"
                  type="submit"
                  disabled={isLoading || otp.length !== 6}
                >
                  {isLoading ? (
                    <span className="button-loading">
                      <span className="spinner"></span>
                      {isSignUp ? "Completing..." : "Verifying..."}
                    </span>
                  ) : (
                    <span>{isSignUp ? "Complete Sign Up" : "Verify OTP"}</span>
                  )}
                </button>

                <button
                  type="button"
                  onClick={() => {
                    setIsOtpSent(false);
                    setOtp("");
                    setError("");
                  }}
                  className="secondary-button"
                >
                  ← Change {detectInputType(input) === "email" ? "Email" : "Mobile"}
                </button>
              </div>
            </>
          )}
        </form>
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
