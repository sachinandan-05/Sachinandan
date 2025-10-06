# Quick Customization Guide

This document shows where to update specific information in your portfolio.

## 📝 Personal Information Updates

### Name & Title
- **File:** `app/layout.tsx` (Line 8-10)
- **File:** `components/Hero.tsx` (Line 26-28)
- **File:** `components/Navigation.tsx` (Line 14)
- **File:** `components/Footer.tsx` (Line 31)

### Contact Information
- **Email:** `components/Contact.tsx` (Line 61-63)
- **Phone:** Currently displayed in resume only

### Social Links
**Navigation (Desktop & Mobile):**
- `components/Navigation.tsx` (Lines 48-70, 87-109)

**Footer:**
- `components/Footer.tsx` (Lines 11-14)

**Contact Page:**
- `components/Contact.tsx` (Lines 73-101)

## 🔗 Current Links Set

### Social Profiles
```javascript
GitHub: https://github.com/sachii05
LinkedIn: https://www.linkedin.com/in/sachin-anandan
LeetCode: https://leetcode.com/sachii05
Email: sachinandan.priv05@gmail.com
```

## 🚀 Projects Section

**File:** `components/Projects.tsx`

### Current Projects (Lines 7-44)
1. **ConvoAI - Conversational AI**
   - GitHub: https://github.com/sachii05/convoai
   - Live: https://convoai.vercel.app

2. **Campaign Management System**
   - GitHub: https://github.com/sachii05/campaign-management
   - Live: https://campaign-system.vercel.app

3. **Learning Management System**
   - GitHub: https://github.com/sachii05/lms
   - Live: https://lms-platform.vercel.app

4. **sachii-safe-logger (NPM Package)**
   - GitHub: https://github.com/sachii05/sachii-safe-logger
   - NPM: https://www.npmjs.com/package/sachii-safe-logger

### To Add More Projects
```javascript
{
  title: "Project Name",
  description: "Project description...",
  tags: ["Tech1", "Tech2", "Tech3"],
  image: "🔥", // Emoji icon
  github: "https://github.com/username/repo",
  live: "https://demo-url.com",
  gradient: "from-color-500 to-color-500",
}
```

## 💼 Tech Stack

**File:** `components/TechStack.tsx` (Lines 7-21)

Current technologies displayed:
- JavaScript, TypeScript, Node.js
- React, Next.js, Express.js
- MySQL, MongoDB, PostgreSQL, Redis
- AWS, Docker
- Python, Go, GraphQL

### To Update:
```javascript
{ name: "TechName", icon: "🔥", color: "#HexColor" }
```

## 🎯 Skills Section

**File:** `components/Skills.tsx`

### Backend Development Section (Lines 8-20)
- Title, subtitle, description, details
- 4 feature items with labels and descriptions

### Cloud & DevOps Section (Lines 21-33)
- Title, subtitle, description, details
- 4 feature items with labels and descriptions

## 👤 About Section

**File:** `components/About.tsx`

### Bio Text (Lines 51-68)
Three paragraphs describing your background and expertise

### Highlights/Stats (Lines 7-24)
Four stat cards with icons:
- IIIT Bhopal (Education)
- Top 4% CodeChef
- 99% Uptime
- 10,000+ Users

## 📄 Resume

**Current Location:** `/public/latestResume.pdf`

**Referenced in:**
- `components/Hero.tsx` (Line 81)

To update: Replace the PDF file in the `public` folder and update the filename in Hero.tsx if changed.

## 🎨 Color Scheme

Current gradient colors used:
- Blue to Cyan: `from-blue-500 to-cyan-500`
- Purple to Pink: `from-purple-500 to-pink-500`
- Green to Teal: `from-green-500 to-teal-500`
- Orange to Red: `from-orange-500 to-red-500`
- Blue to Purple: `from-blue-400 to-purple-600`

## 📱 SEO & Metadata

**File:** `app/layout.tsx` (Lines 8-11)

```javascript
export const metadata: Metadata = {
  title: "Sachin Anandan - Full Stack Developer",
  description: "Full Stack Developer specializing in...",
};
```

## 🔧 Development Commands

```bash
# Install dependencies
npm install

# Run development server
npm run dev

# Build for production
npm run build

# Start production server
npm start

# Run linting
npm run lint
```

## 📦 Deployment Checklist

Before deploying:
1. ✅ Update all personal information
2. ✅ Verify all links work correctly
3. ✅ Add your resume PDF to `/public` folder
4. ✅ Test responsive design on mobile
5. ✅ Update project links to actual repositories
6. ✅ Test contact form (if adding backend)
7. ✅ Update meta tags and SEO information
8. ✅ Check all images load properly
9. ✅ Test all navigation links
10. ✅ Run `npm run build` to ensure no errors

## 🌐 Deployment Options

### Vercel (Recommended)
1. Push code to GitHub
2. Import repository on Vercel
3. Deploy with one click

### Netlify
1. Connect GitHub repository
2. Configure build settings
3. Deploy

### GitHub Pages
Use `next export` for static export

---

**Need Help?**
Refer to `README.md` for detailed setup instructions.
