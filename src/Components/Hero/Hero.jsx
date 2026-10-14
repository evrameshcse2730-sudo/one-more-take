import React from "react";
import "./Hero.css";

const Hero = () => {
  return (
    <>
      <section className="omt-hero" id="home">
        <div className="omt-hero-grid"></div>
        <div className="omt-hero-glow"></div>

        <div className="omt-hero-counter">
          <span>FRAME</span>
          <strong>001</strong>
          <i></i>
        </div>

        <div className="omt-hero-content">
          <div className="omt-hero-eyebrow">
            <span className="omt-live-dot"></span>
            CREATIVE VIDEO PRODUCTION STUDIO
          </div>

          <h1 className="omt-hero-title">
            <span>IDEAS</span>
            <span>DESERVE</span>
            <span className="omt-red">A BETTER</span>
            <span className="omt-red omt-outline">TAKE.</span>
          </h1>

          <div className="omt-hero-description">
            <span className="omt-description-line"></span>
            <p>
              We shoot. We edit. We create.
              <br />
              Visual stories that make people stop,
              <br />
              watch and remember.
            </p>
          </div>

          <div className="omt-hero-actions">
            <a href="#work" className="omt-hero-primary">
              <span className="omt-play-icon">▶</span>
              Explore Our Work
              <span className="omt-action-arrow">↗</span>
            </a>

            <a href="#services" className="omt-hero-secondary">
              Discover Our Services <span>↓</span>
            </a>
          </div>

          <div className="omt-hero-stats">
            <div>
              <strong>01</strong>
              <span>CREATIVE STUDIO</span>
            </div>
            <div>
              <strong>∞</strong>
              <span>STORIES TO TELL</span>
            </div>
            <div>
              <strong>4K</strong>
              <span>DETAIL IN EVERY FRAME</span>
            </div>
          </div>
        </div>

        <div className="omt-hero-visual">
          <div className="omt-visual-ring omt-ring-one"></div>
          <div className="omt-visual-ring omt-ring-two"></div>

          <div className="omt-camera-tag">
            <span className="omt-live-dot"></span>
            PRODUCTION IN PROGRESS
          </div>

          <img
            className="omt-hero-camera"
            src="/cinema-camera.png"
            alt="Professional cinema camera setup"
          />

          <div className="omt-camera-caption">
            <span>CAM 01 / MAIN SHOT</span>
            <span>● REC</span>
          </div>

          <div className="omt-edit-card">
            <div className="omt-edit-top">
              <span>ONE MORE TAKE / EDIT</span>
              <span>4K · 24FPS</span>
            </div>

            <div className="omt-edit-preview">
              <div className="omt-preview-play">▶</div>
              <span>PREVIEW WINDOW</span>
            </div>

            <div className="omt-edit-timeline">
              <span>VIDEO</span>
              <div className="omt-timeline-clips">
                <i></i><i></i><i></i><i></i>
              </div>
              <span>AUDIO</span>
              <div className="omt-audio-wave">
                {Array.from({ length: 24 }, (_, i) => (
                  <i key={i}></i>
                ))}
              </div>
            </div>
          </div>

          <div className="omt-handwriting">
            Shoot.
            <br />
            Edit.
            <br />
            Create.
            <br />
            Inspire.
            <span></span>
          </div>
        </div>

        <a className="omt-scroll-hint" href="#about">
          <span>SCROLL TO EXPLORE</span>
          <i></i>
        </a>
      </section>

      
    </>
  );
};

export default Hero;
