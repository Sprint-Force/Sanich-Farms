import React from 'react';
import { FiUsers, FiTruck, FiAward, FiHeart } from 'react-icons/fi';

// Company statistics component for better credibility
const CompanyStats = () => {
  const stats = [
    {
      id: 1,
      icon: <FiUsers className="w-8 h-8" />,
      number: "5,000+",
      label: "Happy Customers",
      description: "Satisfied customers across Ghana"
    },
    {
      id: 2,
      icon: <FiTruck className="w-8 h-8" />,
      number: "50,000+",
      label: "Products Delivered",
      description: "Quality poultry products delivered"
    },
    {
      id: 3,
      icon: <FiAward className="w-8 h-8" />,
      number: "10+",
      label: "Years Experience",
      description: "In sustainable poultry farming"
    },
    {
      id: 4,
      icon: <FiHeart className="w-8 h-8" />,
      number: "100%",
      label: "Ethical Standards",
      description: "Committed to animal welfare"
    }
  ];

  return (
    <section className="w-full py-16 md:py-20 bg-gray-800 font-poppins">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12 md:mb-16">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-white mb-4 tracking-tight">
            Our Impact in Numbers
          </h2>
          <p className="text-gray-300 text-lg max-w-2xl mx-auto leading-relaxed">
            These numbers represent our commitment to excellence and our growing community of satisfied customers.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 md:gap-12">
          {stats.map((stat) => (
            <div key={stat.id} className="text-center group">
              <div className="flex justify-center mb-4">
                <div className="bg-green-600 text-white p-4 rounded-full group-hover:bg-green-500 transition duration-300">
                  {stat.icon}
                </div>
              </div>
              <h3 className="text-3xl md:text-4xl font-extrabold text-white mb-2">
                {stat.number}
              </h3>
              <h4 className="text-lg font-semibold text-green-400 mb-2">
                {stat.label}
              </h4>
              <p className="text-gray-400 text-sm md:text-base leading-relaxed">
                {stat.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CompanyStats;
