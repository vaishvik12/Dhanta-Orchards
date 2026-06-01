import { Link } from 'react-router-dom';
import Hero from '../components/Hero';
import './About.css';

function About() {
  return (
    <div className="about-page">
      <Hero
        title="Our Family Story"
        subtitle="Over 100 years of orchard heritage in the Himalayan hills of Jubbal."
        showCta={false}
        compact
      />

      <section className="section about-intro">
        <div className="container about-intro-grid">
          <div className="about-intro-text">
            <span className="about-label">Dhanta Orchards</span>
            <h2>Rooted in the Himalayas</h2>
            <p>
              In the serene hills of Jubbal, Himachal Pradesh, where morning mist drapes
              over apple trees and mountain streams nourish the soil, our family has tended
              these orchards for more than a century. What began as a small hillside plot
              has grown into a legacy of exceptional fruit — passed from generation to
              generation with unwavering dedication.
            </p>
            <p>
              Today, Pankaj Dhanta and Manjeet Dhanta carry forward this tradition. They
              walk the same terraces their ancestors planted, hand-selecting each harvest
              and ensuring that every apple, pear, and peach meets the standards their
              family name represents.
            </p>
          </div>
          <div className="about-intro-image">
            <img
              src="https://images.unsplash.com/photo-1595878848298-96a802248f98?w=800&q=80"
              alt="Family working in Himalayan orchard"
            />
          </div>
        </div>
      </section>

      <section className="section about-legacy">
        <div className="container">
          <h2 className="section-title">A Legacy of Care</h2>
          <div className="legacy-timeline">
            <div className="legacy-item">
              <span className="legacy-year">1920s</span>
              <h3>The Beginning</h3>
              <p>
                Our ancestors planted the first apple trees on terraced hillsides in Jubbal,
                establishing roots that would span over a hundred years.
              </p>
            </div>
            <div className="legacy-item">
              <span className="legacy-year">1960s</span>
              <h3>Expansion</h3>
              <p>
                The orchard grew to include pears and peaches, diversifying our harvest
                while maintaining traditional growing methods.
              </p>
            </div>
            <div className="legacy-item">
              <span className="legacy-year">Today</span>
              <h3>Pankaj &amp; Manjeet Dhanta</h3>
              <p>
                As stewards of this land, we blend time-honoured practices with careful
                modern stewardship — always putting quality and the land first.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="section about-values">
        <div className="container">
          <h2 className="section-title">What We Believe</h2>
          <div className="values-grid">
            <div className="value-card">
              <span className="value-icon">🌿</span>
              <h3>Natural Growing</h3>
              <p>
                We respect the rhythm of the seasons and the wisdom of the mountains,
                avoiding shortcuts that compromise flavour or soil health.
              </p>
            </div>
            <div className="value-card">
              <span className="value-icon">🤲</span>
              <h3>Hand-Picked Quality</h3>
              <p>
                Every fruit is selected by hand at peak ripeness — never rushed, never
                compromised.
              </p>
            </div>
            <div className="value-card">
              <span className="value-icon">🏔️</span>
              <h3>Himalayan Heritage</h3>
              <p>
                The cool climate, pure water, and altitude of Jubbal create fruits with
                character you cannot find elsewhere.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="section about-owners">
        <div className="container owners-grid">
          <div className="owner-card">
            <div className="owner-avatar">PD</div>
            <h3>Pankaj Dhanta</h3>
            <p className="owner-role">Co-Owner &amp; Orchard Steward</p>
            <p>
              With decades of experience in Himalayan horticulture, Pankaj oversees
              cultivation and harvest across our terraces.
            </p>
          </div>
          <div className="owner-card">
            <div className="owner-avatar">MD</div>
            <h3>Manjeet Dhanta</h3>
            <p className="owner-role">Co-Owner &amp; Quality Director</p>
            <p>
              Manjeet ensures every shipment meets our family standards — from grading
              and packing to customer relationships.
            </p>
          </div>
        </div>
      </section>

      <section className="section about-cta">
        <div className="container about-cta-inner">
          <h2>Taste Our Heritage</h2>
          <p>Discover the fruits that generations of the Dhanta family have perfected.</p>
          <Link to="/products" className="btn btn-primary">
            Explore Products
          </Link>
        </div>
      </section>
    </div>
  );
}

export default About;
