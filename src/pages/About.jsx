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
            <span className="about-label">Dwarkadhish Orchards</span>
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
              src="Images/Rooted-in-himalyas.jpg"
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
              <span className="legacy-year">1960s</span>
              <h3>The Beginning</h3>
              <p>
                Our father, Late Shri Krishan Lal Dhanta, laid the foundation of the orchard through his vision, hard work, and dedication to farming. What began as a modest apple orchard grew steadily under his stewardship into a thriving fruit growing enterprise. With a deep understanding of the Himalayan climate and a passion for quality cultivation, he devoted his life to nurturing healthy orchards and producing exceptional fruit.

                Alongside our mother, Smt. Sumitra Dhanta, he worked tirelessly to expand the farm beyond apples to include pears and peaches, creating new opportunities while preserving the values of honesty, perseverance, and respect for the land. Together, they built not only a successful orchard but also a strong family legacy rooted in hard work and integrity.

                Their guidance and example continue to inspire us today. The orchard stands as a tribute to their dedication, and the values they instilled remain at the heart of everything we do as we carry their vision forward for future generations.
              </p>
            </div>
            <div className="legacy-item">
              <span className="legacy-year">2010s</span>
              <h3>Pankaj &amp; Manjeet Dhanta</h3>
              <p>
                Pankaj and Manjeet remain deeply grateful for the values instilled in them by their parents. Growing up in the orchards, they learned the importance of hard work, integrity, perseverance, and respect for nature. The lessons and guidance of Krishan Lal and Sumitra Dhanta continue to inspire every decision they make today.

                In the mid 2010s, determined to build upon the strong foundation laid by their parents, Pankaj and Manjeet began expanding the family orchards. By combining traditional farming wisdom with modern horticultural practices, they introduced new fruit varieties, improved cultivation techniques, and enhanced the quality of their produce while preserving the values that had guided the orchard for decades.

                Their commitment to continuous improvement and sustainable growth has helped strengthen the orchard's reputation for producing premium apples, pears, peaches, and other fruits. Today, they continue to honour their parents' legacy by balancing tradition with innovation and ensuring that the orchard thrives for future generations.

              </p>
            </div>
            <div className="legacy-item">
              <span className="legacy-year">Today</span>
              <p>
                Today, under the leadership of Pankaj and Manjeet Dhanta, the orchard blends generations of farming experience with modern horticultural practices to produce premium quality apples, pears, peaches, and other fruits. Committed to continuous learning, Pankaj has explored advanced fruit growing techniques from around the world, including modern orchard management systems observed during his visit to Hungary.

                Inspired by these global best practices, the family has adopted high density plantation systems, improved rootstocks, scientific pruning methods, modern irrigation techniques, and sustainable orchard management practices. These innovations help improve fruit quality, tree health, and overall productivity while ensuring responsible use of natural resources.

                While embracing innovation, the family remains firmly rooted in the values established by Late Shri Krishan Lal Dhanta and Smt. Sumitra Dhanta. By combining traditional farming wisdom with modern technology, Pankaj and Manjeet continue to cultivate exceptional fruit while preserving the beauty and sustainability of their Himalayan orchards for future generations.

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
              <img src="Images/Pankaj.jpg" alt="Pankaj Dhanta" />
            </div>
            <h3>Pankaj Dhanta</h3>
            <p className="owner-role">Co-Owner &amp; Orchard Steward</p>
            <p>
              A seasoned horticulture expert and senior horticulture officer, Pankaj is widely recognized for his contributions to fruit cultivation in Himachal Pradesh. Through years of field experience, agricultural camps, and farmer advisory work, he continues to promote excellence in Himalayan horticulture while leading operations across our orchards.
            </p>
          </div>
          <div className="owner-card">
            <div className="owner-avatar">
              <img src="Images/Manjeet.jpg" alt="Manjeet Dhanta" />
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
