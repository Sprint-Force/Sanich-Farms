import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { FiHome, FiChevronRight, FiHelpCircle, FiChevronDown, FiChevronUp } from 'react-icons/fi';

const FAQPage = () => {
  const [openFAQ, setOpenFAQ] = useState(null);

  const faqData = [
    {
      id: 1,
      category: "Orders & Products",
      questions: [
        {
          question: "How do I place an order?",
          answer: "You can place an order through our website by browsing our products, adding items to your cart, and proceeding to checkout. You can also call us directly at 0243826137."
        },
        {
          question: "What types of chicks do you sell?",
          answer: "We sell various breeds of poultry including broiler chicks, layer chicks, and local breeds. All our chicks are healthy, vaccinated, and sourced from reputable hatcheries."
        },
        {
          question: "Do you deliver nationwide?",
          answer: "Yes, we deliver across Ghana. Delivery fees vary by location. Free delivery is available for orders above certain amounts in selected areas."
        }
      ]
    },
    {
      id: 2,
      category: "Services",
      questions: [
        {
          question: "What consultation services do you offer?",
          answer: "We offer farm setup consultation, poultry management training, disease prevention advice, and business planning for poultry ventures."
        },
        {
          question: "How do I book a consultation?",
          answer: "You can book a consultation through our Services page, call us directly, or visit our farm location in Ejisu, Kumasi."
        },
        {
          question: "Do you install farming equipment?",
          answer: "Yes, we provide installation services for poultry houses, feeding systems, water systems, and other farming equipment."
        }
      ]
    },
    {
      id: 3,
      category: "Payment & Shipping",
      questions: [
        {
          question: "What payment methods do you accept?",
          answer: "We accept Mobile Money (MTN, Vodafone, AirtelTigo), bank transfers, and cash on delivery for eligible locations."
        },
        {
          question: "How long does delivery take?",
          answer: "Delivery times vary by location: Greater Accra (1-2 days), Ashanti Region (1-3 days), and other regions (3-5 days). Live animals require special scheduling."
        },
        {
          question: "Can I return products?",
          answer: "Feed and equipment can be returned within 7 days if unopened and in original condition. Live animals have specific health guarantees - contact us immediately if you have concerns."
        }
      ]
    },
    {
      id: 4,
      category: "Account & Support",
      questions: [
        {
          question: "How do I create an account?",
          answer: "Click 'Sign Up' on our website, provide your details, and verify your email. Having an account allows you to track orders and book services easily."
        },
        {
          question: "I forgot my password. What should I do?",
          answer: "Click 'Forgot Password' on the login page and follow the instructions. You'll receive an email with reset instructions."
        },
        {
          question: "How can I track my order?",
          answer: "Log into your account and go to 'My Orders' to track your order status. You'll also receive SMS/email updates."
        }
      ]
    }
  ];

  const toggleFAQ = (categoryId, questionIndex) => {
    const key = `${categoryId}-${questionIndex}`;
    setOpenFAQ(openFAQ === key ? null : key);
  };

  return (
    <div className="font-poppins bg-gray-50 min-h-screen">
      {/* Breadcrumbs */}
      <div className="w-full py-8 md:py-10 bg-gradient-to-r from-gray-800 to-gray-600">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center gap-2 text-white">
          <Link to="/" className="flex items-center gap-1 text-gray-300 hover:text-white transition-colors duration-200">
            <FiHome className="w-5 h-5" />
            <span className="text-base font-medium hidden sm:inline">Home</span>
          </Link>
          <FiChevronRight className="w-4 h-4 text-gray-400" />
          <span className="text-green-400 text-base font-semibold">FAQs</span>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center mb-12">
          <div className="flex items-center justify-center gap-3 mb-4">
            <FiHelpCircle className="w-8 h-8 text-green-600" />
            <h1 className="text-3xl font-bold text-gray-800">Frequently Asked Questions</h1>
          </div>
          <p className="text-gray-600 text-lg">
            Find answers to the most common questions about our products and services
          </p>
        </div>

        <div className="space-y-8">
          {faqData.map((category) => (
            <div key={category.id} className="bg-white rounded-xl shadow-md overflow-hidden">
              <div className="bg-green-50 px-6 py-4 border-b border-green-100">
                <h2 className="text-xl font-semibold text-gray-800">{category.category}</h2>
              </div>
              
              <div className="divide-y divide-gray-100">
                {category.questions.map((faq, index) => {
                  const isOpen = openFAQ === `${category.id}-${index}`;
                  return (
                    <div key={index} className="p-6">
                      <button
                        onClick={() => toggleFAQ(category.id, index)}
                        className="w-full text-left flex items-center justify-between group"
                      >
                        <h3 className="text-lg font-medium text-gray-800 group-hover:text-green-600 transition-colors">
                          {faq.question}
                        </h3>
                        {isOpen ? (
                          <FiChevronUp className="w-5 h-5 text-green-600 flex-shrink-0" />
                        ) : (
                          <FiChevronDown className="w-5 h-5 text-gray-400 flex-shrink-0" />
                        )}
                      </button>
                      
                      {isOpen && (
                        <div className="mt-4 pr-6">
                          <p className="text-gray-600 leading-relaxed">{faq.answer}</p>
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          ))}
        </div>

        {/* Contact Section */}
        <div className="mt-12 bg-white rounded-xl shadow-md p-8 text-center">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">Still have questions?</h2>
          <p className="text-gray-600 mb-6">
            Can't find the answer you're looking for? Please chat with our friendly team.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/contact"
              className="inline-flex items-center justify-center px-6 py-3 border border-transparent text-base font-medium rounded-lg text-white bg-green-600 hover:bg-green-700 transition-colors"
            >
              Contact Us
            </Link>
            <a
              href="tel:0243826137"
              className="inline-flex items-center justify-center px-6 py-3 border border-gray-300 text-base font-medium rounded-lg text-gray-700 bg-white hover:bg-gray-50 transition-colors"
            >
              Call: 0243826137
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FAQPage;
