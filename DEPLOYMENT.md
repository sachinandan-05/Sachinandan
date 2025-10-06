# Deployment Guide - Sachin's Portfolio

## 🚀 Quick Deploy to Vercel (Recommended)

### Prerequisites
- GitHub account
- Vercel account (free tier available)

### Steps

1. **Push to GitHub**
   ```bash
   cd /Users/sachii05/Desktop/portfolio
   git init
   git add .
   git commit -m "Initial commit - Portfolio website"
   git branch -M main
   git remote add origin https://github.com/sachii05/portfolio.git
   git push -u origin main
   ```

2. **Deploy to Vercel**
   - Go to [vercel.com](https://vercel.com)
   - Click "New Project"
   - Import your GitHub repository
   - Vercel will auto-detect Next.js settings
   - Click "Deploy"
   - Your site will be live in ~2 minutes!

3. **Custom Domain (Optional)**
   - Go to Project Settings → Domains
   - Add your custom domain
   - Follow DNS configuration instructions

## 📦 Alternative Deployment Options

### Netlify

1. **Via Git**
   ```bash
   # Push to GitHub (same as above)
   ```

2. **Deploy on Netlify**
   - Go to [netlify.com](https://netlify.com)
   - Click "Add new site" → "Import an existing project"
   - Connect to GitHub and select your repository
   - Build settings:
     - Build command: `npm run build`
     - Publish directory: `.next`
   - Click "Deploy"

### AWS Amplify

```bash
# Install Amplify CLI
npm install -g @aws-amplify/cli

# Initialize Amplify
amplify init

# Add hosting
amplify add hosting

# Publish
amplify publish
```

### Docker Deployment

1. **Create Dockerfile** (already configured if using default Next.js setup)

2. **Build and Run**
   ```bash
   docker build -t portfolio .
   docker run -p 3000:3000 portfolio
   ```

3. **Deploy to any cloud provider supporting Docker**

## 🔧 Build Configuration

### Environment Variables (if needed)
Create `.env.local` file:
```env
# Example environment variables
NEXT_PUBLIC_SITE_URL=https://yourdomain.com
NEXT_PUBLIC_ANALYTICS_ID=your-analytics-id
```

### Build Commands
```bash
# Production build
npm run build

# Test production build locally
npm run build && npm start

# Export static site (if needed)
npm run build && npm run export
```

## ✅ Pre-Deployment Checklist

### Required Updates
- [x] Personal information (name, email, links)
- [x] Social media links (GitHub, LinkedIn, LeetCode)
- [x] Projects with actual links and descriptions
- [x] Tech stack matching your skills
- [x] Resume file in `/public` folder
- [ ] Contact form backend (optional - add if needed)

### Testing
- [ ] Test all navigation links
- [ ] Verify all external links open correctly
- [ ] Check responsive design on mobile devices
- [ ] Test resume download
- [ ] Verify all project links work
- [ ] Check for console errors
- [ ] Test on different browsers (Chrome, Firefox, Safari)

### SEO Optimization
- [x] Meta title and description updated
- [ ] Add Open Graph images (optional)
- [ ] Add favicon (place in `/public` folder)
- [ ] Add sitemap.xml (optional)
- [ ] Add robots.txt (optional)

### Performance
- [ ] Run Lighthouse audit
- [ ] Optimize images (if adding custom images)
- [ ] Check Core Web Vitals
- [ ] Test loading speed

## 🌐 DNS Configuration

If using a custom domain:

### Vercel
```
Type: A
Name: @
Value: 76.76.21.21

Type: CNAME
Name: www
Value: cname.vercel-dns.com
```

### Netlify
```
Type: A
Name: @
Value: 75.2.60.5

Type: CNAME
Name: www
Value: your-site-name.netlify.app
```

## 📊 Analytics Setup (Optional)

### Google Analytics
1. Create GA4 property
2. Add tracking code to `app/layout.tsx`
3. Set up in environment variables

### Vercel Analytics
- Enable in Vercel dashboard
- Automatically tracks Core Web Vitals

## 🔒 Security Headers (Vercel)

Create `vercel.json`:
```json
{
  "headers": [
    {
      "source": "/(.*)",
      "headers": [
        {
          "key": "X-Content-Type-Options",
          "value": "nosniff"
        },
        {
          "key": "X-Frame-Options",
          "value": "DENY"
        },
        {
          "key": "X-XSS-Protection",
          "value": "1; mode=block"
        }
      ]
    }
  ]
}
```

## 📱 Progressive Web App (Optional)

To make it a PWA:
1. Add `manifest.json` to `/public`
2. Add service worker
3. Add PWA meta tags

## 🎯 Post-Deployment

### Monitor
- Set up uptime monitoring (e.g., UptimeRobot)
- Enable Vercel/Netlify analytics
- Check error logs regularly

### Update
```bash
# Update content
git add .
git commit -m "Update: description of changes"
git push

# Vercel/Netlify will auto-deploy
```

### Share
- Add portfolio link to resume
- Update LinkedIn profile
- Share on Twitter/X
- Add to GitHub profile README

## 🐛 Troubleshooting

### Build Fails
```bash
# Clear cache and rebuild
rm -rf .next node_modules
npm install
npm run build
```

### Module Not Found
```bash
# Reinstall dependencies
rm -rf node_modules package-lock.json
npm install
```

### Deployment Issues
- Check build logs in deployment platform
- Verify all environment variables are set
- Ensure `package.json` scripts are correct

## 📞 Support Resources

- Next.js Docs: https://nextjs.org/docs
- Vercel Docs: https://vercel.com/docs
- Netlify Docs: https://docs.netlify.com

## 🎉 Your Portfolio URLs

After deployment, your portfolio will be available at:
- **Vercel:** `https://portfolio-username.vercel.app`
- **Netlify:** `https://portfolio-username.netlify.app`
- **Custom Domain:** `https://yourdomain.com` (if configured)

---

**Ready to Deploy?** 
Follow the Vercel quick deploy steps above - your portfolio will be live in minutes!

**Current Status:**
- ✅ Development server running: http://localhost:3000
- ✅ No build errors
- ✅ All content updated with your information
- ✅ Resume file included
- ✅ Ready for deployment!
