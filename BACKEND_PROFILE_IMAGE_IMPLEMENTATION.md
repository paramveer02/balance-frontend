# Backend Implementation Guide: Profile Image Upload

## Overview
Frontend now supports profile image upload. You need to implement the backend endpoint.

## Required Changes

### 1. User Model/Schema
Add `profileImage` field to your User model:

```javascript
// Example for Mongoose
const userSchema = new mongoose.Schema({
  // ... existing fields
  profileImage: {
    type: String,
    default: null
  }
});
```

### 2. Install Dependencies
```bash
npm install multer
```

### 3. Create Upload Middleware
Create a file for multer configuration (e.g., `middleware/upload.js`):

```javascript
import multer from 'multer';
import path from 'path';

// Configure storage
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'public/uploads/profiles'); // Make sure this directory exists
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    cb(null, 'profile-' + uniqueSuffix + path.extname(file.originalname));
  }
});

// File filter
const fileFilter = (req, file, cb) => {
  const allowedTypes = /jpeg|jpg|png|gif|webp/;
  const extname = allowedTypes.test(path.extname(file.originalname).toLowerCase());
  const mimetype = allowedTypes.test(file.mimetype);

  if (mimetype && extname) {
    return cb(null, true);
  } else {
    cb(new Error('Only image files are allowed!'));
  }
};

// Export multer instance
export const uploadProfileImage = multer({
  storage: storage,
  limits: { fileSize: 5 * 1024 * 1024 }, // 5MB limit
  fileFilter: fileFilter
});
```

### 4. Create the Route & Controller

**Route (e.g., in `routes/userRoutes.js`):**
```javascript
import { uploadProfileImage } from '../middleware/upload.js';
import { updateProfileImage } from '../controllers/userController.js';

router.patch('/profile-image', uploadProfileImage.single('profileImage'), updateProfileImage);
```

**Controller (e.g., in `controllers/userController.js`):**
```javascript
export const updateProfileImage = async (req, res) => {
  try {
    // req.file is provided by multer
    if (!req.file) {
      return res.status(400).json({ 
        success: false, 
        message: 'No image file provided' 
      });
    }

    // Get user ID from authenticated session/token
    const userId = req.user._id; // Adjust based on your auth setup

    // Construct the file path/URL to store in database
    const profileImagePath = `/uploads/profiles/${req.file.filename}`;

    // Update user in database
    const user = await User.findByIdAndUpdate(
      userId,
      { profileImage: profileImagePath },
      { new: true, runValidators: true }
    ).select('-password'); // Don't send password

    res.status(200).json({
      success: true,
      message: 'Profile image updated successfully',
      user: user
    });
  } catch (error) {
    console.error('Error updating profile image:', error);
    res.status(500).json({ 
      success: false, 
      message: 'Failed to update profile image' 
    });
  }
};
```

### 5. Serve Static Files
Make sure your Express app serves static files:

```javascript
import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Serve static files
app.use('/uploads', express.static(path.join(__dirname, 'public/uploads')));
```

### 6. Create Upload Directory
```bash
mkdir -p public/uploads/profiles
```

### 7. Update Current User Endpoint
Make sure `/users/current-user` returns the `profileImage` field:

```javascript
export const getCurrentUser = async (req, res) => {
  const user = await User.findById(req.user._id).select('-password');
  res.status(200).json({ user });
};
```

## CORS Configuration
Update your CORS config to allow credentials and the frontend origin:

```javascript
app.use(cors({
  origin: process.env.FRONTEND_URL || 'http://localhost:5173',
  credentials: true
}));
```

## Environment Variables
Add to your `.env`:
```
FRONTEND_URL=https://your-frontend-domain.com
```

## Testing
1. Deploy backend changes
2. Test upload from frontend profile page
3. Verify image appears after upload
4. Check that image persists on page refresh

## Optional Enhancements
- Use cloud storage (AWS S3, Cloudinary) instead of local storage
- Add image compression/resizing
- Delete old profile image when new one is uploaded
- Add image cropping on frontend before upload
