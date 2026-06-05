import { Link } from 'react-router-dom';
import './Footer.css';

function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="footer">
      <div className="footer-top container">
        <div className="footer-brand">
          <h3>Dwarkadhish Orchards</h3>
          <p>
            A century of Himalayan fruit heritage in Jubbal, Himachal Pradesh.
            Grown with care by Pankaj &amp; Manjeet Dhanta.
          </p>
        </div>

        <div className="footer-links">
          <h4>Explore</h4>
          <ul>
            <li><Link to="/">Home</Link></li>
            <li><Link to="/products">Products</Link></li>
            <li><Link to="/harvest-calendar">Harvest Calendar</Link></li>
            <li><Link to="/about">Our Story</Link></li>
            <li><Link to="/gallery">Gallery</Link></li>
            <li><Link to="/contact">Contact</Link></li>
          </ul>
        </div>

        <div className="footer-contact">
          <h4>Visit Us</h4>
          <p>Jubbal, Himachal Pradesh, India</p>
          <p>
            <a href="mailto:dhanta.orchards@gmail.com">dhanta.orchards@gmail.com</a>
          </p>
          <p>
            <a href="tel:+919876543210">Pankaj: +91 9805715742</a><br/>
            <a href="tel:+919928086865">Manjeet: +91 9928086865</a>
          </p>
        </div>

        <div className="footer-fruits">
          <h4>Our Harvest</h4>
          <ul>
            <li>Apples</li>
            <li>Pears</li>
            <li>Peaches</li>
            <li>Rootstocks</li>
            <li>Persimmons</li>
          </ul>
        </div>
      </div>

      <div className="footer-bottom container">
        <p>&copy; {currentYear} Dwarkadhish Orchards. All rights reserved.</p>
        <p className="footer-owners">Pankaj Dhanta &amp; Manjeet Dhanta</p>
      </div>
    </footer>
  );
}

export default Footer;
