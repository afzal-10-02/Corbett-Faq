import { useState } from "react";
import "./faq.css";

const faqs = [
    {
        id: "1",
        question: "What is Corbett House in the IITM BS Degree Programme?",
        answer:
            "Corbett House is an active student community within the IIT Madras BS Degree Programme. Embodying the spirit of the tiger, we foster academic excellence, leadership, inclusivity, and peer learning across our student network.",

        published: true,
        created_at: "2026-10-20"
    },
    {
        id : "2",
        question: "How do I use and access the new platform features?",
        answer: " All new features—including the Project Showcase, Peer Mentorship portal, and Resource Vault—are available directly from the navigation header. Simply log in using your official student credentials code@ds.study.iitm.ac.in",
        published: true,
        created_at: "2026-10-20"
    },
    {
        id : "3",
        question: "Are these tools and resources free for students?",
        answer:
            "Yes! All community features, study materials, project hubs, and peer mentorship initiatives provided on the Corbett House platform are 100% free for all active IITM BS students.",
        published: true,
        created_at: "2026-10-20"
    },
    {
        id : "4",
        question: "How can I contribute my projects or study guides?",
        answer:
            'You can submit your open-source projects or study notes by clicking the "Submit Project / Resource" button in the member portal or by posting in our official discussion forums.',
        published: true,
        created_at: "2026-10-20"
    },
    {
        id : "5",
        question: "Who do I contact for website feedback or bug reports?",
        answer:"For technical website issues or suggestion reports, email our Web Head Swarnabha Banerjee at corbett-webad@ds.study.iitm.ac.in or reach out to Secretary Yash Pandey at corbett-sec@ds.study.iitm.ac.in",
        published: true,
        created_at: "2026-10-20"
    },
];

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState(null);

  const toggleFAQ = (index) => {
    setOpenIndex((currentIndex) =>
      currentIndex === index ? null : index
    );
  };

  return (
    <section id="faq" className="corbett-faq-section">
      {/* Background glow */}
      <div className="corbett-faq-glow"></div>

      <div className="corbett-faq-container">
        {/* Header */}
        <div className="corbett-faq-header">
          <h2>
            Frequently Asked <span>Questions</span>
          </h2>

          <p>
            Find quick answers about Corbett House, our new portal features,
            peer resources, and student council support.
          </p>
        </div>

        {/* FAQ List */}
        <div className="corbett-faq-list">
          {faqs.map((faq, index) => {
            const isOpen = openIndex === index;

            return (
              <div
                key={index}
                className={`corbett-faq-item ${
                  isOpen ? "active" : ""
                }`}
              >
                <button
                  type="button"
                  className="corbett-faq-question"
                  onClick={() => toggleFAQ(index)}
                  aria-expanded={isOpen}
                >
                  <span>{faq.question}</span>

                  <svg
                    className={`faq-icon ${
                      isOpen ? "open" : ""
                    }`}
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M19 9l-7 7-7-7"
                    />
                  </svg>
                </button>

                <div
                  className={`corbett-faq-answer ${
                    isOpen ? "open" : ""
                  }`}
                >
                  <p>{faq.answer}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}