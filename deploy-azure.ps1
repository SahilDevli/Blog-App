# Azure Static Web Apps Deployment Script
# Run this script after installing Azure CLI

Write-Host "=====================================" -ForegroundColor Cyan
Write-Host "Azure Static Web Apps Deployment" -ForegroundColor Cyan
Write-Host "=====================================" -ForegroundColor Cyan
Write-Host ""

# Check if Azure CLI is installed
try {
    $azVersion = az version --output json | ConvertFrom-Json
    Write-Host "✓ Azure CLI version: $($azVersion.'azure-cli')" -ForegroundColor Green
} catch {
    Write-Host "✗ Azure CLI is not installed" -ForegroundColor Red
    Write-Host "Please install from: https://aka.ms/installazurecliwindows" -ForegroundColor Yellow
    exit 1
}

Write-Host ""
Write-Host "Step 1: Login to Azure" -ForegroundColor Yellow
Write-Host "======================================" -ForegroundColor Yellow
az login

Write-Host ""
Write-Host "Step 2: Set subscription (if you have multiple)" -ForegroundColor Yellow
Write-Host "======================================" -ForegroundColor Yellow
az account list --output table
Write-Host ""
$subscriptionId = Read-Host "Enter your subscription ID (or press Enter to use default)"
if ($subscriptionId) {
    az account set --subscription $subscriptionId
}

Write-Host ""
Write-Host "Step 3: Configure deployment" -ForegroundColor Yellow
Write-Host "======================================" -ForegroundColor Yellow
$appName = Read-Host "Enter app name (e.g., blog-web-app-sahil)"
$resourceGroup = Read-Host "Enter resource group name (e.g., blog-app-rg)"
$location = Read-Host "Enter location (e.g., eastus2, westeurope, centralus)"

Write-Host ""
Write-Host "Step 4: Create resource group" -ForegroundColor Yellow
Write-Host "======================================" -ForegroundColor Yellow
az group create --name $resourceGroup --location $location

Write-Host ""
Write-Host "Step 5: Create Static Web App" -ForegroundColor Yellow
Write-Host "======================================" -ForegroundColor Yellow
Write-Host "This will create the app and configure GitHub integration..." -ForegroundColor Cyan

$result = az staticwebapp create `
    --name $appName `
    --resource-group $resourceGroup `
    --source "https://github.com/SahilDevli/Blog-App" `
    --location $location `
    --branch main `
    --app-location "/" `
    --output-location "dist" `
    --login-with-github

Write-Host ""
Write-Host "=====================================" -ForegroundColor Green
Write-Host "Deployment Initiated Successfully!" -ForegroundColor Green
Write-Host "=====================================" -ForegroundColor Green
Write-Host ""
Write-Host "Your app will be available at:" -ForegroundColor Cyan
Write-Host "https://$appName.azurestaticapps.net" -ForegroundColor White
Write-Host ""
Write-Host "GitHub Actions will now build and deploy your app." -ForegroundColor Yellow
Write-Host "Check deployment status at: https://github.com/SahilDevli/Blog-App/actions" -ForegroundColor Yellow
Write-Host ""
Write-Host "First deployment takes 3-5 minutes." -ForegroundColor Cyan
Write-Host ""
