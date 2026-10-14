
import React from "react";
import "./Services.css";

const services = [
{
  number: "01",
  title: "AI Video Generation",
  description:
    "Transform ideas into stunning AI-powered videos with creative visuals, cinematic scenes and next-generation storytelling.",
  tags: ["AI Video", "AI Visuals", "Creative Films"],
},

  {
    number: "02",
    title: "Promotional Shoot",
    description:
      "Create compelling promotional films that showcase your brand, products and services with impact.",
    tags: ["Brand Films", "Product Videos", "Commercials"],
  },
  {
    number: "03",
    title: "Social Reels",
    description:
      "Engaging short-form videos designed to capture attention and bring your ideas to life on social media.",
    tags: ["Instagram Reels", "Short Videos", "Social Content"],
  },
  {
    number: "04",
    title: "Events",
    description:
      "Capture the atmosphere, people and memorable moments of your events through cinematic storytelling.",
    tags: ["Event Coverage", "Highlight Films", "Live Moments"],
  },
  {
    number: "05",
    title: "Podcasts",
    description:
      "Professional podcast production with quality visuals and audio to make every conversation stand out.",
    tags: ["Podcast Shoots", "Multi-Camera", "Video Podcasts"],
  },
  {
    number: "06",
    title: "Video Editing",
    description:
      "Transform raw footage into polished visual stories with thoughtful editing, pacing and finishing.",
    tags: ["Post-Production", "Color Grading", "Motion Graphics"],
  },
];

const Services = () => {
  return (
    <section id="services" className="omt-services">
      <div className="omt-services-header">
        <div className="omt-services-heading reveal">
          <div className="omt-services-label">
            <span />
            WHAT WE DO
          </div>

          <h2>
            Creative work.
            <br />
            <em>Every frame.</em>
          </h2>
        </div>

        <p className="omt-services-intro reveal delay-1">
          We bring ideas to life through production,
          editing and visual storytelling. One creative
          partner, from the first idea to the final frame.
        </p>
      </div>

      <div className="omt-services-list">
        {services.map((service, index) => (
          <article
            className="omt-service-card reveal"
            key={service.number}
            style={{ "--service-index": index }}
          >
            <span className="omt-service-number">
              {service.number}
            </span>

            <div className="omt-service-main">
              <h3>{service.title}</h3>
              <p>{service.description}</p>

              <div className="omt-service-tags">
                {service.tags.map((tag) => (
                  <span key={tag}>{tag}</span>
                ))}
              </div>
            </div>

            <a
              href="#contact"
              className="omt-service-arrow"
              aria-label={`Enquire about ${service.title}`}
            >
              ↗
            </a>
          </article>
        ))}
      </div>

      <div className="omt-services-bottom reveal">
        <span>HAVE A PROJECT IN MIND?</span>

        <a href="#contact">
          LET'S CREATE SOMETHING <b>↗</b>
        </a>
      </div>
    </section>
  );
};

export default Services;
