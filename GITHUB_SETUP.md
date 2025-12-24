# GitHub Remote Repository Setup Instructions

## Step 1: Create GitHub Repository

1. Go to [GitHub.com](https://github.com) and sign in
2. Click the "+" icon in the top right corner
3. Select "New repository"
4. Fill in the repository details:
   - **Repository name**: `tokyo-weather-forecast-app`
   - **Description**: "Weather forecast app for Tokyo wards and cities"
   - **Public** or **Private** (your choice)
   - **DO NOT** initialize with README, .gitignore, or license (we already have these)
5. Click "Create repository"

## Step 2: Connect Local Repository to GitHub

After creating the GitHub repository, run these commands in your terminal:

```bash
# Add the remote origin (replace YOUR_USERNAME with your GitHub username)
git remote add origin https://github.com/YOUR_USERNAME/tokyo-weather-forecast-app.git

# Push your code to GitHub
git branch -M main
git push -u origin main
```

## Step 3: Verify Upload

1. Refresh your GitHub repository page
2. You should see all your files uploaded successfully
3. The README.md will be automatically displayed on the repository page

## Repository Contents

Your repository will contain:
- `index.html` - Main HTML structure
- `style.css` - Responsive CSS styling
- `app.js` - JavaScript functionality for weather data
- `README.md` - Setup and usage instructions
- `.gitignore` - Git ignore file for sensitive data

## Next Steps

1. Set up your OpenWeatherMap API key in `app.js`
2. Test the application locally
3. Consider adding more features or improvements