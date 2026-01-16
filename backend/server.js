require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();

// Middleware
// Allow multiple origins for CORS (local development and deployed sites)
const allowedOrigins = [
  'http://localhost:3000',
  'https://lead-capture-backend-uc9v.onrender.com',
  process.env.FRONTEND_URL
];

app.use(cors({
  origin: function (origin, callback) {
    // Allow requests with no origin (like mobile apps or curl requests)
    if (!origin) return callback(null, true);
    
    // Check if the origin is in the allowed list or matches Netlify pattern
    if (allowedOrigins.includes(origin) || origin.includes('netlify.app')) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true
}));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// MongoDB Connection
const MONGO_URI = process.env.MONGO_URI || 'mongodb://localhost:27017/lead-capture';

console.log('Connecting to MongoDB...');
mongoose.connect(MONGO_URI)
.then(() => {
  console.log('✓ MongoDB connected successfully');
  console.log('✓ Database:', mongoose.connection.name);
})
.catch(err => {
  console.error('✗ MongoDB connection error:', err.message);
  console.error('✗ Please check your MONGO_URI in the .env file');
});

// MongoDB connection event handlers
mongoose.connection.on('error', (err) => {
  console.error('MongoDB connection error:', err);
});

mongoose.connection.on('disconnected', () => {
  console.log('MongoDB disconnected');
});

// Lead Schema
const leadSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Name is required'],
    trim: true
  },
  email: {
    type: String,
    required: [true, 'Email is required'],
    lowercase: true,
    match: [/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/, 'Please provide a valid email']
  },
  phone: {
    type: String,
    required: [true, 'Phone is required'],
    trim: true
  },
  // Q&A Section
  businessStage: {
    type: String,
    enum: ['startup', 'early-stage', 'growth', 'established', 'not-sure'],
    required: true
  },
  businessGoal: {
    type: String,
    required: true,
    trim: true
  },
  businessChallenges: {
    type: String,
    required: true,
    trim: true
  },
  // Preferences/Interests
  interests: {
    type: [String],
    enum: ['automation', 'scaling', 'marketing', 'sales', 'analytics', 'team-building', 'other'],
    default: []
  },
  // Opt-in preferences
  emailUpdates: {
    type: Boolean,
    default: true
  },
  webinarInterest: {
    type: Boolean,
    default: false
  },
  consultationCall: {
    type: Boolean,
    default: false
  },
  leadScore: {
    type: Number,
    default: 0
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

const Lead = mongoose.model('Lead', leadSchema);

// Routes
app.get('/api/health', (req, res) => {
  res.status(200).json({ message: 'Backend is running' });
});

// Create Lead
app.post('/api/leads', async (req, res) => {
  try {
    const { 
      name, 
      email, 
      phone,
      businessStage,
      businessGoal,
      businessChallenges,
      interests,
      emailUpdates,
      webinarInterest,
      consultationCall
    } = req.body;

    // Validation
    if (!name || !email || !phone || !businessStage || !businessGoal || !businessChallenges) {
      return res.status(400).json({
        message: 'All required fields must be filled'
      });
    }

    // Check if email already exists
    const existingLead = await Lead.findOne({ email });
    if (existingLead) {
      return res.status(409).json({
        message: 'This email is already registered'
      });
    }

    // Calculate lead score based on engagement
    let leadScore = 50; // Base score
    if (consultationCall) leadScore += 30;
    if (webinarInterest) leadScore += 20;
    if (interests && interests.length > 0) leadScore += 10;
    if (businessStage === 'growth' || businessStage === 'established') leadScore += 10;

    // Create new lead
    const newLead = new Lead({
      name,
      email,
      phone,
      businessStage,
      businessGoal,
      businessChallenges,
      interests: interests || [],
      emailUpdates,
      webinarInterest,
      consultationCall,
      leadScore
    });

    await newLead.save();

    res.status(201).json({
      message: 'Lead captured successfully',
      leadScore: newLead.leadScore,
      lead: newLead
    });
  } catch (error) {
    console.error('Error creating lead:', error);
    res.status(500).json({
      message: error.message || 'Error creating lead'
    });
  }
});

// Get all leads
app.get('/api/leads', async (req, res) => {
  try {
    const leads = await Lead.find().sort({ createdAt: -1 });
    res.status(200).json({
      count: leads.length,
      leads
    });
  } catch (error) {
    res.status(500).json({
      message: 'Error fetching leads'
    });
  }
});

// Get lead by ID
app.get('/api/leads/:id', async (req, res) => {
  try {
    const lead = await Lead.findById(req.params.id);
    if (!lead) {
      return res.status(404).json({
        message: 'Lead not found'
      });
    }
    res.status(200).json(lead);
  } catch (error) {
    res.status(500).json({
      message: 'Error fetching lead'
    });
  }
});

// Update lead
app.put('/api/leads/:id', async (req, res) => {
  try {
    const { name, email, phone } = req.body;
    const lead = await Lead.findByIdAndUpdate(
      req.params.id,
      { name, email, phone },
      { new: true, runValidators: true }
    );

    if (!lead) {
      return res.status(404).json({
        message: 'Lead not found'
      });
    }

    res.status(200).json({
      message: 'Lead updated successfully',
      lead
    });
  } catch (error) {
    res.status(500).json({
      message: error.message || 'Error updating lead'
    });
  }
});

// Delete lead
app.delete('/api/leads/:id', async (req, res) => {
  try {
    const lead = await Lead.findByIdAndDelete(req.params.id);
    if (!lead) {
      return res.status(404).json({
        message: 'Lead not found'
      });
    }
    res.status(200).json({
      message: 'Lead deleted successfully'
    });
  } catch (error) {
    res.status(500).json({
      message: 'Error deleting lead'
    });
  }
});

// 404 handler
app.use((req, res) => {
  res.status(404).json({
    message: 'Route not found'
  });
});

// Start Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`✓ Server running on http://localhost:${PORT}`);
});
