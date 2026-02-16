import { useEffect, useState } from 'react';
import './App.css';
import { galleryImages, merchImages } from './assetPaths';
import { instagramUrl, contactEmail, upcomingShows, merchDetails } from './data';

function App() {
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const heroImage = galleryImages[0];

  return (
    <div className="band-site">
      <header className={`site-header ${scrolled ? 'scrolled' : ''}`}>
        <a href="#" className="logo">Red Water</a>
        <nav>
          <a href="#about">About</a>
          <a href="#music">Music</a>
          <a href="#shows">Shows</a>
          <a href="#gallery">Gallery</a>
          <a href="#merch">Merch</a>
          <a href="#contact">Contact</a>
          <a
            href="/where-is-jenson"
            target="_blank"
            rel="noopener noreferrer"
            className="nav-jenson"
            onClick={(e) => {
              e.preventDefault();
              window.open('/where-is-jenson', 'WhereIsJenson', 'width=1100,height=800,scrollbars=yes,resizable=yes');
            }}
          >
            Where is Jenson
          </a>
        </nav>
      </header>

      <section className="hero">
        {heroImage && <div className="hero-img" style={{ backgroundImage: `url(${heroImage})` }} aria-hidden="true" />}
        <div className="hero-bg" aria-hidden="true" />
        <div className="hero-content">
          <h1 className="hero-title">Red Water</h1>
          <p className="hero-tagline">Pacific Northwest</p>
          <a href={instagramUrl} target="_blank" rel="noopener noreferrer" className="hero-cta">
            Follow on Instagram
          </a>
        </div>
        <div className="hero-scroll">↓</div>
      </section>

      <section id="about" className="section about">
        <div className="container">
          <h2 className="section-title">About</h2>
          <p className="about-text">
            We’re Red Water — four friends from Seattle who started playing in basements and garages
            and never stopped. The rain, the coffee, and the city’s grit got into our bones; the music
            is what we give back. Charlie on lead vocals, Joe on bass, Gage on guitar, and Cole on drums —
            we write what we feel and we play it loud. This is our home. Come see us.
          </p>
          <p className="about-lineup">
            Lead Singer: Charlie · Bass: Joe · Guitar: Gage · Drums: Cole
          </p>
          <a href={instagramUrl} target="_blank" rel="noopener noreferrer" className="link-ig">
            @redwater.pnw
          </a>
        </div>
      </section>

      <section id="music" className="section music">
        <div className="container">
          <h2 className="section-title">Music</h2>
          <p className="section-sub">Listen and stay tuned for new releases.</p>
          <div className="music-placeholder">
            <p>New music coming soon. Check our Instagram for clips and updates.</p>
            <a href={instagramUrl} target="_blank" rel="noopener noreferrer" className="btn">
              See more on Instagram
            </a>
          </div>
        </div>
      </section>

      <section id="shows" className="section shows">
        <div className="container">
          <h2 className="section-title">Shows</h2>
          <p className="section-sub">Catch us live in the PNW.</p>
          <ul className="shows-list">
            {upcomingShows.map((show, i) => (
              <li key={i} className="show-item">
                <span className="show-date">{show.date}</span>
                <span className="show-venue">{show.venue}</span>
                <span className="show-location">{show.location}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section id="merch" className="section merch">
        <div className="container">
          <h2 className="section-title">Merch</h2>
          <p className="section-sub">Official Red Water gear.</p>
          <div className="merch-grid">
            {merchImages.map((src) => {
              const filename = src.replace(/^\/merch\//, '');
              const details = merchDetails[filename] || { name: 'Merch', description: '', price: null };
              return (
                <article key={src} className="merch-item">
                  <a href={instagramUrl} target="_blank" rel="noopener noreferrer" className="merch-image-link">
                    <img src={src} alt={details.name} />
                  </a>
                  <div className="merch-info">
                    <h3 className="merch-name">{details.name}</h3>
                    {details.description && <p className="merch-desc">{details.description}</p>}
                    {details.price != null && <p className="merch-price">${details.price}</p>}
                    <a href={instagramUrl} target="_blank" rel="noopener noreferrer" className="btn">
                      Order via Instagram
                    </a>
                  </div>
                </article>
              );
            })}
          </div>
        </div>
      </section>

      <section id="gallery" className="section gallery">
        <div className="container">
          <h2 className="section-title">Gallery</h2>
          <p className="section-sub">From the stage and the road.</p>
          <div className="gallery-grid">
            {galleryImages.map((src, i) => (
              <a
                key={i}
                href={instagramUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="gallery-item"
              >
                <img src={src} alt={`Red Water ${i + 1}`} loading="lazy" />
              </a>
            ))}
          </div>
        </div>
      </section>

      <section id="contact" className="section contact">
        <div className="container">
          <h2 className="section-title">Contact</h2>
          <p className="section-sub">Booking &amp; general inquiries.</p>
          <div className="contact-links">
            <a href={`mailto:${contactEmail}`} className="btn btn-ig">
              redwater@gmail.com
            </a>
            <a href={instagramUrl} target="_blank" rel="noopener noreferrer" className="btn">
              Instagram — @redwater.pnw
            </a>
          </div>
        </div>
      </section>

      <footer className="site-footer">
        <div className="container">
          <span className="footer-logo">Red Water</span>
          <a href={`mailto:${contactEmail}`}>{contactEmail}</a>
          <a href={instagramUrl} target="_blank" rel="noopener noreferrer">Instagram</a>
          <p className="footer-copy">© {new Date().getFullYear()} Red Water. Seattle, PNW.</p>
        </div>
      </footer>
    </div>
  );
}

export default App;
