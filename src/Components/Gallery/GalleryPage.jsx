import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { doc, onSnapshot } from "firebase/firestore";
import { db } from "../../firebase";
import "./Gallery.css";

export default function GalleryPage() {
  const navigate = useNavigate();
  const [galleryItems, setGalleryItems] = useState([]);

  useEffect(() => {
    const unsubscribe = onSnapshot(
      doc(db, "siteContent", "gallery"),
      (snapshot) => {
        const data = snapshot.exists() ? snapshot.data() : {};
        const items = Array.isArray(data.images) ? data.images : [];

        setGalleryItems(
          items.filter((item) => item.url).map((item, index) => ({
            id: item.id || item.publicId || item.url || String(index),
            title: item.title || `Creative Project ${index + 1}`,
            category: item.category || "CREATIVE PRODUCTION",
            description: item.description || "A story brought to life.",
            image: item.url,
          }))
        );
      },
      (error) => {
        console.error("Failed to load gallery page:", error);
      }
    );

    return unsubscribe;
  }, []);

  return (
    <main className="omt-gallery-page">
      <header className="omt-gallery-page-header">
        <button
          className="omt-gallery-back"
          type="button"
          onClick={() => navigate("/")}
        >
          <span aria-hidden="true">←</span> Back to Home
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

      <section className="omt-gallery-grid" aria-label="All gallery projects">
        {galleryItems.length === 0 ? (
          <p className="omt-gallery-empty">
            Gallery images will appear here soon.
          </p>
        ) : (
          galleryItems.map((item) => (
            <article className="omt-gallery-item" key={item.id}>
              <div className="omt-gallery-thumb">
                <img
                  src={item.image}
                  alt={item.title}
                  loading="lazy"
                />
              </div>

              <div className="omt-gallery-item-info">
                <span>{item.category}</span>
                <h2>{item.title}</h2>
                <p>{item.description}</p>
              </div>
            </article>
          ))
        )}
      </section>

      <div className="omt-gallery-page-footer">
        <button
          className="omt-gallery-back-bottom"
          type="button"
          onClick={() => navigate("/")}
        >
          ← Back to Home
        </button>
      </div>
    </main>
  );
}