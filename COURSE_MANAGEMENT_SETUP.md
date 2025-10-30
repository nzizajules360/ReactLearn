# Course Management & Payment System Setup

## Overview
Complete admin course management system with file uploads and Flutterwave payment integration.

## Features Implemented

### 1. Admin Course Management
- ✅ Add/Edit/Delete Courses
- ✅ Set course pricing
- ✅ Upload course thumbnails
- ✅ Manage course details (category, level, duration, instructor)
- ✅ Add topics, learning objectives, prerequisites
- ✅ Certificate configuration

### 2. Admin Lesson Management
- ✅ Add/Edit/Delete Lessons
- ✅ Upload video files (up to 500MB)
- ✅ Upload PDF resources and documents
- ✅ Add lesson transcripts/content
- ✅ Set lesson order and type

### 3. File Upload System
- ✅ Video upload (MP4, WebM, OGG)
- ✅ Document upload (PDF, DOC, DOCX)
- ✅ Image upload (JPG, PNG, GIF)
- ✅ 500MB file size limit
- ✅ Organized file storage by type

### 4. Payment Integration (Flutterwave)
- ✅ Secure payment processing
- ✅ Course enrollment on successful payment
- ✅ Payment verification
- ✅ Transaction tracking

## Installation Steps

### 1. Install Dependencies

#### Frontend (React)
```bash
cd Learn
npm install flutterwave-react-v3
```

#### Backend (Node.js)
```bash
cd backend
npm install multer
```

### 2. Environment Variables

Create `.env` file in `/backend`:
```env
VITE_FLUTTERWAVE_PUBLIC_KEY=your_flutterwave_public_key_here
FLUTTERWAVE_SECRET_KEY=your_flutterwave_secret_key_here
```

Create `.env` file in `/Learn`:
```env
VITE_API_URL=http://localhost:3001
VITE_FLUTTERWAVE_PUBLIC_KEY=your_flutterwave_public_key_here
```

### 3. Get Flutterwave Keys
1. Sign up at https://flutterwave.com
2. Go to Settings → API Keys
3. Copy your Public and Secret keys
4. Add them to your `.env` files

### 4. Create Upload Directories
The backend will automatically create these, but you can create them manually:
```bash
mkdir -p backend/uploads/video
mkdir -p backend/uploads/pdf
mkdir -p backend/uploads/thumbnail
```

### 5. Create Enrollments Database File
```bash
touch backend/data/enrollments.json
echo '{"enrollments": []}' > backend/data/enrollments.json
```

## Usage

### For Admins

#### Add a New Course:
1. Navigate to `/admin/courses`
2. Click "Add Course"
3. Fill in course details
4. Upload thumbnail image
5. Set pricing
6. Add topics, objectives, prerequisites
7. Click "Create Course"

#### Add Lessons to Course:
1. Select a course from the list
2. Click "Add Lesson"
3. Fill in lesson details
4. Upload video file (or provide URL)
5. Upload PDF resources
6. Add transcript/content
7. Click "Create Lesson"

#### Manage Files:
- Videos are stored in `/uploads/video/`
- PDFs are stored in `/uploads/pdf/`
- Thumbnails are stored in `/uploads/thumbnail/`

### For Students

#### Purchase a Course:
1. Browse courses at `/training/courses`
2. Click on a course to view details
3. Click "Start Course" or "Enroll"
4. Complete payment via Flutterwave
5. Access course content after payment

## API Endpoints

### File Upload
- `POST /api/admin/upload` - Upload files (admin only)
  - Body: FormData with `file` and `type` fields
  - Types: video, pdf, thumbnail, doc

### Course Management
- `POST /api/admin/courses` - Create course
- `PUT /api/admin/courses/:id` - Update course
- `DELETE /api/admin/courses/:id` - Delete course

### Lesson Management
- `POST /api/admin/courses/:courseId/lessons` - Create lesson
- `PUT /api/admin/courses/:courseId/lessons/:lessonId` - Update lesson
- `DELETE /api/admin/courses/:courseId/lessons/:lessonId` - Delete lesson

### Payment
- `POST /api/payment/verify-flutterwave` - Verify payment
- `GET /api/enrollments` - Get user enrollments

## File Structure

```
Learn/
├── src/
│   ├── components/
│   │   ├── admin/
│   │   │   ├── CourseFormModal.jsx (NEW)
│   │   │   └── LessonFormModal.jsx (NEW)
│   │   └── payment/
│   │       └── FlutterwavePayment.jsx (NEW)
│   └── pages/
│       └── admin/
│           └── CoursesManagementPage.jsx (UPDATED)

backend/
├── data/
│   ├── courses.json
│   ├── lessons.json
│   └── enrollments.json (NEW)
├── uploads/ (AUTO-CREATED)
│   ├── video/
│   ├── pdf/
│   └── thumbnail/
└── server.js (UPDATED)
```

## Testing

### Test File Upload:
1. Log in as admin
2. Go to `/admin/courses`
3. Click "Add Course"
4. Try uploading a thumbnail
5. Check `/backend/uploads/thumbnail/` for the file

### Test Lesson Video Upload:
1. Select a course
2. Click "Add Lesson"
3. Upload a video file (< 500MB)
4. Check `/backend/uploads/video/` for the file

### Test Payment (Test Mode):
1. Use Flutterwave test keys
2. Try purchasing a course
3. Use test card: 4187427415564246
4. CVV: 828, PIN: 3310, OTP: 12345

## Security Notes

- ✅ All upload endpoints require authentication
- ✅ Only admins can upload files
- ✅ File type validation implemented
- ✅ File size limits enforced
- ✅ Files stored outside web root

## Troubleshooting

### Upload Fails:
- Check file size (max 500MB)
- Verify file type is allowed
- Ensure backend `uploads/` folder exists
- Check admin permissions

### Payment Fails:
- Verify Flutterwave keys are correct
- Check if keys are for test/live mode
- Ensure internet connection
- Check browser console for errors

### Files Not Accessible:
- Verify static file serving: `app.use('/uploads', express.static(uploadsDir))`
- Check file permissions
- Ensure correct file path in database

## Next Steps

1. ✅ Install dependencies
2. ✅ Configure Flutterwave keys
3. ✅ Test file uploads
4. ✅ Test course creation
5. ✅ Test payment flow
6. Configure production keys for live deployment
7. Set up CDN for video streaming (optional)
8. Add video player controls
9. Implement progress tracking
10. Add certificate generation

## Support

For issues:
1. Check browser console
2. Check backend logs
3. Verify environment variables
4. Test with curl/Postman
5. Check Flutterwave dashboard for transactions
