#!/bin/bash
# Quick MongoDB Atlas Setup Script

# This script helps you:
# 1. Get your MongoDB Atlas connection string
# 2. Update the .env file
# 3. Restart the backend

echo "========================================"
echo "  MongoDB Atlas Connection Setup"
echo "========================================"
echo ""
echo "Your MongoDB Atlas connection string has this format:"
echo "mongodb+srv://USERNAME:PASSWORD@CLUSTER.mongodb.net/lead-capture?retryWrites=true&w=majority"
echo ""
echo "Steps:"
echo "1. Go to: https://www.mongodb.com/cloud/atlas/register"
echo "2. Create free account"
echo "3. Create M0 free cluster"
echo "4. Create database user (remember username & password)"
echo "5. Get connection string from Dashboard > Connect > Drivers"
echo "6. Paste it when asked below"
echo ""
echo "Example string:"
echo "mongodb+srv://admin:myPassword123@cluster0.abc123.mongodb.net/lead-capture?retryWrites=true&w=majority"
echo ""
echo "Ready? Paste your connection string:"
