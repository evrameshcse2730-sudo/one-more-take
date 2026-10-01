import React, { useMemo, useState } from "react";
import html2canvas from "html2canvas";
import { jsPDF } from "jspdf";
import "./Quotation.css";

const LOGO = "/One More Take Logo.png";

// Replace with your actual One More Take WhatsApp number
const OWNER_WHATSAPP = "919000012345";

const PRICING = {
  "Promotional Shoot": [
    {
      name: "Product Promotional Video",
      actual: 20000,
      discount: 15000,
    },
    {
      name: "Brand Promotional Video",
      actual: 30000,
      discount: 25000,
    },
    {
      name: "Large Campaign / Custom Shoot",
      negotiate: true,
    },
  ],

  "Social Reels": [
    {
      name: "30 Seconds Reel",
      actual: 2500,
      discount: 1999,
    },
    {
      name: "60 Seconds Reel",
      actual: 4000,
      discount: 2999,
    },
    {
      name: "Bulk / Monthly Reels",
      negotiate: true,
    },
  ],

  Events: [
    {
      name: "2 Hours Coverage",
      actual: 12000,
      discount: 10000,
    },
    {
      name: "4 Hours Coverage",
      actual: 22000,
      discount: 18000,
    },
    {
      name: "Full Day / Large Event",
      negotiate: true,
    },
  ],

  Podcasts: [
    {
      name: "Single Episode",
      actual: 10000,
      discount: 8000,
    },
    {
      name: "4 Episode Package",
      actual: 32000,
      discount: 28000,
    },
    {
      name: "Monthly / Multi-Camera Podcast",
      negotiate: true,
    },
  ],

  "Video Editing": [
    {
      name: "Short-form Editing",
      actual: 2500,
      discount: 2000,
    },
    {
      name: "Standard Video Editing",
      actual: 6000,
      discount: 5000,
    },
    {
      name: "Advanced / Custom Editing",
      negotiate: true,
    },
  ],
};

const formatCurrency = (value) => {
  return `₹${Number(value || 0).toLocaleString("en-IN")}`;
};

const getToday = () => {
  const date = new Date();

  return date.toLocaleDateString("en-IN", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
};

function Quotation() {
  const [preparedBy, setPreparedBy] = useState("");

  const [client, setClient] = useState({
    name: "",
    company: "",
    whatsapp: "",
    email: "",
  });

  const [selectedService, setSelectedService] = useState("");
  const [selectedType, setSelectedType] = useState(null);

  const [quantity, setQuantity] = useState(1);

  const [quotationItems, setQuotationItems] = useState([]);

  const [projectDetails, setProjectDetails] = useState("");

  const [gstEnabled, setGstEnabled] = useState(false);

  const [quotationNumber, setQuotationNumber] = useState("");

  const [generated, setGenerated] = useState(false);

  const serviceTypes = selectedService
    ? PRICING[selectedService]
    : [];

  const actualTotal = useMemo(() => {
    return quotationItems.reduce((sum, item) => {
      if (item.negotiate) return sum;

      return sum + item.actual * item.quantity;
    }, 0);
  }, [quotationItems]);

  const subtotal = useMemo(() => {
    return quotationItems.reduce((sum, item) => {
      if (item.negotiate) return sum;

      return sum + item.discount * item.quantity;
    }, 0);
  }, [quotationItems]);

  const savings = actualTotal - subtotal;

  const gstAmount = gstEnabled ? subtotal * 0.18 : 0;

  const grandTotal = subtotal + gstAmount;

  const handlePreparedBy = (role) => {
    setPreparedBy(role);

    setSelectedService("");
    setSelectedType(null);
    setQuotationItems([]);
    setProjectDetails("");
    setGenerated(false);
  };

  const handleClientChange = (e) => {
    const { name, value } = e.target;

    setClient((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleServiceSelect = (service) => {
    setSelectedService(service);
    setSelectedType(null);
    setQuantity(1);
  };

  const handleTypeSelect = (type) => {
    setSelectedType(type);
    setQuantity(1);
  };

  const addToQuotation = () => {
    if (!selectedType) return;

    const existingIndex = quotationItems.findIndex(
      (item) =>
        item.service === selectedService &&
        item.name === selectedType.name
    );

    if (existingIndex !== -1) {
      const updated = [...quotationItems];

      updated[existingIndex].quantity += Number(quantity);

      setQuotationItems(updated);
    } else {
      setQuotationItems([
        ...quotationItems,
        {
          service: selectedService,
          name: selectedType.name,
          actual: selectedType.actual || 0,
          discount: selectedType.discount || 0,
          quantity: Number(quantity),
          negotiate: !!selectedType.negotiate,
        },
      ]);
    }

    setSelectedType(null);
    setQuantity(1);
  };

  const updateItemQuantity = (index, value) => {
    const updated = [...quotationItems];

    updated[index].quantity = Math.max(1, Number(value));

    setQuotationItems(updated);
  };

  const removeItem = (index) => {
    setQuotationItems(
      quotationItems.filter((_, itemIndex) => itemIndex !== index)
    );
  };

  const generateQuotation = () => {
    if (!preparedBy) {
      alert("Please select Client or Owner.");
      return;
    }

    if (!client.name.trim()) {
      alert("Please enter the client name.");
      return;
    }

    if (quotationItems.length === 0) {
      alert("Please add at least one service.");
      return;
    }

    const number = `OMT-${Date.now().toString().slice(-6)}`;

    setQuotationNumber(number);
    setGenerated(true);

    setTimeout(() => {
      document
        .getElementById("quotation-preview")
        ?.scrollIntoView({
          behavior: "smooth",
          block: "start",
        });
    }, 100);
  };

  const downloadPDF = async () => {
    const element = document.getElementById("quotation-pdf");

    if (!element) return;

    const canvas = await html2canvas(element, {
      scale: 2,
      backgroundColor: "#ffffff",
      useCORS: true,
    });

    const imgData = canvas.toDataURL("image/png");

    const pdf = new jsPDF("p", "mm", "a4");

    const pdfWidth = 210;
    const pdfHeight = 297;

    const imgWidth = pdfWidth;
    const imgHeight =
      (canvas.height * imgWidth) / canvas.width;

    let heightLeft = imgHeight;
    let position = 0;

    pdf.addImage(
      imgData,
      "PNG",
      0,
      position,
      imgWidth,
      imgHeight
    );

    heightLeft -= pdfHeight;

    while (heightLeft > 0) {
      position -= pdfHeight;

      pdf.addPage();

      pdf.addImage(
        imgData,
        "PNG",
        0,
        position,
        imgWidth,
        imgHeight
      );

      heightLeft -= pdfHeight;
    }

    pdf.save(
      `${quotationNumber || "One-More-Take-Quotation"}.pdf`
    );
  };

  const sendWhatsApp = () => {
    const destination =
      preparedBy === "client"
        ? OWNER_WHATSAPP
        : client.whatsapp;

    if (!destination) {
      alert(
        preparedBy === "client"
          ? "Please configure the owner WhatsApp number."
          : "Please enter client WhatsApp number."
      );

      return;
    }

    const serviceText = quotationItems
      .map((item) => {
        const price = item.negotiate
          ? "Negotiable"
          : formatCurrency(item.discount);

        return `${item.service} - ${item.name} x${item.quantity} - ${price}`;
      })
      .join("\n");

    const message = `
ONE MORE TAKE
QUOTATION

Quotation No: ${quotationNumber}

Prepared By:
${preparedBy === "client" ? "Client" : "Owner"}

Client:
${client.name}

Company:
${client.company || "-"}

Services:
${serviceText}

Subtotal:
${formatCurrency(subtotal)}

GST:
${formatCurrency(gstAmount)}

Grand Total:
${formatCurrency(grandTotal)}

Project Details:
${projectDetails || "-"}

Please find the quotation details above.
    `.trim();

    const url = `https://wa.me/${destination}?text=${encodeURIComponent(
      message
    )}`;

    window.open(url, "_blank");
  };

  return (
    <section className="omt-quotation-section">

      <div className="omt-quotation-container">

        {/* HEADER */}

        <div className="omt-quotation-header">

          <div>
            <span className="omt-eyebrow">
              ONE MORE TAKE
            </span>

            <h2>
              GET A
              <span> QUOTATION.</span>
            </h2>

            <p>
              Build your project quotation
              in a few simple steps.
            </p>
          </div>

          <div className="omt-quotation-number-top">
            QUOTATION
            <strong>
              {quotationNumber || "DRAFT"}
            </strong>
          </div>

        </div>


        {/* ROLE */}

        <div className="omt-quote-card">

          <div className="omt-step-title">

            <span>01</span>

            <div>
              <small>START HERE</small>

              <h3>
                Who is preparing
                this quotation?
              </h3>
            </div>

          </div>


          <div className="omt-prepared-options">

            {/* MAIN CLIENT OPTION */}

            <button
              type="button"
              className={
                preparedBy === "client"
                  ? "omt-client-main active"
                  : "omt-client-main"
              }
              onClick={() =>
                handlePreparedBy("client")
              }
            >

              <div className="omt-client-main-content">

                <span>01</span>

                <strong>
                  I AM THE CLIENT
                </strong>

                <small>
                  Prepare a quotation and
                  send it to One More Take.
                </small>

              </div>

              <b>→</b>

            </button>


            {/* SMALL OWNER OPTION */}

            <button
              type="button"
              className={
                preparedBy === "owner"
                  ? "omt-owner-small active"
                  : "omt-owner-small"
              }
              onClick={() =>
                handlePreparedBy("owner")
              }
            >

              <span>Owner?</span>

              <b>→</b>

            </button>

          </div>

        </div>


        {preparedBy && (
          <>

            {/* CLIENT DETAILS */}

            <div className="omt-quote-card">

              <div className="omt-step-title">

                <span>02</span>

                <div>

                  <small>
                    {preparedBy === "client"
                      ? "YOUR DETAILS"
                      : "CLIENT DETAILS"}
                  </small>

                  <h3>
                    {preparedBy === "client"
                      ? "Tell us about yourself."
                      : "Who is this quotation for?"}
                  </h3>

                </div>

              </div>


              <div className="omt-form-grid">

                <div className="omt-input-group">

                  <label>
                    Name *
                  </label>

                  <input
                    type="text"
                    name="name"
                    placeholder="Enter name"
                    value={client.name}
                    onChange={handleClientChange}
                  />

                </div>


                <div className="omt-input-group">

                  <label>
                    Company
                  </label>

                  <input
                    type="text"
                    name="company"
                    placeholder="Company / Brand"
                    value={client.company}
                    onChange={handleClientChange}
                  />

                </div>


                <div className="omt-input-group">

                  <label>
                    WhatsApp
                  </label>

                  <input
                    type="tel"
                    name="whatsapp"
                    placeholder="+91 XXXXX XXXXX"
                    value={client.whatsapp}
                    onChange={handleClientChange}
                  />

                </div>


                <div className="omt-input-group">

                  <label>
                    Email
                  </label>

                  <input
                    type="email"
                    name="email"
                    placeholder="you@example.com"
                    value={client.email}
                    onChange={handleClientChange}
                  />

                </div>

              </div>

            </div>


            {/* SERVICES */}

            <div className="omt-quote-card">

              <div className="omt-step-title">

                <span>03</span>

                <div>

                  <small>
                    SELECT SERVICE
                  </small>

                  <h3>
                    What do you need?
                  </h3>

                </div>

              </div>


              <div className="omt-service-grid">

                {Object.keys(PRICING).map(
                  (service, index) => (

                    <button
                      type="button"
                      key={service}
                      className={
                        selectedService === service
                          ? "omt-service-box active"
                          : "omt-service-box"
                      }
                      onClick={() =>
                        handleServiceSelect(service)
                      }
                    >

                      <span>
                        0{index + 1}
                      </span>

                      <strong>
                        {service}
                      </strong>

                      <b>↗</b>

                    </button>

                  )
                )}

              </div>


              {/* TYPES */}

              {selectedService && (

                <div className="omt-type-area">

                  <div className="omt-subheading">

                    <span>
                      {selectedService}
                    </span>

                    <small>
                      SELECT A TYPE
                    </small>

                  </div>


                  <div className="omt-type-grid">

                    {serviceTypes.map(
                      (type, index) => (

                        <button
                          type="button"
                          key={type.name}
                          className={
                            selectedType?.name ===
                            type.name
                              ? "omt-type-box active"
                              : "omt-type-box"
                          }
                          onClick={() =>
                            handleTypeSelect(type)
                          }
                        >

                          <span>
                            0{index + 1}
                          </span>

                          <strong>
                            {type.name}
                          </strong>

                          {type.negotiate ? (
                            <em>
                              Connect to Negotiate
                            </em>
                          ) : (
                            <div className="omt-mini-price">

                              <del>
                                {formatCurrency(
                                  type.actual
                                )}
                              </del>

                              <b>
                                {formatCurrency(
                                  type.discount
                                )}
                              </b>

                            </div>
                          )}

                        </button>

                      )
                    )}

                  </div>


                  {/* SELECTED TYPE */}

                  {selectedType && (

                    <div className="omt-selected-type">

                      <div className="omt-selected-type-info">

                        <small>
                          SELECTED
                        </small>

                        <h4>
                          {selectedType.name}
                        </h4>

                      </div>


                      {selectedType.negotiate ? (

                        <div className="omt-negotiate-box">

                          <strong>
                            CONNECT TO NEGOTIATE
                          </strong>

                          <span>
                            Final pricing depends
                            on your project scope.
                          </span>

                        </div>

                      ) : (

                        <div className="omt-price-detail">

                          <div>

                            <small>
                              ACTUAL PRICE
                            </small>

                            <del>
                              {formatCurrency(
                                selectedType.actual
                              )}
                            </del>

                          </div>


                          <div>

                            <small>
                              DISCOUNT PRICE
                            </small>

                            <strong>
                              {formatCurrency(
                                selectedType.discount
                              )}
                            </strong>

                          </div>

                        </div>

                      )}


                      <div className="omt-quantity">

                        <label>
                          QTY
                        </label>

                        <input
                          type="number"
                          min="1"
                          value={quantity}
                          onChange={(e) =>
                            setQuantity(
                              Math.max(
                                1,
                                Number(e.target.value)
                              )
                            )
                          }
                        />

                      </div>


                      <button
                        type="button"
                        className="omt-add-btn"
                        onClick={addToQuotation}
                      >
                        ADD TO QUOTATION →
                      </button>

                    </div>

                  )}

                </div>

              )}

            </div>


            {/* QUOTATION CART */}

            {quotationItems.length > 0 && (

              <div className="omt-quote-card">

                <div className="omt-step-title">

                  <span>04</span>

                  <div>

                    <small>
                      YOUR QUOTATION
                    </small>

                    <h3>
                      Selected services.
                    </h3>

                  </div>

                </div>


                <div className="omt-cart">

                  {quotationItems.map(
                    (item, index) => (

                      <div
                        className="omt-cart-row"
                        key={`${item.name}-${index}`}
                      >

                        <div className="omt-cart-main">

                          <small>
                            {item.service}
                          </small>

                          <strong>
                            {item.name}
                          </strong>

                        </div>


                        <div className="omt-cart-price">

                          {item.negotiate ? (
                            <strong>
                              Negotiable
                            </strong>
                          ) : (
                            <>
                              <del>
                                {formatCurrency(
                                  item.actual
                                )}
                              </del>

                              <strong>
                                {formatCurrency(
                                  item.discount
                                )}
                              </strong>
                            </>
                          )}

                        </div>


                        <input
                          className="omt-cart-qty"
                          type="number"
                          min="1"
                          value={item.quantity}
                          onChange={(e) =>
                            updateItemQuantity(
                              index,
                              e.target.value
                            )
                          }
                        />


                        <button
                          type="button"
                          className="omt-remove-btn"
                          onClick={() =>
                            removeItem(index)
                          }
                        >
                          ×
                        </button>

                      </div>

                    )
                  )}

                </div>


                <div className="omt-project-area">

                  <label>
                    PROJECT DETAILS
                  </label>

                  <textarea
                    placeholder="Tell us about your project, shoot requirements, number of videos, duration, location, deadline, etc."
                    value={projectDetails}
                    onChange={(e) =>
                      setProjectDetails(
                        e.target.value
                      )
                    }
                  />

                </div>


                <div className="omt-bottom-controls">

                  <label className="omt-gst-toggle">

                    <input
                      type="checkbox"
                      checked={gstEnabled}
                      onChange={(e) =>
                        setGstEnabled(
                          e.target.checked
                        )
                      }
                    />

                    <span>
                      Add GST 18%
                    </span>

                  </label>


                  <div className="omt-live-total">

                    <small>
                      ESTIMATED TOTAL
                    </small>

                    <strong>
                      {formatCurrency(
                        grandTotal
                      )}
                    </strong>

                  </div>

                </div>


                <button
                  type="button"
                  className="omt-generate-btn"
                  onClick={generateQuotation}
                >
                  GENERATE QUOTATION
                  <span>→</span>
                </button>

              </div>

            )}

          </>
        )}


        {/* PREVIEW */}

        {generated && (

          <div
            id="quotation-preview"
            className="omt-preview-section"
          >

            <div className="omt-preview-heading">

              <span>
                05 / FINAL QUOTATION
              </span>

              <h3>
                Your quotation is ready.
              </h3>

            </div>


            <div
              id="quotation-pdf"
              className="omt-pdf"
            >

              <div className="omt-pdf-header">

                <img
                  src={LOGO}
                  alt="One More Take"
                />

                <div>

                  <span>
                    QUOTATION
                  </span>

                  <strong>
                    {quotationNumber}
                  </strong>

                  <small>
                    {getToday()}
                  </small>

                </div>

              </div>


              <div className="omt-pdf-line" />


              <div className="omt-pdf-meta">

                <div>

                  <small>
                    PREPARED BY
                  </small>

                  <strong>
                    {preparedBy === "client"
                      ? "CLIENT"
                      : "ONE MORE TAKE"}
                  </strong>

                </div>


                <div>

                  <small>
                    PREPARED FOR
                  </small>

                  <strong>
                    {client.name}
                  </strong>

                </div>


                <div>

                  <small>
                    COMPANY
                  </small>

                  <strong>
                    {client.company || "-"}
                  </strong>

                </div>


                <div>

                  <small>
                    CONTACT
                  </small>

                  <strong>
                    {client.whatsapp ||
                      client.email ||
                      "-"}
                  </strong>

                </div>

              </div>


              {projectDetails && (

                <div className="omt-pdf-project">

                  <small>
                    PROJECT DETAILS
                  </small>

                  <p>
                    {projectDetails}
                  </p>

                </div>

              )}


              <table className="omt-pdf-table">

                <thead>

                  <tr>

                    <th>
                      SERVICE / TYPE
                    </th>

                    <th>
                      ACTUAL
                    </th>

                    <th>
                      DISCOUNT
                    </th>

                    <th>
                      QTY
                    </th>

                    <th>
                      TOTAL
                    </th>

                  </tr>

                </thead>


                <tbody>

                  {quotationItems.map(
                    (item, index) => (

                      <tr key={index}>

                        <td>

                          <span>
                            {item.service}
                          </span>

                          <strong>
                            {item.name}
                          </strong>

                        </td>

                        <td>

                          {item.negotiate
                            ? "—"
                            : formatCurrency(
                                item.actual
                              )}

                        </td>

                        <td>

                          {item.negotiate
                            ? "Negotiable"
                            : formatCurrency(
                                item.discount
                              )}

                        </td>

                        <td>
                          {item.quantity}
                        </td>

                        <td>

                          {item.negotiate
                            ? "Negotiable"
                            : formatCurrency(
                                item.discount *
                                  item.quantity
                              )}

                        </td>

                      </tr>

                    )
                  )}

                </tbody>

              </table>


              <div className="omt-pdf-summary">

                <div>

                  <span>
                    ACTUAL VALUE
                  </span>

                  <strong>
                    {formatCurrency(
                      actualTotal
                    )}
                  </strong>

                </div>


                <div>

                  <span>
                    DISCOUNT
                  </span>

                  <strong>
                    {formatCurrency(
                      savings
                    )}
                  </strong>

                </div>


                <div>

                  <span>
                    SUBTOTAL
                  </span>

                  <strong>
                    {formatCurrency(
                      subtotal
                    )}
                  </strong>

                </div>


                <div>

                  <span>
                    GST 18%
                  </span>

                  <strong>
                    {formatCurrency(
                      gstAmount
                    )}
                  </strong>

                </div>


                <div className="omt-grand-total">

                  <span>
                    GRAND TOTAL
                  </span>

                  <strong>
                    {formatCurrency(
                      grandTotal
                    )}
                  </strong>

                </div>

              </div>


              <div className="omt-pdf-terms">

  <div className="omt-pdf-terms-title">
    <span>06</span>
    <strong>TERMS & CONDITIONS</strong>
  </div>

  <div className="omt-terms-section">

    <h4>PROJECT & DELIVERY</h4>

    <ul>
      <li>
        Production will begin only after the required
        content brief and brand assets are received.
      </li>

      <li>
        Delivery schedule will be mutually agreed based
        on the approved project or monthly content calendar.
      </li>

      <li>
        Final deliverables will be provided according
        to the selected services and agreed scope.
      </li>
    </ul>

  </div>


  <div className="omt-terms-section">

    <h4>PAYMENT TERMS</h4>

    <ul>
      <li>
        30%–50% advance payment is required before
        production begins.
      </li>

      <li>
        The remaining balance is payable according
        to the agreed delivery schedule.
      </li>

      <li>
        Production will commence only after the
        applicable advance payment is received.
      </li>
    </ul>

  </div>


  <div className="omt-terms-section">

    <h4>REVISIONS</h4>

    <ul>
      <li>
        Up to 2 revision rounds are included where
        mentioned in the selected service scope.
      </li>

      <li>
        Additional revisions or changes beyond the
        approved scope may be charged separately.
      </li>
    </ul>

  </div>


  <div className="omt-terms-section">

    <h4>NOT INCLUDED</h4>

    <ul>
      <li>
        Physical shoot, on-location production,
        camera, lighting or recording crew unless
        specifically included in the quotation.
      </li>

      <li>
        Travel and location expenses are not included
        unless specifically mentioned.
      </li>

      <li>
        Advanced 3D/VFX production will be quoted
        separately where required.
      </li>

      <li>
        Paid stock footage, premium AI credits or
        third-party assets required specifically for
        the project may be charged separately.
      </li>
    </ul>

  </div>


  <div className="omt-terms-section">

    <h4>QUOTATION VALIDITY</h4>

    <ul>
      <li>
        This quotation is valid for 15 days from the
        quotation date.
      </li>

      <li>
        Final pricing may vary if the project scope,
        quantity or requirements change.
      </li>
    </ul>

  </div>


  <div className="omt-pdf-approval">

    <div>
      <span>CLIENT NAME</span>
      <strong>
        {client.name || "________________"}
      </strong>
    </div>

    <div>
      <span>AUTHORIZED SIGNATURE</span>
      <strong>
        __________________________
      </strong>
    </div>

    <div>
      <span>DATE</span>
      <strong>
        __________________
      </strong>
    </div>

    <div>
      <span>APPROVAL</span>
      <strong>
        __________________
      </strong>
    </div>

  </div>

</div>


              <div className="omt-pdf-footer">

                <strong>
                  ONE MORE TAKE
                </strong>

                <span>
                  CAMERA • EDITING • CONTENT
                </span>

              </div>

            </div>


            <div className="omt-preview-actions">

              <button
                type="button"
                onClick={downloadPDF}
                className="omt-download-btn"
              >
                ↓ DOWNLOAD PDF
              </button>


              <button
                type="button"
                onClick={sendWhatsApp}
                className="omt-whatsapp-btn"
              >
                SEND TO{" "}
                {preparedBy === "client"
                  ? "OWNER"
                  : "CLIENT"}{" "}
                →
              </button>

            </div>

          </div>

        )}

      </div>

    </section>
  );
}

export default Quotation;