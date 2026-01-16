# MongoDB Atlas Setup Guide - 5 Minutes

## Step 1: Create MongoDB Atlas Account
1. Go to: https://www.mongodb.com/cloud/atlas
2. Click "Try Free"
3. Sign up with email (or GitHub)
4. Verify your email

## Step 2: Create a Cluster
1. After signing in, click "Create a Database"
2. Select "Free Tier" (M0 cluster)
3. Cloud provider: AWS
4. Region: Choose closest to you (e.g., us-east-1)
5. Click "Create"
6. Wait 2-3 minutes for cluster to initialize

## Step 3: Create Database User
1. Go to "Database Access" in left sidebar
2. Click "Add New Database User"
3. Username: `admin` (or any username)
4. Password: Generate strong password or create one
5. Click "Add User"

## Step 4: Get Connection String
1. Go to "Databases" in left sidebar
2. Click "Connect" button on your cluster
3. Select "Drivers"
4. Copy the connection string (looks like: `mongodb+srv://admin:password@cluster.mongodb.net/?retryWrites=true&w=majority`)

## Step 5: Configure Backend
1. Replace the connection string below in backend/.env:
   ```
   MONGO_URI=mongodb+srv://username:password@cluster0.xxxxx.mongodb.net/lead-capture?retryWrites=true&w=majority
   ```
2. Restart the backend server

## Step 6: Whitelist IP Address (Important!)
1. In MongoDB Atlas, go to "Network Access"
2. Click "Add IP Address"
3. Choose "Allow Access from Anywhere" (0.0.0.0/0)
4. Click "Confirm"

Done! Your MongoDB is ready.
