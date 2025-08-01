import React from 'react'; // Removed useState, useEffect as explicit slider logic is no longer needed for horizontal scroll
import { FiTwitter, FiLinkedin, FiGithub } from 'react-icons/fi'; // Example social icons

// Placeholder images for team members
// IMPORTANT: Ensure these paths are correct relative to THIS file's location.
import teamMember1 from '../../../assets/image6.png';
import teamMember2 from '../../../assets/image7.png';
import teamMember3 from '../../../assets/feed.jpg';
import teamMember4 from '../../../assets/test2.jpg';

const teamMembersData = [
  {
    id: 1,
    name: "John Doe",
    role: "CEO & Founder",
    image: teamMember1,
    social: { twitter: "#", linkedin: "#" }
  },
  {
    id: 2,
    name: "Jane Smith",
    role: "Worker",
    image: teamMember2,
    social: { twitter: "#", linkedin: "#" }
  },
  {
    id: 3,
    name: "Peter Jones",
    role: "Security Guard",
    image: teamMember3,
    social: { twitter: "#", linkedin: "#" }
  },
  {
    id: 4,
    name: "Sarah Brown",
    role: "Senior Farmer Manager",
    image: teamMember4,
    social: { twitter: "#", linkedin: "#" }
  },
  {
    id: 5,
    name: "Michael Green",
    role: "Logistics Head",
    image: teamMember1, // Reusing image for demo
    social: { twitter: "#", linkedin: "#" }
  },
  {
    id: 6,
    name: "Emily White",
    role: "Customer Relations",
    image: teamMember2, // Reusing image for demo
    social: { twitter: "#", linkedin: "#" }
  },
];

const TeamSlider = () => {
  return (
    <section className="w-full py-16 md:py-20 bg-white font-poppins">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12 md:mb-16">
          <h2 className="text-4xl sm:text-5xl font-extrabold text-gray-800 mb-4 tracking-tight">
            Our Awesome Team
          </h2>
          <p className="text-gray-600 text-lg max-w-2xl mx-auto leading-relaxed">
            Pellentesque a ante vulputate leo porttitor luctus sed eget eros. Nulla et rhoncus neque. Duis non diam eget est luctus tincidunt a a mi.
          </p>
        </div>

        {/* Team Members Display */}
        {/* Mobile: Horizontal Scroll (flex overflow-x-auto) */}
        {/* Desktop: Grid (md:grid) */}
        <div className="flex overflow-x-auto pb-4 snap-x snap-mandatory md:grid md:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8 hide-scrollbar">
          {teamMembersData.map((member) => (
            <div key={member.id} className="flex-none w-64 snap-center md:w-auto"> {/* Fixed width for mobile scroll, auto for grid */}
              <div className="bg-gray-50 rounded-xl shadow-md p-6 text-center transform hover:shadow-lg transition duration-300 ease-in-out min-h-[280px] flex flex-col justify-between">
                <img
                  src={member.image}
                  alt={member.name}
                  className="w-24 h-24 object-cover rounded-full mx-auto mb-4 border-4 border-white shadow-sm"
                  onError={(e) => { e.target.onerror = null; e.target.src="https://placehold.co/96x96/cccccc/333333?text=Team"; }}
                />
                <div>
                  <h3 className="text-xl font-semibold text-gray-800 mb-1">{member.name}</h3>
                  <p className="text-green-600 text-sm font-medium">{member.role}</p>
                </div>
                <div className="flex justify-center gap-3 mt-4">
                  {member.social.twitter && (
                    <a href={member.social.twitter} target="_blank" rel="noopener noreferrer" className="text-gray-500 hover:text-blue-400 transition-colors duration-200" aria-label={`${member.name}'s Twitter`}>
                      <FiTwitter size={20} />
                    </a>
                  )}
                  {member.social.linkedin && (
                    <a href={member.social.linkedin} target="_blank" rel="noopener noreferrer" className="text-gray-500 hover:text-blue-600 transition-colors duration-200" aria-label={`${member.name}'s LinkedIn`}>
                      <FiLinkedin size={20} />
                    </a>
                  )}
                  {/* Add more social icons if needed */}
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
