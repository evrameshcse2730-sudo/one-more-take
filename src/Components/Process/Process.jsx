
import React from "react";
import "./Process.css";

const steps = [
  ["01", "PLAN", "Understand"],
  ["02", "SHOOT", "Capture"],
  ["03", "EDIT", "Bring it alive"],
  ["04", "COLOR", "Set the mood"],
  ["05", "DELIVER", "Make it perform"],
];

export default function Process() {
  return (
    <section className="process">
      <div className="process-bg" />

      <div className="process-inner">
        <div className="process-intro reveal">
          <div className="section-label light">
            <span />
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
            <span />
          </div>

          {steps.map((step, index) => (
            <div
              className={`process-step reveal delay-${index}`}
              key={step[0]}
            >
              <small>{step[0]}</small>

              <div className="process-card">
                <div className={`process-visual pv-${index}`}>
                  {index === 0 && (
                    <div className="paper-lines">
                      <i />
                      <i />
                      <i />
                      <i />
                    </div>
                  )}

                  {index === 1 && (
                    <div className="mini-camera">◉</div>
                  )}

                  {index === 2 && (
                    <div className="mini-edit">
                      <i />
                      <i />
                      <i />
                    </div>
                  )}

                  {index === 3 && (
                    <div className="color-wheels">
                      <i />
                      <i />
                      <i />
                    </div>
                  )}

                  {index === 4 && (
                    <div className="deliver-icon">↗</div>
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
  );
}
