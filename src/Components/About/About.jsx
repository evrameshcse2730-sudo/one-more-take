
import React from "react";
import "./About.css";

const About = () => {
  return (
    <section id="about" className="about section">
      <div className="about-left reveal">
        <div className="section-label">
          <span></span>
          WHO WE ARE
        </div>

        <h2>
          We don't just
          <br />
          make <em>videos.</em>
        </h2>

        <div className="about-decoration" aria-hidden="true">
          <span>OMT</span>
          <i></i>
        </div>
      </div>

      <div className="about-right reveal delay-1">
        <p className="large-copy">
          We turn ideas into visual experiences
          people actually want to watch.
        </p>

        <p>
          From the first frame to the final cut,
          One More Take brings production and
          post-production together under one roof.
        </p>

        <p>
          Camera, lighting, editing, sound,
          motion and storytelling — every detail
          works together to make your story feel
          bigger.
        </p>

        <div className="about-signature">
          <span>GOOD FRAMES.</span>
          <b>BETTER STORIES.</b>
        </div>

        <a href="#services" className="about-link">
          DISCOVER WHAT WE DO
          <span>↗</span>
        </a>
      </div>
    </section>
  );
};

export default About;
