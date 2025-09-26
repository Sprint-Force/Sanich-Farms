import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { FiHome, FiChevronRight, FiHelpCircle, FiChevronDown, FiChevronUp, FiPhone, FiMail, FiMessageCircle, FiStar } from 'react-icons/fi';

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
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100">
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

      <div className="max-w-6xl mx-auto px-3 xs:px-4 sm:px-6 lg:px-8 py-4 xs:py-5 sm:py-6 lg:py-8">
        {/* Header Section */}
        <div className="text-center mb-6 xs:mb-7 sm:mb-8">
          <div className="flex items-center justify-center gap-1.5 xs:gap-2 sm:gap-3 mb-3 xs:mb-4">
            <div className="w-8 h-8 xs:w-9 xs:h-9 sm:w-10 sm:h-10 bg-green-100 rounded-full flex items-center justify-center shadow-sm">
              <FiHelpCircle className="w-4 h-4 xs:w-5 xs:h-5 sm:w-6 sm:h-6 text-green-600" />
            </div>
            <h1 className="text-lg xs:text-xl sm:text-2xl md:text-3xl font-bold text-gray-900 leading-tight">
              Frequently Asked Questions
            </h1>
          </div>
          <p className="text-gray-600 text-sm xs:text-base leading-relaxed max-w-2xl mx-auto px-2">
            Find answers to common questions about our products and services
          </p>
        </div>

          <div className="grid gap-3 xs:gap-4 sm:gap-5">
          {faqData.map((category) => (
            <div key={category.id} className="bg-white rounded-xl xs:rounded-2xl shadow-lg border border-gray-100 overflow-hidden hover:shadow-xl transition-all duration-300">
              {/* Category Header */}
              <div className="bg-gradient-to-r from-green-50 to-green-100 px-4 xs:px-5 sm:px-6 py-3 xs:py-4 border-b border-green-200">
                <h2 className="text-base xs:text-lg sm:text-xl font-bold text-gray-900 flex items-center gap-2 xs:gap-3">
                  <div className="w-5 h-5 xs:w-6 xs:h-6 bg-green-200 rounded-lg flex items-center justify-center">
                    <FiStar className="w-3 h-3 xs:w-4 xs:h-4 text-green-700" />
                  </div>
                  <span className="text-gray-800 flex-1 min-w-0">{category.category}</span>
                  <span className="bg-green-200 text-green-800 px-2 xs:px-3 py-1 rounded-full text-xs xs:text-sm font-semibold flex-shrink-0">
                    {category.questions.length}
                  </span>
                </h2>
              </div>
              
              {/* Questions */}
              <div className="divide-y divide-gray-100">
                {category.questions.map((faq, index) => {
                  const isOpen = openFAQ === `${category.id}-${index}`;
                  return (
                    <div key={index} className="group">
                      <button
                        onClick={() => toggleFAQ(category.id, index)}
                        className="w-full text-left px-4 xs:px-5 sm:px-6 py-3 xs:py-4 hover:bg-gray-50 transition-all duration-200 focus:outline-none focus:bg-gray-50 focus:ring-2 focus:ring-green-500 focus:ring-inset"
                      >
                        <div className="flex items-start justify-between gap-3 xs:gap-4">
                          <h3 className="text-sm xs:text-base sm:text-lg font-semibold text-gray-900 group-hover:text-green-600 transition-colors duration-200 leading-relaxed flex-1 min-w-0 pr-2">
                            {faq.question}
                          </h3>
                          <div className="flex-shrink-0 mt-1">
                            <div className={`w-7 h-7 xs:w-8 xs:h-8 rounded-full flex items-center justify-center transition-all duration-200 ${
                              isOpen 
                                ? 'bg-green-100' 
                                : 'bg-gray-100 group-hover:bg-green-50'
                            }`}>
                              {isOpen ? (
                                <FiChevronUp className="w-4 h-4 text-green-600" />
                              ) : (
                                <FiChevronDown className="w-4 h-4 text-gray-500 group-hover:text-green-600 transition-colors duration-200" />
                              )}
                            </div>
                          </div>
                        </div>
                      </button>
                      
                      {isOpen && (
                        <div className="px-4 xs:px-5 sm:px-6 pb-3 xs:pb-4 transform transition-all duration-300 ease-out animate-in slide-in-from-top-2">
                          <div className="bg-blue-50 p-3 xs:p-4 rounded-lg xs:rounded-xl border border-blue-200 shadow-sm">
                            <p className="text-gray-700 text-sm xs:text-base leading-relaxed">
                              {faq.answer}
                            </p>
                          </div>
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
        <div className="mt-8 xs:mt-10 bg-white rounded-xl xs:rounded-2xl shadow-lg border border-gray-100 overflow-hidden">
          <div className="bg-gradient-to-r from-blue-50 to-blue-100 px-4 xs:px-6 sm:px-8 py-5 xs:py-6 text-center border-b border-blue-200">
            <div className="w-10 h-10 xs:w-12 xs:h-12 bg-blue-600 rounded-full flex items-center justify-center mx-auto mb-3 xs:mb-4 shadow-lg">
              <FiMessageCircle className="w-5 h-5 xs:w-6 xs:h-6 text-white" />
            </div>
            <h2 className="text-lg xs:text-xl sm:text-2xl font-bold text-gray-900 mb-2">
              Still have questions?
            </h2>
            <p className="text-gray-600 text-sm xs:text-base leading-relaxed max-w-2xl mx-auto">
              Can't find the answer you're looking for? Our friendly team is here to help you.
            </p>
          </div>
          
          <div className="p-4 xs:p-6">
            <div className="grid grid-cols-1 xs:grid-cols-2 lg:grid-cols-3 gap-3 xs:gap-4 max-w-4xl mx-auto">
              <Link
                to="/contact"
                className="bg-gradient-to-r from-green-600 to-green-700 text-white px-4 xs:px-6 py-3 xs:py-4 rounded-lg xs:rounded-xl font-semibold hover:from-green-700 hover:to-green-800 active:scale-95 transform transition-all duration-200 shadow-md hover:shadow-lg text-sm xs:text-base text-center flex items-center justify-center gap-2 min-h-[44px] xs:min-h-[48px] focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2"
              >
                <FiMail className="w-4 h-4 xs:w-5 xs:h-5 flex-shrink-0" />
                <span className="hidden xs:inline">Contact Us</span>
                <span className="xs:hidden">Contact</span>
              </Link>
              
              <a
                href="tel:0243826137"
                className="bg-gradient-to-r from-blue-600 to-blue-700 text-white px-4 xs:px-6 py-3 xs:py-4 rounded-lg xs:rounded-xl font-semibold hover:from-blue-700 hover:to-blue-800 active:scale-95 transform transition-all duration-200 shadow-md hover:shadow-lg text-sm xs:text-base text-center flex items-center justify-center gap-2 min-h-[44px] xs:min-h-[48px] focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
              >
                <FiPhone className="w-4 h-4 xs:w-5 xs:h-5 flex-shrink-0" />
                <span className="hidden sm:inline">Call: 0243826137</span>
                <span className="sm:hidden">Call Us</span>
              </a>
              
              <a
                href="mailto:Sanichfarms@gmail.com"
                className="bg-gradient-to-r from-yellow-500 to-yellow-600 text-white px-4 xs:px-6 py-3 xs:py-4 rounded-lg xs:rounded-xl font-semibold hover:from-yellow-600 hover:to-yellow-700 active:scale-95 transform transition-all duration-200 shadow-md hover:shadow-lg text-sm xs:text-base text-center flex items-center justify-center gap-2 min-h-[44px] xs:min-h-[48px] xs:col-span-2 lg:col-span-1 focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:ring-offset-2"
              >
                <FiMail className="w-4 h-4 xs:w-5 xs:h-5 flex-shrink-0" />
                <span className="hidden xs:inline">Email Support</span>
                <span className="xs:hidden">Email</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FAQPage;
