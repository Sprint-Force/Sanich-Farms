import React from 'react';

/**
 * Utility functions for making contact information clickable
 */

/**
 * Creates a clickable email link that opens the default mail client
 * @param {string} email - The email address
 * @param {string} className - CSS classes to apply
 * @param {React.ReactNode} children - Content to render (defaults to email)
 * @returns {React.ReactElement} Clickable email link
 */
export const ClickableEmail = ({ email, className = '', children }) => {
  return (
    <a
      href={`mailto:${email}`}
      className={`hover:text-green-500 transition-colors duration-200 cursor-pointer ${className}`}
      title={`Send email to ${email}`}
    >
      {children || email}
    </a>
  );
};

/**
 * Creates a clickable phone number link that opens the phone dialer on mobile
 * @param {string} phone - The phone number
 * @param {string} className - CSS classes to apply
 * @param {React.ReactNode} children - Content to render (defaults to phone)
 * @returns {React.ReactElement} Clickable phone link
 */
export const ClickablePhone = ({ phone, className = '', children }) => {
  // Clean phone number for tel: link (remove spaces, dashes, etc.)
  const cleanPhone = phone.replace(/[^\d+]/g, '');
  
  return (
    <a
      href={`tel:${cleanPhone}`}
      className={`hover:text-green-500 transition-colors duration-200 cursor-pointer ${className}`}
      title={`Call ${phone}`}
    >
      {children || phone}
    </a>
  );
};

/**
 * Detects and makes email addresses clickable in text
 * @param {string} text - Text that may contain email addresses
 * @param {string} className - CSS classes to apply to email links
 * @returns {React.ReactElement} Text with clickable email addresses
 */
export const AutoLinkEmails = ({ text, className = '' }) => {
  const emailRegex = /([a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,})/g;
  
  if (!emailRegex.test(text)) {
    return <span>{text}</span>;
  }
  
  const parts = text.split(emailRegex);
  
  return (
    <span>
      {parts.map((part, index) => {
        if (emailRegex.test(part)) {
          return (
            <ClickableEmail
              key={index}
              email={part}
              className={className}
            />
          );
        }
        return part;
      })}
    </span>
  );
};

/**
 * Detects and makes phone numbers clickable in text
 * @param {string} text - Text that may contain phone numbers
 * @param {string} className - CSS classes to apply to phone links
 * @returns {React.ReactElement} Text with clickable phone numbers
 */
export const AutoLinkPhones = ({ text, className = '' }) => {
  // More comprehensive phone regex that handles various formats
  const phoneRegex = /(\+?[\d\s\-\(\)]{10,})/g;
  
  if (!phoneRegex.test(text)) {
    return <span>{text}</span>;
  }
  
  const parts = text.split(phoneRegex);
  
  return (
    <span>
      {parts.map((part, index) => {
        if (phoneRegex.test(part) && part.trim().length >= 10) {
          return (
            <ClickablePhone
              key={index}
              phone={part.trim()}
              className={className}
            />
          );
        }
        return part;
      })}
    </span>
  );
};

/**
 * Detects and makes both emails and phone numbers clickable in text
 * @param {string} text - Text that may contain contact information
 * @param {string} emailClassName - CSS classes to apply to email links
 * @param {string} phoneClassName - CSS classes to apply to phone links
 * @returns {React.ReactElement} Text with clickable contact information
 */
export const AutoLinkContacts = ({ text, emailClassName = '', phoneClassName = '' }) => {
  const emailRegex = /([a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,})/g;
  const phoneRegex = /(\+?[\d\s\-\(\)]{10,})/g;
  
  let result = text;
  const elements = [];
  let lastIndex = 0;
  
  // Find all matches for both emails and phones
  const allMatches = [];
  
  let match;
  while ((match = emailRegex.exec(text)) !== null) {
    allMatches.push({
      type: 'email',
      value: match[1],
      index: match.index,
      length: match[1].length
    });
  }
  
  while ((match = phoneRegex.exec(text)) !== null) {
    if (match[1].trim().length >= 10) {
      allMatches.push({
        type: 'phone',
        value: match[1].trim(),
        index: match.index,
        length: match[1].length
      });
    }
  }
  
  // Sort matches by index
  allMatches.sort((a, b) => a.index - b.index);
  
  // Build the result with clickable elements
  allMatches.forEach((match, index) => {
    // Add text before this match
    if (match.index > lastIndex) {
      elements.push(text.substring(lastIndex, match.index));
    }
    
    // Add the clickable element
    if (match.type === 'email') {
      elements.push(
        <ClickableEmail
          key={`email-${index}`}
          email={match.value}
          className={emailClassName}
        />
      );
    } else if (match.type === 'phone') {
      elements.push(
        <ClickablePhone
          key={`phone-${index}`}
          phone={match.value}
          className={phoneClassName}
        />
      );
    }
    
    lastIndex = match.index + match.length;
  });
  
  // Add remaining text
  if (lastIndex < text.length) {
    elements.push(text.substring(lastIndex));
  }
  
  return elements.length > 0 ? <span>{elements}</span> : <span>{text}</span>;
};
