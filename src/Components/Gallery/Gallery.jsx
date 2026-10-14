
import React, { useEffect, useState } from "react";
import "./Gallery.css";

const galleryItems = [
  {
    image:
      "https://res.cloudinary.com/db4faz2rs/image/upload/v1790834997/One_More_Take__Cinematic_Production_Set_wgexcd.png",
    title: "Cinematic Production",
    description:
      "Cinematic visuals crafted to tell powerful stories.",
    category: "PRODUCTION",
  },
  {
    image:
      "https://res.cloudinary.com/db4faz2rs/image/upload/v1790834834/One_More_Take__Shoot_Cut_Ready_xcpbp9.png",
    title: "Social Media Reels",
    description:
      "Creative reels that capture attention and engage audiences.",
    category: "SOCIAL MEDIA",
  },
  {
    image:
      "https://res.cloudinary.com/db4faz2rs/image/upload/v1790834832/Event_Videography_in_Action_vg5ttu.png",
    title: "Event Stories",
    description:
      "Capturing memorable moments through cinematic storytelling.",
    category: "EVENTS",
  },
  {
    image:
      "https://res.cloudinary.com/db4faz2rs/image/upload/v1790834689/One_More_Take_Podcast_Studio_vl8pmk.png",
    title: "Podcast Production",
    description:
      "Professional podcast recording and visual production.",
    category: "PODCAST",
  },
  {
    image:
      "https://res.cloudinary.com/db4faz2rs/image/upload/v1790835981/One_More_Take_Creative_Studio_nd96gk.png",
    title: "Creative Studio",
    description:
      "Turning raw footage into polished creative content.",
    category: "VIDEO EDITING",
  },
];

export default function Gallery() {
  const [activeIndex, setActiveIndex] = useState(1);
  const [isTransitioning, setIsTransitioning] = useState(true);
  const [paused, setPaused] = useState(false);
  const [viewAll, setViewAll] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);

  const total = galleryItems.length;

  // Duplicate the first and last slides for a seamless loop.
  const slides = [
    { ...galleryItems[total - 1], loopKey: "last-clone" },
    ...galleryItems.map((item, index) => ({
      ...item,
      loopKey: `original-${index}`,
    })),
    { ...galleryItems[0], loopKey: "first-clone" },
  ];

  const nextSlide = () => {
    setActiveIndex((current) => current + 1);
  };

  const prevSlide = () => {
    setActiveIndex((current) => current - 1);
  };

  const goToSlide = (index) => {
    setActiveIndex(index + 1);
  };

  // Auto-play carousel.
  useEffect(() => {
    if (paused || viewAll || selectedImage) return;

    const timer = window.setInterval(() => {
      setActiveIndex((current) => current + 1);
    }, 3500);

    return () => window.clearInterval(timer);
  }, [paused, viewAll, selectedImage]);

  // Reset to the corresponding original slide without animation.
  useEffect(() => {
    if (isTransitioning) return;

    const frame = window.requestAnimationFrame(() => {
      window.requestAnimationFrame(() => {
        setIsTransitioning(true);
      });
    });

    return () => window.cancelAnimationFrame(frame);
  }, [isTransitioning]);

  const handleTransitionEnd = () => {
    if (activeIndex === total + 1) {
      setIsTransitioning(false);
      setActiveIndex(1);
    } else if (activeIndex === 0) {
      setIsTransitioning(false);
      setActiveIndex(total);
    }
  };

  // Keyboard controls and Escape to close preview.
  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key === "Escape") {
        setSelectedImage(null);
      }

      if (selectedImage || viewAll) return;

      if (event.key === "ArrowRight") nextSlide();
      if (event.key === "ArrowLeft") prevSlide();
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [selectedImage, viewAll]);

  return (
    <section className="omt-gallery" id="gallery">
      <div className="omt-gallery-header">
        <div className="omt-gallery-heading">
          <span className="omt-gallery-label">
            OUR CREATIVE WORK
          </span>

          <h2>
            A Gallery of <span>Stories.</span>
          </h2>

          <p>
            Every frame has a story. Explore our creative work.
          </p>
        </div>

        <button
          className="omt-gallery-view-all"
          type="button"
          onClick={() => setViewAll((current) => !current)}
        >
          {viewAll ? "Back to Carousel" : "View All"}
          <span>↗</span>
        </button>
      </div>

      {!viewAll ? (
        <>
          <div
            className="omt-carousel"
            onMouseEnter={() => setPaused(true)}
            onMouseLeave={() => setPaused(false)}
          >
            <div
              className={`omt-carousel-track ${
                isTransitioning ? "omt-carousel-animated" : ""
              }`}
              style={{
                "--active-index": activeIndex,
              }}
              onTransitionEnd={handleTransitionEnd}
            >
              {slides.map((item, index) => (
                <article
                  key={item.loopKey}
                  className={`omt-carousel-card ${
                    index === activeIndex ? "is-active" : ""
                  }`}
                  style={{ "--card-position": index }}
                  onClick={() => {
                    if (index !== activeIndex) {
                      setActiveIndex(index);
                    } else {
                      setSelectedImage(item);
                    }
                  }}
                >
                  <img
                    src={item.image}
                    alt={item.title}
                    loading={index === 1 ? "eager" : "lazy"}
                    draggable="false"
                  />

                  <div className="omt-carousel-shade" />

                  <span className="omt-carousel-category">
                    {item.category}
                  </span>

                  <div className="omt-carousel-caption">
                    <h3>{item.title}</h3>
                    <p>{item.description}</p>
                  </div>

                  <button
                    className="omt-carousel-open"
                    type="button"
                    aria-label={`View ${item.title}`}
                    onClick={(event) => {
                      event.stopPropagation();
                      setSelectedImage(item);
                    }}
                  >
                    ↗
                  </button>
                </article>
              ))}
            </div>

            <button
              className="omt-carousel-arrow omt-carousel-prev"
              type="button"
              aria-label="Previous image"
              onClick={prevSlide}
            >
              ‹
            </button>

            <button
              className="omt-carousel-arrow omt-carousel-next"
              type="button"
              aria-label="Next image"
              onClick={nextSlide}
            >
              ›
            </button>
          </div>

          <div className="omt-carousel-footer">
            <div className="omt-carousel-dots">
              {galleryItems.map((item, index) => (
                <button
                  key={item.title}
                  type="button"
                  aria-label={`Show ${item.title}`}
                  aria-current={
                    activeIndex === index + 1 ? "true" : undefined
                  }
                  className={
                    activeIndex === index + 1 ? "active" : ""
                  }
                  onClick={() => goToSlide(index)}
                />
              ))}
            </div>

            <span>
              {String(
                activeIndex === 0
                  ? total
                  : activeIndex === total + 1
                    ? 1
                    : activeIndex
              ).padStart(2, "0")}{" "}
              / {String(total).padStart(2, "0")}
            </span>
          </div>
        </>
      ) : (
        <div className="omt-gallery-grid">
          {galleryItems.map((item) => (
            <article className="omt-gallery-item" key={item.title}>
              <button
                className="omt-gallery-thumb"
                type="button"
                onClick={() => setSelectedImage(item)}
                aria-label={`Open ${item.title}`}
              >
                <img src={item.image} alt={item.title} loading="lazy" />
                <span>↗</span>
              </button>

              <div className="omt-gallery-item-info">
                <span>{item.category}</span>
                <h3>{item.title}</h3>
                <p>{item.description}</p>
              </div>
            </article>
          ))}
        </div>
      )}

      {selectedImage && (
        <div
          className="omt-gallery-lightbox"
          onClick={() => setSelectedImage(null)}
        >
          <button
            className="omt-gallery-close"
            type="button"
            aria-label="Close preview"
            onClick={() => setSelectedImage(null)}
          >
            ×
          </button>

          <div
            className="omt-gallery-lightbox-content"
            onClick={(event) => event.stopPropagation()}
          >
            <img src={selectedImage.image} alt={selectedImage.title} />
            <h3>{selectedImage.title}</h3>
            <p>{selectedImage.description}</p>
          </div>
        </div>
      )}
    </section>
  );
}
