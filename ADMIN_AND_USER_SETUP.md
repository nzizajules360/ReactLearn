# Admin Registration & User Data System Setup

## ✅ What Has Been Implemented

### 1. **Admin Registration with Secret Code**
- ✅ Admin secret code: `101010@101010`
- ✅ Registration form includes optional "Admin Code" field
- ✅ Users who enter correct code get `role: 'admin'` in database
- ✅ Regular users (without code) get `role: 'user'`

### 2. **Updated Navbar with Training Links**
- ✅ **Public Links**: Home, About, Features, Training, Contact
- ✅ **Logged-in Users See**:
  - Dashboard link
  - Logout button
  - User profile icon (clickable to Dashboard)
- ✅ **Admin Users Additionally See**:
  - Admin link in navbar
  - Access to `/admin` portal
- ✅ **Mobile Responsive**: All links available in mobile menu

### 3. **Database-Driven Course System**
All course and community data now comes from MySQL database:

#### **Tables Created**:
- `courses` - All course information
- `lessons` - Lesson content with videos/PDFs
- `enrollments` - User course purchases
- `course_progress` - User progress tracking
- `community_teams` - Community teams
- `community_tasks` - Community challenges
- `training_stats` - Platform statistics

### 4. **User-Specific Data Tracking**
- ✅ **Course Progress**: Tracked per user in `course_progress` table
- ✅ **Enrollments**: Each user's purchased courses in `enrollments` table
- ✅ **Completion Tracking**: Lessons completed, quiz scores, certificates
- ✅ **Community Participation**: User-specific team memberships and task completion

## 🎯 How It Works

### **For Regular Users**:

1. **Registration**:
   - Go to `/login`
   - Click "Join the Swarm"
   - Fill in name, email, password
   - Leave "Admin Code" field blank
   - Submit → Account created as regular user

2. **Accessing Training**:
   - Login to account
   - Click "Training" in navbar
   - Browse courses at `/training/courses`
   - View course details
   - Purchase course via Flutterwave payment
   - Access lessons after enrollment

3. **Progress Tracking**:
   - View enrolled courses in Dashboard
   - See progress percentage for each course
   - Track completed lessons
   - View quiz scores
   - Download certificates when course completed

4. **Community Features**:
   - Join community teams
   - Participate in challenges
   - View leaderboard
   - Track personal points and achievements

### **For Admin Users**:

1. **Admin Registration**:
   - Go to `/login`
   - Click "Join the Swarm"
   - Fill in all fields
   - **Enter admin code**: `101010@101010`
   - Submit → Account created as admin

2. **Admin Dashboard Access**:
   - Login with admin account
   - See "Admin" link in navbar
   - Click to access `/admin`

3. **Managing Courses** (`/admin/courses`):
   - **Add Course**:
     - Click "Add Course"
     - Upload thumbnail image
     - Set title, description, price
     - Add topics, objectives, prerequisites
     - Submit → Saved to database
   
   - **Add Lessons**:
     - Select a course
     - Click "Add Lesson"
     - Upload video file (up to 500MB)
     - Upload PDF resources
     - Add transcript/content
     - Submit → Saved to database

   - **Edit/Delete**:
     - Click edit icon to modify
     - Click delete icon to remove

4. **File Uploads**:
   - **Videos**: Stored in `/uploads/video/`
   - **PDFs**: Stored in `/uploads/pdf/`
   - **Images**: Stored in `/uploads/thumbnail/`
   - All files accessible via URL

## 📊 Database Schema

### Users Table
```sql
- id (Primary Key)
- name
- email
- password_hash
- role ('user' or 'admin')
- phone, location, department, bio
- created_at
```

### Courses Table
```sql
- id (Primary Key)
- title, description
- category, level
- duration, price
- instructor
- topics (JSON)
- learning_objectives (JSON)
- requirements (JSON)
- thumbnail
- created_at, updated_at
```

### Lessons Table
```sql
- id (Primary Key)
- course_id (Foreign Key → courses)
- title, description
- duration, type
- order_num
- video_url
- transcript
- resources (JSON)
- created_at, updated_at
```

### Course Progress Table
```sql
- id (Primary Key)
- user_id (Foreign Key → users)
- course_id (Foreign Key → courses)
- completed_lessons (JSON)
- current_lesson
- progress_percentage
- time_spent
- quiz_scores (JSON)
- certificate_earned
- last_accessed
```

### Enrollments Table
```sql
- id (Primary Key)
- user_id (Foreign Key → users)
- course_id (Foreign Key → courses)
- transaction_id
- status ('active', 'completed', 'cancelled')
- enrolled_at
```

## 🔐 Authentication & Authorization

### **Token-Based Authentication**:
- JWT tokens stored in localStorage
- Token includes: `{ id, email, name, role }`
- Token sent with all protected API requests

### **Protected Routes**:
- `/training/*` - Requires authentication
- `/dashboard/*` - Requires authentication
- `/admin/*` - Requires authentication + admin role
- `/chat/*` - Requires authentication

### **Role-Based Access**:
```javascript
// In backend
if (req.user.role !== 'admin') {
  return res.status(403).json({ message: 'Access denied' })
}
```

## 🛠️ API Endpoints

### **Authentication**:
- `POST /api/auth/register` - Register (with optional adminCode)
- `POST /api/auth/login` - Login
- `POST /api/auth/forgot-password` - Password reset

### **Courses**:
- `GET /api/training/courses` - List courses (public)
- `GET /api/training/courses/:id` - Get course (public)
- `POST /api/admin/courses` - Create course (admin only)
- `PUT /api/admin/courses/:id` - Update course (admin only)
- `DELETE /api/admin/courses/:id` - Delete course (admin only)

### **Lessons**:
- `GET /api/training/courses/:courseId/lessons` - List lessons
- `GET /api/training/courses/:courseId/lessons/:lessonId` - Get lesson
- `POST /api/admin/courses/:courseId/lessons` - Create lesson (admin only)
- `PUT /api/admin/courses/:courseId/lessons/:lessonId` - Update lesson (admin only)
- `DELETE /api/admin/courses/:courseId/lessons/:lessonId` - Delete lesson (admin only)

### **Progress & Enrollment**:
- `GET /api/training/courses/:courseId/progress` - Get progress (user-specific)
- `POST /api/training/courses/:courseId/lessons/:lessonId/complete` - Mark lesson complete
- `POST /api/payment/verify-flutterwave` - Process payment & create enrollment
- `GET /api/enrollments` - Get user's enrollments

### **File Upload**:
- `POST /api/admin/upload` - Upload files (admin only)

## 🎨 Frontend Components

### **Updated Components**:
1. **Navbar** (`/src/components/Navbar.jsx`)
   - Shows Training link
   - Conditional Dashboard/Admin links
   - Logout button for logged-in users
   - Mobile responsive menu

2. **LoginPage** (`/src/pages/LoginPage.jsx`)
   - Added Admin Code field to registration form
   - Shows helper text about admin code
   - Password-type input for security

3. **CoursesManagementPage** (`/src/pages/admin/CoursesManagementPage.jsx`)
   - Uses CourseFormModal and LessonFormModal
   - Database integration
   - Real-time CRUD operations

4. **CourseFormModal** (`/src/components/admin/CourseFormModal.jsx`)
   - File upload for thumbnails
   - Dynamic form fields
   - Database saving

5. **LessonFormModal** (`/src/components/admin/LessonFormModal.jsx`)
   - Video file upload
   - PDF resource upload
   - Upload progress indicators

## 🚀 Getting Started

### **1. Start Backend**:
```bash
cd backend
npm start
# Database tables created automatically
# Server runs on http://localhost:3001
```

### **2. Start Frontend**:
```bash
cd Learn
npm start
# React app runs on http://localhost:5173
```

### **3. Create Admin Account**:
1. Go to `http://localhost:5173/login`
2. Click "Join the Swarm"
3. Fill in your details
4. In "Admin Code" field, enter: `101010@101010`
5. Submit - you're now an admin!

### **4. Add Courses**:
1. Login as admin
2. Go to `/admin/courses`
3. Click "Add Course"
4. Upload files and fill details
5. Add lessons with videos/PDFs

### **5. Test as User**:
1. Create new account without admin code
2. Go to `/training`
3. Browse courses
4. Purchase and enroll
5. Track progress

## 📝 User Data Flow

### **When User Enrolls in Course**:
```
1. User clicks "Enroll" on course
2. Flutterwave payment modal opens
3. User completes payment
4. Payment verified via API
5. Enrollment record created in database:
   - user_id
   - course_id
   - transaction_id
   - status: 'active'
6. Course appears in user's dashboard
7. User can now access all lessons
```

### **When User Completes Lesson**:
```
1. User watches video/reads content
2. Clicks "Mark Complete"
3. API updates course_progress table:
   - Adds lesson_id to completed_lessons array
   - Updates progress_percentage
   - Updates last_accessed timestamp
4. UI shows lesson as completed
5. Progress bar updates
```

### **Certificate Generation**:
```
1. When user completes all lessons
2. progress_percentage reaches 100%
3. certificate_earned set to true
4. User can download certificate
5. Certificate count updates in training_stats
```

## 🔍 Testing

### **Test Admin Features**:
```bash
# 1. Register as admin
Admin Code: 101010@101010

# 2. Check navbar shows "Admin" link
# 3. Go to /admin/courses
# 4. Upload a course with thumbnail
# 5. Add lessons with video/PDF
# 6. Verify files in /uploads directory
```

### **Test User Features**:
```bash
# 1. Register without admin code
# 2. Check navbar shows "Training" and "Dashboard"
# 3. Browse courses at /training/courses
# 4. Purchase a course (test payment)
# 5. Check course appears in dashboard
# 6. Complete lessons and watch progress update
```

## 🎯 Key Features Summary

| Feature | Status | Details |
|---------|--------|---------|
| Admin Registration | ✅ Complete | Secret code: 101010@101010 |
| Navbar with Training | ✅ Complete | Shows for all users |
| Database Integration | ✅ Complete | All data in MySQL |
| File Uploads | ✅ Complete | Videos, PDFs, Images |
| User Progress Tracking | ✅ Complete | Per-user, per-course |
| Course Enrollment | ✅ Complete | Payment integration |
| Community Features | ✅ Complete | Database-driven |
| Admin CRUD | ✅ Complete | Courses & Lessons |
| Mobile Responsive | ✅ Complete | Navbar and forms |
| Role-Based Access | ✅ Complete | User vs Admin |

## 🔒 Security Notes

- ✅ Admin code validated server-side
- ✅ Passwords hashed with bcrypt
- ✅ JWT tokens for authentication
- ✅ Role-based API endpoint protection
- ✅ File upload validation (type & size)
- ✅ SQL injection protected (parameterized queries)
- ✅ XSS protected (React escaping)

## 📈 Next Steps (Optional Enhancements)

1. **Email Verification** for new accounts
2. **Password Strength Meter** in registration
3. **Admin Dashboard Analytics** (charts, stats)
4. **Bulk Course Import** (CSV/JSON)
5. **Video Streaming** optimization (HLS/DASH)
6. **Certificate PDF Generation** (automated)
7. **Discussion Forums** per course
8. **Quiz Builder** for lessons
9. **Progress Notifications** (email/push)
10. **Course Reviews & Ratings** by students

---

## 🎉 System is Ready!

Your EcoSwarm platform now has:
- ✅ Full admin course management
- ✅ User enrollment and progress tracking
- ✅ File upload capabilities
- ✅ Payment integration
- ✅ Role-based access control
- ✅ Database-driven architecture

**Admin Code**: `101010@101010`
**Ready to use!** 🚀
