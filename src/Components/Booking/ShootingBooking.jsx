import { useState } from "react";
import "./ShootingBooking.css";

const OWNER_WHATSAPP = "917331132227"; // Replace with owner's WhatsApp number

const slots = [
  "09:00 AM",
  "10:00 AM",
  "11:00 AM",
  "12:00 PM",
  "01:00 PM",
  "02:00 PM",
  "03:00 PM",
  "04:00 PM",
  "05:00 PM",
];

export default function Booking() {
  const [form, setForm] = useState({
    name: "",
    phone: "",
    service: "Studio",
    date: "",
    time: "",
  });

  const [message, setMessage] = useState("");

  const today = new Date().toLocaleDateString("en-CA");

  function handleChange(event) {
    setForm({ ...form, [event.target.name]: event.target.value });
    setMessage("");
  }

  function handleSubmit(event) {
    event.preventDefault();

    if (!form.time) {
      setMessage("Please select a shooting time.");
      return;
    }

    const text = [
      "NEW SHOOTING BOOKING REQUEST",
      "",
      `Name: ${form.name}`,
      `Phone: ${form.phone}`,
      `Shoot Type: ${form.service}`,
      `Date: ${form.date}`,
      `Time: ${form.time}`,
    ].join("\n");

    const url = `https://wa.me/${OWNER_WHATSAPP}?text=${encodeURIComponent(text)}`;

    window.open(url, "_blank", "noopener,noreferrer");
    setMessage("WhatsApp opened. Send the message to notify the owner.");
  }

  return (
    <section  className="booking-section" id="booking">
      <div className="booking-container">
        <span className="booking-tag">LET'S CREATE SOMETHING AMAZING</span>
        <h2>Book Your <span>Shoot</span></h2>
        <p className="booking-description">
          Choose your shoot type, select a date and time, and send your booking
          request to One More Take.
        </p>

        <form className="booking-form" onSubmit={handleSubmit}>
          <div className="booking-field">
            <label htmlFor="booking-name">Your Name</label>
            <input
              id="booking-name"
              name="name"
              value={form.name}
              onChange={handleChange}
              placeholder="Enter your full name"
              required
              maxLength={100}
            />
          </div>

          <div className="booking-field">
            <label htmlFor="booking-phone">Phone Number</label>
            <input
              id="booking-phone"
              name="phone"
              type="tel"
              value={form.phone}
              onChange={handleChange}
              placeholder="Enter your phone number"
              pattern="[0-9+\s()-]{8,20}"
              required
            />
          </div>

          <div className="booking-field">
            <label htmlFor="booking-service">Shoot Type</label>
            <select
              id="booking-service"
              name="service"
              value={form.service}
              onChange={handleChange}
            >
              <option value="Studio">Studio Shoot</option>
              <option value="Outdoor">Outdoor Shoot</option>
            </select>
          </div>

          <div className="booking-field">
            <label htmlFor="booking-date">Shooting Date</label>
            <input
              id="booking-date"
              name="date"
              type="date"
              min={today}
              value={form.date}
              onChange={handleChange}
              required
            />
          </div>

          <div className="booking-field booking-time-field">
            <label htmlFor="booking-time">Preferred Time</label>
            <select
              id="booking-time"
              name="time"
              value={form.time}
              onChange={handleChange}
              required
            >
              <option value="">Select a time</option>
              {slots.map((slot) => (
                <option key={slot} value={slot}>
                  {slot}
                </option>
              ))}
            </select>
          </div>

          <button className="booking-submit" type="submit">
            Send Booking Request via WhatsApp
          </button>

          {message && (
            <p className="booking-message" role="status">
              {message}
            </p>
          )}
        </form>
      </div>
    </section>
  );
}