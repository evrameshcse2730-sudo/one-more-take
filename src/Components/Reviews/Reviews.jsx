
import React, { useEffect, useState } from "react";
import { collection, onSnapshot } from "firebase/firestore";
import { db } from "../../firebase";
import "./Reviews.css";

export default function Reviews() {
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const unsubscribe = onSnapshot(
      collection(db, "reviews"),
      (snapshot) => {
        setReviews(
          snapshot.docs.map((item) => ({
            id: item.id,
            ...item.data(),
          }))
        );
        setLoading(false);
        setError("");
      },
      (err) => {
        console.error("Reviews loading failed:", err);
        setError("Unable to load reviews.");
        setLoading(false);
      }
    );

    return () => unsubscribe();
  }, []);

 const visibleStyle = {
  display: "block",
  visibility: "visible",
  opacity: 1,
  filter: "none",
  backdropFilter: "none",
  WebkitFilter: "none",
  transform: "none",
  position: "relative",
  zIndex: 10,
};

  return (
    <section
      id="reviews"
      className="reviews section"
      style={visibleStyle}
    >
      <div className="reviews-header" style={visibleStyle}>
        <div>
          <div className="section-label">
            <span />
            CLIENT STORIES
          </div>

          <h2>
            WHAT PEOPLE
            <br />
            <em>SAY ABOUT US.</em>
          </h2>
        </div>

        <p>
          The best part of the work is hearing
          what the story meant to the people
          we created it for.
        </p>
      </div>

      <div
        className="reviews-grid"
        style={{
          ...visibleStyle,
          display: "grid",
          gridTemplateColumns:
            "repeat(auto-fit, minmax(260px, 1fr))",
          gap: "18px",
        }}
      >
        {loading && (
          <p className="reviews-empty">
            Loading client reviews...
          </p>
        )}

        {!loading && error && (
          <p className="reviews-empty">{error}</p>
        )}

        {!loading && !error && reviews.length === 0 && (
          <p className="reviews-empty">
            Client reviews will appear here soon.
          </p>
        )}

        {!loading &&
          !error &&
          reviews.map((review) => (
            <article
              key={review.id}
              className="review-card"
              style={{
                ...visibleStyle,
                background: "#f7f7f5",
                color: "#111",
                minHeight: "220px",
                padding: "30px",
                border: "1px solid #e7e7e4",
              }}
            >
              <div className="quote">“</div>

              <p>{review.quote || ""}</p>

              <div className="review-footer">
                <div className="review-avatar">
                  {(review.name || "C")
                    .charAt(0)
                    .toUpperCase()}
                </div>

                <div className="review-person">
                  <strong>{review.name || "Client"}</strong>
                  <span>{review.role || ""}</span>
                </div>

                <div className="stars" aria-label="5 stars">
                  ★★★★★
                </div>
              </div>
            </article>
          ))}
      </div>
    </section>
  );
}
