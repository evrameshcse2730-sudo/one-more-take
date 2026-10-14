
import React from "react";
import "./Marquee.css"

const Marquee = () => {
  const items = [
    "VIDEO PRODUCTION",
    "CREATIVE STORYTELLING",
    "SOCIAL REELS",
    "PODCAST PRODUCTION",
    "CINEMATIC EDITING",
  ];

  return (
    <section className="marquee-section">
      <div className="marquee-track">
        {[...items, ...items].map((item, index) => (
          <div className="marquee-item" key={index}>
            <span>{item}</span>
            <span className="marquee-star">✳</span>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Marquee;
