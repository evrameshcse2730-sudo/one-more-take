
import React from "react";
import "./Reviews.css";

// Mee original App.jsx lo unna reviews array ni
// ikkada copy cheyyandi. Original testimonials preserve avuthayi.

const reviews = [
  // { name: "Client Name", role: "Client Role", quote: "Actual client feedback" },
];

export default function Reviews() {
  return (
    <section id="reviews" className="reviews section">
      <div className="reviews-header reveal">
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

      <div className="reviews-grid">
        {reviews.map((review, index) => (
          <article
            className={`review-card reveal delay-${index}`}
            key={`${review.name}-${index}`}
          >
            <div className="quote">“</div>

            <p>{review.quote}</p>

            <div className="review-footer">
              <div className="review-avatar">
                {review.name.charAt(0)}
              </div>

              <div className="review-person">
                <strong>{review.name}</strong>
                <span>{review.role}</span>
              </div>

              <div className="stars" aria-label="5 stars">
                ★★★★★
              </div>
            </div>
          </article>
        ))}

        {reviews.length === 0 && (
          <p className="reviews-empty">
            Add your original client reviews to display them here.
          </p>
        )}
      </div>
    </section>
  );
}
