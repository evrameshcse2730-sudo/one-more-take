
import { useEffect, useState } from "react";
import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  onSnapshot,
  serverTimestamp,
} from "firebase/firestore";
import { db } from "../../firebase";
import "./AdminPage.css";

export default function ReviewsManager() {
  const [reviews, setReviews] = useState([]);
  const [name, setName] = useState("");
  const [role, setRole] = useState("");
  const [quote, setQuote] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    return onSnapshot(
      collection(db, "reviews"),
      (snapshot) => {
        setReviews(
          snapshot.docs.map((item) => ({
            id: item.id,
            ...item.data(),
          }))
        );
      },
      (err) => {
        console.error("Reviews loading failed:", err);
        setError("Could not load reviews. Check Firestore permissions.");
      }
    );
  }, []);

  async function handleAdd(event) {
    event.preventDefault();
    setError("");
    setMessage("");

    if (!name.trim() || !role.trim() || !quote.trim()) {
      setError("Please fill in all fields.");
      return;
    }

    setLoading(true);

    try {
      await addDoc(collection(db, "reviews"), {
        name: name.trim(),
        role: role.trim(),
        quote: quote.trim(),
        createdAt: serverTimestamp(),
      });

      setName("");
      setRole("");
      setQuote("");
      setMessage("Review added successfully.");
    } catch (err) {
      console.error("Review save failed:", err);
      setError("Could not save review. Check Firestore permissions.");
    } finally {
      setLoading(false);
    }
  }

  async function handleDelete(id) {
    if (!window.confirm("Delete this review?")) return;

    setError("");
    setMessage("");

    try {
      await deleteDoc(doc(db, "reviews", id));
      setMessage("Review deleted successfully.");
    } catch (err) {
      console.error("Review deletion failed:", err);
      setError("Could not delete review. Check Firestore permissions.");
    }
  }

  return (
    <section className="admin-panel-card">
      <div className="admin-panel-heading">
        <div>
          <p className="admin-eyebrow">CLIENT FEEDBACK</p>
          <h2>Manage Reviews</h2>
          <p className="admin-muted">
            Add or remove client reviews displayed on your website.
          </p>
        </div>
      </div>

      {error && <p className="admin-error" role="alert">{error}</p>}
      {message && <p className="admin-success" role="status">{message}</p>}

      <form className="image-manager-form" onSubmit={handleAdd}>
        <label htmlFor="review-name">Client name</label>
        <input
          id="review-name"
          value={name}
          onChange={(event) => setName(event.target.value)}
          placeholder="Enter client name"
          maxLength={100}
          required
        />

        <label htmlFor="review-role">Role / Company</label>
        <input
          id="review-role"
          value={role}
          onChange={(event) => setRole(event.target.value)}
          placeholder="e.g. Event Manager"
          maxLength={150}
          required
        />

        <label htmlFor="review-quote">Client review</label>
        <textarea
          id="review-quote"
          value={quote}
          onChange={(event) => setQuote(event.target.value)}
          placeholder="Enter client feedback"
          maxLength={1500}
          rows={4}
          required
        />

        <button
          className="admin-primary-button"
          type="submit"
          disabled={loading}
        >
          {loading ? "Saving..." : "Add Review"}
        </button>
      </form>

      <div className="admin-image-grid">
        {reviews.map((review) => (
          <article className="admin-image-card" key={review.id}>
            <div className="admin-image-details">
              <strong>{review.name}</strong>
              <small>{review.role}</small>
              <p>{review.quote}</p>
            </div>

            <div className="admin-image-actions">
              <button
                type="button"
                className="admin-danger-button"
                onClick={() => handleDelete(review.id)}
              >
                Delete
              </button>
            </div>
          </article>
        ))}

        {reviews.length === 0 && <p>No reviews added yet.</p>}
      </div>
    </section>
  );
}
