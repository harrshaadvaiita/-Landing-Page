# MongoDB Atlas Setup Helper for Windows

Write-Host "========================================" -ForegroundColor Cyan
Write-Host "  MongoDB Atlas Connection Setup" -ForegroundColor Cyan
Write-Host "========================================" -ForegroundColor Cyan
Write-Host ""
Write-Host "QUICK SETUP (2 minutes):" -ForegroundColor Yellow
Write-Host ""
Write-Host "1. Visit: https://www.mongodb.com/cloud/atlas/register" -ForegroundColor Green
Write-Host "2. Create free account (email or GitHub)"
Write-Host "3. Create M0 free cluster (AWS, us-east-1)"
Write-Host "4. Create database user:"
Write-Host "   - Username: admin"
Write-Host "   - Password: Create strong password"
Write-Host "5. Network Access > Add IP > 0.0.0.0/0 (Allow all)"
Write-Host "6. Click CONNECT button on cluster"
Write-Host "7. Choose 'Drivers' tab"
Write-Host "8. Copy connection string"
Write-Host ""
Write-Host "CONNECTION STRING FORMAT:" -ForegroundColor Yellow
Write-Host "mongodb+srv://USERNAME:PASSWORD@cluster0.xxxxx.mongodb.net/lead-capture?retryWrites=true&w=majority"
Write-Host ""
Write-Host "PASTE YOUR CONNECTION STRING BELOW:" -ForegroundColor Cyan
$mongoUri = Read-Host "Enter MongoDB URI"

if ($mongoUri -like "*mongodb+srv://*") {
    Write-Host ""
    Write-Host "✓ Valid MongoDB URI detected!" -ForegroundColor Green
    
    # Update .env file
    $envPath = ".\backend\.env"
    $content = Get-Content $envPath
    $newContent = $content -replace "MONGO_URI=.*", "MONGO_URI=$mongoUri"
    
    $newContent | Set-Content $envPath
    
    Write-Host "✓ Updated backend\.env" -ForegroundColor Green
    Write-Host ""
    Write-Host "NEXT STEPS:" -ForegroundColor Yellow
    Write-Host "1. Restart backend server (Ctrl+C then run: npm start)" -ForegroundColor Green
    Write-Host "2. Try submitting a lead in the form"
    Write-Host "3. Check MongoDB Atlas dashboard to see leads saved"
    
} else {
    Write-Host ""
    Write-Host "✗ Invalid URI format" -ForegroundColor Red
    Write-Host "Make sure it starts with 'mongodb+srv://'"
}
