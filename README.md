# Lead Capture Landing Page

A full-stack application for capturing leads with a beautiful landing page and a scalable backend API.

## ✨ Features

- 🎨 Modern, responsive landing page with gradient design
- 📝 Lead capture form (Name, Email, Phone)
- 🚀 Express.js backend API
- 🗄️ MongoDB database integration
- 🌐 CORS enabled for cross-origin requests
- 📱 Mobile-friendly design
- ✅ Form validation
- ⚡ Real-time success/error messages

## 📁 Project Structure

```
├── backend/                    # Node.js/Express API
│   ├── server.js              # Main server file
│   ├── package.json           # Dependencies
│   ├── .env                   # Environment variables
│   └── .gitignore
├── frontend/                   # React Landing Page
│   ├── public/
│   │   └── index.html         # React entry point
│   ├── src/
│   │   ├── App.js             # Main App component
│   │   ├── index.js           # React root
│   │   ├── App.css            # App styles
│   │   ├── index.css          # Global styles
│   │   └── components/
│   │       ├── LandingPage.js # Landing page component
│   │       └── LandingPage.css# Landing page styles
│   ├── package.json           # Dependencies
│   └── .gitignore
├── README.md
├── DEPLOYMENT.md              # Step-by-step deployment guide
└── MONGODB_SETUP.md           # MongoDB Atlas setup
```

## 🚀 Quick Start (Local Development)

### Prerequisites
- Node.js 18+
- npm or yarn

### 1️⃣ Install Dependencies

```bash
# Backend
cd backend
npm install

# Frontend (in new terminal)
cd frontend
npm install
```

### 2️⃣ Start Backend Server
```bash
cd backend
npm start
# Server will run on http://localhost:5000
```

### 3️⃣ Start Frontend Server (in new terminal)
```bash
cd frontend
npm start
# App will open at http://localhost:3000
```

### 4️⃣ Set Up MongoDB Atlas

1. Go to https://www.mongodb.com/cloud/atlas/register
2. Create free account
3. Create M0 free cluster
4. Create database user
5. Allow access from anywhere (Network Access > 0.0.0.0/0)
6. Get connection string
7. Update `backend/.env`:
   ```
   MONGO_URI=mongodb+srv://username:password@cluster0.xxxxx.mongodb.net/lead-capture?retryWrites=true&w=majority
   ```
8. Restart backend server

### 5️⃣ Test the Form
- Visit http://localhost:3000
- Fill out form with test data
- Submit and see success message
- Check MongoDB Atlas dashboard to confirm lead is saved

## 📡 API Endpoints

### POST /api/leads
Create a new lead.

**Request:**
```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "phone": "+1 (555) 123-4567"
}
```

**Response:**
```json
{
  "message": "Lead captured successfully",
  "lead": {
    "_id": "507f1f77bcf86cd799439011",
    "name": "John Doe",
    "email": "john@example.com",
    "phone": "+1 (555) 123-4567",
    "createdAt": "2024-01-16T10:30:00.000Z"
  }
}
```

### GET /api/leads
Get all leads (for testing/admin).

**Response:**
```json
{
  "count": 5,
  "leads": [
    {
      "_id": "507f1f77bcf86cd799439011",
      "name": "John Doe",
      "email": "john@example.com",
      "phone": "+1 (555) 123-4567",
      "createdAt": "2024-01-16T10:30:00.000Z"
    }
  ]
}
```

### GET /api/health
Health check endpoint.

## 🌍 Deployment

See [DEPLOYMENT.md](DEPLOYMENT.md) for complete deployment instructions:
- Deploy Backend to **Render**
- Deploy Frontend to **Vercel**
- Push code to **GitHub**

## 🛠️ Technologies Used

- **Backend:** 
  - Node.js
  - Express.js
  - MongoDB
  - Mongoose
  - CORS
  
- **Frontend:** 
  - React 18
  - Axios
  - CSS3
  - React Scripts

- **Deployment:** 
  - Render (Backend)
  - Vercel (Frontend)
  - GitHub (Source Control)

## 📝 Environment Variables

### Backend (.env)
```
MONGO_URI=mongodb+srv://username:password@cluster.mongodb.net/lead-capture
PORT=5000
NODE_ENV=development
```

### Frontend
Update API_URL in `LandingPage.js` after deploying backend:
```javascript
const API_URL = 'https://your-backend-url.onrender.com';
```

## 🐛 Troubleshooting

| Issue | Solution |
|-------|----------|
| MongoDB connection error | Check connection string in `.env`, ensure IP is whitelisted in MongoDB Atlas |
| CORS error | Verify backend is running, check FRONTEND_URL env variable |
| Form not submitting | Check browser console (F12), verify API_URL is correct |
| Port already in use | Change PORT in `.env` or kill process using port |

## 📄 License

MIT
