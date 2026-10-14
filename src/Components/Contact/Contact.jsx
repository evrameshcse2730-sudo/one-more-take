import React from "react";

function Contact() {
  return (
<section id="contact" className="contact">
  <div className="contact-image" aria-hidden="true" />
  <div className="contact-red-light" aria-hidden="true" />

  <div className="contact-inner">
    <div className="contact-main reveal">
      <div className="section-label light">
        <span />
        LET'S WORK TOGETHER
      </div>

      <h2>
        LET'S CREATE
        <br />
        SOMETHING
        <br />
        <em>GREAT.</em>
      </h2>

      <p>
        Have a project, brand film,
        <br />
        reel or content idea?
        <br />
        Tell us what you're thinking.
      </p>

      <a
        className="whatsapp-btn magnetic"
        href="https://wa.me/917331132227?text=Hi%20One%20More%20Take%2C%20I%20would%20like%20to%20discuss%20a%20project."
        target="_blank"
        rel="noreferrer"
      >
        <span className="magnetic-inner">
          <span>◉</span>
          Connect on WhatsApp
          <b>↗</b>
        </span>
      </a>
    </div>

    <div className="contact-details reveal delay-1">
      <div className="contact-item">
        <span>⌖</span>
        <div>
          <small>OUR STUDIO</small>
          <p>
            Hyderabad, Telangana
            <br />
            India
          </p>
        </div>
      </div>

      <div className="contact-item">
        <span>✉</span>
        <div>
          <small>EMAIL</small>
          <p>
            <a href="mailto:onemoretake07@gmail.com">
              onemoretake07@gmail.com
            </a>
          </p>
        </div>
      </div>

      <div className="contact-item">
        <span>◔</span>
        <div>
          <small>PHONE</small>
          <p>
            <a href="tel:+917331132227">+91 73311 32227</a>
          </p>
        </div>
      </div>

      <div className="contact-item">
        <span>◷</span>
        <div>
          <small>WORKING HOURS</small>
          <p>
            Mon – Sat
            <br />
            10:00 AM – 7:00 PM
          </p>
        </div>
      </div>
    </div>

    <div className="contact-script" aria-hidden="true">
      Ideas.
      <br />
      People.
      <br />
      Stories.
    </div>
  </div>
</section>
  );
}

export default Contact;