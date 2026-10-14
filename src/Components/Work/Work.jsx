
import React from "react";
import "./Work.css";


const projects = [
  {
    title: "Promotional Shoot",
    category: "PROMOTIONAL FILMS",
    image:
      "https://res.cloudinary.com/db4faz2rs/image/upload/v1790834997/One_More_Take__Cinematic_Production_Set_wgexcd.png",
  },
  {
    title: "Social Reels",
    category: "SHORT-FORM CONTENT",
    image:
      "https://res.cloudinary.com/db4faz2rs/image/upload/v1790834834/One_More_Take__Shoot_Cut_Ready_xcpbp9.png",
  },
  {
    title: "Events",
    category: "EVENT VIDEOGRAPHY",
    image:
      "https://res.cloudinary.com/db4faz2rs/image/upload/v1790834832/Event_Videography_in_Action_vg5ttu.png",
  },
  {
    title: "Podcasts",
    category: "PODCAST PRODUCTION",
    image:
      "https://res.cloudinary.com/db4faz2rs/image/upload/v1790834689/One_More_Take_Podcast_Studio_vl8pmk.png",
  },
  {
    title: "Video Editing",
    category: "POST-PRODUCTION",
    image:
      "https://res.cloudinary.com/db4faz2rs/image/upload/v1790835981/One_More_Take_Creative_Studio_nd96gk.png",
  },
];

export default function Work() {
  const handleContact = () => {
    const contactSection = document.getElementById("contact");

    if (contactSection) {
      contactSection.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
  };

  return (
    <section id="work" className="work section">
      <div className="work-header">
        <div className="work-heading">
          <div className="work-label">
            <span className="work-label-line"></span>
            FEATURED WORK
          </div>

          <h2 className="work-title">
            REAL STORIES.
            <br />
            REAL <em>IMPACT.</em>
          </h2>

          <p className="work-description">
            Five ways we bring ideas to life through the lens.
          </p>
        </div>

        <button
          type="button"
          className="work-cta"
          onClick={handleContact}
        >
          Start a Project
          <span className="work-cta-arrow">↗</span>
        </button>
      </div>

      <div className="work-grid">
        {projects.map((project, index) => (
          <article
            className={`work-card work-card-${index + 1}`}
            key={project.title}
          >
            <img
              className="work-image"
              src={project.image}
              alt={`${project.title} - One More Take`}
              loading="lazy"
            />

            <div className="work-overlay"></div>

            <span className="work-number">
              {String(index + 1).padStart(2, "0")}
            </span>

            <span className="work-category">
              {project.category}
            </span>

            <div className="work-info">
              <div className="work-info-content">
                <span className="work-info-label">
                  ONE MORE TAKE /{" "}
                  {String(index + 1).padStart(2, "0")}
                </span>

                <h3>{project.title}</h3>
              </div>

              <span className="work-card-arrow" aria-hidden="true">
                ↗
              </span>
            </div>
          </article>
        ))}
      </div>

      <div className="work-bottom">
        <span>CREATIVE VISION.</span>
        <span>VISUAL STORYTELLING.</span>
        <span>ONE MORE TAKE.</span>
      </div>
    </section>
  );
}
