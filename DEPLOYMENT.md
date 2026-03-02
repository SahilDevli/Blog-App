# Azure Static Web Apps Deployment Guide

This guide will help you deploy the Blog Web App to Azure Static Web Apps.

## Prerequisites

- Azure account (sign up at https://azure.microsoft.com/free/)
- GitHub repository with the code (already set up at https://github.com/SahilDevli/Blog-App.git)
- Azure CLI (optional, for command-line deployment)

## Deployment Steps

### Option 1: Deploy via Azure Portal (Recommended for First Time)

1. **Sign in to Azure Portal**
   - Go to https://portal.azure.com
   - Sign in with your Azure account

2. **Create a Static Web App**
   - Click "Create a resource"
   - Search for "Static Web App"
   - Click "Create"

3. **Configure Basic Settings**
   - **Subscription**: Select your Azure subscription
   - **Resource Group**: Create new or select existing (e.g., "blog-app-rg")
   - **Name**: Choose a unique name (e.g., "blog-web-app-sahil")
   - **Plan type**: Select "Free" for development/testing
   - **Region**: Choose closest region (e.g., "East US 2", "West Europe")
   - **Deployment source**: Select "GitHub"

4. **Authorize GitHub**
   - Click "Sign in with GitHub"
   - Authorize Azure Static Web Apps to access your repositories

5. **Configure Build Details**
   - **Organization**: SahilDevli
   - **Repository**: Blog-App
   - **Branch**: main
   - **Build Presets**: Select "React"
   - **App location**: `/` (root directory)
   - **Api location**: Leave empty
   - **Output location**: `dist`

6. **Review and Create**
   - Click "Review + create"
   - Review your configuration
   - Click "Create"

7. **Wait for Deployment**
   - Azure will create the resource (~2-3 minutes)
   - GitHub Actions workflow will automatically trigger
   - First deployment takes ~3-5 minutes

8. **Access Your App**
   - Once deployed, you'll see a URL like: `https://blog-web-app-sahil.azurestaticapps.net`
   - Click the URL to view your live application

### Option 2: Deploy via Azure CLI

```bash
# Login to Azure
az login

# Create resource group
az group create --name blog-app-rg --location eastus2

# Create static web app
az staticwebapp create \
  --name blog-web-app-sahil \
  --resource-group blog-app-rg \
  --source https://github.com/SahilDevli/Blog-App \
  --location eastus2 \
  --branch main \
  --app-location "/" \
  --output-location "dist" \
  --login-with-github
```

## Post-Deployment Configuration

### Custom Domain (Optional)

1. Go to your Static Web App in Azure Portal
2. Click "Custom domains" in the left menu
3. Click "Add custom domain"
4. Follow the DNS verification steps
5. Add your custom domain

### Environment Variables (If Needed)

1. Go to your Static Web App in Azure Portal
2. Click "Configuration" in the left menu
3. Add application settings as needed
4. Restart the app

## GitHub Actions Workflow

The deployment is automated via GitHub Actions. The workflow file is located at:
`.github/workflows/azure-static-web-apps.yml`

### Viewing Deployment Status

1. Go to your GitHub repository: https://github.com/SahilDevli/Blog-App
2. Click on "Actions" tab
3. View the deployment workflow runs
4. Check logs for any issues

### Secrets Required

The workflow uses a secret named `AZURE_STATIC_WEB_APPS_API_TOKEN` which is automatically created by Azure when you set up the Static Web App through the portal.

## Redeployment

Any push to the `main` branch will automatically trigger a new deployment via GitHub Actions.

```bash
# Make changes to your code
git add .
git commit -m "Update: description of changes"
git push origin main
```

## Configuration Files

- **`.github/workflows/azure-static-web-apps.yml`**: GitHub Actions workflow for CI/CD
- **`staticwebapp.config.json`**: Azure Static Web Apps configuration (routing, headers, etc.)

## Build Configuration

The app uses Vite with the following build settings:
- **Build command**: `npm run build` (defined in package.json)
- **Output directory**: `dist`
- **Node version**: 18.x (default in Azure)

## Troubleshooting

### Build Fails
- Check GitHub Actions logs for error messages
- Verify all dependencies are in package.json
- Ensure build command works locally: `npm run build`

### App Not Loading
- Check browser console for errors
- Verify `staticwebapp.config.json` routing rules
- Check if dist folder is being generated correctly

### Environment Issues
- Clear browser cache and try again
- Check if localStorage is enabled in browser
- Verify API tokens/secrets are correctly set

### Theme Not Working
- Ensure Tailwind CSS is properly configured
- Check that `darkMode: 'class'` is in tailwind.config.js
- Verify CSS is being loaded correctly

## Monitoring and Analytics

1. Go to your Static Web App in Azure Portal
2. Click "Metrics" to view traffic and performance
3. Use "Log Analytics" for detailed logging (requires setup)

## Costs

- **Free Tier**: Includes:
  - 100 GB bandwidth per month
  - 0.5 GB storage
  - 2 custom domains
  - Free SSL certificates
  - Automatic HTTPS
  - GitHub integration

- **Standard Tier**: For production apps with higher traffic

## Support

For issues or questions:
- Azure Documentation: https://docs.microsoft.com/azure/static-web-apps/
- GitHub Issues: https://github.com/SahilDevli/Blog-App/issues
- Azure Support: https://azure.microsoft.com/support/

## Next Steps After Deployment

1. ✅ Test all features in production environment
2. ✅ Set up custom domain (if desired)
3. ✅ Configure monitoring and alerts
4. ✅ Set up staging environments (optional)
5. ✅ Enable Application Insights for analytics (optional)

---

**Your app will be live at**: `https://<your-app-name>.azurestaticapps.net`

Enjoy your deployed Blog Web App! 🚀
