import Hero from '../components/Hero';
import ContactForm from '../components/ContactForm';
import './Contact.css';

function Contact() {
  return (
    <div className="contact-page">
      <Hero
        title="Contact Us"
        subtitle="We would love to hear from you. Reach out for orders, visits, or questions."
        showCta={false}
        compact
      />

      <section className="section contact-section">
        <div className="container contact-grid">
          <div className="contact-info">
            <h2>Get in Touch</h2>
            <p>
              Whether you are interested in wholesale orders, visiting our orchards, or
              simply learning more about our fruits — we welcome your message.
            </p>

            <div className="contact-details">
              <div className="contact-detail-item">
                <span className="detail-icon">📍</span>
                <div>
                  <h4>Location</h4>
                  <p>Jubbal, Himachal Pradesh, India</p>
                </div>
              </div>
              <div className="contact-detail-item">
                <span className="detail-icon">✉️</span>
                <div>
                  <h4>Email</h4>
                  <p>
                    <a href="mailto:dhanta.orchards@gmail.com">dhanta.orchards@gmail.com</a>
                  </p>
                </div>
              </div>
              <div className="contact-detail-item">
                <span className="detail-icon">📞</span>
                <div>
                  <h4>Phone</h4>
                  <p>
                    <a href="tel:+919876543210">+91 9805715742</a>
                  </p>
                </div>
              </div>
              <div className="contact-detail-item">
                <span className="detail-icon">👨‍🌾</span>
                <div>
                  <h4>Owners</h4>
                  <p>Pankaj Dhanta &amp; Manjeet Dhanta</p>
                </div>
              </div>
            </div>
          </div>

          <div className="contact-form-wrapper">
            <h2>Send a Message</h2>
            <ContactForm />
          </div>
        </div>
      </section>

      <section className="section map-section">
        <div className="container">
          <h2 className="section-title">Find Us in Jubbal</h2>
          <p className="section-subtitle">
            Located in the scenic hills of Himachal Pradesh, approximately 90 km from Shimla.
          </p>
          <div className="map-embed">
            <iframe
              title="Dhanta Orchards location in Jubbal, Himachal Pradesh"
             src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d381.4976257268157!2d77.70223176674259!3d31.113821565111305!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3905f7006203b8f9%3A0x407a7275fcffb183!2sDhar%20%2Cjubbal!5e0!3m2!1sen!2sus!4v1780401447971!5m2!1sen!2sus" 
              width="100%"
              height="400"
              style={{ border: 0 }}
              allowFullScreen=""
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>
        </div>
      </section>
    </div>
  );
}

export default Contact;
