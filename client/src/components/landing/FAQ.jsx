import { useState } from "react";
import { ChevronDown } from "lucide-react";

const faqs = [
  {
    question: "How do I submit a complaint?",
    answer:
      "After signing in, click 'Create Complaint', fill in the required details, attach images if needed, and submit your complaint.",
  },
  {
    question: "Can I track my complaint status?",
    answer:
      "Yes. Every complaint has a live status timeline. You'll receive updates whenever an administrator changes its status.",
  },
  {
    question: "Will I receive notifications?",
    answer:
      "Absolutely. ResolveHub sends real-time notifications whenever an admin replies or updates your complaint.",
  },
  {
    question: "Can I upload multiple images?",
    answer:
      "Yes. You can upload multiple images while creating a complaint to provide better evidence.",
  },
  {
    question: "Who can view my complaints?",
    answer:
      "Only you and authorized administrators can access your complaint details.",
  },
];

const FAQ = () => {
  const [activeIndex, setActiveIndex] = useState(0);

  const toggleFAQ = (index) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  return (
    <section
      id="faq"
      className="bg-slate-50 py-24"
    >
      <div className="mx-auto max-w-4xl px-6">
        {/* Heading */}

        <div className="text-center">
          <span className="rounded-full bg-orange-100 px-4 py-2 text-sm font-semibold text-orange-600">
            FAQ
          </span>

          <h2 className="mt-6 text-4xl font-bold text-slate-900">
            Frequently Asked Questions
          </h2>

          <p className="mt-4 text-lg text-slate-600">
            Everything you need to know before getting started with
            ResolveHub.
          </p>
        </div>

        {/* FAQ Items */}

        <div className="mt-16 space-y-5">
          {faqs.map((faq, index) => (
            <div
              key={faq.question}
              className="rounded-2xl border border-slate-200 bg-white"
            >
              <button
                onClick={() => toggleFAQ(index)}
                className="flex w-full items-center justify-between px-6 py-5 text-left"
              >
                <span className="text-lg font-semibold text-slate-900">
                  {faq.question}
                </span>

                <ChevronDown
                  className={`transition-transform duration-300 ${
                    activeIndex === index ? "rotate-180" : ""
                  }`}
                />
              </button>

              {activeIndex === index && (
                <div className="border-t border-slate-100 px-6 py-5">
                  <p className="leading-7 text-slate-600">
                    {faq.answer}
                  </p>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FAQ;