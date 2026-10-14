import React, { useEffect, useRef, useState } from "react";

import "./App.css";

import Navbar from "./Components/Navbar/Navbar";

import Hero from "./Components/Hero/Hero";

import Marquee from "./Components/Marquee/Marquee";

import About from "./Components/About/About";

import Services from "./Components/Services/Services";

import Plans from "./Components/Plans/Plans";

import Process from "./Components/Process/Process";

import Work from "./Components/Work/Work";

import Experience from "./Components/Experience/Experience";

import Reviews from "./Components/Reviews/Reviews";

import Quotation from "./Components/Quotation/Quotation";

import Contact from "./Components/Contact/Contact";

import Footer from "./Components/Footer/Footer";

function App() {

  const [activeSection, setActiveSection] = useState("home");

  const [cursor, setCursor] = useState({ x: 0, y: 0 });

  const [loaded, setLoaded] = useState(false);

  const [selectedPlanForQuotation, setSelectedPlanForQuotation] = useState(() => {
    try {
      const savedPlan = window.sessionStorage.getItem("omt-selected-quotation-plan");
      return savedPlan ? JSON.parse(savedPlan) : null;
    } catch {
      return null;
    }
  });

  const cursorDotRef = useRef(null);

  const cursorRingRef = useRef(null);

  const scrollTo = (id) => {

    document.getElementById(id)?.scrollIntoView({

      behavior: "smooth",

      block: "start",

    });

  };

const handlePlanQuotation = (plan) => {
    setSelectedPlanForQuotation(plan);

    try {
      window.sessionStorage.setItem(
        "omt-selected-quotation-plan",
        JSON.stringify(plan)
      );
    } catch (error) {
      console.warn("Could not save the selected quotation plan.", error);
    }

    window.location.assign("/quotation");
  };

  // Page load animation

  useEffect(() => {

    const timer = window.setTimeout(() => setLoaded(true), 60);

    return () => window.clearTimeout(timer);

  }, []);

  // Hero parallax

  useEffect(() => {

    const handleMouse = (event) => {

      setCursor({

        x: (event.clientX / window.innerWidth - 0.5) * 18,

        y: (event.clientY / window.innerHeight - 0.5) * 18,

      });

    };

    window.addEventListener("mousemove", handleMouse);

    return () => {

      window.removeEventListener("mousemove", handleMouse);

    };

  }, []);

  // Scroll progress and velocity

  useEffect(() => {

    let lastY = window.scrollY;

    let ticking = false;

    const updateScroll = () => {

      const currentY = window.scrollY;

      const maxScroll =

        document.documentElement.scrollHeight - window.innerHeight;

      const progress =

        maxScroll > 0 ? (currentY / maxScroll) * 100 : 0;

      const velocity = Math.min(

        Math.abs(currentY - lastY) * 0.018,

        1

      );

      document.documentElement.style.setProperty(

        "--scroll-progress",

        `${progress}%`

      );

      document.documentElement.style.setProperty(

        "--scroll-velocity",

        velocity.toFixed(2)

      );

      lastY = currentY;

      ticking = false;

    };

    const handleScroll = () => {

      if (!ticking) {

        window.requestAnimationFrame(updateScroll);

        ticking = true;

      }

    };

    updateScroll();

    window.addEventListener("scroll", handleScroll, {

      passive: true,

    });

    return () => {

      window.removeEventListener("scroll", handleScroll);

    };

  }, []);

  // Active navigation section

  useEffect(() => {

    const sections = document.querySelectorAll("section[id]");

    const observer = new IntersectionObserver(

      (entries) => {

        entries.forEach((entry) => {

          if (entry.isIntersecting) {

            setActiveSection(entry.target.id);

          }

        });

      },

      { threshold: 0.45 }

    );

    sections.forEach((section) => observer.observe(section));

    return () => observer.disconnect();

  }, []);

  // Reveal elements on scroll

  useEffect(() => {

    const elements = document.querySelectorAll(".reveal");

    const observer = new IntersectionObserver(

      (entries) => {

        entries.forEach((entry) => {

          if (entry.isIntersecting) {

            entry.target.classList.add("visible");

          } else if (entry.boundingClientRect.top > 0) {

            entry.target.classList.remove("visible");

          }

        });

      },

      {

        threshold: 0.12,

        rootMargin: "0px 0px -70px 0px",

      }

    );

    elements.forEach((element) => observer.observe(element));

    return () => observer.disconnect();

  }, []);

  // Custom cursor

  useEffect(() => {

    const dot = cursorDotRef.current;

    const ring = cursorRingRef.current;

    if (!dot || !ring) return;

    let ringX = 0;

    let ringY = 0;

    let mouseX = 0;

    let mouseY = 0;

    let animationFrame;

    const move = (event) => {

      mouseX = event.clientX;

      mouseY = event.clientY;

      dot.style.transform = `translate3d(${mouseX}px, ${mouseY}px, 0)`;

    };

    const animateRing = () => {

      ringX += (mouseX - ringX) * 0.16;

      ringY += (mouseY - ringY) * 0.16;

      ring.style.transform = `translate3d(${ringX}px, ${ringY}px, 0)`;

      animationFrame = window.requestAnimationFrame(animateRing);

    };

    const grow = () => ring.classList.add("cursor-hover");

    const shrink = () => ring.classList.remove("cursor-hover");

    const attachHoverEvents = () => {

      document

        .querySelectorAll(

          "a, button, .service-card, .work-card, .review-card, .experience-card"

        )

        .forEach((element) => {

          element.addEventListener("mouseenter", grow);

          element.addEventListener("mouseleave", shrink);

        });

    };

    window.addEventListener("mousemove", move);

    attachHoverEvents();

    animationFrame = window.requestAnimationFrame(animateRing);

    return () => {

      window.removeEventListener("mousemove", move);

      window.cancelAnimationFrame(animationFrame);

      document

        .querySelectorAll(

          "a, button, .service-card, .work-card, .review-card, .experience-card"

        )

        .forEach((element) => {

          element.removeEventListener("mouseenter", grow);

          element.removeEventListener("mouseleave", shrink);

        });

    };

  }, []);

  // Magnetic buttons

  useEffect(() => {

    const magnets = document.querySelectorAll(".magnetic");

    const handleMove = (event) => {

      const element = event.currentTarget;

      const rect = element.getBoundingClientRect();

      const x = event.clientX - rect.left - rect.width / 2;

      const y = event.clientY - rect.top - rect.height / 2;

      element.style.transform = `translate(${x * 0.12}px, ${y * 0.12}px)`;

      const label = element.querySelector(".magnetic-inner");

      if (label) {

        label.style.transform = `translate(${x * 0.08}px, ${y * 0.08}px)`;

      }

    };

    const handleLeave = (event) => {

      const element = event.currentTarget;

      element.style.transform = "translate(0px, 0px)";

      const label = element.querySelector(".magnetic-inner");

      if (label) {

        label.style.transform = "translate(0px, 0px)";

      }

    };

    magnets.forEach((element) => {

      element.addEventListener("mousemove", handleMove);

      element.addEventListener("mouseleave", handleLeave);

    });

    return () => {

      magnets.forEach((element) => {

        element.removeEventListener("mousemove", handleMove);

        element.removeEventListener("mouseleave", handleLeave);

      });

    };

  }, []);

  // 3D tilt effect

  useEffect(() => {

    const cards = document.querySelectorAll(

      ".service-card, .work-card, .review-card, .experience-card"

    );

    const handleMove = (event) => {

      const element = event.currentTarget;

      const rect = element.getBoundingClientRect();

      const x = (event.clientX - rect.left) / rect.width - 0.5;

      const y = (event.clientY - rect.top) / rect.height - 0.5;

      element.style.setProperty(

        "--tilt-x",

        `${(y * -8).toFixed(2)}deg`

      );

      element.style.setProperty(

        "--tilt-y",

        `${(x * 8).toFixed(2)}deg`

      );

      element.style.setProperty(

        "--glow-x",

        `${(x * 100 + 50).toFixed(1)}%`

      );

      element.style.setProperty(

        "--glow-y",

        `${(y * 100 + 50).toFixed(1)}%`

      );

    };

    const handleLeave = (event) => {

      const element = event.currentTarget;

      element.style.setProperty("--tilt-x", "0deg");

      element.style.setProperty("--tilt-y", "0deg");

    };

    cards.forEach((element) => {

      element.addEventListener("mousemove", handleMove);

      element.addEventListener("mouseleave", handleLeave);

    });

    return () => {

      cards.forEach((element) => {

        element.removeEventListener("mousemove", handleMove);

        element.removeEventListener("mouseleave", handleLeave);

      });

    };

  }, []);

  // Render quotation on a separate URL instead of scrolling within the homepage.
  if (window.location.pathname.replace(/\/$/, "") === "/quotation") {
    return (
      <div className={`site ${loaded ? "site-loaded" : "site-loading"}`}>
        <a
          href="/"
          className="quotation-back-home"
          style={{
            position: "fixed",
            top: "20px",
            left: "20px",
            zIndex: 1000,
            display: "inline-flex",
            alignItems: "center",
            gap: "8px",
            padding: "12px 16px",
            background: "#ed111b",
            color: "#fff",
            textDecoration: "none",
            fontSize: "12px",
            fontWeight: 700,
          }}
        >
          ← Back to Home
        </a>
        <Quotation selectedPlan={selectedPlanForQuotation} />
      </div>
    );
  }

  return (

    <div className={`site ${loaded ? "site-loaded" : "site-loading"}`}>

      {/* Page load animation */}

      <div className="load-curtain" aria-hidden="true">

        <span />

      </div>

      {/* Custom cursor */}

      <div

        className="cursor-dot"

        ref={cursorDotRef}

        aria-hidden="true"

      />

      <div

        className="cursor-ring"

        ref={cursorRingRef}

        aria-hidden="true"

      />

      {/* Cinematic overlays */}

      <div className="cinematic-progress" aria-hidden="true">

        <span />

      </div>

      <div className="grain-overlay" aria-hidden="true" />

      <div className="ambient-particles" aria-hidden="true">

        {Array.from({ length: 14 }).map((_, index) => (

          <i key={index} style={{ "--i": index }} />

        ))}

      </div>

      {/* Website sections */}

      <Navbar

        activeSection={activeSection}

        scrollTo={scrollTo}

      />

      <Hero cursor={cursor} scrollTo={scrollTo} />

      <Marquee />

      <About />

      <Services />

      <Plans onGenerateQuotation={handlePlanQuotation} />

      <Process />

      <Work />

      <Experience />

      <Reviews />

      <Contact />

      <Footer />

    </div>

  );

}

export default App;