# Admin Dashboard - Full Stack Portfolio

## 🚀 Overview

Your portfolio is now a **full-stack application** with MongoDB integration! You can manage all content dynamically through the admin dashboard.

## 📁 What's Included

### Database Models
- **Projects**: Manage your portfolio projects
- **Blogs**: Write and publish blog posts
- **TIL (Today I Learned)**: Quick learning notes
- **Hero**: Update hero section content

### API Routes
All CRUD operations are available at:
- `/api/projects` - GET (all), POST (create)
- `/api/projects/[id]` - GET (one), PUT (update), DELETE
- `/api/blogs` - GET (all), POST (create)
- `/api/blogs/[id]` - GET (one), PUT (update), DELETE
- `/api/til` - GET (all), POST (create)
- `/api/til/[id]` - GET (one), PUT (update), DELETE
- `/api/hero` - GET, POST, PUT (update hero section)

## 🔧 Setup

### 1. Environment Variables
Your `.env` file is already configured with:
```
MONGODB_URI=mongodb+srv://...
ADMIN_SECRET=your_secret_admin_key_change_this
```

**⚠️ IMPORTANT**: Change the `ADMIN_SECRET` to a strong password!

### 2. Access Admin Dashboard
Visit: **http://localhost:3000/admin**

No authentication required currently - it's accessible only by you!

## 📊 Using the Admin Dashboard

### Projects Tab
- **Add Project**: Click "+ Add New project" button
- **Edit**: Click edit icon on any project card
- **Delete**: Click delete icon (with confirmation)
- **Fields**:
  - Title
  - Description
  - Technologies (comma-separated)
  - GitHub URL
  - Live Demo URL
  - Image URL
  - Featured checkbox

### Blogs Tab
- **Add Blog**: Click "+ Add New blog" button
- **Fields**:
  - Title
  - Slug (URL-friendly, e.g., "my-first-blog")
  - Excerpt (short description)
  - Content (full content, Markdown supported)
  - Tags (comma-separated)
  - Image URL
  - Published checkbox (draft/published)

### TIL (Today I Learned) Tab
- **Add TIL**: Quick notes about what you learned
- **Fields**:
  - Title
  - Content (what you learned)
  - Category (e.g., "JavaScript", "Docker")
  - Tags (comma-separated)

### Hero Tab
- **Edit Hero Section**: Update your main landing section
- **Fields**:
  - Name
  - Title (e.g., "Full Stack Developer")
  - Description
  - Image URL
  - Social Links (GitHub, LinkedIn, Twitter, Email)

## 🎯 Workflow Example

### Adding a New Project
1. Go to http://localhost:3000/admin
2. Click "Projects" tab
3. Click "+ Add New project"
4. Fill in the form:
   ```
   Title: My Awesome App
   Description: A cool app that does X, Y, Z
   Technologies: React, Node.js, MongoDB
   GitHub: https://github.com/sachinandan-05/my-app
   Live: https://myapp.vercel.app
   Image: /projects/myapp.png
   Featured: ✓
   ```
5. Click "Save"
6. Your project now appears on the Projects page!

### Adding Today I Learned
1. Click "TIL" tab
2. Click "+ Add New til"
3. Fill in:
   ```
   Title: Learned about Docker Volumes
   Content: Docker volumes persist data even when containers are deleted...
   Category: DevOps
   Tags: docker, containers, devops
   ```
4. Click "Save"
5. Entry saved to database!

### Updating Hero Section
1. Click "Hero" tab
2. Update any field (name, title, description, social links)
3. Click "Save Changes"
4. Homepage updates automatically!

## 🔒 Security Notes

**Current Setup**: No authentication (accessible at /admin)

**Recommended for Production**:
1. Add authentication middleware
2. Use the `ADMIN_SECRET` environment variable
3. Implement login page
4. Add session management
5. Deploy with environment variables secured

## 📱 API Testing

You can test APIs using tools like Postman or curl:

### Get All Projects
```bash
curl http://localhost:3000/api/projects
```

### Create Project
```bash
curl -X POST http://localhost:3000/api/projects \
  -H "Content-Type: application/json" \
  -d '{
    "title": "Test Project",
    "description": "A test project",
    "tech": ["React", "Node.js"],
    "github": "https://github.com/...",
    "live": "https://...",
    "featured": true
  }'
```

### Update Project
```bash
curl -X PUT http://localhost:3000/api/projects/[id] \
  -H "Content-Type: application/json" \
  -d '{"title": "Updated Title"}'
```

### Delete Project
```bash
curl -X DELETE http://localhost:3000/api/projects/[id]
```

## 🎨 Features

✅ Full CRUD operations for all content types
✅ MongoDB database integration
✅ Beautiful admin UI with animations
✅ Real-time content management
✅ No page reload needed
✅ Responsive design
✅ Form validation
✅ Delete confirmation
✅ Success/error alerts

## 🚀 Next Steps

1. **Test the Admin Dashboard**: Visit `/admin` and add some content
2. **Update Frontend Components**: Modify components to fetch from API instead of hardcoded data
3. **Add Authentication**: Implement login system for production
4. **Deploy**: Deploy to Vercel with MongoDB Atlas
5. **Backup Database**: Set up regular backups

## 📚 Tech Stack

- **Frontend**: Next.js 14, React, TypeScript, Tailwind CSS, Framer Motion
- **Backend**: Next.js API Routes
- **Database**: MongoDB with Mongoose ODM
- **Icons**: React Icons

## 💡 Tips

- **Images**: Upload images to `/public` folder or use image hosting (Cloudinary, AWS S3)
- **Markdown**: Blog content supports Markdown formatting
- **Tags**: Use comma-separated values for easy filtering later
- **Slugs**: Keep blog slugs unique and URL-friendly (lowercase, hyphens)

## 🐛 Troubleshooting

**MongoDB Connection Error**:
- Check `MONGODB_URI` in `.env`
- Ensure MongoDB cluster allows connections from your IP
- Verify database user permissions

**Data Not Showing**:
- Check browser console for errors
- Verify API routes are working (check Network tab)
- Ensure MongoDB is connected

**Can't Save Data**:
- Check required fields are filled
- Verify MongoDB write permissions
- Check console for validation errors

## 📞 Need Help?

The admin dashboard is ready to use! Just visit `/admin` and start managing your content.

Enjoy your full-stack portfolio! 🎉
