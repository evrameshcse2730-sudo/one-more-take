import React, { useEffect, useState } from "react";
import "./Plans.css";

const plans = [
  {
    number: "01",
    name: "SILVER",
    title: "Content Starter",
    description: "Start creating professional and consistent content for your brand.",
    oldPrice: 14999,
    price: 9999,
    discount: "33% OFF",
    icon: "◉",
    tags: ["Planning", "Shoot", "Reels"],
    includes: [
      { title: "Content Strategy", items: ["Initial content planning", "Topic recommendations", "Content calendar"] },
      { title: "Production", items: ["Professional video shoot", "Professional photography"] },
      { title: "Content Creation", items: ["Edited Reels", "Branded visual content", "Captions / content support"] },
      { title: "Content Support", items: ["Content organization", "Publishing-ready assets"] },
    ],
    outcome: "A professional foundation for your digital presence.",
  },
  {
    number: "02",
    name: "GOLD",
    title: "Authority Builder",
    description: "Build a recognizable personal brand through consistent strategic content.",
    oldPrice: 34999,
    price: 24999,
    discount: "29% OFF",
    icon: "✦",
    tags: ["Strategy", "Content", "Brand"],
    popular: true,
    includes: [
      { title: "Strategy", items: ["Personal brand positioning", "Content pillars", "Monthly content strategy", "Topic & hook development"] },
      { title: "Production", items: ["Regular professional shoots", "Professional photography", "Multiple content formats"] },
      { title: "Content Creation", items: ["Higher-volume Reels", "Educational videos", "FAQ content", "Authority content", "Personal brand content", "Clinic / brand content"] },
      { title: "Content Management", items: ["Content calendar", "Publishing support", "Profile / content optimization", "Monthly content review"] },
    ],
    outcome: "Become more visible for what you already know.",
  },
  {
    number: "03",
    name: "PLATINUM",
    title: "Digital Authority System",
    description: "Build a complete long-term content and personal brand ecosystem.",
    oldPrice: 69999,
    price: 49999,
    discount: "29% OFF",
    icon: "◎",
    tags: ["90-Day Plan", "Long-form", "Growth"],
    includes: [
      { title: "Strategic Brand Development", items: ["Personal brand strategy", "Professional positioning", "Audience definition", "Content architecture", "90-day content roadmap"] },
      { title: "Premium Production", items: ["Structured shoot days", "Multiple video formats", "Professional photography", "Educational content", "Authority content", "Story-driven content", "Promotional content", "Long-form content"] },
      { title: "Content Operations", items: ["Content calendar", "Publishing workflow", "Content library", "Performance review", "Content optimization"] },
    ],
    outcome: "A digital presence designed as a long-term professional asset.",
  },
  {
    number: "04",
    name: "DIAMOND",
    title: "Complete Brand Partner",
    description: "One team managing your complete strategy, production and content journey.",
    oldPrice: 129999,
    price: 99999,
    discount: "23% OFF",
    icon: "◆",
    tags: ["Strategy", "Production", "Management"],
    includes: [
      { title: "Strategy", items: ["Brand positioning", "Content strategy", "90-day planning", "Campaign concepts", "Content architecture"] },
      { title: "Production", items: ["Regular professional shoots", "Photography", "Educational videos", "Brand films", "Promotional videos", "Long-form content"] },
      { title: "Content", items: ["Reels", "Short-form videos", "Educational series", "Authority series", "FAQ series", "Storytelling", "Clinic / hospital content"] },
      { title: "Management", items: ["Content calendar", "Publishing support", "Content library", "Monthly review", "Creative optimization"] },
    ],
    outcome: "One team for your complete content journey.",
  },
];

const formatPrice = (value) => `₹${Number(value).toLocaleString("en-IN")}`;

function Plans({ onGenerateQuotation }) {
  const [selectedPlan, setSelectedPlan] = useState(null);

  useEffect(() => {
    const onKeyDown = (event) => {
      if (event.key === "Escape") setSelectedPlan(null);
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, []);

  useEffect(() => {
    if (!selectedPlan) return undefined;
    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = originalOverflow;
    };
  }, [selectedPlan]);

  const handleQuotation = () => {
    if (!selectedPlan) return;
    onGenerateQuotation?.(selectedPlan);
    setSelectedPlan(null);
  };

  return (
    <>
      <section id="plans" className="plans section">
        <div className="plans-background-glow" aria-hidden="true" />
        <div className="plans-background-grid" aria-hidden="true" />

        <div className="plans-heading reveal">
          <div className="section-label light"><span />OUR PLANS</div>
          <h2>CHOOSE YOUR<br /><em>CONTENT LEVEL.</em></h2>
          <p>Start where you are. Upgrade as your brand grows.</p>
        </div>

        <div className="plans-grid">
          {plans.map((plan, index) => (
            <article
              key={plan.name}
              className={`plan-card reveal delay-${index % 4} ${plan.popular ? "plan-popular" : ""}`}
              onClick={() => setSelectedPlan(plan)}
            >
              {plan.popular && <div className="popular-badge">MOST POPULAR</div>}
              <span className="plan-number">{plan.number}</span>
              <div className="plan-icon">{plan.icon}</div>
              <h3>{plan.name}</h3>
              <strong className="plan-title">{plan.title}</strong>
              <p className="plan-description">{plan.description}</p>

              <div className="plan-price">
                <div className="plan-price-top">
                  <del>{formatPrice(plan.oldPrice)}</del>
                  <span>{plan.discount}</span>
                </div>
                <strong>{formatPrice(plan.price)}<small>/ month</small></strong>
              </div>

              <div className="plan-tags">
                {plan.tags.map((tag) => <span key={tag}>{tag}</span>)}
              </div>

              <button
                type="button"
                className="view-plan-btn"
                onClick={(event) => {
                  event.stopPropagation();
                  setSelectedPlan(plan);
                }}
              >
                VIEW PLAN <span>↗</span>
              </button>
              <div className="plan-bottom-line" aria-hidden="true" />
            </article>
          ))}
        </div>

        <div className="plans-help reveal">
          <div>
            <small>NOT SURE WHICH PLAN?</small>
            <p>Open a plan to see exactly what's included.</p>
          </div>
          <span className="plans-help-arrow">→</span>
        </div>
      </section>

      {selectedPlan && (
        <div className="plan-modal-overlay" onClick={() => setSelectedPlan(null)}>
          <div
            className="plan-modal"
            role="dialog"
            aria-modal="true"
            aria-labelledby="plan-modal-title"
            onClick={(event) => event.stopPropagation()}
          >
            <button type="button" className="plan-modal-close" onClick={() => setSelectedPlan(null)} aria-label="Close plan details">×</button>

            <div className="plan-modal-header">
              <div className="plan-modal-icon">{selectedPlan.icon}</div>
              <div>
                <span>{selectedPlan.name}</span>
                <h2 id="plan-modal-title">{selectedPlan.title}</h2>
              </div>
            </div>

            <div className="plan-modal-price">
              <div>
                <del>{formatPrice(selectedPlan.oldPrice)}</del>
                <span>{selectedPlan.discount}</span>
              </div>
              <strong>{formatPrice(selectedPlan.price)}<small>/ month</small></strong>
            </div>

            <div className="plan-modal-section-title"><span />WHAT'S INCLUDED</div>

            <div className="plan-includes-grid">
              {selectedPlan.includes.map((section) => (
                <div className="plan-include-group" key={section.title}>
                  <h3>{section.title}</h3>
                  <ul>
                    {section.items.map((item) => (
                      <li key={item}><span>✓</span>{item}</li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>

            <div className="plan-outcome">
              <small>YOUR OUTCOME</small>
              <strong>{selectedPlan.outcome}</strong>
            </div>

            <div className="plan-modal-footer">
              <div>
                <small>READY TO CONTINUE?</small>
                <p>Generate a quotation with this plan automatically selected.</p>
              </div>
              <button type="button" onClick={handleQuotation}>GENERATE QUOTATION <span>↗</span></button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default Plans;
