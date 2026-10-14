
import React from "react";
import { useNavigate } from "react-router-dom";
import "./Gallery.css";

const galleryItems = [
  {
    image:
      "https://res.cloudinary.com/db4faz2rs/image/upload/v1790834997/One_More_Take__Cinematic_Production_Set_wgexcd.png",
    title: "Cinematic Production",
    description: "Cinematic visuals crafted to tell powerful stories.",
    category: "PRODUCTION",
  },
  {
    image:
      "https://res.cloudinary.com/db4faz2rs/image/upload/v1790834834/One_More_Take__Shoot_Cut_Ready_xcpbp9.png",
    title: "Social Media Reels",
    description: "Creative reels that capture attention and engage audiences.",
    category: "SOCIAL MEDIA",
  },
  {
    image:
      "https://res.cloudinary.com/db4faz2rs/image/upload/v1790834832/Event_Videography_in_Action_vg5ttu.png",
    title: "Event Stories",
    description: "Capturing memorable moments through cinematic storytelling.",
    category: "EVENTS",
  },
  {
    image:
      "https://res.cloudinary.com/db4faz2rs/image/upload/v1790834689/One_More_Take_Podcast_Studio_vl8pmk.png",
    title: "Podcast Production",
    description: "Professional podcast recording and visual production.",
    category: "PODCAST",
  },
  {
    image:
      "https://res.cloudinary.com/db4faz2rs/image/upload/v1790835981/One_More_Take_Creative_Studio_nd96gk.png",
    title: "Creative Studio",
    description: "Turning raw footage into polished creative content.",
    category: "VIDEO EDITING",
  },
];

export default function GalleryPage() {
  const navigate = useNavigate();

  return (
    <main className="omt-gallery-page">
      <header className="omt-gallery-page-header">
        <button
          className="omt-gallery-back"
          type="button"
          onClick={() => navigate("/")}
        >
          ← Back to Home
        </button>

        <span className="omt-gallery-label">OUR CREATIVE WORK</span>

        <h1>
          Explore Our <span>Gallery.</span>
        </h1>

        <p>
          A collection of our creative projects, cinematic visuals,
          and stories brought to life.
        </p>
      </header>

      <div className="omt-gallery-grid">
        {galleryItems.map((item) => (
          <article className="omt-gallery-item" key={item.title}>
            <div className="omt-gallery-thumb">
              <img src={item.image} alt={item.title} loading="lazy" />
            </div>

            <div className="omt-gallery-item-info">
              <span>{item.category}</span>
              <h2>{item.title}</h2>
              <p>{item.description}</p>
            </div>
          </article>
        ))}
      </div>
    </main>
  );
}
