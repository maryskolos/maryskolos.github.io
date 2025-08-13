# GitHub Pages Deployment Guide

This guide will walk you through deploying your personal resume website to GitHub Pages.

## Prerequisites

- A GitHub account
- Your website code pushed to a GitHub repository
- Repository name: `maryskolos.github.io` (special name for root domain)

## Step-by-Step Deployment

### 1. Enable GitHub Pages

1. Go to your repository on GitHub
2. Click on **Settings** tab
3. Scroll down to **Pages** section (in the left sidebar)
4. Under **Source**, select **GitHub Actions**
5. Click **Save**

### 2. Push Your Code

The GitHub Actions workflow will automatically trigger when you push to the `main` branch:

```bash
git add .
git commit -m "Configure for GitHub Pages deployment"
git push origin main
```

### 3. Monitor Deployment

1. Go to **Actions** tab in your repository
2. You should see a workflow called "Deploy to GitHub Pages" running
3. Wait for it to complete (usually takes 2-3 minutes)
4. Check the workflow logs if there are any errors

### 4. Access Your Site

Once deployment is complete, your site will be available at:
```
https://maryskolos.github.io
```

## Troubleshooting

### Common Issues

1. **Build Failures**
   - Check the Actions tab for error logs
   - Ensure all dependencies are properly installed
   - Verify Node.js version compatibility (18+)

2. **Permission Errors**
   - The new workflow uses GitHub's official Pages deployment action
   - No need to create gh-pages branch manually
   - Permissions are automatically handled by GitHub

3. **Site Not Loading**
   - Wait a few minutes after deployment (GitHub Pages can take time to propagate)
   - Check if the deployment completed successfully in Actions
   - Verify GitHub Pages is enabled in repository settings

4. **404 Errors**
   - Ensure the base path is correctly set in `next.config.ts` (should be empty for root domain)
   - Check that `trailingSlash: true` is enabled
   - Verify the repository name is exactly `maryskolos.github.io`

### Manual Deployment (Alternative)

If the GitHub Action fails, you can deploy manually:

1. Build the site locally:
   ```bash
   npm run export
   ```

2. Create and switch to gh-pages branch:
   ```bash
   git checkout -b gh-pages
   ```

3. Copy the `out` folder contents to the root:
   ```bash
   cp -r out/* .
   rm -rf out
   ```

4. Commit and push:
   ```bash
   git add .
   git commit -m "Manual deployment"
   git push origin gh-pages
   ```

5. In repository settings, change Pages source to "Deploy from a branch" and select `gh-pages`

## Custom Domain (Optional)

To use a custom domain:

1. Add your domain to the **Custom domain** field in GitHub Pages settings
2. Update the metadata URLs in `src/app/layout.tsx`
3. Add a `CNAME` file in your `public` folder with your domain

## Updating Your Site

To update your deployed site:

1. Make your changes locally
2. Test with `npm run dev`
3. Commit and push to main branch
4. The GitHub Action will automatically rebuild and deploy

## Performance Tips

- The static export generates optimized HTML, CSS, and JavaScript
- Images are served directly from GitHub Pages
- Consider using a CDN for better global performance
- Enable GitHub Pages caching headers if needed

## Support

If you encounter issues:
1. Check the GitHub Actions logs
2. Review the Next.js static export documentation
3. Open an issue in your repository
4. Check GitHub Pages status page for service issues
