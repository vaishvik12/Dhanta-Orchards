import { useEffect, useState } from 'react';
import './MobileContact.css';
import { contactInfo } from '../data/contactInfo';

function MobileContactBar() {
  const [visible, setVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      // Always visible near top
      if (currentScrollY < 250) {
        setVisible(true);
      }
      // Hide when scrolling down
      else if (currentScrollY > lastScrollY) {
        setVisible(false);
      }
      // Show when scrolling up
      else {
        setVisible(true);
      }

      setLastScrollY(currentScrollY);
    };

    window.addEventListener('scroll', handleScroll);

    return () => window.removeEventListener('scroll', handleScroll);
  }, [lastScrollY]);

  return (
    <div className={`mobile-contact-bar ${visible ? 'show' : 'hide'}`}>
      <a href={`tel:${contactInfo.phone}`} aria-label="Call Us">
        <img src="Images/Icons/phone.png" alt="phone-icon" className="contact-icon" />
      </a>

      <a
        href={`https://wa.me/${contactInfo.whatsapp}`}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="WhatsApp"
      >
        <img src="Images/Icons/whatsapp1.png" alt="whatsapp-icon" className="contact-icon" />
      </a>

      <a href={`mailto:${contactInfo.email}`} aria-label="Email">
        <img src="Images/Icons/email1.png" alt="email-icon" className="contact-icon" />
      </a>

      <a
        href={contactInfo.facebook}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Facebook"
      >
        <img src="Images/Icons/Facebook_Logo.png" alt="facebook-icon" className="contact-icon" />
      </a>
    </div>
  );
}

export default MobileContactBar;