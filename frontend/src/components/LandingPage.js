import React, { useState } from 'react';
import axios from 'axios';
import './LandingPage.css';

function LandingPage() {
  const [activeSection, setActiveSection] = useState('home');

  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
    setActiveSection(sectionId);
  };

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    businessStage: '',
    businessGoal: '',
    businessChallenges: '',
    interests: [],
    emailUpdates: true,
    webinarInterest: false,
    consultationCall: false
  });
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const [step, setStep] = useState(1); // Multi-step form

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value
    });
  };

  const handleInterestChange = (interest) => {
    setFormData({
      ...formData,
      interests: formData.interests.includes(interest)
        ? formData.interests.filter(i => i !== interest)
        : [...formData.interests, interest]
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setMessage('');

    try {
      const API_URL = process.env.REACT_APP_API_URL || 'https://lead-capture-backend-uc9v.onrender.com';
      const response = await axios.post(
        `${API_URL}/api/leads`,
        formData,
        {
          headers: {
            'Content-Type': 'application/json'
          }
        }
      );

      if (response.status === 201) {
        const leadScore = response.data.leadScore;
        const scoreMessage = 
          leadScore >= 100 ? '🔥 HOT LEAD' : 
          leadScore >= 80 ? '👍 QUALIFIED LEAD' : 
          '📧 INTERESTED LEAD';
        
        setMessage(`✓ Captured! ${scoreMessage}`);
        setFormData({
          name: '',
          email: '',
          phone: '',
          businessStage: '',
          businessGoal: '',
          businessChallenges: '',
          interests: [],
          emailUpdates: true,
          webinarInterest: false,
          consultationCall: false
        });
        setStep(1);

        setTimeout(() => {
          setMessage('');
        }, 5000);
      }
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to submit. Please try again.');
      setTimeout(() => {
        setError('');
      }, 5000);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="landing-page">
      {/* Navigation Bar */}
      <nav className="navbar">
        <div className="nav-container">
          <div className="nav-logo">
            <h2>🌟 Nirvista</h2>
          </div>
          <ul className="nav-menu">
            <li className="nav-item">
              <button 
                className={`nav-link ${activeSection === 'home' ? 'active' : ''}`}
                onClick={() => scrollToSection('home')}
              >
                Home
              </button>
            </li>
            <li className="nav-item">
              <button 
                className={`nav-link ${activeSection === 'about' ? 'active' : ''}`}
                onClick={() => scrollToSection('about')}
              >
                About
              </button>
            </li>
            <li className="nav-item">
              <button 
                className={`nav-link ${activeSection === 'tech' ? 'active' : ''}`}
                onClick={() => scrollToSection('tech')}
              >
                Technologies
              </button>
            </li>
            <li className="nav-item">
              <button 
                className={`nav-link ${activeSection === 'blogs' ? 'active' : ''}`}
                onClick={() => scrollToSection('blogs')}
              >
                Blogs
              </button>
            </li>
            <li className="nav-item">
              <button 
                className={`nav-link ${activeSection === 'contact' ? 'active' : ''}`}
                onClick={() => scrollToSection('contact')}
              >
                Contact
              </button>
            </li>
          </ul>
        </div>
      </nav>

      {/* Hero Section */}
      <section id="home" className="hero-section">
        <div className="hero-content">
          <h1 className="hero-title">Transform Your Business</h1>
          <p className="hero-subtitle">Join thousands of successful entrepreneurs who are scaling their ventures. Tell us about your goals and we'll help you succeed.</p>
          <button 
            className="cta-hero-button"
            onClick={() => scrollToSection('contact')}
          >
            Get Started Now
          </button>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="about-section">
        <div className="container">
          <h2 className="section-title">About Our Company</h2>
          <div className="about-grid">
            <div className="about-card">
              <div className="about-icon">🎯</div>
              <h3>Our Mission</h3>
              <p>We empower businesses to reach their full potential through innovative solutions and strategic guidance. Our mission is to be the catalyst for your business transformation.</p>
            </div>
            <div className="about-card">
              <div className="about-icon">📈</div>
              <h3>Our Vision</h3>
              <p>To create a world where every business has the tools and knowledge to scale efficiently and sustainably, making entrepreneurship accessible to everyone.</p>
            </div>
            <div className="about-card">
              <div className="about-icon">🏆</div>
              <h3>Our Values</h3>
              <p>Innovation, Integrity, Customer Success, and Continuous Learning. These values guide everything we do and how we serve our clients.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Technologies Section */}
      <section id="tech" className="tech-section">
        <div className="container">
          <h2 className="section-title">Technologies We Use</h2>
          <div className="tech-grid">
            <div className="tech-category">
              <h3>💻 Frontend</h3>
              <div className="tech-items">
                <span className="tech-tag">⚛️ React</span>
                <span className="tech-tag">⚡ JavaScript</span>
                <span className="tech-tag">🎨 CSS3</span>
                <span className="tech-tag">📄 HTML5</span>
                <span className="tech-tag">🌈 Tailwind</span>
              </div>
            </div>
            <div className="tech-category">
              <h3>🔧 Backend</h3>
              <div className="tech-items">
                <span className="tech-tag">🟢 Node.js</span>
                <span className="tech-tag">🚀 Express</span>
                <span className="tech-tag">🗄️ MongoDB</span>
                <span className="tech-tag">🔗 REST API</span>
                <span className="tech-tag">🔐 JWT</span>
              </div>
            </div>
            <div className="tech-category">
              <h3>☁️ DevOps</h3>
              <div className="tech-items">
                <span className="tech-tag">🐳 Docker</span>
                <span className="tech-tag">/aws AWS</span>
                <span className="tech-tag">⚡ Render</span>
                <span className="tech-tag">🌐 Netlify</span>
                <span className="tech-tag">⚡ Vercel</span>
              </div>
            </div>
            <div className="tech-category">
              <h3>🛠️ Tools</h3>
              <div className="tech-items">
                <span className="tech-tag">🐙 Git</span>
                <span className="tech-tag">💻 VS Code</span>
                <span className="tech-tag">📮 Postman</span>
                <span className="tech-tag">📦 npm</span>
                <span className="tech-tag">📡 axios</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Blogs Section */}
      <section id="blogs" className="blogs-section">
        <div className="container">
          <h2 className="section-title">Latest Blogs</h2>
          <div className="blogs-grid">
            <div className="blog-card">
              <div className="blog-icon">📝</div>
              <h3>Business Automation Tips</h3>
              <p>Learn how to automate your business processes and save time. From simple email workflows to complex customer relationship management systems, automation can transform your daily operations. Discover the best tools and strategies to implement automation in your business today.</p>
            </div>
            <div className="blog-card">
              <div className="blog-icon">📊</div>
              <h3>Growth Analytics</h3>
              <p>Discover the key metrics that matter for your business growth. Understanding your data is crucial for making informed decisions. Learn how to track customer acquisition costs, lifetime value, conversion rates, and other essential KPIs that will drive your business forward.</p>
            </div>
            <div className="blog-card">
              <div className="blog-icon">💡</div>
              <h3>Innovation Strategies</h3>
              <p>Explore innovative approaches to stay ahead of the competition. In today's fast-paced market, innovation is not just an advantage—it's a necessity. Find out how to foster a culture of innovation within your team and implement cutting-edge solutions that set you apart from the crowd.</p>
            </div>
            <div className="blog-card">
              <div className="blog-icon">🚀</div>
              <h3>Scaling Your Business</h3>
              <p>Practical steps to scale your business efficiently and sustainably. Whether you're a startup looking to expand or an established company aiming for new markets, scaling requires careful planning and execution. Learn the proven strategies that successful companies use to grow without compromising quality or customer satisfaction.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="contact-section">
        <div className="form-only-container">
          <div className="form-wrapper">
            <div className="form-hero">
              <h1 className="form-main-heading">Transform Your Business</h1>
              <p className="form-sub-heading">Join thousands of successful entrepreneurs who are scaling their ventures. Tell us about your goals and we'll help you succeed.</p>
            </div>
            <form className="lead-form" onSubmit={handleSubmit}>
              {/* Step 1: Basic Info */}
              {step === 1 && (
                <div className="form-step">
                  <h3 className="step-title">Step 1: Basic Information</h3>
                  
                  <div className="form-group">
                    <input
                      type="text"
                      name="name"
                      placeholder="Your Full Name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                      className="form-input"
                      disabled={loading}
                    />
                  </div>

                  <div className="form-group">
                    <input
                      type="email"
                      name="email"
                      placeholder="Your Email Address"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      className="form-input"
                      disabled={loading}
                    />
                  </div>

                  <div className="form-group">
                    <input
                      type="tel"
                      name="phone"
                      placeholder="Your Phone Number"
                      value={formData.phone}
                      onChange={handleChange}
                      required
                      className="form-input"
                      disabled={loading}
                    />
                  </div>

                  <button
                    type="button"
                    className="nav-button next-button"
                    onClick={() => setStep(2)}
                    disabled={!formData.name || !formData.email || !formData.phone}
                  >
                    Next →
                  </button>
                </div>
              )}

              {/* Step 2: Business Questions */}
              {step === 2 && (
                <div className="form-step">
                  <h3 className="step-title">Step 2: Tell Us About Your Business</h3>
                  
                  <div className="form-group">
                    <label>What stage is your business at?</label>
                    <select
                      name="businessStage"
                      value={formData.businessStage}
                      onChange={handleChange}
                      required
                      className="form-select"
                      disabled={loading}
                    >
                      <option value="">Select...</option>
                      <option value="startup">🚀 Startup (Just started)</option>
                      <option value="early-stage">📈 Early-stage (1-2 years)</option>
                      <option value="growth">💪 Growth (Scaling fast)</option>
                      <option value="established">🏆 Established (5+ years)</option>
                      <option value="not-sure">❓ Not sure</option>
                    </select>
                  </div>

                  <div className="form-group">
                    <label>What's your main business goal?</label>
                    <textarea
                      name="businessGoal"
                      placeholder="e.g., Increase sales by 50%, Reduce costs, Expand to new markets..."
                      value={formData.businessGoal}
                      onChange={handleChange}
                      required
                      className="form-textarea"
                      disabled={loading}
                      rows="3"
                    />
                  </div>

                  <div className="form-group">
                    <label>What are your biggest challenges?</label>
                    <textarea
                      name="businessChallenges"
                      placeholder="e.g., Limited team, Manual processes, Customer retention..."
                      value={formData.businessChallenges}
                      onChange={handleChange}
                      required
                      className="form-textarea"
                      disabled={loading}
                      rows="3"
                    />
                  </div>

                  <div className="button-group">
                    <button
                      type="button"
                      className="nav-button back-button"
                      onClick={() => setStep(1)}
                      disabled={loading}
                    >
                      ← Back
                    </button>
                    <button
                      type="button"
                      className="nav-button next-button"
                      onClick={() => setStep(3)}
                      disabled={!formData.businessStage || !formData.businessGoal || !formData.businessChallenges}
                    >
                      Next →
                    </button>
                  </div>
                </div>
              )}

              {/* Step 3: Interests & Preferences */}
              {step === 3 && (
                <div className="form-step">
                  <h3 className="step-title">Step 3: Your Interests & Preferences</h3>
                  
                  <div className="form-group">
                    <label>What are you interested in?</label>
                    <div className="interests-grid">
                      {['automation', 'scaling', 'marketing', 'sales', 'analytics', 'team-building'].map(interest => (
                        <label key={interest} className="interest-checkbox">
                          <input
                            type="checkbox"
                            checked={formData.interests.includes(interest)}
                            onChange={() => handleInterestChange(interest)}
                            disabled={loading}
                          />
                          <span className="interest-label">
                            {interest === 'automation' && 'Automation'}
                            {interest === 'scaling' && 'Scaling'}
                            {interest === 'marketing' && 'Marketing'}
                            {interest === 'sales' && 'Sales'}
                            {interest === 'analytics' && 'Analytics'}
                            {interest === 'team-building' && 'Team Building'}
                          </span>
                        </label>
                      ))}
                    </div>
                  </div>

                  <div className="preferences-section">
                    <label className="preference-checkbox">
                      <input
                        type="checkbox"
                        name="emailUpdates"
                        checked={formData.emailUpdates}
                        onChange={handleChange}
                        disabled={loading}
                      />
                      <span>📧 Send me valuable tips and updates</span>
                    </label>

                    <label className="preference-checkbox">
                      <input
                        type="checkbox"
                        name="webinarInterest"
                        checked={formData.webinarInterest}
                        onChange={handleChange}
                        disabled={loading}
                      />
                      <span>🎓 I'm interested in webinars</span>
                    </label>

                    <label className="preference-checkbox">
                      <input
                        type="checkbox"
                        name="consultationCall"
                        checked={formData.consultationCall}
                        onChange={handleChange}
                        disabled={loading}
                      />
                      <span>📞 Schedule a consultation call</span>
                    </label>
                  </div>

                  <div className="button-group">
                    <button
                      type="button"
                      className="nav-button back-button"
                      onClick={() => setStep(2)}
                      disabled={loading}
                    >
                      ← Back
                    </button>
                    <button
                      type="submit"
                      className="cta-button"
                      disabled={loading}
                    >
                      {loading ? 'Submitting...' : '🚀 Get Started Now'}
                    </button>
                  </div>
                </div>
              )}
            </form>
          </div>

          {message && <div className="success-message">{message}</div>}
          {error && <div className="error-message">{error}</div>}
        </div>
      </section>

      {/* Footer Section */}
      <footer className="footer-section">
        <div className="container">
          <div className="footer-grid">
            <div className="footer-column">
              <h3>🌟 Nirvista</h3>
              <p>Empowering businesses through innovative solutions and strategic guidance. We help entrepreneurs transform their visions into successful ventures.</p>
              <div className="footer-social">
                <button type="button" className="social-link">📧 Email</button>
                <button type="button" className="social-link">💼 LinkedIn</button>
                <button type="button" className="social-link">🐦 Twitter</button>
              </div>
            </div>
            <div className="footer-column">
              <h4>Quick Links</h4>
              <ul className="footer-links">
                <li><button type="button" onClick={() => scrollToSection('home')}>Home</button></li>
                <li><button type="button" onClick={() => scrollToSection('about')}>About Us</button></li>
                <li><button type="button" onClick={() => scrollToSection('tech')}>Technologies</button></li>
                <li><button type="button" onClick={() => scrollToSection('blogs')}>Blogs</button></li>
                <li><button type="button" onClick={() => scrollToSection('contact')}>Contact</button></li>
              </ul>
            </div>
            <div className="footer-column">
              <h4>Services</h4>
              <ul className="footer-links">
                <li>Business Consulting</li>
                <li>Technology Solutions</li>
                <li>Growth Strategy</li>
                <li>Automation Services</li>
                <li>Web Development</li>
              </ul>
            </div>
            <div className="footer-column">
              <h4>Contact Info</h4>
              <div className="footer-contact">
                <p>📍 123 Business Ave, Tech City</p>
                <p>📞 +1 (555) 123-4567</p>
                <p>✉️ info@nirvista.com</p>
                <p>⏰ Mon-Fri: 9AM - 6PM</p>
              </div>
            </div>
          </div>
          <div className="footer-bottom">
            <p>&copy; 2026 Nirvista. All rights reserved. | Privacy Policy | Terms of Service</p>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default LandingPage;
