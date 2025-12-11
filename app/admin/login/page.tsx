"use client";

import { FormEvent, useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import "../../admissions/AdmissionsLogin.css";

export default function AdminLoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const handleLogin = async (e: FormEvent) => {
    e.preventDefault();
    setError("");
    setIsLoading(true);

    try {
      const response = await fetch("/api/auth/admin/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Login failed");
      }

      // Store token
      if (data.token) {
        localStorage.setItem("auth-token", data.token);
      }

      // Navigate to admin dashboard
      router.push("/admin/dashboard");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Login failed");
    } finally {
      setIsLoading(false);
    }
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

        <div style={{ textAlign: "center", marginTop: "0.5rem", marginBottom: "1rem" }}>
          <h2 style={{ 
            fontSize: "1.5rem", 
            fontWeight: "700", 
            color: "#1C2C5B", 
            margin: "0 0 0.5rem 0" 
          }}>
            Sign In
          </h2>
        </div>

        <p className="login-hero-subtitle">
          Admin access - Enter your credentials to continue
        </p>

        {error && (
          <div style={{ 
            color: "#c33", 
            padding: "12px", 
            textAlign: "center", 
            fontSize: "14px",
            background: "#fee",
            border: "1px solid #fcc",
            borderRadius: "8px",
            marginBottom: "1rem",
          }}>
            {error}
          </div>
        )}

        <form className="login-form" onSubmit={handleLogin}>
          <label className="input-label" htmlFor="email">
            Email Address
          </label>

          <input
            id="email"
            name="email"
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            disabled={isLoading}
            className="otp-input"
            style={{ width: "100%" }}
          />

          <label className="input-label" htmlFor="password" style={{ marginTop: "1rem" }}>
            Password
          </label>

          <input
            id="password"
            name="password"
            type="password"
            placeholder="Enter your password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            disabled={isLoading}
            className="otp-input"
            style={{ width: "100%" }}
          />

          <button
            className="otp-button"
            type="submit"
            disabled={isLoading}
            style={{ width: "100%", marginTop: "1.5rem" }}
          >
            {isLoading ? "Signing In..." : "Sign In"}
          </button>
        </form>

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
