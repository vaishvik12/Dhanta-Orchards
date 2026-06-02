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
              src="https://images.stockcake.com/public/d/8/2/d82e710e-4b86-4629-8c3a-f22870912d90_large/harvesting-fresh-apples-stockcake.jpg"
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
                More than a century ago, when commercial apple cultivation was still in its infancy in the hills of Jubbal, our forefathers recognized the region's potential and planted the first roots of what would become Dhanta Orchards. Starting with a small plot of land and guided by determination, patience, and a deep connection to the mountains, they nurtured their orchards through changing seasons and generations. Their pioneering spirit helped establish apple farming in the area, laying the foundation for a thriving family enterprise that continues to flourish today.

              </p>
            </div>
            <div className="legacy-item">
              <span className="legacy-year">1960s</span>
              <h3>Expansion</h3>
              <p>
                Our father, Late Shri Krishan Lal Dhanta, and our mother, Smt. Sumitra Dhanta, proudly carried forward the farming traditions passed down by their forefathers, dedicating their lives to nurturing and expanding the family orchards. Under their stewardship, the orchard grew beyond apples to include pears and peaches, enriching the harvest while preserving the traditional cultivation methods and deep respect for the land that had guided the family for generations. Their hard work, vision, and commitment laid the foundation upon which we continue to build today.
              </p>
            </div>
            <div className="legacy-item">
              <span className="legacy-year">Today</span>
              <h3>Pankaj &amp; Manjeet Dhanta</h3>
              <p>
                Pankaj and Manjeet remain deeply grateful for the values instilled in them by their parents. From an early age, they witnessed the dedication, resilience, and hard work that Krishan Lal and Sumitra Dhanta poured into both their family and their orchards. Beyond teaching them the art of fruit cultivation, their parents taught them the importance of integrity, humility, respect for nature, and the value of caring for others. The love, guidance, and life lessons they received continue to inspire every decision they make, both in the orchards and in life.

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
            <div className="owner-avatar">
                <img src="Pankaj.jpg" alt="Pankaj Dhanta" />
            </div>
            <h3>Pankaj Dhanta</h3>
            <p className="owner-role">Co-Owner &amp; Orchard Steward</p>
            <p>
           A seasoned horticulture expert and senior horticulture officer, Pankaj is widely recognized for his contributions to fruit cultivation in Himachal Pradesh. Through years of field experience, agricultural camps, and farmer advisory work, he continues to promote excellence in Himalayan horticulture while leading operations across our orchards.
            </p>
          </div>
          <div className="owner-card">
            <div className="owner-avatar">
              <img src="Manjeet.jpg" alt="Manjeet Dhanta" />
            </div>
            <h3>Manjeet Dhanta</h3>
            <p className="owner-role">Co-Owner &amp; Quality Director</p>
            <p>
              Drawing on the leadership and discipline gained through his service as an Army Officer, Manjeet manages distribution and customer relationships for our orchards. His commitment to excellence helps ensure that every customer experiences the quality and integrity that have been at the heart of our family business for generations.
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
