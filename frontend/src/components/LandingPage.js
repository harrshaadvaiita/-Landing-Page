import React, { useState } from 'react';
import axios from 'axios';
import './LandingPage.css';

function LandingPage() {
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
    <div className="landing-container">
      {/* Header Section */}
      <header className="site-header">
        <div className="header-content">
          <div className="brand-section">
            <h1 className="brand-name">Nirvista</h1>
            <div className="brand-tagline">Your Business Transformation Partner</div>
          </div>
          <nav className="main-nav">
            <a href="#about" className="nav-link">About</a>
            <a href="#services" className="nav-link">Services</a>
            <a href="#contact" className="nav-link">Contact</a>
          </nav>
        </div>
        {/* Tech Blob Decorations */}
        <div className="tech-blobs">
          <div className="blob blob-1"></div>
          <div className="blob blob-2"></div>
          <div className="blob blob-3"></div>
        </div>
      </header>

      <div className="content-wrapper">
        <div className="main-content">
          {/* Left Side - Description */}
          <div className="description-section">
            <div className="content-blobs">
              <div className="content-blob blob-4"></div>
              <div className="content-blob blob-5"></div>
            </div>
            
            <div className="features-grid">
              <div className="feature-card">
                <div className="feature-icon">🚀</div>
                <h3>Startup Solutions</h3>
                <p>Comprehensive strategies for new businesses to establish strong foundations and accelerate growth.</p>
              </div>
              <div className="feature-card">
                <div className="feature-icon">📈</div>
                <h3>Scaling Expertise</h3>
                <p>Proven methodologies to scale your operations efficiently while maintaining quality and customer satisfaction.</p>
              </div>
              <div className="feature-card">
                <div className="feature-icon">💡</div>
                <h3>Innovation Consulting</h3>
                <p>Cutting-edge solutions and innovative approaches to stay ahead in competitive markets.</p>
              </div>
              <div className="feature-card">
                <div className="feature-icon">📊</div>
                <h3>Data Analytics</h3>
                <p>Powerful data-driven insights to make informed decisions and optimize your business performance.</p>
              </div>
            </div>
          </div>

          {/* Right Side - Form */}
          <div className="form-section">
            
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
                            {interest === 'automation' && '⚙️ Automation'}
                            {interest === 'scaling' && '📈 Scaling'}
                            {interest === 'marketing' && '📢 Marketing'}
                            {interest === 'sales' && '💰 Sales'}
                            {interest === 'analytics' && '📊 Analytics'}
                            {interest === 'team-building' && '👥 Team Building'}
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
        </div>

        {message && <div className="success-message">{message}</div>}
        {error && <div className="error-message">{error}</div>}

        <p className="footer-text">
          No credit card required. We respect your privacy.
        </p>
      </div>

      {/* Footer Section */}
      <footer className="site-footer">
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
              <li><a href="#contact">Contact</a></li>
            </ul>
          </div>
          <div className="footer-section">
            <h4>Connect</h4>
            <div className="social-links">
              <a href="#" className="social-link">LinkedIn</a>
              <a href="#" className="social-link">Twitter</a>
              <a href="#" className="social-link">Email</a>
            </div>
          </div>
        </div>
        <div className="footer-bottom">
          <p>&copy; 2024 Nirvista. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}

export default LandingPage;
