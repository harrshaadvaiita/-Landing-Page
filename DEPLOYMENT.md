# 🚀 Complete Deployment Guide

Deploy your Lead Capture app to production in 30 minutes!

---

## 📋 Prerequisites

- GitHub account (free at https://github.com)
- Render account (free at https://render.com)
- Vercel account (free at https://vercel.com)
- MongoDB Atlas account (free at https://mongodb.com/cloud/atlas)

---

## 🔧 Step 1: MongoDB Atlas Setup (5 minutes)

### 1.1 Create Account & Cluster
1. Visit https://www.mongodb.com/cloud/atlas
2. Click "Try Free"
3. Sign up with email or GitHub
4. Click "Create a Deployment" → "Build a Cluster"
5. Select **M0 (Free Tier)**
6. Choose cloud provider (AWS) and region
7. Click "Create Cluster"
8. Wait 2-3 minutes for initialization

### 1.2 Create Database User
1. Left sidebar → "Database Access"
2. Click "Add New Database User"
3. Username: `leaduser` (or your choice)
4. Password: Generate or create strong password (save this!)
5. Click "Add User"

### 1.3 Whitelist IP Address (Critical!)
1. Left sidebar → "Network Access"
2. Click "Add IP Address"
3. Select "Allow from anywhere" → `0.0.0.0/0`
4. Click "Confirm"

### 1.4 Get Connection String
1. Go to "Databases"
2. Click "Connect" on your cluster
3. Select "Drivers"
4. Copy the connection string:
   ```
   mongodb+srv://leaduser:PASSWORD@cluster0.xxxxx.mongodb.net/?retryWrites=true&w=majority
   ```
5. Replace `PASSWORD` with your database password
6. Change `/?retryWrites` to `/lead-capture?retryWrites`

**Save this string! You'll need it for backend.**

---

## 🐙 Step 2: GitHub Setup (5 minutes)

### 2.1 Initialize Git Repository
```bash
cd "c:\Users\shaga\OneDrive\Desktop\landing page"
git init
git config user.name "Your Name"
git config user.email "your.email@gmail.com"
git add .
git commit -m "Initial commit: Full-stack lead capture app"
```

### 2.2 Create GitHub Repository
1. Visit https://github.com/new
2. Name: `lead-capture` (or your choice)
3. Description: "Lead capture landing page with React & Node.js"
4. **Make it PUBLIC** (important for free tier)
5. Click "Create repository"

### 2.3 Push Code to GitHub
```bash
git remote add origin https://github.com/YOUR_USERNAME/lead-capture.git
git branch -M main
git push -u origin main
```

---

## 🎛️ Step 3: Deploy Backend (Render)

### 3.1 Connect GitHub to Render
1. Visit https://render.com
2. Sign up with GitHub
3. Click "New +" → "Web Service"
4. Click "Connect" next to your `lead-capture` repository
5. Select it when prompted

### 3.2 Configure Backend Service
**Setting** | **Value**
-----------|----------
Name | `lead-capture-backend`
Environment | `Node`
Region | `Oregon` (free)
Branch | `main`
Build Command | `npm install --prefix backend`
Start Command | `node backend/server.js`
Instance Type | `Free`

### 3.3 Add Environment Variables
Click "Environment" tab and add:

**Key** | **Value**
--------|----------
`MONGO_URI` | `mongodb+srv://leaduser:PASSWORD@cluster0.xxxxx.mongodb.net/lead-capture?retryWrites=true&w=majority`
`PORT` | `5000`
`NODE_ENV` | `production`

(Replace PASSWORD and cluster URL with your MongoDB credentials)

### 3.4 Deploy
1. Click "Create Web Service"
2. Wait 2-3 minutes for deployment
3. Once live, you'll see: **"Backend is live at: https://lead-capture-backend.onrender.com"**

**Save this URL! You need it for frontend.**

---

## 🌐 Step 4: Deploy Frontend (Vercel)

### 4.1 Update Frontend API URL
Before deploying, update the backend URL in frontend code:

Open: `c:\Users\shaga\OneDrive\Desktop\landing page\frontend\src\components\LandingPage.js`

Find this line:
```javascript
const API_URL = 'http://localhost:5000'
```

Replace with:
```javascript
const API_URL = 'https://lead-capture-backend.onrender.com'
```

(Use your actual Render backend URL)

### 4.2 Commit Changes
```bash
cd "c:\Users\shaga\OneDrive\Desktop\landing page"
git add .
git commit -m "Update API URL for production"
git push
```

### 4.3 Deploy to Vercel
1. Visit https://vercel.com
2. Sign up with GitHub
3. Click "Import Project"
4. Select your `lead-capture` repository
5. Configure:
   - Framework Preset: **React**
   - Root Directory: `frontend`
   - Build Command: `npm run build`
   - Output Directory: `build`

6. Click "Deploy"
7. Wait 2-3 minutes
8. You'll get a live URL: **https://lead-capture-xxxxxxx.vercel.app**

---

## ✅ Step 5: Testing

### Test Backend API
```bash
curl https://lead-capture-backend.onrender.com/api/health
```

Should return: `{"message":"Backend is running"}`

### Test Lead Submission
1. Visit your Vercel frontend URL
2. Fill in test data
3. Click "Get Started Now"
4. Should see: "✓ Lead captured successfully!"
5. Check MongoDB Atlas dashboard
6. Should see your lead in the database!

---

## 🎯 Final Checklist

- [ ] GitHub repository created and code pushed
- [ ] MongoDB Atlas cluster running with database user
- [ ] Backend deployed to Render with environment variables
- [ ] Frontend deployed to Vercel with correct API URL
- [ ] Form submission tested and working
- [ ] Leads appearing in MongoDB Atlas
- [ ] Live URLs documented

---

## 📱 Live URLs (Save These!)

- **Backend API:** https://lead-capture-backend.onrender.com
- **Frontend:** https://lead-capture-xxxxxxx.vercel.app
- **GitHub:** https://github.com/YOUR_USERNAME/lead-capture
- **MongoDB:** https://cloud.mongodb.com/

---

## 🆘 Troubleshooting

**Issue** | **Solution**
---------|------------
Backend won't start | Check MONGO_URI in Render environment variables |
CORS error | Ensure backend URL in frontend code matches Render URL |
Form not submitting | Clear browser cache, check console (F12) for errors |
MongoDB connection fails | Verify IP is whitelisted (0.0.0.0/0) in Network Access |
Deployment fails | Check build logs in Render/Vercel dashboard |

---

## 🎉 You're Live!

Your full-stack lead capture app is now deployed and ready to capture leads!

**Share your frontend URL with others to start collecting leads.**
