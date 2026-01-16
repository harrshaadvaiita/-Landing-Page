# Netlify Deployment Guide

## 🚀 Quick Deployment Steps

### 1. Push Code to GitHub
```bash
git add .
git commit -m "Fix database connection and add Netlify deployment configuration"
git push origin main
```

### 2. Deploy to Netlify

#### Option A: Deploy via Netlify Dashboard (Recommended)
1. Go to [https://app.netlify.com/](https://app.netlify.com/)
2. Click "Add new site" → "Import an existing project"
3. Choose "GitHub" and authorize Netlify
4. Select your repository: **-Landing-Page**
5. Netlify will auto-detect the `netlify.toml` configuration
6. Click "Deploy site"

#### Option B: Deploy via Netlify CLI
```bash
# Install Netlify CLI globally
npm install -g netlify-cli

# Login to Netlify
netlify login

# Deploy from project root
netlify deploy --prod
```

### 3. Verify Deployment
After deployment:
- ✅ Check your Netlify site URL (e.g., `https://your-site.netlify.app`)
- ✅ Test the form submission
- ✅ Verify data is saved to MongoDB

---

## 📋 Configuration Details

### Build Settings (Auto-configured via netlify.toml)
- **Base directory**: `frontend`
- **Build command**: `npm run build`
- **Publish directory**: `frontend/build`
- **Node version**: 18

### Environment Variable
The API URL is pre-configured in `netlify.toml`:
```
REACT_APP_API_URL = "https://lead-capture-backend-uc9v.onrender.com"
```

---

## 🔧 Backend Configuration (Already Done)

Your backend on Render is configured to:
- ✅ Accept requests from Netlify domains (`*.netlify.app`)
- ✅ Handle CORS properly
- ✅ Connect to MongoDB Atlas

---

## 🐛 Troubleshooting

### Issue: Form submission fails
**Solution**: Check browser console for errors. Ensure backend is running on Render.

### Issue: CORS error
**Solution**: Backend is already configured to accept Netlify domains. If you see CORS errors, ensure your Render backend is running.

### Issue: Build fails on Netlify
**Solution**: 
1. Check that all dependencies are listed in `frontend/package.json`
2. Verify Node version compatibility
3. Check Netlify build logs for specific errors

---

## 📊 Monitoring

### View Stored Leads
Access your backend API to view captured leads:
```
https://lead-capture-backend-uc9v.onrender.com/api/leads
```

### MongoDB Atlas Dashboard
Login to [MongoDB Atlas](https://cloud.mongodb.com/) to view your database directly.

---

## 🔄 Future Updates

To deploy updates:
```bash
git add .
git commit -m "Your update message"
git push origin main
```

Netlify will automatically rebuild and deploy your changes! 🎉

---

## 📝 Summary

✅ **Local Development**: Both frontend and backend are working
✅ **Database**: MongoDB Atlas connected successfully
✅ **Backend**: Deployed on Render (already running)
✅ **Frontend**: Ready to deploy on Netlify
✅ **CORS**: Configured to accept Netlify domains

**Next Step**: Push to GitHub and deploy to Netlify using the steps above!
