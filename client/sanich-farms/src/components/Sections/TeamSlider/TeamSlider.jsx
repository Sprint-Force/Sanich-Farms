import React from 'react';
import { FiTwitter, FiLinkedin, FiGithub, FiInstagram } from 'react-icons/fi';
import { FaFacebook } from 'react-icons/fa';

// Placeholder images for team members
// IMPORTANT: Ensure these paths are correct relative to THIS file's location.
import teamMember1 from '../../../assets/slider2.png';
import teamMember2 from '../../../assets/image7.png';
import teamMember3 from '../../../assets/feed.jpg';

// ABOUT US FIX: Updated team data with realistic information - Limited to 3 key members
const teamMembersData = [
  {
    id: 1,
    name: "Saaka Nicholas",
    role: "CEO & Founder",
    image: teamMember1,
    social: { 
      linkedin: "https://linkedin.com/in/saaka-nicholas", 
      twitter: "https://twitter.com/saaka_nicholas",
      facebook: "https://facebook.com/saaka.nicholas",
      instagram: "https://instagram.com/saaka_nicholas"
    }
  },
  {
    id: 2,
    name: "Grace Mensah",
    role: "Farm Operations Manager",
    image: teamMember2,
    social: { 
      linkedin: "https://linkedin.com/in/grace-mensah", 
      twitter: "https://twitter.com/grace_mensah",
      facebook: "https://facebook.com/grace.mensah", 
      instagram: "https://instagram.com/grace_mensah"
    }
  },
  {
    id: 3,
    name: "Michael Asante",
    role: "Head of Security & Safety",
    image: teamMember3,
    social: { 
      linkedin: "https://linkedin.com/in/michael-asante", 
      twitter: "https://twitter.com/michael_asante",
      facebook: "https://facebook.com/michael.asante",
      instagram: "https://instagram.com/michael_asante"
    }
  }
];

const TeamSlider = () => {
  return (
    <section className="w-full py-12 md:py-16 bg-white font-poppins">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-8 md:mb-12">
          <h2 className="text-3xl sm:text-4xl font-extrabold text-gray-800 mb-4 tracking-tight">
            Our Awesome Team
          </h2>
          <div className="w-20 h-1.5 bg-green-600 mx-auto rounded-full mb-4"></div>
          {/* Remove description text on mobile for space efficiency */}
          <p className="hidden md:block text-gray-600 text-base md:text-lg max-w-2xl mx-auto leading-relaxed">
            Meet the dedicated professionals who make Sanich Farms a trusted name in Ghana's poultry industry.
          </p>
        </div>

        {/* Team Members Display - Horizontal scroll on mobile, grid on desktop */}
        <div className="flex md:grid overflow-x-auto md:overflow-x-visible md:grid-cols-3 gap-6 lg:gap-8 hide-scrollbar pb-4 md:pb-0">
          {teamMembersData.map((member) => (
            <div key={member.id} className="flex-shrink-0 w-80 md:w-full">
              <div className="bg-gray-50 rounded-xl shadow-md p-6 text-center transform hover:shadow-lg transition duration-300 ease-in-out h-full flex flex-col justify-between">
                <div>
                  <img
                    src={member.image}
                    alt={member.name}
                    className="w-24 h-24 sm:w-28 sm:h-28 md:w-32 md:h-32 object-cover rounded-full mx-auto mb-4 border-4 border-white shadow-sm"
                    onError={(e) => { e.target.onerror = null; e.target.src="https://placehold.co/120x120/cccccc/333333?text=Team"; }}
                  />
                  <h3 className="text-lg md:text-xl font-semibold text-gray-800 mb-1">{member.name}</h3>
                  <p className="text-green-600 text-sm md:text-base font-medium mb-4">{member.role}</p>
                </div>
                <div className="flex justify-center gap-3">
                  <a href={member.social.linkedin} target="_blank" rel="noopener noreferrer" className="text-gray-500 hover:text-blue-600 transition-colors duration-200" aria-label={`${member.name}'s LinkedIn`}>
                    <FiLinkedin size={20} />
                  </a>
                  <a href={member.social.twitter} target="_blank" rel="noopener noreferrer" className="text-gray-500 hover:text-blue-400 transition-colors duration-200" aria-label={`${member.name}'s Twitter`}>
                    <FiTwitter size={20} />
                  </a>
                  <a href={member.social.facebook} target="_blank" rel="noopener noreferrer" className="text-gray-500 hover:text-blue-700 transition-colors duration-200" aria-label={`${member.name}'s Facebook`}>
                    <FaFacebook size={20} />
                  </a>
                  <a href={member.social.instagram} target="_blank" rel="noopener noreferrer" className="text-gray-500 hover:text-pink-500 transition-colors duration-200" aria-label={`${member.name}'s Instagram`}>
                    <FiInstagram size={20} />
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TeamSlider;
