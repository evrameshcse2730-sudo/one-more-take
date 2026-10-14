
import React from "react";
import "./Experience.css";

const stats = [
  {
    number: "3+",
    title: "Years",
    description: "in the industry",
  },
  {
    number: "100+",
    title: "Projects",
    description: "delivered",
  },
  {
    number: "60+",
    title: "Clients",
    description: "worked with",
  },
  {
    number: "5+",
    title: "Industries",
    description: "served",
  },
];

export default function Experience() {
  return (
    <section id="experience" className="experience section">
      <div className="experience-heading reveal">
        <div className="section-label">
          <span />
          OUR EXPERIENCE
        </div>

        <h2>
          EXPERIENCE
          <br />
          THAT <em>SHOWS.</em>
        </h2>

        <p>
          Years of learning, creating and growing
          with ambitious brands, professionals and
          creators.
        </p>
      </div>

      <div className="experience-grid">
        {stats.map((stat, index) => (
          <article
            className={`experience-card reveal delay-${index}`}
            key={stat.title}
          >
            <span className="experience-index">
              0{index + 1}
            </span>

            <strong>{stat.number}</strong>

            <h3>{stat.title}</h3>

            <p>{stat.description}</p>
          </article>
        ))}
      </div>
    </section>
  );
}
