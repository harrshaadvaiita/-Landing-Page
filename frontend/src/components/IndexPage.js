import React from 'react';
import './IndexPage.css';

function IndexPage() {
  return (
    <div className="index-container">
      {/* Header Section */}
      <header className="site-header">
        <div className="header-content">
          <div className="brand-section">
            <h1 className="brand-name">Nirvista</h1>
            <div className="brand-tagline">Your Business Transformation Partner</div>
          </div>
          <nav className="main-nav">
            <a href="#about" className="nav-link" onClick={(e) => {
              e.preventDefault();
              document.querySelector('#about').scrollIntoView({ behavior: 'smooth' });
            }}>About</a>
            <a href="#services" className="nav-link" onClick={(e) => {
              e.preventDefault();
              document.querySelector('#services').scrollIntoView({ behavior: 'smooth' });
            }}>Services</a>
            <a href="#blog" className="nav-link" onClick={(e) => {
              e.preventDefault();
              document.querySelector('#blog').scrollIntoView({ behavior: 'smooth' });
            }}>Blog</a>
            <a href="#contact" className="nav-link" onClick={(e) => {
              e.preventDefault();
              document.querySelector('#contact').scrollIntoView({ behavior: 'smooth' });
            }}>Contact</a>
          </nav>
        </div>
      </header>

      {/* Hero Section */}
      <section className="hero-section">
        <div className="hero-content">
          <h1 className="hero-title">Transform Your Business</h1>
          <p className="hero-subtitle">Join thousands of successful entrepreneurs who are scaling their ventures. Tell us about your goals and we'll help you succeed.</p>
          <div className="hero-buttons">
            <a href="/form" className="cta-button" onClick={(e) => {
              e.preventDefault();
              // This would navigate to form page in a real app
              alert('Form page would open here');
            }}>Get Started</a>
            <a href="#about" className="secondary-button" onClick={(e) => {
              e.preventDefault();
              document.querySelector('#about').scrollIntoView({ behavior: 'smooth' });
            }}>Learn More</a>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="about-section">
        <div className="container">
          <h2 className="section-title">About Nirvista</h2>
          <div className="about-content">
            <div className="about-text">
              <p>Nirvista is a leading business transformation consultancy dedicated to helping startups and established businesses achieve exponential growth through innovative strategies and cutting-edge solutions.</p>
              <p>With over a decade of experience in business consulting, our team of experts has successfully guided hundreds of companies through their growth journeys, from initial concept to market leadership.</p>
            </div>
            <div className="about-stats">
              <div className="stat-item">
                <div className="stat-number">500+</div>
                <div className="stat-label">Clients Served</div>
              </div>
              <div className="stat-item">
                <div className="stat-number">95%</div>
                <div className="stat-label">Success Rate</div>
              </div>
              <div className="stat-item">
                <div className="stat-number">10+</div>
                <div className="stat-label">Years Experience</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section id="services" className="services-section">
        <div className="container">
          <h2 className="section-title">Our Services</h2>
          <div className="services-grid">
            <div className="service-card">
              <div className="service-icon">🚀</div>
              <h3>Startup Solutions</h3>
              <p>Comprehensive strategies for new businesses to establish strong foundations and accelerate growth.</p>
            </div>
            <div className="service-card">
              <div className="service-icon">📈</div>
              <h3>Scaling Expertise</h3>
              <p>Proven methodologies to scale your operations efficiently while maintaining quality and customer satisfaction.</p>
            </div>
            <div className="service-card">
              <div className="service-icon">💡</div>
              <h3>Innovation Consulting</h3>
              <p>Cutting-edge solutions and innovative approaches to stay ahead in competitive markets.</p>
            </div>
            <div className="service-card">
              <div className="service-icon">📊</div>
              <h3>Data Analytics</h3>
              <p>Powerful data-driven insights to make informed decisions and optimize your business performance.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Blog Section */}
      <section id="blog" className="blog-section">
        <div className="container">
          <h2 className="section-title">Latest Insights</h2>
          <div className="blog-grid">
            <div className="blog-card">
              <div className="blog-image">📊</div>
              <div className="blog-content">
                <span className="blog-category">Growth</span>
                <h3>5 Strategies for Scaling Your Startup</h3>
                <p>Learn how to scale your business efficiently without compromising quality or customer satisfaction.</p>
                <a href="#" className="read-more" onClick={(e) => {
                  e.preventDefault();
                  // This would navigate to blog post in a real app
                  alert('Blog post would open here');
                }}>Read More →</a>
              </div>
            </div>
            <div className="blog-card">
              <div className="blog-image">💡</div>
              <div className="blog-content">
                <span className="blog-category">Innovation</span>
                <h3>The Future of Business Automation</h3>
                <p>Discover how automation can transform your business operations and increase productivity.</p>
                <a href="#" className="read-more" onClick={(e) => {
                  e.preventDefault();
                  // This would navigate to blog post in a real app
                  alert('Blog post would open here');
                }}>Read More →</a>
              </div>
            </div>
            <div className="blog-card">
              <div className="blog-image">📈</div>
              <div className="blog-content">
                <span className="blog-category">Marketing</span>
                <h3>Effective Digital Marketing Strategies</h3>
                <p>Master the art of digital marketing to reach your target audience and drive conversions.</p>
                <a href="#" className="read-more" onClick={(e) => {
                  e.preventDefault();
                  // This would navigate to blog post in a real app
                  alert('Blog post would open here');
                }}>Read More →</a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="contact-section">
        <div className="container">
          <h2 className="section-title">Get In Touch</h2>
          <div className="contact-content">
            <div className="contact-info">
              <h3>Let's Start Your Journey</h3>
              <p>Ready to transform your business? Contact us today to schedule a consultation and discover how we can help you achieve your goals.</p>
              <div className="contact-details">
                <div className="contact-item">
                  <span className="contact-icon">📧</span>
                  <span>info@nirvista.com</span>
                </div>
                <div className="contact-item">
                  <span className="contact-icon">📱</span>
                  <span>+1 (555) 123-4567</span>
                </div>
                <div className="contact-item">
                  <span className="contact-icon">📍</span>
                  <span>123 Business Ave, Suite 456</span>
                </div>
              </div>
            </div>
            <div className="contact-form">
              <form>
                <input type="text" placeholder="Your Name" required />
                <input type="email" placeholder="Your Email" required />
                <textarea placeholder="Your Message" rows="5" required></textarea>
                <button type="submit" className="submit-button">Send Message</button>
              </form>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="site-footer">
        <div className="container">
          <div className="footer-content">
            <div className="footer-section">
              <h3>Nirvista</h3>
              <p>Transforming businesses through innovative solutions and strategic guidance.</p>
            </div>
            <div className="footer-section">
              <h4>Quick Links</h4>
              <ul>
                <li><a href="#about">About Us</a></li>
                <li><a href="#services">Our Services</a></li>
                <li><a href="#blog">Blog</a></li>
                <li><a href="#contact">Contact</a></li>
              </ul>
            </div>
            <div className="footer-section">
              <h4>Connect</h4>
              <div className="social-links">
                <a href="#" className="social-link">LinkedIn</a>
                <a href="#" className="social-link">Twitter</a>
                <a href="#" className="social-link">Facebook</a>
              </div>
            </div>
          </div>
          <div className="footer-bottom">
            <p>&copy; 2024 Nirvista. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default IndexPage;
