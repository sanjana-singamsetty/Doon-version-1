"use client";

import Image from "next/image";
import "../AdmissionsThankYou.css";

export default function ThankYouPage() {
  return (
    <div className="thank-you-page">
      {/* Background Image */}
      <div className="thank-you-hero">
        <Image
          src="/images/image.png"
          alt="Doon International School campus"
          fill
          className="thank-you-hero-image"
        />
        <div className="hero-gradient"></div>
      </div>

      {/* Thank You Card */}
      <div className="thank-you-card">
        <div className="thank-you-card-content">
          <div className="logo-stack">
            <div className="crest-wrapper">
              <Image
                src="/images/logo-2.png"
                alt="Doon International School crest"
                fill
                className="crest-image"
              />
            </div>
          </div>

          <div className="thank-you-content">
            <h1 className="thank-you-title">
              <span className="thank-you-bold">Thank you,</span>
              <br />
              for trusting us with your child&apos;s future.
            </h1>
            <p className="thank-you-message">
              Your application has been successfully received.
            </p>
          </div>
        </div>

        <div className="pattern-bar" aria-hidden="true"></div>
      </div>
    </div>
  );
}

