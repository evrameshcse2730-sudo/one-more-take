import React, { useEffect, useRef, useState } from "react";
import "./App.css";

const services = [
  {
    number: "01",
    title: "Video Production",
    text: "Cinematic brand films, commercials, campaigns and visual stories.",
    icon: "◉",
  },
  {
    number: "02",
    title: "Video Editing",
    text: "Sharp cuts, sound design, pacing, color and motion that hold attention.",
    icon: "▣",
  },
  {
    number: "03",
    title: "Reels & Shorts",
    text: "Scroll-stopping short-form content built for modern audiences.",
    icon: "▶",
  },
  {
    number: "04",
    title: "Podcasts",
    text: "Professional multi-camera podcasts with clean visual storytelling.",
    icon: "◉",
  },
  {
    number: "05",
    title: "Photoshoots",
    text: "People, products and brands captured with a cinematic visual language.",
    icon: "◎",
  },
  {
    number: "06",
    title: "Brand Content",
    text: "Consistent visual content designed to make brands memorable.",
    icon: "✦",
  },
];

const projects = [
  {
    title: "Brand Film",
    category: "CINEMATIC FILM",
    image:
      "https://images.unsplash.com/photo-1485846234645-a62644f84728?auto=format&fit=crop&w=1200&q=85",
  },
  {
    title: "Social Reels",
    category: "SHORT FORM",
    image:
      "https://res.cloudinary.com/db4faz2rs/image/upload/v1789708306/ChatGPT_Image_Sep_18_2026_10_41_39_AM_zfywks.png",
  },
  {
    title: "Events",
    category: "EVENT FILMS",
    image:
      "https://images.unsplash.com/photo-1501386761578-eac5c94b800a?auto=format&fit=crop&w=1200&q=85",
  },
  {
    title: "Podcasts",
    category: "PODCAST",
    image:
      "https://images.unsplash.com/photo-1590602847861-f357a9332bbc?auto=format&fit=crop&w=1200&q=85",
  },
  {
    title: "Product Film",
    category: "PRODUCT",
    image:
      "https://images.unsplash.com/photo-1526170375885-4d8ecf77b99f?auto=format&fit=crop&w=1200&q=85",
  },
];

const reviews = [
  {
    quote:
      "The team understood our vision perfectly and delivered beyond expectations. Every frame felt intentional.",
    name: "Vaasu Challa",
    role: "Founder & CEO of HAPPYCOIN",
  },
  {
    quote:
      "Super creative, responsive and easy to work with. The final video felt exactly like our brand.",
    name: "Sampath Kumar B",
    role: "Founder of SWIPERCLICK",
  },
  {
    quote:
      "They brought our ideas to life with clarity, energy and a very strong visual style.",
    name: "Sneha Reddy",
    role: "Marketing Manager",
  },
];

function App() {
  const [activeSection, setActiveSection] = useState("home");
  const [cursor, setCursor] = useState({ x: 0, y: 0 });
  const [loaded, setLoaded] = useState(false);

  const cursorDotRef = useRef(null);
  const cursorRingRef = useRef(null);

  const scrollTo = (id) => {
    document.getElementById(id)?.scrollIntoView({
      behavior: "smooth",
    });
  };

  /* ---------- entrance flag (drives the page-load fade) ---------- */
  useEffect(() => {
    const t = setTimeout(() => setLoaded(true), 60);
    return () => clearTimeout(t);
  }, []);

  /* ---------- hero parallax ---------- */
  useEffect(() => {
    const handleMouse = (e) => {
      setCursor({
        x: (e.clientX / window.innerWidth - 0.5) * 18,
        y: (e.clientY / window.innerHeight - 0.5) * 18,
      });
    };

    window.addEventListener("mousemove", handleMouse);

    return () => window.removeEventListener("mousemove", handleMouse);
  }, []);

  /* ---------- scroll progress + velocity ---------- */
  useEffect(() => {
    let lastY = window.scrollY;
    let ticking = false;

    const updateScroll = () => {
      const y = window.scrollY;
      const max = document.documentElement.scrollHeight - window.innerHeight;
      const progress = max > 0 ? (y / max) * 100 : 0;
      const velocity = Math.min(Math.abs(y - lastY) * 0.018, 1);

      document.documentElement.style.setProperty("--scroll-progress", `${progress}%`);
      document.documentElement.style.setProperty("--scroll-velocity", velocity.toFixed(2));

      lastY = y;
      ticking = false;
    };

    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(updateScroll);
        ticking = true;
      }
    };

    updateScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  /* ---------- active nav section ---------- */
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

  /* ---------- reveal-on-scroll ---------- */
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

  /* ---------- custom cursor (dot + trailing ring) ---------- */
  useEffect(() => {
    const dot = cursorDotRef.current;
    const ring = cursorRingRef.current;
    if (!dot || !ring) return;

    let ringX = 0;
    let ringY = 0;
    let mouseX = 0;
    let mouseY = 0;
    let raf;

    const move = (e) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
      dot.style.transform = `translate3d(${mouseX}px, ${mouseY}px, 0)`;
    };

    const loop = () => {
      ringX += (mouseX - ringX) * 0.16;
      ringY += (mouseY - ringY) * 0.16;
      ring.style.transform = `translate3d(${ringX}px, ${ringY}px, 0)`;
      raf = requestAnimationFrame(loop);
    };

    const grow = () => ring.classList.add("cursor-hover");
    const shrink = () => ring.classList.remove("cursor-hover");

    const hoverables = document.querySelectorAll(
      "a, button, .service-card, .work-card, .review-card, .experience-card"
    );

    window.addEventListener("mousemove", move);
    hoverables.forEach((el) => {
      el.addEventListener("mouseenter", grow);
      el.addEventListener("mouseleave", shrink);
    });

    raf = requestAnimationFrame(loop);

    return () => {
      window.removeEventListener("mousemove", move);
      hoverables.forEach((el) => {
        el.removeEventListener("mouseenter", grow);
        el.removeEventListener("mouseleave", shrink);
      });
      cancelAnimationFrame(raf);
    };
  }, []);

  /* ---------- magnetic buttons ---------- */
  useEffect(() => {
    const magnets = document.querySelectorAll(".magnetic");

    const handleMove = (e) => {
      const el = e.currentTarget;
      const rect = el.getBoundingClientRect();
      const relX = e.clientX - rect.left - rect.width / 2;
      const relY = e.clientY - rect.top - rect.height / 2;

      el.style.transform = `translate(${relX * 0.32}px, ${relY * 0.42}px)`;

      const label = el.querySelector(".magnetic-inner");
      if (label) {
        label.style.transform = `translate(${relX * 0.15}px, ${relY * 0.2}px)`;
      }
    };

    const handleLeave = (e) => {
      const el = e.currentTarget;
      el.style.transform = "translate(0px, 0px)";
      const label = el.querySelector(".magnetic-inner");
      if (label) label.style.transform = "translate(0px, 0px)";
    };

    magnets.forEach((el) => {
      el.addEventListener("mousemove", handleMove);
      el.addEventListener("mouseleave", handleLeave);
    });

    return () => {
      magnets.forEach((el) => {
        el.removeEventListener("mousemove", handleMove);
        el.removeEventListener("mouseleave", handleLeave);
      });
    };
  }, []);

  /* ---------- 3D tilt for cards ---------- */
  useEffect(() => {
    const tiltEls = document.querySelectorAll(
      ".service-card, .work-card, .review-card, .experience-card"
    );

    const handleMove = (e) => {
      const el = e.currentTarget;
      const rect = el.getBoundingClientRect();
      const px = (e.clientX - rect.left) / rect.width - 0.5;
      const py = (e.clientY - rect.top) / rect.height - 0.5;

      el.style.setProperty("--tilt-x", `${(py * -8).toFixed(2)}deg`);
      el.style.setProperty("--tilt-y", `${(px * 8).toFixed(2)}deg`);
      el.style.setProperty("--glow-x", `${(px * 100 + 50).toFixed(1)}%`);
      el.style.setProperty("--glow-y", `${(py * 100 + 50).toFixed(1)}%`);
    };

    const handleLeave = (e) => {
      const el = e.currentTarget;
      el.style.setProperty("--tilt-x", `0deg`);
      el.style.setProperty("--tilt-y", `0deg`);
    };

    tiltEls.forEach((el) => {
      el.addEventListener("mousemove", handleMove);
      el.addEventListener("mouseleave", handleLeave);
    });

    return () => {
      tiltEls.forEach((el) => {
        el.removeEventListener("mousemove", handleMove);
        el.removeEventListener("mouseleave", handleLeave);
      });
    };
  }, []);

  return (
    <div className={`site ${loaded ? "site-loaded" : "site-loading"}`}>

      {/* PAGE LOAD CURTAIN */}
      <div className="load-curtain" aria-hidden="true">
        <span></span>
      </div>

      {/* CUSTOM CURSOR */}
      <div className="cursor-dot" ref={cursorDotRef} aria-hidden="true"></div>
      <div className="cursor-ring" ref={cursorRingRef} aria-hidden="true"></div>

      <div className="cinematic-progress" aria-hidden="true">
        <span></span>
      </div>

      <div className="grain-overlay" aria-hidden="true"></div>

      {/* floating ambient particles */}
      <div className="ambient-particles" aria-hidden="true">
        {Array.from({ length: 14 }).map((_, i) => (
          <i key={i} style={{ "--i": i }}></i>
        ))}
      </div>

      {/* ================= NAVBAR ================= */}

      <header className="navbar">

        <button
          className="logo"
          onClick={() => scrollTo("home")}
        >
          <span className="logo-mark">
            <i></i>
          </span>

          <span>
            ONE MORE <b>TAKE</b>
          </span>
        </button>

        <nav>
          {[
            ["home", "Home"],
            ["about", "About"],
            ["work", "Work"],
            ["services", "Services"],
            ["experience", "Experience"],
            ["reviews", "Reviews"],
            ["contact", "Contact"],
          ].map(([id, label]) => (
            <button
              key={id}
              className={activeSection === id ? "active" : ""}
              onClick={() => scrollTo(id)}
            >
              {label}
            </button>
          ))}
        </nav>

        <button
          className="nav-cta magnetic"
          onClick={() => scrollTo("contact")}
        >
          <span className="magnetic-inner">
            Let's Create
            <span>↗</span>
          </span>
        </button>

      </header>


      {/* ================= HERO ================= */}

      <section
        id="home"
        className="hero"
        style={{
          "--mx": `${cursor.x}px`,
          "--my": `${cursor.y}px`,
        }}
      >

        <div className="hero-noise"></div>
        <div className="hero-grid"></div>

        <div className="hero-frame-counter" aria-hidden="true">
          <span>FRAME</span>
          <b>001</b>
          <i></i>
        </div>

        <div className="hero-glow"></div>

        <div className="hero-content">

          <div className="eyebrow reveal">
            <span></span>
            CREATIVE VIDEO PRODUCTION STUDIO
          </div>

          <h1 className="hero-title">

            <span className="line reveal">
              IDEAS
            </span>

            <span className="line reveal delay-1">
              DESERVE
            </span>

            <span className="line red reveal delay-2">
              A BETTER
            </span>

            <span className="line red outline-text reveal delay-3">
              TAKE.
            </span>

          </h1>

          <div className="hero-description reveal delay-3">

            <span className="vertical-line"></span>

            <p>
              We shoot. We edit. We create.
              <br />
              Visual stories that make people stop,
              watch and remember.
            </p>

          </div>

          <div className="hero-buttons reveal delay-4">

            <button
              className="primary-btn magnetic"
              onClick={() => scrollTo("work")}
            >
              <span className="magnetic-inner">
                <span className="btn-play">▶</span>
                Watch Showreel
                <b>↗</b>
              </span>
            </button>

            <button
              className="text-btn"
              onClick={() => scrollTo("services")}
            >
              Explore Services
              <span>→</span>
            </button>

          </div>

          <div className="hero-mini-stats reveal delay-4">

            <div>
              <strong>100+</strong>
              <span>PROJECTS</span>
            </div>

            <div>
              <strong>60+</strong>
              <span>CLIENTS</span>
            </div>

            <div>
              <strong>3+</strong>
              <span>YEARS</span>
            </div>

          </div>

        </div>


        {/* CAMERA */}

        <div className="hero-visual">

          <div
            className="camera-wrap"
            style={{
              transform: `translate(var(--mx), var(--my))`,
            }}
          >

            <div className="camera-aura"></div>

            <img
              src="/cinema-camera.png"
              alt="Professional cinema camera"
              className="real-camera"
            />

          </div>


          {/* REC */}

          <div className="rec-badge">
            <span></span>
            REC
            <small>00:01:24:18</small>
          </div>


          {/* CAMERA LABEL */}

          <div className="floating-tag tag-camera">
            CAMERA
            <span>01</span>
          </div>

          <div className="floating-tag tag-frame">
            FRAME
            <span>02</span>
          </div>

          <div className="floating-tag tag-edit">
            EDIT
            <span>03</span>
          </div>


          {/* HANDWRITING */}

          <div className="hero-script">
            Shoot.
            <br />
            Edit.
            <br />
            Create.
            <br />
            Inspire.
          </div>


          {/* EDITING SCREEN */}

          <div className="editing-screen">

            <div className="screen-top">
              <span>ONE MORE TAKE / EDIT</span>
              <span>4K · 24FPS</span>
            </div>

            <div className="screen-video">

              <div className="video-subject"></div>

              <span className="screen-rec">
                ● REC
              </span>

              <span className="screen-time">
                00:01:24
              </span>

            </div>

            <div className="timeline">

              <div className="timeline-tools">
                VIDEO
                <span>AUDIO</span>
                <span>COLOR</span>
              </div>

              <div className="clips">

                <i></i>
                <i></i>
                <i></i>
                <i></i>
                <i></i>

              </div>

              <div className="audio-wave">

                {Array.from({ length: 20 }).map((_, i) => (
                  <b key={i}></b>
                ))}

              </div>

              <div className="playhead"></div>

            </div>

          </div>

        </div>


        {/* SCROLL */}

        <div className="scroll-indicator">
          <span>SCROLL TO EXPLORE</span>
          <i></i>
        </div>

      </section>


      {/* ================= MARQUEE ================= */}

      <div className="marquee">

        <div className="marquee-track">

          <span>SHOOT</span>
          <i>✦</i>

          <span>EDIT</span>
          <i>✦</i>

          <span>CREATE</span>
          <i>✦</i>

          <span>INSPIRE</span>
          <i>✦</i>

          <span>SHOOT</span>
          <i>✦</i>

          <span>EDIT</span>
          <i>✦</i>

          <span>CREATE</span>
          <i>✦</i>

          <span>INSPIRE</span>
          <i>✦</i>

        </div>

      </div>


      {/* ================= ABOUT ================= */}

      <section id="about" className="about section">

        <div className="about-left reveal">

          <div className="section-label">
            <span></span>
            WHO WE ARE
          </div>

          <h2>
            We don't just
            <br />
            make <em>videos.</em>
          </h2>

        </div>

        <div className="about-right reveal delay-1">

          <p className="large-copy">
            We turn ideas into visual experiences
            people actually want to watch.
          </p>

          <p>
            From the first frame to the final cut,
            One More Take brings production and
            post-production together under one roof.
          </p>

          <p>
            Camera, lighting, editing, sound,
            motion and storytelling — every detail
            works together to make your story feel
            bigger.
          </p>

          <div className="about-signature">
            <span>GOOD FRAMES.</span>
            <b>BETTER STORIES.</b>
          </div>

        </div>

      </section>


      {/* ================= SERVICES ================= */}

      <section id="services" className="services section">

        <div className="services-header reveal">

          <div>

            <div className="section-label">
              <span></span>
              WHAT WE DO
            </div>

            <h2>
              FULL CREATIVE
              <br />
              SUPPORT FOR
              <em> YOUR STORY.</em>
            </h2>

          </div>

          <p>
            One creative partner from concept
            to final delivery.
          </p>

        </div>


        <div className="services-grid">

          {services.map((service, index) => (

            <article
              className={`service-card tilt-card reveal delay-${index % 4}`}
              key={service.number}
            >

              <span className="card-glow" aria-hidden="true"></span>

              <div className="service-number">
                {service.number}
              </div>

              <div className="service-icon">
                {service.icon}
              </div>

              <h3>
                {service.title}
              </h3>

              <p>
                {service.text}
              </p>

              <span className="service-arrow">
                ↗
              </span>

            </article>

          ))}

        </div>

      </section>


      {/* ================= PROCESS ================= */}

      <section className="process">

        <div className="process-bg"></div>

        <div className="process-inner">

          <div className="process-intro reveal">

            <div className="section-label light">
              <span></span>
              THE PROCESS
            </div>

            <h2>
              FROM
              <br />
              FOOTAGE
              <br />
              TO <em>IMPACT.</em>
            </h2>

            <p>
              Ideas go through many frames.
              We make the final one unforgettable.
            </p>

          </div>


          <div className="process-track">

            <div className="process-line">
              <span></span>
            </div>

            {[
              ["01", "PLAN", "Understand"],
              ["02", "SHOOT", "Capture"],
              ["03", "EDIT", "Bring it alive"],
              ["04", "COLOR", "Set the mood"],
              ["05", "DELIVER", "Make it perform"],
            ].map((step, index) => (

              <div
                className={`process-step reveal delay-${index}`}
                key={step[0]}
              >

                <small>{step[0]}</small>

                <div className="process-card">

                  <div className={`process-visual pv-${index}`}>

                    {index === 0 && (
                      <div className="paper-lines">
                        <i></i>
                        <i></i>
                        <i></i>
                        <i></i>
                      </div>
                    )}

                    {index === 1 && (
                      <div className="mini-camera">
                        ◉
                      </div>
                    )}

                    {index === 2 && (
                      <div className="mini-edit">
                        <i></i>
                        <i></i>
                        <i></i>
                      </div>
                    )}

                    {index === 3 && (
                      <div className="color-wheels">
                        <i></i>
                        <i></i>
                        <i></i>
                      </div>
                    )}

                    {index === 4 && (
                      <div className="deliver-icon">
                        ↗
                      </div>
                    )}

                  </div>

                </div>

                <strong>{step[1]}</strong>

                <span>{step[2]}</span>

              </div>

            ))}

          </div>

        </div>

      </section>


      {/* ================= WORK ================= */}

      <section id="work" className="work section">

        <div className="work-header reveal">

          <div>

            <div className="section-label">
              <span></span>
              FEATURED WORK
            </div>

            <h2>
              REAL STORIES.
              <br />
              REAL <em>IMPACT.</em>
            </h2>

          </div>

          <button className="outline-btn">
            View All Work
            <span>↗</span>
          </button>

        </div>


        <div className="work-grid">

          {projects.map((project, index) => (

            <article
              className={`work-card tilt-card reveal delay-${index % 4}`}
              key={project.title}
            >

              <img
                src={project.image}
                alt={project.title}
              />

              <div className="work-overlay"></div>

              <div className="work-number">
                0{index + 1}
              </div>

              <button className="work-play">
                ▶
              </button>

              <div className="work-info">

                <span>
                  {project.category}
                </span>

                <h3>
                  {project.title}
                </h3>

              </div>

            </article>

          ))}

        </div>

      </section>


      {/* ================= EXPERIENCE ================= */}

      <section
        id="experience"
        className="experience section"
      >

        <div className="experience-heading reveal">

          <div className="section-label">
            <span></span>
            OUR EXPERIENCE
          </div>

          <h2>
            EXPERIENCE
            <br />
            THAT <em>SHOWS.</em>
          </h2>

          <p>
            Years of learning, creating and
            growing with ambitious brands,
            professionals and creators.
          </p>

        </div>


        <div className="experience-grid">

          {[
            ["3+", "Years", "in the industry"],
            ["100+", "Projects", "delivered"],
            ["60+", "Clients", "worked with"],
            ["5+", "Industries", "served"],
          ].map((stat, index) => (

            <div
              className={`experience-card tilt-card reveal delay-${index}`}
              key={stat[1]}
            >

              <span className="experience-index">
                0{index + 1}
              </span>

              <strong>
                {stat[0]}
              </strong>

              <h3>
                {stat[1]}
              </h3>

              <p>
                {stat[2]}
              </p>

            </div>

          ))}

        </div>

      </section>


      {/* ================= REVIEWS ================= */}

      <section id="reviews" className="reviews section">

        <div className="reviews-header reveal">

          <div>

            <div className="section-label">
              <span></span>
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
              className={`review-card tilt-card reveal delay-${index}`}
              key={review.name}
            >

              <div className="quote">
                “
              </div>

              <p>
                {review.quote}
              </p>

              <div className="review-footer">

                <div className="review-avatar">
                  {review.name.charAt(0)}
                </div>

                <div>
                  <strong>
                    {review.name}
                  </strong>

                  <span>
                    {review.role}
                  </span>
                </div>

                <div className="stars">
                  ★★★★★
                </div>

              </div>

            </article>

          ))}

        </div>

      </section>


      {/* ================= CONTACT ================= */}

      <section id="contact" className="contact">

        <div className="contact-image"></div>

        <div className="contact-red-light"></div>

        <div className="contact-inner">

          <div className="contact-main reveal">

            <div className="section-label light">
              <span></span>
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
              reel or content idea?
              <br />
              Tell us what you're thinking.
            </p>

            <a
              className="whatsapp-btn magnetic"
              href="https://wa.me/919000012345?text=Hi%20One%20More%20Take%2C%20I%20would%20like%20to%20discuss%20a%20project."
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
                  hello@onemoretake.in
                </p>
              </div>

            </div>


            <div className="contact-item">

              <span>◔</span>

              <div>
                <small>PHONE</small>
                <p>
                  +91 90000 12345
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

        </div>


        <div className="contact-script">
          Ideas.
          <br />
          People.
          <br />
          Stories.
        </div>

      </section>


      {/* ================= FOOTER ================= */}

      <footer>

        <div className="footer-logo">

          <span className="logo-mark">
            <i></i>
          </span>

          ONE MORE TAKE

        </div>

        <div className="footer-nav">

          <button onClick={() => scrollTo("home")}>
            Home
          </button>

          <button onClick={() => scrollTo("about")}>
            About
          </button>

          <button onClick={() => scrollTo("work")}>
            Work
          </button>

          <button onClick={() => scrollTo("services")}>
            Services
          </button>

          <button onClick={() => scrollTo("contact")}>
            Contact
          </button>

        </div>

        <div className="footer-social">

          <a href="#" aria-label="Instagram">
            IG
          </a>

          <a href="#" aria-label="YouTube">
            YT
          </a>

          <a href="#" aria-label="LinkedIn">
            IN
          </a>

        </div>

      </footer>

    </div>
  );
}

export default App;