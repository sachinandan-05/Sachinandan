# Cloudinary Integration Setup Guide

## Overview
This portfolio now uses Cloudinary for image storage and management. Images are automatically uploaded to Cloudinary when you use the admin dashboard.

## Setup Instructions

### 1. Create a Cloudinary Account

1. Go to [https://cloudinary.com/](https://cloudinary.com/)
2. Click "Sign Up for Free"
3. Complete the registration process

### 2. Get Your Cloudinary Credentials

1. After logging in, go to your **Dashboard**
2. You'll see your account details:
   - **Cloud Name**
   - **API Key**
   - **API Secret**

### 3. Update Your .env File

Open your `.env` file and update the Cloudinary credentials:

```env
MONGODB_URI=mongodb+srv://...
ADMIN_SECRET=your_secret_admin_key_change_this

# Cloudinary Configuration
NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME=your_cloud_name_here
CLOUDINARY_API_KEY=your_api_key_here
CLOUDINARY_API_SECRET=your_api_secret_here
```

Replace:
- `your_cloud_name_here` with your Cloud Name
- `your_api_key_here` with your API Key
- `your_api_secret_here` with your API Secret

### 4. Restart Your Development Server

After updating the .env file:

```bash
# Stop the current server (Ctrl+C)
# Then restart it
npm run dev
```

## Features

### Image Upload in Admin Dashboard

The admin dashboard now has drag-and-drop image upload fields for:

1. **Projects** - Upload project screenshots/thumbnails
2. **Blogs** - Upload blog cover images
3. **Hero Section** - Upload profile image

### How to Use

1. Go to `/admin` in your browser
2. Click on any tab (Projects, Blogs, or Hero)
3. When adding/editing content:
   - Click on the image upload area
   - Select an image from your computer
   - The image will automatically upload to Cloudinary
   - The URL will be saved to your database

### Image Management

#### Upload Features:
- ✅ Drag and drop support
- ✅ Click to browse files
- ✅ Image preview before saving
- ✅ Loading indicator during upload
- ✅ Remove uploaded image option
- ✅ Accepts PNG, JPG, GIF (up to 10MB)

#### Storage:
- All images are stored in Cloudinary under the `portfolio` folder
- Images are automatically optimized by Cloudinary
- You get free 25 GB storage and 25 GB bandwidth per month

### API Endpoints

#### Upload Image
```
POST /api/upload
Content-Type: multipart/form-data

Body: { file: <File> }

Response: {
  success: true,
  data: {
    secure_url: "https://res.cloudinary.com/...",
    public_id: "portfolio/...",
    ...other metadata
  }
}
```

#### Delete Image
```
DELETE /api/upload?publicId=portfolio/image_id

Response: {
  success: true,
  message: "Image deleted successfully"
}
```

## Cloudinary Dashboard

Access your Cloudinary dashboard to:
- View all uploaded images
- Organize images in folders
- Get image URLs
- Apply transformations
- Monitor usage

## Troubleshooting

### Images not uploading?

1. **Check environment variables**
   ```bash
   # Make sure all three are set in .env
   echo $NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME
   echo $CLOUDINARY_API_KEY
   echo $CLOUDINARY_API_SECRET
   ```

2. **Restart the server** after changing .env
   ```bash
   npm run dev
   ```

3. **Check browser console** for error messages

4. **Verify credentials** in Cloudinary dashboard

### Upload fails with "Invalid credentials"?

- Double-check your API Key and API Secret
- Make sure there are no extra spaces in .env
- Cloud Name should be without `https://` or any URL parts

### Image preview not showing?

- Check if the image uploaded successfully (look in Cloudinary dashboard)
- Verify the secure_url is being saved to your database
- Check browser console for CORS errors

## Free Tier Limits

Cloudinary free tier includes:
- 25 GB Storage
- 25 GB Bandwidth per month
- Up to 25,000 transformations per month
- 2 users

This is more than enough for a personal portfolio!

## Alternative: Keep Using URL Input

If you prefer not to use Cloudinary, you can still:
1. Host images anywhere (GitHub, Imgur, etc.)
2. Manually paste URLs in the admin dashboard
3. The image input fields accept both uploaded images and direct URLs

## Benefits of Cloudinary

✅ **Automatic optimization** - Images are compressed and served in optimal format
✅ **CDN delivery** - Fast loading from anywhere in the world
✅ **Transformations** - Resize, crop, and format images on-the-fly
✅ **Backup** - Your images are safely stored in the cloud
✅ **Easy management** - View and organize all your images in one place

## Next Steps

1. Sign up for Cloudinary (if not done)
2. Update your .env with credentials
3. Restart the dev server
4. Go to `/admin` and try uploading an image!
5. Deploy to production (add env vars to Vercel)

Enjoy your new image upload feature! 🎉
