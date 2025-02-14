import React from 'react';
import { Link } from 'react-router-dom';
import './Home.css';

const EnterpriseHomepage = () => {
  return (
    <div className="enterprise-homepage">
      {/* Sticky Header */}
      {/* <header className="header">
        <div className="container header-container">
          <Link className="logo" to="/">
            AutoMarket
          </Link>
          <nav className="nav">
            <ul>
              <li>
                <Link to="/browse-cars">Browse Cars</Link>
              </li>
              <li>
                <Link to="/find-mechanics">Find Mechanics</Link>
              </li>
              <li>
                <Link to="/sell-your-car">Sell Your Car</Link>
              </li>
              <li>
                <Link to="/sign-in">Sign In</Link>
              </li>
            </ul>
          </nav>
        </div>
      </header> */}

      {/* Hero Section */}
      <section className="hero">
        <div className="container hero-content">
          <h1 className="fade-in">Car Marketplace</h1>
          <p className="fade-in delay-1">
            Browse through our curated selection of vehicles or list your own car for sale.
            Connect directly with buyers and sellers in your area.
          </p>
        </div>
      </section>

      {/* CTA Section */}
      <section className="cta-section container">
        <Link to="/browse-cars" className="cta-box fade-in-up" id="browse">
          <h2>Explore Cars</h2>
          
<p>
  Discover a wide range of cars tailored to your preferences. 
  Browse by make, model, and features to find the perfect ride for you. Its quick and very easy.
</p>
<button className="btn secondary-btn">Browse Cars</button>

        </Link>
        <Link to="/find-mechanics" className="cta-box fade-in-up delay-1" id="mechanics">
          <h2>Mechanic Services</h2>
          <p>
            Find skilled mechanics near you for repairs, maintenance, and diagnostics.
            Book appointments and get your car back on the road quickly.
          </p>
          <button className="btn secondary-btn">Find Mechanics</button>
        </Link>
      </section>

      {/* Features Section */}
      <section className="features-section container">
        <h2 className="section-title fade-in">Why Choose AutoMarket?</h2>
        <div className="features-grid">
          <div className="feature-box fade-in-up">
            <h3>100% Guarantee</h3>
            <p>
              We stand by the quality of our listings with a full guarantee on every vehicle and service.
            </p>
          </div>
          <div className="feature-box fade-in-up delay-1">
            <h3>Verified Listings</h3>
            <p>
              Every vehicle undergoes a rigorous inspection process, ensuring only the best makes it to our marketplace.
            </p>
          </div>
          <div className="feature-box fade-in-up delay-2">
            <h3>Trusted Mechanics</h3>
            <p>
              Our network of certified mechanics is dedicated to keeping your car in top condition.
            </p>
          </div>
          <div className="feature-box fade-in-up delay-3">
            <h3>Secure Transactions</h3>
            <p>
              Enjoy peace of mind with our secure and transparent transaction process.
            </p>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="footer">
        <div className="container footer-container">
          <p>&copy; {new Date().getFullYear()} AutoMarket. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
};

export default EnterpriseHomepage;
