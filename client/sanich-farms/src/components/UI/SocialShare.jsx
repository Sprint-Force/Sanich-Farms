/**
 * SocialShare Component
 * A reusable social media sharing component with multiple platform support
 */
import React, { useState } from 'react';
import './socialShare.css';
import { 
  FaFacebookF, 
  FaTwitter, 
  FaLinkedinIn, 
  FaWhatsapp, 
  FaTelegramPlane,
  FaRedditAlien,
  FaPinterestP
} from 'react-icons/fa';
import { 
  FiMail, 
  FiLink2, 
  FiCheck, 
  FiShare2,
  FiX 
} from 'react-icons/fi';
import { 
  generateShareUrls, 
  openShareWindow, 
  copyToClipboard,
  getCurrentPageShareData
} from '../../utils/socialShare';

/**
 * Individual Social Button Component
 */
const SocialButton = ({ 
  platform, 
  icon: Icon, // eslint-disable-line no-unused-vars
  url, 
  bgColor, 
  hoverColor,
  onClick,
  label,
  showLabel = false 
}) => {
  return (
    <button
      onClick={() => onClick(url, platform)}
      className={`
        group relative flex items-center justify-center
        w-10 h-10 rounded-full transition-all duration-300
        ${bgColor} ${hoverColor}
        hover:transform hover:scale-110 hover:shadow-lg
        focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500
        ${showLabel ? 'gap-2 px-4 w-auto' : ''}
      `}
      aria-label={`Share on ${label}`}
      title={`Share on ${label}`}
    >
      <Icon className="w-4 h-4 text-white" />
      {showLabel && (
        <span className="text-sm font-medium text-white whitespace-nowrap">
          {label}
        </span>
      )}
      
      {/* Tooltip for icon-only buttons */}
      {!showLabel && (
        <span className="
          absolute bottom-12 left-1/2 transform -translate-x-1/2
          bg-gray-900 text-white text-xs px-2 py-1 rounded-md
          opacity-0 group-hover:opacity-100 transition-opacity duration-200
          pointer-events-none whitespace-nowrap z-10
        ">
          {label}
        </span>
      )}
    </button>
  );
};

/**
 * Main SocialShare Component
 */
const SocialShare = ({
  url = null,
  title = null,
  description = null,
  variant = 'default', // 'default', 'minimal', 'expanded', 'floating'
  showLabels = false,
  platforms = ['facebook', 'twitter', 'linkedin', 'whatsapp', 'copy'],
  className = '',
  onShare = null // Callback function when sharing occurs
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [copiedLink, setCopiedLink] = useState(false);
  
  // Get share data
  const shareData = {
    url: url || getCurrentPageShareData().url,
    title: title || getCurrentPageShareData().title,
    description: description || getCurrentPageShareData().description
  };
  
  const shareUrls = generateShareUrls(shareData.url, shareData.title, shareData.description);
  
  // Handle share action
  const handleShare = async (shareUrl, platform) => {
    if (platform === 'copy') {
      const success = await copyToClipboard(shareData.url);
      if (success) {
        setCopiedLink(true);
        setTimeout(() => setCopiedLink(false), 2000);
      }
    } else if (platform === 'email') {
      window.location.href = shareUrl;
    } else {
      openShareWindow(shareUrl, platform);
    }
    
    // Callback for analytics or other purposes
    if (onShare) {
      onShare(platform, shareData);
    }
    
    // Close floating menu after sharing
    if (variant === 'floating') {
      setIsOpen(false);
    }
  };
  
  // Platform configurations
  const platformConfigs = {
    facebook: {
      icon: FaFacebookF,
      label: 'Facebook',
      bgColor: 'bg-blue-600',
      hoverColor: 'hover:bg-blue-700',
      url: shareUrls.facebook
    },
    twitter: {
      icon: FaTwitter,
      label: 'Twitter',
      bgColor: 'bg-blue-400',
      hoverColor: 'hover:bg-blue-500',
      url: shareUrls.twitter
    },
    linkedin: {
      icon: FaLinkedinIn,
      label: 'LinkedIn',
      bgColor: 'bg-blue-800',
      hoverColor: 'hover:bg-blue-900',
      url: shareUrls.linkedin
    },
    whatsapp: {
      icon: FaWhatsapp,
      label: 'WhatsApp',
      bgColor: 'bg-green-500',
      hoverColor: 'hover:bg-green-600',
      url: shareUrls.whatsapp
    },
    telegram: {
      icon: FaTelegramPlane,
      label: 'Telegram',
      bgColor: 'bg-blue-500',
      hoverColor: 'hover:bg-blue-600',
      url: shareUrls.telegram
    },
    email: {
      icon: FiMail,
      label: 'Email',
      bgColor: 'bg-gray-600',
      hoverColor: 'hover:bg-gray-700',
      url: shareUrls.email
    },
    reddit: {
      icon: FaRedditAlien,
      label: 'Reddit',
      bgColor: 'bg-orange-600',
      hoverColor: 'hover:bg-orange-700',
      url: shareUrls.reddit
    },
    pinterest: {
      icon: FaPinterestP,
      label: 'Pinterest',
      bgColor: 'bg-red-600',
      hoverColor: 'hover:bg-red-700',
      url: shareUrls.pinterest
    },
    copy: {
      icon: copiedLink ? FiCheck : FiLink2,
      label: copiedLink ? 'Copied!' : 'Copy Link',
      bgColor: copiedLink ? 'bg-green-600' : 'bg-gray-700',
      hoverColor: copiedLink ? 'hover:bg-green-700' : 'hover:bg-gray-800',
      url: shareData.url
    }
  };
  
  // Size classes
  // const sizeClasses = {
  //   small: 'w-8 h-8',
  //   medium: 'w-10 h-10',
  //   large: 'w-12 h-12'
  // };
  
  // Filter platforms and get configs
  const activePlatforms = platforms
    .filter(platform => platformConfigs[platform])
    .map(platform => ({ 
      platform, 
      ...platformConfigs[platform] 
    }));
  
  // Render floating variant
  if (variant === 'floating') {
    return (
      <div className={`fixed right-6 bottom-6 z-50 ${className}`}>
        {/* Share Menu */}
        {isOpen && (
          <div className="absolute bottom-16 right-0 bg-white rounded-2xl shadow-2xl p-4 border border-gray-200 animate-slide-up">
            <div className="flex flex-col gap-3 min-w-[200px]">
              <h3 className="text-sm font-semibold text-gray-700 mb-2">Share this page</h3>
              <div className="grid grid-cols-2 gap-2">
                {activePlatforms.map(({ platform, icon: Icon, label, bgColor, hoverColor, url }) => ( // eslint-disable-line no-unused-vars
                  <button
                    key={platform}
                    onClick={() => handleShare(url, platform)}
                    className={`
                      flex items-center gap-2 p-2 rounded-lg transition-colors duration-200
                      ${bgColor} ${hoverColor} text-white text-sm font-medium
                    `}
                  >
                    <Icon className="w-4 h-4" />
                    {label}
                  </button>
                ))}
              </div>
            </div>
          </div>
        )}
        
        {/* Toggle Button */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="
            w-14 h-14 bg-green-600 hover:bg-green-700 text-white
            rounded-full shadow-lg hover:shadow-xl
            flex items-center justify-center transition-all duration-300
            focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2
          "
          aria-label="Share options"
        >
          {isOpen ? <FiX className="w-6 h-6" /> : <FiShare2 className="w-6 h-6" />}
        </button>
      </div>
    );
  }
  
  // Render other variants
  const containerClass = variant === 'minimal' 
    ? 'flex items-center gap-2'
    : 'flex items-center gap-3';
  
  return (
    <div className={`${containerClass} ${className}`}>
      {variant !== 'minimal' && (
        <span className="text-sm font-medium text-gray-700 mr-2">
          Share:
        </span>
      )}
      
      <div className="flex items-center gap-2">
        {activePlatforms.map(({ platform, icon: Icon, label, bgColor, hoverColor, url }) => (
          <SocialButton
            key={platform}
            platform={platform}
            icon={Icon}
            url={url}
            bgColor={bgColor}
            hoverColor={hoverColor}
            onClick={handleShare}
            label={label}
            showLabel={showLabels}
          />
        ))}
      </div>
    </div>
  );
};

export default SocialShare;
